import { Route, Routes, BrowserRouter } from "react-router-dom";
import LoginForm from "./features/auth/components/LoginForm";
import RegisterForm from "./features/auth/components/RegisterForm";
import ListCustomers from "./features/admin/components/Admin.jsx";
import CreateCustomer from "./features/admin/components/CreateCustomer.jsx";

import PrivateRoute from "./components/PrivateRoute.jsx";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route path="/admin" element={<ListCustomers />} />
            <Route path="/admin/create" element={<CreateCustomer />} />
          </Route>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
