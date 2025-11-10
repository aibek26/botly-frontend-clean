import { useState, useEffect } from "react";
import { MessageCircle, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(() => {
    return JSON.parse(localStorage.getItem("botly_chat")) || [
      { from: "bot", text: "👋 Hi! I’m Botly AI, ask me anything about our platform." },
      { from: "bot", text: "By the way, you can create an AI assistant like me for your website. 😎" },
    ];
  });
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    localStorage.setItem("botly_chat", JSON.stringify(messages));
  }, [messages]);

  const suggestions = [
    "What is Botly?",
    "How do I connect integrations?",
    "Is there a free plan?",
    "How do I create my first bot?",
  ];

  const sendMessage = async (e, question) => {
    e?.preventDefault();
    const userInput = question || input;
    if (!userInput.trim()) return;

    const newMsg = { from: "user", text: userInput };
    setMessages((prev) => [...prev, newMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${import.meta.env.VITE_OPENAI_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            { role: "system", content: "You are Botly AI Assistant. Be concise, warm and intelligent." },
            ...messages.map((m) => ({
              role: m.from === "user" ? "user" : "assistant",
              content: m.text,
            })),
            { role: "user", content: userInput },
          ],
        }),
      });

      const data = await res.json();
      const reply = data.choices?.[0]?.message?.content || "Sorry, I didn’t get that 😅";
      setMessages((prev) => [...prev, { from: "bot", text: reply }]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [...prev, { from: "bot", text: "⚠️ Connection error. Try again later." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        whileHover={{ scale: 1.1, boxShadow: "0 0 20px rgba(99,102,241,0.4)" }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 text-white p-4 rounded-full shadow-lg transition-all"
      >
        <MessageCircle className="w-6 h-6" />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="fixed bottom-20 right-6 w-96 bg-white rounded-2xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden font-[Inter]"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-400 text-white p-4 font-semibold text-center text-[15px] tracking-wide shadow-sm font-jakarta">
              Botly AI Assistant
            </div>

            {/* Chat Body */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 text-[14px] leading-relaxed bg-gray-50/40">
              {messages.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`p-3 rounded-2xl max-w-[85%] shadow-sm ${
                    m.from === "user"
                      ? "bg-indigo-100 text-right ml-auto text-gray-800"
                      : "bg-white text-left text-gray-700"
                  }`}
                >
                  {m.text}
                </motion.div>
              ))}
              {loading && (
                <div className="text-gray-400 text-xs text-center italic animate-pulse">
                  Botly is thinking...
                </div>
              )}
            </div>

            {/* Suggested Questions */}
            <div className="flex flex-wrap gap-2 px-4 pb-3 border-t border-gray-100 bg-white">
              {suggestions.map((q, i) => (
                <button
                  key={i}
                  onClick={(e) => sendMessage(e, q)}
                  className="text-xs bg-gray-100 hover:bg-indigo-50 text-gray-700 px-3 py-1.5 rounded-full transition font-medium"
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Input */}
            <form onSubmit={sendMessage} className="flex border-t border-gray-200 bg-white">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2.5 outline-none text-sm bg-transparent"
              />
              <button
                type="submit"
                className="px-4 text-indigo-500 hover:text-indigo-600 transition"
                disabled={loading}
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

            {/* Footer */}
            <div className="text-[11px] text-gray-400 text-center py-2 border-t border-gray-100 bg-white/60 backdrop-blur-sm">
              Powered by <span className="text-indigo-500 font-medium">Botly</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

