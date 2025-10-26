import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { onAuthStateChanged, signInAnonymously, signOut } from "firebase/auth";

import auth from "@/services/firebase/auth";
import { collection, getDocs, limit, query, where } from "firebase/firestore";
import firestore from "@/services/firebase/firestore";
import type { ParticipantType } from "@/interface/paticipant";

type ProviderProps = {
  children: React.ReactNode;
};

type UserAuth = {
  id: string;
  name: string | null;
  registrationCode: string | null;
};

type SignInCredentials = {
  registrationCode: string;
};

type AuthContextData = {
  SignIn: ({ registrationCode }: SignInCredentials) => Promise<void>;
  SignOut: () => Promise<void>;
  user: UserAuth | undefined;
  isAuthenticated: boolean;
  loadingUserAuth: boolean;
};

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext({} as AuthContextData);

export const AuthProvider = ({ children }: ProviderProps) => {
  const [user, setUser] = useState<UserAuth>();
  const [loadingUserAuth, setLoadingUserAuth] = useState(true);
  const isAuthenticated = !!user;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const { displayName, uid } = user;
        const registrationCode = localStorage.getItem("@registrationCode");
        setUser({
          id: uid,
          name: displayName,
          registrationCode,
        });
      }

      setLoadingUserAuth(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const SignIn = useCallback(
    async ({ registrationCode }: SignInCredentials): Promise<void> => {
      const response = await signInAnonymously(auth);

      const collectionRef = collection(firestore, "participant");
      const queryUser = query(
        collectionRef,
        where("registrationCode", "==", registrationCode),
        limit(1)
      );
      const querySnapshot = await getDocs(queryUser);
      const participantData = querySnapshot.docs[0].data() as ParticipantType;
      if (participantData.registrationCode) {
        localStorage.setItem(
          "@registrationCode",
          participantData.registrationCode
        );
      }

      if (response.user) {
        const { displayName, uid } = response.user;
        setUser({
          id: uid,
          name: displayName,
          registrationCode: participantData.registrationCode,
        });
      }
    },
    []
  );

  const SignOut = useCallback(async () => {
    await signOut(auth);
    localStorage.removeItem("@registrationCode");
    setUser(undefined);
  }, []);

  const authContextProviderValues = useMemo(
    () => ({
      SignIn,
      isAuthenticated,
      user,
      SignOut,
      loadingUserAuth,
    }),
    [SignIn, isAuthenticated, user, SignOut, loadingUserAuth]
  );

  return (
    <AuthContext.Provider value={authContextProviderValues}>
      {children}
    </AuthContext.Provider>
  );
};
