// src/pages/Bots.jsx
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";

export default function Bots() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Your Bots</h1>
        <Link to="/dashboard/builder">
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 rounded-lg bg-indigo-500 px-4 py-2 text-white shadow hover:bg-indigo-600"
          >
            <Plus className="w-4 h-4" />
            Create bot
          </motion.button>
        </Link>
      </div>

      <div className="rounded-xl border border-dashed border-gray-300 p-10 text-center text-gray-500">
        No bots yet. Click <b>Create bot</b> to start building your first flow.
      </div>
    </div>
  );
}
