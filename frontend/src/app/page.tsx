import { Contato } from "@/components/sections/contato";
import { Footer } from "@/components/sections/footer";
import { Hero } from "@/components/sections/hero";
import { Navbar } from "@/components/sections/navbar";
import { Produtos } from "@/components/sections/produtos";
import { Sobre } from "@/components/sections/sobre";
import { WhatsAppFlutuante } from "@/components/whatsapp-flutuante";

/**
 * Landing page da Starcad — página única com as quatro seções do menu:
 * Home (hero), Sobre, Produtos e Contato.
 *
 * Tudo é renderizado no servidor; só Navbar, Reveal e o formulário de Contato
 * são componentes de cliente, então o JS enviado ao navegador fica mínimo.
 */
export default function Home() {
  return (
    <>
      <Navbar />

      <main className="flex-1">
        <Hero />
        <Sobre />
        <Produtos />
        <Contato />
      </main>

      <Footer />
      <WhatsAppFlutuante />
    </>
  );
}
