import { createBrowserRouter } from "react-router-dom";
import PublicLayout from "../components/Layouts/PublicLayout";
import publicRoutes from "./public/publicRoutes";
import { futureConfigs } from "../config/reactRouterDom";

const router = createBrowserRouter(
  [
    {
      element: <PublicLayout />,
      children: publicRoutes,
    },
  ],
  futureConfigs
);

export default router;
