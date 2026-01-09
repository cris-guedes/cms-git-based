import type { Route } from "./+types/sobre";
import fs from "fs/promises";
import path from "path";
import fm from "front-matter";
import { BrandHeader } from "~/components/brand/BrandHeader";
import { BrandFooter } from "~/components/brand/BrandFooter";
import { WhatsAppButton } from "~/components/brand/WhatsAppButton";

interface SobreContent {
  hero: {
    badge: string;
    title: string;
    subtitle: string;
  };
  steps_section: {
    steps: Array<{
      number: number;
      icon: string;
      title: string;
      description: string;
    }>;
  };
  info_section: {
    production: {
      title: string;
      description: string;
      items: Array<{ title: string; text: string }>;
    };
    payment: {
      title: string;
      description: string;
      methods: string[];
    };
  };
  care_section: {
    title: string;
    subtitle: string;
    categories: Array<{
      title: string;
      icon: string;
      tips: string[];
    }>;
  };
  cta_section: {
    title: string;
    text: string;
    button_text: string;
  };
}

interface BrandCommonContent {
  header: {
    brand: string;
    nav: Array<{ label: string; link: string }>;
  };
  footer: {
    description: string;
    nav: Array<{ label: string; link: string }>;
    contact: {
      email: string;
      phone: string;
      location: string;
    };
  };
  whatsapp_link: string;
}

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Ateliê da Artesã - Como Funciona" },
    {
      name: "description",
      content:
        "Entenda nosso processo de criação artesanal e como fazer sua encomenda personalizada.",
    },
  ];
}

export async function loader() {
  const commonPath = path.join(process.cwd(), "content", "home2.md");
  const sobrePath = path.join(process.cwd(), "content", "sobre.md");

  try {
    const commonFile = await fs.readFile(commonPath, "utf-8");
    const sobreFile = await fs.readFile(sobrePath, "utf-8");

    const commonData = fm<BrandCommonContent>(commonFile).attributes;
    const sobreData = fm<SobreContent>(sobreFile).attributes;

    return { common: commonData, sobre: sobreData };
  } catch (error) {
    console.error("Erro ao carregar dados do sobre:", error);
    return { common: null, sobre: null };
  }
}

