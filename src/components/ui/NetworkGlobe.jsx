import { motion } from "framer-motion";
import { FaTelegramPlane, FaInstagram, FaGlobe, FaWhatsapp } from "react-icons/fa";

export default function NetworkGlobe() {
  const nodes = [
    { id: 1, top: "35%", left: "20%", icon: <FaWhatsapp className="text-green-500" /> },
    { id: 2, top: "25%", left: "70%", icon: <FaTelegramPlane className="text-sky-500" /> },
    { id: 3, top: "65%", left: "75%", icon: <FaInstagram className="text-pink-500" /> },
    { id: 4, top: "70%", left: "30%", icon: <FaGlobe className="text-indigo-500" /> },
  ];

  return (
    <section className="relative py-32 overflow-hidden bg-gradient-to-b from-white to-gray-50 border-t border-gray-100">
      <div className="max-w-5xl mx-auto text-center px-6">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-semibold mb-4"
        >
          Connecting your business with every platform
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-gray-600 text-lg mb-12 max-w-2xl mx-auto"
        >
          Botly acts as a hub — linking your AI chatbots across Telegram, Instagram, WhatsApp, and Web.
        </motion.p>
      </div>

      {/* 🌐 Глобус */}
      <div className="relative mx-auto w-[700px] h-[400px] flex items-center justify-center">
        {/* Концентрические окружности */}
        {[1, 0.8, 0.6, 0.4].map((scale, i) => (
          <div
            key={i}
            className="absolute rounded-full border border-gray-200/70"
            style={{
              width: `${scale * 100}%`,
              height: `${scale * 100}%`,
            }}
          />
        ))}

        {/* Центральное ядро (Botly) */}
        <motion.div
          className="absolute w-16 h-16 bg-indigo-500 rounded-full shadow-lg flex items-center justify-center text-white text-lg font-semibold z-20"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          Botly
        </motion.div>

        {/* Линии соединений */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {nodes.map((node, i) => {
            const x1 = 50; // центр
            const y1 = 50;
            const x2 = parseFloat(node.left);
            const y2 = parseFloat(node.top);
            return (
              <motion.line
                key={i}
                x1={`${x1}%`}
                y1={`${y1}%`}
                x2={`${x2}%`}
                y2={`${y2}%`}
                stroke="url(#pulseGradient)"
                strokeWidth="2"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: [0, 1, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 3 + Math.random() * 2,
                  ease: "easeInOut",
                }}
              />
            );
          })}
          <defs>
            <linearGradient id="pulseGradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#6366f1" stopOpacity="0.1" />
              <stop offset="50%" stopColor="#6366f1" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#6366f1" stopOpacity="0.1" />
            </linearGradient>
          </defs>
        </svg>

        {/* Вращающиеся узлы */}
        <motion.div
          className="absolute inset-0"
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
        >
          {nodes.map((n) => (
            <motion.div
              key={n.id}
              className="absolute w-12 h-12 bg-white rounded-full border border-gray-200 shadow-md flex items-center justify-center hover:scale-125 hover:shadow-lg transition-transform duration-300"
              style={{ top: n.top, left: n.left }}
              animate={{ scale: [1, 1.1, 1] }}
              transition={{
                repeat: Infinity,
                duration: 2.5 + Math.random() * 2,
                delay: Math.random(),
              }}
            >
              <div className="text-2xl">{n.icon}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Glow вокруг центра */}
        <div className="absolute w-[220px] h-[220px] bg-indigo-100/40 rounded-full blur-3xl" />
      </div>

      {/* 🚀 CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        className="mt-32 text-center"
      >
        <h3 className="text-3xl md:text-4xl font-semibold mb-4">
          Start building your bot network today
        </h3>
        <p className="text-gray-600 mb-8 text-lg">
          Join hundreds of businesses already automating customer conversations with Botly.
        </p>

        <div className="flex justify-center gap-4">
          <a
            href="/signup"
            className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-lg text-base font-medium shadow transition"
          >
            Get Started for Free
          </a>
          <a
            href="/features"
            className="border border-gray-300 hover:border-indigo-400 px-6 py-3 rounded-lg text-base font-medium transition"
          >
            Learn More
          </a>
        </div>
      </motion.div>
    </section>
  );
}
