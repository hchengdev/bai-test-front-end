import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

const PrivateRoute = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const Layout = () => (
    <>
      <Outlet />
    </>
  );

  console.log("Authenticated in PrivateRoute:", isAuthenticated);

  return isAuthenticated ? <Layout /> : <Navigate to="/login" />;
};

export default PrivateRoute;
