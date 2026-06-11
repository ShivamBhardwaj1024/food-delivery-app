import { useState, useRef } from "react";

// ── Design tokens ──────────────────────────────────────────────────────────
// Primary:   #f6760a   Surface: #fdf6ee   Card: #ffffff
// Border:    #e8e0d8   Dark: #1a1a1a   Mid: #5a5a5a   Mute: #9a9288

// ── Icons ──────────────────────────────────────────────────────────────────
const Ic = {
  Orders:    () => <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/><rect x="9" y="3" width="6" height="4" rx="1"/><line x1="9" y1="12" x2="15" y2="12"/><line x1="9" y1="16" x2="13" y2="16"/></svg>,
  Catalog:   () => <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z"/></svg>,
  Reels:     () => <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/></svg>,
  Dashboard: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>,
  Bell:      () => <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>,
  Plus:      () => <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  Edit:      () => <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>,
  Trash:     () => <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>,
  Check:     () => <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>,
  X:         () => <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
  Upload:    () => <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><polyline points="16 16 12 12 8 16"/><line x1="12" y1="12" x2="12" y2="21"/><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"/></svg>,
  Star:      () => <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="#f6760a"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
  TrendUp:   () => <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>,
  Play:      () => <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3"/></svg>,
  Eye:       () => <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>,
  Bike:      () => <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="5.5" cy="17.5" r="3.5"/><circle cx="18.5" cy="17.5" r="3.5"/><path d="M15 6h-3l-2 6h7.5"/><path d="M5.5 17.5L9 10l3 4"/></svg>,
  Menu:      () => <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>,
  Toggle:    ({ on }) => (
    <div className={`w-11 h-6 rounded-full flex items-center px-0.5 transition-colors duration-200 ${on ? "bg-[#f6760a]" : "bg-[#d1ccc7]"}`}>
      <div className={`w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${on ? "translate-x-5" : "translate-x-0"}`} />
    </div>
  ),
};

// ── Mock data ──────────────────────────────────────────────────────────────
const INIT_ORDERS = [
  { id: "ORD-1041", customer: "Priya S.",  items: ["Pepperoni Feast × 2", "Garlic Dip × 1"],   total: 31.47, time: "2 min ago",  status: "new",       address: "45 MG Road, Agra" },
  { id: "ORD-1040", customer: "Rahul M.",  items: ["Margherita × 1", "Coke × 2"],              total: 18.97, time: "8 min ago",  status: "preparing", address: "12 Civil Lines, Agra" },
  { id: "ORD-1039", customer: "Sneha K.",  items: ["BBQ Chicken × 1"],                         total: 15.99, time: "14 min ago", status: "on_way",    address: "7 Taj Nagri, Agra" },
  { id: "ORD-1038", customer: "Amit T.",   items: ["Pepperoni × 1", "Extra Cheese × 1"],       total: 16.49, time: "22 min ago", status: "delivered", address: "90 Sanjay Place, Agra" },
  { id: "ORD-1037", customer: "Kavya R.",  items: ["Veggie Supreme × 2"],                      total: 27.98, time: "35 min ago", status: "delivered", address: "3 Fatehabad Rd, Agra" },
  { id: "ORD-1036", customer: "Dev P.",    items: ["Margherita × 3"],                          total: 38.97, time: "51 min ago", status: "cancelled", address: "18 Kamla Nagar, Agra" },
];

const INIT_CATALOG = [
  { id: 1, name: "Pepperoni Feast Pizza", category: "Pizza",    price: 14.99, calories: 820, available: true,  rating: 4.9, orders: 2341, emoji: "🍕", desc: "Double pepperoni, 3-cheese blend, wood-fired." },
  { id: 2, name: "Margherita Classic",    category: "Pizza",    price: 11.99, calories: 680, available: true,  rating: 4.7, orders: 1820, emoji: "🍕", desc: "San Marzano tomato, fresh mozzarella, basil." },
  { id: 3, name: "BBQ Chicken Pizza",     category: "Pizza",    price: 13.99, calories: 790, available: true,  rating: 4.6, orders: 1102, emoji: "🍕", desc: "Smoky BBQ base, grilled chicken, red onion." },
  { id: 4, name: "Veggie Supreme",        category: "Pizza",    price: 12.99, calories: 620, available: false, rating: 4.5, orders: 874,  emoji: "🥗", desc: "Seasonal vegetables, pesto drizzle." },
  { id: 5, name: "Garlic Dip (100ml)",    category: "Sides",    price: 0.99,  calories: 120, available: true,  rating: 4.8, orders: 3200, emoji: "🧄", desc: "House-made creamy garlic sauce." },
  { id: 6, name: "Tiramisu",              category: "Desserts", price: 6.99,  calories: 410, available: true,  rating: 4.9, orders: 560,  emoji: "🍰", desc: "Classic Italian, dusted cocoa, mascarpone." },
];

