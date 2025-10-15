"use client";

import { AuthContext } from "@/contexts/AuthContext";
import { GetServerSideProps } from "next";
import { useContext, useEffect, useState } from "react";
import { parseCookies } from "nookies";
import { getApiClient } from "@/services/axios";
import Layout from "@/components/layout/layout";
import { AddTaskButton } from "@/components/Task/addTaskButton";
import { useRouter } from "next/router";
import { TaskType } from "@/types/tasks/tasks";
import {
  CountConclude,
  CountFavorites,
  CountNotConclude,
  countTasks,
  getTasks,
} from "@/services/task/taskService";
import { MenuCard } from "@/components/MenuCards/MenuCard";

const Page = () => {
  const { user } = useContext(AuthContext);
  const [countAllTask, setCountAllTask] = useState<number>();
  const [countConcludeTask, setCountConcludeTask] = useState<number>();
  const [countNotConcludeTask, setCountNotConcludeTask] = useState<number>();
  const [countFavoritesTask, setCountFavoritesTask] = useState<number>();

  const getCounts = async () => {
    const count = await countTasks();
    const countConclude = await CountConclude();
    const countNotConclude = await CountNotConclude();
    const countFavorites = await CountFavorites();
    console.log("Aqui:", countFavorites);
    setCountAllTask(count);
    setCountConcludeTask(countConclude);
    setCountNotConcludeTask(countNotConclude);
    setCountFavoritesTask(countFavorites);
  };

  useEffect(() => {
    getCounts();
  }, []);

  console.log(countFavoritesTask);
  return (
    <Layout>
      <div className=" flex flex-col h-full">
        <header className="flex justify-between p-2">
          <MenuCard title="Total de Tarefas" value={countAllTask} />
          <MenuCard title="Tarefas Concluidas" value={countConcludeTask} />
          <MenuCard title="Tarefas a Fazer" value={countNotConcludeTask} />
          <MenuCard title="Favoritas" value={countFavoritesTask} />
        </header>

        <section className=" h-full flex justify-around  items-center p-8">
          <div className="border border-red-500">a</div>
          <div className="border border-blue-500 w-[500px]">b</div>
        </section>
      </div>
    </Layout>
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
