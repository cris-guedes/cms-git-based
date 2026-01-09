interface WhatsAppButtonProps {
  link: string;
}

export function WhatsAppButton({ link }: WhatsAppButtonProps) {
  return (
    <a
      className="fixed bottom-6 right-6 z-40 bg-[#25D366] hover:bg-[#20bd5a] text-white p-4 rounded-full shadow-lg flex items-center justify-center transition-transform hover:scale-110"
      href={link}
      aria-label="Contato via WhatsApp"
    >
      <span className="material-symbols-outlined text-2xl">chat</span>
    </a>
  );
}
