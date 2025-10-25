"use client ";

import { AuthContext } from "@/contexts/AuthContext";
import { ReactNode, use, useContext, useEffect, useState } from "react";
import { LayoutItem } from "./LayoutItem";

type layoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: layoutProps) => {
  const { user } = useContext(AuthContext);
  const [time, setTime] = useState<Date | null>(null);
  const [date, setDate] = useState<string>("");

  useEffect(() => {
    // Atualiza a hora e a data apenas no cliente
    const updateTime = () => {
      const now = new Date();
      setTime(now);
      setDate(now.toLocaleDateString("pt-BR"));

      console.log(user?.name);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex text-white">
      <nav className=" bg-indigo-950 w-[300px] h-screen flex flex-col ">
        {/*Head Nav */}
        <section className="border-b border-white/70 p-2 flex flex-col  gap-3">
          <h1>
            Olá,{" "}
            <span className="text-lg">{user && user.name.toUpperCase()}</span>
          </h1>
          <h2 className="text-xs">
            Bem Vindo ao seu{" "}
            <span className="text-green-500">
              Gerenciador de Tarefas Particular
            </span>
          </h2>

          {!time && <h3>Hora atual: {"--/--/--"}</h3>}
          {time && <h3>Hora atual: {time.toLocaleTimeString()}</h3>}

          <h3>Data Atual: {date}</h3>
        </section>
        {/*Head Nav */}

        <section className=" flex-1 pt-8">
          <ul className="flex flex-col h-[400px] pl-4 gap-2  ">
            <LayoutItem title="Menu" route="/menu" type="Router" />
            <LayoutItem title="Tasks" route="/tasks" type="Router" />
            <LayoutItem title="Logout" type="Logout" />
          </ul>
        </section>

        {/*Footer Nav */}
      </nav>

      <div className="flex-1">{children}</div>
    </div>
  );
};

export default Layout;
