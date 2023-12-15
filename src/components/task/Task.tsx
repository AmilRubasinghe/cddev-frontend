import { deleteTask, update } from "@/apis/taskApi/task-api";
import { ITask } from "@/apis/taskApi/tasks"
import { useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import Model from "./Model";

interface ITaskProps {
    task: ITask
    loadTasks: () => void
}

interface ITaskData {
    task: ITask
}

const Task: React.FC<ITaskProps> = ({ task, loadTasks }) => {

    const [openModalEdit, setOpenModalEdit] = useState<boolean>(false)
    const [openModalDelete, setOpenModalDelete] = useState<boolean>(false)

    const handleEditTodo = async (task: ITaskData) => {

        const { success } = await update(task);

        if (success) {
            setOpenModalEdit(false)
            loadTasks()
        }
    };
    const handleDeleteTodo = async (task: ITaskData) => {

        const { success } = await deleteTask(task);

        if (success) {
            loadTasks()
            setOpenModalDelete(false)
        }
    };


    return (

        <tr key={task.title} className="bg-base-200">

            <td className="max-w-sm truncate">{task.title}</td>
            <td className="max-w-sm truncate">{task.description}</td>
            <td className="flex w-auto gap-5 ">
                <input type="checkbox" checked={task.isCompleted} onClick={() => setOpenModalEdit(true)} className="checkbox checkbox-primary" disabled={task.isCompleted} />
                <FiTrash2 cursor='pointer' onClick={() => setOpenModalDelete(true)} className="text-red-500" size={25} />
                <Model modalOpen={openModalDelete} setModalOpen={setOpenModalDelete} >
                    <h3 className="text-lg">Are you sure,You want to delete this task?</h3>
                    <div className="modal-action">
                        <button
                            className="btn btn-sm btn-outline"
                            onClick={() => handleDeleteTodo({ task })}
                        >Yes</button>
                    </div>

                </Model>
                <Model modalOpen={openModalEdit} setModalOpen={setOpenModalEdit} >
                    <h3 className="text-lg">Are you sure,You want to complete this task?</h3>
                    <div className="modal-action">
                        <button
                            className="btn btn-sm btn-outline"
                            onClick={() => handleEditTodo({ task })}
                        >Yes</button>
                    </div>

                </Model>

            </td>

        </tr>

    )
}

export default Task