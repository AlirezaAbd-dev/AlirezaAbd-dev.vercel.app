import { MetadataRoute } from "next";
import { myProjects } from "@/constants/myProjects";

const PORTFOLIO_DOMAIN = "https://portfolio.alireza-abedi.ir";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: MetadataRoute.Sitemap = [
    {
      url: `${PORTFOLIO_DOMAIN}/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1.0,
    },
    {
      url: `${PORTFOLIO_DOMAIN}/myProjects`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${PORTFOLIO_DOMAIN}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${PORTFOLIO_DOMAIN}/games`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${PORTFOLIO_DOMAIN}/contactUs`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${PORTFOLIO_DOMAIN}/privacy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.6,
    },
    {
      url: `${PORTFOLIO_DOMAIN}/llms.txt`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  // Distinct project deep-link anchors mapped in sitemap for granular indexing
  const projectRoutes: MetadataRoute.Sitemap = myProjects.map((project) => ({
    url: `${PORTFOLIO_DOMAIN}/myProjects#${project.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.85,
  }));

  return [...routes, ...projectRoutes];
}
