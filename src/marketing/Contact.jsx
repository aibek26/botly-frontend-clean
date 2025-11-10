import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Send, Copy } from "lucide-react";
import emailjs from "emailjs-com";

export default function Contact() {
  const formRef = useRef();
  const [loading, setLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [copied, setCopied] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .sendForm(
        "service_xxlwhzd", // ✅ Service ID
        "template_b7l7tni", // ✅ Template ID
        formRef.current,
        "LShNlHXeXH1TyOn1-" // ⚠️ Public Key
      )
      .then(
        () => {
          setIsSent(true);
          setLoading(false);
          e.target.reset();
        },
        (error) => {
          console.error("❌ Error sending email:", error);
          alert("Something went wrong. Please try again later.");
          setLoading(false);
        }
      );
  };

  const copyEmail = () => {
    navigator.clipboard.writeText("support@botly.ai");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative py-28 bg-gradient-to-b from-white via-gray-50 to-white overflow-hidden">
      {/* 🌐 Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_center,rgba(99,102,241,0.08),transparent_70%)]" />
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(200,200,200,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(200,200,200,0.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Контент */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl sm:text-5xl md:text-6xl font-semibold mb-6 bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-400 bg-clip-text text-transparent"
        >
          Contact Us
        </motion.h2>

        <p className="text-gray-600 text-lg mb-16">
          Let’s talk about how Botly can help you build smarter, scalable AI chatbots.
        </p>

        {/* 📩 Contact Form */}
        {!isSent ? (
          <motion.form
            ref={formRef}
            onSubmit={sendEmail}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white/70 backdrop-blur-md border border-gray-200 rounded-2xl shadow-lg p-8 max-w-2xl mx-auto text-left"
          >
            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="user_name"
                required
                placeholder="John Doe"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 outline-none transition"
              />
            </div>

            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                name="user_email"
                required
                placeholder="john@example.com"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 outline-none transition"
              />
            </div>

            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Company (optional)
              </label>
              <input
                type="text"
                name="user_company"
                placeholder="Botly Inc."
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 outline-none transition"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Your Message
              </label>
              <textarea
                name="message"
                required
                rows="5"
                placeholder="Tell us how we can help..."
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 outline-none transition resize-none"
              ></textarea>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={loading}
              className={`w-full flex justify-center items-center gap-2 font-medium py-3 rounded-lg shadow transition ${
                loading
                  ? "bg-gray-400 cursor-not-allowed text-white"
                  : "bg-indigo-500 hover:bg-indigo-600 text-white"
              }`}
            >
              <Send className="w-5 h-5" />
              {loading ? "Sending..." : "Send Message"}
            </motion.button>
          </motion.form>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center bg-white/60 border border-gray-200 rounded-2xl p-10 max-w-2xl mx-auto shadow-md"
          >
            <h3 className="text-2xl font-semibold text-indigo-600 mb-3">
              ✅ Message sent!
            </h3>
            <p className="text-gray-600">
              Thank you for reaching out. We’ll get back to you within 24 hours.
            </p>
          </motion.div>
        )}

        {/* 📧 Email Copy Section */}
        <div className="mt-12 text-gray-500 text-sm flex flex-col items-center gap-2">
          <p>Or contact us directly:</p>
          <button
            onClick={copyEmail}
            className="text-indigo-500 font-medium hover:underline flex items-center gap-2"
          >
            support@botly.ai
            <Copy className="w-4 h-4" />
          </button>
          {copied && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-green-500 text-xs mt-1"
            >
              Copied to clipboard!
            </motion.span>
          )}
        </div>
      </div>
    </section>
  );
}
