import { StaticImageData } from "next/image";
import {
  contactManagerImg,
  dashboardImg,
  glassmorphismLoginImg,
  todoImg,
} from "../assets/projects";

export interface myProjectsType {
  title: string;
  image: StaticImageData;
  link: string;
}

export const myProjects = [
  {
    title: "مدیریت مخاطبین",
    image: contactManagerImg,
    link: "https://github.com/AlirezaAbd-dev/Contact-Manager-client-Remake",
  },
  {
    title: "داشبورد پنل ادمین",
    image: dashboardImg,
    link: "https://github.com/AlirezaAbd-dev/Dashboard-Panel-Admin-persian",
  },
  {
    title: "لیست کارها",
    image: todoImg,
    link: "https://github.com/AlirezaAbd-dev/MERN-Stack-todo-website",
  },
  {
    title: "صفحه ورود شیشه ای",
    image: glassmorphismLoginImg,
    link: "https://github.com/AlirezaAbd-dev/Glassmorphism-login-page",
  },
];
