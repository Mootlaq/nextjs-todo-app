"use client"

import { useState } from "react"
import { Check, Edit2, Trash2, Calendar, Save, X } from "lucide-react"
import { Todo, UpdateTodoInput } from "@/types"
import { Priority } from "@prisma/client"
import { formatDate, getPriorityColor } from "@/lib/utils"

interface TodoItemProps {
  todo: Todo
  onUpdate: (id: string, updates: UpdateTodoInput) => Promise<void>
  onDelete: (id: string) => Promise<void>
  isUpdating?: boolean
}

export default function TodoItem({ todo, onUpdate, onDelete, isUpdating = false }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editTitle, setEditTitle] = useState(todo.title)
  const [editDescription, setEditDescription] = useState(todo.description || "")
  const [editPriority, setEditPriority] = useState(todo.priority)
  const [editDueDate, setEditDueDate] = useState(
    todo.dueDate ? new Date(todo.dueDate).toISOString().split('T')[0] : ""
  )

  const handleToggleComplete = async () => {
    await onUpdate(todo.id, { completed: !todo.completed })
  }

  const handleSaveEdit = async () => {
    if (!editTitle.trim()) return

    await onUpdate(todo.id, {
      title: editTitle.trim(),
      description: editDescription.trim() || undefined,
      priority: editPriority,
      dueDate: editDueDate ? new Date(editDueDate) : null,
    })
    setIsEditing(false)
  }

  const handleCancelEdit = () => {
    setEditTitle(todo.title)
    setEditDescription(todo.description || "")
    setEditPriority(todo.priority)
    setEditDueDate(todo.dueDate ? new Date(todo.dueDate).toISOString().split('T')[0] : "")
    setIsEditing(false)
  }

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this todo?")) {
      await onDelete(todo.id)
    }
  }

  const isOverdue = todo.dueDate && new Date(todo.dueDate) < new Date() && !todo.completed

  return (
    <div className={`bg-white rounded-lg border p-4 transition-all duration-200 ${
      todo.completed ? "opacity-75" : ""
    } ${isOverdue ? "border-red-200 bg-red-50" : "border-gray-200"}`}>
      {isEditing ? (
        <div className="space-y-3">
          {/* Edit Title */}
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Todo title"
          />

          {/* Edit Description */}
          <textarea
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            rows={2}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Description"
          />

          {/* Edit Priority and Due Date */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <select
              value={editPriority}
              onChange={(e) => setEditPriority(e.target.value as Priority)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value={Priority.LOW}>Low</option>
              <option value={Priority.MEDIUM}>Medium</option>
              <option value={Priority.HIGH}>High</option>
            </select>

            <input
              type="date"
              value={editDueDate}
              onChange={(e) => setEditDueDate(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Edit Actions */}
          <div className="flex space-x-2">
            <button
              onClick={handleSaveEdit}
              disabled={!editTitle.trim() || isUpdating}
              className="flex items-center px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save className="w-4 h-4 mr-1" />
              Save
            </button>
            <button
              onClick={handleCancelEdit}
              disabled={isUpdating}
              className="flex items-center px-3 py-1 bg-gray-600 text-white rounded-md hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <X className="w-4 h-4 mr-1" />
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3 flex-1">
            {/* Completion Checkbox */}
            <button
              onClick={handleToggleComplete}
              disabled={isUpdating}
              className={`mt-1 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                todo.completed
                  ? "bg-green-500 border-green-500 text-white"
                  : "border-gray-300 hover:border-green-400"
              } ${isUpdating ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              {todo.completed && <Check className="w-3 h-3" />}
            </button>

            {/* Todo Content */}
            <div className="flex-1 min-w-0">
              <h4 className={`text-lg font-medium ${
                todo.completed ? "line-through text-gray-500" : "text-gray-900"
              }`}>
                {todo.title}
              </h4>
              
              {todo.description && (
                <p className={`mt-1 text-sm ${
                  todo.completed ? "line-through text-gray-400" : "text-gray-600"
                }`}>
                  {todo.description}
                </p>
              )}

              {/* Meta Information */}
              <div className="flex flex-wrap items-center gap-3 mt-3">
                {/* Priority Badge */}
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(todo.priority)}`}>
                  {todo.priority}
                </span>

                {/* Due Date */}
                {todo.dueDate && (
                  <div className={`flex items-center text-xs ${
                    isOverdue ? "text-red-600" : "text-gray-500"
                  }`}>
                    <Calendar className="w-3 h-3 mr-1" />
                    {formatDate(todo.dueDate)}
                    {isOverdue && <span className="ml-1 font-medium">(Overdue)</span>}
                  </div>
                )}

                {/* Created Date */}
                <span className="text-xs text-gray-400">
                  Created {formatDate(todo.createdAt)}
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2 ml-4">
            <button
              onClick={() => setIsEditing(true)}
              disabled={isUpdating}
              className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              title="Edit todo"
            >
              <Edit2 className="w-4 h-4" />
            </button>
            <button
              onClick={handleDelete}
              disabled={isUpdating}
              className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              title="Delete todo"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
} 