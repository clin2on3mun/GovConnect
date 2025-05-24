import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  loginSchema,
  type LoginFormInputs,
} from "../../validations/validationSchema";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const navigate = useNavigate();

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      console.log(import.meta.env.VITE_API_URL);
      await axios.post(`${import.meta.env.VITE_API_URL}/users/login`, data, {
        withCredentials: true,
      });
      navigate("/dashboard");
    } catch (err: any) {
      if (axios.isAxiosError(err)) {
        return err.response?.data?.message || err.response?.data || err.message;
      } else {
        return err;
      }
    }
  };

  return (
    <>
      <div className="min-h-screen w-full flex items-center justify-center px-4">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white shadow-md rounded-lg p-10 w-full max-w-xl"
        >
          <h2 className="text-3xl font-semibold mb-8 text-center">Login</h2>

          {/* Email Field */}
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block text-base font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              {...register("email")}
              className="mt-2 p-3 w-full border rounded-md focus:ring focus:ring-blue-200"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-base font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              {...register("password")}
              className="mt-2 p-3 w-full border rounded-md focus:ring focus:ring-blue-200"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded hover:bg-blue-700 transition"
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
          <p className="mt-4">
            dont have an account?
            <Link
              to="/signUp"
              className="pl-2 text-blue-600  hover:text-blue-400"
            >
              signUp
            </Link>
          </p>
        </form>
      </div>
    </>
  );
}
