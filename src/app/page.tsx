"use client"
import { fetchTask } from '@/apis/taskApi/task-api'
import { ITask } from '@/apis/taskApi/tasks'
import AddTask from '@/components/task/AddTask'
import TodoList from '@/components/task/TodoList'
import { useEffect, useState } from 'react'

export default function Home() {
  const [tasks, setTasks] = useState<ITask[]>([])

  async function loadTasks() {
    try {
      const response = await fetchTask();
      setTasks(response.data)
    } catch (error) {
      console.log(error);

    }
  }

  useEffect(() => { loadTasks(); }, [])

  return (
    <main className="max-w-4xl mx-auto mt-4">
      <div className='text-center my-5 flex flex-col gap-4'>
        <h1 className='text-2xl scroll-my-4 font-bold'>Todo List App</h1>
        <AddTask loadTasks={loadTasks} />
      </div>
      <TodoList tasks={tasks} loadTasks={loadTasks} />
    </main>
  )
}