"use client";

import { useEffect } from "react";

const exactTranslations: Record<string, string> = {
  "Cases": "Referenssit",
  "Services": "Palvelut",
  "About": "Meistä",
  "Insights": "Näkemykset",
  "Let's talk": "Keskustellaan",
  "Let’s talk": "Keskustellaan",
  "Home": "Etusivu",
  "Finland": "Suomi",
  "FAQ": "Usein kysytyt",
  "Contact": "Ota yhteyttä",
  "See all work": "Katso kaikki työt",
  "Scroll to explore": "Vieritä tutustuaksesi",
  "Selected Cases": "Valitut referenssit",
  "Selected digital product capabilities": "Valitut digitaalisen tuotekehityksen osaamisalueet",
  "Explore other cases.": "Tutustu muihin referensseihin.",
  "< DRAG >": "< VEDÄ >",
  "Business clarity": "Liiketoiminnan selkeys",
  "Technical resilience": "Tekninen toimintavarmuus",
  "Regional delivery": "Alueellinen toimitus",
  "Clear scope, priorities and decision-ready delivery": "Selkeä laajuus, prioriteetit ja päätöksentekoa tukeva toimitus",
  "Reliable architecture for real production environments": "Luotettava arkkitehtuuri todellisiin tuotantoympäristöihin",
  "Finland-focused collaboration with European reach": "Suomeen painottuva yhteistyö ja eurooppalainen ulottuvuus",
  "Accessible UX": "Saavutettava käyttökokemus",
  "GDPR-aware engineering": "GDPR-tietoinen ohjelmistokehitys",
  "Scalable architecture": "Skaalautuva arkkitehtuuri",
  "For anyone": "Kaikille",
  "Recruiters": "Rekrytoijille",
  "Product Designers": "Tuotesuunnittelijoille",
  "Product Managers": "Tuotepäälliköille",
  "Engineers": "Ohjelmistokehittäjille",
  "Intro": "Esittely",
  "AI Software Development": "Tekoälyohjelmistojen kehitys",
  "Enterprise SaaS Platform": "Yritystason SaaS-alusta",
  "Healthcare Software": "Terveydenhuollon ohjelmistot",
  "Logistics Platform": "Logistiikka-alusta",
  "Manufacturing AI": "Teollisuuden tekoäly",
  "Cloud Applications": "Pilvisovellukset",
  "Mobile Product": "Mobiilituote",
  "Retail AI Automation": "Kaupan tekoälyautomaatio",
  "Digital Transformation": "Digitaalinen transformaatio",
  "Software, AI": "Ohjelmistot ja tekoäly",
  "and digital products": "sekä digitaaliset tuotteet",
  "Intelligence Built Into the Product": "Älykkyys osana tuotetta",
  "Software That Scales With the Business": "Liiketoiminnan mukana skaalautuvat ohjelmistot",
  "Clear Experiences Across Every Screen": "Selkeä käyttökokemus kaikilla näytöillä",
  "Global Engineering, Closer Nordic Collaboration": "Globaalia osaamista, lähempää pohjoismaista yhteistyötä",
  "AI & AUTOMATION": "TEKOÄLY JA AUTOMAATIO",
  "SOFTWARE SYSTEMS": "OHJELMISTOJÄRJESTELMÄT",
  "DIGITAL PRODUCTS": "DIGITAALISET TUOTTEET",
  "EUROPEAN DELIVERY": "EUROOPPALAINEN TOIMITUS",
  "AI Strategy": "Tekoälystrategia",
  "Engineering": "Ohjelmistokehitys",
  "Operations": "Operointi",
  "Product Strategy": "Tuotestrategia",
  "Experience Design": "Kokemussuunnittelu",
  "Platform Build": "Alustan kehitys",
  "Scale & Reliability": "Skaalautuvuus ja luotettavuus",
  "Cloud Strategy": "Pilvistrategia",
  "Platform Engineering": "Alustakehitys",
  "Delivery": "Toimitus",
  "Reliability": "Luotettavuus",
  "Security": "Tietoturva",
  "Performance": "Suorituskyky",
  "Automation": "Automaatio",
  "Monitoring": "Valvonta",
  "Integrations": "Integraatiot",
  "Accessibility": "Saavutettavuus",
  "AI, software and digital products for Finland and Europe.": "Tekoälyä, ohjelmistoja ja digitaalisia tuotteita Suomeen ja Eurooppaan.",
};

