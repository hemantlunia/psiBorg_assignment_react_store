import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
} from "react-router";
import RootRouter from "./RootRouter";
import AuthLayout from "../Layout/AuthLayout";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import MainLayout from "../Layout/MainLayout";
import Products from "../pages/Products";
import ProductsDetail from "../pages/ProductsDetail";
import NotFound from "../components/notFound/NotFound";
import { useAuth } from "../hooks/useAuth";

export const Index = () => {
  const { isLoggedIn } = useAuth();
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        {/* Redirector */}
        <Route path="/" element={<RootRouter />} />

        {/* Auth_layout */}
        <Route path="/auth" element={<AuthLayout />}>
          <Route index element={<Signup />} />
          <Route path="login" element={<Login />} />
        </Route>

        {/* productsss protected routesss*/}
        <Route path="/products" element={<MainLayout />}>
          <Route
            index
            element={isLoggedIn ? <Products /> : <Navigate to="/auth" />}
          />
          <Route
            path=":id"
            element={isLoggedIn ? <ProductsDetail /> : <Navigate to="/auth" />}
          />
        </Route>

        {/* not-found-page */}
        <Route path="*" element={<NotFound />} />
      </>
    )
  );
  return router;
};
