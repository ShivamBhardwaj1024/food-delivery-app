import { useState, useRef, useEffect, useCallback } from "react";

// ── Design tokens: same as swiftbite system ───────────────────────────────
// Primary:  #f6760a   Surface: #fdf6ee   Dark: #1a1a1a

// ── Icons ─────────────────────────────────────────────────────────────────
const IconHeart = ({ filled }) => (
  <svg className="w-6 h-6" fill={filled ? "#ff4d6d" : "none"} stroke={filled ? "#ff4d6d" : "white"} strokeWidth="2" viewBox="0 0 24 24">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);
const IconShare = () => (
  <svg className="w-6 h-6" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24">
    <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
  </svg>
);
const IconStar = () => (
  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="#f6760a">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);
const IconCart = () => (
  <svg className="w-6 h-6" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24">
    <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
  </svg>
);
const IconChevronUp = () => (
  <svg className="w-5 h-5" fill="none" stroke="white" strokeWidth="2.5" viewBox="0 0 24 24">
    <polyline points="18 15 12 9 6 15" />
  </svg>
);
const IconChevronDown = () => (
  <svg className="w-5 h-5" fill="none" stroke="white" strokeWidth="2.5" viewBox="0 0 24 24">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);
const IconBack = () => (
  <svg className="w-5 h-5" fill="none" stroke="white" strokeWidth="2.5" viewBox="0 0 24 24">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);
const IconCheck = () => (
  <svg className="w-4 h-4" fill="none" stroke="white" strokeWidth="3" viewBox="0 0 24 24">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);
const IconPlus = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
    <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);
const IconMinus = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);
const IconFlame = () => (
  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="#f6760a">
    <path d="M12 2c0 0-5 5-5 11a5 5 0 0010 0c0-4-2-7-2-7s-1 3-3 3c0-3 0-7 0-7z" />
  </svg>
);

// ── Reel data ──────────────────────────────────────────────────────────────
const REELS = [
  {
    id: 1,
    name: "Pepperoni Feast Pizza",
    restaurant: "Fuego Pizzeria",
    price: 14.99,
    rating: 4.9,
    reviews: 2341,
    time: "18–25 min",
    tags: ["Bestseller", "Spicy"],
    description: "Hand-stretched dough, rich San Marzano tomato base, double pepperoni, fresh basil, and a 3-cheese blend baked in our 900° wood-fired oven.",
    calories: 820,
    bg: "from-[#1a0a00] via-[#3d1a00] to-[#1a0a00]",
    accent: "#f6760a",
    emoji: "🍕",
    emojiDecor: ["🧀", "🌶️", "🍅"],
    likes: 4821,
    orders: "2.1k today",
    addOns: ["Extra cheese +$1.50", "Garlic dip +$0.99", "Chilli flakes +$0.50"],
  },
  {
    id: 2,
    name: "Dragon Roll (8 pcs)",
    restaurant: "Sakura Sushi Bar",
    price: 16.99,
    rating: 4.8,
    reviews: 987,
    time: "25–35 min",
    tags: ["Chef's pick", "Fresh daily"],
    description: "Crab & cucumber inside, topped with paper-thin avocado and seared salmon, finished with tobiko, unagi sauce, and toasted sesame.",
    calories: 540,
    bg: "from-[#0a0a1a] via-[#0d1f2d] to-[#0a0a1a]",
    accent: "#38bdf8",
    emoji: "🍣",
    emojiDecor: ["🥑", "🐟", "🫚"],
    likes: 3109,
    orders: "940 today",
    addOns: ["Miso soup +$2.99", "Edamame +$3.49", "Sake shot +$4.99"],
  },
  {
    id: 3,
    name: "Classic Smash Burger",
    restaurant: "Umami Burger Co.",
    price: 12.49,
    rating: 4.7,
    reviews: 1820,
    time: "20–30 min",
    tags: ["Fan fave"],
    description: "Two smashed 80/20 beef patties, American cheese waterfall, house-made pickles, white onion, yellow mustard, and ketchup on a brioche bun.",
    calories: 710,
    bg: "from-[#0f0900] via-[#1f1200] to-[#0f0900]",
    accent: "#f59e0b",
    emoji: "🍔",
    emojiDecor: ["🧅", "🥒", "🧀"],
    likes: 6230,
    orders: "1.8k today",
    addOns: ["Bacon +$1.99", "Fried egg +$1.50", "Truffle fries +$3.99"],
  },
  {
    id: 4,
    name: "Tonkotsu Ramen",
    restaurant: "Ramen Republic",
    price: 13.99,
    rating: 4.8,
    reviews: 2103,
    time: "22–32 min",
    tags: ["Trending", "Rich broth"],
    description: "18-hour slow-simmered pork bone broth, thin wavy noodles, chashu pork belly, soft-boiled marinated egg, nori, bamboo shoots, and scallions.",
    calories: 680,
    bg: "from-[#100500] via-[#2a1500] to-[#100500]",
    accent: "#fb923c",
    emoji: "🍜",
    emojiDecor: ["🥚", "🌿", "🐷"],
    likes: 5540,
    orders: "1.2k today",
    addOns: ["Extra chashu +$2.99", "Spicy paste +$0.99", "Corn & butter +$1.49"],
  },
  {
    id: 5,
    name: "Birria Tacos (3 pcs)",
    restaurant: "Verde Tacos",
    price: 11.99,
    rating: 4.6,
    reviews: 1543,
    time: "15–22 min",
    tags: ["Street food", "Quick"],
    description: "Slow-braised beef birria in adobo sauce, crispy dipped corn tortillas, melted Oaxaca cheese, fresh cilantro, diced white onion, and rich consommé for dipping.",
    calories: 590,
    bg: "from-[#001a04] via-[#003309] to-[#001a04]",
    accent: "#4ade80",
    emoji: "🌮",
    emojiDecor: ["🌿", "🧅", "🫙"],
    likes: 2876,
    orders: "870 today",
    addOns: ["Extra consommé +$1.99", "Guacamole +$2.49", "Jalapeños +$0.75"],
  },
  {
    id: 6,
    name: "Lava Cake + Ice Cream",
    restaurant: "Cloud Nine Desserts",
    price: 9.99,
    rating: 4.9,
    reviews: 763,
    time: "20–28 min",
    tags: ["Sweet pick", "Warm & cold"],
    description: "Warm 70% dark chocolate lava cake with a molten centre, paired with house-churned vanilla bean ice cream and a dusting of cocoa powder.",
    calories: 490,
    bg: "from-[#0f0017] via-[#1e0033] to-[#0f0017]",
    accent: "#c084fc",
    emoji: "🧁",
    emojiDecor: ["🍫", "🍦", "❄️"],
    likes: 3990,
    orders: "610 today",
    addOns: ["Caramel drizzle +$0.99", "Extra scoop +$1.99", "Berries +$1.49"],
  },
];

