"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { getTodos, addTodo, updateTodo, deleteTodo, Todo } from "@/api/todoApi";

export default function TodoList() {
  const [todos, setTodos] = React.useState<Todo[]>([]);
  const [newTask, setNewTask] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const { toast } = useToast();

  React.useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    setIsLoading(true);
    try {
      const fetchedTodos = await getTodos();
      setTodos(fetchedTodos);
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description: "Failed to fetch todos",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newTask.trim()) {
      setIsLoading(true);
      try {
        const newTodo = await addTodo(newTask.trim());
        setTodos((prev) => [...prev, newTodo]);
        setNewTask("");
      } catch (error) {
        console.log(error);

        toast({
          title: "Error",
          description: "Failed to add todo",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleToggle = async (id: number, completed: boolean) => {
    setIsLoading(true);
    try {
      const updatedTodo = await updateTodo(id, !completed);
      setTodos((prev) =>
        prev.map((todo) => (todo.id === id ? updatedTodo : todo))
      );
    } catch (error) {
      console.log(error);

      toast({
        title: "Error",
        description: "Failed to update todo",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    setIsLoading(true);
    try {
      await deleteTodo(id);
      setTodos((prev) => prev.filter((todo) => todo.id !== id));
    } catch (error) {
      console.log(error);

      toast({
        title: "Error",
        description: "Failed to delete todo",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto max-w-2xl px-4">
        <div className="rounded-lg bg-white p-8 shadow-sm">
          <h1 className="mb-6 text-center text-2xl font-semibold">
            To Do List
          </h1>

          <form onSubmit={handleSubmit} className="mb-6 flex gap-2">
            <Input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Add new task"
              className="flex-1"
            />
            <Button type="submit" disabled={isLoading}>
              Add
            </Button>
          </form>

          <div className="space-y-4">
            {todos &&
              todos?.map((todo) => (
                <div
                  key={todo.id}
                  className="flex items-center gap-3 border-b pb-4 last:border-0"
                >
                  <Checkbox
                    checked={todo.completed}
                    onCheckedChange={() =>
                      handleToggle(todo.id, todo.completed)
                    }
                    disabled={isLoading}
                  />

                  <span
                    className={`flex-1 ${
                      todo.completed ? "text-gray-500 line-through" : ""
                    }`}
                  >
                    {todo.title}
                  </span>

                  <button
                    onClick={() => handleDelete(todo.id)}
                    className="text-sm text-red-600 hover:text-red-800"
                    disabled={isLoading}
                  >
                    Delete
                  </button>
                </div>
              ))}
          </div>
          {todos.length > 0 && (
            <p className="text-sm text-center font-light">
              Develop By Engr. Md Abu Salem
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
