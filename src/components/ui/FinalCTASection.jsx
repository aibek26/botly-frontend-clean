import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function FinalCTASection() {
  const words = ["Design", "Train", "Launch", "Scale"];

  return (
    <section className="relative w-full bg-black text-white overflow-hidden py-32 flex flex-col items-center justify-center">
      {/* 🔹 subtle grid background */}
      <div className="absolute inset-0 opacity-[0.07] bg-[radial-gradient(circle_at_center,#6366f1_0%,transparent_70%)]" />
      <div className="absolute inset-0 bg-[url('/textures/noise.png')] opacity-[0.05] mix-blend-overlay" />

      {/* ✨ Light gradient overlay */}
      <motion.div
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute inset-0 bg-[linear-gradient(90deg,rgba(99,102,241,0.05)_0%,rgba(168,85,247,0.08)_50%,rgba(37,99,235,0.05)_100%)] bg-[length:200%_200%]"
      />

      {/* 📦 Title Words */}
      <div className="relative z-10 flex flex-wrap justify-center gap-10 text-5xl md:text-7xl font-semibold tracking-tight select-none">
        {words.map((word, i) => (
          <motion.div
            key={i}
            whileHover={{
              scale: 1.15,
              color: "#818CF8", // Indigo-400 glow
              textShadow: "0 0 30px rgba(129,140,248,0.5)",
            }}
            transition={{ type: "spring", stiffness: 300, damping: 12 }}
            className="cursor-default transition-all duration-300"
          >
            {word}
            {i < words.length - 1 && (
              <span className="mx-4 text-gray-700">·</span>
            )}
          </motion.div>
        ))}
      </div>

      {/* 💬 Subtext */}
      <motion.p
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 0.8, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 text-gray-500 mt-10 text-center text-lg max-w-2xl leading-relaxed"
      >
        Build, deploy and scale intelligent chatbots with <span className="text-gray-300">Botly</span>.  
        Trusted by developers to automate conversations — from prototype to production.
      </motion.p>

      {/* 🚀 CTA Button */}
      <motion.a
        href="/signup"
        whileHover={{
          scale: 1.08,
          boxShadow: "0 0 40px rgba(129,140,248,0.25)",
        }}
        whileTap={{ scale: 0.96 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="relative z-10 mt-12 px-10 py-4 rounded-full bg-white text-black font-medium flex items-center gap-2 shadow-lg hover:bg-gray-100 transition"
      >
        Get started <ArrowUpRight className="w-5 h-5" />
      </motion.a>
    </section>
  );
}
