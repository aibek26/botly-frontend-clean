import { Outlet, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Sidebar from "../components/ui/Sidebar";
import Navbar from "../components/ui/Navbar";

export default function DashboardLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/login");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="flex min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100"
    >
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Navbar onLogout={handleLogout} />
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </motion.div>
  );
}
