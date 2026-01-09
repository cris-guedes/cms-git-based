interface NavLink {
  label: string;
  link: string;
}

interface ContactInfo {
  email: string;
  phone: string;
  location: string;
}

interface BrandFooterProps {
  brandName: string;
  description: string;
  navLinks: NavLink[];
  contactInfo: ContactInfo;
}

export function BrandFooter({
  brandName,
  description,
  navLinks,
  contactInfo,
}: BrandFooterProps) {
  return (
    <footer className="bg-white dark:bg-background-brand-dark border-t border-[#f4f1f0] dark:border-[#3a2d28] pt-16 pb-8 px-4 md:px-10 lg:px-40 flex justify-center">
      <div className="max-w-[960px] w-full flex flex-col gap-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2 flex flex-col gap-4">
            <div className="flex items-center gap-3 text-text-brand-main dark:text-white">
              <span className="material-symbols-outlined text-3xl text-primary-brand">
                palette
              </span>
              <h2 className="text-xl font-bold">{brandName}</h2>
            </div>
            <p className="text-text-brand-muted dark:text-gray-400 text-sm max-w-xs leading-relaxed">
              {description}
            </p>
            <div className="flex gap-4 mt-2">
              <a
                className="size-8 flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-full text-text-brand-main dark:text-white hover:bg-primary-brand hover:text-white transition-colors"
                href="#"
              >
                <span className="material-symbols-outlined text-lg">
                  public
                </span>
              </a>
              <a
                className="size-8 flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-full text-text-brand-main dark:text-white hover:bg-primary-brand hover:text-white transition-colors"
                href="#"
              >
                <span className="material-symbols-outlined text-lg">
                  photo_camera
                </span>
              </a>
            </div>
          </div>
          <div>
            <h3 className="font-bold text-text-brand-main dark:text-white mb-4">
              Navegação
            </h3>
            <ul className="flex flex-col gap-2 text-sm text-text-brand-muted dark:text-gray-400">
              {navLinks.map((item, idx) => (
                <li key={idx}>
                  <a
                    className="hover:text-primary-brand transition-colors"
                    href={item.link}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-text-brand-main dark:text-white mb-4">
              Contato
            </h3>
            <ul className="flex flex-col gap-3 text-sm text-text-brand-muted dark:text-gray-400">
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-lg">mail</span>
                {contactInfo.email}
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-lg">call</span>
                {contactInfo.phone}
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-lg">
                  location_on
                </span>
                {contactInfo.location}
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-[#f4f1f0] dark:border-[#3a2d28] pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-text-brand-muted dark:text-gray-500">
          <p>© 2024 {brandName}. Todos os direitos reservados.</p>
          <div className="flex gap-6">
            <a className="hover:text-primary-brand" href="#">
              Termos de Uso
            </a>
            <a className="hover:text-primary-brand" href="#">
              Política de Privacidade
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
