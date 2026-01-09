import type { Route } from "./+types/home2";
import fs from "fs/promises";
import path from "path";
import fm from "front-matter";
import { BrandHeader } from "~/components/brand/BrandHeader";
import { BrandFooter } from "~/components/brand/BrandFooter";
import { WhatsAppButton } from "~/components/brand/WhatsAppButton";

// Defina a interface para o conteúdo do Ateliê
interface Home2Content {
  header: {
    brand: string;
    nav: Array<{ label: string; link: string }>;
  };
  hero: {
    title: string;
    subtitle: string;
    cta_primary_text: string;
    cta_primary_link: string;
    cta_secondary_text: string;
    cta_secondary_link: string;
    image: string;
  };
  features_section: {
    title: string;
    description: string;
    items: Array<{
      category: string;
      icon: string;
      description: string;
      image: string;
      benefits: string[];
    }>;
  };
  about: {
    badge: string;
    title: string;
    content: string[];
    cta_text: string;
    cta_link: string;
    image: string;
    rating_value: string;
    rating_text: string;
  };
  testimonials_section: {
    title: string;
    description: string;
    items: Array<{
      name: string;
      relation: string;
      quote: string;
      avatar: string;
    }>;
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
    { title: "Ateliê da Artesã - Sapatinhos de Crochê e Biscuit" },
    {
      name: "description",
      content:
        "Sapatinhos de crochê delicados e topos de bolo personalizados em biscuit para tornar o dia do seu bebê ainda mais especial.",
    },
  ];
}

export async function loader() {
  const filePath = path.join(process.cwd(), "content", "home2.md");
  try {
    const fileContent = await fs.readFile(filePath, "utf-8");
    const { attributes } = fm<Home2Content>(fileContent);
    return { content: attributes };
  } catch (error) {
    console.error("Erro ao carregar conteúdo do home2:", error);
    return { content: null };
  }
}

