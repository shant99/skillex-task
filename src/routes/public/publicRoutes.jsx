import { lazy } from "react";
import SuspenseWrapper from "../../components/Layouts/SuspenseWrapper";

const Products = lazy(() => import("../../pages/Products"));
const Home = lazy(() => import("../../pages/Home"));

const publicRoutes = [
  {
    path: "/",
    element: (
      <SuspenseWrapper>
        <Home />
      </SuspenseWrapper>
    ),
  },
  {
    path: "/products",
    element: (
      <SuspenseWrapper>
        <Products />
      </SuspenseWrapper>
    ),
  },
];

export default publicRoutes;
