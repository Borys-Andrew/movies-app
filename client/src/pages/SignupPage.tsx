import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { signup } from "../api";

const formSchema = z.object({
  userName: z.string().min(4, {
    message: "Name must be at least 4 characters long",
  }),
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  password: z.string().min(4, {
    message: "Password must be at least 4 characters long",
  }),
});

const SignupPage: React.FC = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const navigate = useNavigate();

  const onSubmit = async (formData: z.infer<typeof formSchema>) => {
    const data = await signup(formData);

    if (data?.statusText === "Created") {
      form.reset();

      navigate("/login", { replace: true });
    }
  };

  return (
    <div className="h-[90vh] flex items-center justify-center px-2">
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col border rounded-md p-6 w-80"
      >
        <h1 className="text-4xl text-center mb-4">Signup</h1>

        <div className="mb-2">
          <label className="block text-sm font-medium text-gray-700">
            Username
          </label>
          <input
            {...form.register("userName")}
            type="text"
            placeholder="name..."
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {form.formState.errors.userName && (
            <p className="text-sm text-red-500 mt-1">
              {form.formState.errors.userName.message}
            </p>
          )}
        </div>

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
          If you have an account{" "}
          <Link
            to="/login"
            className="underline underline-offset-1 cursor-pointer"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignupPage;
