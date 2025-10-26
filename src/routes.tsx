import { createBrowserRouter, Navigate } from "react-router";
import PrivateLayout from "./layouts/Private";
import PublicLayout from "./layouts/Public";

const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
      {
        path: "/",
        lazy: () => import("@/pages/Home"),
      },
    ],
  },
  {
    element: <PrivateLayout />,
    children: [
      {
        path: "horario",
        lazy: () => import("@/pages/ScheduledTime"),
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/horario" replace />,
  },
]);

export default router;
