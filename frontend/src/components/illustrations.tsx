/**
 * Ilustrações vetoriais dos produtos, desenhadas com a paleta da marca.
 *
 * Por que SVG inline em vez de fotos: zero requisições extras, nada para
 * carregar em lazy, sem layout shift e nítido em qualquer densidade de tela —
 * ótimo para os Core Web Vitals.
 *
 * TODO(cliente): ao receber as fotos reais dos produtos, trocar cada <svg> por
 * <Image src="/produtos/xxx.webp" alt="..." width={480} height={320} loading="lazy" />
 * (formato WebP, ~480px de largura, mantendo a proporção 3:2 usada aqui).
 */

type IlustracaoProps = { className?: string };

const base = "h-full w-full";

/** Cadernos empilhados com elástico e marcador. */
export function IlustracaoCadernos({ className }: IlustracaoProps) {
  return (
    <svg viewBox="0 0 240 160" className={className ?? base} aria-hidden="true">
      <rect x="34" y="96" width="150" height="34" rx="8" fill="#35c3f3" />
      <rect x="34" y="96" width="150" height="12" rx="6" fill="#5ad0f7" />
      <rect x="52" y="42" width="150" height="60" rx="10" fill="#ff8a3d" />
      <rect x="52" y="42" width="16" height="60" rx="8" fill="#ffa663" />
      <rect x="150" y="42" width="10" height="60" fill="#ffc93c" />
      <g fill="#fffaf2">
        <circle cx="60" cy="56" r="3" />
        <circle cx="60" cy="72" r="3" />
        <circle cx="60" cy="88" r="3" />
      </g>
      <path d="M186 42h10v34l-5-6-5 6z" fill="#ff4d80" />
    </svg>
  );
}

/** Copo com lápis, caneta e pincel. */
export function IlustracaoCanetas({ className }: IlustracaoProps) {
  return (
    <svg viewBox="0 0 240 160" className={className ?? base} aria-hidden="true">
      {/* lápis */}
      <g transform="rotate(-12 96 80)">
        <rect x="80" y="30" width="16" height="70" fill="#ffc93c" />
        <path d="M80 30l8-14 8 14z" fill="#ffe6a3" />
        <path d="M84 20l4-4 4 4z" fill="#2f2a45" />
        <rect x="80" y="100" width="16" height="10" fill="#ff8a3d" />
      </g>
      {/* caneta */}
      <g transform="rotate(9 140 80)">
        <rect x="132" y="26" width="16" height="74" rx="4" fill="#ff4d80" />
        <path d="M132 26l8-12 8 12z" fill="#ff9ab8" />
        <rect x="136" y="30" width="3" height="24" rx="1.5" fill="#fffaf2" />
      </g>
      {/* pincel */}
      <g transform="rotate(24 176 84)">
        <rect x="168" y="44" width="12" height="60" rx="4" fill="#3fcfa4" />
        <path d="M168 44h12l-6-16z" fill="#9b7bf2" />
      </g>
      {/* copo */}
      <path d="M62 96h116l-12 44a8 8 0 01-8 6H82a8 8 0 01-8-6z" fill="#35c3f3" />
      <rect x="58" y="88" width="124" height="16" rx="8" fill="#5ad0f7" />
    </svg>
  );
}

/** Rolos de washi tape e adesivos recortados. */
export function IlustracaoAdesivos({ className }: IlustracaoProps) {
  return (
    <svg viewBox="0 0 240 160" className={className ?? base} aria-hidden="true">
      <g>
        <circle cx="76" cy="92" r="40" fill="#ff5c8a" />
        <circle cx="76" cy="92" r="16" fill="#fffaf2" />
        <path d="M36 92h80" stroke="#ff9ab8" strokeWidth="6" strokeDasharray="10 8" />
      </g>
      <g>
        <circle cx="150" cy="104" r="30" fill="#35c3f3" />
        <circle cx="150" cy="104" r="12" fill="#fffaf2" />
        <path d="M120 104h60" stroke="#8ddffb" strokeWidth="5" strokeDasharray="8 7" />
      </g>
      {/* adesivos soltos */}
      <path
        d="M170 32l6.4 13 14.3 2-10.3 10.1 2.4 14.2-12.8-6.7-12.8 6.7 2.4-14.2L149.3 47l14.3-2z"
        fill="#ffc93c"
      />
      <path d="M96 26a18 18 0 11-.1 0z" fill="#3fcfa4" />
      <path d="M88 34l6 6 10-12" stroke="#fffaf2" strokeWidth="5" fill="none" strokeLinecap="round" />
    </svg>
  );
}

/** Caixa de presente com laço e tag personalizada. */
export function IlustracaoPresentes({ className }: IlustracaoProps) {
  return (
    <svg viewBox="0 0 240 160" className={className ?? base} aria-hidden="true">
      <rect x="60" y="70" width="120" height="70" rx="10" fill="#9b7bf2" />
      <rect x="60" y="60" width="120" height="22" rx="8" fill="#b39cf7" />
      <rect x="108" y="60" width="24" height="80" fill="#ffc93c" />
      <path d="M120 60c-14 0-26-6-26-16s16-8 26 16z" fill="#ff4d80" />
      <path d="M120 60c14 0 26-6 26-16s-16-8-26 16z" fill="#ff4d80" />
      <circle cx="120" cy="58" r="7" fill="#ff8a3d" />
      {/* tag */}
      <g transform="rotate(-14 186 96)">
        <path d="M170 84h34v28h-34l-10-14z" fill="#fffaf2" stroke="#ece2d5" strokeWidth="3" />
        <circle cx="168" cy="98" r="3" fill="#35c3f3" />
        <path d="M178 93h18M178 103h12" stroke="#35c3f3" strokeWidth="4" strokeLinecap="round" />
      </g>
    </svg>
  );
}

