import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#fdf6ee] flex">
      {/* Left Panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#f6760a] flex-col justify-between p-12 relative overflow-hidden">
        {/* Background Decorative Circles */}
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-white/10 rounded-full" />
        <div className="absolute -bottom-16 -right-16 w-96 h-96 bg-white/10 rounded-full" />
        <div className="absolute top-1/2 left-1/4 w-40 h-40 bg-white/5 rounded-full" />

        {/* Logo */}
        <div className="relative z-10 flex items-center gap-2">
          <div className="w-9 h-9 bg-white rounded-xl flex items-center justify-center">
            <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
              <path
                d="M12 2C7 2 3 6 3 11c0 3.5 2 6.5 5 8.2V21h8v-1.8c3-1.7 5-4.7 5-8.2 0-5-4-9-9-9z"
                fill="#f6760a"
              />
              <circle cx="9" cy="10" r="1.5" fill="white" />
              <circle cx="15" cy="10" r="1.5" fill="white" />
              <path
                d="M9 14s1 2 3 2 3-2 3-2"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <span className="text-white font-bold text-xl tracking-tight">
            swiftbite
          </span>
        </div>

        {/* Hero Text */}
        <div className="relative z-10">
          <p className="text-white/70 text-sm font-medium uppercase tracking-widest mb-4">
            Hungry? We got you.
          </p>
          <h1 className="text-white text-5xl font-black leading-tight mb-6">
            Food that finds
            <br />
            <span className="text-white/80">you faster.</span>
          </h1>
          <p className="text-white/65 text-base leading-relaxed max-w-sm">
            Thousands of restaurants, one tap. Hot meals delivered to your door
            in 30 minutes or less.
          </p>
        </div>

        {/* Stats */}
        <div className="relative z-10 flex gap-8">
          {[
            { value: "2.4k+", label: "Restaurants" },
            { value: "30 min", label: "Avg. delivery" },
            { value: "4.9★", label: "App rating" },
          ].map(({ value, label }) => (
            <div key={label}>
              <p className="text-white text-2xl font-black">{value}</p>
              <p className="text-white/60 text-xs mt-0.5">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Right Panel — Login Form */}
      <div className="flex-1 flex flex-col justify-center items-center px-6 py-12">
        {/* Mobile logo */}
        <div className="lg:hidden flex items-center gap-2 mb-10">
          <div className="w-9 h-9 bg-[#f6760a] rounded-xl flex items-center justify-center">
            <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
              <path
                d="M12 2C7 2 3 6 3 11c0 3.5 2 6.5 5 8.2V21h8v-1.8c3-1.7 5-4.7 5-8.2 0-5-4-9-9-9z"
                fill="white"
              />
            </svg>
          </div>
          <span className="text-[#1a1a1a] font-bold text-xl tracking-tight">
            swiftbite
          </span>
        </div>

        <div className="w-full max-w-sm">
          <h2 className="text-3xl font-black text-[#1a1a1a] mb-1">
            Welcome back
          </h2>
          <p className="text-[#8a8a8a] text-sm mb-8">
            Sign in to continue your order
          </p>

          {/* Email */}
          <div className="mb-5">
            <label className="block text-xs font-semibold text-[#3a3a3a] uppercase tracking-wider mb-2">
              Email
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#c0c0c0]">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </span>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#e8e0d8] bg-white text-[#1a1a1a] text-sm placeholder-[#c0c0c0] outline-none focus:border-[#f6760a] focus:ring-2 focus:ring-[#f6760a]/20 transition"
              />
            </div>
          </div>

          {/* Password */}
          <div className="mb-2">
            <label className="block text-xs font-semibold text-[#3a3a3a] uppercase tracking-wider mb-2">
              Password
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#c0c0c0]">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </span>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-10 py-3 rounded-xl border border-[#e8e0d8] bg-white text-[#1a1a1a] text-sm placeholder-[#c0c0c0] outline-none focus:border-[#f6760a] focus:ring-2 focus:ring-[#f6760a]/20 transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#c0c0c0] hover:text-[#f6760a] transition"
              >
                {showPassword ? (
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                ) : (
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Forgot */}
          <div className="flex justify-end mb-7">
            <button className="text-xs text-[#f6760a] font-semibold hover:underline">
              Forgot password?
            </button>
          </div>

          {/* Submit */}
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="w-full py-3.5 rounded-xl bg-[#f6760a] hover:bg-[#e06500] active:scale-[0.98] text-white font-bold text-sm tracking-wide transition-all duration-150 flex items-center justify-center gap-2 disabled:opacity-70"
          >
            {isLoading ? (
              <>
                <svg
                  className="w-4 h-4 animate-spin"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8z"
                  />
                </svg>
                Signing in…
              </>
            ) : (
              "Sign in"
            )}
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-[#e8e0d8]" />
            <span className="text-xs text-[#b0a898]">or</span>
            <div className="flex-1 h-px bg-[#e8e0d8]" />
          </div>

          {/* Google SSO */}
          <button className="w-full py-3 rounded-xl border border-[#e8e0d8] bg-white hover:bg-[#fdf0e4] text-[#3a3a3a] text-sm font-semibold flex items-center justify-center gap-2.5 transition">
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Continue with Google
          </button>

          {/* Sign up */}
          <p className="text-center text-sm text-[#8a8a8a] mt-8">
            New here?{" "}
            <button className="text-[#f6760a] font-semibold hover:underline">
              Create an account
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}