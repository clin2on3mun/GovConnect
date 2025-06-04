import { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  guestSignupSchema,
  type GuestSignupInputs,
} from "../../validations/validationSchema";
import { useNavigate } from "react-router-dom";

type Agency = {
  _id: string;
  name: string;
};

export default function Signup() {
  const [agencies, setAgencies] = useState<Agency[]>([]);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<GuestSignupInputs>({
    resolver: zodResolver(guestSignupSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      role: "guest",
      agency: "",
    },
  });

  const roleWatch = watch("role");

  useEffect(() => {
    if (roleWatch === "agent_admin") {
      axios
        .get(`${import.meta.env.VITE_API_URL}/agencies`)
        .then((res) => setAgencies(res.data.data || []))
        .catch((err) => console.error("Failed to fetch agencies:", err));
    }
  }, [roleWatch]);

  const onSubmit = async (data: GuestSignupInputs) => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/users/signup`, data, {
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
    <div className="min-h-screen w-full flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-md rounded-lg p-8 w-full max-w-xl"
      >
        <h2 className="text-2xl font-semibold mb-6 text-center">User Signup</h2>

        {/* Name */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            {...register("name")}
            className="mt-1 p-2 w-full border rounded-md focus:ring focus:ring-blue-200"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            {...register("email")}
            className="mt-1 p-2 w-full border rounded-md focus:ring focus:ring-blue-200"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Phone */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Phone
          </label>
          <input
            type="text"
            {...register("phone")}
            className="mt-1 p-2 w-full border rounded-md focus:ring focus:ring-blue-200"
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
          )}
        </div>

        {/* Password */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            {...register("password")}
            className="mt-1 p-2 w-full border rounded-md focus:ring focus:ring-blue-200"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Role dropdown */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Role
          </label>
          <select
            {...register("role")}
            onChange={(e) => {
              setValue("role", e.target.value as "guest" | "agent_admin");
            }}
            className="mt-1 p-2 w-full border rounded-md focus:ring focus:ring-blue-200"
          >
            <option value="guest">Guest</option>
            <option value="agent_admin">Agent Admin</option>
          </select>
        </div>

        {/* Agency dropdown (only visible if role is agentadmin) */}
        {roleWatch === "agent_admin" && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Agency
            </label>
            <select
              {...register("agency")}
              className="mt-1 p-2 w-full border rounded-md focus:ring focus:ring-blue-200"
            >
              <option value="">Select an agency</option>
              {agencies.map((agency, index) => (
                <option key={index} value={agency._id}>
                  {agency.name}
                </option>
              ))}
            </select>
            {errors.agency && (
              <p className="text-red-500 text-sm mt-1">
                {errors.agency.message}
              </p>
            )}
          </div>
        )}

        {/* Submit button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Signing up..." : "Signup"}
        </button>
      </form>
    </div>
  );
}
