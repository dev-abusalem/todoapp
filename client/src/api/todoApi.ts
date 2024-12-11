import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000/api";

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

export const getTodos = async (): Promise<Todo[]> => {
  const response = await axios.get(`${API_BASE_URL}/getTodos`);
  return response.data;
};

export const addTodo = async (title: string): Promise<Todo> => {
  const response = await axios.post(`${API_BASE_URL}/createTodo/`, { title });
  return response.data;
};

export const updateTodo = async (
  id: number,
  completed: boolean
): Promise<Todo> => {
  const response = await axios.patch(`${API_BASE_URL}/updateTodo/${id}`, {
    completed,
  });
  return response.data;
};

export const deleteTodo = async (id: number): Promise<void> => {
  await axios.delete(`${API_BASE_URL}/deleteTodo/${id}`);
};
