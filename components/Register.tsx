import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Link from "next/link";
import { IRegisterInput } from "@/types/types";
import ErrorMessage from "./Common/ErrorMessage";
import { useAuth } from "@/context/AuthContext";

const Register = () => {
  // form validation
  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Email is required").email("Email is invalid"),
    confirmPass: Yup.string().required("Confirm your password"),
    firstname: Yup.string().required("Firstname is required"),
    lastname: Yup.string().required("Lastname is required"),
    password: Yup.string().required("Password is required"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegisterInput>(formOptions);
  const { signUp } = useAuth();
  // onSubmit handler
  const onSubmit = async (data: IRegisterInput) => {
    try {
      await signUp(data);
    } catch (error: any) {
      console.log(error.message);
    }
  };
  return (
    <div className="min-h-full py-20">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row w-10/12  bg-white rounded-xl mx-auto shadow-lg overflow-hidden">
          <div className="w-full lg:w-1/2 flex flex-col justify-center p-12 bg-no-repeat bg-cover bg-center bg-neutral-800">
            <h1 className="text-white text-5xl mb-3 font-semibold">
              Wanna catch em all?
            </h1>
            <div>
              <p className="text-white text-lg">
                Already have an account?{" "}
                <Link className="text-purple-500 font-semibold" href="/login">
                  Sign In
                </Link>
              </p>
            </div>
          </div>
          <div className="w-full lg:w-1/2 py-16 px-12">
            <h2 className="text-3xl mb-2 font-semibold">Register</h2>
            <p className="mb-4 text-lg font-thin">
              Create your account. It should only take a minute!
            </p>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mt-5">
                <input
                  type="text"
                  placeholder="Firstname"
                  className="border border-gray-300 py-2 px-2 rounded w-full"
                  {...register("firstname")}
                />
                {errors?.firstname?.message ? (
                  <ErrorMessage message={errors?.firstname?.message} />
                ) : null}
              </div>
              <div className="mt-5">
                <input
                  type="text"
                  placeholder="Lastname"
                  className="border border-gray-300 py-2 px-2 rounded w-full"
                  {...register("lastname")}
                />
                {errors?.lastname?.message ? (
                  <ErrorMessage message={errors?.lastname?.message} />
                ) : null}
              </div>
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
              <div className="mt-5">
                <input
                  type="password"
                  placeholder="Confirm Password"
                  className="border border-gray-300 py-2 px-2 w-full rounded"
                  {...register("confirmPass")}
                />
                {errors?.confirmPass?.message ? (
                  <ErrorMessage message={errors?.confirmPass?.message} />
                ) : null}
              </div>

              <input
                className="w-full bg-purple-500 py-3 text-center text-white mt-10 rounded cursor-pointer"
                type="submit"
                value="Register"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
