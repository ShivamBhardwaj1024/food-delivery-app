import { useState } from "react";


// ── Design tokens ────────────────────────────────────────────────────────────
// Primary:   #f6760a  (swiftbite orange)
// Surface:   #fdf6ee  (warm cream bg)
// Card:      #ffffff
// Border:    #e8e0d8
// Text-dark: #1a1a1a
// Text-mid:  #5a5a5a
// Text-mute: #9a9288

// ── Shared: Logo ─────────────────────────────────────────────────────────────
const Logo = () => (
  <div className="flex items-center gap-2">
    <div className="w-9 h-9 bg-[#f6760a] rounded-xl flex items-center justify-center">
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
        <path d="M12 2C7 2 3 6 3 11c0 3.5 2 6.5 5 8.2V21h8v-1.8c3-1.7 5-4.7 5-8.2 0-5-4-9-9-9z" fill="white" />
        <circle cx="9" cy="10" r="1.5" fill="#f6760a" />
        <circle cx="15" cy="10" r="1.5" fill="#f6760a" />
        <path d="M9 14s1 2 3 2 3-2 3-2" stroke="#f6760a" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </div>
    <span className="font-bold text-xl tracking-tight text-[#1a1a1a]">swiftbite</span>
  </div>
);

// ── Icons ────────────────────────────────────────────────────────────────────
const IconSearch = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);
const IconStar = ({ filled = true }) => (
  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill={filled ? "#f6760a" : "none"} stroke="#f6760a" strokeWidth="2">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);
