import { useState, useRef, useEffect } from "react";
import "../styles/globals.css";

export default function Home() {
  const [lang, setLang] = useState("ru");
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const content = {
    ru: {
      name: "Байтуков Берик Кайратович",
      tagline: "Создаю эффективные решения там, где другие видят хаос",
      description:
        "Инженер мышления и автоматизации с более чем 14-летним опытом. Работаю на стыке данных, инфраструктуры и искусственного интеллекта.",
      about: "Обо мне",
      skills: "Навыки",
      experience: "Опыт",
      cases: "Кейсы",
      contact: "Связаться",
    },
    kz: {
      name: "Байтуков Берік Қайратұлы",
      tagline: "Басқалар тек бейберекет көретін жерде мен шешім табамын",
      description:
        "14 жылдан астам тәжірибесі бар автоматтандыру және ойлау инженері. Мәліметтер, инфрақұрылым және жасанды интеллект тоғысында жұмыс істеймін.",
      about: "Өзім туралы",
      skills: "Дағдылар",
      experience: "Тәжірибе",
      cases: "Кейстер",
      contact: "Байланысу",
    },
    en: {
      name: "Berik Baitukov",
      tagline: "Creating efficient solutions where others see only chaos",
      description:
        "Engineering thinker and automation expert with over 14 years of experience. I work at the intersection of data, infrastructure, and AI.",
      about: "About Me",
      skills: "Skills",
      experience: "Experience",
      cases: "Cases",
      contact: "Contact",
    },
  };
  const t = content[lang];

  const messagesEndRef = useRef(null);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = { role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });
      const data = await res.json();
      setMessages((prev) => [...prev, { role: "bot", content: data.reply }]);
    } catch (err) {
      setMessages((prev) => [...prev, { role: "bot", content: "Ошибка сервера." }]);
    }
  };

  return (
    <div style={{
      backgroundColor: "white",
      color: "black",
      padding: "2rem",
      maxWidth: "800px",
      margin: "0 auto",
      fontFamily: "sans-serif",
      position: "relative",
      minHeight: "100vh"
    }}>
      <div style={{ textAlign: "right", marginBottom: "1rem" }}>
        <button onClick={() => setLang("kz")} style={{ marginRight: "0.5rem" }}>Қаз</button>
        <button onClick={() => setLang("ru")} style={{ marginRight: "0.5rem" }}>Рус</button>
        <button onClick={() => setLang("en")}>Eng</button>
      </div>

      <h1 style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>{t.name}</h1>
      <h2 style={{ fontSize: "1.2rem", color: "#7e22ce", marginBottom: "1rem" }}>{t.tagline}</h2>
      <p style={{ marginBottom: "2rem" }}>{t.description}</p>

      <section style={{ marginBottom: "1.5rem" }}>
        <h3 style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>{t.about}</h3>
        <p>Здесь будет описание твоей личности, философии и подхода, включая GPT-бота.</p>
      </section>

      <section style={{ marginBottom: "1.5rem" }}>
        <h3 style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>{t.skills}</h3>
        <ul>
          <li>Power BI, Excel, SQL, Python</li>
          <li>PostgreSQL, Access, DBeaver</li>
          <li>Сетевое и системное администрирование</li>
          <li>AI, ChatGPT, NLP, Embeddings</li>
        </ul>
      </section>

      <section style={{ marginBottom: "1.5rem" }}>
        <h3 style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>{t.experience}</h3>
        <p>14+ лет в аналитике и администрировании, включая налоговый департамент и ИТ-консалтинг.</p>
      </section>

      <section style={{ marginBottom: "1.5rem" }}>
        <h3 style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>{t.cases}</h3>
        <ul>
          <li>AI-бот для подбора туров</li>
          <li>Миграция Access → PostgreSQL</li>
          <li>Автоматизация отчётности и аналитики</li>
        </ul>
      </section>

      <section style={{ marginBottom: "2rem" }}>
        <h3 style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>{t.contact}</h3>
        <p>Email: baitokberik@yandex.kz</p>
        <p>Telegram: @baitokberik</p>
        <p>LinkedIn: <a href="https://www.linkedin.com/in/berik-baitukov-29727819b/" style={{ color: "blue" }}>профиль</a></p>
      </section>

      <div className="chat-container">
        <div className="chat-messages">
          {messages.map((msg, idx) => (
            <div key={idx} style={{ margin: "0.5rem 0" }}><strong>{msg.role === "bot" ? "Bot" : "You"}:</strong> {msg.content}</div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className="chat-input">
          <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Напиши сообщение..." />
          <button onClick={handleSend}>Отправить</button>
        </div>
      </div>
    </div>
);
}
