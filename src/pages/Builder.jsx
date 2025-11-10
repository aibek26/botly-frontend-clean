import { useMemo, useRef, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Trash2,
  Link2,
  X,
  Settings,
  RotateCcw,
  RotateCw,
  ZoomIn,
  ZoomOut,
  Play,
  StopCircle,
  Brain,
  GitBranch,
  MessageSquare,
  MousePointerClick,
  Send,
} from "lucide-react";
import BotPreview from "../components/ui/BotPreview"; // ✅ твой путь

const NODE_W = 190;
const NODE_H = 90;
const GRID = 10;

const PALETTE = [
  { type: "Input", color: "from-indigo-500 to-sky-500", icon: MessageSquare },
  { type: "Condition", color: "from-amber-500 to-orange-500", icon: GitBranch },
  { type: "API", color: "from-emerald-500 to-teal-500", icon: MousePointerClick },
  { type: "AI", color: "from-fuchsia-500 to-purple-500", icon: Brain },
  { type: "Response", color: "from-blue-500 to-cyan-500", icon: MessageSquare },
];

export default function Builder() {
  const canvasRef = useRef(null);
  const minimapRef = useRef(null);
  const fileInputRef = useRef(null);

  const [nodes, setNodes] = useState(() => {
    const saved = localStorage.getItem("botly-builder-nodes");
    return saved
      ? JSON.parse(saved)
      : [
          { id: "n1", type: "Input", x: 100, y: 100, name: "Start", prompt: "Hello!" },
          { id: "n2", type: "Condition", x: 420, y: 180, name: "Check intent", prompt: "price,help,support" },
          { id: "n3", type: "AI", x: 720, y: 120, name: "AI Answer", prompt: "Here's what I found." },
          { id: "n4", type: "Response", x: 720, y: 300, name: "Fallback", prompt: "I didn't get that, can you rephrase?" },
        ];
  });

  const [edges, setEdges] = useState(() => {
    const saved = localStorage.getItem("botly-builder-edges");
    return saved
      ? JSON.parse(saved)
      : [
          { id: "e1", from: "n1", to: "n2" },
          { id: "e2", from: "n2", to: "n3" }, // match → first
          { id: "e3", from: "n2", to: "n4" }, // no match → second
        ];
  });

  const [selectedId, setSelectedId] = useState(null); // node id или edge:id
  const [connectFrom, setConnectFrom] = useState(null);
  const [transform, setTransform] = useState({ x: 0, y: 0, scale: 1 });
  const [history, setHistory] = useState([]);
  const [future, setFuture] = useState([]);
  const [isSimulating, setIsSimulating] = useState(false);
  const [messages, setMessages] = useState([]);
  const panStart = useRef({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [mouseCanvasPos, setMouseCanvasPos] = useState({ x: 0, y: 0 });

  // ✅ состояния для BotPreview
  const [showPreview, setShowPreview] = useState(false);

  // Инлайн-редактирование имени
  const [editingNameId, setEditingNameId] = useState(null);
  const editingNameInputRef = useRef(null);

  // Состояние активного пути (для симуляции)
  const [activeNodeId, setActiveNodeId] = useState(null);
  const [activeEdgeIds, setActiveEdgeIds] = useState(new Set());

  // ---------- История ----------
  const snapshot = useCallback(() => {
    setHistory((h) => [
      ...h,
      { nodes: structuredClone(nodes), edges: structuredClone(edges) },
    ]);
    setFuture([]);
  }, [nodes, edges]);

  const undo = useCallback(() => {
    if (!history.length) return;
    const prev = history[history.length - 1];
    setFuture((f) => [{ nodes, edges }, ...f]);
    setNodes(prev.nodes);
    setEdges(prev.edges);
    setHistory((h) => h.slice(0, -1));
    setSelectedId(null);
  }, [history, nodes, edges]);

  const redo = useCallback(() => {
    if (!future.length) return;
    const next = future[0];
    setHistory((h) => [...h, { nodes, edges }]);
    setNodes(next.nodes);
    setEdges(next.edges);
    setFuture((f) => f.slice(1));
    setSelectedId(null);
  }, [future, nodes, edges]);

  // ---------- Сохранение ----------
  useEffect(() => {
    localStorage.setItem("botly-builder-nodes", JSON.stringify(nodes));
    localStorage.setItem("botly-builder-edges", JSON.stringify(edges));
  }, [nodes, edges]);

  // ---------- Зум и панорама ----------
  const handleWheel = (e) => {
    e.preventDefault();
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    setTransform((prev) => {
      const newScale = Math.min(Math.max(prev.scale - e.deltaY * 0.0015, 0.4), 2.5);
      const scaleFactor = newScale / prev.scale;
      const nx = mouseX - (mouseX - prev.x) * scaleFactor;
      const ny = mouseY - (mouseY - prev.y) * scaleFactor;
      return { x: nx, y: ny, scale: newScale };
    });
  };

  // плавный панораминг без Shift
  const startPan = (e) => {
    if (e.target.closest(".absolute")) return; // не начинать, если по ноде/контролу
    e.preventDefault();
    setIsPanning(true);
    panStart.current = { x: e.clientX, y: e.clientY };
  };
  const doPan = (e) => {
    if (!isPanning) return;
    e.preventDefault();
    const dx = e.clientX - panStart.current.x;
    const dy = e.clientY - panStart.current.y;
    setTransform((prev) => ({ ...prev, x: prev.x + dx, y: prev.y + dy }));
    panStart.current = { x: e.clientX, y: e.clientY };
  };
  const stopPan = () => setIsPanning(false);

  useEffect(() => {
    window.addEventListener("mousemove", doPan);
    window.addEventListener("mouseup", stopPan);
    return () => {
      window.removeEventListener("mousemove", doPan);
      window.removeEventListener("mouseup", stopPan);
    };
  }, [isPanning]);

  const zoomIn = () => setTransform((t) => ({ ...t, scale: Math.min(t.scale + 0.1, 2.5) }));
  const zoomOut = () => setTransform((t) => ({ ...t, scale: Math.max(t.scale - 0.1, 0.4) }));
  const resetView = () => setTransform({ x: 0, y: 0, scale: 1 });

  // ---------- Координаты курсора в canvas-space ----------
  const toCanvasCoords = (clientX, clientY) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return { x: 0, y: 0 };
    const x = (clientX - rect.left - transform.x) / transform.scale;
    const y = (clientY - rect.top - transform.y) / transform.scale;
    return { x, y };
  };
  const onCanvasMouseMove = (e) => {
    const p = toCanvasCoords(e.clientX, e.clientY);
    setMouseCanvasPos(p);
  };

  // ---------- Nodes ----------
  const getNode = (id) => nodes.find((n) => n.id === id);
  const onDrag = (id, x, y) =>
    setNodes((p) => p.map((n) => (n.id === id ? { ...n, x, y } : n)));

  const onDragEnd = (id) => {
    setNodes((p) =>
      p.map((n) =>
        n.id === id
          ? {
              ...n,
              x: Math.round(n.x / GRID) * GRID,
              y: Math.round(n.y / GRID) * GRID,
            }
          : n
      )
    );
  };

  const addNode = (type) => {
    snapshot();
    const id = Math.random().toString(36).slice(2, 8);
    setNodes((p) => [
      ...p,
      {
        id,
        type,
        x: 120 + Math.random() * 400,
        y: 100 + Math.random() * 300,
        name: `${type} Node`,
        prompt: "",
      },
    ]);
  };

  const removeSelected = () => {
    if (!selectedId) return;
    snapshot();

    if (selectedId.startsWith("edge:")) {
      const edgeId = selectedId.replace("edge:", "");
      setEdges((e) => e.filter((x) => x.id !== edgeId));
      setSelectedId(null);
      return;
    }

    setEdges((e) => e.filter((x) => x.from !== selectedId && x.to !== selectedId));
    setNodes((n) => n.filter((x) => x.id !== selectedId));
    setSelectedId(null);
  };

  const clearAll = () => {
    snapshot();
    setNodes([]);
    setEdges([]);
    setSelectedId(null);
  };

  const onStartConnect = (id) => setConnectFrom((p) => (p === id ? null : id));
  const onFinishConnect = (toId) => {
    if (!connectFrom || connectFrom === toId) return;
    snapshot();
    const exists = edges.some((e) => e.from === connectFrom && e.to === toId);
    if (!exists) {
      const id = Math.random().toString(36).slice(2, 8);
      setEdges((p) => [...p, { id, from: connectFrom, to: toId }]);
    }
    setConnectFrom(null);
  };

  // ---------- Подсчёт кривых ----------
  const paths = useMemo(() => {
    return edges
      .map((e) => {
        const a = getNode(e.from);
        const b = getNode(e.to);
        if (!a || !b) return null;
        const x1 = a.x + NODE_W / 2;
        const y1 = a.y + NODE_H / 2;
        const x2 = b.x + NODE_W / 2;
        const y2 = b.y + NODE_H / 2;
        const dx = (x2 - x1) / 2;
        return { id: e.id, d: `M ${x1} ${y1} C ${x1 + dx} ${y1}, ${x2 - dx} ${y2}, ${x2} ${y2}` };
      })
      .filter(Boolean);
  }, [edges, nodes]);

  const selectedNode = selectedId && !selectedId.startsWith("edge:") ? getNode(selectedId) : null;
  const minimapScale = 0.1;

  const handleMinimapClick = (e) => {
    const rect = minimapRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;
    setTransform((prev) => ({
      ...prev,
      x: -(clickX / minimapScale) + 400,
      y: -(clickY / minimapScale) + 300,
    }));
  };

  // ---------- Горячие клавиши ----------
  useEffect(() => {
    const onKey = (e) => {
      // 🚫 Не срабатывает, если курсор в input или textarea
      const tag = e.target.tagName.toLowerCase();
      const isTyping = tag === "input" || tag === "textarea" || e.target.isContentEditable;
      if (isTyping) return;

      const meta = e.metaKey || e.ctrlKey;
      if (meta && e.key.toLowerCase() === "z" && !e.shiftKey) {
        e.preventDefault();
        undo();
      } else if (
        (meta && e.key.toLowerCase() === "y") ||
        (meta && e.shiftKey && e.key.toLowerCase() === "z")
      ) {
        e.preventDefault();
        redo();
      } else if ((e.key === "Delete" || e.key === "Backspace") && selectedId) {
        e.preventDefault();
        removeSelected();
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selectedId, undo, redo]);

  // ---------- Export / Import ----------
  const handleExport = () => {
    const data = JSON.stringify({ nodes, edges }, null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "botly-flow.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportClick = () => fileInputRef.current?.click();

  const handleImport = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(reader.result);
        if (parsed && Array.isArray(parsed.nodes) && Array.isArray(parsed.edges)) {
          snapshot();
          setNodes(parsed.nodes);
          setEdges(parsed.edges);
          setSelectedId(null);
        } else {
          alert("Invalid file format");
        }
      } catch {
        alert("Failed to parse JSON");
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  // ---------- БАЗОВОЕ ВЕТВЛЕНИЕ ----------
  const decideNextFromCondition = (node, lastUserText) => {
    const outs = edges.filter((e) => e.from === node.id);
    if (outs.length === 0) return null;
    const kws = (node.prompt || "")
      .split(",")
      .map((s) => s.trim().toLowerCase())
      .filter(Boolean);
    const text = (lastUserText || "").toLowerCase();

    let pick = null;
    if (kws.length && kws.some((k) => text.includes(k))) {
      pick = outs[0]; // матч → первое ребро
    } else {
      pick = outs[1] || outs[0]; // иначе второе, либо первое
    }
    return pick?.to || null;
  };

  const nextFrom = (node, lastUserText) => {
    if (!node) return null;
    if (node.type === "Condition") {
      return decideNextFromCondition(node, lastUserText);
    }
    const e = edges.find((x) => x.from === node.id);
    return e ? e.to : null;
  };

  // ---------- СИМУЛЯЦИЯ (премиум-модалка) ----------
  const [simInput, setSimInput] = useState("");
  const [simCurrentNodeId, setSimCurrentNodeId] = useState(null);

  const openSimulation = () => {
    // reset
    setMessages([]);
    setActiveNodeId(null);
    setActiveEdgeIds(new Set());
    const start = nodes.find((n) => n.type === "Input") || nodes[0];
    setSimCurrentNodeId(start?.id || null);
    setIsSimulating(true);
    if (start) setActiveNodeId(start.id);
  };

  const runStepChain = async (startingNode, userText) => {
    // Прогоняем цепочку от текущего узла до упора/условия
    let current = startingNode;
    let lastUser = userText;

    while (current) {
      setActiveNodeId(current.id);

      if (current.type === "Input") {
        // echo user bubble уже добавлен из формы ввода
      } else {
        // bot bubble
        const text = current.prompt?.trim() || current.name || current.type;
        await new Promise((r) => setTimeout(r, 250));
        setMessages((prev) => [...prev, { role: "bot", text }]);
      }

      const nextId = nextFrom(current, lastUser);
      if (!nextId) break;

      const edge = edges.find((e) => e.from === current.id && e.to === nextId);
      if (edge) {
        setActiveEdgeIds((prev) => new Set(prev).add(edge.id));
      }

      current = getNode(nextId);
      setSimCurrentNodeId(current?.id || null);

      // Если следующим снова Input — ждём пользовательского ввода
      if (current?.type === "Input") {
        setActiveNodeId(current.id);
        break;
      }
    }
  };

  const handleSendMessage = async () => {
    const text = simInput.trim();
    if (!text) return;

    // user bubble
    setMessages((prev) => [...prev, { role: "user", text }]);
    setSimInput("");

    // взять текущий узел или стартовый
    let current = simCurrentNodeId ? getNode(simCurrentNodeId) : nodes.find((n) => n.type === "Input") || nodes[0];
    if (!current) return;

    // Если мы стоим на Input — делаем шаг к следующему
    if (current.type === "Input") {
      const nextId = nextFrom(current, text);
      if (!nextId) {
        setActiveNodeId(current.id);
        return;
      }
      const e = edges.find((x) => x.from === current.id && x.to === nextId);
      if (e) setActiveEdgeIds((prev) => new Set(prev).add(e.id));
      current = getNode(nextId);
      setSimCurrentNodeId(current?.id || null);
    }

    // Прогон оставшейся цепочки
    await runStepChain(current, text);
  };

  const stopSimulation = () => {
    setIsSimulating(false);
    setMessages([]);
    setActiveNodeId(null);
    setActiveEdgeIds(new Set());
    setSimCurrentNodeId(null);
  };

  // ---------- Render ----------
  return (
    <div className="flex flex-col h-[calc(100vh-88px)]">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-3 border-b bg-white/90 backdrop-blur shadow-sm">
        <div className="flex gap-2">
          <button onClick={undo} className="btn"><RotateCcw className="w-4 h-4" />Undo</button>
          <button onClick={redo} className="btn"><RotateCw className="w-4 h-4" />Redo</button>
          <button onClick={clearAll} className="btn"><Trash2 className="w-4 h-4" />Clear</button>
        </div>

        <div className="flex gap-2 items-center">
          <button onClick={openSimulation} className="btn bg-indigo-600 text-white"><Play className="w-4 h-4" />Run</button>
          <button onClick={stopSimulation} className="btn bg-rose-600 text-white"><StopCircle className="w-4 h-4" />Stop</button>
          {/* ✅ новая кнопка Launch Bot для BotPreview */}
          <button
            onClick={() => setShowPreview(true)}
            className="btn bg-gradient-to-r from-indigo-500 to-violet-600 text-white"
          >
            Launch Bot
          </button>
        </div>

        <div className="flex gap-2">
          <button onClick={zoomOut} className="btn"><ZoomOut className="w-4 h-4" /></button>
          <button onClick={zoomIn} className="btn"><ZoomIn className="w-4 h-4" /></button>
          <button onClick={resetView} className="btn">Reset</button>

          <div className="w-px h-6 bg-gray-200 mx-1" />
          <button onClick={handleExport} className="btn">Export</button>
          <button onClick={handleImportClick} className="btn">Import</button>
          <input
            ref={fileInputRef}
            type="file"
            accept="application/json"
            className="hidden"
            onChange={handleImport}
          />
        </div>
      </div>

      {/* ✅ Модал превью бота */}
      {showPreview && (
        <BotPreview
          flow={{ nodes, edges }}
          onClose={() => setShowPreview(false)}
        />
      )}

      {/* Simulation Modal */}
      <AnimatePresence>
        {isSimulating && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* фон с фирменным свечением */}
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
            <div className="absolute -z-10 inset-0 pointer-events-none">
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] rounded-full blur-3xl opacity-25"
                   style={{ background: "radial-gradient(closest-side, #6366f1, transparent)" }} />
            </div>

            <motion.div
              className="relative bg-white/95 rounded-2xl shadow-2xl w-[560px] h-[640px] flex flex-col overflow-hidden border border-indigo-100"
              initial={{ scale: 0.96, y: 8 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.98, y: 8 }}
              transition={{ type: "spring", stiffness: 220, damping: 22 }}
            >
              <div className="px-5 py-4 border-b bg-gradient-to-r from-indigo-50 to-sky-50 flex justify-between items-center">
                <div className="font-semibold text-indigo-700">Botly • Live Simulation</div>
                <button onClick={stopSimulation} className="rounded-full p-1 hover:bg-indigo-100">
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
                        : "mr-auto bg-white border text-gray-800"
                    }`}
                  >
                    {m.text}
                  </div>
                ))}
                {!messages.length && (
                  <div className="text-center text-gray-400 text-sm mt-8">
                    Type a message below to start the conversation…
                  </div>
                )}
              </div>

              <div className="p-3 border-t bg-white">
                <div className="flex items-center gap-2">
                  <input
                    value={simInput}
                    onChange={(e) => setSimInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                    className="flex-1 border rounded-xl px-3 py-2 focus:ring-2 focus:ring-indigo-400 outline-none"
                    placeholder="Write a message… (e.g., price?)"
                  />
                  <button onClick={handleSendMessage} className="btn bg-indigo-600 text-white">
                    <Send className="w-4 h-4" />
                  </button>
                </div>
                <div className="text-[11px] text-gray-500 mt-2">
                  Condition rule: put keywords in node’s <b>Prompt</b> <i>(comma separated)</i>. If user text contains any → first outgoing edge, else → second.
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left: Blocks */}
        <aside className="w-64 shrink-0 border-r bg-white p-4 shadow-sm">
          <h3 className="font-semibold mb-3">Blocks</h3>
          <div className="space-y-3">
            {PALETTE.map((p) => {
              const Icon = p.icon;
              return (
                <button
                  key={p.type}
                  onClick={() => addNode(p.type)}
                  className={`w-full flex items-center gap-2 rounded-xl p-3 text-left bg-gradient-to-r ${p.color} text-white font-medium shadow hover:opacity-90 transition`}
                >
                  <Icon className="w-4 h-4" /> {p.type}
                </button>
              );
            })}
          </div>
        </aside>

        {/* Canvas */}
        <div
          ref={canvasRef}
          onWheel={handleWheel}
          onMouseDown={startPan}
          onMouseMove={onCanvasMouseMove}
          onMouseUp={stopPan}
          onMouseLeave={stopPan}
          className={`relative flex-1 overflow-hidden ${isPanning ? "cursor-grabbing" : "cursor-grab"}`}
          style={{
            backgroundColor: "#f8fafc",
            backgroundImage:
              `linear-gradient(to right, rgba(0,0,0,.05) 1px, transparent 1px),
               linear-gradient(to bottom, rgba(0,0,0,.05) 1px, transparent 1px)`,
            backgroundSize: `${GRID * (transform.scale)}px ${GRID * (transform.scale)}px`,
            backgroundPosition: `${transform.x % (GRID * transform.scale)}px ${transform.y % (GRID * transform.scale)}px`,
          }}
        >
          <motion.div
            style={{
              transform: `translate(${transform.x}px, ${transform.y}px) scale(${transform.scale})`,
              transformOrigin: "0 0",
            }}
            className="absolute inset-0"
          >
            {/* SVG defs for glow */}
            <svg className="absolute w-0 h-0 pointer-events-none">
              <defs>
                <filter id="edge-glow" x="-50%" y="-50%" width="200%" height="200%">
                  <feDropShadow dx="0" dy="0" stdDeviation="2" floodColor="#6366f1" floodOpacity="0.9" />
                </filter>
              </defs>
            </svg>

            {/* Edges */}
            <svg className="absolute inset-0 w-full h-full">
              {paths.map((p) => {
                const isSelected = selectedId === `edge:${p.id}`;
                const isActive = activeEdgeIds.has(p.id);
                return (
                  <path
                    key={p.id}
                    d={p.d}
                    fill="none"
                    stroke={
                      isActive
                        ? "rgba(79,70,229,0.98)"
                        : isSelected
                        ? "rgba(79,70,229,0.95)"
                        : "rgba(99,102,241,0.55)"
                    }
                    strokeWidth={isActive ? 3.5 : isSelected ? 3 : 2}
                    style={{ cursor: "pointer", filter: isActive ? "url(#edge-glow)" : "none" }}
                    onMouseDown={(e) => {
                      e.stopPropagation();
                      setSelectedId(`edge:${p.id}`);
                    }}
                  />
                );
              })}

              {/* Превью соединения */}
              {connectFrom && (() => {
                const a = getNode(connectFrom);
                if (!a) return null;
                const x1 = a.x + NODE_W / 2;
                const y1 = a.y + NODE_H / 2;
                const x2 = mouseCanvasPos.x;
                const y2 = mouseCanvasPos.y;
                const dx = (x2 - x1) / 2;
                const d = `M ${x1} ${y1} C ${x1 + dx} ${y1}, ${x2 - dx} ${y2}, ${x2} ${y2}`;
                return (
                  <path d={d} fill="none" stroke="rgba(15,23,42,0.25)" strokeDasharray="6 6" strokeWidth="2" />
                );
              })()}
            </svg>

            {/* Nodes */}
            {nodes.map((n) => {
              const palette = PALETTE.find((p) => p.type === n.type);
              const gradient = palette ? palette.color : "from-gray-500 to-gray-700";
              const picked = selectedId === n.id;
              const Icon = palette?.icon;
              const isActive = activeNodeId === n.id;

              const startHandleX = n.x + NODE_W - 8;
              const startHandleY = n.y + NODE_H / 2 - 6;

              const endHandleX = n.x - 6;
              const endHandleY = n.y + NODE_H / 2 - 6;

              return (
                <motion.div
                  key={n.id}
                  drag
                  dragMomentum={false}
                  onDrag={(e, info) => onDrag(n.id, n.x + info.delta.x, n.y + info.delta.y)}
                  onDragEnd={() => onDragEnd(n.id)}
                  onMouseDown={(e) => {
                    e.stopPropagation();
                    setSelectedId(n.id);
                  }}
                  onDoubleClick={() => onStartConnect(n.id)}
                  onMouseUp={() => {
                    if (connectFrom && connectFrom !== n.id) onFinishConnect(n.id);
                  }}
                  className={`absolute p-3 rounded-xl border shadow bg-white/95 ${
                    picked ? "border-indigo-400 shadow-lg" : "border-gray-200"
                  } ${isActive ? "ring-2 ring-indigo-400 ring-offset-1" : ""}`}
                  style={{ left: n.x, top: n.y, width: NODE_W, height: NODE_H }}
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-1 text-xs font-semibold text-gray-700">
                      {Icon && <Icon className={`w-3.5 h-3.5 ${isActive ? "text-indigo-600" : "text-indigo-500"}`} />} {n.type}
                    </div>
                    <Link2 className="w-3.5 h-3.5 text-gray-400" />
                  </div>

                  {/* Инлайн-редактор имени */}
                  {editingNameId === n.id ? (
                    <input
                      ref={editingNameInputRef}
                      defaultValue={n.name}
                      autoFocus
                      onMouseDown={(e) => e.stopPropagation()}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          const val = e.currentTarget.value.trim();
                          setNodes((prev) =>
                            prev.map((x) => (x.id === n.id ? { ...x, name: val || n.name } : x))
                          );
                          setEditingNameId(null);
                        } else if (e.key === "Escape") {
                          setEditingNameId(null);
                        }
                      }}
                      onBlur={(e) => {
                        const val = e.currentTarget.value.trim();
                        setNodes((prev) =>
                          prev.map((x) => (x.id === n.id ? { ...x, name: val || n.name } : x))
                        );
                        setEditingNameId(null);
                      }}
                      className="w-full border rounded-md px-1 py-[3px] text-sm text-gray-800 focus:ring-2 focus:ring-indigo-400 outline-none"
                    />
                  ) : (
                    <div
                      className="font-medium text-gray-800 text-sm truncate hover:bg-gray-50 rounded px-1 cursor-text"
                      title="Click to rename"
                      onMouseDown={(e) => e.stopPropagation()}
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditingNameId(n.id);
                        setTimeout(() => editingNameInputRef.current?.select(), 0);
                      }}
                    >
                      {n.name}
                    </div>
                  )}

                  <div className={`mt-2 h-2 w-24 rounded-full bg-gradient-to-r ${gradient}`} />

                  {/* Start handle (outgoing) */}
                  <div
                    className="absolute w-3 h-3 rounded-full bg-indigo-500 hover:scale-110 transition border border-white cursor-crosshair"
                    title="Start connection"
                    style={{ left: startHandleX, top: startHandleY }}
                    onMouseDown={(e) => {
                      e.stopPropagation();
                      onStartConnect(n.id);
                    }}
                  />

                  {/* End handle (incoming) */}
                  <div
                    className="absolute w-3 h-3 rounded-full bg-gray-400 hover:scale-110 transition border border-white cursor-crosshair"
                    title="Finish connection"
                    style={{ left: endHandleX, top: endHandleY }}
                    onMouseUp={(e) => {
                      e.stopPropagation();
                      if (connectFrom && connectFrom !== n.id) onFinishConnect(n.id);
                    }}
                  />
                </motion.div>
              );
            })}
          </motion.div>

          {/* Mini-map */}
          <div
            ref={minimapRef}
            onClick={handleMinimapClick}
            className="absolute bottom-4 right-4 w-48 h-32 bg-white/90 border border-gray-300 shadow-md rounded-lg overflow-hidden cursor-pointer"
          >
            <svg width="100%" height="100%">
              {nodes.map((n) => (
                <rect
                  key={n.id}
                  x={n.x * minimapScale}
                  y={n.y * minimapScale}
                  width={NODE_W * minimapScale}
                  height={NODE_H * minimapScale}
                  fill={activeNodeId === n.id ? "#6366f1" : "#94a3b8"}
                  opacity={activeNodeId === n.id ? 0.9 : 0.5}
                />
              ))}
            </svg>
          </div>
        </div>

        {/* Inspector */}
        <aside className="w-72 border-l bg-white p-4 shadow-sm">
          <h3 className="font-semibold flex items-center gap-2 mb-3">
            <Settings className="w-4 h-4 text-indigo-500" /> Properties
          </h3>
          {selectedNode ? (
            <div className="space-y-4 text-sm">
              <div>
                <label className="text-gray-600 block mb-1">Name</label>
                <input
                  value={selectedNode.name}
                  onChange={(e) =>
                    setNodes((prev) =>
                      prev.map((n) =>
                        n.id === selectedNode.id ? { ...n, name: e.target.value } : n
                      )
                    )
                  }
                  className="w-full border rounded-lg px-2 py-1 focus:ring-2 focus:ring-indigo-400 outline-none"
                />
              </div>
              <div>
                <label className="text-gray-600 block mb-1">Prompt / Text</label>
                <textarea
                  value={selectedNode.prompt}
                  onChange={(e) =>
                    setNodes((prev) =>
                      prev.map((n) =>
                        n.id === selectedNode.id ? { ...n, prompt: e.target.value } : n
                      )
                    )
                  }
                  placeholder={
                    selectedNode.type === "Condition"
                      ? "Comma-separated keywords for branching, e.g.: price,help"
                      : ""
                  }
                  className="w-full border rounded-lg px-2 py-1 h-24 resize-none focus:ring-2 focus:ring-indigo-400 outline-none"
                />
                {selectedNode.type === "Condition" && (
                  <p className="text-[11px] text-gray-500 mt-1">
                    If user text contains any keyword → go by the <b>first</b> outgoing edge, else → <b>second</b>.
                  </p>
                )}
              </div>
              <div className="text-xs text-gray-500">Type: {selectedNode.type}</div>
              <button onClick={removeSelected} className="btn w-full">
                <Trash2 className="w-4 h-4" /> Delete node
              </button>
            </div>
          ) : selectedId?.startsWith("edge:") ? (
            <div className="space-y-4 text-sm">
              <div className="text-gray-700">Edge selected</div>
              <div className="text-xs text-gray-500">ID: {selectedId.replace("edge:", "")}</div>
              <button onClick={removeSelected} className="btn w-full">
                <Trash2 className="w-4 h-4" /> Delete edge
              </button>
            </div>
          ) : (
            <p className="text-gray-400 text-sm text-center mt-10">
              Select a node or edge to edit its properties
            </p>
          )}
        </aside>
      </div>
    </div>
  );
}
