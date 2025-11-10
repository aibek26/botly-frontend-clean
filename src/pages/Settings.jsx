import { motion } from "framer-motion";

export default function Bots() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="space-y-4"
    >
      <h1 className="text-2xl font-semibold">My Bots</h1>
      <p className="text-gray-600">Manage and deploy your AI bots here.</p>
    </motion.div>
  );
}
