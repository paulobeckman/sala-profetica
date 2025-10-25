import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import auth from "@/services/firebase/auth";
import { collection, getDocs, limit, query, where } from "firebase/firestore";
import firestore from "@/services/firebase/firestore";
import type { UserType } from "@/interface/User";

type ProviderProps = {
  children: React.ReactNode;
};

type UserAuth = {
  id: string;
  name: string | null;
  email: string | null;
  groupId: string | null;
};

type SignInCredentials = {
  email: string;
  password: string;
};

type AuthContextData = {
  SignIn: ({ email, password }: SignInCredentials) => Promise<void>;
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
        const { displayName, uid, email } = user;
        const groupId = localStorage.getItem("@groupId");
        setUser({
          id: uid,
          name: displayName,
          email,
          groupId,
        });
      }

      setLoadingUserAuth(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const SignIn = useCallback(
    async ({ email, password }: SignInCredentials): Promise<void> => {
      const response = await signInWithEmailAndPassword(auth, email, password);

      const collectionRef = collection(firestore, "user");
      const queryUser = query(
        collectionRef,
        where("email", "==", email),
        limit(1)
      );
      const querySnapshot = await getDocs(queryUser);
      const userData = querySnapshot.docs[0].data() as UserType;
      if (userData.groupId) {
        localStorage.setItem("@groupId", userData.groupId);
      }

      if (response.user) {
        const { displayName, uid } = response.user;
        setUser({
          id: uid,
          name: displayName,
          email,
          groupId: userData.groupId,
        });
      }
    },
    []
  );

  const SignOut = useCallback(async () => {
    await signOut(auth);
    localStorage.removeItem("@groupId");
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
