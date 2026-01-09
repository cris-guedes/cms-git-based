import type { Route } from "./+types/contato";
import fs from "fs/promises";
import path from "path";
import fm from "front-matter";
import { BrandHeader } from "~/components/brand/BrandHeader";
import { BrandFooter } from "~/components/brand/BrandFooter";
import { WhatsAppButton } from "~/components/brand/WhatsAppButton";

interface ContatoContent {
  hero: {
    title: string;
    subtitle: string;
  };
  process_section: {
    title: string;
    description: string;
    items: Array<{
      title: string;
      icon: string;
      description: string;
    }>;
  };
  contact_section: {
    title: string;
    description: string;
    whatsapp_cta: string;
    whatsapp_label: string;
    form_title: string;
    form_options: string[];
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
    { title: "Ateliê da Artesã - Contato" },
    {
      name: "description",
      content:
        "Fale com o Ateliê da Artesã. Tire suas dúvidas ou peça um orçamento personalizado.",
    },
  ];
}

export async function loader() {
  const commonPath = path.join(process.cwd(), "content", "home2.md");
  const contatoPath = path.join(process.cwd(), "content", "contato.md");

  try {
    const commonFile = await fs.readFile(commonPath, "utf-8");
    const contatoFile = await fs.readFile(contatoPath, "utf-8");

    const commonData = fm<BrandCommonContent>(commonFile).attributes;
    const contatoData = fm<ContatoContent>(contatoFile).attributes;

    return { common: commonData, contato: contatoData };
  } catch (error) {
    console.error("Erro ao carregar dados de contato:", error);
    return { common: null, contato: null };
  }
}

