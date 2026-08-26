import { myProjects } from "@/constants/myProjects";

export const PORTFOLIO_DOMAIN = "https://portfolio.alireza-abedi.ir";
export const APEX_DOMAIN = "https://alireza-abedi.ir";

export const portfolioStructuredData = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "Alireza Abedi - Featured Software Projects & Portfolio",
  "description": "Curated engineering portfolio and open-source software applications developed by Alireza Abedi (Frontend Team Lead & Full-Stack Engineer).",
  "url": `${PORTFOLIO_DOMAIN}/myProjects`,
  "numberOfItems": myProjects.length,
  "itemListElement": myProjects.map((project, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "item": {
      "@type": "SoftwareSourceCode",
      "name": project.title,
      "description": project.description,
      "applicationCategory": project.category,
      "programmingLanguage": project.technologies,
      "codeRepository": project.link,
      "url": `${PORTFOLIO_DOMAIN}/myProjects#${project.id}`,
      "author": {
        "@type": "Person",
        "name": "Alireza Abedi",
        "alternateName": "علیرضا عابدی",
        "url": APEX_DOMAIN,
        "sameAs": [
          "https://github.com/AlirezaAbd-dev",
          "https://www.linkedin.com/in/alireza-abedi-714280235",
          "https://t.me/AlirezaAbd_Dev",
        ],
      },
    },
  })),
};
