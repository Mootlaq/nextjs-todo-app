"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { AlertCircle, CheckCircle, Clock, Filter } from "lucide-react"
import { Todo, CreateTodoInput, UpdateTodoInput } from "@/types"
import { todoApi } from "@/lib/utils"
import TodoForm from "./TodoForm"
import TodoItem from "./TodoItem"

type FilterType = "all" | "active" | "completed"

export default function TodoList() {
  const { status } = useSession()
  const [todos, setTodos] = useState<Todo[]>([])
  const [filter, setFilter] = useState<FilterType>("all")
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [updatingIds, setUpdatingIds] = useState<Set<string>>(new Set())
  const [error, setError] = useState("")

  // Fetch todos when user is authenticated
  useEffect(() => {
    if (status === "authenticated") {
      fetchTodos()
    } else if (status === "unauthenticated") {
      setIsLoading(false)
    }
  }, [status])

  const fetchTodos = async () => {
    try {
      setError("")
      const fetchedTodos = await todoApi.fetchTodos()
      setTodos(fetchedTodos)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch todos")
    } finally {
      setIsLoading(false)
    }
  }

  const handleCreateTodo = async (todoInput: CreateTodoInput) => {
    setIsSubmitting(true)
    try {
      const newTodo = await todoApi.createTodo(todoInput)
      setTodos(prev => [newTodo, ...prev])
    } catch (err) {
      throw err // Re-throw to let TodoForm handle the error
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleUpdateTodo = async (id: string, updates: UpdateTodoInput) => {
    setUpdatingIds(prev => new Set(prev).add(id))
    try {
      const updatedTodo = await todoApi.updateTodo(id, updates)
      setTodos(prev => prev.map(todo => 
        todo.id === id ? updatedTodo : todo
      ))
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update todo")
    } finally {
      setUpdatingIds(prev => {
        const newSet = new Set(prev)
        newSet.delete(id)
        return newSet
      })
    }
  }

  const handleDeleteTodo = async (id: string) => {
    setUpdatingIds(prev => new Set(prev).add(id))
    try {
      await todoApi.deleteTodo(id)
      setTodos(prev => prev.filter(todo => todo.id !== id))
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete todo")
    } finally {
      setUpdatingIds(prev => {
        const newSet = new Set(prev)
        newSet.delete(id)
        return newSet
      })
    }
  }

  // Filter todos based on current filter
  const filteredTodos = todos.filter(todo => {
    switch (filter) {
      case "active":
        return !todo.completed
      case "completed":
        return todo.completed
      default:
        return true
    }
  })

  // Calculate statistics
  const totalTodos = todos.length
  const completedTodos = todos.filter(todo => todo.completed).length
  const activeTodos = totalTodos - completedTodos

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your todos...</p>
        </div>
      </div>
    )
  }

  // Show authentication required
  if (status !== "authenticated") {
    return (
      <div className="text-center py-12">
        <div className="mb-4">
          <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Authentication Required</h3>
          <p className="text-gray-600">Please sign in to manage your todos.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header with Statistics */}
      <div className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center">
              <Clock className="w-8 h-8 text-blue-600 mr-3" />
              <div>
                <p className="text-2xl font-bold text-blue-900">{activeTodos}</p>
                <p className="text-sm text-blue-700">Active Tasks</p>
              </div>
            </div>
          </div>
          
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center">
              <CheckCircle className="w-8 h-8 text-green-600 mr-3" />
              <div>
                <p className="text-2xl font-bold text-green-900">{completedTodos}</p>
                <p className="text-sm text-green-700">Completed</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <div className="flex items-center">
              <Filter className="w-8 h-8 text-gray-600 mr-3" />
              <div>
                <p className="text-2xl font-bold text-gray-900">{totalTodos}</p>
                <p className="text-sm text-gray-700">Total Tasks</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex space-x-2">
          {(["all", "active", "completed"] as FilterType[]).map((filterType) => (
            <button
              key={filterType}
              onClick={() => setFilter(filterType)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === filterType
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center">
          <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
          <span className="text-sm text-red-700">{error}</span>
          <button
            onClick={() => setError("")}
            className="ml-auto text-red-500 hover:text-red-700"
          >
            ×
          </button>
        </div>
      )}

      {/* Todo Form */}
      <TodoForm onSubmit={handleCreateTodo} isSubmitting={isSubmitting} />

      {/* Todo List */}
      <div className="space-y-4">
        {filteredTodos.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              {filter === "all" ? (
                <>
                  <CheckCircle className="w-16 h-16 mx-auto mb-4" />
                  <h3 className="text-xl font-medium mb-2">No todos yet</h3>
                  <p>Create your first todo above to get started!</p>
                </>
              ) : filter === "active" ? (
                <>
                  <Clock className="w-16 h-16 mx-auto mb-4" />
                  <h3 className="text-xl font-medium mb-2">No active todos</h3>
                  <p>All your tasks are completed! 🎉</p>
                </>
              ) : (
                <>
                  <CheckCircle className="w-16 h-16 mx-auto mb-4" />
                  <h3 className="text-xl font-medium mb-2">No completed todos</h3>
                  <p>Complete some tasks to see them here.</p>
                </>
              )}
            </div>
          </div>
        ) : (
          filteredTodos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onUpdate={handleUpdateTodo}
              onDelete={handleDeleteTodo}
              isUpdating={updatingIds.has(todo.id)}
            />
          ))
        )}
      </div>
    </div>
  )
} 