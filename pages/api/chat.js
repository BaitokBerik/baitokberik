export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
  const { message } = req.body;
  if (!message) {
    return res.status(400).json({ message: "Missing message" });
  }
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content:
              "You are the personal AI assistant of Berik Baitukov. Speak with slight sass and humor, explain clearly. Help visitors understand who Berik is and what he can do.",
          },
          { role: "user", content: message },
        ],
      }),
    });
    const data = await response.json();
    return res.status(200).json({ reply: data.choices[0].message.content });
  } catch (error) {
    console.error("OpenAI API Error:", error);
    return res.status(500).json({ message: "Internal error" });
  }
}
