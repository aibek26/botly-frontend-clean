import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Mail } from "lucide-react";
import { Link } from "react-router-dom";

export default function FAQ() {
  const faqs = [
    {
      q: "What is Botly?",
      a: "Botly is a no-code platform that allows you to create, train, and deploy AI-powered chatbots for your business — all from one intuitive dashboard.",
    },
    {
      q: "Do I need coding experience?",
      a: "No coding is required! Botly provides a visual builder where you can connect logic blocks, train your model, and integrate platforms easily.",
    },
    {
      q: "Can I use Botly with Telegram or WhatsApp?",
      a: "Yes! You can deploy your chatbots directly to Telegram, WhatsApp, Slack, or even embed them on your website via API.",
    },
    {
      q: "Is there a free plan?",
      a: "Absolutely. The Free plan includes 1 bot, 1 integration, and up to 100 monthly messages — perfect to explore Botly.",
    },
    {
      q: "How secure is my data?",
      a: "All data is encrypted and securely stored. We follow industry-standard practices and offer private cloud options for enterprise clients.",
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);
  const toggleFAQ = (index) => setOpenIndex(openIndex === index ? null : index);

  return (
    <section className="relative py-28 bg-gradient-to-b from-white via-gray-50 to-white overflow-hidden">
      {/* 🌐 Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_center,rgba(99,102,241,0.08),transparent_70%)]" />
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(200,200,200,0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(200,200,200,0.15) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* 📘 Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative text-4xl sm:text-5xl md:text-6xl font-semibold mb-3 
             leading-[1.25] tracking-tight bg-gradient-to-r 
             from-indigo-500 via-purple-500 to-blue-400 bg-clip-text text-transparent
             overflow-visible pb-3"
        >
          Frequently Asked Questions
        </motion.h2>

        <p className="text-gray-600 text-lg mb-16">
          Everything you need to know about using Botly.
        </p>

        {/* 🔹 Accordion */}
        <div className="space-y-4 text-left">
          {faqs.map((item, index) => (
            <div
              key={index}
              className="bg-white/60 backdrop-blur-md border border-gray-200 rounded-2xl shadow-sm hover:shadow-[0_0_20px_rgba(99,102,241,0.15)] transition-all duration-300"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center px-6 py-4 text-left focus:outline-none"
              >
                <span className="font-medium text-gray-800 text-base md:text-lg">
                  {item.q}
                </span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                </motion.div>
              </button>

              <AnimatePresence initial={false}>
                {openIndex === index && (
                  <motion.div
                    key="content"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                  >
                    <div className="px-6 pb-5 text-gray-600 text-sm md:text-base leading-relaxed border-t border-gray-100">
                      {item.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* 💬 Final Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mt-24 relative text-center"
        >
          {/* Glow background */}
          <div className="absolute inset-0 -z-10 flex justify-center">
            <div className="w-[400px] h-[400px] bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.15),transparent_70%)] blur-3xl" />
          </div>

          <h3 className="text-2xl md:text-3xl font-semibold mb-4 text-gray-900">
            Still have questions?
          </h3>
          <p className="text-gray-500 mb-8 max-w-md mx-auto">
            Our team is here to help you integrate Botly and build your first AI chatbot.
          </p>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-lg text-base font-medium shadow transition-all"
            >
              <Mail className="w-5 h-5" />
              Contact us
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
