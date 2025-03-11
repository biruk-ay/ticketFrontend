// @ts-nocheck
import { Navigate } from "react-router";
import { useSelector } from "react-redux";
import Loading from "./loading";

const ProtectedRoute = ({ component: Component, allowedRoles }) => {
  const { role, isLoading } = useSelector((state) => state.auth);

  if (isLoading) {
    return <Loading />
  }

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/login" />;
  }

  return <Component />;
};

export default ProtectedRoute;
