import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

const NAV_ITEMS = [
  { id: "home", label: "Главная" },
  { id: "categories", label: "Категории" },
  { id: "about", label: "О нас" },
  { id: "blog", label: "Блог" },
  { id: "contacts", label: "Контакты" },
];

const PRODUCTS = [
  { id: 1, name: "Болт M8x40 DIN 931", type: "Болты", size: "M8", material: "Нержавейка", strength: "A2-70", price: 12, badge: "ХИТ" },
  { id: 2, name: "Гайка M10 DIN 934", type: "Гайки", size: "M10", material: "Углеродистая сталь", strength: "8.8", price: 6, badge: null },
  { id: 3, name: "Анкер-клин 12x60", type: "Анкеры", size: "M12", material: "Оцинкованная", strength: "10.9", price: 45, badge: "NEW" },
  { id: 4, name: "Саморез 4.2x65 TX", type: "Саморезы", size: "M4", material: "Нержавейка", strength: "A4-80", price: 8, badge: null },
  { id: 5, name: "Шпилька резьбовая M12", type: "Болты", size: "M12", material: "Углеродистая сталь", strength: "8.8", price: 28, badge: null },
  { id: 6, name: "Гайка самостопорная M8", type: "Гайки", size: "M8", material: "Оцинкованная", strength: "6.8", price: 9, badge: "ХИТ" },
  { id: 7, name: "Химический анкер HIT-RE", type: "Анкеры", size: "M16", material: "Нержавейка", strength: "A4-80", price: 380, badge: "PRO" },
  { id: 8, name: "Дюбель-гвоздь 6x60", type: "Саморезы", size: "M6", material: "Оцинкованная", strength: "6.8", price: 4, badge: null },
  { id: 9, name: "Болт фундаментный M16", type: "Болты", size: "M16", material: "Углеродистая сталь", strength: "10.9", price: 65, badge: null },
  { id: 10, name: "Гайка DIN 985 M12", type: "Гайки", size: "M12", material: "Нержавейка", strength: "A2-70", price: 14, badge: null },
];

const CATEGORIES = [
  { icon: "Settings2", name: "Болты и шпильки", count: 240, desc: "DIN 931 / 933 / 939" },
  { icon: "Circle", name: "Гайки", count: 180, desc: "Шестигранные, самостопорящие" },
  { icon: "Anchor", name: "Анкеры", count: 95, desc: "Механические и химические" },
  { icon: "Wrench", name: "Саморезы", count: 320, desc: "Для металла, дерева, ГКЛ" },
  { icon: "Minus", name: "Заклёпки", count: 110, desc: "Вытяжные и резьбовые" },
  { icon: "Layers", name: "Шайбы", count: 75, desc: "Плоские, гровер, зубчатые" },
];

const BLOG_POSTS = [
  { date: "28 апр 2026", tag: "ТЕХНОЛОГИИ", title: "Нержавейка vs оцинковка: что выбрать для уличных конструкций", excerpt: "Разбираем коррозионную стойкость материалов, стоимость эксплуатации и реальные сроки службы в агрессивных средах." },
  { date: "15 апр 2026", tag: "ИНСТРУКЦИЯ", title: "Классы прочности болтов: полный гид для инженера", excerpt: "От 4.8 до 12.9 — понятная расшифровка маркировки и таблица допустимых нагрузок для каждого класса." },
  { date: "3 апр 2026", tag: "КЕЙС", title: "Химические анкеры: монтаж в пустотелом кирпиче", excerpt: "Пошаговый разбор реального проекта с расчётом нагрузок и выбором оптимального состава для инъекции." },
  { date: "22 мар 2026", tag: "СТАНДАРТЫ", title: "DIN vs ISO vs ГОСТ: как не запутаться в маркировке", excerpt: "Подробное сравнение систем стандартизации и как правильно читать маркировку изделий при закупке." },
  { date: "10 мар 2026", tag: "МОНТАЖ", title: "Правильный момент затяжки: таблицы и формулы", excerpt: "Перетяжка болта — одна из самых частых ошибок монтажа. Разбираем как её избежать." },
  { date: "1 мар 2026", tag: "МАТЕРИАЛЫ", title: "Титановый крепёж: когда он оправдан и сколько стоит", excerpt: "Область применения, реальные характеристики и экономика использования титановых метизов." },
];

const TYPES = ["Все", "Болты", "Гайки", "Анкеры", "Саморезы"];
const SIZES = ["Все", "M4", "M6", "M8", "M10", "M12", "M16"];
const MATERIALS = ["Все", "Нержавейка", "Оцинкованная", "Углеродистая сталь"];
const STRENGTHS = ["Все", "6.8", "8.8", "10.9", "A2-70", "A4-80"];

