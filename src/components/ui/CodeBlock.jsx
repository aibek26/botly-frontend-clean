import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function CodeBlock() {
  const fullCode = `import os
from openai import OpenAI

client = OpenAI(api_key=os.getenv('AI_GATEWAY_KEY'))

response = client.chat.completions.create(
    model='openai/gpt-5',
    messages=[
        {"role": "user", "content": "Why is the sky blue?"}
    ]
)`;

  const [displayedCode, setDisplayedCode] = useState("");
  const [cursorVisible, setCursorVisible] = useState(true);

  // эффект "печати"
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < fullCode.length) {
        setDisplayedCode(fullCode.slice(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 20);
    return () => clearInterval(interval);
  }, []);

  // мигающий курсор
  useEffect(() => {
    const blink = setInterval(() => setCursorVisible((v) => !v), 500);
    return () => clearInterval(blink);
  }, []);

  return (
    <section className="relative bg-white text-gray-900 py-24 px-6 sm:px-10 text-left overflow-hidden">
      <div className="max-w-4xl mx-auto">
        {/* Заголовок */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-semibold mb-4"
        >
          The AI Gateway for Developers
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-gray-500 mb-10 max-w-2xl"
        >
          Effortlessly access and deploy AI models from one interface — built
          for speed, scale, and simplicity.
        </motion.p>

        {/* 💻 Code area */}
        <motion.pre
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative rounded-xl bg-gray-50 text-[14px] leading-relaxed overflow-x-auto shadow-md border border-gray-200 font-mono"
        >
          {/* Header */}
          <div className="flex items-center gap-3 px-4 py-2 border-b border-gray-200 text-gray-500 text-xs font-medium bg-white/70 backdrop-blur-sm">
            <span className="text-indigo-500 font-semibold">Python</span>
            <span className="opacity-60">/ OpenAI SDK</span>
          </div>

          {/* Печатающийся код */}
          <div className="px-6 py-4 whitespace-pre text-sm text-gray-800">
            {displayedCode}
            <span
              className={`text-indigo-500 ${
                cursorVisible ? "opacity-100" : "opacity-0"
              }`}
            >
              |
            </span>
          </div>
        </motion.pre>

        {/* Кнопки */}
        <div className="flex flex-wrap gap-3 mt-8">
          <button className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium shadow transition">
            Try in Playground
          </button>
          <button className="border border-gray-300 hover:border-indigo-400 text-gray-700 hover:text-indigo-500 px-4 py-2 rounded-lg text-sm font-medium transition">
            View Docs
          </button>
        </div>
      </div>
    </section>
  );
}
