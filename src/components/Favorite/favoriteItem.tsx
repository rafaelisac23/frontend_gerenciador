import { DeleteFavorite } from "@/services/favorites/favoriteService";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { FaCheckCircle, FaTrashAlt } from "react-icons/fa";
import { MdOutlineCancel } from "react-icons/md";

type TaskType = {
  id: number;
  title: string;
  content: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
  userId: number;
};

type Props = {
  task: TaskType;
};

export const FavoriteItem = ({ task }: Props) => {
  const data = task.createdAt.split("T")[0];
  const title = task.title.slice(0, 12) + "...";
  const router = useRouter();

  const handleDeleteFavorite = async (taskid: number) => {
    const deletedFavorite = await DeleteFavorite(taskid);

    if (deletedFavorite) {
      toast.success("Favorito Deletado");
      router.reload();
    }
  };

  return (
    <tr className="flex">
      <td className="flex-1 items-center justify-center flex text-gray-900 border-b border-white">
        {title}
      </td>

      <td
        className={`p-1 rounded flex-1 items-center justify-center flex border-b border-white`}
      >
        {task.completed ? (
          <FaCheckCircle className={`bg-green-400 rounded-full`} size={24} />
        ) : (
          <MdOutlineCancel className={`bg-red-500 rounded-full`} size={24} />
        )}
      </td>
      <td className="flex-1 items-center justify-center flex text-gray-900 border-b border-white">
        {data}
      </td>
      <td
        className="flex-1 items-center justify-center flex text-gray-900 border-b border-white hover:cursor-pointer p-2"
        onClick={() => handleDeleteFavorite(task.id)}
      >
        <div className="flex items-center justify-center w-6 h-6 bg-red-500 rounded">
          <FaTrashAlt />
        </div>
      </td>
    </tr>
  );
};