const phraseTranslations: Array<[RegExp, string]> = [
  [/Finland Office/gi, "Suomen palvelut"],
  [/Finland \/ Europe/gi, "Suomi / Eurooppa"],
  [/Finland · Nordics · Europe/gi, "Suomi · Pohjoismaat · Eurooppa"],
  [/Finland & Europe/gi, "Suomi ja Eurooppa"],
  [/Finland and Europe/gi, "Suomi ja Eurooppa"],
  [/Finland-focused/gi, "Suomeen painottuva"],
  [/Nordic/gi, "pohjoismainen"],
  [/Nordics/gi, "Pohjoismaat"],
  [/Europe/gi, "Eurooppa"],
  [/Artificial Intelligence/gi, "Tekoäly"],
  [/AI software/gi, "tekoälyohjelmistot"],
  [/Custom Software Development/gi, "Räätälöity ohjelmistokehitys"],
  [/Web Application Development/gi, "Verkkosovellusten kehitys"],
  [/Mobile App Development/gi, "Mobiilisovellusten kehitys"],
  [/Cloud Application Development/gi, "Pilvisovellusten kehitys"],
  [/Enterprise AI Solutions/gi, "Yritystason tekoälyratkaisut"],
  [/AI Agents for Business/gi, "Tekoälyagentit liiketoimintaan"],
  [/SaaS Product Development/gi, "SaaS-tuotekehitys"],
  [/Digital Product Partner/gi, "digitaalisten tuotteiden kumppani"],
  [/Software Company in Finland/gi, "Ohjelmistoyritys Suomessa"],
  [/Software Company Finland/gi, "Ohjelmistoyritys Suomessa"],
  [/Digital Transformation/gi, "Digitaalinen transformaatio"],
  [/software development/gi, "ohjelmistokehitys"],
  [/software systems/gi, "ohjelmistojärjestelmät"],
  [/digital products/gi, "digitaaliset tuotteet"],
  [/web and mobile products/gi, "verkko- ja mobiilituotteet"],
  [/business outcomes/gi, "liiketoimintatulokset"],
  [/long-term growth/gi, "pitkän aikavälin kasvu"],
  [/production environments/gi, "tuotantoympäristöt"],
];

function translateText(value: string): string {
  const leading = value.match(/^\s*/)?.[0] ?? "";
  const trailing = value.match(/\s*$/)?.[0] ?? "";
  const trimmed = value.trim();

  if (!trimmed) return value;

  let translated = exactTranslations[trimmed] ?? trimmed;

  for (const [pattern, replacement] of phraseTranslations) {
    translated = translated.replace(pattern, replacement);
  }

  return `${leading}${translated}${trailing}`;
}

function translateElement(root: ParentNode) {
  const walker = document.createTreeWalker(
    root,
    NodeFilter.SHOW_TEXT,
    {
      acceptNode(node) {
        const parent = node.parentElement;
        if (!parent) return NodeFilter.FILTER_REJECT;

        const tag = parent.tagName;
        if (
          tag === "SCRIPT" ||
          tag === "STYLE" ||
          tag === "NOSCRIPT" ||
          parent.closest("[data-no-fi-translate]")
        ) {
          return NodeFilter.FILTER_REJECT;
        }

        return node.nodeValue?.trim()
          ? NodeFilter.FILTER_ACCEPT
          : NodeFilter.FILTER_REJECT;
      },
    },
  );

  const textNodes: Text[] = [];
  while (walker.nextNode()) {
    textNodes.push(walker.currentNode as Text);
  }

  for (const textNode of textNodes) {
    const original = textNode.nodeValue ?? "";
    const translated = translateText(original);
    if (translated !== original) {
      textNode.nodeValue = translated;
    }
  }

  const elements = root instanceof Element
    ? [root, ...Array.from(root.querySelectorAll("*"))]
    : Array.from(root.querySelectorAll("*"));

  for (const element of elements) {
    for (const attribute of ["aria-label", "title", "placeholder"]) {
      const value = element.getAttribute(attribute);
      if (!value) continue;

      const translated = translateText(value);
      if (translated !== value) {
        element.setAttribute(attribute, translated);
      }
    }
  }
}

export function FinnishTranslationLayer() {
  useEffect(() => {
    const isFinnish =
      window.location.pathname === "/fi" ||
      window.location.pathname.startsWith("/fi/");

    if (!isFinnish) {
      document.documentElement.lang = "en-FI";
      return;
    }

    document.documentElement.lang = "fi";
    translateElement(document.body);

    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        for (const node of Array.from(mutation.addedNodes)) {
          if (node.nodeType === Node.ELEMENT_NODE) {
            translateElement(node as Element);
          } else if (node.nodeType === Node.TEXT_NODE) {
            const textNode = node as Text;
            const original = textNode.nodeValue ?? "";
            const translated = translateText(original);
            if (translated !== original) {
              textNode.nodeValue = translated;
            }
          }
        }
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => observer.disconnect();
  }, []);

  return null;
}