// ── Cart drawer ───────────────────────────────────────────────────────────
function CartDrawer({ cart, onClose, onUpdateQty, onClearCart }) {
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const [ordered, setOrdered] = useState(false);

  const handleOrder = () => {
    setOrdered(true);
    setTimeout(() => { setOrdered(false); onClearCart(); onClose(); }, 2200);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 w-full max-w-sm bg-[#1a1a1a] flex flex-col h-full shadow-2xl">
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
          <h2 className="text-white font-black text-lg">Your order</h2>
          <button onClick={onClose} className="text-white/50 hover:text-white transition text-xl font-bold">✕</button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
          {cart.length === 0 && (
            <div className="text-center py-16 text-white/30">
              <span className="text-4xl block mb-3">🛒</span>
              <p className="text-sm">Nothing here yet — go swipe some food!</p>
            </div>
          )}
          {cart.map((item) => (
            <div key={item.id + item.addOn} className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-2xl flex-shrink-0">
                {item.emoji}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm font-bold truncate">{item.name}</p>
                {item.addOn && <p className="text-white/40 text-xs truncate">{item.addOn}</p>}
                <p className="text-[#f6760a] text-sm font-black">${(item.price * item.qty).toFixed(2)}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onUpdateQty(item.id, item.addOn, -1)}
                  className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition"
                >
                  <IconMinus />
                </button>
                <span className="text-white text-sm font-bold w-4 text-center">{item.qty}</span>
                <button
                  onClick={() => onUpdateQty(item.id, item.addOn, 1)}
                  className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition"
                >
                  <IconPlus />
                </button>
              </div>
            </div>
          ))}
        </div>

        {cart.length > 0 && (
          <div className="px-5 py-5 border-t border-white/10 space-y-3">
            <div className="flex justify-between text-white/60 text-sm">
              <span>Subtotal</span><span>${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-white/60 text-sm">
              <span>Delivery</span><span className="text-green-400 font-semibold">Free</span>
            </div>
            <div className="flex justify-between text-white font-black text-base pt-1 border-t border-white/10">
              <span>Total</span><span>${total.toFixed(2)}</span>
            </div>
            <button
              onClick={handleOrder}
              className={`w-full py-3.5 rounded-2xl font-black text-sm tracking-wide transition-all duration-300 flex items-center justify-center gap-2 ${
                ordered ? "bg-green-500 text-white" : "bg-[#f6760a] hover:bg-[#e06500] text-white"
              }`}
            >
              {ordered ? <><IconCheck /> Order placed!</> : `Place order · $${total.toFixed(2)}`}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Single Reel ───────────────────────────────────────────────────────────
function Reel({ reel, isActive, onAddToCart }) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(reel.likes);
  const [qty, setQty] = useState(1);
  const [selectedAddOn, setSelectedAddOn] = useState(null);
  const [addedFlash, setAddedFlash] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [heartBurst, setHeartBurst] = useState(false);

  const handleLike = () => {
    setLiked((v) => !v);
    setLikeCount((c) => liked ? c - 1 : c + 1);
    if (!liked) { setHeartBurst(true); setTimeout(() => setHeartBurst(false), 600); }
  };

  const handleAdd = () => {
    onAddToCart({ ...reel, qty, addOn: selectedAddOn });
    setAddedFlash(true);
    setTimeout(() => setAddedFlash(false), 1400);
  };

  // Double-tap to like
  const lastTap = useRef(0);
  const handleDoubleTap = () => {
    const now = Date.now();
    if (now - lastTap.current < 300) handleLike();
    lastTap.current = now;
  };

  return (
    <div
      className={`relative w-full h-full flex-shrink-0 overflow-hidden transition-opacity duration-300 ${isActive ? "opacity-100" : "opacity-60"}`}
      onClick={handleDoubleTap}
    >
      {/* Background gradient */}
      <div className={`absolute inset-0 bg-gradient-to-b ${reel.bg}`} />

      {/* Decorative large emoji */}
      <div
        className="absolute inset-0 flex items-center justify-center select-none pointer-events-none"
        style={{ filter: "blur(0px)" }}
      >
        <span
          className="text-[18rem] opacity-10 leading-none"
          style={{ transform: "rotate(-12deg)" }}
        >
          {reel.emoji}
        </span>
      </div>

      {/* Floating decor emojis */}
      {reel.emojiDecor.map((e, i) => (
        <div
          key={i}
          className="absolute text-4xl opacity-20 select-none pointer-events-none"
          style={{
            top: `${15 + i * 22}%`,
            left: `${8 + i * 5}%`,
            transform: `rotate(${-10 + i * 12}deg)`,
          }}
        >
          {e}
        </div>
      ))}

      {/* Heart burst on double-tap */}
      {heartBurst && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-40">
          <span className="text-8xl animate-ping" style={{ animationDuration: "0.5s" }}>❤️</span>
        </div>
      )}

      {/* Top bar */}
      <div className="absolute top-0 left-0 right-0 px-4 pt-5 pb-3 bg-gradient-to-b from-black/50 to-transparent z-20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#f6760a] flex items-center justify-center">
            <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
              <path d="M12 2C7 2 3 6 3 11c0 3.5 2 6.5 5 8.2V21h8v-1.8c3-1.7 5-4.7 5-8.2 0-5-4-9-9-9z" fill="white" />
            </svg>
          </div>
          <span className="text-white font-black text-base tracking-tight">swiftbite</span>
        </div>
        <div className="flex items-center gap-1.5 bg-black/30 rounded-full px-3 py-1.5 backdrop-blur-sm">
          <IconFlame />
          <span className="text-white text-xs font-bold">{reel.orders}</span>
        </div>
      </div>

      {/* Right sidebar actions */}
      <div className="absolute right-4 bottom-52 z-20 flex flex-col items-center gap-5">
        {/* Like */}
        <button
          onClick={(e) => { e.stopPropagation(); handleLike(); }}
          className="flex flex-col items-center gap-1"
        >
          <div className={`w-11 h-11 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center transition-transform ${liked ? "scale-125" : "hover:scale-110"}`}>
            <IconHeart filled={liked} />
          </div>
          <span className="text-white text-xs font-bold">
            {likeCount >= 1000 ? `${(likeCount / 1000).toFixed(1)}k` : likeCount}
          </span>
        </button>

        {/* Share */}
        <button
          onClick={(e) => e.stopPropagation()}
          className="flex flex-col items-center gap-1"
        >
          <div className="w-11 h-11 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center hover:scale-110 transition">
            <IconShare />
          </div>
          <span className="text-white text-xs font-bold">Share</span>
        </button>

        {/* Cart shortcut */}
        <button
          onClick={(e) => { e.stopPropagation(); handleAdd(); }}
          className="flex flex-col items-center gap-1"
        >
          <div className={`w-11 h-11 rounded-full backdrop-blur-sm flex items-center justify-center transition-all duration-300 ${addedFlash ? "bg-green-500 scale-125" : "bg-black/40 hover:scale-110"}`}>
            {addedFlash ? <IconCheck /> : <IconCart />}
          </div>
          <span className="text-white text-xs font-bold">{addedFlash ? "Added!" : "Add"}</span>
        </button>
      </div>

      {/* Bottom info panel */}
      <div className="absolute bottom-0 left-0 right-0 z-20 px-4 pb-6 pt-20 bg-gradient-to-t from-black/90 via-black/60 to-transparent">
        {/* Tags */}
        <div className="flex gap-2 mb-3">
          {reel.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs font-bold px-2.5 py-1 rounded-full"
              style={{ background: reel.accent + "33", color: reel.accent, border: `1px solid ${reel.accent}55` }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Title + restaurant */}
        <h2 className="text-white font-black text-2xl leading-tight">{reel.name}</h2>
        <p className="text-white/60 text-sm mt-0.5 mb-3">{reel.restaurant}</p>

        {/* Meta row */}
        <div className="flex items-center gap-4 mb-4 text-sm">
          <span className="flex items-center gap-1 text-white font-bold">
            <IconStar /> {reel.rating}
            <span className="text-white/40 font-normal">({(reel.reviews / 1000).toFixed(1)}k)</span>
          </span>
          <span className="text-white/60">⏱ {reel.time}</span>
          <span className="text-white/60">🔥 {reel.calories} cal</span>
        </div>

        {/* Expandable description */}
        <button
          onClick={(e) => { e.stopPropagation(); setShowDetails((v) => !v); }}
          className="text-white/50 text-xs flex items-center gap-1 mb-3 hover:text-white/80 transition"
        >
          {showDetails ? "Less info" : "More info"} {showDetails ? <IconChevronUp /> : <IconChevronDown />}
        </button>

        {showDetails && (
          <p className="text-white/70 text-sm leading-relaxed mb-4 border-l-2 pl-3" style={{ borderColor: reel.accent }}>
            {reel.description}
          </p>
        )}

        {/* Add-ons */}
        <div className="flex gap-2 mb-4 overflow-x-auto pb-1 scrollbar-hide">
          {reel.addOns.map((ao) => (
            <button
              key={ao}
              onClick={(e) => { e.stopPropagation(); setSelectedAddOn(selectedAddOn === ao ? null : ao); }}
              className={`flex-shrink-0 text-xs font-semibold px-3 py-1.5 rounded-full border transition-all ${
                selectedAddOn === ao
                  ? "text-white border-transparent"
                  : "text-white/60 border-white/20 hover:border-white/50"
              }`}
              style={selectedAddOn === ao ? { background: reel.accent, borderColor: reel.accent } : {}}
            >
              + {ao}
            </button>
          ))}
        </div>

        {/* Qty + Order CTA */}
        <div className="flex items-center gap-3" onClick={(e) => e.stopPropagation()}>
          {/* Qty stepper */}
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-3 py-2 border border-white/20">
            <button
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              className="text-white hover:text-[#f6760a] transition"
            >
              <IconMinus />
            </button>
            <span className="text-white font-black text-sm w-5 text-center">{qty}</span>
            <button
              onClick={() => setQty((q) => q + 1)}
              className="text-white hover:text-[#f6760a] transition"
            >
              <IconPlus />
            </button>
          </div>

          {/* Add to cart */}
          <button
            onClick={handleAdd}
            className={`flex-1 py-3 rounded-full font-black text-sm tracking-wide transition-all duration-300 flex items-center justify-center gap-2 ${
              addedFlash ? "bg-green-500 text-white" : "text-white"
            }`}
            style={addedFlash ? {} : { background: reel.accent }}
          >
            {addedFlash ? (
              <><IconCheck /> Added to cart!</>
            ) : (
              <>Add to cart · ${(reel.price * qty).toFixed(2)}</>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Main FoodReels ────────────────────────────────────────────────────────
export default function FoodReels() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const containerRef = useRef(null);
  const isScrolling = useRef(false);

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  // Snap scroll handler
  const handleWheel = useCallback((e) => {
    e.preventDefault();
    if (isScrolling.current) return;
    isScrolling.current = true;
    if (e.deltaY > 30) setActiveIndex((i) => Math.min(REELS.length - 1, i + 1));
    else if (e.deltaY < -30) setActiveIndex((i) => Math.max(0, i - 1));
    setTimeout(() => { isScrolling.current = false; }, 700);
  }, []);

  // Touch support
  const touchStart = useRef(null);
  const handleTouchStart = (e) => { touchStart.current = e.touches[0].clientY; };
  const handleTouchEnd = (e) => {
    if (!touchStart.current) return;
    const diff = touchStart.current - e.changedTouches[0].clientY;
    if (Math.abs(diff) > 50) {
      if (diff > 0) setActiveIndex((i) => Math.min(REELS.length - 1, i + 1));
      else setActiveIndex((i) => Math.max(0, i - 1));
    }
    touchStart.current = null;
  };

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleWheel);
  }, [handleWheel]);

  // Keyboard
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "ArrowDown") setActiveIndex((i) => Math.min(REELS.length - 1, i + 1));
      if (e.key === "ArrowUp") setActiveIndex((i) => Math.max(0, i - 1));
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const addToCart = (item) => {
    setCart((prev) => {
      const key = item.id + (item.addOn || "");
      const exists = prev.find((c) => c.id + (c.addOn || "") === key);
      if (exists) return prev.map((c) => c.id + (c.addOn || "") === key ? { ...c, qty: c.qty + item.qty } : c);
      return [...prev, { ...item }];
    });
  };

  const updateQty = (id, addOn, delta) => {
    setCart((prev) =>
      prev
        .map((c) => c.id === id && c.addOn === addOn ? { ...c, qty: c.qty + delta } : c)
        .filter((c) => c.qty > 0)
    );
  };

  return (
    <div className="fixed inset-0 bg-black overflow-hidden" style={{ fontFamily: "system-ui, sans-serif" }}>

      {/* Reel viewport */}
      <div
        ref={containerRef}
        className="w-full h-full"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Sliding reel stack */}
        <div
          className="flex flex-col w-full transition-transform duration-500 ease-in-out"
          style={{ height: `${REELS.length * 100}%`, transform: `translateY(-${(activeIndex / REELS.length) * 100}%)` }}
        >
          {REELS.map((reel, i) => (
            <div key={reel.id} className="w-full flex-shrink-0" style={{ height: `${100 / REELS.length}%` }}>
              <Reel
                reel={reel}
                isActive={i === activeIndex}
                onAddToCart={addToCart}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Progress dots */}
      <div className="absolute left-3 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-1.5">
        {REELS.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            className={`rounded-full transition-all duration-300 ${
              i === activeIndex ? "w-1.5 h-5 bg-white" : "w-1.5 h-1.5 bg-white/30 hover:bg-white/60"
            }`}
          />
        ))}
      </div>

      {/* Navigation arrows (desktop) */}
      <div className="absolute right-20 bottom-8 z-30 hidden md:flex flex-col gap-2">
        <button
          onClick={() => setActiveIndex((i) => Math.max(0, i - 1))}
          disabled={activeIndex === 0}
          className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-white/20 transition disabled:opacity-30"
        >
          <IconChevronUp />
        </button>
        <button
          onClick={() => setActiveIndex((i) => Math.min(REELS.length - 1, i + 1))}
          disabled={activeIndex === REELS.length - 1}
          className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-white/20 transition disabled:opacity-30"
        >
          <IconChevronDown />
        </button>
      </div>

      {/* Cart FAB */}
      <button
        onClick={() => setShowCart(true)}
        className="absolute top-5 right-4 z-30 flex items-center gap-2 bg-[#f6760a] hover:bg-[#e06500] text-white rounded-full px-4 py-2.5 font-black text-sm shadow-lg transition-all active:scale-95"
      >
        <IconCart />
        {cartCount > 0 && (
          <span className="bg-white text-[#f6760a] text-xs font-black rounded-full w-5 h-5 flex items-center justify-center">
            {cartCount}
          </span>
        )}
        {cartCount > 0 && <span>View cart</span>}
      </button>

      {/* Swipe hint (fades after first swipe) */}
      {activeIndex === 0 && (
        <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-1 pointer-events-none animate-bounce">
          <IconChevronDown />
          <span className="text-white/50 text-xs">Swipe for more</span>
        </div>
      )}

      {/* Cart drawer */}
      {showCart && (
        <CartDrawer
          cart={cart}
          onClose={() => setShowCart(false)}
          onUpdateQty={updateQty}
          onClearCart={() => setCart([])}
        />
      )}
    </div>
  );
}