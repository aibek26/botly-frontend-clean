import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, Globe } from "lucide-react";

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [agree, setAgree] = useState(false);

  return (
    <div className="flex h-screen bg-white">
      {/* Левая часть — форма */}
      <div className="w-full md:w-1/2 flex flex-col justify-center px-8 sm:px-16 lg:px-24">
        <div className="max-w-md w-full mx-auto">
          {/* Заголовок */}
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-2xl font-semibold text-gray-900 mb-2"
          >
            Create your account
          </motion.h2>
          <p className="text-gray-500 text-sm mb-8">
            Join Botly and start building your first AI-powered assistant.
          </p>

          {/* Кнопка Google */}
          <button
            className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded-lg py-2.5 text-gray-700 hover:bg-gray-50 transition mb-5"
          >
            <img
              src="https://www.svgrepo.com/show/355037/google.svg"
              alt="Google"
              className="w-4 h-4"
            />
            Sign up with Google
          </button>

          {/* Разделитель */}
          <div className="flex items-center gap-2 mb-6">
            <div className="flex-grow h-px bg-gray-200"></div>
            <span className="text-xs text-gray-400">or</span>
            <div className="flex-grow h-px bg-gray-200"></div>
          </div>

          {/* Форма */}
          <form className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3 top-3.5 text-gray-400" />
                <input
                  type="email"
                  placeholder="you@example.com"
                  required
                  className="w-full border border-gray-300 rounded-lg pl-9 pr-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3 top-3.5 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Your password"
                  required
                  className="w-full border border-gray-300 rounded-lg pl-9 pr-9 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Checkbox */}
            <div className="flex items-start gap-2 text-sm mt-2">
              <input
                type="checkbox"
                id="agree"
                checked={agree}
                onChange={() => setAgree(!agree)}
                className="mt-0.5"
              />
              <label htmlFor="agree" className="text-gray-600 leading-snug">
                I agree with the{" "}
                <a
                  href="#"
                  className="text-indigo-600 hover:underline"
                >
                  Terms of Service
                </a>{" "}
                and{" "}
                <a
                  href="#"
                  className="text-indigo-600 hover:underline"
                >
                  Privacy Policy
                </a>
                .
              </label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className={`w-full mt-4 py-2.5 rounded-lg font-medium transition ${
                agree
                  ? "bg-indigo-600 text-white hover:bg-indigo-700"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
              disabled={!agree}
            >
              Continue
            </button>

            <p className="text-center text-sm text-gray-500 mt-4">
              Already have an account?{" "}
              <a href="/login" className="text-indigo-600 hover:underline">
                Log in
              </a>
            </p>
          </form>
        </div>
      </div>

      {/* Правая часть — фон и текст */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-b from-indigo-400 via-blue-400 to-indigo-600 text-white relative items-center justify-center">
        <div className="absolute top-5 right-5">
          <Globe className="w-5 h-5 text-white/80 cursor-pointer" />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center px-8"
        >
          <h2 className="text-2xl md:text-3xl font-semibold mb-2">
            A new era of automation
          </h2>
          <p className="text-white/90 text-sm max-w-sm mx-auto">
            Build intelligent AI agents that work, talk, and learn for you — powered by Botly.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
