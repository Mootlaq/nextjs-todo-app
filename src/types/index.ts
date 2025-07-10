import { Priority } from '@prisma/client'

export interface Todo {
  id: string
  title: string
  description?: string | null
  completed: boolean
  priority: Priority
  dueDate?: Date | null
  createdAt: Date
  updatedAt: Date
  userId: string
}

export interface CreateTodoInput {
  title: string
  description?: string
  priority?: Priority
  dueDate?: Date
}

export interface UpdateTodoInput {
  title?: string
  description?: string
  completed?: boolean
  priority?: Priority
  dueDate?: Date | null
}

export interface User {
  id: string
  name?: string | null
  email: string
  image?: string | null
}

export interface TodoWithUser extends Todo {
  user: User
} 