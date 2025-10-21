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
  getAllFavorites,
} from "@/services/task/taskService";
import { MenuCard } from "@/components/MenuCards/MenuCard";
import { FavoritesType } from "@/types/tasks/favorites";
import { FavoriteItem } from "@/components/Favorite/favoriteItem";

const Page = () => {
  const [countAllTask, setCountAllTask] = useState<number>();
  const [countConcludeTask, setCountConcludeTask] = useState<number>();
  const [countNotConcludeTask, setCountNotConcludeTask] = useState<number>();
  const [countFavoritesTask, setCountFavoritesTask] = useState<number>();
  const [favorites, setFavorites] = useState<FavoritesType>();

  const getCounts = async () => {
    const count = await countTasks();
    const countConclude = await CountConclude();
    const countNotConclude = await CountNotConclude();
    const countFavorites = await CountFavorites();
    const fav = await getAllFavorites();
    setCountAllTask(count);
    setCountConcludeTask(countConclude);
    setCountNotConcludeTask(countNotConclude);
    setCountFavoritesTask(countFavorites);
    setFavorites(fav);
  };

  useEffect(() => {
    getCounts();
  }, []);

  console.log("Favoritos aqui:", favorites);
  return (
    <Layout>
      <div className=" flex flex-col h-full justify-around">
        <header className="flex justify-between p-2">
          <MenuCard title="Total de Tarefas" value={countAllTask} />
          <MenuCard title="Tarefas Concluidas" value={countConcludeTask} />
          <MenuCard title="Tarefas a Fazer" value={countNotConcludeTask} />
          <MenuCard title="Favoritas" value={countFavoritesTask} />
        </header>

        <section className=" h-full flex items-center justify-around p-8">
          <div className=" w-[600px] h-96  flex flex-col overflow-x-hidden ">
            <header className="w-full h-10 bg-indigo-800 p-1 rounded-t-md items-center flex text-xl">
              Favoritos
            </header>
            <table className="flex flex-col mt-4 h-full">
              <thead>
                <tr className="flex  bg-gray-700">
                  <th className="flex-1 ">Titulo</th>
                  <th className="flex-1">Finalizado</th>
                  <th className="flex-1">Data</th>
                  <th className="flex-1">Remover</th>
                </tr>
              </thead>
              <tbody className="flex flex-col gap-4 bg-gray-300 rounded-b p-3">
                {favorites !== undefined &&
                  favorites.favorites.map((item) => (
                    <FavoriteItem task={item} key={item.id} />
                  ))}
              </tbody>
            </table>
          </div>

          <div className="w-[500px] h-72 bg-indigo-800 rounded-xl  flex flex-col justify-around p-4">
            <h1 className=" text-center text-2xl ">Frase do Dia:</h1>

            <p className="h-32 text-center text-xl">
              “Pequenos passos diários constroem grandes conquistas ao longo do
              tempo.” 🚀
            </p>
          </div>
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
