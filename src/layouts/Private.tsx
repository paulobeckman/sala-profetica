import { Outlet, useNavigate } from "react-router";
import { useAuth } from "@/hooks/use-auth";

import { useEffect } from "react";
import { Spinner } from "@/components/ui/spinner";

const PrivateLayout = () => {
  const { user, loadingUserAuth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user && !loadingUserAuth) {
      navigate("/", { replace: true });
    }
  }, [loadingUserAuth, navigate, user]);

  if (loadingUserAuth || !user) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-white">
        <img
          className="h-32 sm:h-44 -mt-8"
          src="/logo-diflen-global-25.png"
          alt="diflen global 25"
        />
        <Spinner className="size-10 text-[#E1FF2F]" />
      </div>
    );
  }

  return <Outlet />;
};

export default PrivateLayout;