export default function Home2({ loaderData }: Route.ComponentProps) {
  const { content } = loaderData;

  if (!content) {
    return (
      <div className="flex h-screen items-center justify-center bg-background-brand-light dark:bg-background-brand-dark">
        <p className="text-text-brand-muted">
          Conteúdo não encontrado. Configure o arquivo content/home2.md.
        </p>
      </div>
    );
  }

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden font-display bg-background-brand-light dark:bg-background-brand-dark text-text-brand-main dark:text-white transition-colors duration-300">
      <BrandHeader
        brandName={content.header.brand}
        navLinks={content.header.nav}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="px-4 py-8 md:px-10 lg:px-40 flex justify-center">
          <div className="flex flex-col max-w-[960px] w-full">
            <div className="@container">
              <div className="flex flex-col-reverse gap-6 py-6 md:py-10 @[480px]:gap-8 @[864px]:flex-row items-center">
                <div className="flex flex-col gap-6 w-full @[864px]:w-1/2 justify-center">
                  <div className="flex flex-col gap-4 text-left">
                    <h1 className="text-4xl md:text-5xl font-black leading-tight tracking-[-0.033em] text-text-brand-main dark:text-white">
                      {content.hero.title}
                    </h1>
                    <h2 className="text-text-brand-muted dark:text-gray-300 text-base md:text-lg font-normal leading-relaxed">
                      {content.hero.subtitle}
                    </h2>
                  </div>
                  <div className="flex gap-4">
                    <a
                      href={content.hero.cta_primary_link}
                      className="flex items-center justify-center rounded-lg h-12 px-6 bg-primary-brand hover:bg-primary-brand-dark transition-colors text-white text-base font-bold tracking-[0.015em]"
                    >
                      {content.hero.cta_primary_text}
                    </a>
                    <a
                      href={content.hero.cta_secondary_link}
                      className="flex items-center justify-center rounded-lg h-12 px-6 bg-transparent border border-gray-300 dark:border-gray-600 hover:border-primary-brand hover:text-primary-brand transition-colors text-text-brand-main dark:text-white text-base font-bold tracking-[0.015em]"
                    >
                      {content.hero.cta_secondary_text}
                    </a>
                  </div>
                </div>
                <div className="w-full @[864px]:w-1/2 aspect-4/3 rounded-2xl overflow-hidden shadow-lg transform rotate-1 hover:rotate-0 transition-transform duration-500">
                  <div
                    className="w-full h-full bg-center bg-cover bg-no-repeat"
                    style={{
                      backgroundImage: `url("${content.hero.image}")`,
                    }}
                    role="img"
                    aria-label={content.hero.title}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="bg-card-brand-light dark:bg-card-brand-dark py-16 px-4 md:px-10 lg:px-40 flex justify-center">
          <div className="max-w-[960px] w-full flex flex-col gap-16">
            <div className="flex flex-col gap-4 text-center md:text-left">
              <h2 className="text-3xl font-bold text-text-brand-main dark:text-white tracking-tight">
                {content.features_section.title}
              </h2>
              <p className="text-text-brand-muted dark:text-gray-400 text-lg max-w-[720px]">
                {content.features_section.description}
              </p>
            </div>

            {content.features_section.items.map((item, idx) => (
              <div
                key={idx}
                className="grid md:grid-cols-2 gap-8 md:gap-12 items-center"
              >
                <div
                  className={`overflow-hidden rounded-2xl shadow-lg aspect-square md:aspect-4/3 ${
                    idx % 2 !== 0 ? "md:order-2" : ""
                  }`}
                >
                  <div
                    className="w-full h-full bg-cover bg-center transition-transform duration-700 hover:scale-105"
                    style={{
                      backgroundImage: `url("${item.image}")`,
                    }}
                    role="img"
                    aria-label={item.category}
                  />
                </div>
                <div
                  className={`flex flex-col gap-5 ${
                    idx % 2 !== 0 ? "md:order-1" : ""
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="p-2 bg-primary-brand/10 rounded-full text-primary-brand">
                      <span className="material-symbols-outlined text-xl">
                        {item.icon}
                      </span>
                    </span>
                    <h3 className="text-2xl font-bold text-text-brand-main dark:text-white">
                      {item.category}
                    </h3>
                  </div>
                  <p className="text-text-brand-muted dark:text-gray-400 leading-relaxed">
                    {item.description}
                  </p>
                  <ul className="flex flex-col gap-3 mt-2">
                    {item.benefits.map((benefit, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-3">
                        <span className="material-symbols-outlined text-primary-brand text-xl">
                          check_circle
                        </span>
                        <span className="text-sm text-text-brand-muted dark:text-gray-400 font-medium">
                          {benefit}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* About Section */}
        <section className="bg-[#fff5f2] dark:bg-card-brand-dark/50 py-16 px-4 md:px-10 lg:px-40 flex justify-center">
          <div className="max-w-[960px] w-full grid md:grid-cols-2 gap-12 items-center">
            <div className="relative order-2 md:order-1">
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary-brand/20 rounded-full blur-xl"></div>
              <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-4/5 md:aspect-square">
                <div
                  className="w-full h-full bg-cover bg-center"
                  style={{
                    backgroundImage: `url("${content.about.image}")`,
                  }}
                  role="img"
                  aria-label="Sobre a Artesã"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white dark:bg-card-brand-dark p-4 rounded-xl shadow-lg max-w-[200px] hidden md:block">
                <div className="flex items-center gap-2 mb-1">
                  <span className="material-symbols-outlined text-yellow-500">
                    star
                  </span>
                  <span className="font-bold dark:text-white">
                    {content.about.rating_value}
                  </span>
                </div>
                <p className="text-xs text-text-brand-muted dark:text-gray-400">
                  {content.about.rating_text}
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-6 order-1 md:order-2">
              <div className="inline-flex items-center gap-2 text-primary-brand font-bold text-sm tracking-widest uppercase">
                <span className="w-8 h-[2px] bg-primary-brand"></span>
                {content.about.badge}
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-text-brand-main dark:text-white">
                {content.about.title}
              </h2>
              {content.about.content.map((p, idx) => (
                <p
                  key={idx}
                  className="text-text-brand-muted dark:text-gray-300 leading-relaxed"
                >
                  {p}
                </p>
              ))}
              <div className="pt-4">
                <button className="text-text-brand-main dark:text-white font-bold border-b-2 border-primary-brand pb-1 hover:text-primary-brand transition-colors">
                  {content.about.cta_text}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 px-4 md:px-10 lg:px-40 flex justify-center bg-card-brand-light dark:bg-card-brand-dark">
          <div className="max-w-[960px] w-full flex flex-col items-center gap-12">
            <div className="text-center max-w-2xl">
              <h2 className="text-3xl font-bold text-text-brand-main dark:text-white mb-4">
                {content.testimonials_section.title}
              </h2>
              <p className="text-text-brand-muted dark:text-gray-400">
                {content.testimonials_section.description}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
              {content.testimonials_section.items.map((testimonial, idx) => (
                <div
                  key={idx}
                  className="bg-background-brand-light dark:bg-background-brand-dark p-6 rounded-xl flex flex-col gap-4"
                >
                  <div className="flex text-yellow-500 gap-1 text-sm">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className="material-symbols-outlined fill-current"
                      >
                        star
                      </span>
                    ))}
                  </div>
                  <p className="text-text-brand-main dark:text-gray-200 italic">
                    "{testimonial.quote}"
                  </p>
                  <div className="flex items-center gap-3 mt-auto pt-2">
                    <div
                      className="size-10 rounded-full bg-gray-300 bg-cover bg-center"
                      style={{
                        backgroundImage: `url("${testimonial.avatar}")`,
                      }}
                      role="img"
                      aria-label={`Portrait of ${testimonial.name}`}
                    />
                    <div>
                      <p className="text-sm font-bold text-text-brand-main dark:text-white">
                        {testimonial.name}
                      </p>
                      <p className="text-xs text-text-brand-muted">
                        {testimonial.relation}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <BrandFooter
        brandName={content.header.brand}
        description={content.footer.description}
        navLinks={content.footer.nav}
        contactInfo={content.footer.contact}
      />

      <WhatsAppButton link={content.whatsapp_link} />
    </div>
  );
}
