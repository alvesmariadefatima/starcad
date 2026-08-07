import { Mail, MapPin, Phone } from "lucide-react";

import { Logo } from "@/components/brand/logo";
import { IconeFacebook, IconeInstagram, IconePinterest } from "@/components/social-icons";
import { navegacao, site } from "@/lib/site";

/** Rodapé institucional: marca, navegação, contato, redes e horários. */
export function Footer() {
  const redes = [
    { nome: "Instagram", href: site.redes.instagram, Icone: IconeInstagram },
    { nome: "Facebook", href: site.redes.facebook, Icone: IconeFacebook },
    { nome: "Pinterest", href: site.redes.pinterest, Icone: IconePinterest },
  ];

  return (
    <footer className="border-t border-border bg-white">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Marca */}
          <div className="lg:col-span-2">
            <Logo />
            <p className="mt-4 max-w-sm leading-relaxed text-muted-foreground">
              {site.descricao}
            </p>
            <ul className="mt-5 flex gap-3">
              {redes.map((rede) => (
                <li key={rede.nome}>
                  <a
                    href={rede.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Starcad no ${rede.nome}`}
                    className="inline-flex size-11 items-center justify-center rounded-2xl bg-muted text-tinta transition-colors hover:bg-rosa hover:text-white"
                  >
                    <rede.Icone className="size-5" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Navegação */}
          <nav aria-label="Rodapé">
            <h2 className="font-heading text-sm font-bold tracking-wider text-tinta uppercase">
              Navegue
            </h2>
            <ul className="mt-4 space-y-2.5">
              {navegacao.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-muted-foreground underline-offset-4 transition-colors hover:text-rosa hover:underline"
                  >
                    {item.rotulo}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contato */}
          <div>
            <h2 className="font-heading text-sm font-bold tracking-wider text-tinta uppercase">
              Contato
            </h2>
            <ul className="mt-4 space-y-3 text-muted-foreground">
              <li className="flex gap-2.5">
                <MapPin className="mt-0.5 size-4 shrink-0 text-rosa" aria-hidden="true" />
                <span>
                  {site.endereco.rua}
                  <br />
                  {site.endereco.bairro} — {site.endereco.cidade}/{site.endereco.estado}
                </span>
              </li>
              <li className="flex gap-2.5">
                <Phone className="mt-0.5 size-4 shrink-0 text-rosa" aria-hidden="true" />
                <a
                  href={`tel:+55${site.contato.telefone.replace(/\D/g, "")}`}
                  className="underline-offset-4 hover:text-rosa hover:underline"
                >
                  {site.contato.telefone}
                </a>
              </li>
              <li className="flex gap-2.5">
                <Mail className="mt-0.5 size-4 shrink-0 text-rosa" aria-hidden="true" />
                <a
                  href={`mailto:${site.contato.email}`}
                  className="underline-offset-4 hover:text-rosa hover:underline"
                >
                  {site.contato.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Horários + assinatura */}
        <div className="mt-12 flex flex-col gap-4 border-t border-border pt-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            {site.horarios
              .filter((h) => h.horas !== "Fechado")
              .map((h) => `${h.dias}: ${h.horas}`)
              .join(" · ")}
          </p>
          <p>
            © {new Date().getFullYear()} {site.nome}. Feito com papel, tinta e carinho.
          </p>
        </div>
      </div>
    </footer>
  );
}
