import { motion } from "framer-motion";
import { Moon, Sun, Bell, LogOut, ChevronDown } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(
    document.documentElement.classList.contains("dark")
  );
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  // 🎨 Toggle theme
  const toggleDarkMode = () => {
    document.documentElement.classList.toggle("dark");
    setDarkMode(!darkMode);
    localStorage.setItem("theme", darkMode ? "light" : "dark");
  };

  // 🧭 Scroll shadow
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 🧩 Click outside dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 🚪 Logout
  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/login");
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={`sticky top-0 z-40 backdrop-blur-md transition-all ${
        scrolled
          ? "bg-white/70 dark:bg-gray-900/70 shadow-sm border-b border-gray-200 dark:border-gray-800"
          : "bg-white/50 dark:bg-gray-900/40"
      }`}
    >
      <div className="flex items-center justify-between px-6 py-3">
        {/* 🧠 Left: brand */}
        <div className="flex items-center gap-2 select-none">
          <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
            BOTLY
          </span>
        </div>

        {/* 🌐 Right: actions */}
        <div className="flex items-center gap-4">
          {/* Notification */}
          <button className="relative text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition">
            <Bell className="w-5 h-5" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-indigo-500 rounded-full"></span>
          </button>

          {/* Theme switch */}
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          >
            {darkMode ? (
              <Sun className="w-4 h-4 text-yellow-400" />
            ) : (
              <Moon className="w-4 h-4 text-gray-600" />
            )}
          </button>

          {/* 👤 User dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-indigo-500 transition"
            >
              <img
                src={`https://api.dicebear.com/7.x/identicon/svg?seed=BotlyUser`}
                alt="user avatar"
                className="w-8 h-8 rounded-full border border-gray-200 dark:border-gray-700"
              />
              <span className="text-sm font-medium hidden md:inline">Aibek</span>
              <ChevronDown
                size={16}
                className={`transition-transform duration-200 ${
                  menuOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Dropdown menu */}
            {menuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-3 w-40 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg py-2"
              >
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </motion.nav>
  );
}

