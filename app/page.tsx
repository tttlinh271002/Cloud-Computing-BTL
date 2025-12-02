"use client";

import type React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { ChatSidebar } from "@/components/chat-sidebar";
import { ChatHeader } from "@/components/chat-header";
import { MessageList } from "@/components/message-list";
import { MessageInput } from "@/components/message-input";

interface Message {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
}

interface ChatSession {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
}

export default function ChatBot() {
  const [sessions, setSessions] = useState<ChatSession[]>([
    {
      id: "session-1",
      title: "New Chat",
      messages: [
        {
          id: "1",
          content: "Xin chào! Tôi có thể giúp gì cho bạn",
          sender: "bot",
          timestamp: new Date(),
        },
      ],
      createdAt: new Date(),
    },
  ]);

  const [currentSessionId, setCurrentSessionId] = useState("session-1");
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const currentSession = sessions.find((s) => s.id === currentSessionId);
  const messages = currentSession?.messages || [];

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") || "light";
    setIsDark(storedTheme === "dark");
  }, []);

  // -----------------------------
  // 🔥 API TẠO TIÊU ĐỀ DỰA TRÊN TIN NHẮN ĐẦU TIÊN
  // -----------------------------
  const generateTitle = async (userText: string) => {
    try {
      const res = await axios.post("/api/generate-title", {
        text: userText,
      });
      return res.data.title || "New Chat";
    } catch (e) {
      console.error("Error generating title:", e);
      return "New Chat";
    }
  };

  // -----------------------------
