import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import { FC } from "react";

interface Props {
  roles: string[];
}

const RequireAuth: FC<Props> = ({ roles }) => {
  const auth = useAuth();
  const location = useLocation();

  const hasPermission = () => {
    return auth?.user?.roles.find((role) => roles.includes(role));
  };

  return auth?.user ? (
    <>{hasPermission() ? <Outlet /> : <Navigate to={"/unauthorized"} />}</>
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
