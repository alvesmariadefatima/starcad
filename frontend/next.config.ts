import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fixa a raiz do Turbopack neste projeto — sem isso o Next procura um
  // package-lock.json em pastas acima e emite um aviso a cada build.
  turbopack: {
    root: __dirname,
  },

  images: {
    // Formatos modernos para quando as fotos reais dos produtos entrarem.
    formats: ["image/avif", "image/webp"],
  },

  // Não expõe a versão do Next no cabeçalho de resposta.
  poweredByHeader: false,
};

export default nextConfig;
