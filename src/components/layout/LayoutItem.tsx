import { AuthContext } from "@/contexts/AuthContext";
import { useRouter } from "next/router";
import { useContext } from "react";

type Props = {
  type: "Logout" | "Router";
  route?: string;
  title: string;
};

export const LayoutItem = ({ title, type, route }: Props) => {
  const { logout } = useContext(AuthContext);
  const router = useRouter();

  if (type === "Logout") {
    return (
      <li className="hover:underline" onClick={logout}>
        {title}
      </li>
    );
  }

  return (
    <li
      className="hover:underline"
      onClick={() => router.push(route as string)}
    >
      {title}
    </li>
  );
};
