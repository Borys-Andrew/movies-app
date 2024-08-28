import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { login } from "../api";
import { AuthContext } from "../context/AuthContext";

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  password: z.string().min(4, {
    message: "Password must be at least 4 char.push) },ters long",
  }),
});

const LoginPage: React.FC = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);

  const onSubmit = async (formData: z.infer<typeof formSchema>) => {
    try {
      const data = await login(formData);

      if (data?.status === 200) {
        setUser({
          userName: data?.data.userName,
          userId: data?.data.userId,
          isAuth: true,
        });

        navigate("/movies", { replace: true });
        form.reset();
      }

      return data;
    } catch (error) {
      console.log("🚀 ~ onSubmit ~ error:", error);
    }
  };

  return (
    <div className="h-[90vh] flex items-center justify-center px-2">
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col border rounded-md p-6 w-80"
      >
        <h1 className="text-4xl text-center mb-4">Login</h1>

        <div className="mb-2">
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            {...form.register("email")}
            type="email"
            placeholder="email..."
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {form.formState.errors.email && (
            <p className="text-sm text-red-500 mt-1">
              {form.formState.errors.email.message}
            </p>
          )}
        </div>

        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            {...form.register("password")}
            type="password"
            placeholder="password..."
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {form.formState.errors.password && (
            <p className="text-sm text-red-500 mt-1">
              {form.formState.errors.password.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Submit
        </button>

        <p className="text-xs text-center mt-4">
          If you don&apos;t have an account{" "}
          <Link
            to="/register"
            className="underline underline-offset-1 cursor-pointer"
          >
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
