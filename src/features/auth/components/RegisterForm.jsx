import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { object, string, ref } from "yup";
import { useDispatch } from "react-redux";
import { register } from "../services/auth";

export default function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Schema validation only for username, password, and password confirmation
  const registrationSchema = object({
    username: string().required("Vui lòng nhập tên người dùng"),
    password: string()
      .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
      .required("Vui lòng nhập mật khẩu"),
    confirmPassword: string()
      .oneOf([ref("password"), null], "Mật khẩu xác nhận không khớp")
      .required("Vui lòng xác nhận mật khẩu"),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: registrationSchema,
    onSubmit: async (values) => {
      try {
        dispatch(register(values)); // Dispatch registration action
        navigate("/login"); // Redirect to login after successful registration
      } catch (error) {
        console.log(error);
        alert("Registration failed, please try again.");
      }
    },
  });

  return (
    <>
      <div className="flex h-screen items-center justify-center bg-blue-100">
        <div className="flex w-8/12 flex-col items-center space-x-6 lg:flex-row">
          <div className="mb-8 text-center lg:mb-0 lg:text-left">
            <h1 className="text-4xl font-bold text-customGray lg:text-5xl">
              MCI Viet Nam
            </h1>
            <p className="mt-4 text-lg font-medium text-gray-700 lg:text-xl">
              Breakthrough technology, connecting the future{" "}
            </p>
          </div>

          <form
            onSubmit={formik.handleSubmit}
            className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg"
          >
            {/* Username Input */}
            <input
              type="text"
              name="username"
              placeholder="Username"
              className={`mb-4 w-full border p-3 ${
                formik.errors.username && formik.touched.username
                  ? "border-red-500"
                  : "border-gray-300"
              } rounded focus:outline-none focus:ring-2 focus:ring-blue-500`}
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.username && formik.touched.username && (
              <p className="mb-2 text-sm text-red-500">
                {formik.errors.username}
              </p>
            )}

            {/* Password Input */}
            <input
              type="password"
              name="password"
              placeholder="Mật khẩu"
              className={`mb-4 w-full border p-3 ${
                formik.errors.password && formik.touched.password
                  ? "border-red-500"
                  : "border-gray-300"
              } rounded focus:outline-none focus:ring-2 focus:ring-blue-500`}
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.password && formik.touched.password && (
              <p className="mb-2 text-sm text-red-500">
                {formik.errors.password}
              </p>
            )}

            {/* Confirm Password Input */}
            <input
              type="password"
              name="confirmPassword"
              placeholder="Xác nhận mật khẩu"
              className={`mb-4 w-full border p-3 ${
                formik.errors.confirmPassword && formik.touched.confirmPassword
                  ? "border-red-500"
                  : "border-gray-300"
              } rounded focus:outline-none focus:ring-2 focus:ring-blue-500`}
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.confirmPassword &&
              formik.touched.confirmPassword && (
                <p className="mb-2 text-sm text-red-500">
                  {formik.errors.confirmPassword}
                </p>
              )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full rounded-lg bg-customGray py-3 font-semibold text-white transition duration-300 hover:bg-blue-500"
            >
              Signup
            </button>

            {/* Login Link */}
            <p className="mt-4 block text-center text-black">
              Already have an account?{" "}
              <Link to={"/login"} className="text-blue-500">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