/** Mochila com régua, tesoura e caderno. */
export function IlustracaoEscolar({ className }: IlustracaoProps) {
  return (
    <svg viewBox="0 0 240 160" className={className ?? base} aria-hidden="true">
      <path d="M74 62a34 34 0 0168 0v66a10 10 0 01-10 10H84a10 10 0 01-10-10z" fill="#3fcfa4" />
      <path d="M74 96h68v20H74z" fill="#2fb994" />
      <rect x="92" y="100" width="32" height="12" rx="6" fill="#ffc93c" />
      <path d="M96 62a12 12 0 0124 0" stroke="#fffaf2" strokeWidth="6" fill="none" strokeLinecap="round" />
      {/* régua */}
      <g transform="rotate(18 178 92)">
        <rect x="164" y="46" width="20" height="92" rx="5" fill="#35c3f3" />
        <g stroke="#fffaf2" strokeWidth="3" strokeLinecap="round">
          <path d="M164 60h9M164 74h9M164 88h9M164 102h9M164 116h9" />
        </g>
      </g>
      {/* clipe */}
      <path
        d="M46 78v26a10 10 0 0020 0V74a6 6 0 00-12 0v28"
        stroke="#ff4d80"
        strokeWidth="7"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Papelaria corporativa: envelope, papel timbrado e carimbo. */
export function IlustracaoCorporativa({ className }: IlustracaoProps) {
  return (
    <svg viewBox="0 0 240 160" className={className ?? base} aria-hidden="true">
      <g transform="rotate(-8 96 76)">
        <rect x="56" y="26" width="82" height="104" rx="8" fill="#fffaf2" stroke="#ece2d5" strokeWidth="3" />
        <rect x="70" y="44" width="34" height="10" rx="5" fill="#ff4d80" />
        <g stroke="#d9cec0" strokeWidth="5" strokeLinecap="round">
          <path d="M70 68h54M70 82h54M70 96h36" />
        </g>
      </g>
      <g transform="rotate(6 170 104)">
        <rect x="128" y="72" width="94" height="62" rx="8" fill="#35c3f3" />
        <path d="M128 78l47 32 47-32" stroke="#fffaf2" strokeWidth="6" fill="none" strokeLinejoin="round" />
      </g>
      {/* carimbo/selo */}
      <circle cx="182" cy="46" r="24" fill="#ffc93c" />
      <circle cx="182" cy="46" r="15" fill="none" stroke="#fffaf2" strokeWidth="4" strokeDasharray="6 5" />
    </svg>
  );
}

/** Cena decorativa do hero: caderno aberto, lápis, washi tape e estrelas. */
export function IlustracaoHero({ className }: IlustracaoProps) {
  return (
    <svg viewBox="0 0 420 360" className={className ?? base} aria-hidden="true">
      {/* mesa/base */}
      <circle cx="210" cy="190" r="150" fill="#fff3cc" />
      {/* caderno aberto */}
      <g transform="rotate(-6 210 210)">
        <rect x="82" y="150" width="256" height="130" rx="14" fill="#fffaf2" stroke="#ece2d5" strokeWidth="4" />
        <path d="M210 150v130" stroke="#ece2d5" strokeWidth="4" />
        <g stroke="#dfe9ef" strokeWidth="5" strokeLinecap="round">
          <path d="M104 180h84M104 200h84M104 220h60" />
          <path d="M232 180h84M232 200h84M232 220h60" />
        </g>
        <path
          d="M258 236l4.6 9.4 10.4 1.5-7.5 7.3 1.8 10.3-9.3-4.9-9.3 4.9 1.8-10.3-7.5-7.3 10.4-1.5z"
          fill="#ffc93c"
        />
      </g>
      {/* lápis apoiado */}
      <g transform="rotate(-30 300 120)">
        <rect x="288" y="46" width="22" height="120" rx="4" fill="#ff8a3d" />
        <path d="M288 46l11-20 11 20z" fill="#ffd9b8" />
        <path d="M293 34l6-8 6 8z" fill="#2f2a45" />
        <rect x="288" y="166" width="22" height="14" fill="#ff5c8a" />
      </g>
      {/* washi tape */}
      <g transform="rotate(12 108 268)">
        <circle cx="108" cy="268" r="40" fill="#35c3f3" />
        <circle cx="108" cy="268" r="16" fill="#fffaf2" />
        <path d="M68 268h80" stroke="#8ddffb" strokeWidth="7" strokeDasharray="10 8" />
      </g>
      {/* clipes e estrelas soltas */}
      <path
        d="M340 236v30a12 12 0 0024 0v-36a7 7 0 00-14 0v32"
        stroke="#9b7bf2"
        strokeWidth="8"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M92 76l6.4 13 14.3 2-10.3 10.1 2.4 14.2L92 108.6l-12.8 6.7 2.4-14.2L71.3 91l14.3-2z"
        fill="#3fcfa4"
      />
      <circle cx="356" cy="96" r="14" fill="#ff5c8a" />
    </svg>
  );
}