const INIT_REELS = [
  { id: 1, title: "Pepperoni in 30 seconds",  dish: "Pepperoni Feast Pizza", views: 18400, likes: 4821, orders: 312, status: "live",  emoji: "🍕", postedAt: "2 days ago" },
  { id: 2, title: "The cheese pull moment 🧀", dish: "Margherita Classic",    views: 9200,  likes: 2103, orders: 187, status: "live",  emoji: "🍕", postedAt: "5 days ago" },
  { id: 3, title: "BBQ drizzle ASMR",          dish: "BBQ Chicken Pizza",     views: 4300,  likes: 870,  orders: 74,  status: "draft", emoji: "🍕", postedAt: "Draft" },
];

const STATUS_META = {
  new:       { label: "New",        color: "bg-blue-100 text-blue-700",         dot: "bg-blue-500",   next: "preparing",  nextLabel: "Accept order" },
  preparing: { label: "Preparing",  color: "bg-yellow-100 text-yellow-700",     dot: "bg-yellow-500", next: "on_way",     nextLabel: "Ready for pickup" },
  on_way:    { label: "On the way", color: "bg-[#fff3ea] text-[#f6760a]",       dot: "bg-[#f6760a]",  next: "delivered",  nextLabel: "Mark delivered" },
  delivered: { label: "Delivered",  color: "bg-green-100 text-green-700",       dot: "bg-green-500",  next: null,         nextLabel: null },
  cancelled: { label: "Cancelled",  color: "bg-red-100 text-red-600",           dot: "bg-red-400",    next: null,         nextLabel: null },
};

const CATEGORIES = ["Pizza", "Sides", "Desserts", "Drinks", "Burgers"];
const EMOJIS     = ["🍕","🍔","🍣","🌮","🍜","🧁","🥗","🧄","🍗","🍰","🥤","🍟"];
const NAV = [
  { id: "dashboard", label: "Dashboard", Icon: Ic.Dashboard },
  { id: "orders",    label: "Orders",    Icon: Ic.Orders    },
  { id: "catalog",   label: "Catalog",   Icon: Ic.Catalog   },
  { id: "reels",     label: "Reels",     Icon: Ic.Reels     },
];

// ── helpers ────────────────────────────────────────────────────────────────
const fmt = (n) => n >= 1000 ? `${(n / 1000).toFixed(1)}k` : n;

// ── StatCard ───────────────────────────────────────────────────────────────
function StatCard({ label, value, sub, Icon, accent = "#f6760a" }) {
  return (
    <div className="bg-white rounded-2xl border border-[#e8e0d8] p-5">
      <div className="flex items-start justify-between mb-3">
        <span className="text-[#9a9288] text-xs font-semibold uppercase tracking-wider">{label}</span>
        <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: accent + "18", color: accent }}>
          <Icon />
        </div>
      </div>
      <p className="text-3xl font-black text-[#1a1a1a]">{value}</p>
      {sub && <p className="text-xs text-[#9a9288] mt-1">{sub}</p>}
    </div>
  );
}

