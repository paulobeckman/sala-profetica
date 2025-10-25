import { useContext } from "react";

import { AuthContext } from "@/contexts/authentication";

export function useAuth() {
  const context = useContext(AuthContext);

  return context;
}
