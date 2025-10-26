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
      <div className="flex items-center justify-center h-screen text-white">
        <Spinner className="size-10 text-[#E1FF2F]" />
      </div>
    );
  }

  return <Outlet />;
};

export default PrivateLayout;