// ── OrderCard ──────────────────────────────────────────────────────────────
function OrderCard({ order, onAdvance, onCancel }) {
  const meta = STATUS_META[order.status];
  return (
    <div className={`bg-white rounded-2xl border p-4 transition-all ${order.status === "new" ? "border-[#f6760a] shadow-md shadow-[#f6760a]/10" : "border-[#e8e0d8]"}`}>
      <div className="flex items-start justify-between gap-2 mb-3">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`inline-block w-2 h-2 rounded-full flex-shrink-0 ${meta.dot}`} />
            <span className="font-black text-[#1a1a1a] text-sm">{order.id}</span>
            {order.status === "new" && (
              <span className="text-[10px] font-black bg-[#f6760a] text-white px-2 py-0.5 rounded-full animate-pulse">NEW</span>
            )}
          </div>
          <p className="text-xs text-[#9a9288] mt-0.5">{order.customer} · {order.time}</p>
        </div>
        <span className={`text-xs font-bold px-2.5 py-1 rounded-full whitespace-nowrap ${meta.color}`}>{meta.label}</span>
      </div>

      <div className="space-y-0.5 mb-3">
        {order.items.map((item) => <p key={item} className="text-sm text-[#5a5a5a]">• {item}</p>)}
      </div>

      <div className="flex items-center gap-1.5 text-xs text-[#9a9288] mb-4">
        <Ic.Bike /> <span className="truncate">{order.address}</span>
      </div>

      <div className="flex items-center justify-between gap-2 flex-wrap">
        <span className="font-black text-[#1a1a1a]">${order.total.toFixed(2)}</span>
        <div className="flex gap-2">
          {order.status === "new" && (
            <button onClick={() => onCancel(order.id)}
              className="flex items-center gap-1 text-xs text-red-500 border border-red-200 px-2.5 py-1.5 rounded-lg hover:bg-red-50 transition">
              <Ic.X /> Reject
            </button>
          )}
          {meta.next && (
            <button onClick={() => onAdvance(order.id)}
              className="flex items-center gap-1.5 text-xs font-bold text-white px-3 py-1.5 rounded-lg transition hover:opacity-90 active:scale-95"
              style={{ background: "#f6760a" }}>
              <Ic.Check /> {meta.nextLabel}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ── CatalogRow ─────────────────────────────────────────────────────────────
function CatalogRow({ item, onToggle, onDelete, onEdit }) {
  return (
    <div className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${item.available ? "bg-white border-[#e8e0d8]" : "bg-[#fafafa] border-[#e8e0d8] opacity-60"}`}>
      <div className="w-12 h-12 rounded-xl bg-[#fdf6ee] flex items-center justify-center text-2xl flex-shrink-0">{item.emoji}</div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <p className="font-bold text-[#1a1a1a] text-sm">{item.name}</p>
          <span className="text-xs bg-[#fdf6ee] text-[#9a9288] px-2 py-0.5 rounded-full border border-[#e8e0d8]">{item.category}</span>
        </div>
        <div className="flex items-center gap-3 mt-0.5 text-xs text-[#9a9288] flex-wrap">
          <span className="flex items-center gap-1"><Ic.Star /> {item.rating}</span>
          <span>{item.orders.toLocaleString()} orders</span>
          <span>{item.calories} cal</span>
        </div>
      </div>
      <div className="flex items-center gap-2 flex-shrink-0">
        <span className="font-black text-[#1a1a1a] text-sm hidden sm:block">${item.price.toFixed(2)}</span>
        <button onClick={() => onToggle(item.id)} className="cursor-pointer"><Ic.Toggle on={item.available} /></button>
        <button onClick={() => onEdit(item)}   className="text-[#9a9288] hover:text-[#f6760a] transition p-1.5 rounded-lg hover:bg-[#fff3ea]"><Ic.Edit /></button>
        <button onClick={() => onDelete(item.id)} className="text-[#9a9288] hover:text-red-500 transition p-1.5 rounded-lg hover:bg-red-50"><Ic.Trash /></button>
      </div>
    </div>
  );
}

// ── ItemModal ──────────────────────────────────────────────────────────────
function ItemModal({ item, onSave, onClose }) {
  const [form, setForm] = useState(
    item || { name: "", category: "Pizza", price: "", calories: "", desc: "", emoji: "🍕", available: true }
  );
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const inputCls = "w-full px-4 py-3 rounded-xl border border-[#e8e0d8] text-sm text-[#1a1a1a] outline-none focus:border-[#f6760a] focus:ring-2 focus:ring-[#f6760a]/20 transition bg-white";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 bg-white rounded-3xl shadow-2xl w-full max-w-md p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-black text-[#1a1a1a] text-xl">{item ? "Edit item" : "Add new item"}</h2>
          <button onClick={onClose} className="text-[#9a9288] hover:text-[#1a1a1a] transition"><Ic.X /></button>
        </div>

        {/* Emoji picker */}
        <div className="mb-5">
          <label className="text-xs font-semibold text-[#3a3a3a] uppercase tracking-wider block mb-2">Icon</label>
          <div className="flex gap-2 flex-wrap">
            {EMOJIS.map((e) => (
              <button key={e} onClick={() => setForm((f) => ({ ...f, emoji: e }))}
                className={`w-10 h-10 rounded-xl text-xl flex items-center justify-center transition ${form.emoji === e ? "ring-2 ring-[#f6760a] bg-[#fff3ea]" : "bg-[#fdf6ee] hover:bg-[#fff3ea]"}`}>
                {e}
              </button>
            ))}
          </div>
        </div>

        {[
          { label: "Item name",  key: "name",     type: "text",   ph: "e.g. Spicy Arrabbiata" },
          { label: "Price ($)",  key: "price",    type: "number", ph: "0.00" },
          { label: "Calories",   key: "calories", type: "number", ph: "0" },
        ].map(({ label, key, type, ph }) => (
          <div key={key} className="mb-4">
            <label className="text-xs font-semibold text-[#3a3a3a] uppercase tracking-wider block mb-1.5">{label}</label>
            <input type={type} placeholder={ph} value={form[key]} onChange={set(key)} className={inputCls} />
          </div>
        ))}

        <div className="mb-4">
          <label className="text-xs font-semibold text-[#3a3a3a] uppercase tracking-wider block mb-1.5">Category</label>
          <select value={form.category} onChange={set("category")} className={inputCls}>
            {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>

        <div className="mb-6">
          <label className="text-xs font-semibold text-[#3a3a3a] uppercase tracking-wider block mb-1.5">Description</label>
          <textarea rows={3} placeholder="What makes this dish special?" value={form.desc} onChange={set("desc")}
            className={`${inputCls} resize-none`} />
        </div>

        <div className="flex gap-3">
          <button onClick={onClose} className="flex-1 py-3 rounded-xl border border-[#e8e0d8] text-sm font-semibold text-[#5a5a5a] hover:bg-[#fdf6ee] transition">Cancel</button>
          <button onClick={() => onSave(form)} className="flex-1 py-3 rounded-xl bg-[#f6760a] hover:bg-[#e06500] text-white font-black text-sm transition active:scale-95">
            {item ? "Save changes" : "Add item"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── ReelModal ──────────────────────────────────────────────────────────────
function ReelModal({ onSave, onClose, catalogItems }) {
  const [form, setForm] = useState({ title: "", dish: catalogItems[0]?.name || "", file: null, preview: null });
  const fileRef = useRef();

  const handleFile = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    setForm((v) => ({ ...v, file: f, preview: URL.createObjectURL(f) }));
  };

  const inputCls = "w-full px-4 py-3 rounded-xl border border-[#e8e0d8] text-sm text-[#1a1a1a] outline-none focus:border-[#f6760a] focus:ring-2 focus:ring-[#f6760a]/20 transition bg-white";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 bg-white rounded-3xl shadow-2xl w-full max-w-md p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-black text-[#1a1a1a] text-xl">Upload food reel</h2>
          <button onClick={onClose} className="text-[#9a9288] hover:text-[#1a1a1a] transition"><Ic.X /></button>
        </div>

        {/* Drop zone */}
        <div onClick={() => fileRef.current.click()}
          className={`border-2 border-dashed rounded-2xl flex flex-col items-center justify-center py-10 cursor-pointer transition mb-5 ${
            form.preview ? "border-[#f6760a] bg-[#fff3ea]" : "border-[#e8e0d8] hover:border-[#f6760a] hover:bg-[#fdf6ee]"
          }`}>
          {form.preview ? (
            <>
              <video src={form.preview} className="w-28 h-40 object-cover rounded-xl mb-3" muted />
              <p className="text-sm font-semibold text-[#f6760a]">{form.file.name}</p>
              <p className="text-xs text-[#9a9288] mt-1">Click to replace</p>
            </>
          ) : (
            <>
              <span className="text-[#c0c0c0] mb-3"><Ic.Upload /></span>
              <p className="font-bold text-[#3a3a3a] text-sm">Drop your video here</p>
              <p className="text-xs text-[#9a9288] mt-1">MP4, MOV · max 100 MB · vertical 9:16</p>
            </>
          )}
          <input ref={fileRef} type="file" accept="video/*" className="hidden" onChange={handleFile} />
        </div>

        <div className="mb-4">
          <label className="text-xs font-semibold text-[#3a3a3a] uppercase tracking-wider block mb-1.5">Reel title</label>
          <input value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
            placeholder="e.g. The cheese pull moment 🧀" className={inputCls} />
        </div>

        <div className="mb-6">
          <label className="text-xs font-semibold text-[#3a3a3a] uppercase tracking-wider block mb-1.5">Linked dish</label>
          <select value={form.dish} onChange={(e) => setForm((f) => ({ ...f, dish: e.target.value }))} className={inputCls}>
            {catalogItems.map((c) => <option key={c.id}>{c.name}</option>)}
          </select>
          <p className="text-xs text-[#9a9288] mt-1.5">Viewers can order this dish directly from the reel.</p>
        </div>

        <div className="flex gap-3">
          <button onClick={() => onSave({ ...form, status: "draft" })}
            className="flex-1 py-3 rounded-xl border border-[#e8e0d8] text-sm font-semibold text-[#5a5a5a] hover:bg-[#fdf6ee] transition">
            Save as draft
          </button>
          <button onClick={() => onSave({ ...form, status: "live" })}
            className="flex-1 py-3 rounded-xl bg-[#f6760a] hover:bg-[#e06500] text-white font-black text-sm transition active:scale-95">
            Publish now
          </button>
        </div>
      </div>
    </div>
  );
}

// ── DashboardTab ───────────────────────────────────────────────────────────
function DashboardTab({ orders, catalog, reels }) {
  const revenue     = orders.filter(o => o.status === "delivered").reduce((s, o) => s + o.total, 0);
  const active      = orders.filter(o => ["new","preparing","on_way"].includes(o.status)).length;
  const totalViews  = reels.reduce((s, r) => s + r.views, 0);
  const reelOrders  = reels.reduce((s, r) => s + r.orders, 0);
  const topItem     = [...catalog].sort((a, b) => b.orders - a.orders)[0];

  return (
    <div className="space-y-6">
      {/* KPI cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Today's revenue"    value={`$${revenue.toFixed(0)}`}   sub="Delivered orders"     Icon={Ic.TrendUp}   accent="#f6760a" />
        <StatCard label="Active orders"      value={active}                     sub="Needs attention"      Icon={Ic.Orders}    accent="#3b82f6" />
        <StatCard label="Reel views"         value={fmt(totalViews)}            sub="Across all reels"     Icon={Ic.Eye}       accent="#8b5cf6" />
        <StatCard label="Reel-driven orders" value={reelOrders}                 sub="Direct from reels"    Icon={Ic.Reels}     accent="#22c55e" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent orders */}
        <div className="bg-white rounded-2xl border border-[#e8e0d8] p-5">
          <h3 className="font-black text-[#1a1a1a] mb-4 flex items-center gap-2"><Ic.Orders /> Recent orders</h3>
          <div className="space-y-1">
            {orders.slice(0, 5).map((o) => {
              const m = STATUS_META[o.status];
              return (
                <div key={o.id} className="flex items-center justify-between py-2.5 border-b border-[#fdf6ee] last:border-0 gap-2">
                  <div className="min-w-0">
                    <span className="font-bold text-sm text-[#1a1a1a]">{o.id}</span>
                    <span className="text-[#9a9288] text-xs ml-2 hidden sm:inline">{o.customer}</span>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="font-black text-sm">${o.total.toFixed(2)}</span>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${m.color}`}>{m.label}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Top dishes */}
        <div className="bg-white rounded-2xl border border-[#e8e0d8] p-5">
          <h3 className="font-black text-[#1a1a1a] mb-4 flex items-center gap-2"><Ic.TrendUp /> Top dishes</h3>
          <div className="space-y-4">
            {[...catalog].sort((a, b) => b.orders - a.orders).slice(0, 4).map((item, i) => (
              <div key={item.id} className="flex items-center gap-3">
                <span className="text-xs font-black text-[#9a9288] w-5 flex-shrink-0">#{i + 1}</span>
                <span className="text-lg flex-shrink-0">{item.emoji}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-[#1a1a1a] truncate">{item.name}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="h-1.5 flex-1 rounded-full bg-[#fdf6ee] overflow-hidden">
                      <div className="h-full rounded-full bg-[#f6760a]"
                        style={{ width: `${(item.orders / (topItem?.orders || 1)) * 100}%` }} />
                    </div>
                    <span className="text-xs text-[#9a9288] flex-shrink-0">{item.orders.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Reel performance strip */}
      <div className="bg-white rounded-2xl border border-[#e8e0d8] p-5">
        <h3 className="font-black text-[#1a1a1a] mb-4 flex items-center gap-2"><Ic.Reels /> Reel performance</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {reels.filter(r => r.status === "live").map((reel) => (
            <div key={reel.id} className="flex items-center gap-3 bg-[#fdf6ee] rounded-xl p-3">
              <div className="w-10 h-10 rounded-lg bg-[#1a0a00] flex items-center justify-center text-xl flex-shrink-0">{reel.emoji}</div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-[#1a1a1a] truncate">{reel.title}</p>
                <div className="flex gap-3 mt-0.5 text-xs text-[#9a9288]">
                  <span>👁 {fmt(reel.views)}</span>
                  <span>🛒 {reel.orders}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── OrdersTab ──────────────────────────────────────────────────────────────
function OrdersTab({ orders, setOrders }) {
  const [filter, setFilter] = useState("all");
  const FILTERS = ["all", "new", "preparing", "on_way", "delivered", "cancelled"];

  const advance = (id) => setOrders((prev) =>
    prev.map((o) => o.id === id && STATUS_META[o.status].next ? { ...o, status: STATUS_META[o.status].next } : o)
  );
  const cancel = (id) => setOrders((prev) => prev.map((o) => o.id === id ? { ...o, status: "cancelled" } : o));

  const newCount  = orders.filter(o => o.status === "new").length;
  const filtered  = filter === "all" ? orders : orders.filter(o => o.status === filter);

  return (
    <div>
      {/* Filter chips */}
      <div className="flex gap-2 mb-5 overflow-x-auto pb-1 scrollbar-hide">
        {FILTERS.map((f) => (
          <button key={f} onClick={() => setFilter(f)}
            className={`flex-shrink-0 text-xs font-bold px-4 py-2 rounded-full transition capitalize ${
              filter === f ? "bg-[#f6760a] text-white shadow-sm" : "bg-white border border-[#e8e0d8] text-[#5a5a5a] hover:border-[#f6760a]"
            }`}>
            {f === "on_way" ? "On the way" : f === "all" ? `All (${orders.length})` : f}
            {f === "new" && newCount > 0 && (
              <span className={`ml-1.5 rounded-full px-1.5 text-[10px] font-black ${filter === f ? "bg-white text-[#f6760a]" : "bg-[#f6760a] text-white"}`}>
                {newCount}
              </span>
            )}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-20 text-[#9a9288]">
          <span className="text-4xl block mb-3">📋</span>
          <p className="font-semibold">No orders here</p>
          <p className="text-sm mt-1">Switch filter to see other orders</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((o) => <OrderCard key={o.id} order={o} onAdvance={advance} onCancel={cancel} />)}
        </div>
      )}
    </div>
  );
}

// ── CatalogTab ─────────────────────────────────────────────────────────────
function CatalogTab({ catalog, setCatalog }) {
  const [showModal, setShowModal] = useState(false);
  const [editItem,  setEditItem]  = useState(null);
  const [catFilter, setCatFilter] = useState("All");
  const allCats = ["All", ...CATEGORIES];

  const toggle = (id) => setCatalog((p) => p.map((c) => c.id === id ? { ...c, available: !c.available } : c));
  const del    = (id) => setCatalog((p) => p.filter((c) => c.id !== id));
  const save   = (form) => {
    if (editItem) {
      setCatalog((p) => p.map((c) => c.id === editItem.id
        ? { ...c, ...form, price: parseFloat(form.price) || c.price, calories: parseInt(form.calories) || c.calories }
        : c));
    } else {
      setCatalog((p) => [...p, {
        ...form, id: Date.now(),
        price: parseFloat(form.price) || 0,
        calories: parseInt(form.calories) || 0,
        rating: 0, orders: 0, available: true,
      }]);
    }
    setShowModal(false); setEditItem(null);
  };

  const filtered = catFilter === "All" ? catalog : catalog.filter((c) => c.category === catFilter);
  const unavailCount = catalog.filter(c => !c.available).length;

  return (
    <div>
      <div className="flex items-center justify-between mb-5 gap-3 flex-wrap">
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide flex-1">
          {allCats.map((c) => (
            <button key={c} onClick={() => setCatFilter(c)}
              className={`flex-shrink-0 text-xs font-bold px-4 py-2 rounded-full transition ${
                catFilter === c ? "bg-[#f6760a] text-white" : "bg-white border border-[#e8e0d8] text-[#5a5a5a] hover:border-[#f6760a]"
              }`}>
              {c}
            </button>
          ))}
        </div>
        <button onClick={() => { setEditItem(null); setShowModal(true); }}
          className="flex items-center gap-2 bg-[#f6760a] hover:bg-[#e06500] text-white font-bold text-sm px-4 py-2.5 rounded-xl transition active:scale-95 flex-shrink-0">
          <Ic.Plus /> Add item
        </button>
      </div>

      {unavailCount > 0 && (
        <div className="flex items-center gap-2 bg-yellow-50 border border-yellow-200 rounded-xl px-4 py-2.5 mb-4 text-sm text-yellow-700">
          <span>⚠️</span> {unavailCount} item{unavailCount > 1 ? "s" : ""} currently unavailable
        </div>
      )}

      <div className="space-y-2">
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-[#9a9288]">
            <span className="text-4xl block mb-3">🍽️</span>
            <p className="font-semibold">No items in this category</p>
          </div>
        ) : filtered.map((item) => (
          <CatalogRow key={item.id} item={item} onToggle={toggle} onDelete={del}
            onEdit={(i) => { setEditItem(i); setShowModal(true); }} />
        ))}
      </div>

      {showModal && (
        <ItemModal item={editItem} onSave={save} onClose={() => { setShowModal(false); setEditItem(null); }} />
      )}
    </div>
  );
}

// ── ReelsTab ───────────────────────────────────────────────────────────────
function ReelsTab({ reels, setReels, catalog }) {
  const [showModal, setShowModal] = useState(false);

  const save = (form) => {
    setReels((p) => [{
      id: Date.now(),
      title: form.title || "Untitled reel",
      dish: form.dish,
      views: 0, likes: 0, orders: 0,
      status: form.status,
      emoji: catalog.find((c) => c.name === form.dish)?.emoji || "🍕",
      postedAt: form.status === "live" ? "Just now" : "Draft",
    }, ...p]);
    setShowModal(false);
  };

  const toggleStatus = (id) => setReels((p) =>
    p.map((r) => r.id === id ? {
      ...r,
      status: r.status === "live" ? "draft" : "live",
      postedAt: r.status === "draft" ? "Just now" : r.postedAt,
    } : r)
  );
  const del = (id) => setReels((p) => p.filter((r) => r.id !== id));

  const liveCount  = reels.filter(r => r.status === "live").length;
  const draftCount = reels.filter(r => r.status === "draft").length;

  return (
    <div>
      <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
        <div className="flex gap-3 text-sm text-[#9a9288]">
          <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-green-500 inline-block" />{liveCount} live</span>
          <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#d1ccc7] inline-block" />{draftCount} draft{draftCount !== 1 ? "s" : ""}</span>
        </div>
        <button onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-[#f6760a] hover:bg-[#e06500] text-white font-bold text-sm px-4 py-2.5 rounded-xl transition active:scale-95 flex-shrink-0">
          <Ic.Plus /> Upload reel
        </button>
      </div>

      {reels.length === 0 ? (
        <div className="text-center py-20 text-[#9a9288]">
          <span className="text-5xl block mb-3">🎬</span>
          <p className="font-semibold text-[#1a1a1a]">No reels yet</p>
          <p className="text-sm mt-1">Upload your first food reel to attract more customers</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {reels.map((reel) => (
            <div key={reel.id} className="bg-white rounded-2xl border border-[#e8e0d8] overflow-hidden hover:shadow-md transition group">
              {/* Thumbnail */}
              <div className="h-48 bg-gradient-to-b from-[#1a0a00] to-[#3d1a00] relative flex items-center justify-center">
                <span className="text-7xl opacity-20 group-hover:opacity-30 transition">{reel.emoji}</span>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition cursor-pointer">
                    <Ic.Play />
                  </div>
                </div>
                {/* Status badge */}
                <div className="absolute top-3 left-3">
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${reel.status === "live" ? "bg-green-500 text-white" : "bg-black/40 text-white/80 backdrop-blur-sm"}`}>
                    {reel.status === "live" ? "● Live" : "○ Draft"}
                  </span>
                </div>
                <div className="absolute bottom-3 right-3 text-white/50 text-xs">{reel.postedAt}</div>
              </div>

              <div className="p-4">
                <p className="font-black text-[#1a1a1a] text-sm truncate mb-0.5">{reel.title}</p>
                <p className="text-xs text-[#9a9288] mb-3 truncate">🔗 {reel.dish}</p>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-2 mb-4 text-center">
                  {[
                    { label: "Views",  value: fmt(reel.views)  },
                    { label: "Likes",  value: fmt(reel.likes)  },
                    { label: "Orders", value: reel.orders      },
                  ].map(({ label, value }) => (
                    <div key={label} className="bg-[#fdf6ee] rounded-xl py-2">
                      <p className="font-black text-[#1a1a1a] text-sm">{value}</p>
                      <p className="text-[10px] text-[#9a9288]">{label}</p>
                    </div>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <button onClick={() => toggleStatus(reel.id)}
                    className={`flex-1 text-xs font-bold py-2 rounded-xl border transition ${
                      reel.status === "live"
                        ? "border-[#e8e0d8] text-[#5a5a5a] hover:bg-[#fdf6ee]"
                        : "border-[#f6760a] text-[#f6760a] hover:bg-[#fff3ea]"
                    }`}>
                    {reel.status === "live" ? "Unpublish" : "Publish"}
                  </button>
                  <button onClick={() => del(reel.id)}
                    className="text-red-400 hover:text-red-600 border border-red-100 hover:border-red-300 hover:bg-red-50 px-3 py-2 rounded-xl transition">
                    <Ic.Trash />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && <ReelModal onSave={save} onClose={() => setShowModal(false)} catalogItems={catalog} />}
    </div>
  );
}

// ── Main FoodPartner ───────────────────────────────────────────────────────
export default function FoodPartner() {
  const [tab,         setTab]         = useState("dashboard");
  const [orders,      setOrders]      = useState(INIT_ORDERS);
  const [catalog,     setCatalog]     = useState(INIT_CATALOG);
  const [reels,       setReels]       = useState(INIT_REELS);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isOpen,      setIsOpen]      = useState(true);

  const newOrderCount = orders.filter(o => o.status === "new").length;

  const TAB_SUBTITLE = {
    dashboard: "Overview of your restaurant",
    orders:    `${orders.length} total orders today`,
    catalog:   `${catalog.length} items · ${catalog.filter(c => !c.available).length} unavailable`,
    reels:     `${reels.filter(r => r.status === "live").length} live reels`,
  };

  return (
    <div className="min-h-screen bg-[#fdf6ee] flex" style={{ fontFamily: "system-ui,sans-serif" }}>

      {/* ── Sidebar ───────────────────────────────────────────────────── */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/40 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}
      <aside className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-white border-r border-[#e8e0d8] flex flex-col transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>

        {/* Branding */}
        <div className="px-5 py-5 border-b border-[#e8e0d8]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-[#f6760a] rounded-xl flex items-center justify-center flex-shrink-0">
              <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
                <path d="M12 2C7 2 3 6 3 11c0 3.5 2 6.5 5 8.2V21h8v-1.8c3-1.7 5-4.7 5-8.2 0-5-4-9-9-9z" fill="white"/>
                <circle cx="9"  cy="10" r="1.5" fill="#f6760a"/>
                <circle cx="15" cy="10" r="1.5" fill="#f6760a"/>
                <path d="M9 14s1 2 3 2 3-2 3-2" stroke="#f6760a" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
            <div>
              <p className="font-black text-[#1a1a1a] text-sm leading-tight">swiftbite</p>
              <p className="text-[10px] text-[#9a9288] font-medium">Partner dashboard</p>
            </div>
          </div>
        </div>

        {/* Restaurant card */}
        <div className="px-5 py-4 border-b border-[#e8e0d8]">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-11 h-11 rounded-xl bg-[#fff3ea] flex items-center justify-center text-2xl flex-shrink-0">🍕</div>
            <div className="flex-1 min-w-0">
              <p className="font-black text-[#1a1a1a] text-sm truncate">Fuego Pizzeria</p>
              <p className="text-xs text-[#9a9288] flex items-center gap-1">
                <Ic.Star /> 4.9 · Agra, UP
              </p>
            </div>
          </div>
          {/* Open / closed */}
          <div className="flex items-center justify-between bg-[#fdf6ee] rounded-xl px-3 py-2.5">
            <div>
              <p className="text-xs font-black text-[#1a1a1a]">{isOpen ? "Open for orders" : "Closed"}</p>
              <p className="text-[10px] text-[#9a9288]">{isOpen ? "Accepting new orders" : "Not visible to customers"}</p>
            </div>
            <button onClick={() => setIsOpen(v => !v)} className="flex-shrink-0"><Ic.Toggle on={isOpen} /></button>
          </div>
        </div>

        {/* Nav links */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {NAV.map(({ id, label, Icon }) => (
            <button key={id} onClick={() => { setTab(id); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                tab === id
                  ? "bg-[#f6760a] text-white shadow-md shadow-[#f6760a]/20"
                  : "text-[#5a5a5a] hover:bg-[#fdf6ee] hover:text-[#1a1a1a]"
              }`}>
              <Icon />
              {label}
              {id === "orders" && newOrderCount > 0 && (
                <span className={`ml-auto text-[10px] font-black px-2 py-0.5 rounded-full ${tab === id ? "bg-white text-[#f6760a]" : "bg-[#f6760a] text-white"}`}>
                  {newOrderCount}
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-[#e8e0d8]">
          <p className="text-xs text-[#9a9288]">Logged in as</p>
          <p className="text-sm font-bold text-[#1a1a1a] mt-0.5">owner@fuegopizzeria.com</p>
        </div>
      </aside>

      {/* ── Main content ──────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Top bar */}
        <header className="sticky top-0 z-20 bg-white/90 backdrop-blur-md border-b border-[#e8e0d8] px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button className="lg:hidden text-[#5a5a5a] hover:text-[#1a1a1a] transition" onClick={() => setSidebarOpen(true)}>
              <Ic.Menu />
            </button>
            <div>
              <h1 className="font-black text-[#1a1a1a] text-lg capitalize leading-tight">
                {tab === "on_way" ? "On the way" : tab}
              </h1>
              <p className="text-xs text-[#9a9288] hidden sm:block">{TAB_SUBTITLE[tab]}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {!isOpen && (
              <span className="text-xs font-bold bg-red-100 text-red-600 px-3 py-1.5 rounded-full hidden sm:block">
                ⏸ Restaurant closed
              </span>
            )}
            {/* New order alert */}
            {newOrderCount > 0 && (
              <button onClick={() => setTab("orders")}
                className="text-xs font-bold bg-[#fff3ea] text-[#f6760a] border border-[#f6760a]/30 px-3 py-1.5 rounded-full animate-pulse hidden sm:flex items-center gap-1.5">
                🔔 {newOrderCount} new order{newOrderCount > 1 ? "s" : ""}
              </button>
            )}
            <button className="relative w-9 h-9 rounded-full hover:bg-[#fdf6ee] flex items-center justify-center text-[#5a5a5a] transition">
              <Ic.Bell />
              {newOrderCount > 0 && <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#f6760a] rounded-full" />}
            </button>
            <div className="w-9 h-9 rounded-full bg-[#f6760a] flex items-center justify-center text-white font-black text-sm flex-shrink-0">F</div>
          </div>
        </header>

        {/* Page body */}
        <main className="flex-1 px-4 sm:px-6 py-6 overflow-y-auto">
          {tab === "dashboard" && <DashboardTab orders={orders} catalog={catalog} reels={reels} />}
          {tab === "orders"    && <OrdersTab    orders={orders}  setOrders={setOrders} />}
          {tab === "catalog"   && <CatalogTab   catalog={catalog} setCatalog={setCatalog} />}
          {tab === "reels"     && <ReelsTab     reels={reels}    setReels={setReels} catalog={catalog} />}
        </main>
      </div>
    </div>
  );
}