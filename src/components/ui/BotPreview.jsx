import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send } from "lucide-react";

export default function BotPreview({ flow, onClose, onActiveNodeChange }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [activeNodeId, setActiveNodeId] = useState(null);

  const getNode = (id) => flow.nodes.find((n) => n.id === id);
  const getEdgesFrom = (id) => flow.edges.filter((e) => e.from === id);

  const nextFrom = (node, text) => {
    if (!node) return null;
    if (node.type === "Condition") {
      const outs = getEdgesFrom(node.id);
      const kws = (node.prompt || "")
        .split(",")
        .map((s) => s.trim().toLowerCase())
        .filter(Boolean);
      const t = (text || "").toLowerCase();
      if (kws.length && kws.some((k) => t.includes(k))) return outs[0]?.to;
      return outs[1]?.to || outs[0]?.to || null;
    }
    const e = flow.edges.find((x) => x.from === node.id);
    return e?.to || null;
  };

  const handleSend = async () => {
    const text = input.trim();
    if (!text) return;
    setMessages((prev) => [...prev, { role: "user", text }]);
    setInput("");

    let current =
      getNode(activeNodeId) ||
      flow.nodes.find((n) => n.type === "Input") ||
      flow.nodes[0];
    if (!current) return;

    if (current.type === "Input") {
      const nextId = nextFrom(current, text);
      if (!nextId) return;
      current = getNode(nextId);
    }

    while (current) {
      setActiveNodeId(current.id);
      onActiveNodeChange?.(current.id); // ✅ передаём активную ноду в Builder

      if (current.type !== "Input") {
        const reply =
          current.prompt?.trim() || current.name || current.type;
        await new Promise((r) => setTimeout(r, 300));
        setMessages((prev) => [...prev, { role: "bot", text: reply }]);
      }

      const nextId = nextFrom(current, text);
      if (!nextId) break;
      current = getNode(nextId);
    }
  };

  useEffect(() => {
    onActiveNodeChange?.(activeNodeId);
  }, [activeNodeId]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

        <motion.div
          className="relative bg-white/95 rounded-2xl shadow-2xl w-[480px] h-[640px] flex flex-col overflow-hidden border border-indigo-100"
          initial={{ scale: 0.96, y: 8 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.98, y: 8 }}
          transition={{ type: "spring", stiffness: 220, damping: 22 }}
        >
          <div className="px-5 py-4 border-b bg-gradient-to-r from-indigo-50 to-sky-50 flex justify-between items-center">
            <div className="font-semibold text-indigo-700">Botly • Live Bot</div>
            <button onClick={onClose} className="rounded-full p-1 hover:bg-indigo-100">
              <X className="w-5 h-5 text-indigo-600" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-white">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`max-w-[85%] px-4 py-2 rounded-2xl shadow-sm ${
                  m.role === "user"
                    ? "ml-auto bg-indigo-600 text-white"
                    : "mr-auto bg-gray-100 text-gray-800"
                }`}
              >
                {m.text}
              </div>
            ))}

            {!messages.length && (
              <div className="text-center text-gray-400 text-sm mt-8">
                Type a message below to talk with your bot...
              </div>
            )}
          </div>

          <div className="p-3 border-t bg-white">
            <div className="flex items-center gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                className="flex-1 border rounded-xl px-3 py-2 focus:ring-2 focus:ring-indigo-400 outline-none"
                placeholder="Write a message…"
              />
              <button
                onClick={handleSend}
                className="btn bg-indigo-600 text-white rounded-xl px-3 py-2"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
