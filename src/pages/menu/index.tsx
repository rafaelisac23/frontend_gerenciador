import { AuthContext } from "@/contexts/AuthContext";
import { api } from "@/services/api";
import { GetServerSideProps } from "next";
import { useContext, useEffect } from "react";
import { parseCookies } from "nookies";
import { getApiClient } from "@/services/axios";

const Page = () => {
  const { user } = useContext(AuthContext);

  useEffect(() => {}, []);
  return <div>{user?.name}</div>;
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const apiClient = getApiClient(ctx);
  const { ["nextauth.token"]: token } = parseCookies(ctx);

  if (!token) {
    return {
      redirect: { destination: "/", permanent: false },
    };
  }

  return { props: {} };
};

export default Page;
