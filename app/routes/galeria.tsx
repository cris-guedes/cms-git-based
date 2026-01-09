import type { Route } from "./+types/galeria";
import { useState } from "react";
import fs from "fs/promises";
import path from "path";
import fm from "front-matter";
import { BrandHeader } from "~/components/brand/BrandHeader";
import { BrandFooter } from "~/components/brand/BrandFooter";
import { WhatsAppButton } from "~/components/brand/WhatsAppButton";

interface GalleryContent {
  hero: {
    title: string;
    subtitle: string;
    image: string;
  };
  categories: Array<{ label: string; id: string }>;
  items: Array<{
    title: string;
    category: string;
    category_label: string;
    image: string;
  }>;
}

// Interface compartilhada com a Home para o BrandHeader/Footer
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
    { title: "Ateliê da Artesã - Galeria de Tesouros" },
    {
      name: "description",
      content:
        "Explore nossa vitrine de coleções exclusivas em crochê e biscuit.",
    },
  ];
}

export async function loader() {
  const commonPath = path.join(process.cwd(), "content", "home2.md");
  const galleryPath = path.join(process.cwd(), "content", "galeria.md");

  try {
    const commonFile = await fs.readFile(commonPath, "utf-8");
    const galleryFile = await fs.readFile(galleryPath, "utf-8");

    const commonData = fm<BrandCommonContent>(commonFile).attributes;
    const galleryData = fm<GalleryContent>(galleryFile).attributes;

    return { common: commonData, gallery: galleryData };
  } catch (error) {
    console.error("Erro ao carregar dados da galeria:", error);
    return { common: null, gallery: null };
  }
}

export default function Galeria({ loaderData }: Route.ComponentProps) {
  const { common, gallery } = loaderData;
  const [activeFilter, setActiveFilter] = useState("all");

  if (!common || !gallery) {
    return (
      <div className="flex h-screen items-center justify-center bg-background-brand-light dark:bg-background-brand-dark">
        <p className="text-text-brand-muted">Conteúdo não disponível.</p>
      </div>
    );
  }

  const filteredItems = gallery.items.filter(
    (item) => activeFilter === "all" || item.category === activeFilter
  );

  return (
    <div className="relative flex flex-col min-h-screen w-full overflow-x-hidden font-display bg-background-brand-light dark:bg-background-brand-dark text-text-brand-main dark:text-white transition-colors duration-300">
      <BrandHeader
        brandName={common.header.brand}
        navLinks={common.header.nav}
      />

      <main className="grow flex flex-col items-center w-full">
        {/* Hero Section */}
        <section className="w-full bg-background-brand-light dark:bg-background-brand-dark py-8 px-4 md:px-10">
          <div className="max-w-[1280px] mx-auto w-full">
            <div className="flex flex-col md:flex-row gap-6 items-center justify-between rounded-2xl overflow-hidden bg-card-brand-light dark:bg-card-brand-dark p-6 md:p-10 shadow-sm border border-black/5 dark:border-white/5 relative">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary-brand/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
              <div className="flex flex-col gap-4 max-w-xl z-10">
                <h1 className="text-3xl md:text-5xl font-black text-text-brand-main dark:text-white tracking-tight leading-tight">
                  {gallery.hero.title.split(" ").map((word, i) =>
                    word.toLowerCase() === "tesouros" ? (
                      <span
                        key={i}
                        className="text-primary-brand uppercase tracking-tighter"
                      >
                        {" "}
                        {word}
                      </span>
                    ) : (
                      <span key={i}> {word}</span>
                    )
                  )}
                </h1>
                <p className="text-text-brand-muted dark:text-gray-300 text-lg leading-relaxed">
                  {gallery.hero.subtitle}
                </p>
              </div>
              <div className="relative w-full md:w-1/3 aspect-video md:aspect-4/3 rounded-xl overflow-hidden shadow-lg group">
                <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent z-10"></div>
                <div
                  className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{
                    backgroundImage: `url("${gallery.hero.image}")`,
                  }}
                />
                <div className="absolute bottom-4 left-4 z-20">
                  <span className="bg-primary-brand text-white text-xs font-bold px-2 py-1 rounded-full mb-2 inline-block">
                    Coleção Ateliê
                  </span>
                  <p className="text-white font-medium">Artesanato com Alma</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Filters Section */}
        <section className="w-full px-4 md:px-10 sticky top-[73px] z-40 bg-background-brand-light/95 dark:bg-background-brand-dark/95 backdrop-blur-sm py-2">
          <div className="max-w-[1280px] mx-auto w-full border-b border-[#f4f1f0] dark:border-[#3e3430] pb-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0 w-full sm:w-auto no-scrollbar">
                {gallery.categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveFilter(cat.id)}
                    className={`flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full px-5 transition-all active:scale-95 ${
                      activeFilter === cat.id
                        ? "bg-primary-brand text-white shadow-md shadow-primary-brand/20 font-bold"
                        : "bg-white dark:bg-card-brand-dark hover:bg-gray-100 dark:hover:bg-[#3e3430] border border-gray-200 dark:border-gray-700 text-text-brand-main dark:text-gray-200 font-medium"
                    }`}
                  >
                    <span className="text-sm">{cat.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Gallery Grid */}
        <section className="w-full px-4 md:px-10 py-6 flex-1">
          <div className="max-w-[1280px] mx-auto w-full">
            <div className="grid grid-cols-1 min-[450px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredItems.map((item, idx) => (
                <div
                  key={idx}
                  className="group flex flex-col bg-card-brand-light dark:bg-card-brand-dark rounded-xl overflow-hidden border border-transparent hover:border-gray-200 dark:hover:border-gray-700 hover:shadow-xl transition-all duration-300"
                >
                  <div className="relative aspect-square overflow-hidden bg-gray-100 dark:bg-gray-800">
                    <div
                      className="w-full h-full bg-center bg-cover transition-transform duration-500 group-hover:scale-110"
                      style={{
                        backgroundImage: `url("${item.image}")`,
                      }}
                    />
                  </div>
                  <div className="p-4 flex flex-col gap-1">
                    <span className="text-xs font-bold text-primary-brand uppercase tracking-wider">
                      {item.category_label}
                    </span>
                    <h3 className="text-text-brand-main dark:text-white text-lg font-bold leading-tight group-hover:text-primary-brand transition-colors">
                      {item.title}
                    </h3>
                  </div>
                </div>
              ))}
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
