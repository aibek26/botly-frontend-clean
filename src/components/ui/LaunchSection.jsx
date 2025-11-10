import { motion } from "framer-motion";

export default function LaunchSection() {
  const cards = [
    { title: "Start Flow", desc: "Build your first automation visually", top: "15%", left: "12%", delay: 0.2 },
    { title: "Train AI", desc: "Customize behavior with natural language", top: "65%", left: "20%", delay: 0.4 },
    { title: "Deploy Bot", desc: "Launch across web, Telegram, or API", top: "10%", right: "18%", delay: 0.6 },
    { title: "Share on Marketplace", desc: "Show your bot to the world and get discovered", bottom: "18%", right: "22%", delay: 0.8 },
  ];

  return (
    <section className="relative flex flex-col items-center justify-center text-center py-40 bg-[#0C0B10] overflow-hidden">
      {/* 💡 Пульсирующее сияние позади текста */}
      <motion.div
        initial={{ opacity: 0.5, scale: 1 }}
        animate={{
          opacity: [0.4, 0.8, 0.4],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -z-10 w-[45rem] h-[45rem] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-400 opacity-30 blur-[130px] rounded-full"
        style={{
          top: "45%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* ✨ Мягкий общий фон */}
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/10 via-purple-500/5 to-transparent blur-3xl pointer-events-none" />

      {/* 🚀 Заголовок LAUNCH */}
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-[9rem] md:text-[15rem] font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-300 bg-clip-text text-transparent leading-none select-none tracking-tight drop-shadow-[0_0_30px_rgba(139,92,246,0.45)]"
      >
        Launch
      </motion.h1>

      {/* 🧩 Плавающие карточки */}
      <div className="absolute inset-0 pointer-events-none">
        {cards.map((card, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.9,
              delay: card.delay,
              type: "spring",
              stiffness: 90,
            }}
            animate={{
              y: [0, -6, 0],
              transition: {
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
            whileHover={{ 
              scale: 1.07, 
              y: -8,
              boxShadow: "0 0 30px rgba(139,92,246,0.35)", // 💜 свечение
              borderColor: "rgba(139,92,246,0.8)",
            }}
            style={{
              position: "absolute",
              top: card.top,
              left: card.left,
              right: card.right,
              bottom: card.bottom,
            }}
            className="bg-[#16161D]/80 backdrop-blur-xl border border-gray-700/60 rounded-xl shadow-xl p-5 w-56 text-left text-gray-200 pointer-events-auto transition-all duration-500 ease-out hover:backdrop-blur-2xl hover:bg-[#1B1A22]/90"
          >
            <h4 className="font-semibold text-white mb-1">{card.title}</h4>
            <p className="text-xs text-gray-400">{card.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}