export default function Contato({ loaderData }: Route.ComponentProps) {
  const { common, contato } = loaderData;

  if (!common || !contato) {
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
        navLinks={common.header.nav}
      />

      <main className="grow">
        <section className="bg-white dark:bg-card-brand-dark pt-12 pb-16">
          <div className="flex flex-col items-center px-4 md:px-10 lg:px-40">
            <div className="max-w-[960px] w-full text-center flex flex-col gap-4">
              <h1 className="text-text-brand-main dark:text-white text-4xl md:text-5xl font-black leading-tight tracking-[-0.033em]">
                {contato.hero.title}
              </h1>
              <p className="text-text-brand-muted dark:text-gray-300 text-base max-w-[600px] mx-auto">
                {contato.hero.subtitle}
              </p>
            </div>
          </div>
        </section>

        <section className="bg-white dark:bg-card-brand-dark py-16">
          <div className="px-4 md:px-10 lg:px-40 flex justify-center">
            <div className="max-w-[960px] w-full flex flex-col gap-10">
              <div className="flex flex-col gap-4 text-center items-center">
                <h2 className="text-text-brand-main dark:text-white text-3xl font-bold leading-tight max-w-[720px]">
                  {contato.process_section.title}
                </h2>
                <p className="text-text-brand-muted dark:text-gray-300 text-base font-normal leading-normal max-w-[720px]">
                  {contato.process_section.description}
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-4">
                {contato.process_section.items.map(
                  (
                    item: { title: string; icon: string; description: string },
                    idx: number
                  ) => (
                    <div
                      key={idx}
                      className="flex flex-col items-center text-center gap-4 p-6 rounded-2xl bg-background-brand-light dark:bg-background-brand-dark/50 border border-transparent hover:border-primary-brand/20 transition-all"
                    >
                      <div className="size-16 rounded-full bg-primary-brand/10 flex items-center justify-center text-primary-brand mb-2">
                        <span className="material-symbols-outlined text-3xl">
                          {item.icon}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-text-brand-main dark:text-white">
                        {item.title}
                      </h3>
                      <p className="text-sm text-text-brand-muted dark:text-gray-400">
                        {item.description}
                      </p>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </section>

        <section
          className="bg-background-brand-light dark:bg-background-brand-dark py-16"
          id="contato"
        >
          <div className="px-4 md:px-10 lg:px-40 flex justify-center">
            <div className="max-w-[960px] w-full grid grid-cols-1 lg:grid-cols-2 gap-12 px-4">
              <div className="flex flex-col gap-8">
                <div className="flex flex-col gap-3">
                  <h2 className="text-text-brand-main dark:text-white text-3xl font-bold leading-tight">
                    {contato.contact_section.title}
                  </h2>
                  <p className="text-text-brand-muted dark:text-gray-300 text-base">
                    {contato.contact_section.description}
                  </p>
                </div>
                <div className="w-full">
                  <a
                    className="group flex items-center justify-between w-full p-4 bg-[#25D366] hover:bg-[#128C7E] text-white rounded-xl shadow-md transition-all duration-300 transform hover:-translate-y-1"
                    href={common.whatsapp_link}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <div className="flex items-center gap-4">
                      <div className="bg-white/20 p-2 rounded-full">
                        <span className="material-symbols-outlined text-2xl">
                          chat
                        </span>
                      </div>
                      <div className="flex flex-col text-left">
                        <span className="text-xs font-medium uppercase tracking-wider opacity-90">
                          {contato.contact_section.whatsapp_label}
                        </span>
                        <span className="text-lg font-bold">
                          {contato.contact_section.whatsapp_cta}
                        </span>
                      </div>
                    </div>
                    <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">
                      arrow_forward
                    </span>
                  </a>
                </div>
                <div className="flex flex-col gap-6">
                  <div className="flex items-center gap-4">
                    <div className="size-12 rounded-full bg-white dark:bg-card-brand-dark flex items-center justify-center text-primary-brand shadow-sm">
                      <span className="material-symbols-outlined">mail</span>
                    </div>
                    <div>
                      <p className="text-sm text-text-brand-muted dark:text-gray-400 font-medium">
                        E-mail
                      </p>
                      <p className="text-text-brand-main dark:text-white font-bold">
                        {common.footer.contact.email}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="size-12 rounded-full bg-white dark:bg-card-brand-dark flex items-center justify-center text-primary-brand shadow-sm">
                      <span className="material-symbols-outlined">call</span>
                    </div>
                    <div>
                      <p className="text-sm text-text-brand-muted dark:text-gray-400 font-medium">
                        Telefone
                      </p>
                      <p className="text-text-brand-main dark:text-white font-bold">
                        {common.footer.contact.phone}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="size-12 rounded-full bg-white dark:bg-card-brand-dark flex items-center justify-center text-primary-brand shadow-sm">
                      <span className="material-symbols-outlined">
                        location_on
                      </span>
                    </div>
                    <div>
                      <p className="text-sm text-text-brand-muted dark:text-gray-400 font-medium">
                        Localização
                      </p>
                      <p className="text-text-brand-main dark:text-white font-bold">
                        {common.footer.contact.location}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white dark:bg-card-brand-dark p-8 rounded-2xl shadow-sm border border-[#f4f1f0] dark:border-[#3a2d28]">
                <form className="flex flex-col gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label
                      className="text-sm font-bold text-text-brand-main dark:text-white"
                      htmlFor="name"
                    >
                      Nome
                    </label>
                    <input
                      className="h-12 w-full rounded-lg border border-[#e6e0dd] dark:border-[#4a3d38] bg-background-brand-light dark:bg-background-brand-dark px-4 text-text-brand-main dark:text-white placeholder:text-text-brand-muted focus:border-primary-brand focus:ring-1 focus:ring-primary-brand outline-none transition-all"
                      id="name"
                      placeholder="Seu nome completo"
                      type="text"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label
                      className="text-sm font-bold text-text-brand-main dark:text-white"
                      htmlFor="email"
                    >
                      E-mail
                    </label>
                    <input
                      className="h-12 w-full rounded-lg border border-[#e6e0dd] dark:border-[#4a3d38] bg-background-brand-light dark:bg-background-brand-dark px-4 text-text-brand-main dark:text-white placeholder:text-text-brand-muted focus:border-primary-brand focus:ring-1 focus:ring-primary-brand outline-none transition-all"
                      id="email"
                      placeholder="seu@email.com"
                      type="email"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label
                      className="text-sm font-bold text-text-brand-main dark:text-white"
                      htmlFor="subject"
                    >
                      {contato.contact_section.form_title}
                    </label>
                    <select
                      className="h-12 w-full rounded-lg border border-[#e6e0dd] dark:border-[#4a3d38] bg-background-brand-light dark:bg-background-brand-dark px-4 text-text-brand-main dark:text-white focus:border-primary-brand focus:ring-1 focus:ring-primary-brand outline-none transition-all appearance-none"
                      id="subject"
                    >
                      {contato.contact_section.form_options.map(
                        (option: string, idx: number) => (
                          <option key={idx}>{option}</option>
                        )
                      )}
                    </select>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label
                      className="text-sm font-bold text-text-brand-main dark:text-white"
                      htmlFor="message"
                    >
                      Mensagem
                    </label>
                    <textarea
                      className="w-full rounded-lg border border-[#e6e0dd] dark:border-[#4a3d38] bg-background-brand-light dark:bg-background-brand-dark p-4 text-text-brand-main dark:text-white placeholder:text-text-brand-muted focus:border-primary-brand focus:ring-1 focus:ring-primary-brand outline-none transition-all resize-none"
                      id="message"
                      placeholder="Conte um pouco sobre o que você deseja e os detalhes da sua ideia..."
                      rows={4}
                    ></textarea>
                  </div>
                  <button
                    className="mt-2 flex w-full items-center justify-center rounded-lg bg-primary-brand h-12 text-white font-bold hover:bg-primary-brand/90 transition-colors shadow-md"
                    type="button"
                  >
                    Enviar Mensagem
                  </button>
                </form>
              </div>
            </div>
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
