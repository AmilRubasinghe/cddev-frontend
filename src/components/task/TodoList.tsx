'use client';
import { ITask } from '@/apis/taskApi/tasks';
import React from 'react'
import Task from './Task';

interface TodoListProps {
    tasks: ITask[]
    loadTasks: () => void
};

const TodoList: React.FC<TodoListProps> = ({ tasks, loadTasks }) => {

    return (
        <div className="overflow-x-auto">
            <table className="table mb-5">

                <thead>
                    <tr>

                        <th>Title</th>
                        <th>Description</th>
                        <th>Action</th>

                    </tr>
                </thead>
                <tbody>
                    {tasks.map(task => (
                        <Task key={task.title} task={task} loadTasks={loadTasks} />
                    ))}


                </tbody>
            </table>
        </div>
    )
}

export default TodoList