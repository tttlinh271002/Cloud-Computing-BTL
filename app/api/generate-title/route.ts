import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: Request) {
  try {
    const { text } = await req.json();

    const prompt = `Tạo một tiêu đề ngắn gọn (3–8 từ), mô tả đúng chủ đề dưới đây.
    
    Nội dung: "${text}"
    
    Chỉ trả về tiêu đề, không giải thích.`;

    const endpoint = "https://int6024demo.openai.azure.com/";
    const deployment = "gpt-4.1-mini"; 
    const apiKey = "FdK7chHETEjbQYwESZ4aaucQT6NBp6kWRHOSgbPEPmWe6kKe0X8AJQQJ99BKACHYHv6XJ3w3AAABACOGFWaQ";

    const url = `${endpoint}/openai/deployments/${deployment}/chat/completions?api-version=2025-01-01-preview`;

    const response = await axios.post(
      url,
      {
        messages: [
          { role: "system", content: "Bạn là AI chuyên tóm tắt và đặt tiêu đề." },
          { role: "user", content: prompt },
        ],
        max_tokens: 20,
        temperature: 0.3,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "api-key": apiKey,
        },
      }
    );

    const title =
      response.data?.choices?.[0]?.message?.content?.trim() || "New Chat";

    return NextResponse.json({ title });
  } catch (err) {
    console.error("Generate title error:", err);
    return NextResponse.json({ title: "New Chat" }, { status: 200 });
  }
}
