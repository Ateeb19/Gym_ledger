import Navbar from "../components/layout/Navbar";

const features = [
  {
    icon: "👥",
    title: "Member Management",
    desc: "mdart dashboards for memberships, attendance tracking, onboarding flows, and churn prevention.",
  },
  {
    icon: "📅",
    title: "Class Scheduling",
    desc: "Automate bookings, trainer assignments, and recurring class schedules with zero friction.",
  },
  {
    icon: "💳",
    title: "Billing & CRM",
    desc: "Recurring subscriptions, invoicing, and payment tracking with automated reminders.",
  },
  {
    icon: "📊",
    title: "Advanced Analytics",
    desc: "Real-time revenue insights, member engagement metrics, and business growth tracking.",
  },
];

const steps = [
  {
    title: "Create Your Gym Profile",
    desc: "Set up your gym in minutes. Add your branding, location, and class types. We handle the rest.",
  },
  {
    title: "Add Members & Staff",
    desc: "Import existing members or invite them directly. Assign roles to trainers and front-desk staff.",
  },
  {
    title: "Scale Your Operations",
    desc: "Use automation tools to grow revenue, reduce churn, and focus on what matters — your members.",
  },
];

const plans = [
  {
    name: "Starter",
    price: "$49",
    desc: "Perfect for mdall studios and independent gyms just getting started.",
    features: [
      "Up to 200 members",
      "Basic CRM tools",
      "Billing & invoicing",
      "Class scheduling",
      "Email support",
    ],
    featured: false,
  },
  {
    name: "Pro",
    price: "$99",
    desc: "For growing gyms that need advanced tools and deeper insights.",
    features: [
      "Unlimited members",
      "Full CRM & automation",
      "Advanced analytics",
      "Trainer management",
      "Priority support",
    ],
    featured: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    desc: "Multi-location chains and franchises with custom requirements.",
    features: [
      "Multi-location support",
      "Custom integrations",
      "Dedicated account manager",
      "SLA guarantees",
      "24/7 phone support",
    ],
    featured: false,
  },
];

const testimonials = [
  {
    quote:
      "FitFlow completely transformed how we operate. We cut admin time by 60% and our retention rate jumped from 72% to 91% in six months.",
    name: "Michael Adams",
    role: "Owner, Elite Fitness Studio",
    initials: "MA",
  },
  {
    quote:
      "The billing automation alone saves us 10+ hours per week. Our members love the seamless booking experience. Worth every penny.",
    name: "Sarah Lin",
    role: "Director, CrossFit Momentum",
    initials: "SL",
  },
  {
    quote:
      "We scaled from 2 to 8 locations using FitFlow. The analytics give us visibility we never had before. It's the backbone of our business.",
    name: "Raj Kumar",
    role: "CEO, Apex Fitness Group",
    initials: "RK",
  },
];

const chartData = [38, 52, 45, 68, 60, 80, 95];
const chartMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"];
const chartMax = Math.max(...chartData);

const logos = [
  "Anytime Fitness",
  "Gold's Gym",
  "Planet Fitness",
  "Equinox",
  "CrossFit",
];