export default function Sobre({ loaderData }: Route.ComponentProps) {
  const { common, sobre } = loaderData;

  if (!common || !sobre) {
    return (
      <div className="flex h-screen items-center justify-center bg-background-brand-light dark:bg-background-brand-dark">
        <p className="text-text-brand-muted">Conteúdo não disponível.</p>
      </div>
    );
  }

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden font-display bg-background-brand-light dark:bg-background-brand-dark text-text-brand-main dark:text-white transition-colors duration-300">
      <BrandHeader
        brandName={common.header.brand}
        navLinks={common.footer.nav}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="px-4 py-16 md:px-10 lg:px-40 flex justify-center text-center">
          <div className="max-w-[800px] w-full flex flex-col items-center gap-6">
            <span className="grow-0 inline-block py-1 px-3 rounded-full bg-primary-brand/10 text-primary-brand text-sm font-bold tracking-wide uppercase">
              {sobre.hero.badge}
            </span>
            <h1 className="text-4xl md:text-5xl font-black leading-tight tracking-[-0.033em] text-text-brand-main dark:text-white">
              {sobre.hero.title}
            </h1>
            <p className="text-text-brand-muted dark:text-gray-300 text-lg leading-relaxed max-w-2xl">
              {sobre.hero.subtitle}
            </p>
          </div>
        </section>

        {/* Steps Section */}
        <section className="bg-white dark:bg-card-brand-dark py-16 px-4 md:px-10 lg:px-40 flex justify-center">
          <div className="max-w-[1100px] w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {sobre.steps_section.steps.map((step, idx) => (
                <div
                  key={idx}
                  className="flex flex-col items-center text-center gap-4 relative group"
                >
                  <div className="size-16 rounded-2xl bg-primary-brand/10 text-primary-brand flex items-center justify-center mb-2 group-hover:bg-primary-brand group-hover:text-white transition-colors duration-300">
                    <span className="material-symbols-outlined text-3xl">
                      {step.icon}
                    </span>
                  </div>
                  <div className="absolute top-0 right-1/4 translate-x-1/2 -translate-y-2 size-8 bg-background-brand-light dark:bg-background-brand-dark border-2 border-primary-brand rounded-full flex items-center justify-center text-sm font-bold text-primary-brand">
                    {step.number}
                  </div>
                  <h3 className="text-xl font-bold text-text-brand-main dark:text-white">
                    {step.title}
                  </h3>
                  <p className="text-sm text-text-brand-muted dark:text-gray-400 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Info Section (Prazos e Pagamento) */}
        <section
          className="bg-brand-light/50 dark:bg-card-brand-dark/50 py-16 px-4 md:px-10 lg:px-40 flex justify-center"
          style={{ backgroundColor: "rgba(255, 245, 242, 0.5)" }}
        >
          <div className="max-w-[960px] w-full grid md:grid-cols-2 gap-8 md:gap-16">
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-3">
                <span className="p-2 bg-white dark:bg-gray-800 rounded-lg text-primary-brand shadow-sm">
                  <span className="material-symbols-outlined text-xl">
                    calendar_month
                  </span>
                </span>
                <h2 className="text-2xl font-bold text-text-brand-main dark:text-white">
                  {sobre.info_section.production.title}
                </h2>
              </div>
              <p className="text-text-brand-muted dark:text-gray-400 text-sm">
                {sobre.info_section.production.description}
              </p>
              <div className="space-y-4">
                {sobre.info_section.production.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-white dark:bg-card-brand-dark p-4 rounded-xl shadow-sm border-l-4 border-primary-brand"
                  >
                    <h4 className="font-bold text-text-brand-main dark:text-white mb-1">
                      {item.title}
                    </h4>
                    <p className="text-sm text-text-brand-muted dark:text-gray-400">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-3">
                <span className="p-2 bg-white dark:bg-gray-800 rounded-lg text-primary-brand shadow-sm">
                  <span className="material-symbols-outlined text-xl">
                    payments
                  </span>
                </span>
                <h2 className="text-2xl font-bold text-text-brand-main dark:text-white">
                  {sobre.info_section.payment.title}
                </h2>
              </div>
              <p className="text-text-brand-muted dark:text-gray-400 text-sm">
                {sobre.info_section.payment.description}
              </p>
              <div className="bg-white dark:bg-card-brand-dark p-6 rounded-xl shadow-sm flex flex-col gap-4">
                <ul className="space-y-3">
                  {sobre.info_section.payment.methods.map((method, idx) => (
                    <li
                      key={idx}
                      className="flex items-center gap-3 text-text-brand-main dark:text-white font-medium"
                    >
                      <span className="material-symbols-outlined text-green-500">
                        check_circle
                      </span>
                      {method}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Care Section */}
        <section className="bg-white dark:bg-card-brand-dark py-16 px-4 md:px-10 lg:px-40 flex justify-center">
          <div className="max-w-[960px] w-full flex flex-col gap-10">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-text-brand-main dark:text-white mb-4">
                {sobre.care_section.title}
              </h2>
              <p className="text-text-brand-muted dark:text-gray-400 max-w-2xl mx-auto">
                {sobre.care_section.subtitle}
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {sobre.care_section.categories.map((cat, idx) => (
                <div
                  key={idx}
                  className="bg-background-brand-light dark:bg-background-brand-dark p-8 rounded-2xl border border-gray-100 dark:border-gray-800 hover:border-primary-brand/30 transition-colors"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <span className="material-symbols-outlined text-primary-brand text-3xl">
                      {cat.icon}
                    </span>
                    <h3 className="text-xl font-bold text-text-brand-main dark:text-white">
                      {cat.title}
                    </h3>
                  </div>
                  <ul className="flex flex-col gap-4">
                    {cat.tips.map((tip, tIdx) => (
                      <li key={tIdx} className="flex items-start gap-3">
                        <span className="material-symbols-outlined text-primary-brand text-sm mt-1">
                          favorite
                        </span>
                        <span className="text-sm text-text-brand-muted dark:text-gray-400">
                          {tip}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-20 px-4 md:px-10 lg:px-40 flex justify-center bg-background-brand-light dark:bg-background-brand-dark border-t border-[#f4f1f0] dark:border-[#3a2d28]">
          <div className="max-w-[720px] w-full flex flex-col items-center text-center gap-8">
            <h2 className="text-3xl md:text-4xl font-bold text-text-brand-main dark:text-white">
              {sobre.cta_section.title}
            </h2>
            <p className="text-text-brand-muted dark:text-gray-300 text-lg">
              {sobre.cta_section.text}
            </p>
            <a
              className="inline-flex items-center justify-center gap-2 rounded-full h-14 px-8 bg-[#25D366] hover:bg-[#1fb655] transition-transform hover:scale-105 text-white text-lg font-bold tracking-[0.015em] shadow-lg shadow-green-200 dark:shadow-none"
              href={common.whatsapp_link}
            >
              <span className="material-symbols-outlined">chat</span>
              {sobre.cta_section.button_text}
            </a>
          </div>
        </section>
      </main>

      <BrandFooter
        brandName={common.header.brand}
        description={common.footer.description}
        navLinks={common.footer.nav}
        contactInfo={common.footer.contact}
      />

      <WhatsAppButton link={common.whatsapp_link} />
    </div>
  );
}
