import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Pricing() {
  const navigate = useNavigate();
  const [isYearly, setIsYearly] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showToast, setShowToast] = useState(false);

  // 💡 Yearly = скидка -20%, но всё показываем как /month
  const getDiscountedPrice = (price) => {
    return isYearly ? Math.round(price * 0.8 * 10) / 10 : price;
  };

  const plans = [
    {
      name: "Free",
      priceMonthly: 0,
      description: "Perfect to explore Botly and build your first chatbot.",
      features: [
        "1 active bot",
        "Up to 100 messages / month",
        "1 integration",
        "Dashboard access",
        "Community support",
      ],
      buttonText: "Start for free",
      onClick: () => navigate("/signup"),
    },
    {
      name: "Pro",
      priceMonthly: 25,
      description: "For creators and small teams scaling their automation.",
      features: [
        "1 active bot",
        "Up to 1,000 messages / month",
        "All integrations",
        "Dashboard access",
        "Priority email support",
      ],
      buttonText: "Get Pro",
      highlighted: true,
      onClick: () => navigate("/signup"),
    },
    {
      name: "Enterprise",
      priceMonthly: "Custom",
      description: "For large teams requiring custom AI and security.",
      features: [
        "Custom limits & SLA",
        "Private cloud or on-premise hosting",
        "Dashboard access",
        "Dedicated account manager",
        "Advanced analytics dashboard",
      ],
      buttonText: "Contact sales",
      onClick: () => setShowModal(true),
    },
  ];

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => setShowToast(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setShowModal(false);
    setShowToast(true);
  };

  return (
    <>
      <section className="relative py-28 bg-gradient-to-b from-white via-gray-50 to-white text-center">
        {/* 🔹 Background grid */}
        <div
          className="absolute inset-0 opacity-30 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(200,200,200,0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(200,200,200,0.15) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 max-w-3xl mx-auto mb-12 px-6"
        >
          <h2
            className="
              text-4xl sm:text-5xl md:text-6xl 
              font-semibold mb-4
              leading-[1.15] sm:leading-[1.12] md:leading-[1.1]
              pb-[0.15em]
              bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-400 
              bg-clip-text text-transparent
            "
          >
            Choose your Botly plan
          </h2>
          <p className="text-gray-600 text-lg">
            Flexible pricing for individuals, startups, and enterprises.
          </p>
        </motion.div>

        {/* Toggle */}
        <div className="relative z-10 flex justify-center mb-16">
          <div className="flex items-center gap-4 bg-white/70 backdrop-blur-md border border-gray-200 rounded-full p-2 shadow-sm">
            <span
              className={`text-sm font-medium transition ${
                !isYearly ? "text-indigo-600" : "text-gray-500"
              }`}
            >
              Monthly
            </span>
            <button
              onClick={() => setIsYearly(!isYearly)}
              className="relative w-14 h-7 bg-gray-200 rounded-full flex items-center transition"
            >
              <motion.div
                layout
                className="w-6 h-6 bg-indigo-500 rounded-full shadow-md"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                style={{ x: isYearly ? 30 : 0 }}
              />
            </button>
            <span
              className={`text-sm font-medium transition ${
                isYearly ? "text-indigo-600" : "text-gray-500"
              }`}
            >
              Yearly (-20%)
            </span>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-10 max-w-7xl mx-auto px-6">
          {plans.map((plan, i) => {
            const isCustom = plan.priceMonthly === "Custom";
            const price = isCustom ? "Custom" : getDiscountedPrice(plan.priceMonthly);

            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className={`relative bg-white/70 backdrop-blur-xl border border-gray-200 rounded-2xl p-8 shadow-sm hover:shadow-[0_0_25px_rgba(99,102,241,0.2)] transition-all duration-300 ${
                  plan.highlighted
                    ? "border-indigo-500 shadow-[0_0_30px_rgba(99,102,241,0.15)] scale-[1.02]"
                    : ""
                }`}
              >
                {plan.highlighted && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-semibold text-white bg-indigo-500 px-3 py-1 rounded-full shadow">
                    Most Popular
                  </span>
                )}

                <h3 className="text-xl font-semibold mb-2 text-gray-800">
                  {plan.name}
                </h3>
                <p className="text-gray-500 text-sm mb-6">{plan.description}</p>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={isYearly ? "yearly" : "monthly"}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4 }}
                    className="mb-6"
                  >
                    <span className="text-4xl font-bold text-gray-900">
                      {isCustom ? "Custom" : `$${price}`}
                    </span>
                    {!isCustom && (
                      <span className="text-gray-500 text-sm ml-1">/month</span>
                    )}
                  </motion.div>
                </AnimatePresence>

                <ul className="text-gray-600 text-sm space-y-3 mb-8">
                  {plan.features.map((feature, j) => (
                    <li
                      key={j}
                      className="flex items-start justify-center gap-2 text-left"
                    >
                      <Check className="w-4 h-4 text-indigo-500 mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={plan.onClick}
                  className={`w-full py-3 rounded-lg font-medium transition ${
                    plan.highlighted
                      ? "bg-indigo-500 text-white hover:bg-indigo-600 shadow"
                      : "border border-gray-300 hover:border-indigo-400 text-gray-700"
                  }`}
                >
                  {plan.buttonText}
                </button>
              </motion.div>
            );
          })}
        </div>

        {/* 💬 Extra note under pricing cards */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-gray-500 text-sm mt-12"
        >
          Cancel anytime. No hidden fees.
        </motion.p>

        {/* ✨ Enterprise CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative mt-24 max-w-5xl mx-auto px-8 py-16 rounded-3xl overflow-hidden shadow-[0_0_40px_rgba(99,102,241,0.15)]"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-400 opacity-90" />
          <div className="relative z-10 text-white">
            <h3 className="text-3xl md:text-4xl font-semibold mb-4">
              Looking for enterprise solutions?
            </h3>
            <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
              Get custom AI infrastructure, private hosting, and dedicated
              support tailored to your organization's needs.
            </p>
            <button
              onClick={() => setShowModal(true)}
              className="bg-white text-indigo-600 font-medium px-6 py-3 rounded-lg shadow hover:shadow-lg transition-all hover:scale-[1.03]"
            >
              Contact Sales
            </button>
          </div>
        </motion.div>
      </section>

      {/* 💬 Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full relative"
            >
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              >
                <X size={20} />
              </button>

              <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                Contact Sales
              </h3>
              <p className="text-gray-500 text-sm mb-6">
                Tell us a bit about your organization, and our team will reach
                out shortly.
              </p>

              <form onSubmit={handleFormSubmit} className="space-y-4">
                <input
                  type="text"
                  placeholder="Your name"
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:border-indigo-500 outline-none"
                />
                <input
                  type="email"
                  placeholder="Your email"
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:border-indigo-500 outline-none"
                />
                <textarea
                  placeholder="Your message"
                  rows="4"
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:border-indigo-500 outline-none resize-none"
                />
                <button
                  type="submit"
                  className="w-full bg-indigo-500 hover:bg-indigo-600 text-white py-2.5 rounded-lg font-medium transition"
                >
                  Send message
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ✅ Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-400 text-white px-6 py-3 rounded-xl shadow-lg font-medium text-sm flex items-center gap-2"
          >
            <Check size={16} className="text-white" />
            Message sent successfully!
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
