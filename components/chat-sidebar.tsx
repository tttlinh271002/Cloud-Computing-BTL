"use client"
import { Plus, MessageCircle, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ChatSession {
  id: string
  title: string
  messages: Array<{
    id: string
    content: string
    sender: "user" | "bot"
    timestamp: Date
  }>
  createdAt: Date
}

interface ChatSidebarProps {
  sessions: ChatSession[]
  currentSessionId: string
  onSelectSession: (id: string) => void
  onNewChat: () => void
  onDeleteSession: (id: string) => void
}

export function ChatSidebar({
  sessions,
  currentSessionId,
  onSelectSession,
  onNewChat,
  onDeleteSession,
}: ChatSidebarProps) {
  return (
    <div className="w-64 bg-card border-r border-border flex flex-col overflow-hidden shadow-lg">
      <div className="p-4 border-b border-border">
        <Button
          onClick={onNewChat}
          className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg"
        >
          <Plus className="w-4 h-4" />
          New Chat
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {sessions.map((session) => (
          <div
            key={session.id}
            className={`group p-3 rounded-lg cursor-pointer transition-all ${
              currentSessionId === session.id
                ? "bg-primary/10 border border-primary"
                : "border border-transparent hover:bg-secondary"
            }`}
            onClick={() => onSelectSession(session.id)}
          >
            <div className="flex items-start gap-2">
              <MessageCircle className="w-4 h-4 mt-0.5 flex-shrink-0 text-primary" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{session.title}</p>
                <p className="text-xs text-muted-foreground">{session.messages.length} messages</p>
              </div>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation()
                onDeleteSession(session.id)
              }}
              className="opacity-0 group-hover:opacity-100 transition-opacity mt-2 p-1 hover:bg-destructive/10 rounded text-destructive"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
