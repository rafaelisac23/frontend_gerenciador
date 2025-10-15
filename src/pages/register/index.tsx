import { AuthContext } from "@/contexts/AuthContext";
import { api } from "@/services/api";
import { getApiClient } from "@/services/axios";
import { FormData } from "@/types/auth";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { parseCookies } from "nookies";
import { useContext } from "react";
import { useForm } from "react-hook-form";

type newUserFormData = FormData & {
  name: string;
};

type NewUsertype = {
  user: {
    id: number;
    name: string;
    email: "testador23@hotmail.com";
  };
  token: string;
};

const Page = () => {
  const { register, handleSubmit } = useForm<newUserFormData>();
  const { signUp } = useContext(AuthContext);

  const handlecreateandSignUp = async ({
    email,
    password,
    name,
  }: newUserFormData) => {
    try {
      const request = await api.post("/auth/signin", {
        name: name,
        password: password,
        email: email,
      });

      const newUser: NewUsertype = request.data;

      if (newUser) {
        await signUp({ email: newUser.user.email, password: password });
      }
    } catch (err) {
      console.log("Erro aqui: ", err);
    }
  };

  return (
    <>
      <Head>
        <title>Register</title>
      </Head>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="w-full  flex items-center justify-center">
            <img src="./images/logo.png" alt="" className="w-20 h-20" />
          </div>
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight ">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            action="#"
            method="POST"
            onSubmit={handleSubmit(handlecreateandSignUp)}
            className="space-y-6"
          >
            <div>
              <label htmlFor="name" className="block text-sm/6 font-medium ">
                Name
              </label>
              <div className="mt-2">
                <input
                  {...register("name")}
                  id="name"
                  name="name"
                  type="text"
                  required
                  autoComplete="text"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base  outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm/6 font-medium ">
                Email address
              </label>
              <div className="mt-2">
                <input
                  {...register("email")}
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base  outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm/6 font-medium "
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  {...register("password")}
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base  outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                Create and Log
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm/6 ">
            Is a member?
            <a
              href="/"
              className="font-semibold text-indigo-400 hover:text-indigo-300"
            >
              Log in
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const apiClient = getApiClient(ctx);
  const { ["nextauth.token"]: token } = parseCookies(ctx);

  if (token) {
    return {
      redirect: { destination: "/menu", permanent: false },
    };
  }

  return { props: {} };
};

export default Page;
