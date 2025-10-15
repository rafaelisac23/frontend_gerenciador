import { AddTask } from "@/services/task/taskService";
import { createTaskSchema, createTaskSchemaOutput } from "@/types/tasks/tasks";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

export const AddTaskButton = () => {
  const Router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createTaskSchema),
    defaultValues: {
      completed: "false",
    },
  });

  const [showModal, setShowModal] = useState(false);

  const OnSubmit: SubmitHandler<createTaskSchemaOutput> = async (data) => {
    const addedTask = await AddTask(data);

    if (addedTask) {
      toast.success("Task Adcionada");
      setShowModal(false);
      Router.reload();
    }
  };

  return (
    <>
      <button
        className=" px-6 py-4 rounded-2xl bg-indigo-800 hover:bg-indigo-900 cursor-pointer"
        onClick={() => setShowModal(true)}
      >
        adcionar
      </button>

      {showModal && (
        <form
          className="w-screen h-screen fixed inset-0 bg-black/50 flex items-center justify-center"
          onSubmit={handleSubmit(OnSubmit)}
        >
          <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4 text-gray-700">
              Adcionar Task
            </h2>

            <div className="p-4  mb-4 flex flex-col gap-4">
              <input
                {...register("title")}
                type="text"
                className="border border-black w-[90%] text-black p-1 rounded"
                placeholder="Titulo"
              />
              {errors.title && (
                <span className="text-red-500">{errors.title.message}</span>
              )}

              <textarea
                {...register("content")}
                className="w-[90%] h-40 text-black border border-black p-1"
                placeholder="Escreva o conteudo da Task"
              />
              {errors.content && (
                <span className="text-red-500">{errors.content.message}</span>
              )}

              <label className="text-black flex gap-2">
                <input type="radio" value="true" {...register("completed")} />
                Concluída
              </label>

              <label className="text-black flex gap-2">
                <input type="radio" value="false" {...register("completed")} />
                Pendente
              </label>

              {errors.completed && (
                <span className="text-red-500">{errors.completed.message}</span>
              )}
            </div>

            <div className="flex justify-end gap-2">
              <button
                type="button"
                className="px-4 py-2 bg-gray-600 rounded-lg"
                onClick={() => setShowModal(false)}
              >
                Cancelar
              </button>
              <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg">
                Confirmar
              </button>
            </div>
          </div>
        </form>
      )}
    </>
  );
};