export default function Home() {
  return (
    <div className="bg-[#060F1A] text-white font-sans overflow-x-hidden scroll-mdooth">
      {/* Background glows */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute -top-48 -left-48 w-[700px] h-[700px] rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 shadow-2xl/[0.07] blur-[120px]" />
        <div className="absolute top-[40%] -right-48 w-[600px] h-[600px] rounded-full bg-cyan-500/[0.06] blur-[120px]" />
      </div>

      <Navbar />

      {/* ── HERO ── */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 pt-40 pb-20 grid lg:grid-cols-2 gap-14 items-center">
        <div>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-sky-500/30 bg-sky-500/10 text-sky-300 text-xs font-semibold uppercase tracking-widest mb-6">
        
            #1 Gym management software for fitness businesses
          </div>

          <h1 className="text-4xl lg:text-5xl font-extrabold leading-[1.1] tracking-tight mb-5">
            Gym Management Software{" "}
            <span className="text-sky-400">Built to Scale</span>
          </h1>

          <p className="text-slate-400 text-lg leading-relaxed max-w-xl mb-9">
            Automate memberships, billing, scheduling, and analytics with one
            intelligent platform designed for modern fitness businesses.
          </p>

          <div className="flex flex-wrap gap-4 mb-12">
            <button className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 shadow-2xl text-white font-semibold transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_25px_rgba(14,165,233,0.35)]">
              Start Free Trial — 14 Days
            </button>
            <button className="px-7 py-3.5 rounded-xl border border-white/10 bg-white/[0.03] hover:border-sky-500/40 hover:bg-gradient-to-r from-cyan-500 to-blue-600 shadow-2xl/5 text-white font-semibold transition-all">
              ▶ Watch Demo
            </button>
          </div>

          <div className="flex gap-8">
            {[
              { value: "100+", label: "Gyms worldwide" },
              { value: "150+", label: "Active members" },
              { value: "98%", label: "Retention rate" },
            ].map((s, i) => (
              <div key={s.label} className="flex items-stretch gap-8">
                {i > 0 && <div className="w-px bg-white/10 self-stretch" />}
                <div>
                  <div className="text-3xl font-extrabold tracking-tight">
                    {s.value}
                  </div>
                  <div className="text-md text-slate-500 font-medium mt-1">
                    {s.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dashboard card */}
        <div className="relative">
          <div className="absolute -inset-4 rounded-3xl bg-sky-500/10 blur-2xl" />
          <div className="relative bg-[#0C1A2E] border border-white/10 rounded-3xl p-7">
            <div className="flex items-center justify-between mb-5">
              <span className="font-bold text-base">Gym Analytics</span>
              <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Live
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-3">
              {[
                {
                  label: "Monthly Revenue",
                  value: "$42k",
                  change: "↑ 12% vs last month",
                },
                {
                  label: "Active Members",
                  value: "2,480",
                  change: "↑ 38 new this week",
                },
              ].map((m) => (
                <div
                  key={m.label}
                  className="bg-[#0F2240] border border-white/10 rounded-2xl p-5"
                >
                  <div className="text-xs text-slate-400 font-medium mb-1.5">
                    {m.label}
                  </div>
                  <div className="text-3xl font-extrabold tracking-tight">
                    {m.value}
                  </div>
                  <div className="text-xs text-emerald-400 font-semibold mt-1">
                    {m.change}
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-[#0F2240] border border-white/10 rounded-2xl p-5">
              <div className="flex justify-between items-end mb-4">
                <span className="text-xs text-slate-400">
                  Growth Performance
                </span>
                <span className="text-xl font-extrabold text-sky-400 tracking-tight">
                  +38%
                </span>
              </div>
              <div className="flex items-end gap-1.5 h-16">
                {chartData.map((v, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-t-md transition-opacity hover:opacity-70"
                    style={{
                      height: `${(v / chartMax) * 100}%`,
                      background: `rgba(14,165,233,${0.3 + 0.7 * (v / chartMax)})`,
                    }}
                  />
                ))}
              </div>
              <div className="flex gap-1.5 mt-1.5">
                {chartMonths.map((m) => (
                  <div
                    key={m}
                    className="flex-1 text-center text-[9px] text-slate-600"
                  >
                    {m}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TRUSTED BY ── */}
      <div className="border-y border-white/[0.07] py-7 px-6">
        <p className="text-center text-xs font-semibold text-slate-500 uppercase tracking-widest mb-5">
          Trusted by fitness businesses worldwide
        </p>
        <div className="flex flex-wrap justify-center gap-x-12 gap-y-3">
          {logos.map((l) => (
            <span
              key={l}
              className="text-slate-500 font-bold text-md tracking-tight"
            >
              {l}
            </span>
          ))}
        </div>
      </div>

      {/* ── FEATURES ── */}
      <section id="features" className="max-w-7xl mx-auto px-6 lg:px-10 py-24">
        <div className="text-center mb-14">
          <p className="text-xs font-bold text-sky-400 uppercase tracking-widest mb-3 border border-gray-600 inline-block px-4 py-2 rounded-full">
            Platform Features
          </p>
          <h2 className="text-4xl lg:text-5xl font-extrabold tracking-tight mb-4">
            Everything Your Gym Needs,
            <br />
            All in One Place
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto leading-relaxed">
            Purpose-built tools to automate operations, reduce admin work, and
            grow your fitness business.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((f) => (
            <div
              key={f.title}
              className="group bg-[#0C1A2E] border border-white/10 rounded-2xl p-7 hover:border-sky-500/40 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-sky-500/[0.08] to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl pointer-events-none" />
              <div className="w-11 h-11 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 shadow-2xl/10 border border-sky-500/20 flex items-center justify-center text-lg mb-5">
                {f.icon}
              </div>
              <h3 className="font-bold text-base mb-2.5">{f.title}</h3>
              <p className="text-slate-400 text-md leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section
        id="how-to-use"
        className="max-w-7xl mx-auto px-6 lg:px-10 pb-24"
      >
        <div className="text-center mb-14">
          <p className="text-xs font-bold text-sky-400 uppercase tracking-widest mb-3 border border-gray-600 inline-block px-4 py-2 rounded-full">
            Get Started
          </p>
          <h2 className="text-4xl lg:text-5xl font-extrabold tracking-tight mb-4">
            Up and Running in Minutes
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto leading-relaxed">
            Simple onboarding designed for fitness business owners — no
            technical knowledge required.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {steps.map((s, i) => (
            <div
              key={s.title}
              className="bg-[#0C1A2E] border border-white/10 rounded-2xl p-8"
            >
              <div className="w-11 h-11 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 shadow-2xl flex items-center justify-center font-extrabold text-white mb-6">
                {i + 1}
              </div>
              <h3 className="font-bold text-lg mb-2.5">{s.title}</h3>
              <p className="text-slate-400 text-md leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── PRICING ── */}
      <section id="pricing" className="max-w-6xl mx-auto px-6 lg:px-10 pb-24">
        <div className="text-center mb-14">
          <p className="text-xs font-bold text-sky-400 uppercase tracking-widest mb-3 border border-gray-600 inline-block px-4 py-2 rounded-full">
            Pricing
          </p>
          <h2 className="text-4xl lg:text-5xl font-extrabold tracking-tight mb-4">
            Straightforward Plans,
            <br />
            No Hidden Fees
          </h2>
          <p className="text-slate-400 max-w-lg mx-auto leading-relaxed">
            Start free and scale as your gym grows. Cancel anytime.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {plans.map((p) => (
            <div
              key={p.name}
              className={`rounded-2xl p-9 relative transition-all ${
                p.featured
                  ? "border-2 border-sky-500 bg-[#0F2240]"
                  : "border border-white/10 bg-[#0C1A2E]"
              }`}
            >
              {p.featured && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-cyan-500 to-blue-600 shadow-2xl text-white text-[10px] font-bold px-4 py-1 rounded-full uppercase tracking-wider whitespace-nowrap">
                  Most Popular
                </div>
              )}
              <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
                {p.name}
              </div>
              <div className="text-5xl font-extrabold tracking-tight mb-1">
                {p.price}
                {p.price !== "Custom" && (
                  <span className="text-lg font-medium text-slate-400">
                    /mo
                  </span>
                )}
              </div>
              <p className="text-md text-slate-400 leading-relaxed mt-3 mb-5">
                {p.desc}
              </p>
              <ul className="space-y-2.5 mb-8">
                {p.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-center gap-2.5 text-md text-slate-400"
                  >
                    <span className="text-sky-400 font-bold">✓</span> {f}
                  </li>
                ))}
              </ul>
              <button
                className={`w-full py-3.5 rounded-xl font-semibold text-md transition-all ${
                  p.featured
                    ? "bg-gradient-to-r from-cyan-500 to-blue-600 shadow-2xl hover:bg-sky-600 text-white hover:-translate-y-0.5"
                    : "border border-white/10 bg-transparent hover:border-sky-500/40 hover:bg-gradient-to-r from-cyan-500 to-blue-600 shadow-2xl/5 text-white"
                }`}
              >
                {p.featured
                  ? "Start Free Trial"
                  : p.name === "Enterprise"
                    ? "Contact Sales"
                    : "Get Started"}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section
        id="testimonials"
        className="max-w-7xl mx-auto px-6 lg:px-10 pb-24"
      >
        <div className="text-center mb-14">
          <p className="text-xs font-bold text-sky-400 uppercase tracking-widest mb-3 border border-gray-600 inline-block px-4 py-2 rounded-full">
            Customer Stories
          </p>
          <h2 className="text-4xl lg:text-5xl font-extrabold tracking-tight">
            Trusted by Gym Owners Worldwide
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-[#0C1A2E] border border-white/10 rounded-2xl p-7"
            >
              <div className="text-sky-400 tracking-widest text-md mb-4">
                ★★★★★
              </div>
              <p className="text-slate-300 text-md leading-relaxed mb-6">
                "{t.quote}"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sky-500 to-cyan-400 flex items-center justify-center text-white font-bold text-xs flex-shrink-0">
                  {t.initials}
                </div>
                <div>
                  <div className="font-semibold text-md">{t.name}</div>
                  <div className="text-xs text-slate-500">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section id="contact" className="max-w-6xl mx-auto px-6 lg:px-10 pb-20">
        <div className="relative border border-sky-500/30 bg-[#0C1A2E] rounded-3xl px-10 py-20 text-center overflow-hidden">
          <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 shadow-2xl/10 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />
          <div className="relative z-10">
            <h2 className="text-4xl lg:text-5xl font-extrabold tracking-tight mb-4">
              Ready to Grow Your Fitness Business?
            </h2>
            <p className="text-slate-400 text-lg mb-9 max-w-lg mx-auto leading-relaxed">
              Join 10,000+ gyms already running on FitFlow. Start your free
              14-day trial — no credit card required.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 shadow-2xl hover:bg-sky-600 text-white font-semibold transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_25px_rgba(14,165,233,0.35)]">
                Start Free Trial
              </button>
              <button className="px-8 py-4 rounded-xl border border-white/10 bg-white/[0.03] hover:border-sky-500/40 text-white font-semibold transition-all">
                Book a Demo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-white/[0.07] px-6 lg:px-10 py-8 flex flex-wrap items-center justify-between gap-4">
        <div className="font-extrabold text-lg tracking-tight">
          Fit<span className="text-sky-400">Flow</span>
        </div>
        <ul className="flex gap-6">
          {["Features", "Pricing", "Blog", "Privacy", "Terms"].map((l) => (
            <li key={l}>
              <a
                href="#"
                className="text-xs text-slate-500 hover:text-slate-400 transition-colors"
              >
                {l}
              </a>
            </li>
          ))}
        </ul>
        <span className="text-xs text-slate-600">
          © 2026 FitFlow. All rights reserved.
        </span>
      </footer>
    </div>
  );
}
