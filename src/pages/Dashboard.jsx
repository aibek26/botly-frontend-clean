import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useState, useEffect } from "react";

export default function Dashboard() {
  const [period, setPeriod] = useState("7d");
  const [data, setData] = useState([]);
  const [cards, setCards] = useState([
    { title: "Active Bots", value: "–", change: "" },
    { title: "Total Users", value: "–", change: "" },
    { title: "Messages", value: "–", change: "" },
    { title: "Uptime", value: "99.98%", change: "stable" },
  ]);

  // 🟣 Эмулируем загрузку статистики (без Supabase)
  useEffect(() => {
    const projects = JSON.parse(localStorage.getItem("botly-projects") || "[]");
    const totalMessages = JSON.parse(localStorage.getItem("botly-messages") || "0");
    const totalUsers = Math.floor(Math.random() * 500 + 50);

    setTimeout(() => {
      setCards([
        {
          title: "Active Bots",
          value: projects.length,
          change: `+${Math.floor(Math.random() * 3) + 1} this week`,
        },
        {
          title: "Total Users",
          value: totalUsers,
          change: `+${Math.floor(Math.random() * 50) + 10} new`,
        },
        {
          title: "Messages",
          value: totalMessages,
          change: "+4.2%",
        },
        { title: "Uptime", value: "99.98%", change: "stable" },
      ]);
    }, 600);
  }, []);

  // 🟣 Эмулируем данные для графика
  useEffect(() => {
    const days = period === "7d" ? 7 : period === "30d" ? 30 : 90;
    const labels = Array.from({ length: days }).map((_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - (days - 1 - i));
      return d.toLocaleDateString("en-US", {
        day: "2-digit",
        month: period === "90d" ? "short" : undefined,
      });
    });

    const chartData = labels.map((name) => ({
      name,
      messages: Math.floor(Math.random() * 300 + 50),
    }));

    setTimeout(() => setData(chartData), 400);
  }, [period]);

  const noData = !data || data.length === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="space-y-10 bg-gradient-to-b from-gray-50/50 to-white dark:from-gray-950 dark:to-gray-900 p-4 sm:p-6 lg:p-8 rounded-3xl shadow-inner"
    >
      {/* 🔹 DEMO MODE BANNER */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="mb-6 flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-sky-500 text-white py-2.5 px-4 rounded-xl shadow-md"
      >
        <span className="text-sm font-medium tracking-wide">
          🚀 <strong>Demo Mode:</strong> All data and activity are simulated for showcase purposes.
        </span>
      </motion.div>

      {/* HEADER */}
      <div className="mb-4">
        <h1 className="text-3xl font-semibold tracking-tight">Dashboard</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1 text-base">
          Overview of your system performance and usage trends.
        </p>
      </div>

      {/* KPI CARDS */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
        }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {cards.map((card) => (
          <motion.div
            key={card.title}
            variants={{
              hidden: { opacity: 0, y: 10 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.3 }}
          >
            <Card className="p-6 hover:shadow-md border border-gray-200 dark:border-gray-800 transition-all duration-300">
              <h3 className="text-sm text-gray-500 dark:text-gray-400">
                {card.title}
              </h3>
              <p className="text-3xl font-semibold mt-1 tracking-tight">
                {card.value}
              </p>
              <p className="text-xs text-indigo-500 mt-1">{card.change}</p>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* CHART SECTION */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
      >
        <Card className="p-8 border border-gray-200 dark:border-gray-800 hover:shadow-md transition-all duration-300">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
            <div>
              <h3 className="text-lg font-medium mb-1">Bot Activity</h3>

              {/* Total messages + trend */}
              {(() => {
                const total = data.reduce((sum, d) => sum + d.messages, 0);
                const prevTotal = total * (1 - Math.random() * 0.15);
                const change = ((total - prevTotal) / prevTotal) * 100;
                const isUp = change >= 0;

                return (
                  <>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Total messages this{" "}
                      {period === "7d"
                        ? "week"
                        : period === "30d"
                        ? "month"
                        : "quarter"}
                      :
                      <span className="text-indigo-500 font-semibold ml-1">
                        {total.toLocaleString()}
                      </span>
                    </p>

                    <div className="flex items-center gap-1 mt-1 text-sm">
                      <span
                        className={`${
                          isUp ? "text-emerald-500" : "text-rose-500"
                        } font-medium flex items-center gap-1`}
                      >
                        {isUp ? "▲" : "▼"} {Math.abs(change).toFixed(1)}%
                      </span>
                      <span className="text-gray-400 dark:text-gray-500">
                        vs last period
                      </span>
                    </div>
                  </>
                );
              })()}
            </div>

            {/* Period selector */}
            <div className="flex gap-2 mt-4 sm:mt-0">
              {["7d", "30d", "90d"].map((p) => (
                <Button
                  key={p}
                  variant={p === period ? "primary" : "outline"}
                  onClick={() => setPeriod(p)}
                >
                  {p.toUpperCase()}
                </Button>
              ))}
            </div>
          </div>

          {/* Chart */}
          {noData ? (
            <div className="h-56 flex items-center justify-center text-gray-400">
              No data available for selected period
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={280}>
              <LineChart
                data={data}
                margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorMessages" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                </defs>

                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#e5e7eb"
                  className="dark:stroke-gray-700"
                />
                <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} />
                <YAxis stroke="#9ca3af" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(255,255,255,0.95)",
                    border: "1px solid #e5e7eb",
                    borderRadius: "0.75rem",
                    fontSize: "0.875rem",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                  }}
                  labelStyle={{ color: "#6b7280" }}
                  itemStyle={{ color: "#111827" }}
                />
                <Line
                  type="monotone"
                  dataKey="messages"
                  stroke="#6366f1"
                  strokeWidth={2.5}
                  dot={false}
                  activeDot={{
                    r: 6,
                    stroke: "#6366f1",
                    strokeWidth: 2,
                    fill: "#fff",
                  }}
                  animationDuration={800}
                  fill="url(#colorMessages)"
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </Card>
      </motion.div>
    </motion.div>
  );
}