const IconClock = () => (
  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
  </svg>
);
const IconBike = () => (
  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <circle cx="5.5" cy="17.5" r="3.5" /><circle cx="18.5" cy="17.5" r="3.5" />
    <path d="M15 6h-3l-2 6h7.5" /><path d="M5.5 17.5L9 10l3 4" />
  </svg>
);
const IconMap = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
  </svg>
);
const IconCart = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
  </svg>
);
const IconChevron = ({ dir = "right" }) => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
    {dir === "right" && <polyline points="9 18 15 12 9 6" />}
    {dir === "left" && <polyline points="15 18 9 12 15 6" />}
    {dir === "down" && <polyline points="6 9 12 15 18 9" />}
  </svg>
);
const IconFlame = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="#f6760a">
    <path d="M12 2c0 0-5 5-5 11a5 5 0 0010 0c0-4-2-7-2-7s-1 3-3 3c0-3 0-7 0-7z" />
  </svg>
);
const IconHeart = ({ filled = false }) => (
  <svg className="w-4 h-4" fill={filled ? "#f6760a" : "none"} stroke={filled ? "#f6760a" : "#c0c0c0"} strokeWidth="2" viewBox="0 0 24 24">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

// ── Data ─────────────────────────────────────────────────────────────────────
const CATEGORIES = [
  { id: 1, emoji: "🍕", label: "Pizza" },
  { id: 2, emoji: "🍔", label: "Burgers" },
  { id: 3, emoji: "🍣", label: "Sushi" },
  { id: 4, emoji: "🌮", label: "Tacos" },
  { id: 5, emoji: "🍜", label: "Noodles" },
  { id: 6, emoji: "🥗", label: "Salads" },
  { id: 7, emoji: "🍗", label: "Chicken" },
  { id: 8, emoji: "🧁", label: "Desserts" },
];

const RESTAURANTS = [
  {
    id: 1, name: "Fuego Pizzeria", tag: "Pizza · Italian", rating: 4.9,
    reviews: 2341, time: "18–25", delivery: "Free", badge: "Top rated",
    bg: "#fff3ea", accent: "#f6760a",
    items: ["Margherita", "Pepperoni Feast", "BBQ Chicken"],
    emoji: "🍕",
  },
  {
    id: 2, name: "Umami Burger Co.", tag: "Burgers · American", rating: 4.7,
    reviews: 1820, time: "20–30", delivery: "$1.99", badge: "Fan fave",
    bg: "#fef9e7", accent: "#f59e0b",
    items: ["Classic Smash", "Truffle Melt", "Crispy Chicken"],
    emoji: "🍔",
  },
  {
    id: 3, name: "Sakura Sushi Bar", tag: "Sushi · Japanese", rating: 4.8,
    reviews: 987, time: "25–35", delivery: "$2.49", badge: "New",
    bg: "#fdf2f8", accent: "#ec4899",
    items: ["Dragon Roll", "Salmon Sashimi", "Miso Soup"],
    emoji: "🍣",
  },
  {
    id: 4, name: "Verde Tacos", tag: "Mexican · Street food", rating: 4.6,
    reviews: 1543, time: "15–22", delivery: "Free", badge: "30 min",
    bg: "#f0fdf4", accent: "#22c55e",
    items: ["Al Pastor", "Birria", "Elote"],
    emoji: "🌮",
  },
  {
    id: 5, name: "Ramen Republic", tag: "Noodles · Japanese", rating: 4.8,
    reviews: 2103, time: "22–32", delivery: "$1.49", badge: "Trending",
    bg: "#fef3c7", accent: "#d97706",
    items: ["Tonkotsu", "Spicy Miso", "Shoyu"],
    emoji: "🍜",
  },
  {
    id: 6, name: "Cloud Nine Desserts", tag: "Desserts · Bakery", rating: 4.9,
    reviews: 763, time: "20–28", delivery: "Free", badge: "Sweet pick",
    bg: "#f5f3ff", accent: "#8b5cf6",
    items: ["Lava Cake", "Crème Brûlée", "Churros"],
    emoji: "🧁",
  },
];

const TRENDING = [
  { id: 1, name: "Pepperoni Feast Pizza", from: "Fuego Pizzeria", price: "$14.99", emoji: "🍕", orders: "2.1k orders today" },
  { id: 2, name: "Classic Smash Burger", from: "Umami Burger Co.", price: "$12.49", emoji: "🍔", orders: "1.8k orders today" },
  { id: 3, name: "Dragon Roll (8 pcs)", from: "Sakura Sushi Bar", price: "$16.99", emoji: "🍣", orders: "940 orders today" },
  { id: 4, name: "Tonkotsu Ramen", from: "Ramen Republic", price: "$13.99", emoji: "🍜", orders: "1.2k orders today" },
];

const PROMOS = [
  { id: 1, title: "Free delivery", sub: "On orders over $20", code: "FREESHIP", bg: "from-[#f6760a] to-[#f59e0b]" },
  { id: 2, title: "20% off sushi", sub: "Every Tuesday", code: "TUESDAYSUSHI", bg: "from-[#ec4899] to-[#f43f5e]" },
  { id: 3, title: "Lunch deals", sub: "Mon–Fri, 11am–2pm", code: "LUNCH20", bg: "from-[#22c55e] to-[#16a34a]" },
];

// ── RestaurantCard ────────────────────────────────────────────────────────────
function RestaurantCard({ r }) {
  const [liked, setLiked] = useState(false);
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-[#e8e0d8] hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 cursor-pointer group">
      {/* Visual header */}
      <div className="h-36 relative flex items-center justify-center" style={{ background: r.bg }}>
        <span className="text-6xl select-none group-hover:scale-110 transition-transform duration-300">
          {r.emoji}
        </span>
        {/* Badge */}
        <span
          className="absolute top-3 left-3 text-xs font-bold px-2.5 py-1 rounded-full text-white"
          style={{ background: r.accent }}
        >
          {r.badge}
        </span>
        {/* Like */}
        <button
          onClick={(e) => { e.stopPropagation(); setLiked((v) => !v); }}
          className="absolute top-3 right-3 w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-sm hover:scale-110 transition"
        >
          <IconHeart filled={liked} />
        </button>
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="font-black text-[#1a1a1a] text-base leading-tight">{r.name}</h3>
        <p className="text-xs text-[#9a9288] mt-0.5 mb-3">{r.tag}</p>

        <div className="flex items-center gap-3 text-xs text-[#5a5a5a]">
          <span className="flex items-center gap-1">
            <IconStar /> <span className="font-bold text-[#1a1a1a]">{r.rating}</span>
            <span className="text-[#9a9288]">({(r.reviews / 1000).toFixed(1)}k)</span>
          </span>
          <span className="flex items-center gap-1 text-[#9a9288]">
            <IconClock /> {r.time} min
          </span>
          <span className="flex items-center gap-1 text-[#9a9288]">
            <IconBike />
            <span className={r.delivery === "Free" ? "text-green-600 font-semibold" : ""}>
              {r.delivery}
            </span>
          </span>
        </div>

        {/* Quick items */}
        <div className="flex gap-1.5 mt-3 flex-wrap">
          {r.items.map((item) => (
            <span key={item} className="text-xs bg-[#fdf6ee] text-[#5a5a5a] px-2 py-0.5 rounded-full border border-[#e8e0d8]">
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── TrendingCard ──────────────────────────────────────────────────────────────
function TrendingCard({ item }) {
  const [added, setAdded] = useState(false);
  return (
    <div className="flex items-center gap-4 bg-white rounded-2xl p-4 border border-[#e8e0d8] hover:shadow-md transition-all duration-200 cursor-pointer">
      <div className="w-14 h-14 rounded-xl bg-[#fdf6ee] flex items-center justify-center text-3xl flex-shrink-0">
        {item.emoji}
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-bold text-[#1a1a1a] text-sm truncate">{item.name}</p>
        <p className="text-xs text-[#9a9288] truncate">{item.from}</p>
        <p className="text-xs text-[#f6760a] font-semibold mt-0.5 flex items-center gap-1">
          <IconFlame /> {item.orders}
        </p>
      </div>
      <div className="flex flex-col items-end gap-2 flex-shrink-0">
        <span className="font-black text-[#1a1a1a] text-sm">{item.price}</span>
        <button
          onClick={() => setAdded((v) => !v)}
          className={`w-7 h-7 rounded-full flex items-center justify-center transition-all text-sm font-bold ${
            added
              ? "bg-green-500 text-white"
              : "bg-[#f6760a] text-white hover:bg-[#e06500]"
          }`}
        >
          {added ? "✓" : "+"}
        </button>
      </div>
    </div>
  );
}

// ── Main HomePage ─────────────────────────────────────────────────────────────
export default function Home() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState(null);
  const [cartCount, setCartCount] = useState(2);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const filtered = RESTAURANTS.filter((r) => {
    const matchSearch =
      !search ||
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.tag.toLowerCase().includes(search.toLowerCase());
    const matchCat =
      !activeCategory ||
      r.tag.toLowerCase().includes(activeCategory.toLowerCase());
    return matchSearch && matchCat;
  });

  return (
    <div className="min-h-screen bg-[#fdf6ee] font-sans">

      {/* ── Navbar ────────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-[#e8e0d8]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          <Logo />

          {/* Location pill */}
          <button className="hidden sm:flex items-center gap-1.5 text-sm text-[#5a5a5a] bg-[#fdf6ee] border border-[#e8e0d8] rounded-full px-3 py-1.5 hover:border-[#f6760a] transition">
            <IconMap />
            <span className="font-medium">123 Elm Street</span>
            <IconChevron dir="down" />
          </button>

          {/* Desktop search */}
          <div className="hidden md:flex flex-1 max-w-sm relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#c0c0c0]">
              <IconSearch className="w-4 h-4" />
            </span>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search restaurants or dishes…"
              className="w-full pl-9 pr-4 py-2.5 rounded-full border border-[#e8e0d8] bg-[#fdf6ee] text-sm text-[#1a1a1a] placeholder-[#c0c0c0] outline-none focus:border-[#f6760a] focus:ring-2 focus:ring-[#f6760a]/20 transition"
            />
          </div>

          <div className="flex items-center gap-2">
            {/* Cart */}
            <button className="relative w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#fdf6ee] transition text-[#5a5a5a]">
              <IconCart />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#f6760a] text-white text-[10px] font-black rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Avatar */}
            <div className="w-9 h-9 rounded-full bg-[#f6760a] flex items-center justify-center text-white font-black text-sm">
              J
            </div>

            {/* Mobile menu toggle */}
            <button
              className="sm:hidden w-9 h-9 flex items-center justify-center rounded-full hover:bg-[#fdf6ee] transition text-[#5a5a5a]"
              onClick={() => setMobileMenuOpen((v) => !v)}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                {mobileMenuOpen
                  ? <><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></>
                  : <><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></>
                }
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile search */}
        <div className="md:hidden px-4 pb-3">
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#c0c0c0]">
              <IconSearch className="w-4 h-4" />
            </span>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search restaurants or dishes…"
              className="w-full pl-9 pr-4 py-2.5 rounded-full border border-[#e8e0d8] bg-[#fdf6ee] text-sm text-[#1a1a1a] placeholder-[#c0c0c0] outline-none focus:border-[#f6760a] focus:ring-2 focus:ring-[#f6760a]/20 transition"
            />
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 pb-20">

        {/* ── Hero ──────────────────────────────────────────────────────── */}
        <section className="relative mt-6 rounded-3xl overflow-hidden bg-[#f6760a] px-8 py-10 sm:py-14 flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Decorative blobs */}
          <div className="absolute -top-10 -right-10 w-56 h-56 bg-white/10 rounded-full pointer-events-none" />
          <div className="absolute bottom-0 left-1/3 w-32 h-32 bg-white/5 rounded-full pointer-events-none" />

          <div className="relative z-10 text-center sm:text-left">
            <p className="text-white/75 text-xs font-semibold uppercase tracking-widest mb-3">
              🔥 Limited time
            </p>
            <h1 className="text-white text-3xl sm:text-4xl font-black leading-tight max-w-xs sm:max-w-sm">
              Free delivery on your first 3 orders
            </h1>
            <p className="text-white/70 mt-3 text-sm max-w-xs">
              Over 2,400 restaurants. Real-time tracking. Hot food, fast.
            </p>
            <button
              onClick={() => setCartCount((c) => c + 1)}
              className="mt-6 px-7 py-3 bg-white text-[#f6760a] font-black text-sm rounded-full hover:bg-[#fdf6ee] active:scale-95 transition-all"
            >
              Order now →
            </button>
          </div>

          {/* Hero emoji cluster */}
          <div className="relative z-10 hidden sm:flex gap-3 text-5xl select-none">
            {["🍕", "🍔", "🍣", "🌮"].map((e, i) => (
              <span
                key={i}
                className="w-16 h-16 bg-white/15 rounded-2xl flex items-center justify-center hover:scale-110 transition-transform duration-200"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                {e}
              </span>
            ))}
          </div>
        </section>

        {/* ── Promo strips ──────────────────────────────────────────────── */}
        <section className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
          {PROMOS.map((p) => (
            <div
              key={p.id}
              className={`bg-gradient-to-r ${p.bg} rounded-2xl px-5 py-4 flex items-center justify-between cursor-pointer hover:opacity-90 transition`}
            >
              <div>
                <p className="text-white font-black text-sm">{p.title}</p>
                <p className="text-white/75 text-xs mt-0.5">{p.sub}</p>
              </div>
              <span className="bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full border border-white/30">
                {p.code}
              </span>
            </div>
          ))}
        </section>

        {/* ── Categories ────────────────────────────────────────────────── */}
        <section className="mt-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-black text-[#1a1a1a]">What are you craving?</h2>
            <button
              className="text-xs text-[#f6760a] font-semibold hover:underline flex items-center gap-1"
              onClick={() => setActiveCategory(null)}
            >
              Clear <IconChevron dir="right" />
            </button>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(activeCategory === cat.label ? null : cat.label)}
                className={`flex-shrink-0 flex flex-col items-center gap-1.5 px-4 py-3 rounded-2xl border transition-all duration-150 ${
                  activeCategory === cat.label
                    ? "bg-[#f6760a] border-[#f6760a] text-white shadow-md scale-105"
                    : "bg-white border-[#e8e0d8] text-[#5a5a5a] hover:border-[#f6760a] hover:text-[#f6760a]"
                }`}
              >
                <span className="text-2xl leading-none">{cat.emoji}</span>
                <span className="text-xs font-semibold">{cat.label}</span>
              </button>
            ))}
          </div>
        </section>

        {/* ── Two-column layout: restaurants + sidebar ─────────────────── */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Restaurants grid */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-black text-[#1a1a1a]">
                {activeCategory ? `${activeCategory} near you` : "Restaurants near you"}
                <span className="ml-2 text-sm font-normal text-[#9a9288]">
                  ({filtered.length})
                </span>
              </h2>
              <button className="text-xs text-[#f6760a] font-semibold hover:underline flex items-center gap-1">
                See all <IconChevron dir="right" />
              </button>
            </div>

            {filtered.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {filtered.map((r) => <RestaurantCard key={r.id} r={r} />)}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <span className="text-5xl mb-4">🔍</span>
                <p className="font-black text-[#1a1a1a] text-lg">No results</p>
                <p className="text-[#9a9288] text-sm mt-1">Try a different search or category</p>
                <button
                  onClick={() => { setSearch(""); setActiveCategory(null); }}
                  className="mt-4 px-5 py-2 rounded-full bg-[#f6760a] text-white text-sm font-bold hover:bg-[#e06500] transition"
                >
                  Reset filters
                </button>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Trending dishes */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-black text-[#1a1a1a] flex items-center gap-2">
                  <IconFlame /> Trending today
                </h2>
              </div>
              <div className="space-y-3">
                {TRENDING.map((item) => (
                  <TrendingCard key={item.id} item={item} />
                ))}
              </div>
            </div>

            {/* Delivery tracker teaser */}
            <div className="bg-white rounded-2xl border border-[#e8e0d8] p-5">
              <h3 className="font-black text-[#1a1a1a] text-sm mb-3">Your active order</h3>
              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl">🍔</span>
                <div className="flex-1 mx-3">
                  <p className="text-xs font-bold text-[#1a1a1a]">Umami Burger Co.</p>
                  <p className="text-xs text-[#9a9288]">Classic Smash × 1</p>
                </div>
                <span className="text-xs font-black text-[#f6760a] bg-[#fff3ea] px-2 py-1 rounded-full">
                  On the way
                </span>
              </div>
              {/* Progress bar */}
              <div className="flex items-center gap-1 mb-2">
                {["Placed", "Prepping", "On the way", "Delivered"].map((step, i) => (
                  <div key={step} className="flex-1 flex flex-col items-center gap-1">
                    <div className={`w-full h-1.5 rounded-full ${i <= 2 ? "bg-[#f6760a]" : "bg-[#e8e0d8]"}`} />
                    <span className={`text-[9px] font-semibold ${i <= 2 ? "text-[#f6760a]" : "text-[#c0c0c0]"}`}>
                      {step}
                    </span>
                  </div>
                ))}
              </div>
              <p className="text-center text-xs text-[#5a5a5a] mt-2">
                Arriving in <span className="font-black text-[#f6760a]">12 min</span>
              </p>
            </div>
          </div>
        </div>

        {/* ── How it works ─────────────────────────────────────────────── */}
        <section className="mt-14 bg-white rounded-3xl border border-[#e8e0d8] px-8 py-10">
          <h2 className="text-2xl font-black text-[#1a1a1a] mb-8 text-center">
            Delivered in 3 steps
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            {[
              { emoji: "📍", title: "Set your location", desc: "Enter your address and see every restaurant that can reach you fast." },
              { emoji: "🛒", title: "Pick your meal", desc: "Browse menus, read reviews, and add your favourites to the cart." },
              { emoji: "🚀", title: "Sit back & relax", desc: "Track your rider in real time and get notified the second it arrives." },
            ].map((step, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-2xl bg-[#fdf6ee] border border-[#e8e0d8] flex items-center justify-center text-3xl mb-4">
                  {step.emoji}
                </div>
                <h3 className="font-black text-[#1a1a1a] mb-1">{step.title}</h3>
                <p className="text-sm text-[#9a9288] leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── App download CTA ─────────────────────────────────────────── */}
        <section className="mt-8 rounded-3xl bg-[#1a1a1a] px-8 py-10 flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden">
          <div className="absolute -top-8 -right-8 w-40 h-40 bg-[#f6760a]/10 rounded-full pointer-events-none" />
          <div className="text-center sm:text-left relative z-10">
            <p className="text-[#f6760a] text-xs font-bold uppercase tracking-widest mb-2">
              Get the app
            </p>
            <h2 className="text-white text-2xl font-black mb-2">
              Order faster on mobile
            </h2>
            <p className="text-white/50 text-sm max-w-xs">
              One-tap reorder, live tracking, and exclusive app-only deals.
            </p>
          </div>
          <div className="flex gap-3 relative z-10">
            {["App Store", "Google Play"].map((store) => (
              <button
                key={store}
                className="flex items-center gap-2.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white text-sm font-semibold px-5 py-3 rounded-2xl transition"
              >
                <span>{store === "App Store" ? "🍎" : "🤖"}</span>
                <div className="text-left">
                  <p className="text-white/50 text-[10px] leading-none">Download on</p>
                  <p className="font-bold text-sm leading-tight">{store}</p>
                </div>
              </button>
            ))}
          </div>
        </section>
      </main>

      {/* ── Footer ───────────────────────────────────────────────────────── */}
      <footer className="border-t border-[#e8e0d8] bg-white mt-4">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Logo />
          <p className="text-xs text-[#9a9288] text-center">
            © 2026 swiftbite · All rights reserved
          </p>
          <div className="flex gap-5">
            {["Privacy", "Terms", "Support"].map((link) => (
              <button key={link} className="text-xs text-[#9a9288] hover:text-[#f6760a] transition">
                {link}
              </button>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}