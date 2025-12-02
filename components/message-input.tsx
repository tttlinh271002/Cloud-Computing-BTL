"use client"

import type React from "react"
import { Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface MessageInputProps {
  value: string
  isLoading: boolean
  onInputChange: (value: string) => void
  onSendMessage: (e: React.FormEvent) => void
}

export function MessageInput({ value, isLoading, onInputChange, onSendMessage }: MessageInputProps) {
  return (
    <div className="bg-card border-t border-border p-4 shadow-lg">
      <form onSubmit={onSendMessage} className="flex gap-3">
        <Input
          type="text"
          placeholder="Type your message..."
          value={value}
          onChange={(e) => onInputChange(e.target.value)}
          disabled={isLoading}
          className="flex-1 bg-secondary rounded-full px-4 py-3 text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
        />
        <Button
          type="submit"
          disabled={isLoading || !value.trim()}
          className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-4 py-3 h-auto shadow-md transition-all disabled:opacity-50"
        >
          <Send className="w-4 h-4" />
        </Button>
      </form>
    </div>
  )
}
