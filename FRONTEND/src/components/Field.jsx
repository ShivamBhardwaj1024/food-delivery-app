// ── Input field wrapper ─────────────────────────────────────────────────────
const Field = ({ label, icon, error, children }) => (
  <div className="mb-4">
    <label className="block text-xs font-semibold text-[#3a3a3a] uppercase tracking-wider mb-2">
      {label}
    </label>
    <div className="relative">
      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#c0c0c0] pointer-events-none">
        {icon}
      </span>
      {children}
    </div>
    {error && <p className="text-xs text-red-500 mt-1.5">{error}</p>}
  </div>
);

export default Field;