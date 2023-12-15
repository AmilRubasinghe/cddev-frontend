import { FormEvent } from "react";
import { ITask } from "./tasks";
import { TaskSchemaType } from "@/components/task/loginFormSchema";

const baseUrl = "http://localhost:8080";

const url = `${baseUrl}/task-details`;

async function fetchData(input: RequestInfo, init?: RequestInit) {
  try {
    const response = await fetch(input, init);
    if (response) return await response.json();
    else return {};
  } catch (error) {
    throw Error("Error occurred");
  }
}
export interface IBaseResponse<T> {
  message: string;
  success: boolean;
  data: T;
}

export async function fetchTask(): Promise<IBaseResponse<ITask[]>> {
  const response = await fetchData(url, {
    method: "GET",
  });
  return response;
}

export interface ITaskInput {
  title: string;
  description: string;
}

export async function createTask(todo: TaskSchemaType) {
  const response = await fetchData(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  });
  return response;
}

interface TaskProps {
  task: ITask;
}

export async function update(data: TaskProps) {
  const { id } = data.task;
  const body = JSON.stringify({ isCompleted: true });

  const response = await fetchData(` ${url}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: body,
  });
  return response;
}

export async function deleteTask(data: TaskProps) {
  const { id } = data.task;

  const response = await fetchData(` ${url}/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
}
