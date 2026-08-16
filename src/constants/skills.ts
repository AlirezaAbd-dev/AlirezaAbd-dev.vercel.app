"use client";
import {
  NextJsIcon,
  ReactIcon,
  CSharpIcon,
  DotnetIcon,
  NestJSIcon,
  TypeScriptIcon,
  CleanArchIcon,
  PostgreSqlIcon,
  TailwindIcon,
  DockerIcon,
} from "../components/icons/TechIcons";

export const devSkills = {
  nextJsSkill: {
    id: 0,
    name: "React & Next.js (App Router / SSR)",
    icon: NextJsIcon,
    color: "primary",
    value: 95, // Verified: Deep multi-project implementation (Bolboler, Pet-Shop, Portfolio, tRPC)
  },
  tsSkill: {
    id: 1,
    name: "TypeScript & Modern JavaScript",
    icon: TypeScriptIcon,
    color: "info",
    value: 96, // Verified: 2.7MB codebase, strict typing, Zod, generics
  },
  nestSkill: {
    id: 2,
    name: "NestJS & Node.js Backend",
    icon: NestJSIcon,
    color: "error",
    value: 90, // Verified: Realtor API, modular architecture, Prisma integration
  },
  csharpSkill: {
    id: 3,
    name: "C# & .NET Core / ASP.NET",
    icon: CSharpIcon,
    color: "secondary",
    value: 88, // Verified: Dotnet Microservices, Movies ASP.NET MVC, Maze AI, Desktop Apps
  },
  architectureSkill: {
    id: 4,
    name: "Clean Architecture & DDD",
    icon: CleanArchIcon,
    color: "success",
    value: 89, // Verified: Event-driven microservices, CQRS, modular domain isolation
  },
  uiSkill: {
    id: 5,
    name: "Tailwind CSS & Responsive UI",
    icon: TailwindIcon,
    color: "info",
    value: 94, // Verified: Custom CSS design systems, animations, glassmorphism
  },
  databaseSkill: {
    id: 6,
    name: "PostgreSQL, MongoDB & Prisma",
    icon: PostgreSqlIcon,
    color: "warning",
    value: 87, // Verified: Relational/document modeling, EF Core, Prisma migrations
  },
  devopsSkill: {
    id: 7,
    name: "Git, Docker & CI/CD",
    icon: DockerIcon,
    color: "primary",
    value: 91, // Verified: 41+ managed repositories, Docker containerization
  },
};
