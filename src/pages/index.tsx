import { lazy } from "react";

const HomePage = lazy(() => import("./HomePage"));
const CategoryPage = lazy(() => import("./CategoryPage"));
const ProductDetailPage = lazy(() => import("./ProductDetailPage"));
const NotFoundPage = lazy(() => import("./NotFoundPage"));
const LogInPage = lazy(() => import("./LogInPage"));
const SignUpPage = lazy(() => import("./SignUpPage"));
const ForgotPasswordPage = lazy(() => import("./ForgotPasswordPage"));
const ProfilePage = lazy(() => import("./ProfilePage"));
const CartPage = lazy(() => import("./CartPage"));
const CheckOutPage = lazy(() => import("./CheckOutPage"));

export {
  HomePage,
  NotFoundPage,
  CategoryPage,
  ProductDetailPage,
  LogInPage,
  SignUpPage,
  ForgotPasswordPage,
  ProfilePage,
  CartPage,
  CheckOutPage,
};