export default function Index() {
  const [page, setPage] = useState("home");
  const [cart, setCart] = useState<{ [key: number]: number }>({});
  const [cartOpen, setCartOpen] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [filterType, setFilterType] = useState("Все");
  const [filterSize, setFilterSize] = useState("Все");
  const [filterMaterial, setFilterMaterial] = useState("Все");
  const [filterStrength, setFilterStrength] = useState("Все");
  const [contactForm, setContactForm] = useState({ name: "", phone: "", message: "" });
  const [formSent, setFormSent] = useState(false);
  const [heroVisible, setHeroVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  const cartCount = Object.values(cart).reduce((a, b) => a + b, 0);
  const cartTotal = Object.entries(cart).reduce((sum, [id, qty]) => {
    const p = PRODUCTS.find((p) => p.id === Number(id));
    return sum + (p ? p.price * qty : 0);
  }, 0);

  const addToCart = (id: number) => setCart((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  const removeFromCart = (id: number) => setCart((prev) => {
    const next = { ...prev };
    if (next[id] > 1) next[id]--;
    else delete next[id];
    return next;
  });
  const deleteFromCart = (id: number) => setCart((prev) => { const next = { ...prev }; delete next[id]; return next; });

  const filteredProducts = PRODUCTS.filter((p) =>
    (filterType === "Все" || p.type === filterType) &&
    (filterSize === "Все" || p.size === filterSize) &&
    (filterMaterial === "Все" || p.material === filterMaterial) &&
    (filterStrength === "Все" || p.strength === filterStrength)
  );

  const handleSendForm = () => {
    if (contactForm.name && contactForm.phone) {
      setFormSent(true);
      setContactForm({ name: "", phone: "", message: "" });
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-body overflow-x-hidden">

      {/* ── NAVBAR ── */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-[#0a0a0a]/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <button onClick={() => setPage("home")} className="flex items-center gap-3 group">
            <div className="w-8 h-8 bg-[#e5191a] flex items-center justify-center rotate-45 group-hover:rotate-0 transition-transform duration-300">
              <span className="text-white font-display font-bold text-sm -rotate-45 group-hover:rotate-0 transition-transform duration-300">B</span>
            </div>
            <span className="font-display font-semibold text-xl tracking-widest text-white">BOLTECH</span>
          </button>

          <nav className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => setPage(item.id)}
                className={`nav-link font-body text-sm tracking-wider uppercase transition-colors ${page === item.id ? "text-[#e5191a] active" : "text-white/60 hover:text-white"}`}
              >{item.label}</button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setCartOpen(true)}
              className="relative flex items-center gap-2 bg-[#e5191a]/10 border border-[#e5191a]/30 hover:bg-[#e5191a]/20 transition-all px-3 py-1.5 text-sm text-[#e5191a]"
            >
              <Icon name="ShoppingCart" size={16} />
              <span className="font-mono font-medium hidden sm:inline">Корзина</span>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 bg-[#e5191a] text-white text-xs flex items-center justify-center font-bold">{cartCount}</span>
              )}
            </button>
            <button className="md:hidden text-white/60 hover:text-white" onClick={() => setMobileMenu(!mobileMenu)}>
              <Icon name={mobileMenu ? "X" : "Menu"} size={20} />
            </button>
          </div>
        </div>

        {mobileMenu && (
          <div className="md:hidden border-t border-white/5 bg-[#0d0d0d] px-4 py-4 flex flex-col gap-1">
            {NAV_ITEMS.map((item) => (
              <button key={item.id} onClick={() => { setPage(item.id); setMobileMenu(false); }}
                className={`text-left font-body text-sm tracking-wider uppercase py-3 border-b border-white/5 transition-colors ${page === item.id ? "text-[#e5191a]" : "text-white/60"}`}>
                {item.label}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* ── CART DRAWER ── */}
      {cartOpen && (
        <div className="fixed inset-0 z-[60] flex">
          <div className="flex-1 bg-black/60 backdrop-blur-sm" onClick={() => setCartOpen(false)} />
          <div className="w-full max-w-md bg-[#111] border-l border-white/10 flex flex-col" style={{ animation: 'fade-in 0.25s ease' }}>
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
              <h2 className="font-display text-xl tracking-widest">КОРЗИНА</h2>
              <button onClick={() => setCartOpen(false)} className="text-white/50 hover:text-white">
                <Icon name="X" size={20} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              {cartCount === 0 ? (
                <div className="text-center py-16 text-white/30">
                  <Icon name="ShoppingCart" size={40} className="mx-auto mb-3 opacity-20" />
                  <p className="text-sm font-body">Корзина пуста</p>
                </div>
              ) : (
                Object.entries(cart).map(([id, qty]) => {
                  const p = PRODUCTS.find((pr) => pr.id === Number(id));
                  if (!p) return null;
                  return (
                    <div key={id} className="flex items-center gap-4 py-3 border-b border-white/5">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-white">{p.name}</p>
                        <p className="text-xs text-white/40 mt-0.5 font-mono">{p.price} ₽/шт</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button onClick={() => removeFromCart(p.id)} className="w-6 h-6 border border-white/20 hover:border-[#e5191a] flex items-center justify-center text-xs transition-colors">−</button>
                        <span className="w-5 text-center text-sm font-mono">{qty}</span>
                        <button onClick={() => addToCart(p.id)} className="w-6 h-6 border border-white/20 hover:border-[#e5191a] flex items-center justify-center text-xs transition-colors">+</button>
                      </div>
                      <span className="w-14 text-right text-sm font-mono text-[#e5191a]">{p.price * qty} ₽</span>
                      <button onClick={() => deleteFromCart(p.id)} className="text-white/20 hover:text-[#e5191a] transition-colors ml-1">
                        <Icon name="Trash2" size={14} />
                      </button>
                    </div>
                  );
                })
              )}
            </div>
            {cartCount > 0 && (
              <div className="px-6 py-4 border-t border-white/10">
                <div className="flex justify-between mb-4">
                  <span className="text-white/50 text-sm">Итого</span>
                  <span className="font-display text-2xl text-[#e5191a]">{cartTotal} ₽</span>
                </div>
                <button className="w-full bg-[#e5191a] hover:bg-[#b01213] text-white font-display tracking-widest py-3 text-sm transition-colors">
                  ОФОРМИТЬ ЗАКАЗ
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <main className="pt-16">

        {/* ════════════════ HOME ════════════════ */}
        {page === "home" && (
          <div>
            {/* HERO */}
            <section className="relative min-h-[92vh] flex items-center bg-grid overflow-hidden">
              <div className="absolute inset-0">
                <div className="absolute top-0 right-0 w-[55%] h-full bg-gradient-to-l from-[#e5191a]/6 to-transparent" />
                <div className="absolute bottom-0 left-[-100px] w-96 h-96 bg-[#e5191a]/5 blur-[100px] rounded-full" />
                <div className="absolute top-20 right-20 w-80 h-80 bg-[#e5191a]/8 blur-[80px] rounded-full" />
              </div>

              {/* Geometric shapes */}
              <div className="absolute right-[8%] top-[12%] w-36 h-36 border border-[#e5191a]/25 rotate-45 animate-float" style={{ animationDuration: '4s' }} />
              <div className="absolute right-[18%] top-[42%] w-16 h-16 border border-[#e5191a]/15 rotate-45 animate-float" style={{ animationDelay: '1.2s', animationDuration: '5.5s' }} />
              <div className="absolute right-[4%] bottom-[20%] w-52 h-52 border border-white/4 rotate-45 animate-float" style={{ animationDelay: '2.3s', animationDuration: '7s' }} />
              <div className="absolute left-[3%] top-[30%] w-1 h-40 bg-gradient-to-b from-transparent via-[#e5191a]/30 to-transparent" />
              <div className="absolute right-[38%] top-0 w-px h-full bg-gradient-to-b from-transparent via-[#e5191a]/15 to-transparent" />

              <div className={`relative z-10 max-w-7xl mx-auto px-6 py-24 transition-all duration-1000 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-px bg-[#e5191a]" />
                  <span className="font-mono text-xs tracking-[0.35em] text-[#e5191a] uppercase">Профессиональный крепёж</span>
                </div>

                <h1 className="font-display font-bold leading-none mb-8">
                  <span className="block text-6xl md:text-8xl lg:text-9xl text-white">НАДЁЖНЫЕ</span>
                  <span className="block text-6xl md:text-8xl lg:text-9xl text-[#e5191a] glow-text">СОЕДИНЕНИЯ</span>
                  <span className="block text-6xl md:text-8xl lg:text-9xl text-white/15">ТОЧНОСТЬ</span>
                </h1>

                <p className="max-w-lg text-white/45 text-base leading-relaxed mb-10 font-body">
                  Более 1 200 позиций крепёжных изделий в наличии. Болты, гайки, анкеры, саморезы — для промышленности и строительства.
                </p>

                <div className="flex flex-wrap gap-4">
                  <button onClick={() => setPage("categories")} className="flex items-center gap-3 bg-[#e5191a] hover:bg-[#b01213] text-white px-8 py-4 font-display tracking-widest text-sm transition-all hover:translate-x-1 glow-red">
                    КАТАЛОГ ТОВАРОВ <Icon name="ArrowRight" size={16} />
                  </button>
                  <button onClick={() => setPage("contacts")} className="flex items-center gap-3 border border-white/15 hover:border-[#e5191a]/50 text-white/60 hover:text-white px-8 py-4 font-display tracking-widest text-sm transition-all">
                    ЗАПРОСИТЬ КП
                  </button>
                </div>

                {/* Stats bar */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-px mt-20 border border-white/5">
                  {[
                    { val: "1 200+", label: "ПОЗИЦИЙ" },
                    { val: "15 лет", label: "НА РЫНКЕ" },
                    { val: "3 400", label: "КЛИЕНТОВ" },
                    { val: "24 ч", label: "ДОСТАВКА" },
                  ].map((s, i) => (
                    <div key={i} className="bg-white/[0.02] hover:bg-[#e5191a]/5 transition-colors px-6 py-5 border-r border-white/5 last:border-r-0">
                      <div className="font-display text-2xl font-bold text-[#e5191a]">{s.val}</div>
                      <div className="font-mono text-[10px] text-white/25 tracking-widest mt-1">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* CATEGORIES PREVIEW */}
            <section className="py-20 max-w-7xl mx-auto px-6">
              <div className="flex items-end justify-between mb-12">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-6 h-px bg-[#e5191a]" />
                    <span className="font-mono text-xs tracking-[0.25em] text-[#e5191a] uppercase">Ассортимент</span>
                  </div>
                  <h2 className="font-display text-4xl md:text-5xl font-bold text-white">КАТЕГОРИИ</h2>
                </div>
                <button onClick={() => setPage("categories")} className="hidden md:flex items-center gap-2 text-[#e5191a] hover:text-white transition-colors font-mono text-xs tracking-widest">
                  ВСЕ КАТЕГОРИИ <Icon name="ArrowRight" size={14} />
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5">
                {CATEGORIES.map((cat, i) => (
                  <button key={i} onClick={() => setPage("categories")} className="bg-[#0a0a0a] p-6 text-left group hover:bg-[#e5191a]/5 transition-all">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-10 h-10 border border-[#e5191a]/30 group-hover:border-[#e5191a] flex items-center justify-center transition-colors">
                        <Icon name={cat.icon as string} size={18} className="text-[#e5191a]" />
                      </div>
                      <span className="font-mono text-xs text-white/20 group-hover:text-[#e5191a]/50 transition-colors">{cat.count}</span>
                    </div>
                    <h3 className="font-display text-lg font-medium text-white mb-1">{cat.name}</h3>
                    <p className="font-body text-xs text-white/30 group-hover:text-white/50 transition-colors mb-4">{cat.desc}</p>
                    <div className="flex items-center gap-2 text-[#e5191a] opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="font-mono text-xs tracking-widest">СМОТРЕТЬ</span>
                      <Icon name="ArrowRight" size={12} />
                    </div>
                  </button>
                ))}
              </div>
            </section>

            {/* WHY US */}
            <section className="py-20 bg-[#0d0d0d] border-y border-white/5">
              <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-14">
                  <div className="inline-flex items-center gap-3 mb-4">
                    <div className="w-6 h-px bg-[#e5191a]" />
                    <span className="font-mono text-xs tracking-[0.25em] text-[#e5191a]">ПРЕИМУЩЕСТВА</span>
                    <div className="w-6 h-px bg-[#e5191a]" />
                  </div>
                  <h2 className="font-display text-4xl font-bold text-white">ПОЧЕМУ BOLTECH</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    { icon: "Shield", title: "Сертифицировано", text: "Вся продукция соответствует ГОСТ, DIN и ISO. Документация на каждую партию." },
                    { icon: "Zap", title: "Быстро", text: "Отгрузка в день заказа. Доставка по России от 24 часов." },
                    { icon: "Package", title: "Большой склад", text: "Более 1 200 позиций в наличии. Нет нужды ждать поставки." },
                    { icon: "Headphones", title: "Экспертиза", text: "Помогаем подобрать крепёж для конкретной задачи." },
                  ].map((f, i) => (
                    <div key={i} className="group p-6 border border-white/5 hover:border-[#e5191a]/30 transition-all">
                      <div className="w-10 h-10 border border-[#e5191a]/30 group-hover:bg-[#e5191a]/10 flex items-center justify-center mb-4 transition-colors">
                        <Icon name={f.icon as string} size={18} className="text-[#e5191a]" />
                      </div>
                      <h3 className="font-display text-lg font-medium text-white mb-2">{f.title}</h3>
                      <p className="text-white/40 text-sm leading-relaxed">{f.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* CTA BAND */}
            <section className="relative py-20 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-[#e5191a] to-[#7a0000]" />
              <div className="absolute inset-0 bg-grid opacity-20" />
              <div className="relative z-10 max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
                <div>
                  <h2 className="font-display text-4xl md:text-5xl font-bold text-white leading-tight">НУЖЕН КРЕПЁЖ<br />ДЛЯ ПРОЕКТА?</h2>
                  <p className="text-white/70 mt-3 font-body">Оставьте заявку — рассчитаем стоимость за 2 часа</p>
                </div>
                <button onClick={() => setPage("contacts")} className="flex-shrink-0 bg-white text-[#e5191a] hover:bg-white/90 px-10 py-4 font-display tracking-widest text-sm font-bold transition-all hover:translate-x-1">
                  ОСТАВИТЬ ЗАЯВКУ →
                </button>
              </div>
            </section>

            {/* BLOG PREVIEW */}
            <section className="py-20 max-w-7xl mx-auto px-6">
              <div className="flex items-end justify-between mb-12">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-6 h-px bg-[#e5191a]" />
                    <span className="font-mono text-xs tracking-[0.25em] text-[#e5191a]">ЭКСПЕРТНЫЙ БЛОГ</span>
                  </div>
                  <h2 className="font-display text-4xl font-bold text-white">СТАТЬИ</h2>
                </div>
                <button onClick={() => setPage("blog")} className="hidden md:flex items-center gap-2 text-[#e5191a] hover:text-white transition-colors font-mono text-xs tracking-widest">
                  ВСЕ СТАТЬИ <Icon name="ArrowRight" size={14} />
                </button>
              </div>
              <div className="grid md:grid-cols-3 gap-px bg-white/5">
                {BLOG_POSTS.slice(0, 3).map((post, i) => (
                  <button key={i} onClick={() => setPage("blog")} className="bg-[#0a0a0a] p-6 text-left group hover:bg-[#111] transition-all">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="font-mono text-[10px] text-[#e5191a] tracking-widest border border-[#e5191a]/30 px-2 py-0.5">{post.tag}</span>
                      <span className="font-mono text-[10px] text-white/25">{post.date}</span>
                    </div>
                    <h3 className="font-display text-lg font-medium text-white group-hover:text-[#e5191a] transition-colors mb-3 leading-snug">{post.title}</h3>
                    <p className="text-white/35 text-sm leading-relaxed">{post.excerpt}</p>
                    <div className="mt-5 flex items-center gap-2 text-[#e5191a]/50 group-hover:text-[#e5191a] transition-colors">
                      <span className="font-mono text-xs tracking-widest">ЧИТАТЬ</span>
                      <Icon name="ArrowRight" size={12} />
                    </div>
                  </button>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* ════════════════ CATEGORIES ════════════════ */}
        {page === "categories" && (
          <div className="max-w-7xl mx-auto px-6 py-12">
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-6 h-px bg-[#e5191a]" />
                <span className="font-mono text-xs tracking-[0.25em] text-[#e5191a]">КАТАЛОГ</span>
              </div>
              <h1 className="font-display text-5xl font-bold text-white">ТОВАРЫ</h1>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
              {/* Filters sidebar */}
              <aside className="lg:w-60 flex-shrink-0">
                <div className="sticky top-24 space-y-6">
                  {[
                    { label: "Тип", options: TYPES, val: filterType, set: setFilterType },
                    { label: "Размер", options: SIZES, val: filterSize, set: setFilterSize },
                    { label: "Материал", options: MATERIALS, val: filterMaterial, set: setFilterMaterial },
                    { label: "Класс прочности", options: STRENGTHS, val: filterStrength, set: setFilterStrength },
                  ].map((filter, fi) => (
                    <div key={fi}>
                      <h3 className="font-mono text-[10px] tracking-[0.2em] text-[#e5191a] mb-3 uppercase">{filter.label}</h3>
                      <div className="flex flex-wrap gap-2">
                        {filter.options.map((opt) => (
                          <button key={opt} onClick={() => filter.set(opt)}
                            className={`filter-btn px-3 py-1.5 text-xs font-mono text-white/50 ${filter.val === opt ? "active" : ""}`}>
                            {opt}
                          </button>
                        ))}
                      </div>
                      {fi < 3 && <div className="h-px bg-white/5 mt-6" />}
                    </div>
                  ))}
                  <button
                    onClick={() => { setFilterType("Все"); setFilterSize("Все"); setFilterMaterial("Все"); setFilterStrength("Все"); }}
                    className="text-xs text-white/25 hover:text-[#e5191a] font-mono tracking-widest transition-colors flex items-center gap-2 pt-2"
                  >
                    <Icon name="RotateCcw" size={12} /> СБРОСИТЬ ФИЛЬТРЫ
                  </button>
                </div>
              </aside>

              {/* Products grid */}
              <div className="flex-1">
                <div className="flex items-center justify-between mb-6">
                  <span className="font-mono text-xs text-white/25 tracking-widest">
                    НАЙДЕНО: <span className="text-[#e5191a]">{filteredProducts.length}</span> ПОЗИЦИЙ
                  </span>
                </div>
                {filteredProducts.length === 0 ? (
                  <div className="text-center py-20 text-white/20">
                    <Icon name="PackageX" size={48} className="mx-auto mb-4 opacity-30" />
                    <p className="font-display text-xl">Ничего не найдено</p>
                    <p className="text-sm mt-2 font-body">Попробуйте изменить фильтры</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                    {filteredProducts.map((product) => (
                      <div key={product.id} className="product-card bg-[#111] border border-white/5 p-5 flex flex-col">
                        <div className="flex items-start justify-between mb-4">
                          <div className="w-12 h-12 bg-[#e5191a]/8 border border-[#e5191a]/20 flex items-center justify-center">
                            <Icon name="Settings2" size={20} className="text-[#e5191a]/50" />
                          </div>
                          {product.badge && (
                            <span className={`font-mono text-[10px] px-2 py-0.5 tracking-widest border ${product.badge === "NEW" ? "bg-blue-500/10 text-blue-400 border-blue-500/30" : product.badge === "PRO" ? "bg-violet-500/10 text-violet-400 border-violet-500/30" : "bg-[#e5191a]/15 text-[#e5191a] border-[#e5191a]/30"}`}>
                              {product.badge}
                            </span>
                          )}
                        </div>
                        <h3 className="font-display font-medium text-white text-base mb-3 leading-snug flex-1">{product.name}</h3>
                        <div className="grid grid-cols-2 gap-x-4 gap-y-2 mb-4">
                          {[
                            { label: "Тип", val: product.type },
                            { label: "Размер", val: product.size },
                            { label: "Материал", val: product.material },
                            { label: "Прочность", val: product.strength },
                          ].map((attr) => (
                            <div key={attr.label}>
                              <span className="font-mono text-[10px] text-white/20 block">{attr.label}</span>
                              <span className="font-mono text-xs text-white/65">{attr.val}</span>
                            </div>
                          ))}
                        </div>
                        <div className="flex items-center justify-between pt-3 border-t border-white/5">
                          <div>
                            <span className="font-display text-xl font-bold text-[#e5191a]">{product.price} ₽</span>
                            <span className="text-white/25 text-xs ml-1 font-mono">/шт</span>
                          </div>
                          {cart[product.id] ? (
                            <div className="flex items-center gap-2">
                              <button onClick={() => removeFromCart(product.id)} className="w-7 h-7 border border-[#e5191a]/40 hover:bg-[#e5191a]/10 flex items-center justify-center text-white/60 hover:text-white transition-colors">−</button>
                              <span className="font-mono text-sm w-5 text-center text-white">{cart[product.id]}</span>
                              <button onClick={() => addToCart(product.id)} className="w-7 h-7 bg-[#e5191a] hover:bg-[#b01213] flex items-center justify-center text-white transition-colors">+</button>
                            </div>
                          ) : (
                            <button onClick={() => addToCart(product.id)}
                              className="flex items-center gap-1.5 bg-[#e5191a]/10 border border-[#e5191a]/30 hover:bg-[#e5191a] text-[#e5191a] hover:text-white px-3 py-1.5 text-xs font-mono tracking-wider transition-all">
                              <Icon name="Plus" size={12} /> В КОРЗИНУ
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ════════════════ ABOUT ════════════════ */}
        {page === "about" && (
          <div>
            <section className="relative py-28 bg-grid overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#e5191a]/6 via-transparent to-transparent" />
              <div className="absolute right-0 top-0 w-80 h-full bg-gradient-to-l from-[#e5191a]/4 to-transparent" />
              <div className="relative max-w-7xl mx-auto px-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-6 h-px bg-[#e5191a]" />
                  <span className="font-mono text-xs tracking-[0.25em] text-[#e5191a]">О КОМПАНИИ</span>
                </div>
                <h1 className="font-display text-6xl md:text-7xl font-bold text-white mb-6 leading-none">МЫ — BOLTECH</h1>
                <p className="max-w-2xl text-white/45 text-lg leading-relaxed font-body">
                  15 лет поставляем крепёж для промышленности, строительства и машиностроения. Работаем с заводами напрямую — без посредников.
                </p>
              </div>
            </section>

            <section className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="font-display text-4xl font-bold text-white mb-6">НАША ИСТОРИЯ</h2>
                <div className="space-y-5 text-white/45 font-body leading-relaxed text-sm">
                  <p>Компания основана в 2010 году группой инженеров-конструкторов, столкнувшихся с проблемой: найти сертифицированный крепёж в России было сложно и дорого.</p>
                  <p>Сегодня мы — один из ведущих дистрибьюторов крепёжных изделий с прямыми поставками с заводов Германии, Тайваня и России.</p>
                  <p>Каждая партия проходит входной контроль. Мы предоставляем все необходимые сертификаты и паспорта качества.</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { val: "2010", label: "Год основания" },
                  { val: "1 200+", label: "Позиций на складе" },
                  { val: "3 400", label: "Клиентов" },
                  { val: "98%", label: "Повторных заказов" },
                ].map((s, i) => (
                  <div key={i} className="bg-[#111] border border-white/5 hover:border-[#e5191a]/30 transition-colors p-6">
                    <div className="font-display text-3xl font-bold text-[#e5191a]">{s.val}</div>
                    <div className="text-white/35 text-sm mt-1 font-body">{s.label}</div>
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-[#0d0d0d] border-y border-white/5 py-16">
              <div className="max-w-7xl mx-auto px-6">
                <h2 className="font-display text-3xl font-bold text-white mb-10">КОМАНДА</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {[
                    { name: "Алексей Морозов", role: "Генеральный директор" },
                    { name: "Светлана Краснова", role: "Технический директор" },
                    { name: "Игорь Васильев", role: "Руководитель склада" },
                    { name: "Марина Соколова", role: "Менеджер продаж" },
                  ].map((p, i) => (
                    <div key={i} className="group">
                      <div className="aspect-square bg-[#e5191a]/4 border border-white/5 group-hover:border-[#e5191a]/30 transition-colors mb-4 flex items-center justify-center">
                        <div className="w-14 h-14 border border-[#e5191a]/20 rotate-45 group-hover:border-[#e5191a]/50 transition-colors" />
                      </div>
                      <h3 className="font-display font-medium text-white">{p.name}</h3>
                      <p className="text-white/30 text-sm mt-0.5 font-body">{p.role}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        )}

        {/* ════════════════ BLOG ════════════════ */}
        {page === "blog" && (
          <div className="max-w-7xl mx-auto px-6 py-12">
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-6 h-px bg-[#e5191a]" />
                <span className="font-mono text-xs tracking-[0.25em] text-[#e5191a]">ЭКСПЕРТНЫЙ КОНТЕНТ</span>
              </div>
              <h1 className="font-display text-5xl font-bold text-white">БЛОГ</h1>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5">
              {BLOG_POSTS.map((post, i) => (
                <div key={i} className="bg-[#0a0a0a] p-6 group hover:bg-[#111] transition-all cursor-pointer">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="font-mono text-[10px] text-[#e5191a] tracking-widest border border-[#e5191a]/30 px-2 py-0.5">{post.tag}</span>
                    <span className="font-mono text-[10px] text-white/25">{post.date}</span>
                  </div>
                  <h3 className="font-display text-lg font-medium text-white group-hover:text-[#e5191a] transition-colors mb-3 leading-snug">{post.title}</h3>
                  <p className="text-white/35 text-sm leading-relaxed font-body">{post.excerpt}</p>
                  <div className="mt-6 flex items-center gap-2 text-[#e5191a]/50 group-hover:text-[#e5191a] transition-colors">
                    <span className="font-mono text-xs tracking-widest">ЧИТАТЬ ДАЛЕЕ</span>
                    <Icon name="ArrowRight" size={12} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ════════════════ CONTACTS ════════════════ */}
        {page === "contacts" && (
          <div>
            <section className="relative py-24 bg-grid overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-[#e5191a]/5 to-transparent" />
              <div className="relative max-w-7xl mx-auto px-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-6 h-px bg-[#e5191a]" />
                  <span className="font-mono text-xs tracking-[0.25em] text-[#e5191a]">СВЯЗАТЬСЯ</span>
                </div>
                <h1 className="font-display text-6xl font-bold text-white leading-none">КОНТАКТЫ</h1>
              </div>
            </section>

            <section className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-16">
              <div>
                <h2 className="font-display text-2xl font-bold text-white mb-8">ОСТАВИТЬ ЗАЯВКУ</h2>
                {formSent ? (
                  <div className="border border-[#e5191a]/30 bg-[#e5191a]/5 p-10 text-center">
                    <Icon name="CheckCircle" size={44} className="text-[#e5191a] mx-auto mb-4" />
                    <h3 className="font-display text-xl text-white mb-2">ЗАЯВКА ОТПРАВЛЕНА</h3>
                    <p className="text-white/40 text-sm font-body">Свяжемся с вами в течение 2 часов</p>
                    <button onClick={() => setFormSent(false)} className="mt-6 text-[#e5191a] font-mono text-xs tracking-widest hover:text-white transition-colors">
                      ОТПРАВИТЬ ЕЩЁ
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {[
                      { label: "ИМЯ *", key: "name", type: "text", placeholder: "Ваше имя" },
                      { label: "ТЕЛЕФОН *", key: "phone", type: "tel", placeholder: "+7 (___) ___-__-__" },
                    ].map((f) => (
                      <div key={f.key}>
                        <label className="font-mono text-[10px] tracking-widest text-white/25 block mb-2">{f.label}</label>
                        <input
                          type={f.type}
                          value={contactForm[f.key as keyof typeof contactForm]}
                          onChange={(e) => setContactForm({ ...contactForm, [f.key]: e.target.value })}
                          placeholder={f.placeholder}
                          className="w-full bg-[#111] border border-white/8 focus:border-[#e5191a]/50 text-white placeholder-white/15 px-4 py-3 text-sm outline-none transition-colors font-body"
                        />
                      </div>
                    ))}
                    <div>
                      <label className="font-mono text-[10px] tracking-widest text-white/25 block mb-2">СООБЩЕНИЕ</label>
                      <textarea rows={4} value={contactForm.message}
                        onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                        placeholder="Опишите задачу или укажите нужный крепёж..."
                        className="w-full bg-[#111] border border-white/8 focus:border-[#e5191a]/50 text-white placeholder-white/15 px-4 py-3 text-sm outline-none transition-colors resize-none font-body"
                      />
                    </div>
                    <button onClick={handleSendForm} className="w-full bg-[#e5191a] hover:bg-[#b01213] text-white py-4 font-display tracking-widest text-sm transition-colors">
                      ОТПРАВИТЬ ЗАЯВКУ
                    </button>
                  </div>
                )}
              </div>

              <div className="space-y-8">
                <h2 className="font-display text-2xl font-bold text-white">РЕКВИЗИТЫ</h2>
                <div className="space-y-5">
                  {[
                    { icon: "MapPin", label: "Адрес", val: "Москва, ул. Промышленная, 15, стр. 2" },
                    { icon: "Phone", label: "Телефон", val: "+7 (495) 123-45-67" },
                    { icon: "Mail", label: "Email", val: "info@boltech.ru" },
                    { icon: "Clock", label: "Режим работы", val: "Пн–Пт: 9:00–18:00, Сб: 10:00–15:00" },
                  ].map((c, i) => (
                    <div key={i} className="flex items-start gap-4 group">
                      <div className="w-10 h-10 border border-[#e5191a]/20 group-hover:border-[#e5191a]/60 flex items-center justify-center flex-shrink-0 transition-colors">
                        <Icon name={c.icon as string} size={16} className="text-[#e5191a]" />
                      </div>
                      <div>
                        <div className="font-mono text-[10px] text-white/20 tracking-widest mb-0.5">{c.label}</div>
                        <div className="text-white/65 font-body text-sm">{c.val}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="border-t border-white/5 pt-8">
                  <h3 className="font-display text-lg font-medium text-white mb-4">ДОСТАВКА</h3>
                  <div className="space-y-3">
                    {["Самовывоз со склада в Москве", "Курьерская доставка по Москве — от 500 ₽", "ТК по всей России", "Бесплатная доставка от 50 000 ₽"].map((d, i) => (
                      <div key={i} className="flex items-center gap-3 text-white/35 text-sm font-body">
                        <div className="w-1 h-1 bg-[#e5191a] flex-shrink-0" />
                        {d}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* FOOTER */}
        <footer className="border-t border-white/5 bg-[#080808] py-12">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row items-start justify-between gap-10 mb-10">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-6 h-6 bg-[#e5191a] flex items-center justify-center rotate-45">
                    <span className="text-white font-display font-bold text-xs -rotate-45">B</span>
                  </div>
                  <span className="font-display font-semibold text-lg tracking-widest text-white">BOLTECH</span>
                </div>
                <p className="text-white/20 text-sm max-w-xs font-body">Профессиональный крепёж для промышленности и строительства</p>
              </div>
              <div className="grid grid-cols-2 gap-10">
                <div>
                  <h4 className="font-mono text-[10px] tracking-widest text-[#e5191a] mb-4">РАЗДЕЛЫ</h4>
                  {NAV_ITEMS.map((n) => (
                    <button key={n.id} onClick={() => setPage(n.id)} className="block text-white/30 hover:text-white text-sm mb-2 transition-colors font-body text-left">
                      {n.label}
                    </button>
                  ))}
                </div>
                <div>
                  <h4 className="font-mono text-[10px] tracking-widest text-[#e5191a] mb-4">КОНТАКТЫ</h4>
                  <p className="text-white/30 text-sm mb-2 font-body">+7 (495) 123-45-67</p>
                  <p className="text-white/30 text-sm mb-2 font-body">info@boltech.ru</p>
                  <p className="text-white/30 text-sm font-body">Пн–Пт: 9–18</p>
                </div>
              </div>
            </div>
            <div className="border-t border-white/5 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-white/15 text-xs font-mono">© 2026 BOLTECH. ВСЕ ПРАВА ЗАЩИЩЕНЫ.</p>
              <p className="text-white/10 text-xs font-mono tracking-widest">ПРОФЕССИОНАЛЬНЫЙ КРЕПЁЖ</p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}