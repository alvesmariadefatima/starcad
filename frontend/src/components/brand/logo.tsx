import { cn } from "@/lib/utils";

/**
 * Logo da Starcad em SVG inline: estrela (star) sobre um caderno (card/papel).
 * Vetorial = nítido em qualquer tela, zero requisição de rede e some do LCP.
 *
 * TODO(cliente): se a papelaria já tiver logo fechado, trocar o <svg> abaixo
 * pelo arquivo oficial (.svg em /public) mantendo o mesmo tamanho e o texto.
 */
export function Logo({
  className,
  comTexto = true,
}: {
  className?: string;
  comTexto?: boolean;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <svg
        viewBox="0 0 48 48"
        role="img"
        aria-label="Logo da Starcad"
        className="size-9 shrink-0 drop-shadow-sm"
      >
        {/* caderno */}
        <rect x="6" y="5" width="36" height="38" rx="10" fill="#ff4d80" />
        <rect x="6" y="5" width="9" height="38" rx="6" fill="#ff8a3d" />
        {/* espiral */}
        <g fill="#fffaf2">
          <circle cx="10.5" cy="14" r="1.8" />
          <circle cx="10.5" cy="24" r="1.8" />
          <circle cx="10.5" cy="34" r="1.8" />
        </g>
        {/* estrela */}
        <path
          d="M28.5 14.5l3.1 6.4 7 1-5 4.9 1.2 6.9-6.3-3.3-6.2 3.3 1.2-6.9-5-4.9 7-1z"
          fill="#ffc93c"
        />
      </svg>
      {comTexto && (
        <span className="font-heading text-xl leading-none font-semibold tracking-tight text-tinta">
          Star<span className="text-rosa">cad</span>
        </span>
      )}
    </span>
  );
}
