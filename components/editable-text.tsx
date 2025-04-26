"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { cn } from "@/lib/utils"
import { Pencil } from "lucide-react"

interface EditableTextProps {
  value: string
  onChange: (value: string) => void
  className?: string
}

export default function EditableText({ value, onChange, className }: EditableTextProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [editedValue, setEditedValue] = useState(value)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus()
      inputRef.current.select()
    }
  }, [isEditing])

  useEffect(() => {
    setEditedValue(value)
  }, [value])

  const handleClick = () => {
    setIsEditing(true)
  }

  const handleBlur = () => {
    setIsEditing(false)
    onChange(editedValue)
  }

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditedValue(e.target.value)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      setIsEditing(false)
      onChange(editedValue)
    }
  }

  return isEditing ? (
    <textarea
      ref={inputRef}
      value={editedValue}
      onChange={handleChange}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      className={cn(
        "w-full resize-none overflow-hidden bg-white/50 backdrop-blur-sm border border-indigo-200 rounded p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500",
        className,
      )}
      style={{ minHeight: "1em" }}
    />
  ) : (
    <div
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "relative cursor-text group transition-all duration-200",
        "border border-dashed border-transparent hover:border-indigo-300 rounded px-2 py-1 -mx-2 -my-1",
        "hover:bg-indigo-50/50",
        className,
      )}
    >
      <div className="relative">
        {value}
        <div
          className={`absolute right-0 top-1/2 -translate-y-1/2 transform ${isHovered ? "opacity-100" : "opacity-0"} transition-opacity duration-200 bg-indigo-100 rounded-full p-1 ml-2`}
        >
          <Pencil className="h-3 w-3 text-indigo-600" />
        </div>
      </div>
      {isHovered && (
        <div className="absolute -top-7 left-0 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-90 whitespace-nowrap">
          Click to edit
        </div>
      )}
    </div>
  )
}
