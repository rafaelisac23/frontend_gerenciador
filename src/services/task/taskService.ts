import { createTaskSchemaOutput, TaskType } from "@/types/tasks/tasks";
import { api } from "../api";
import { boolean } from "zod";

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
