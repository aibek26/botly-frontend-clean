import { useState } from "react";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Settings,
  MessageSquare,
  Bot,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
    { name: "Bots", icon: Bot, path: "/dashboard/bots" },
    { name: "Messages", icon: MessageSquare, path: "/dashboard/messages" },
    { name: "Settings", icon: Settings, path: "/dashboard/settings" },
  ];

  return (
    <motion.aside
      initial={{ width: 240 }}
      animate={{ width: collapsed ? 80 : 240 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="hidden md:flex flex-col h-screen sticky top-0
        bg-white/60 dark:bg-gray-900/40 backdrop-blur-md
        border-r border-gray-200 dark:border-gray-800 shadow-sm
        transition-all"
    >
      {/* Header */}
      <div
        className={`flex items-center justify-between px-4 h-16 border-b border-gray-100 dark:border-gray-800 ${
          collapsed ? "justify-center" : ""
        }`}
      >
        <div className="flex items-center gap-2">
          <AnimatePresence>
            {!collapsed && (
              <motion.span
                key="botly-text"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.25 }}
                className="text-lg font-bold tracking-tight bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 bg-clip-text text-transparent select-none"
              >
                BOTLY
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        <motion.button
          onClick={() => setCollapsed(!collapsed)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </motion.button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 mt-6 space-y-1 px-3">
        {menuItems.map(({ name, icon: Icon, path }) => (
          <NavLink key={name} to={path} end>
            {({ isActive }) => (
              <motion.div
                layout
                className={`group relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium cursor-pointer transition-all duration-200
                ${
                  isActive
                    ? "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 shadow-[0_0_12px_rgba(99,102,241,0.25)]"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800/60 hover:shadow-[0_0_8px_rgba(99,102,241,0.15)]"
                }`}
              >
                <Icon
                  size={18}
                  className={`min-w-[18px] transition-all duration-300 ${
                    isActive
                      ? "text-indigo-500 drop-shadow-[0_0_6px_rgba(99,102,241,0.5)]"
                      : "text-gray-500 dark:text-gray-400 group-hover:text-indigo-400 group-hover:drop-shadow-[0_0_4px_rgba(99,102,241,0.4)]"
                  }`}
                />

                {/* Text */}
                <AnimatePresence>
                  {!collapsed && (
                    <motion.span
                      key="menu-text"
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -8 }}
                      transition={{ duration: 0.25 }}
                    >
                      {name}
                    </motion.span>
                  )}
                </AnimatePresence>

                {/* Tooltip when collapsed */}
                {collapsed && (
                  <span
                    className="absolute left-full ml-3 px-2.5 py-1 rounded-md text-xs font-medium text-gray-800 dark:text-gray-100 
                    bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 
                    shadow-lg opacity-0 group-hover:opacity-100 group-hover:translate-x-1 
                    transform transition-all duration-200 whitespace-nowrap pointer-events-none 
                    backdrop-blur-sm"
                  >
                    {name}
                  </span>
                )}
              </motion.div>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <motion.div
        className="p-4 border-t border-gray-100 dark:border-gray-800 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <AnimatePresence>
          {!collapsed && (
            <motion.p
              key="footer-text"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 5 }}
              transition={{ duration: 0.25 }}
              className="text-sm text-gray-400 dark:text-gray-600"
            >
              © {new Date().getFullYear()} Botly
            </motion.p>
          )}
        </AnimatePresence>
        {collapsed && (
          <p className="text-xs text-gray-400 dark:text-gray-600">©</p>
        )}
      </motion.div>
    </motion.aside>
  );
}
