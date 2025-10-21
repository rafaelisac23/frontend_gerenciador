import { newFavorite } from "@/services/favorites/favoriteService";
import { AlterTask, concludeOrNotTask } from "@/services/task/taskService";
import { FormType, Task } from "@/types/tasks/tasks";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

type Props = {
  task: Task;
  Close: (status: boolean) => void;
};

export const EditTask = ({ task, Close }: Props) => {
  const router = useRouter();
  const { register, handleSubmit } = useForm<FormType>();

  const handleEditTask = async (data: FormType) => {
    //Filtra os campos vazios
    const filteredData: FormType = Object.fromEntries(
      Object.entries(data).filter(([key, value]) => value !== "")
    );

    if (Object.keys(filteredData).length === 0) {
      toast.error("Preencha pelo menos 1 Campo");
      return;
    }

    const alteredTask = await AlterTask(task.id, filteredData);
    if (alteredTask) {
      toast.success("Task Alterada");
      return router.reload();
    }
  };

  const addFavorite = async (taskId: number) => {
    const favorite = await newFavorite(taskId);

    if (favorite) toast.success("Adcionado ao favorito");
  };

  const handleConclude = async (taskid: number) => {
    const taskStatus = await concludeOrNotTask(taskid);

    if (taskStatus) {
      toast.success("Task Atualizada");
      router.reload();
    }
  };

  return (
    <div className="w-screen h-screen fixed inset-0 bg-black/60 flex items-center justify-center ">
      <div className="w-[500px]  bg-white rounded-lg flex flex-col p-2 gap-3">
        <div className=" flex justify-between">
          <h1 className="text-gray-900 text-lg">Editar Task</h1>
          <button
            className="bg-red-500 text-center w-8 h-8 rounded"
            onClick={() => Close(false)}
          >
            X
          </button>
        </div>

        <form
          action="#"
          method="POST"
          onSubmit={handleSubmit(handleEditTask)}
          className="space-y-6 "
        >
          <div className="">
            <label
              htmlFor="email"
              className="block text-sm/6 font-medium text-gray-900 "
            >
              Titulo:
            </label>
            <div className="mt-2">
              <input
                {...register("title")}
                id="title"
                name="title"
                type="text"
                placeholder={task.title}
                autoComplete="title"
                className="block w-full text-black border border-gray-900 rounded-md bg-white px-3 py-1.5 text-base  outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
              />
            </div>
          </div>

          <div className="mt-2">
            <label
              htmlFor="email"
              className="block text-sm/6 font-medium text-gray-900 "
            >
              Conteudo:
            </label>
            <textarea
              {...register("content")}
              id="content"
              name="content"
              placeholder={task.content}
              className=" h-[200px] block w-full text-black border border-gray-900 rounded-md bg-white px-3 py-1.5 text-base  outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
            ></textarea>
          </div>
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            >
              Salvar
            </button>
          </div>
        </form>

        <button
          onClick={() => addFavorite(task.id)}
          className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
        >
          Favoritar
        </button>

        <button
          onClick={() => handleConclude(task.id)}
          className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
        >
          {task.completed ? "Alterar: Não concluído" : "Alterar: Concluido"}
        </button>
      </div>
    </div>
  );
};
