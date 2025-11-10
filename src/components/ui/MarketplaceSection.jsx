import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef } from "react";
import { Sparkles, Clock } from "lucide-react";

export default function MarketplaceSection() {
  const bots = [
    { name: "SalesFlow Bot", desc: "Automates your client pipeline", color: "from-pink-500 to-violet-500" },
    { name: "SupportAI", desc: "Handles customer requests instantly", color: "from-indigo-500 to-cyan-500" },
    { name: "CryptoCopilot", desc: "Tracks and trades in real-time", color: "from-purple-500 to-blue-500" },
    { name: "LangTutor", desc: "Teaches new languages via chat", color: "from-teal-500 to-emerald-500" },
    { name: "HR Assistant", desc: "Automates hiring workflows", color: "from-orange-500 to-pink-500" },
    { name: "NewsMind", desc: "Curates AI-driven news summaries", color: "from-blue-500 to-indigo-500" },
  ];

  const particles = Array.from({ length: 14 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 5,
    size: Math.random() * 8 + 3,
  }));

  const containerRef = useRef(null);
  const controls = useAnimation();

  // 🧠 Реакция sparkles на курсор
  useEffect(() => {
    const container = containerRef.current;
    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const moveX = (x - centerX) / 50;
      const moveY = (y - centerY) / 50;

      controls.start({
        x: moveX,
        y: moveY,
        transition: { type: "spring", stiffness: 60, damping: 10 },
      });
    };

    container.addEventListener("mousemove", handleMouseMove);
    return () => container.removeEventListener("mousemove", handleMouseMove);
  }, [controls]);

  return (
    <section
      ref={containerRef}
      className="relative py-32 bg-gradient-to-b from-white via-gray-50 to-indigo-50 overflow-hidden text-center"
    >
      {/* 🌌 Ореол фона */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
        className="absolute left-1/2 top-1/2 w-[900px] h-[900px] -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-indigo-400/30 via-purple-300/20 to-indigo-400/30 blur-[180px] rounded-full pointer-events-none"
      />

      {/* ✨ Sparkles */}
      <motion.div animate={controls} className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0.1, 0.8, 0.1],
              y: [p.y + 20, p.y - 20, p.y + 20],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              delay: p.delay,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
            }}
            className="absolute rounded-full bg-gradient-to-r from-indigo-400 via-purple-400 to-transparent blur-md"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
              opacity: 0.4,
            }}
          />
        ))}
      </motion.div>

      {/* Основное содержимое */}
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          Explore the{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">
            Botly Marketplace
          </span>
        </h2>
        <p className="text-gray-500 text-lg mb-16">
          A curated gallery of the best community-built AI bots.
        </p>

        {/* Coming Soon overlay */}
        <div className="relative">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 place-items-center opacity-40 blur-sm select-none pointer-events-none">
            {bots.map((bot, i) => (
              <motion.div
                key={i}
                animate={{ y: [0, -8, 0] }}
                transition={{
                  duration: 5 + i * 0.3,
                  repeat: Infinity,
                  repeatType: "mirror",
                  ease: "easeInOut",
                }}
                className={`relative bg-gradient-to-br ${bot.color} p-[2px] rounded-2xl shadow-xl`}
              >
                <div className="bg-white rounded-2xl h-full w-full px-6 py-8 flex flex-col justify-between text-left">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-indigo-500" />
                      {bot.name}
                    </h3>
                    <p className="text-gray-500 text-sm mt-2 leading-snug">
                      {bot.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Полупрозрачная плашка “Coming soon” */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="absolute inset-0 flex flex-col items-center justify-center bg-white/60 backdrop-blur-md rounded-3xl border border-indigo-100"
          >
            <Clock className="w-12 h-12 text-indigo-500 mb-3 animate-pulse" />
            <h3 className="text-2xl md:text-3xl font-semibold text-indigo-600 mb-2">
              Marketplace Coming Soon
            </h3>
            <p className="text-gray-500 max-w-md">
              We’re curating the best AI bots from the Botly community.  
              Get ready to publish, share, and explore bots worldwide.
            </p>
          </motion.div>
        </div>

        <motion.button
          whileHover={{ scale: 1.07 }}
          whileTap={{ scale: 0.97 }}
          disabled
          className="mt-14 px-6 py-3 bg-gray-300 text-gray-600 text-sm font-medium rounded-lg shadow-md cursor-not-allowed"
        >
          Publish your bot — Coming Soon
        </motion.button>
      </div>
    </section>
  );
}
