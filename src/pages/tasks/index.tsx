import Layout from "@/components/layout/layout";
import { AddTaskButton } from "@/components/Task/addTaskButton";
import { TaskTableItem } from "@/components/Task/taskTableItem";
import { getApiClient } from "@/services/axios";
import { getAllTasks } from "@/services/task/taskService";
import { Task } from "@/types/tasks/tasks";
import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";

const Page = () => {
  const [tasks, setTasks] = useState<Task[] | null>([]);
  const [page, setPage] = useState<number>(1);

  const getTasks = async (page: number) => {
    const allTasks = await getAllTasks(page);
    setTasks(allTasks);
  };

  useEffect(() => {
    getTasks(page);
  }, []);

  useEffect(() => {
    getTasks(page);
  }, [page]);

  return (
    <Layout>
      <div className=" flex  flex-col gap-2 ">
        <section id="buttons-area" className="w-full p-1">
          <AddTaskButton />
        </section>

        <section id="Tasks" className="w-full h-[600px] p-2">
          <div className="bg-indigo-800 w-full p-2 rounded-t text-xl">
            Tarefas
          </div>

          {!tasks ||
            (tasks.length === 0 && (
              <div className="h-[440px] flex items-center justify-center text-2xl text-black">
                <h1>Não Há tasks Encontradas !!!</h1>
              </div>
            ))}

          {tasks && tasks.length > 0 && (
            <table className="flex flex-col w-full h-[540px] overflow-x-hidden scrollbar-hide ">
              <thead className="mb-2">
                <tr className="flex bg-gray-700">
                  <th className="flex-1">Titulo</th>
                  <th className="flex-1">Descrição</th>
                  <th className="flex-1">Finalizado</th>
                  <th className="flex-1">Criado</th>
                  <th className="flex-1">Alterar</th>
                  <th className="flex-1">Deletar</th>
                  <th className="flex-1">Visualizar</th>
                </tr>
              </thead>
              <tbody className="flex flex-col gap-2">
                {tasks &&
                  tasks.map((item) => (
                    <TaskTableItem task={item} key={item.id} />
                  ))}
              </tbody>
            </table>
          )}
        </section>

        <div className="w-full  flex items-center justify-center gap-2">
          <button
            onClick={() => {
              page === 1 ? setPage(1) : setPage(page - 1);
            }}
            className="bg-indigo-800 px-2 py-1 rounded-xl"
          >
            voltar
          </button>
          <button className="text-black">{page}</button>
          <button
            onClick={() => setPage(page + 1)}
            className="bg-indigo-800 px-2 py-1 rounded-xl"
          >
            avançar
          </button>
        </div>
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
