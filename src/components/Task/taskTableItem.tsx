import { Task } from "@/types/tasks/tasks";
import { FaCheckCircle } from "react-icons/fa";
import { MdOutlineCancel } from "react-icons/md";
import { FaPenAlt } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import { BiSolidShow } from "react-icons/bi";
import { deleteTask } from "@/services/task/taskService";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { ShowView } from "./ShowView";
import { useState } from "react";
import { EditTask } from "./editTask";

type Props = {
  task: Task;
};

export const TaskTableItem = ({ task }: Props) => {
  const router = useRouter();
  const title = task.title.slice(0, 12) + "...";
  const content = task.content.slice(0, 12) + "...";
  const data = task.createdAt.split("T")[0];
  const [showV, setShowV] = useState(false);
  const [editTask, seteditTask] = useState(false);

  const deleteItem = async (id: number) => {
    const deletedTask = await deleteTask(id);
    if (deletedTask) toast.success("Task Deletada");
    router.reload();
  };

  const alterShowV = () => setShowV((prev) => !prev);

  return (
    <>
      <tr className="bg-gray-300 flex h-12 rounded text-gray-900">
        <td className="flex-1  items-center justify-center flex">{title}</td>
        <td className="flex-1  items-center justify-center flex">{content}</td>
        <td className="flex-1  items-center justify-center flex">
          {task.completed ? (
            <FaCheckCircle
              className={`bg-green-400 rounded-full text-white`}
              size={24}
            />
          ) : (
            <MdOutlineCancel
              className={`bg-red-500 rounded-full text-white`}
              size={24}
            />
          )}
        </td>
        <td className="flex-1  items-center justify-center flex">{data}</td>
        <td
          className="flex-1  items-center justify-center flex  hover:bg-gray-400"
          onClick={() => seteditTask(true)}
        >
          <div className="flex items-center justify-center w-8 h-8 bg-amber-500 rounded ">
            <FaPenAlt />
          </div>
        </td>
        <td
          className="flex-1  items-center justify-center flex hover:bg-gray-400"
          onClick={() => deleteItem(task.id)}
        >
          <div className="flex items-center justify-center w-8 h-8 bg-red-500 rounded">
            <FaTrashAlt />
          </div>
        </td>
        <td
          className="flex-1  items-center justify-center flex hover:bg-gray-400"
          onClick={() => alterShowV()}
        >
          <div className="flex items-center justify-center w-8 h-8 bg-gray-500 text-white rounded">
            <BiSolidShow />
          </div>
        </td>
      </tr>

      {showV && <ShowView showVClose={alterShowV} task={task} />}
      {editTask && <EditTask Close={seteditTask} task={task} />}
    </>
  );
};
