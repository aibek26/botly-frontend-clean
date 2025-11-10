import { motion } from "framer-motion";
import { MessageSquare, Send } from "lucide-react";
import { useState } from "react";

export default function Messages() {
  const [selectedChat, setSelectedChat] = useState(null);
  const [message, setMessage] = useState("");
  const [chats] = useState([
    { id: 1, name: "Customer 1", last: "Hi, can you help me?", time: "10:32 AM" },
    { id: 2, name: "Customer 2", last: "How to integrate Telegram?", time: "09:15 AM" },
    { id: 3, name: "Client (Demo Bot)", last: "Thanks for your support!", time: "Yesterday" },
  ]);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello! How can I assist you today?" },
    { sender: "user", text: "Tell me about Botly integrations." },
    { sender: "bot", text: "Sure! We support Telegram, WhatsApp, Slack, and API integrations." },
  ]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    setMessages([...messages, { sender: "user", text: message }]);
    setMessage("");
    // later here -> AI response logic
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Got it! We'll get back to you shortly 🤖" },
      ]);
    }, 700);
  };

  return (
    <section className="flex h-[calc(100vh-90px)] bg-gray-50 dark:bg-gray-950 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 shadow-sm">
      {/* Left Sidebar (Chat List) */}
      <div className="w-72 border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 flex flex-col">
        <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex items-center gap-2">
          <MessageSquare className="text-indigo-500" size={20} />
          <h2 className="font-semibold text-gray-800 dark:text-gray-100 text-lg">
            Conversations
          </h2>
        </div>

        <div className="flex-1 overflow-y-auto p-2 space-y-2">
          {chats.map((chat) => (
            <motion.div
              key={chat.id}
              whileHover={{ scale: 1.02 }}
              onClick={() => setSelectedChat(chat)}
              className={`p-3 rounded-xl cursor-pointer transition ${
                selectedChat?.id === chat.id
                  ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300"
                  : "bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              <div className="font-medium text-sm">{chat.name}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
                {chat.last}
              </div>
              <div className="text-[10px] text-gray-400 dark:text-gray-600 mt-1">
                {chat.time}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Right Panel (Chat Window) */}
      <div className="flex-1 flex flex-col">
        {selectedChat ? (
          <>
            <div className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-5 py-3 flex items-center justify-between">
              <h3 className="font-semibold text-gray-800 dark:text-gray-100">
                {selectedChat.name}
              </h3>
              <span className="text-xs text-gray-400 dark:text-gray-500">
                Active now
              </span>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-3 bg-gray-50 dark:bg-gray-950">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`max-w-[75%] px-4 py-2 rounded-2xl text-sm ${
                    msg.sender === "user"
                      ? "bg-indigo-500 text-white self-end ml-auto"
                      : "bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200"
                  }`}
                >
                  {msg.text}
                </motion.div>
              ))}
            </div>

            <form
              onSubmit={handleSend}
              className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 flex items-center gap-3 p-4"
            >
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 rounded-lg px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-400 transition"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg px-4 py-2 flex items-center gap-1 shadow transition"
              >
                <Send size={16} />
                Send
              </motion.button>
            </form>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-400 dark:text-gray-600 text-sm">
            Select a chat to start messaging 💬
          </div>
        )}
      </div>
    </section>
  );
}
