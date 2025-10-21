import {
  createTaskSchemaOutput,
  FormType,
  TaskType,
} from "@/types/tasks/tasks";
import { api } from "../api";
import toast from "react-hot-toast";

export const AddTask = (data: createTaskSchemaOutput) => {
  const addedTask = api.post("/task", data);
  return addedTask;
};

export const getTasks = async (page: number): Promise<TaskType> => {
  const tasks = await api.get<TaskType>(`/task/all?page=${page}`);
  return tasks.data;
};

type countTaskType = {
  success: boolean;
  count: number;
};

export const countTasks = async () => {
  const count = await api.get<countTaskType>("/task/countAllTasks");
  return count.data.count;
};

export const CountConclude = async () => {
  const count = await api.get<countTaskType>("/task/countAllConcludeTasks");
  return count.data.count;
};

export const CountNotConclude = async () => {
  const count = await api.get<countTaskType>("/task/countAllNotConcludeTasks");
  return count.data.count;
};

export const CountFavorites = async () => {
  const count = await api.get<countTaskType>("/fav/countFavorites");
  return count.data.count;
};

export const getAllFavorites = async () => {
  const favorites = await api.get("/fav/");
  return favorites.data;
};

export const getAllTasks = async (page: number) => {
  const tasks = await api.get<TaskType>(`/task/all?page=${page}`);
  return tasks.data.tasks;
};

export const deleteTask = async (id: number) => {
  try {
    const tasks = await api.delete(`/task/${id}`);
    return tasks.data;
  } catch (err) {
    toast.error("Erro ao deletar task");
  }
};

export const AlterTask = async (taskID: number, data: FormType) => {
  try {
    return await api.put(`/task/${taskID}`, data);
  } catch (err) {
    toast.error("Erro ao alterar Task");
  }
};

export const concludeOrNotTask = async (taskid: number) => {
  try {
    return await api.put(`/task/${taskid}/status`);
  } catch (err) {
    toast.error("Erro ao alterar status");
  }
};
