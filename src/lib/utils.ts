import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { CreateTodoInput, UpdateTodoInput, Todo } from "@/types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// API utility functions for todos
export const todoApi = {
  async fetchTodos(): Promise<Todo[]> {
    const response = await fetch("/api/todos")
    if (!response.ok) {
      throw new Error("Failed to fetch todos")
    }
    return response.json()
  },

  async createTodo(todo: CreateTodoInput): Promise<Todo> {
    const response = await fetch("/api/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    })
    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || "Failed to create todo")
    }
    return response.json()
  },

  async updateTodo(id: string, updates: UpdateTodoInput): Promise<Todo> {
    const response = await fetch(`/api/todos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updates),
    })
    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || "Failed to update todo")
    }
    return response.json()
  },

  async deleteTodo(id: string): Promise<void> {
    const response = await fetch(`/api/todos/${id}`, {
      method: "DELETE",
    })
    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || "Failed to delete todo")
    }
  },
}

// Format date utility
export function formatDate(date: Date | string | null): string {
  if (!date) return "No due date"
  const d = new Date(date)
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

// Priority color utility
export function getPriorityColor(priority: string): string {
  switch (priority) {
    case "HIGH":
      return "bg-red-100 text-red-800 border-red-200"
    case "MEDIUM":
      return "bg-yellow-100 text-yellow-800 border-yellow-200"
    case "LOW":
      return "bg-green-100 text-green-800 border-green-200"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200"
  }
} 