import { IconeWhatsApp } from "@/components/social-icons";
import { linkWhatsApp } from "@/lib/site";

/**
 * Botão flutuante de WhatsApp, fixo no canto inferior direito.
 * Componente de servidor (sem JS enviado ao navegador) — é só um link.
 */
export function WhatsAppFlutuante() {
  return (
    <a
      href={linkWhatsApp}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Conversar com a Starcad no WhatsApp"
      className="group fixed right-4 bottom-4 z-50 inline-flex items-center gap-2 rounded-full bg-[#25d366] py-3 pr-4 pl-3.5 font-semibold text-white shadow-xl shadow-[#25d366]/30 transition-transform hover:scale-105 focus-visible:ring-3 focus-visible:ring-[#25d366]/50 focus-visible:outline-none sm:right-6 sm:bottom-6"
    >
      <IconeWhatsApp className="size-6" />
      <span className="hidden text-sm sm:inline">Fale no WhatsApp</span>
    </a>
  );
}
