import { consultFavorite } from "@/services/favorites/favoriteService";
import { Task } from "@/types/tasks/tasks";
import { useEffect, useState } from "react";
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa";

type Props = {
  showVClose: (status: boolean) => void;
  task: Task;
};

export const ShowView = ({ showVClose, task }: Props) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const analiseFavorite = async () => {
    const isFavorite = await consultFavorite(task.id);

    if (isFavorite.data.favorite === true) setIsFavorite(true);
  };

  useEffect(() => {
    analiseFavorite();
  }, []);

  return (
    <div
      className="w-screen h-screen fixed inset-0 bg-black/60 flex items-center justify-center "
      onClick={() => showVClose(false)}
    >
      <div className="w-[500px] bg-white flex flex-col p-2 rounded-xl gap-2 ">
        <div className="flex items-center justify-end">
          <button className="bg-red-500 text-center w-8 h-8 rounded">X</button>
        </div>
        <h1 className="text-gray-900">
          Titulo: <span className="font-bold">{task.title}</span>
        </h1>
        <div className="text-gray-900 w-full flex flex-col gap-2">
          <h1>Descrição:</h1>
          <text className="p-2 h-[300px] border border-gray-400 rounded overflow-x-hidden">
            {task.content}
          </text>
        </div>
        {isFavorite && (
          <div className="text-gray-900 flex items-center gap-2">
            Favorito: <FaStar />
          </div>
        )}
        {!isFavorite && (
          <div className="text-gray-900  flex items-center gap-2">
            Favorito: <FaRegStar />
          </div>
        )}
      </div>
    </div>
  );
};
