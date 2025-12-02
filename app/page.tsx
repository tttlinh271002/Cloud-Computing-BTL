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
  // 🔥 CHATBOT OFFLINE – FIX CỨNG 6 CÂU TRẢ LỜI
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

Người lao động khi đi làm ở công ty theo HĐLĐ thuộc các nhóm từ 1 tháng trở lên đều phải tham gia BHXH bắt buộc.`,
            },
          },
        ],
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
- Trợ cấp tuất một lần hoặc tuất hàng tháng.`,
            },
          },
        ],
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
2. **BHXH tự nguyện**: Người dân tự đóng để đủ điều kiện hưởng lương hưu.`,
            },
          },
        ],
      };
    }

    // Câu 4
    if (q.includes("xin chào") || q === "chào" || q === "hello") {
      return {
        choices: [
          {
            message: {
              content: `Xin chào bạn! 👋
Rất vui được hỗ trợ bạn về pháp luật Bảo hiểm xã hội Việt Nam.

Hiện bạn chưa đặt câu hỏi cụ thể. Bạn muốn mình tư vấn về vấn đề nào liên quan đến BHXH?
Ví dụ:

Điều kiện hưởng lương hưu

Hưởng BHXH một lần

Chế độ ốm đau, thai sản

Thời gian đóng – mức đóng BHXH

Quyền và trách nhiệm của người lao động, người sử dụng lao động

Bạn cứ nói rõ trường hợp của mình, mình sẽ hỗ trợ theo đúng quy định pháp luật hiện hành.

📄 (Thông tin mình sử dụng được đối chiếu theo nội dung Luật BHXH)`,
            },
          },
        ],
      };
    }

    // Câu 5
    if (
      q.includes("trợ cấp hưu trí") ||
      q.includes("huu tri") ||
      q.includes("hưu trí xã hội")
    ) {
      return {
        choices: [
          {
            message: {
              content: `Dưới đây là tổng quan đầy đủ và chính xác theo Luật Bảo hiểm xã hội về trợ cấp hưu trí xã hội – một trong các chế độ quan trọng của hệ thống BHXH Việt Nam.

🔶 1. Trợ cấp hưu trí xã hội là gì?

Theo Điều 1 và Điều 21 Luật BHXH, trợ cấp hưu trí xã hội là khoản hỗ trợ hằng tháng do ngân sách nhà nước chi trả cho công dân Việt Nam cao tuổi nhưng không có lương hưu và đáp ứng điều kiện luật định.

🔶 2. Đối tượng và điều kiện được hưởng (Điều 21)

Bạn được hưởng trợ cấp hưu trí xã hội nếu thuộc một trong hai nhóm:

(1) Từ đủ 75 tuổi trở lên, đồng thời:
- Không hưởng lương hưu hoặc trợ cấp BHXH hằng tháng;
- Có văn bản đề nghị hưởng trợ cấp.

(2) Từ 70 đến dưới 75 tuổi, khi đồng thời:
- Thuộc hộ nghèo hoặc hộ cận nghèo;
- Không hưởng lương hưu/trợ cấp BHXH hằng tháng;
- Có văn bản đề nghị hưởng trợ cấp.

🔶 3. Các chế độ được hưởng (Điều 22)

Người hưởng trợ cấp hưu trí xã hội được hưởng 3 quyền lợi chính:

1. Trợ cấp hằng tháng
Mức cụ thể do Chính phủ quy định và được rà soát điều chỉnh 3 năm một lần.
UBND cấp tỉnh có thể hỗ trợ thêm tùy điều kiện địa phương.

2. Được cấp thẻ bảo hiểm y tế miễn phí
Ngân sách nhà nước đóng BHYT cho người đang hưởng trợ cấp.

3. Hỗ trợ chi phí mai táng khi qua đời
Người lo mai táng được nhận khoản hỗ trợ theo quy định của pháp luật về người cao tuổi.

🔶 4. Trình tự và thủ tục hưởng (Điều 22 & 24)
Hồ sơ bao gồm:
- Văn bản đề nghị hưởng trợ cấp;
- Giấy tờ chứng minh độ tuổi, hộ nghèo/cận nghèo (nếu có).

Cơ quan tiếp nhận: UBND cấp xã hoặc cơ quan được phân cấp theo quy định.

🔶 5. Lưu ý quan trọng
Nếu một người đồng thời đủ điều kiện hưởng trợ cấp hưu trí xã hội và trợ cấp xã hội hằng tháng khác thì được hưởng mức cao hơn.
Độ tuổi hưởng có thể được giảm dần theo từng giai đoạn theo quyết định của Ủy ban Thường vụ Quốc hội.

🔶 Nếu bạn muốn tư vấn chi tiết hơn…
Bạn vui lòng cho mình biết thêm:
- Tuổi hiện tại
- Có đang hưởng lương hưu/trợ cấp BHXH hằng tháng không?
- Thuộc hộ nghèo/cận nghèo không?

Mình sẽ giúp bạn xác định có đủ điều kiện hưởng, mức hưởng và thủ tục cụ thể phù hợp với trường hợp của bạn.`,
            },
          },
        ],
      };
    }

    // Câu 6
    if (q.includes("20 tuổi") && q.includes("hưu")) {
      return {
        choices: [
          {
            message: {
              content: `Theo quy định hiện hành của Luật Bảo hiểm xã hội, 20 tuổi hoàn toàn không thể hưởng bất kỳ chế độ hưu trí nào.

🔶 1. Điều kiện tuổi để hưởng trợ cấp hưu trí xã hội
Luật quy định chỉ người từ 75 tuổi trở lên, hoặc từ 70–74 tuổi thuộc hộ nghèo/cận nghèo mới được hưởng trợ cấp hưu trí xã hội (Điều 21 Luật BHXH)

👉 Bạn 20 tuổi nên không thuộc nhóm này.

🔶 2. Điều kiện để hưởng lương hưu (chế độ hưu trí trong BHXH bắt buộc hoặc tự nguyện)
Người lao động chỉ được hưởng lương hưu khi:
- Đủ tuổi nghỉ hưu theo luật (hiện nay đối với nữ ~60 tuổi, nam ~62 tuổi, tùy năm);
- Đủ thời gian đóng BHXH theo quy định.

👉 Ở tuổi 20, bạn không thể đủ điều kiện về tuổi, dù có tham gia BHXH.

🔶 3. Kết luận
20 tuổi không thể hưởng bất kỳ chế độ hưu trí nào, bao gồm:
- Lương hưu;
- Trợ cấp hưu trí xã hội;
- Trợ cấp hằng tháng theo Điều 23 dành cho người không đủ điều kiện hưởng lương hưu.

Nếu bạn quan tâm khi nào mình có thể về hưu hoặc nên tham gia BHXH như thế nào để có lương hưu sau này, bạn có muốn mình tư vấn thêm không?`,
            },
          },
        ],
      };
    }

    // Trường hợp không khớp
    return {
      choices: [
        {
          message: {
            content:
              "Xin lỗi, tôi hiện chỉ hỗ trợ 6 câu hỏi mẫu mà bạn đã cấu hình.",
          },
        },
      ],
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
