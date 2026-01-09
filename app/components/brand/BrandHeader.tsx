import { useState } from "react";

interface NavLink {
  label: string;
  link: string;
}

interface BrandHeaderProps {
  brandName: string;
  navLinks: NavLink[];
}

export function BrandHeader({ brandName, navLinks }: BrandHeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between border-b border-solid border-b-[#f4f1f0] dark:border-b-[#3a2d28] bg-white/90 dark:bg-background-brand-dark/90 backdrop-blur-md px-6 py-4 lg:px-10">
      <div className="flex items-center gap-3 text-text-brand-main dark:text-white">
        <div className="size-8 text-primary-brand flex items-center justify-center">
          <span className="material-symbols-outlined text-3xl">palette</span>
        </div>
        <h2 className="text-xl font-bold leading-tight tracking-[-0.015em]">
          {brandName}
        </h2>
      </div>

      <div className="hidden md:flex flex-1 justify-end gap-8 items-center">
        <nav className="flex items-center gap-6 lg:gap-9">
          {navLinks.map((item, idx) => (
            <a
              key={idx}
              className="text-sm font-medium hover:text-primary-brand transition-colors"
              href={item.link}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>

      <button
        className="md:hidden text-text-brand-main dark:text-white"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        aria-label="Toggle menu"
      >
        <span className="material-symbols-outlined">menu</span>
      </button>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-white dark:bg-background-brand-dark p-6 md:hidden">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-3 text-text-brand-main dark:text-white">
              <span className="material-symbols-outlined text-3xl text-primary-brand">
                palette
              </span>
              <h2 className="text-xl font-bold">{brandName}</h2>
            </div>
            <button onClick={() => setMobileMenuOpen(false)}>
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>
          <nav className="flex flex-col gap-6">
            {navLinks.map((item, idx) => (
              <a
                key={idx}
                className="text-lg font-bold hover:text-primary-brand transition-colors"
                href={item.link}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
