import { RouterProvider } from "react-router";

import Routes from "@/routes";
import { AuthProvider } from "./contexts/authentication";
import { Toaster } from "sonner";

function App() {
  return (
    <AuthProvider>
      <Toaster />
      <RouterProvider router={Routes} />
    </AuthProvider>
  );
}

export default App;
