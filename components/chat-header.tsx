"use client"

import { Moon, Sun, Menu, X } from 'lucide-react'

interface ChatHeaderProps {
  isDark: boolean
  onToggleTheme: () => void
  isSidebarOpen: boolean
  onToggleSidebar: () => void
}

export function ChatHeader({ isDark, onToggleTheme, isSidebarOpen, onToggleSidebar }: ChatHeaderProps) {
  return (
    <div className="bg-card border-b border-border px-6 py-4 shadow-sm flex items-center justify-between">
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="p-2 hover:bg-secondary rounded-lg transition-colors text-foreground"
          aria-label="Toggle sidebar"
        >
          {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center text-primary-foreground font-semibold">
          A
        </div>
        <div>
          <h1 className="font-semibold text-foreground">AI Assistant</h1>
          <p className="text-xs text-muted-foreground">Always available</p>
        </div>
      </div>
      <button
        onClick={onToggleTheme}
        className="p-2 hover:bg-secondary rounded-lg transition-colors text-foreground"
        aria-label="Toggle dark mode"
      >
        {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
      </button>
    </div>
  )
}
