import { MetadataRoute } from "next";

const PORTFOLIO_DOMAIN = "https://portfolio.alireza-abedi.ir";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/"],
    },
    sitemap: `${PORTFOLIO_DOMAIN}/sitemap.xml`,
  };
}
