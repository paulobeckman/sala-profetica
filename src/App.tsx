import { RouterProvider } from "react-router";

import Routes from "@/routes";
import { AuthProvider } from "./contexts/authentication";

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={Routes} />
    </AuthProvider>
  );
}

export default App;
