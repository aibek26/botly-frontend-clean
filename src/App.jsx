import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useState, createContext, useEffect } from "react";
import Contact from "./marketing/Contact";

// Layouts (App)
import DashboardLayout from "./layouts/DashboardLayout";

// App pages
import Dashboard from "./pages/Dashboard";
import Bots from "./pages/Bots";
import Settings from "./pages/Settings";
import Messages from "./pages/Messages";
import Builder from "./pages/Builder";

// Marketing pages
import Home from "./marketing/Home";
import Pricing from "./marketing/Pricing";
import Features from "./marketing/Features";
import FAQ from "./marketing/FAQ";
import Login from "./auth/Login";
import Signup from "./auth/Signup";

// Защищённый маршрут (оставляем для будущего)
import ProtectedRoute from "./auth/ProtectedRoute";

export const ThemeContext = createContext();

export default function App() {
  const location = useLocation();
  const [theme, setTheme] = useState("light");

  const toggleTheme = () =>
    setTheme((prev) => (prev === "light" ? "dark" : "light"));

  // 🌙 Dark / Light Theme
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className="min-h-screen transition-colors duration-300 bg-gray-50 text-gray-900 dark:bg-gray-950 dark:text-gray-100">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            {/* ---------- 🌐 Публичная часть ---------- */}
            <Route path="/" element={<Home />} />
            <Route path="/features" element={<Features />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/contact" element={<Contact />} />

            {/* ---------- 💠 Dashboard (временно публичный) ---------- */}
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="bots" element={<Bots />} />
              <Route path="messages" element={<Messages />} />
              <Route path="settings" element={<Settings />} />
              <Route path="builder" element={<Builder />} />
            </Route>

            {/* ---------- Redirect на главную ---------- */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AnimatePresence>
      </div>
    </ThemeContext.Provider>
  );
}
