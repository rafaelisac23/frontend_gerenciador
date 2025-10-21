import toast from "react-hot-toast";
import { api } from "../api";

type ConsultFavorite = {
  favorite: boolean;
};

export const consultFavorite = async (taskId: number) => {
  return await api.get<ConsultFavorite>(`/fav/isFavorite?taskId=${taskId}`);
};

export const newFavorite = async (taskId: number) => {
  try {
    const isFavorite = await consultFavorite(taskId);

    if (isFavorite.data.favorite === true) {
      toast.error("Ja é um favorito");
      return;
    }

    return await api.post(`/fav/`, { taskId });
  } catch (err) {
    toast.error("Erro ao adcionar ao favorito");
  }
};

export const DeleteFavorite = async (taskId: number) => {
  try {
    const isFavorite = await consultFavorite(taskId);
    if (isFavorite.data.favorite === false) {
      toast.error("Não é um favorito");
      return;
    }

    return await api.delete("/fav/", { data: { taskId } });
  } catch (err) {
    toast.error("Erro ao Deletar favorito");
  }
};
