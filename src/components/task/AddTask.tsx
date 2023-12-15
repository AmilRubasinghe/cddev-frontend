"use-client"
import { IoIosAdd } from "react-icons/io";
import Model from "./Model";
import { useState } from "react";
import CustomInput from "../customInput/customInput";
import taskSchema, { TaskSchemaType } from "./loginFormSchema";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { createTask } from "@/apis/taskApi/task-api";

interface LoadTaskProps {
    loadTasks: () => void
}

const AddTask: React.FC<LoadTaskProps> = ({ loadTasks }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<TaskSchemaType>({
        resolver: yupResolver(taskSchema),
    });

    const onSubmit = async (data: TaskSchemaType) => {

        const { success } = await createTask(data);

        if (success) {
            setModalOpen(false)
            loadTasks();
            reset()

        }
    };

    return (
        <div>
            <button onClick={() => setModalOpen(true)} className="btn btn-primary w-full">Add New Task <IoIosAdd className="ml-3" size={18} /></button>
            <Model modalOpen={modalOpen} setModalOpen={setModalOpen} >
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h3 className="font-bold text-lg">Add new task</h3>
                    <div className="modal-action row-auto">
                        <CustomInput
                            type="text"
                            label="Title"
                            name="title"
                            register={register}
                            errors={errors}
                        />
                        <CustomInput
                            type="text"
                            label="Description"
                            name="description"
                            register={register}
                            errors={errors}
                        />

                    </div>
                    <div className="my-8">
                        <button className="btn btn-outline btn-primary">Submit</button>
                    </div>
                </form>
            </Model>
        </div>
    )
}

export default AddTask


