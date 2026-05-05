import { useState } from "react";
import Icon from "@/components/ui/icon";

const HERO_BG = "https://cdn.poehali.dev/projects/2106dff1-686a-44b6-a920-4388ddaa7cfb/files/a6b8e654-62c6-4065-80a4-92e9c37382bd.jpg";

const NAV_LINKS = [
  { label: "Главная", id: "home" },
  { label: "Каталог", id: "catalog" },
  { label: "О компании", id: "about" },
  { label: "Доставка и оплата", id: "delivery" },
  { label: "Контакты", id: "contacts" },
];

const CATEGORIES = [
  { icon: "Settings2", name: "Болты и винты", sub: "DIN 931, 933, 912 и другие", count: 248 },
  { icon: "Circle", name: "Гайки", sub: "Шестигранные, корончатые, колпачковые", count: 134 },
  { icon: "Disc", name: "Шайбы", sub: "Плоские, гровер, стопорные", count: 87 },
  { icon: "Anchor", name: "Анкеры", sub: "Механические, химические, рамные", count: 96 },
  { icon: "Wrench", name: "Саморезы", sub: "По металлу, дереву, гипсокартону", count: 312 },
  { icon: "Link", name: "Шпильки", sub: "Резьбовые, сантехнические", count: 74 },
  { icon: "Layers", name: "Заклёпки", sub: "Вытяжные, резьбовые, глухие", count: 108 },
  { icon: "Tool", name: "Инструмент", sub: "Заклёпочники, биты, насадки", count: 63 },
];

const PRODUCTS = [
  { id: 1, name: "Болт M8×40 DIN 931 (кл. 8.8, оцинк.)", price: 4.80, unit: "шт", img: "🔩", cat: "Болты и винты" },
  { id: 2, name: "Гайка M10 DIN 934 (кл. 8, оцинк.)", price: 2.50, unit: "шт", img: "⚙️", cat: "Гайки" },
  { id: 3, name: "Анкер-клин 12×60 (оцинк.)", price: 18.00, unit: "шт", img: "🔧", cat: "Анкеры" },
  { id: 4, name: "Заклёпка вытяжная 4.8×14 (Al/St)", price: 1.20, unit: "шт", img: "📌", cat: "Заклёпки" },
  { id: 5, name: "Шайба плоская M8 DIN 125 (оцинк.)", price: 0.90, unit: "шт", img: "⭕", cat: "Шайбы" },
  { id: 6, name: "Саморез 4.2×16 (RAL 7024, пресс-шайба)", price: 0.60, unit: "шт", img: "🔩", cat: "Саморезы" },
  { id: 7, name: "Шпилька резьбовая M12×1000 (A2)", price: 85.00, unit: "шт", img: "📏", cat: "Шпильки" },
  { id: 8, name: "Болт фундаментный M16×200 (кл. 5.8)", price: 42.00, unit: "шт", img: "🔩", cat: "Болты и винты" },
];

const ADVANTAGES = [
  { icon: "Award", title: "Только оригинальный товар", text: "Работаем напрямую с производителями. Все позиции сопровождаются сертификатами качества." },
  { icon: "Truck", title: "Доставка по всей России", text: "Отправляем через транспортные компании и Почту России. Самовывоз из Москвы." },
  { icon: "Package", title: "Большой склад в Москве", text: "Более 2 000 позиций в постоянном наличии. Отгрузка в день заказа до 15:00." },
  { icon: "Users", title: "Работаем с юрлицами и физлицами", text: "Безналичный расчёт, НДС, закрывающие документы. Скидки для постоянных клиентов." },
];

const CART_INIT: { [k: number]: number } = {};

