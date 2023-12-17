import { createBrowserRouter } from "react-router-dom";
import {
  CategoryPage,
  HomePage,
  NotFoundPage,
  ProductDetailPage,
  LogInPage,
  SignUpPage,
  ForgotPasswordPage,
  ProfilePage,
  CartPage,
  CheckOutPage,
} from "./pages";
import LayoutRoot from "./layout/LayoutRoot";
import LayoutAccount from "./layout/LayoutAccount";

const router = createBrowserRouter([
  {
    path: "",
    element: <LayoutRoot></LayoutRoot>,
    children: [
      {
        path: "/",
        element: <HomePage></HomePage>,
      },
      {
        path: "/category",
        element: <CategoryPage></CategoryPage>,
      },
      {
        path: "/productDetail/:slug",
        element: <ProductDetailPage></ProductDetailPage>,
      },
      {
        path: "/user/:slug",
        element: <ProfilePage></ProfilePage>,
      },
      {
        path: "/cart",
        element: <CartPage></CartPage>,
      },
      {
        path: "/checkout",
        element: <CheckOutPage></CheckOutPage>,
      },
      {
        path: "*",
        element: <NotFoundPage></NotFoundPage>,
      },
    ],
  },
  {
    path: "/account",
    element: <LayoutAccount></LayoutAccount>,
    children: [
      {
        path: "/account/login",
        element: <LogInPage></LogInPage>,
      },
      {
        path: "/account/forgotPassword",
        element: <ForgotPasswordPage></ForgotPasswordPage>,
      },
      {
        path: "/account/signUp",
        element: <SignUpPage></SignUpPage>,
      },
    ],
  },
]);

export default router;
