import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { useRef } from "react";
import DashboardPreview from "../components/ui/DashboardPreview";
import NetworkGlobe from "../components/ui/NetworkGlobe";
import NetworkBackground from "../components/ui/NetworkBackground";
import BuilderPreview from "../components/ui/BuilderPreview";
import CodeBlock from "../components/ui/CodeBlock";
import LaunchSection from "../components/ui/LaunchSection";
import MarketplaceSection from "../components/ui/MarketplaceSection";
import FinalCTASection from "../components/ui/FinalCTASection";
import Features from "../marketing/Features";
import FAQ from "../marketing/FAQ";
import ChatWidget from "../widget/ChatWidget";

export default function Home() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const glowOpacity = useTransform(scrollYProgress, [0, 0.3, 1], [0.6, 1, 0.7]);
  const gradient = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [
      "linear-gradient(to right, #6366f1, #a855f7, #38bdf8)",
      "linear-gradient(to right, #8b5cf6, #6366f1, #06b6d4)",
      "linear-gradient(to right, #3b82f6, #818cf8, #a855f7)",
    ]
  );

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900 overflow-hidden">
      {/* 🧭 Navbar */}
      <motion.header
        style={{
          boxShadow: useTransform(
            scrollYProgress,
            [0, 0.2],
            ["none", "0 2px 20px rgba(99,102,241,0.1)"]
          ),
        }}
        className="fixed top-0 left-0 w-full z-50 flex items-center justify-between
        px-8 py-5 border-b border-gray-200 bg-white/80 backdrop-blur-lg
        supports-[backdrop-filter]:bg-white/60 transition-all duration-300"
      >
        <motion.div
          className="relative flex flex-col select-none leading-tight"
          style={{ opacity: glowOpacity }}
          whileHover={{
            scale: 1.05,
            textShadow:
              "0 0 20px rgba(99,102,241,0.7), 0 0 40px rgba(147,197,253,0.5)",
          }}
          transition={{ type: "spring", stiffness: 120 }}
        >
          <motion.div
            animate={{
              opacity: [0.4, 0.8, 0.4],
              scale: [1, 1.2, 1],
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 w-[120%] h-[120%] left-[-10%] top-[-10%] 
              bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.1),transparent_70%)] blur-2xl"
          />
          <motion.span
            style={{
              backgroundImage: gradient,
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
            className="text-[20px] font-extrabold tracking-[0.08em] relative z-10"
          >
            BOTLY
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-xs font-medium text-gray-500 tracking-wide mt-0.5 relative z-10 hover:text-indigo-500 transition-colors"
          >
            Conversational AI, made simple.
          </motion.span>
        </motion.div>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link to="/features" className="hover:text-indigo-500 transition">
            Features
          </Link>
          <Link to="/pricing" className="hover:text-indigo-500 transition">
            Pricing
          </Link>
          <Link to="/faq" className="hover:text-indigo-500 transition">
            FAQ
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="text-sm font-medium text-gray-700 hover:text-indigo-500 transition"
          >
            Log in
          </Link>
          <Link
            to="/signup"
            className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2.5 rounded-lg text-sm font-medium shadow-sm transition"
          >
            Start for free
          </Link>
        </div>
      </motion.header>

      <div className="h-[84px]" />

      {/* 🌟 Hero Section */}
      <section
        ref={heroRef}
        className="relative flex flex-col items-center justify-center text-center py-40 px-6 sm:px-8 bg-gradient-to-b from-white via-gray-50 to-gray-100 overflow-hidden"
      >
        <motion.div
          style={{ y }}
          className="absolute inset-0 z-0 opacity-90 will-change-transform"
        >
          <NetworkBackground />
        </motion.div>

        <motion.div
          animate={{ opacity: [0.5, 0.8, 0.5], scale: [1, 1.05, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[35%] left-1/2 -translate-x-1/2 w-[700px] h-[700px]
            bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.15),transparent_70%)] blur-3xl z-0"
        />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative z-10 max-w-3xl mx-auto"
        >
          <motion.h1
            style={{
              y: useTransform(scrollYProgress, [0, 1], [0, -40]),
            }}
            className="text-5xl md:text-6xl font-extrabold leading-tight tracking-tight"
          >
            Build{" "}
            <motion.span
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear",
              }}
              className="bg-gradient-to-r from-indigo-500 via-purple-500 to-sky-500 bg-[length:200%_200%] bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(99,102,241,0.35)]"
            >
              AI chatbots
            </motion.span>
            <br />
            without writing code
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-gray-600 text-lg mt-6 mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            Botly helps you create, deploy, and manage chatbots effortlessly —
            integrate them anywhere, from Telegram to your website.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="flex flex-wrap gap-5 justify-center"
          >
            <motion.div
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 25px rgba(99,102,241,0.3)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/signup"
                className="bg-indigo-500 hover:bg-indigo-600 text-white px-8 py-3 rounded-lg text-base font-medium shadow transition-all"
              >
                Get Started
              </Link>
            </motion.div>

            <motion.div
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 25px rgba(99,102,241,0.15)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/login"
                className="border border-gray-300 hover:border-indigo-400 px-8 py-3 rounded-lg text-base font-medium text-gray-700 hover:text-indigo-600 transition-all"
              >
                Log in
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      <div className="relative h-20 w-full bg-gradient-to-b from-gray-100 to-white -mt-10" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="text-center mt-10 mb-8"
      >
        <h2 className="text-3xl font-semibold mb-2">
          Design your bot logic visually 👇
        </h2>
        <p className="text-gray-500 text-lg">
          Drag, connect, and automate your flow — all in a no-code interface
        </p>
      </motion.div>

      <BuilderPreview />
      <DashboardPreview />
      <CodeBlock />
      <Features />
      <NetworkGlobe />
      <LaunchSection />
      <MarketplaceSection />
      <FAQ /> {/* 👈 добавлен FAQ */}
      <FinalCTASection />
      <ChatWidget />

      <footer className="text-center py-6 border-t border-gray-200 text-sm text-gray-500 bg-white mt-20">
        © {new Date().getFullYear()} Botly. All rights reserved.
      </footer>
    </div>
  );
}
