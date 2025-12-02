export async function generateTitle(message: string): Promise<string> {
  const res = await fetch("http://localhost:8000/generate-title", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text: message }),
  });

  const data = await res.json();
  return data.title;
}