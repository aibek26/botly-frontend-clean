import { motion } from "framer-motion";
import { Brain, Network, MessageCircle, ShieldCheck } from "lucide-react";

export default function Features() {
  const features = [
    {
      icon: <Brain className="w-6 h-6 text-indigo-400" />,
      title: "Trainable Intelligence",
      desc: "Easily teach your bot new skills. Upload data, connect APIs, and customize behavior with natural language.",
    },
    {
      icon: <MessageCircle className="w-6 h-6 text-indigo-400" />,
      title: "Human-like Conversations",
      desc: "Deliver contextual, natural, and engaging conversations across chat, voice, and web platforms.",
    },
    {
      icon: <Network className="w-6 h-6 text-indigo-400" />,
      title: "Seamless Integrations",
      desc: "Plug into Telegram, Slack, WhatsApp, and any REST API — all from a single unified dashboard.",
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-indigo-400" />,
      title: "Enterprise Security",
      desc: "Your data stays encrypted, private, and compliant with the latest security standards.",
    },
  ];

  return (
    <section className="relative py-28 overflow-hidden bg-gradient-to-b from-gray-50 via-white to-gray-50">
      {/* 🌐 Фон — радиальный свет + сетка */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_center,rgba(99,102,241,0.08),transparent_70%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.5),transparent_70%)]" />
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(200,200,200,0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(200,200,200,0.15) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Контент */}
      <div className="relative max-w-7xl mx-auto px-6 md:px-8 text-center z-10">
        {/* 🔮 Заголовок */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="
            text-4xl sm:text-5xl md:text-6xl 
            font-semibold mb-6 
            leading-[1.15] sm:leading-[1.12] md:leading-[1.1]  /* ✅ увеличенный line-height */
            pb-[0.15em]  /* небольшой отступ снизу, чтобы 'g' не обрезалось */
            bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-400 
            bg-clip-text text-transparent
          "
        >
          Intelligence that scales with you
        </motion.h2>

        {/* Основной подзаголовок */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-gray-600 text-lg max-w-2xl mx-auto mb-20"
        >
          From startups to enterprises, Botly provides the tools to design,
          train, and deploy intelligent bots that grow with your business.
        </motion.p>

        {/* Сетка фич */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 relative">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="
                relative bg-white/60 backdrop-blur-lg border border-gray-200 
                shadow-sm hover:shadow-[0_0_25px_rgba(99,102,241,0.2)] 
                rounded-2xl p-6 transition-all duration-300 group
              "
            >
              <div className="flex justify-center items-center w-12 h-12 rounded-xl 
                              bg-gradient-to-br from-indigo-500/10 to-purple-400/10 
                              mx-auto mb-4 group-hover:scale-110 transition-transform">
                {f.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-800">
                {f.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