// 🔥 CHATBOT OFFLINE – FIX CỨNG 3 CÂU TRẢ LỜI
// -----------------------------
const callChatApi = async (userInput: string) => {
  const q = userInput.toLowerCase().trim();

  // Câu 1
  if (q.includes("bảo hiểm xã hội bắt buộc là gì")) {
    return {
      choices: [
        {
          message: {
            content: `BHXH bắt buộc là loại hình bảo hiểm do Nhà nước tổ chức, người lao động và người sử dụng lao động phải tham gia bắt buộc theo quy định.

BHXH bắt buộc nhằm đảm bảo cho người lao động được bù đắp thu nhập khi gặp các rủi ro như:
- Ốm đau
- Thai sản
- Tai nạn lao động – bệnh nghề nghiệp
- Hưu trí
- Tử tuất

Người lao động khi đi làm ở công ty theo HĐLĐ thuộc các nhóm từ 1 tháng trở lên đều phải tham gia BHXH bắt buộc.`
          }
        }
      ]
    };
  }

  // Câu 2
  if (
    q.includes("11 triệu") ||
    q.includes("23 tuổi") ||
    q.includes("quyền lợi gì") ||
    q.includes("đóng bảo hiểm xã hội")
  ) {
    return {
      choices: [
        {
          message: {
            content: `Mức đóng 11 triệu/tháng ⇒ được hưởng các chế độ sau:

(a) **Ốm đau**  
Hưởng tiền khi nghỉ ốm, nghỉ chăm con ốm.  
👉 Số tiền = 75% mức đóng (tương ứng 75% × 11.000.000).

(b) **Thai sản**  
Nếu bạn là nữ (hoặc vợ bạn sinh con nếu bạn là nam), bạn hoặc gia đình sẽ nhận:  
- Thai sản 6 tháng với mức = 100% bình quân lương 6 tháng trước sinh.  
👉 Khoảng 11 triệu/tháng × 6 = 66 triệu.  
- Trợ cấp một lần khi sinh con: 2.98 triệu (hiện nay).

(c) **Tai nạn lao động – bệnh nghề nghiệp**  
Hưởng chi phí y tế + trợ cấp theo tỷ lệ suy giảm khả năng lao động.

(d) **Hưu trí**  
Khi đủ tuổi (nữ 60, nam 62) và đủ 20 năm đóng BHXH → được hưởng lương hưu hàng tháng.  
👉 Lương hưu = khoảng 45–75% mức bình quân tiền lương đóng BHXH.

(e) **Tử tuất**  
- Trợ cấp mai táng (18.000.000).  
- Trợ cấp tuất một lần hoặc tuất hàng tháng.`
          }
        }
      ]
    };
  }

  // Câu 3
  if (q.includes("bhxh là gì") || q === "bhxh la gi") {
    return {
      choices: [
        {
          message: {
            content: `BHXH (Bảo hiểm xã hội) là chính sách an sinh do Nhà nước tổ chức, nhằm bù đắp hoặc thay thế thu nhập cho người lao động khi họ bị giảm hoặc mất thu nhập do:

- Ốm đau
- Thai sản
- Tai nạn lao động – bệnh nghề nghiệp
- Nghỉ hưu
- Tử tuất

BHXH giúp người lao động có thu nhập ổn định và đảm bảo cuộc sống khi về già.

BHXH gồm 2 loại:
1. **BHXH bắt buộc**: Người lao động có hợp đồng từ 1 tháng trở lên phải tham gia.
2. **BHXH tự nguyện**: Người dân tự đóng để đủ điều kiện hưởng lương hưu.`
          }
        }
      ]
    };
  }

  // Trường hợp không khớp
  return {
    choices: [
      {
        message: {
          content: "Xin lỗi, tôi hiện chỉ hỗ trợ 3 câu hỏi mẫu mà bạn đã cấu hình."
        }
      }
    ]
  };
};


  // -----------------------------
  // 🔥 GỬI TIN NHẮN
  // -----------------------------
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userContent = input;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: userContent,
      sender: "user",
      timestamp: new Date(),
    };

    // Thêm tin nhắn người dùng
    setSessions((prev) =>
      prev.map((session) =>
        session.id === currentSessionId
          ? { ...session, messages: [...session.messages, userMessage] }
          : session
      )
    );

    // -----------------------------
    // 🔥 TẠO TIÊU ĐỀ TỰ ĐỘNG CHO SESSION
    // -----------------------------
    if (currentSession && currentSession.title === "New Chat") {
      const newTitle = await generateTitle(userContent);

      setSessions((prev) =>
        prev.map((session) =>
          session.id === currentSessionId ? { ...session, title: newTitle } : session
        )
      );
    }

    setInput("");
    setIsLoading(true);

    // Gọi API chatbot
    const response = await callChatApi(userContent);

    const botMessage: Message = {
      id: (Date.now() + 1).toString(),
      content: response?.choices?.[0]?.message?.content || "Không có phản hồi.",
      sender: "bot",
      timestamp: new Date(),
    };

    // Thêm tin nhắn bot
    setSessions((prev) =>
      prev.map((session) =>
        session.id === currentSessionId
          ? { ...session, messages: [...session.messages, botMessage] }
          : session
      )
    );

    setIsLoading(false);
  };

  // -----------------------------
  // 🔥 TẠO CUỘC CHAT MỚI
  // -----------------------------
  const handleNewChat = () => {
    const newSession: ChatSession = {
      id: `session-${Date.now()}`,
      title: "New Chat",
      messages: [
        {
          id: "1",
          content: "Hey! How can I help you today?",
          sender: "bot",
          timestamp: new Date(),
        },
      ],
      createdAt: new Date(),
    };

    setSessions((prev) => [newSession, ...prev]);
    setCurrentSessionId(newSession.id);
  };

  const handleDeleteSession = (id: string) => {
    setSessions((prev) => prev.filter((s) => s.id !== id));
    if (currentSessionId === id) {
      setCurrentSessionId(sessions[0]?.id || "");
    }
  };

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    const theme = newIsDark ? "dark" : "light";
    localStorage.setItem("theme", theme);
    document.documentElement.classList.toggle("dark", newIsDark);
  };

  return (
    <div className="flex h-screen bg-background">
      {isSidebarOpen && (
        <ChatSidebar
          sessions={sessions}
          currentSessionId={currentSessionId}
          onSelectSession={setCurrentSessionId}
          onNewChat={handleNewChat}
          onDeleteSession={handleDeleteSession}
        />
      )}

      <div className="flex flex-col w-full">
        <ChatHeader
          isDark={isDark}
          onToggleTheme={toggleTheme}
          isSidebarOpen={isSidebarOpen}
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        />

        <MessageList messages={messages} isLoading={isLoading} />

        <MessageInput
          value={input}
          isLoading={isLoading}
          onInputChange={setInput}
          onSendMessage={handleSendMessage}
        />
      </div>
    </div>
  );
}