import { motion } from "framer-motion";
import { MessageSquare, Zap, Wifi, TrendingUp, Activity } from "lucide-react";

export default function DashboardPreview() {
  const bots = [
    {
      name: "Telegram Assistant",
      platform: "Telegram",
      icon: "💬",
      messages: "2.1k",
      uptime: "100%",
      latency: "180ms",
      trend: "+8.4%",
      color: "from-indigo-500 to-blue-500",
    },
    {
      name: "Website Support",
      platform: "Web",
      icon: "🌐",
      messages: "4.3k",
      uptime: "99.9%",
      latency: "220ms",
      trend: "+5.2%",
      color: "from-violet-500 to-purple-500",
    },
    {
      name: "Instagram AI",
      platform: "Instagram",
      icon: "📸",
      messages: "8.7k",
      uptime: "99.7%",
      latency: "150ms",
      trend: "+10.1%",
      color: "from-pink-500 to-fuchsia-500",
    },
  ];

  return (
    <section className="relative bg-[#F9FAFB] text-gray-900 py-28">
      <div className="max-w-7xl mx-auto text-center px-6">
        {/* Заголовок */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-semibold mb-4"
        >
          Manage your bots effortlessly
        </motion.h2>

        <p className="text-gray-500 text-lg mb-16">
          Monitor messages, uptime, and performance — all in one simple, modern dashboard.
        </p>

        {/* Карточки */}
        <div className="grid md:grid-cols-3 gap-10">
          {bots.map((bot, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: i * 0.15 }}
              whileHover={{
                y: -8,
                boxShadow: "0 10px 40px rgba(99,102,241,0.15)",
              }}
              className="relative bg-white rounded-2xl p-6 shadow-sm border border-gray-100 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-xl bg-gradient-to-br ${bot.color} flex items-center justify-center text-xl`}
                  >
                    {bot.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{bot.name}</h3>
                    <p className="text-gray-400 text-sm">{bot.platform}</p>
                  </div>
                </div>
                <span className="text-green-500 font-medium">{bot.trend}</span>
              </div>

              {/* Метрики */}
              <div className="flex flex-col gap-2 text-sm mb-4">
                <div className="flex justify-between text-gray-600">
                  <span className="flex items-center gap-1">
                    <MessageSquare size={14} /> Messages:
                  </span>
                  <span className="font-medium">{bot.messages}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span className="flex items-center gap-1">
                    <Wifi size={14} /> Uptime:
                  </span>
                  <span className="font-medium">{bot.uptime}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span className="flex items-center gap-1">
                    <Activity size={14} /> Latency:
                  </span>
                  <span className="font-medium">{bot.latency}</span>
                </div>
              </div>

              {/* Прогресс */}
              <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "80%" }}
                  transition={{ duration: 1.2, delay: i * 0.2 }}
                  className={`h-full bg-gradient-to-r ${bot.color}`}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Подвал CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16"
        >
          <a
            href="/dashboard"
            className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-800 font-medium transition"
          >
            Open full dashboard <TrendingUp className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
