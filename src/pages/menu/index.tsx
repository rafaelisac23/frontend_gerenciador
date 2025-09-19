import { AuthContext } from "@/contexts/AuthContext";
import { GetServerSideProps } from "next";
import { useContext, useEffect } from "react";
import { parseCookies } from "nookies";
import { getApiClient } from "@/services/axios";

const Page = () => {
  const { user, logout } = useContext(AuthContext);

  useEffect(() => {}, []);
  return (
    <div className="flex flex-col gap-4">
      {user?.name}
      <button onClick={logout}>Deslogar</button>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const apiClient = getApiClient(ctx);
  const { ["nextauth.token"]: token } = parseCookies(ctx);

  if (!token || token === undefined) {
    return {
      redirect: { destination: "/", permanent: false },
    };
  }

  return { props: {} };
};

export default Page;
