import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import {
  Plus,
  MessageSquare,
  Play,
  Settings,
  GitBranch,
  RotateCcw,
  Check,
  Bot,
} from "lucide-react";

export default function BuilderPreview() {
  const [blocks, setBlocks] = useState([]);
  const [connections, setConnections] = useState([]);
  const [dragging, setDragging] = useState(null);
  const [connecting, setConnecting] = useState(null);
  const [selected, setSelected] = useState(null);
  const [hovered, setHovered] = useState(null);
  const [saved, setSaved] = useState(false);
  const [suggestion, setSuggestion] = useState(null);
  const containerRef = useRef(null);

  // 🧠 Load initial flow
  useEffect(() => {
    const savedData = localStorage.getItem("botly-flow");
    if (savedData) {
      const { blocks, connections } = JSON.parse(savedData);
      setBlocks(blocks);
      setConnections(connections);
    } else {
      setBlocks([
        {
          id: 1,
          title: "Start",
          x: 100,
          y: 80,
          color: "bg-indigo-100",
          type: "Start",
          data: {},
        },
        {
          id: 2,
          title: "Send Message",
          x: 380,
          y: 200,
          color: "bg-green-100",
          type: "Message",
          data: { message: "Hello! 👋" },
        },
        {
          id: 3,
          title: "Condition",
          x: 680,
          y: 120,
          color: "bg-yellow-100",
          type: "Condition",
          data: { condition: "user_input == 'yes'" },
        },
      ]);
      setConnections([[1, 2], [2, 3]]);
    }
  }, []);

  // 💾 Auto-save
  useEffect(() => {
    if (blocks.length > 0) {
      localStorage.setItem("botly-flow", JSON.stringify({ blocks, connections }));
      setSaved(true);
      const t = setTimeout(() => setSaved(false), 1200);
      return () => clearTimeout(t);
    }
  }, [blocks, connections]);

  // ⚙️ Smart AI suggestion
  useEffect(() => {
    if (blocks.length === 0) return;
    const last = blocks[blocks.length - 1];
    switch (last.type) {
      case "Start":
        setSuggestion({ text: "Next step: Send a Message 💬", nextType: "Message" });
        break;
      case "Message":
        setSuggestion({ text: "Add Condition or API Request ⚙️", nextType: "Condition" });
        break;
      case "Condition":
        setSuggestion({ text: "You can call an API or send another Message", nextType: "API" });
        break;
      case "API":
        setSuggestion({ text: "Connect it to End or another Message ✅", nextType: "Message" });
        break;
      default:
        setSuggestion(null);
    }
  }, [blocks]);

  // 🎯 Drag logic
  const handleMouseDownBlock = (id, e) => {
    e.stopPropagation();
    const rect = containerRef.current.getBoundingClientRect();
    setDragging({
      id,
      offsetX: e.clientX - rect.left - blocks.find((b) => b.id === id).x,
      offsetY: e.clientY - rect.top - blocks.find((b) => b.id === id).y,
    });
  };

  const handleMouseMove = (e) => {
    if (dragging) {
      const rect = containerRef.current.getBoundingClientRect();
      const newX = e.clientX - rect.left - dragging.offsetX;
      const newY = e.clientY - rect.top - dragging.offsetY;
      setBlocks((prev) =>
        prev.map((b) => (b.id === dragging.id ? { ...b, x: newX, y: newY } : b))
      );
    }
  };

  const handleMouseUp = () => setDragging(null);

  // 🔗 Connections
  const startConnection = (fromId, e) => {
    e.stopPropagation();
    const rect = containerRef.current.getBoundingClientRect();
    setConnecting({
      fromId,
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseMoveConnection = (e) => {
    if (!connecting) return;
    const rect = containerRef.current.getBoundingClientRect();
    setConnecting((prev) => ({
      ...prev,
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    }));
  };

  const handleMouseUpConnection = (toId) => {
    if (connecting && connecting.fromId !== toId) {
      setConnections((prev) => [...prev, [connecting.fromId, toId]]);
    }
    setConnecting(null);
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousemove", handleMouseMoveConnection);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousemove", handleMouseMoveConnection);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [dragging, connecting]);

  // 📈 Path rendering
  const getPath = (from, to) => {
    const startX = from.x + 140;
    const startY = from.y + 40;
    const endX = to.x;
    const endY = to.y + 40;
    const midX = (startX + endX) / 2;
    return `M ${startX} ${startY} C ${midX} ${startY}, ${midX} ${endY}, ${endX} ${endY}`;
  };

  // 🔹 Icons
  const getIcon = (type) => {
    switch (type) {
      case "Start":
        return <Play className="w-4 h-4 text-indigo-600" />;
      case "Message":
        return <MessageSquare className="w-4 h-4 text-green-600" />;
      case "Condition":
        return <GitBranch className="w-4 h-4 text-yellow-600" />;
      case "API":
        return <Settings className="w-4 h-4 text-blue-600" />;
      default:
        return <MessageSquare className="w-4 h-4 text-gray-500" />;
    }
  };

  // ➕ Add Block
  const addBlock = (type = "Message") => {
    const id = blocks.length + 1;
    const newBlock = {
      id,
      title:
        type === "Condition"
          ? "Condition"
          : type === "API"
          ? "API Request"
          : type === "Start"
          ? "Start"
          : "Send Message",
      x: 220 + Math.random() * 400,
      y: 120 + Math.random() * 200,
      color:
        type === "Start"
          ? "bg-indigo-100"
          : type === "Condition"
          ? "bg-yellow-100"
          : type === "API"
          ? "bg-blue-100"
          : "bg-green-100",
      type,
      data:
        type === "Message"
          ? { message: "Type your message..." }
          : type === "API"
          ? { url: "https://api.example.com" }
          : type === "Condition"
          ? { condition: "user_input == 'yes'" }
          : {},
    };
    setBlocks([...blocks, newBlock]);
    if (blocks.length > 0) {
      setConnections([...connections, [blocks[blocks.length - 1].id, id]]);
    }
    setSelected(newBlock);
  };

  // 🔄 Reset
  const resetFlow = () => {
    localStorage.removeItem("botly-flow");
    setBlocks([]);
    setConnections([]);
    setSelected(null);
  };

  // ✏️ Update block data
  const updateBlockData = (field, value) => {
    if (!selected) return;
    setBlocks((prev) =>
      prev.map((b) =>
        b.id === selected.id ? { ...b, data: { ...b.data, [field]: value } } : b
      )
    );
    setSelected((prev) => ({
      ...prev,
      data: { ...prev.data, [field]: value },
    }));
  };

  const getPreviewText = (block) => {
    if (block.type === "Message") return block.data?.message?.slice(0, 40) || "";
    if (block.type === "API") return block.data?.url?.slice(0, 40) || "";
    if (block.type === "Condition") return block.data?.condition?.slice(0, 40) || "";
    return "";
  };

  return (
    <section className="relative bg-white py-28 px-6 text-center border-t border-gray-100 overflow-hidden">
      <div className="max-w-7xl mx-auto flex gap-8">
        {/* 🧩 Canvas */}
        <div
          ref={containerRef}
          className="relative flex-1 h-[500px] bg-gray-50 rounded-2xl border border-gray-200 shadow-inner overflow-hidden cursor-default"
        >
          {/* Connections */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {connections.map(([fromId, toId], i) => {
              const from = blocks.find((b) => b.id === fromId);
              const to = blocks.find((b) => b.id === toId);
              if (!from || !to) return null;
              return (
                <motion.path
                  key={i}
                  d={getPath(from, to)}
                  stroke="#a5b4fc"
                  strokeWidth="2.5"
                  fill="none"
                  strokeDasharray="6 6"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: [0, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              );
            })}
          </svg>

          {/* Blocks */}
          {blocks.map((block) => (
            <motion.div
              key={block.id}
              style={{ left: block.x, top: block.y }}
              onMouseDown={(e) => handleMouseDownBlock(block.id, e)}
              onMouseUp={() => handleMouseUpConnection(block.id)}
              onClick={() => setSelected(block)}
              onMouseEnter={() => setHovered(block)}
              onMouseLeave={() => setHovered(null)}
              className={`absolute px-5 py-3.5 rounded-xl shadow-sm ${block.color} border ${
                selected?.id === block.id ? "border-indigo-500" : "border-gray-300"
              } text-gray-800 font-medium cursor-grab select-none w-44 text-left transition`}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 12px 25px rgba(99,102,241,0.15)",
              }}
            >
              <div className="flex items-center gap-2 mb-1">
                {getIcon(block.type)}
                <span>{block.title}</span>
              </div>
              <p className="text-xs text-gray-600 truncate italic">{getPreviewText(block)}</p>

              {/* 🟦 Tooltip with full text */}
              {hovered?.id === block.id && getPreviewText(block) && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  className="absolute left-1/2 top-full mt-2 -translate-x-1/2 bg-white text-gray-800 text-xs shadow-xl px-3 py-2 rounded-lg border border-gray-200 w-max max-w-xs z-50"
                >
                  {block.data?.message || block.data?.url || block.data?.condition}
                </motion.div>
              )}

              <div
                onMouseDown={(e) => startConnection(block.id, e)}
                className="absolute -right-2 top-1/2 w-3 h-3 bg-indigo-500 rounded-full cursor-crosshair border-2 border-white shadow-sm"
              ></div>
            </motion.div>
          ))}

          {/* ➕ Buttons */}
          <button
            onClick={() => addBlock()}
            className="absolute bottom-5 right-5 flex items-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg shadow-md text-sm font-medium transition"
          >
            <Plus className="w-4 h-4" /> Add Block
          </button>
          <button
            onClick={resetFlow}
            className="absolute bottom-5 left-5 flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg shadow text-sm font-medium transition"
          >
            <RotateCcw className="w-4 h-4" /> Reset
          </button>

          {/* 💾 Toast */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={saved ? { opacity: 1, y: 0 } : { opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute top-4 right-1/2 translate-x-1/2 bg-indigo-500 text-white text-sm px-4 py-2 rounded-full shadow-lg flex items-center gap-2"
          >
            <Check className="w-4 h-4" /> Flow saved
          </motion.div>
        </div>

        {/* ⚙️ Settings */}
        <div className="w-80 bg-gray-50 border border-gray-200 rounded-2xl shadow-inner px-5 py-6 text-left">
          {selected ? (
            <>
              <h3 className="text-lg font-semibold mb-4 text-gray-800">Block Settings</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Title</label>
                  <input
                    type="text"
                    value={selected.title}
                    onChange={(e) => {
                      const newTitle = e.target.value;
                      setBlocks((prev) =>
                        prev.map((b) =>
                          b.id === selected.id ? { ...b, title: newTitle } : b
                        )
                      );
                      setSelected((prev) => ({ ...prev, title: newTitle }));
                    }}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                </div>

                {selected.type === "Message" && (
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      Message Text
                    </label>
                    <textarea
                      value={selected.data?.message || ""}
                      onChange={(e) => updateBlockData("message", e.target.value)}
                      rows="3"
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                  </div>
                )}

                {selected.type === "API" && (
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">API URL</label>
                    <input
                      type="text"
                      value={selected.data?.url || ""}
                      onChange={(e) => updateBlockData("url", e.target.value)}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                  </div>
                )}

                {selected.type === "Condition" && (
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      Condition Logic
                    </label>
                    <input
                      type="text"
                      value={selected.data?.condition || ""}
                      onChange={(e) => updateBlockData("condition", e.target.value)}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                  </div>
                )}
              </div>
            </>
          ) : (
            <p className="text-gray-500 text-sm text-center mt-24">
              Click a block to edit its properties
            </p>
          )}
        </div>
      </div>

      {/* 🤖 Suggestion Bar */}
      {suggestion && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-center gap-3 mt-10 text-gray-700 bg-gray-100 border border-gray-200 px-5 py-3 rounded-xl inline-flex shadow-sm mx-auto"
        >
          <Bot className="w-5 h-5 text-indigo-500" />
          <span>{suggestion.text}</span>
          <button
            onClick={() => addBlock(suggestion.nextType)}
            className="ml-3 bg-indigo-500 hover:bg-indigo-600 text-white text-sm px-3 py-1.5 rounded-lg transition"
          >
            Add
          </button>
        </motion.div>
      )}

      <p className="text-gray-400 text-sm mt-6">
        Drag, connect, edit — and let Botly AI suggest your next step ⚙️
      </p>
    </section>
  );
}
