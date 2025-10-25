import { createBrowserRouter } from "react-router";
import PrivateLayout from "./layouts/Private";

const router = createBrowserRouter([
  {
    path: "/",
    lazy: () => import("@/pages/Home"),
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
    element: <div>Página não encontrada</div>,
  },
]);

export default router;
