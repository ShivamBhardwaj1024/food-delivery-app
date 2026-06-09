import { useState } from "react";
import Field from "../components/Field";

// ── Shared icon components ──────────────────────────────────────────────────
const IconEmail = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const IconLock = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const IconUser = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const IconPhone = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6.08 6.08l1.8-1.8a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const IconEyeOff = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
);

const IconEye = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const IconCheck = () => (
  <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const IconSpinner = () => (
  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
  </svg>
);

// ── Logo (reused from LoginPage) ────────────────────────────────────────────
const Logo = ({ dark = false }) => (
  <div className="flex items-center gap-2">
    <div
      className={`w-9 h-9 rounded-xl flex items-center justify-center ${
        dark ? "bg-[#f6760a]" : "bg-white"
      }`}
    >
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
        <path
          d="M12 2C7 2 3 6 3 11c0 3.5 2 6.5 5 8.2V21h8v-1.8c3-1.7 5-4.7 5-8.2 0-5-4-9-9-9z"
          fill={dark ? "white" : "#f6760a"}
        />
        <circle cx="9" cy="10" r="1.5" fill="white" />
        <circle cx="15" cy="10" r="1.5" fill="white" />
        <path d="M9 14s1 2 3 2 3-2 3-2" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </div>
    <span
      className={`font-bold text-xl tracking-tight ${dark ? "text-[#1a1a1a]" : "text-white"}`}
    >
      swiftbite
    </span>
  </div>
);



const inputClass =
  "w-full pl-10 pr-4 py-3 rounded-xl border bg-white text-[#1a1a1a] text-sm placeholder-[#c0c0c0] outline-none transition";
const inputIdle = "border-[#e8e0d8] focus:border-[#f6760a] focus:ring-2 focus:ring-[#f6760a]/20";
const inputError = "border-red-400 focus:border-red-400 focus:ring-2 focus:ring-red-200";

// ── Password strength ───────────────────────────────────────────────────────
function getStrength(pw) {
  if (!pw) return 0;
  let s = 0;
  if (pw.length >= 8) s++;
  if (/[A-Z]/.test(pw)) s++;
  if (/[0-9]/.test(pw)) s++;
  if (/[^A-Za-z0-9]/.test(pw)) s++;
  return s;
}

const strengthLabel = ["", "Weak", "Fair", "Good", "Strong"];
const strengthColor = ["", "bg-red-400", "bg-yellow-400", "bg-blue-400", "bg-green-500"];
const strengthText = ["", "text-red-500", "text-yellow-500", "text-blue-500", "text-green-600"];

// ── Main component ──────────────────────────────────────────────────────────
export default function Registration() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
    confirm: "",
    agree: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const strength = getStrength(form.password);

  const set = (key) => (e) =>
    setForm((f) => ({ ...f, [key]: e.target.type === "checkbox" ? e.target.checked : e.target.value }));

  const validate = () => {
    const e = {};
    if (!form.firstName.trim()) e.firstName = "First name is required.";
    if (!form.lastName.trim()) e.lastName = "Last name is required.";
    if (!/^\+?[0-9\s\-]{7,15}$/.test(form.phone)) e.phone = "Enter a valid phone number.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email address.";
    if (form.password.length < 8) e.password = "Password must be at least 8 characters.";
    if (form.confirm !== form.password) e.confirm = "Passwords do not match.";
    if (!form.agree) e.agree = "You must accept the terms.";
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length > 0) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setSuccess(true);
    }, 2000);
  };

  // ── Success state ───────────────────────────────────────────────────────
  if (success) {
    return (
      <div className="min-h-screen bg-[#fdf6ee] flex items-center justify-center px-6">
        <div className="text-center max-w-sm">
          <div className="w-20 h-20 rounded-full bg-[#f6760a]/10 flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-[#f6760a]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <h2 className="text-3xl font-black text-[#1a1a1a] mb-2">You're in!</h2>
          <p className="text-[#8a8a8a] text-sm mb-8">
            Welcome to swiftbite, {form.firstName}. Your account is ready — time to eat.
          </p>
          <button
            onClick={() => setSuccess(false)}
            className="px-8 py-3 rounded-xl bg-[#f6760a] hover:bg-[#e06500] text-white font-bold text-sm transition"
          >
            Start ordering
          </button>
        </div>
      </div>
    );
  }

  // ── Main form ────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#fdf6ee] flex">
      {/* ── Left brand panel ── */}
      <div className="hidden lg:flex lg:w-[42%] bg-[#f6760a] flex-col justify-between p-12 relative overflow-hidden">
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-white/10 rounded-full" />
        <div className="absolute -bottom-16 -right-16 w-96 h-96 bg-white/10 rounded-full" />
        <div className="absolute top-1/2 left-1/4 w-40 h-40 bg-white/5 rounded-full" />

        <div className="relative z-10">
          <Logo />
        </div>

        <div className="relative z-10">
          <p className="text-white/70 text-sm font-medium uppercase tracking-widest mb-4">
            Join the community
          </p>
          <h1 className="text-white text-5xl font-black leading-tight mb-6">
            Your first meal
            <br />
            <span className="text-white/80">is one step away.</span>
          </h1>
          <p className="text-white/65 text-base leading-relaxed max-w-sm">
            Create your free account and unlock thousands of restaurants, exclusive deals, and
            lightning-fast delivery.
          </p>
        </div>

        {/* Perks list */}
        <div className="relative z-10 space-y-3">
          {[
            "Free delivery on your first 3 orders",
            "Real-time order tracking",
            "Exclusive member-only deals",
          ].map((perk) => (
            <div key={perk} className="flex items-center gap-3">
              <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                <IconCheck />
              </div>
              <span className="text-white/80 text-sm">{perk}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Right form panel ── */}
      <div className="flex-1 flex flex-col justify-center items-center px-6 py-10 overflow-y-auto">
        {/* Mobile logo */}
        <div className="lg:hidden mb-8">
          <Logo dark />
        </div>

        <div className="w-full max-w-md">
          <h2 className="text-3xl font-black text-[#1a1a1a] mb-1">Create account</h2>
          <p className="text-[#8a8a8a] text-sm mb-7">
            Already have one?{" "}
            <button className="text-[#f6760a] font-semibold hover:underline">Sign in</button>
          </p>

          {/* ── Name row ── */}
          <div className="grid grid-cols-2 gap-3">
            <Field label="First name" icon={<IconUser />} error={errors.firstName}>
              <input
                type="text"
                placeholder="Jane"
                value={form.firstName}
                onChange={set("firstName")}
                className={`${inputClass} ${errors.firstName ? inputError : inputIdle}`}
              />
            </Field>
            <Field label="Last name" icon={<IconUser />} error={errors.lastName}>
              <input
                type="text"
                placeholder="Doe"
                value={form.lastName}
                onChange={set("lastName")}
                className={`${inputClass} ${errors.lastName ? inputError : inputIdle}`}
              />
            </Field>
          </div>


          {/* ── Email ── */}
          <Field label="Email" icon={<IconEmail />} error={errors.email}>
            <input
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={set("email")}
              className={`${inputClass} ${errors.email ? inputError : inputIdle}`}
            />
          </Field>

          {/* ── Password ── */}
          <div className="mb-4">
            <label className="block text-xs font-semibold text-[#3a3a3a] uppercase tracking-wider mb-2">
              Password
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#c0c0c0] pointer-events-none">
                <IconLock />
              </span>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Min. 8 characters"
                value={form.password}
                onChange={set("password")}
                className={`${inputClass} pr-10 ${errors.password ? inputError : inputIdle}`}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#c0c0c0] hover:text-[#f6760a] transition"
              >
                {showPassword ? <IconEyeOff /> : <IconEye />}
              </button>
            </div>

            {/* Strength meter */}
            {form.password && (
              <div className="mt-2.5">
                <div className="flex gap-1 mb-1">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                        i <= strength ? strengthColor[strength] : "bg-[#e8e0d8]"
                      }`}
                    />
                  ))}
                </div>
                <p className={`text-xs font-semibold ${strengthText[strength]}`}>
                  {strengthLabel[strength]}
                </p>
              </div>
            )}
            {errors.password && (
              <p className="text-xs text-red-500 mt-1.5">{errors.password}</p>
            )}
          </div>

          {/* ── Confirm password ── */}
          <Field label="Confirm password" icon={<IconLock />} error={errors.confirm}>
            <input
              type={showConfirm ? "text" : "password"}
              placeholder="Re-enter your password"
              value={form.confirm}
              onChange={set("confirm")}
              className={`${inputClass} pr-10 ${errors.confirm ? inputError : inputIdle}`}
            />
            <button
              type="button"
              onClick={() => setShowConfirm((v) => !v)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#c0c0c0] hover:text-[#f6760a] transition"
            >
              {showConfirm ? <IconEyeOff /> : <IconEye />}
            </button>
            {/* Match indicator */}
            {form.confirm && form.password && (
              <span
                className={`absolute right-10 top-1/2 -translate-y-1/2 text-xs font-semibold ${
                  form.confirm === form.password ? "text-green-500" : "text-red-400"
                }`}
              >
                {form.confirm === form.password ? "✓" : "✗"}
              </span>
            )}
          </Field>

          {/* ── Terms ── */}
          <div className="mb-6">
            <label className="flex items-start gap-3 cursor-pointer select-none">
              <div
                onClick={() => setForm((f) => ({ ...f, agree: !f.agree }))}
                className={`mt-0.5 w-5 h-5 rounded-md border-2 flex-shrink-0 flex items-center justify-center transition ${
                  form.agree
                    ? "bg-[#f6760a] border-[#f6760a]"
                    : errors.agree
                    ? "border-red-400"
                    : "border-[#d0c8c0]"
                }`}
              >
                {form.agree && (
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </div>
              <span className="text-sm text-[#5a5a5a] leading-snug">
                I agree to swiftbite's{" "}
                <button className="text-[#f6760a] font-semibold hover:underline">
                  Terms of Service
                </button>{" "}
                and{" "}
                <button className="text-[#f6760a] font-semibold hover:underline">
                  Privacy Policy
                </button>
              </span>
            </label>
            {errors.agree && (
              <p className="text-xs text-red-500 mt-1.5 ml-8">{errors.agree}</p>
            )}
          </div>

          {/* ── Submit ── */}
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="w-full py-3.5 rounded-xl bg-[#f6760a] hover:bg-[#e06500] active:scale-[0.98] text-white font-bold text-sm tracking-wide transition-all duration-150 flex items-center justify-center gap-2 disabled:opacity-70"
          >
            {isLoading ? (
              <>
                <IconSpinner />
                Creating account…
              </>
            ) : (
              "Create account"
            )}
          </button>

          {/* ── Divider ── */}
          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-[#e8e0d8]" />
            <span className="text-xs text-[#b0a898]">or</span>
            <div className="flex-1 h-px bg-[#e8e0d8]" />
          </div>

          {/* ── Google SSO ── */}
          <button className="w-full py-3 rounded-xl border border-[#e8e0d8] bg-white hover:bg-[#fdf0e4] text-[#3a3a3a] text-sm font-semibold flex items-center justify-center gap-2.5 transition">
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Sign up with Google
          </button>
        </div>
      </div>
    </div>
  );
}