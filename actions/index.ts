"use server";

import db from "@/db";
import type { Todo } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const getTodos = async (): Promise<Todo[]> => {
  return await db.todo.findMany();
};

export const getTodosIds = async (): Promise<number[]> => {
  const todos = await db.todo.findMany({ select: { id: true } });
  return todos.map((todo) => todo.id);
};

export const addTodo = async (text: string) => {
  const newTodo = await db.todo.create({
    data: {
      text,
      isDone: false,
    },
  });

  revalidatePath("/");
  return newTodo;
};

export const editTodo = async (id: number, data: Partial<Todo>) => {
  const updatedTodo = await db.todo.update({
    where: { id },
    data,
  });

  revalidatePath("/");
  return updatedTodo;
};

export const deleteTodo = async (id: number) => {
  const deleted = await db.todo.deleteMany({ where: { id } });

  revalidatePath("/");
  return deleted;
};

export const deleteTodos = async () => {
  const deletedAll = await db.todo.deleteMany();

  revalidatePath("/");
  return deletedAll;
};
