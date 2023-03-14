import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Link from "next/link";
import { ILoginInput } from "@/types/types";
import ErrorMessage from "./Common/ErrorMessage";
import { useAuth } from "@/context/AuthContext";

const Login = () => {
  // form validation
  const { logIn } = useAuth();
  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Email is required").email("Email is invalid"),
    password: Yup.string().required("Password is required"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginInput>(formOptions);

  // onSubmit handler
  const onSubmit = async (data: ILoginInput) => {
    try {
      await logIn(data);
    } catch (error: any) {
      console.log(error.message);
    }
  };
  return (
    <div className="min-h-full py-40">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row w-10/12  bg-white rounded-xl mx-auto shadow-lg overflow-hidden">
          <div className="w-full lg:w-1/2 flex flex-col justify-center p-12 bg-no-repeat bg-cover bg-center bg-neutral-800">
            <h1 className="text-white text-5xl mb-3 font-semibold">
              Gotta catch em all!
            </h1>
            <div>
              <p className="text-white text-lg">
                Don't have an account?{" "}
                <Link className="text-purple-500" href="/register">
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
          <div className="w-full lg:w-1/2 py-16 px-12">
            <h2 className="text-3xl mb-2 font-bold">Login</h2>
            <p className="mb-4 text-lg">Please enter your login credentials!</p>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mt-5">
                <input
                  type="text"
                  placeholder="Email"
                  className="border border-gray-300 py-2 px-2 w-full rounded"
                  {...register("email")}
                />
                {errors?.email?.message ? (
                  <ErrorMessage message={errors?.email?.message} />
                ) : null}
              </div>
              <div className="mt-5">
                <input
                  type="password"
                  placeholder="Password"
                  className="border border-gray-300 py-2 px-2 w-full rounded"
                  {...register("password")}
                />
                {errors?.password?.message ? (
                  <ErrorMessage message={errors?.password?.message} />
                ) : null}
              </div>

              <input
                className="w-full bg-purple-500 py-3 text-center text-white mt-10 rounded cursor-pointer"
                type="submit"
                value="Login"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