export default function Index() {
  const [page, setPage] = useState("home");
  const [cart, setCart] = useState<{ [k: number]: number }>(CART_INIT);
  const [cartOpen, setCartOpen] = useState(false);
  const [callbackOpen, setCallbackOpen] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [filterCat, setFilterCat] = useState("Все");
  const [search, setSearch] = useState("");
  const [cb, setCb] = useState({ name: "", phone: "" });
  const [cbSent, setCbSent] = useState(false);
  const [requestForm, setRequestForm] = useState({ name: "", phone: "", comment: "" });
  const [requestSent, setRequestSent] = useState(false);

  const cartCount = Object.values(cart).reduce((a, b) => a + b, 0);
  const cartTotal = Object.entries(cart).reduce((s, [id, q]) => {
    const p = PRODUCTS.find(p => p.id === +id);
    return s + (p ? p.price * q : 0);
  }, 0);

  const add = (id: number) => setCart(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  const dec = (id: number) => setCart(prev => { const n = { ...prev }; if (n[id] > 1) n[id]--; else delete n[id]; return n; });
  const del = (id: number) => setCart(prev => { const n = { ...prev }; delete n[id]; return n; });

  const cats = ["Все", ...Array.from(new Set(PRODUCTS.map(p => p.cat)))];
  const filtered = PRODUCTS.filter(p =>
    (filterCat === "Все" || p.cat === filterCat) &&
    (search === "" || p.name.toLowerCase().includes(search.toLowerCase()))
  );

  const sendCallback = () => { if (cb.name && cb.phone) { setCbSent(true); } };
  const sendRequest = () => { if (requestForm.name && requestForm.phone) { setRequestSent(true); } };

  return (
    <div className="min-h-screen bg-white text-gray-900 font-body">

      {/* ── TOPBAR ── */}
      <div className="bg-[#111] border-b border-white/5 hidden md:block">
        <div className="max-w-7xl mx-auto px-6 h-9 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="text-white/35 text-xs flex items-center gap-1.5">
              <Icon name="MapPin" size={12} className="text-[#c0392b]" />
              Москва, ул. Складская, 14
            </span>
            <span className="text-white/35 text-xs flex items-center gap-1.5">
              <Icon name="Clock" size={12} className="text-[#c0392b]" />
              Пн–Пт: 9:00–18:00
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a href="mailto:info@metallotechnik.ru" className="text-white/35 text-xs hover:text-white transition-colors">info@metallotechnik.ru</a>
          </div>
        </div>
      </div>

      {/* ── HEADER ── */}
      <header className="bg-[#1a1a1a] border-b border-white/8 sticky top-0 z-50 shadow-lg shadow-black/30">
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between gap-4">
          {/* Logo */}
          <button onClick={() => setPage("home")} className="flex items-center gap-3 flex-shrink-0 group">
            <div className="w-9 h-9 bg-[#c0392b] flex items-center justify-center">
              <Icon name="Settings2" size={18} className="text-white" />
            </div>
            <div className="leading-tight">
              <div className="font-display font-bold text-lg text-white tracking-wide group-hover:text-[#e5443b] transition-colors">МЕТАЛЛОТЕХНИК</div>
              <div className="text-[10px] text-white/30 tracking-widest font-mono -mt-0.5">КРЕПЁЖ И МЕТИЗЫ</div>
            </div>
          </button>

          {/* Phone center */}
          <div className="hidden lg:flex flex-col items-center">
            <a href="tel:+74951234567" className="font-display text-xl font-bold text-white hover:text-[#e5443b] transition-colors tracking-wide">
              +7 (495) 123-45-67
            </a>
            <span className="text-[10px] text-white/30 tracking-widest">БЕСПЛАТНЫЙ ЗВОНОК</span>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <button
              onClick={() => setCallbackOpen(true)}
              className="hidden md:flex items-center gap-2 bg-[#c0392b] hover:bg-[#a93226] text-white text-sm px-4 py-2 font-medium transition-colors"
            >
              <Icon name="Phone" size={14} />
              Заказать звонок
            </button>
            <button
              onClick={() => setCartOpen(true)}
              className="relative flex items-center gap-2 border border-white/15 hover:border-[#c0392b]/60 text-white/70 hover:text-white px-3 py-2 text-sm transition-all"
            >
              <Icon name="ShoppingCart" size={16} />
              <span className="hidden sm:inline text-sm">Корзина</span>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 bg-[#c0392b] text-white text-[10px] flex items-center justify-center font-bold rounded-full">{cartCount}</span>
              )}
            </button>
            <button className="md:hidden text-white/60 hover:text-white" onClick={() => setMobileMenu(!mobileMenu)}>
              <Icon name={mobileMenu ? "X" : "Menu"} size={22} />
            </button>
          </div>
        </div>

        {/* Desktop nav */}
        <div className="hidden md:block bg-[#161616] border-t border-white/5">
          <div className="max-w-7xl mx-auto px-6">
            <nav className="flex items-center gap-0">
              {NAV_LINKS.map(n => (
                <button
                  key={n.id}
                  onClick={() => setPage(n.id)}
                  className={`px-5 py-3 text-sm font-medium transition-all border-b-2 ${page === n.id ? "text-white border-[#c0392b] bg-[#c0392b]/8" : "text-white/55 border-transparent hover:text-white hover:bg-white/4"}`}
                >{n.label}</button>
              ))}
              <button
                onClick={() => setPage("catalog")}
                className="ml-auto flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors py-3 px-4"
              >
                <Icon name="Grid3X3" size={14} className="text-[#c0392b]" />
                Весь каталог
              </button>
            </nav>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenu && (
          <div className="md:hidden bg-[#161616] border-t border-white/8 px-4 py-3 space-y-1">
            {NAV_LINKS.map(n => (
              <button key={n.id} onClick={() => { setPage(n.id); setMobileMenu(false); }}
                className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${page === n.id ? "text-[#c0392b] bg-[#c0392b]/10" : "text-white/60 hover:text-white"}`}>
                {n.label}
              </button>
            ))}
            <div className="pt-2 border-t border-white/8">
              <button onClick={() => { setCallbackOpen(true); setMobileMenu(false); }}
                className="w-full bg-[#c0392b] text-white py-2.5 text-sm font-medium">
                Заказать звонок
              </button>
            </div>
          </div>
        )}
      </header>

      {/* ── CALLBACK MODAL ── */}
      {callbackOpen && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => { setCallbackOpen(false); setCbSent(false); }} />
          <div className="relative bg-[#1e1e1e] border border-white/10 w-full max-w-sm p-8 shadow-2xl">
            <button onClick={() => { setCallbackOpen(false); setCbSent(false); }} className="absolute top-4 right-4 text-white/30 hover:text-white">
              <Icon name="X" size={18} />
            </button>
            {cbSent ? (
              <div className="text-center py-4">
                <Icon name="CheckCircle" size={48} className="text-[#c0392b] mx-auto mb-4" />
                <h3 className="font-display text-xl font-bold text-white mb-2">Спасибо!</h3>
                <p className="text-white/50 text-sm">Перезвоним в течение 15 минут</p>
              </div>
            ) : (
              <>
                <h3 className="font-display text-xl font-bold text-white mb-1">Заказать звонок</h3>
                <p className="text-white/40 text-sm mb-6">Перезвоним в течение 15 минут</p>
                <div className="space-y-3">
                  <input type="text" placeholder="Ваше имя" value={cb.name} onChange={e => setCb({ ...cb, name: e.target.value })}
                    className="w-full bg-[#111] border border-white/10 focus:border-[#c0392b]/50 text-white placeholder-white/20 px-4 py-3 text-sm outline-none transition-colors" />
                  <input type="tel" placeholder="+7 (___) ___-__-__" value={cb.phone} onChange={e => setCb({ ...cb, phone: e.target.value })}
                    className="w-full bg-[#111] border border-white/10 focus:border-[#c0392b]/50 text-white placeholder-white/20 px-4 py-3 text-sm outline-none transition-colors" />
                  <button onClick={sendCallback} className="w-full bg-[#c0392b] hover:bg-[#a93226] text-white py-3 text-sm font-medium transition-colors">
                    Перезвоните мне
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* ── CART DRAWER ── */}
      {cartOpen && (
        <div className="fixed inset-0 z-[60] flex">
          <div className="flex-1 bg-black/60 backdrop-blur-sm" onClick={() => setCartOpen(false)} />
          <div className="w-full max-w-md bg-[#1a1a1a] border-l border-white/8 flex flex-col shadow-2xl">
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/8 bg-[#161616]">
              <h2 className="font-display text-lg font-bold tracking-wide">КОРЗИНА</h2>
              <button onClick={() => setCartOpen(false)} className="text-white/40 hover:text-white"><Icon name="X" size={20} /></button>
            </div>
            <div className="flex-1 overflow-y-auto">
              {cartCount === 0 ? (
                <div className="text-center py-20 px-6">
                  <Icon name="ShoppingCart" size={48} className="mx-auto mb-4 text-white/10" />
                  <p className="text-white/30 text-sm">Корзина пуста</p>
                  <button onClick={() => { setCartOpen(false); setPage("catalog"); }} className="mt-4 text-[#c0392b] text-sm hover:underline">Перейти в каталог</button>
                </div>
              ) : (
                <div className="px-6 py-4 space-y-3">
                  {Object.entries(cart).map(([id, qty]) => {
                    const p = PRODUCTS.find(p => p.id === +id);
                    if (!p) return null;
                    return (
                      <div key={id} className="flex items-center gap-3 py-3 border-b border-white/5">
                        <div className="text-2xl w-10 text-center flex-shrink-0">{p.img}</div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-white leading-snug line-clamp-2">{p.name}</p>
                          <p className="text-xs text-[#c0392b] mt-0.5 font-medium">{p.price.toFixed(2)} ₽/{p.unit}</p>
                        </div>
                        <div className="flex items-center gap-1.5 flex-shrink-0">
                          <button onClick={() => dec(p.id)} className="w-6 h-6 border border-white/15 hover:border-[#c0392b] text-white/60 hover:text-white flex items-center justify-center text-xs transition-colors">−</button>
                          <span className="w-6 text-center text-sm font-mono">{qty}</span>
                          <button onClick={() => add(p.id)} className="w-6 h-6 bg-[#c0392b] hover:bg-[#a93226] text-white flex items-center justify-center text-xs transition-colors">+</button>
                        </div>
                        <div className="text-right flex-shrink-0 w-16">
                          <p className="text-sm font-medium text-white">{(p.price * qty).toFixed(2)} ₽</p>
                          <button onClick={() => del(p.id)} className="text-white/20 hover:text-[#c0392b] transition-colors mt-0.5"><Icon name="Trash2" size={12} /></button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
            {cartCount > 0 && (
              <div className="px-6 py-5 border-t border-white/8 bg-[#161616]">
                <div className="flex justify-between mb-1">
                  <span className="text-white/50 text-sm">Позиций: {cartCount}</span>
                  <span className="text-white font-medium text-sm">Итого: <span className="text-[#c0392b] font-bold text-base">{cartTotal.toFixed(2)} ₽</span></span>
                </div>
                <p className="text-white/25 text-xs mb-4">Точная стоимость рассчитывается при оформлении</p>
                <button className="w-full bg-[#c0392b] hover:bg-[#a93226] text-white py-3 font-medium text-sm transition-colors mb-2">
                  Оформить заказ
                </button>
                <button onClick={() => setCartOpen(false)} className="w-full border border-white/10 hover:border-white/25 text-white/50 hover:text-white py-2.5 text-sm transition-colors">
                  Продолжить покупки
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <main>

        {/* ════════════ HOME ════════════ */}
        {page === "home" && (
          <>
            {/* HERO */}
            <section className="relative min-h-[520px] flex items-center overflow-hidden">
              <div className="absolute inset-0">
                <img src={HERO_BG} alt="" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#0d0d0d]/95 via-[#0d0d0d]/75 to-[#0d0d0d]/20" />
              </div>

              <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 w-full">
                <div className="max-w-xl">
                  <div className="inline-flex items-center gap-2 bg-[#c0392b]/20 border border-[#c0392b]/40 px-3 py-1.5 mb-6">
                    <div className="w-1.5 h-1.5 bg-[#c0392b] rounded-full animate-pulse" />
                    <span className="text-[#e5443b] text-xs font-mono tracking-widest uppercase">Поставщик крепежа и метизов</span>
                  </div>

                  <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-4">
                    Крепёж и метизы<br />
                    <span className="text-[#c0392b]">оптом и в розницу</span>
                  </h1>
                  <p className="text-white/60 text-base leading-relaxed mb-8 font-body">
                    Болты, гайки, шайбы, анкеры, заклёпки — более 2 000 позиций в наличии на складе в Москве. Доставка по всей России.
                  </p>

                  <div className="flex flex-wrap gap-3 mb-10">
                    <button onClick={() => setPage("catalog")} className="flex items-center gap-2 bg-[#c0392b] hover:bg-[#a93226] text-white px-7 py-3 font-medium text-sm transition-all">
                      <Icon name="Grid3X3" size={16} />
                      Перейти в каталог
                    </button>
                    <button onClick={() => setCallbackOpen(true)} className="flex items-center gap-2 bg-white/10 hover:bg-white/15 border border-white/20 text-white px-7 py-3 font-medium text-sm transition-all backdrop-blur">
                      <Icon name="Phone" size={16} />
                      Заказать звонок
                    </button>
                  </div>

                  {/* Mini stats */}
                  <div className="flex flex-wrap gap-6">
                    {[
                      { val: "2 000+", label: "позиций" },
                      { val: "15 лет", label: "на рынке" },
                      { val: "от 1 шт", label: "минимум" },
                    ].map((s, i) => (
                      <div key={i}>
                        <div className="font-display text-2xl font-bold text-[#c0392b]">{s.val}</div>
                        <div className="text-white/40 text-xs">{s.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* QUICK REQUEST BAND */}
            <section className="bg-[#c0392b]">
              <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <Icon name="Zap" size={18} className="text-white/70" />
                  <span className="text-white font-medium text-sm">Нужен крепёж быстро? Оставьте заявку — перезвоним за 15 минут</span>
                </div>
                <button onClick={() => setCallbackOpen(true)} className="flex-shrink-0 bg-white text-[#c0392b] hover:bg-white/90 px-6 py-2 text-sm font-bold transition-colors">
                  Оставить заявку →
                </button>
              </div>
            </section>

            {/* CATEGORIES */}
            <section className="py-14 bg-white">
              <div className="max-w-7xl mx-auto px-6">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="font-display text-3xl font-bold text-gray-900">Каталог продукции</h2>
                    <p className="text-gray-500 text-sm mt-1">Широкий ассортимент крепёжных изделий</p>
                  </div>
                  <button onClick={() => setPage("catalog")} className="hidden md:flex items-center gap-2 text-[#c0392b] hover:text-gray-900 transition-colors text-sm font-medium">
                    Все категории <Icon name="ArrowRight" size={16} />
                  </button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {CATEGORIES.map((cat, i) => (
                    <button key={i} onClick={() => setPage("catalog")}
                      className="bg-white hover:bg-gray-50 border border-gray-200 hover:border-[#c0392b]/40 p-5 text-left group transition-all">
                      <div className="w-10 h-10 bg-[#c0392b]/15 border border-[#c0392b]/25 group-hover:bg-[#c0392b]/25 flex items-center justify-center mb-3 transition-colors">
                        <Icon name={cat.icon as string} size={18} className="text-[#c0392b]" />
                      </div>
                      <h3 className="font-medium text-gray-900 text-sm leading-snug mb-1">{cat.name}</h3>
                      <p className="text-gray-500 text-xs leading-snug mb-2">{cat.sub}</p>
                      <span className="text-[#c0392b]/60 text-xs font-mono">{cat.count} позиций</span>
                    </button>
                  ))}
                </div>
              </div>
            </section>

            {/* ADVANTAGES */}
            <section className="py-14 bg-gray-50 border-y border-gray-200">
              <div className="max-w-7xl mx-auto px-6">
                <h2 className="font-display text-3xl font-bold text-gray-900 mb-8 text-center">Почему выбирают нас</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {ADVANTAGES.map((a, i) => (
                    <div key={i} className="flex flex-col items-start gap-3">
                      <div className="w-12 h-12 bg-[#c0392b] flex items-center justify-center flex-shrink-0">
                        <Icon name={a.icon as string} size={22} className="text-white" />
                      </div>
                      <div>
                        <h3 className="font-display font-bold text-gray-900 text-base mb-1.5">{a.title}</h3>
                        <p className="text-gray-500 text-sm leading-relaxed">{a.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* POPULAR PRODUCTS */}
            <section className="py-14 bg-white">
              <div className="max-w-7xl mx-auto px-6">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="font-display text-3xl font-bold text-gray-900">Популярные товары</h2>
                    <p className="text-gray-500 text-sm mt-1">Часто заказываемые позиции</p>
                  </div>
                  <button onClick={() => setPage("catalog")} className="hidden md:flex items-center gap-2 text-[#c0392b] hover:text-gray-900 transition-colors text-sm font-medium">
                    Весь каталог <Icon name="ArrowRight" size={16} />
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {PRODUCTS.slice(0, 8).map(p => (
                    <div key={p.id} className="bg-white border border-gray-200 hover:border-[#c0392b]/30 transition-all group">
                      {/* Product image area */}
                      <div className="h-36 bg-gray-100 border-b border-gray-200 flex items-center justify-center">
                        <span className="text-5xl">{p.img}</span>
                      </div>
                      <div className="p-4">
                        <p className="text-xs text-gray-500 mb-1">{p.cat}</p>
                        <h3 className="text-sm text-gray-900 leading-snug mb-3 min-h-[40px]">{p.name}</h3>
                        <div className="flex items-end justify-between mb-3">
                          <div>
                            <span className="font-display text-lg font-bold text-[#c0392b]">{p.price.toFixed(2)} ₽</span>
                            <span className="text-gray-500 text-xs ml-1">/{p.unit}</span>
                          </div>
                          <span className="text-xs text-green-600 bg-[#2ecc71]/10 px-2 py-0.5">В наличии</span>
                        </div>
                        {cart[p.id] ? (
                          <div className="flex items-center gap-2">
                            <button onClick={() => dec(p.id)} className="flex-1 h-8 border border-gray-300 hover:border-[#c0392b] text-gray-600 hover:text-gray-900 flex items-center justify-center text-sm transition-colors">−</button>
                            <span className="font-mono text-sm w-6 text-center">{cart[p.id]}</span>
                            <button onClick={() => add(p.id)} className="flex-1 h-8 bg-[#c0392b] hover:bg-[#a93226] text-white flex items-center justify-center text-sm transition-colors">+</button>
                          </div>
                        ) : (
                          <button onClick={() => add(p.id)} className="w-full h-8 bg-[#c0392b]/15 hover:bg-[#c0392b] border border-[#c0392b]/30 hover:border-[#c0392b] text-[#c0392b] hover:text-white text-xs font-medium transition-all flex items-center justify-center gap-1.5">
                            <Icon name="ShoppingCart" size={13} /> В корзину
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* REQUEST FORM */}
            <section className="py-14 bg-gray-50 border-y border-gray-200">
              <div className="max-w-7xl mx-auto px-6">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                  <div>
                    <h2 className="font-display text-3xl font-bold text-gray-900 mb-3">Отправьте запрос</h2>
                    <p className="text-gray-600 text-sm leading-relaxed mb-6">
                      Если не нашли нужную позицию или хотите уточнить цену — оставьте заявку. Наш менеджер свяжется с вами и поможет подобрать крепёж под вашу задачу.
                    </p>
                    <div className="space-y-4">
                      {[
                        { icon: "CheckCircle", text: "Подберём аналоги если нет в наличии" },
                        { icon: "CheckCircle", text: "Рассчитаем стоимость партии" },
                        { icon: "CheckCircle", text: "Оформим документы для юрлиц" },
                      ].map((f, i) => (
                        <div key={i} className="flex items-center gap-3 text-sm text-gray-600">
                          <Icon name={f.icon as string} size={16} className="text-[#c0392b] flex-shrink-0" />
                          {f.text}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="bg-white border border-gray-200 p-6">
                    {requestSent ? (
                      <div className="text-center py-8">
                        <Icon name="CheckCircle" size={48} className="text-[#c0392b] mx-auto mb-4" />
                        <h3 className="font-display text-xl font-bold text-gray-900 mb-2">Заявка принята!</h3>
                        <p className="text-gray-600 text-sm">Свяжемся с вами в течение 2 часов</p>
                      </div>
                    ) : (
                      <>
                        <h3 className="font-display text-lg font-bold text-gray-900 mb-4">Оставить заявку</h3>
                        <div className="space-y-3">
                          <input type="text" placeholder="Ваше имя *" value={requestForm.name} onChange={e => setRequestForm({ ...requestForm, name: e.target.value })}
                            className="w-full bg-gray-50 border border-gray-300 focus:border-[#c0392b]/50 text-gray-900 placeholder-gray-400 px-4 py-2.5 text-sm outline-none transition-colors" />
                          <input type="tel" placeholder="Телефон *" value={requestForm.phone} onChange={e => setRequestForm({ ...requestForm, phone: e.target.value })}
                            className="w-full bg-gray-50 border border-gray-300 focus:border-[#c0392b]/50 text-gray-900 placeholder-gray-400 px-4 py-2.5 text-sm outline-none transition-colors" />
                          <textarea rows={3} placeholder="Комментарий или список нужных позиций" value={requestForm.comment} onChange={e => setRequestForm({ ...requestForm, comment: e.target.value })}
                            className="w-full bg-gray-50 border border-gray-300 focus:border-[#c0392b]/50 text-gray-900 placeholder-gray-400 px-4 py-2.5 text-sm outline-none transition-colors resize-none" />
                          <button onClick={sendRequest} className="w-full bg-[#c0392b] hover:bg-[#a93226] text-white py-3 text-sm font-medium transition-colors">
                            Отправить заявку
                          </button>
                          <p className="text-gray-400 text-xs text-center">Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности</p>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </section>

            {/* CONTACTS STRIP */}
            <section className="py-10 bg-white">
              <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { icon: "Phone", title: "+7 (495) 123-45-67", sub: "Пн–Пт 9:00–18:00, Сб 10:00–15:00" },
                    { icon: "MapPin", title: "Москва, ул. Складская, 14", sub: "Самовывоз, склад открыт в рабочие дни" },
                    { icon: "Mail", title: "info@metallotechnik.ru", sub: "Ответим в течение 2 часов" },
                  ].map((c, i) => (
                    <div key={i} className="flex items-center gap-4 p-5 bg-white border border-gray-200">
                      <div className="w-10 h-10 bg-[#c0392b] flex items-center justify-center flex-shrink-0">
                        <Icon name={c.icon as string} size={18} className="text-white" />
                      </div>
                      <div>
                        <p className="text-gray-900 font-medium text-sm">{c.title}</p>
                        <p className="text-gray-500 text-xs mt-0.5">{c.sub}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </>
        )}

        {/* ════════════ CATALOG ════════════ */}
        {page === "catalog" && (
          <div className="max-w-7xl mx-auto px-6 py-10">
            <div className="mb-8">
              <h1 className="font-display text-3xl font-bold text-gray-900 mb-1">Каталог товаров</h1>
              <p className="text-gray-500 text-sm">Крепёж и метизы в наличии на складе в Москве</p>
            </div>

            {/* Search + filter */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <div className="relative flex-1">
                <Icon name="Search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="text" placeholder="Поиск по каталогу..." value={search} onChange={e => setSearch(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 focus:border-[#c0392b]/40 text-gray-900 placeholder-gray-400 pl-9 pr-4 py-2.5 text-sm outline-none transition-colors" />
              </div>
              <div className="flex gap-2 flex-wrap">
                {cats.map(c => (
                  <button key={c} onClick={() => setFilterCat(c)}
                    className={`px-4 py-2.5 text-xs font-medium transition-all border ${filterCat === c ? "bg-[#c0392b] border-[#c0392b] text-white" : "border-gray-300 text-gray-500 hover:text-gray-900 hover:border-gray-400 bg-white"}`}>
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <p className="text-gray-400 text-xs mb-4 font-mono">Найдено: {filtered.length} позиций</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filtered.map(p => (
                <div key={p.id} className="bg-white border border-gray-200 hover:border-[#c0392b]/30 transition-all">
                  <div className="h-36 bg-gray-100 border-b border-gray-200 flex items-center justify-center">
                    <span className="text-5xl">{p.img}</span>
                  </div>
                  <div className="p-4">
                    <p className="text-xs text-gray-500 mb-1">{p.cat}</p>
                    <h3 className="text-sm text-gray-900 leading-snug mb-3 min-h-[40px]">{p.name}</h3>
                    <div className="flex items-end justify-between mb-3">
                      <div>
                        <span className="font-display text-lg font-bold text-[#c0392b]">{p.price.toFixed(2)} ₽</span>
                        <span className="text-gray-500 text-xs ml-1">/{p.unit}</span>
                      </div>
                      <span className="text-xs text-green-600 bg-[#2ecc71]/10 px-2 py-0.5">В наличии</span>
                    </div>
                    {cart[p.id] ? (
                      <div className="flex items-center gap-2">
                        <button onClick={() => dec(p.id)} className="flex-1 h-8 border border-gray-300 hover:border-[#c0392b] text-gray-600 hover:text-gray-900 flex items-center justify-center text-sm transition-colors">−</button>
                        <span className="font-mono text-sm w-6 text-center">{cart[p.id]}</span>
                        <button onClick={() => add(p.id)} className="flex-1 h-8 bg-[#c0392b] hover:bg-[#a93226] text-white flex items-center justify-center text-sm transition-colors">+</button>
                      </div>
                    ) : (
                      <button onClick={() => add(p.id)} className="w-full h-8 bg-[#c0392b]/15 hover:bg-[#c0392b] border border-[#c0392b]/30 hover:border-[#c0392b] text-[#c0392b] hover:text-white text-xs font-medium transition-all flex items-center justify-center gap-1.5">
                        <Icon name="ShoppingCart" size={13} /> В корзину
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ════════════ ABOUT ════════════ */}
        {page === "about" && (
          <div className="max-w-7xl mx-auto px-6 py-12">
            <h1 className="font-display text-4xl font-bold text-gray-900 mb-2">О компании</h1>
            <p className="text-gray-500 text-sm mb-10">МЕТАЛЛОТЕХНИК — надёжный поставщик крепежа</p>
            <div className="grid md:grid-cols-2 gap-12 mb-12">
              <div className="space-y-4 text-gray-600 text-sm leading-relaxed">
                <p>Компания <strong className="text-gray-900">«Металлотехник»</strong> работает на рынке крепёжных изделий с 2009 года. За это время мы стали надёжным партнёром для сотен предприятий из сферы строительства, машиностроения и промышленного производства.</p>
                <p>Мы поставляем крепёж напрямую с заводов-изготовителей из России, Германии, Тайваня и Китая — без посредников, что позволяет предлагать конкурентоспособные цены при гарантированном качестве.</p>
                <p>Весь товар сертифицирован. На каждую партию предоставляются паспорта качества и сертификаты соответствия. Входной контроль — обязательный этап нашей работы.</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { val: "2009", label: "Год основания" },
                  { val: "2 000+", label: "Позиций в наличии" },
                  { val: "5 000+", label: "Клиентов за 15 лет" },
                  { val: "24 ч", label: "Срок отгрузки" },
                ].map((s, i) => (
                  <div key={i} className="bg-white border border-gray-200 p-6 hover:border-[#c0392b]/30 transition-colors">
                    <div className="font-display text-3xl font-bold text-[#c0392b]">{s.val}</div>
                    <div className="text-gray-500 text-sm mt-1">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white border border-gray-200 p-8">
              <h2 className="font-display text-2xl font-bold text-gray-900 mb-6">Наши преимущества</h2>
              <div className="grid md:grid-cols-2 gap-5">
                {ADVANTAGES.map((a, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-10 h-10 bg-[#c0392b] flex items-center justify-center flex-shrink-0">
                      <Icon name={a.icon as string} size={18} className="text-white" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 text-sm mb-1">{a.title}</h3>
                      <p className="text-gray-500 text-sm">{a.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ════════════ DELIVERY ════════════ */}
        {page === "delivery" && (
          <div className="max-w-7xl mx-auto px-6 py-12">
            <h1 className="font-display text-4xl font-bold text-gray-900 mb-2">Доставка и оплата</h1>
            <p className="text-gray-500 text-sm mb-10">Работаем по всей России</p>
            <div className="grid md:grid-cols-2 gap-8 mb-10">
              <div className="bg-white border border-gray-200 p-6">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 bg-[#c0392b] flex items-center justify-center">
                    <Icon name="Truck" size={18} className="text-white" />
                  </div>
                  <h2 className="font-display text-xl font-bold text-gray-900">Доставка</h2>
                </div>
                <div className="space-y-3 text-sm text-gray-600">
                  {[
                    { t: "Самовывоз", d: "Бесплатно. Склад в Москве, ул. Складская, 14. Пн–Пт 9:00–18:00." },
                    { t: "Курьер по Москве", d: "от 500 ₽. Доставка в день заказа при заказе до 14:00." },
                    { t: "Транспортные компании", d: "СДЭК, Деловые Линии, ПЭК. Доставка по всей России." },
                    { t: "Почта России", d: "Для небольших отправлений в отдалённые регионы." },
                  ].map((d, i) => (
                    <div key={i} className="border-b border-gray-200 pb-3 last:border-0">
                      <p className="text-gray-900 font-medium mb-0.5">{d.t}</p>
                      <p>{d.d}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white border border-gray-200 p-6">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 bg-[#c0392b] flex items-center justify-center">
                    <Icon name="CreditCard" size={18} className="text-white" />
                  </div>
                  <h2 className="font-display text-xl font-bold text-gray-900">Оплата</h2>
                </div>
                <div className="space-y-3 text-sm text-gray-600">
                  {[
                    { t: "Наличные", d: "При самовывозе или доставке курьером по Москве." },
                    { t: "Банковская карта", d: "Visa, Mastercard, МИР — онлайн или в офисе." },
                    { t: "Безналичный расчёт", d: "Для юридических лиц и ИП. НДС, все закрывающие документы." },
                    { t: "Постоплата", d: "Для постоянных клиентов — по договору." },
                  ].map((d, i) => (
                    <div key={i} className="border-b border-gray-200 pb-3 last:border-0">
                      <p className="text-gray-900 font-medium mb-0.5">{d.t}</p>
                      <p>{d.d}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="bg-[#c0392b]/10 border border-[#c0392b]/30 p-6 flex items-start gap-4">
              <Icon name="Info" size={20} className="text-[#c0392b] flex-shrink-0 mt-0.5" />
              <p className="text-gray-600 text-sm leading-relaxed">
                <strong className="text-gray-900">Бесплатная доставка</strong> при заказе от 50 000 ₽ по Москве и МО. Для регионов — уточняйте у менеджера. Крупные партии и постоянным клиентам — индивидуальные условия.
              </p>
            </div>
          </div>
        )}

        {/* ════════════ CONTACTS ════════════ */}
        {page === "contacts" && (
          <div className="max-w-7xl mx-auto px-6 py-12">
            <h1 className="font-display text-4xl font-bold text-gray-900 mb-2">Контакты</h1>
            <p className="text-gray-500 text-sm mb-10">Свяжитесь с нами любым удобным способом</p>
            <div className="grid md:grid-cols-2 gap-10">
              <div className="space-y-6">
                {[
                  { icon: "Phone", label: "Телефон", val: "+7 (495) 123-45-67", sub: "Пн–Пт: 9:00–18:00, Сб: 10:00–15:00" },
                  { icon: "Mail", label: "Email", val: "info@metallotechnik.ru", sub: "Ответим в течение 2 часов" },
                  { icon: "MapPin", label: "Адрес склада и офиса", val: "Москва, ул. Складская, д. 14", sub: "Самовывоз в рабочие дни" },
                  { icon: "Clock", label: "Режим работы", val: "Пн–Пт: 9:00–18:00", sub: "Суббота: 10:00–15:00" },
                ].map((c, i) => (
                  <div key={i} className="flex items-start gap-4 p-5 bg-white border border-gray-200 hover:border-[#c0392b]/30 transition-colors">
                    <div className="w-10 h-10 bg-[#c0392b] flex items-center justify-center flex-shrink-0">
                      <Icon name={c.icon as string} size={18} className="text-white" />
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs mb-0.5">{c.label}</p>
                      <p className="text-gray-900 font-medium text-sm">{c.val}</p>
                      <p className="text-gray-500 text-xs mt-0.5">{c.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="bg-white border border-gray-200 p-6">
                {requestSent ? (
                  <div className="text-center py-10">
                    <Icon name="CheckCircle" size={48} className="text-[#c0392b] mx-auto mb-4" />
                    <h3 className="font-display text-xl font-bold text-gray-900 mb-2">Заявка принята!</h3>
                    <p className="text-gray-600 text-sm">Свяжемся с вами в течение 2 часов</p>
                    <button onClick={() => setRequestSent(false)} className="mt-4 text-[#c0392b] text-sm hover:underline">Отправить ещё</button>
                  </div>
                ) : (
                  <>
                    <h3 className="font-display text-xl font-bold text-gray-900 mb-4">Написать нам</h3>
                    <div className="space-y-3">
                      <input type="text" placeholder="Ваше имя *" value={requestForm.name} onChange={e => setRequestForm({ ...requestForm, name: e.target.value })}
                        className="w-full bg-gray-50 border border-gray-300 focus:border-[#c0392b]/50 text-gray-900 placeholder-gray-400 px-4 py-2.5 text-sm outline-none transition-colors" />
                      <input type="tel" placeholder="Телефон *" value={requestForm.phone} onChange={e => setRequestForm({ ...requestForm, phone: e.target.value })}
                        className="w-full bg-gray-50 border border-gray-300 focus:border-[#c0392b]/50 text-gray-900 placeholder-gray-400 px-4 py-2.5 text-sm outline-none transition-colors" />
                      <textarea rows={4} placeholder="Комментарий..." value={requestForm.comment} onChange={e => setRequestForm({ ...requestForm, comment: e.target.value })}
                        className="w-full bg-gray-50 border border-gray-300 focus:border-[#c0392b]/50 text-gray-900 placeholder-gray-400 px-4 py-2.5 text-sm outline-none transition-colors resize-none" />
                      <button onClick={sendRequest} className="w-full bg-[#c0392b] hover:bg-[#a93226] text-white py-3 text-sm font-medium transition-colors">
                        Отправить сообщение
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}

      </main>

      {/* ── FOOTER ── */}
      <footer className="bg-[#111] border-t border-white/8 pt-12 pb-6">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
            <div className="md:col-span-1">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 bg-[#c0392b] flex items-center justify-center">
                  <Icon name="Settings2" size={16} className="text-white" />
                </div>
                <span className="font-display font-bold text-white tracking-wide">МЕТАЛЛОТЕХНИК</span>
              </div>
              <p className="text-white/30 text-xs leading-relaxed mb-4">Поставщик крепёжных изделий и метизов оптом и в розницу</p>
              <p className="text-white/50 text-sm font-medium">+7 (495) 123-45-67</p>
              <p className="text-white/30 text-xs mt-0.5">Пн–Пт 9:00–18:00</p>
            </div>
            <div>
              <h4 className="text-white font-medium text-sm mb-4">Каталог</h4>
              {CATEGORIES.slice(0, 5).map((c, i) => (
                <button key={i} onClick={() => setPage("catalog")} className="block text-white/35 text-xs mb-2 hover:text-white transition-colors text-left">{c.name}</button>
              ))}
            </div>
            <div>
              <h4 className="text-white font-medium text-sm mb-4">Компания</h4>
              {[
                { label: "О компании", id: "about" },
                { label: "Каталог", id: "catalog" },
                { label: "Доставка и оплата", id: "delivery" },
                { label: "Контакты", id: "contacts" },
              ].map((n, i) => (
                <button key={i} onClick={() => setPage(n.id)} className="block text-white/35 text-xs mb-2 hover:text-white transition-colors text-left">{n.label}</button>
              ))}
            </div>
            <div>
              <h4 className="text-white font-medium text-sm mb-4">Контакты</h4>
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <Icon name="MapPin" size={13} className="text-[#c0392b] mt-0.5 flex-shrink-0" />
                  <span className="text-white/35 text-xs">Москва, ул. Складская, 14</span>
                </div>
                <div className="flex items-start gap-2">
                  <Icon name="Phone" size={13} className="text-[#c0392b] mt-0.5 flex-shrink-0" />
                  <span className="text-white/35 text-xs">+7 (495) 123-45-67</span>
                </div>
                <div className="flex items-start gap-2">
                  <Icon name="Mail" size={13} className="text-[#c0392b] mt-0.5 flex-shrink-0" />
                  <span className="text-white/35 text-xs">info@metallotechnik.ru</span>
                </div>
              </div>
              <button onClick={() => setCallbackOpen(true)} className="mt-5 w-full bg-[#c0392b] hover:bg-[#a93226] text-white text-xs py-2.5 font-medium transition-colors">
                Заказать звонок
              </button>
            </div>
          </div>
          <div className="border-t border-white/5 pt-5 flex flex-col md:flex-row items-center justify-between gap-3">
            <p className="text-white/20 text-xs">© 2026 Металлотехник. Все права защищены.</p>
            <p className="text-white/15 text-xs">ИНН 7712345678 | ОГРН 1097712345678</p>
          </div>
        </div>
      </footer>
    </div>
  );
}