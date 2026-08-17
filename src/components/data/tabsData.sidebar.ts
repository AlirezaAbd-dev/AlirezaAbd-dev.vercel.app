import { Home, User, FolderGit2, Mail, Gamepad2 } from "lucide-react";

export interface NavTabItem {
  path: string;
  label: string;
  icon: typeof Home;
  badge?: string;
}

const tabs: NavTabItem[] = [
  {
    path: "/",
    label: "صفحه اصلی",
    icon: Home,
  },
  {
    path: "/about",
    label: "درباره من",
    icon: User,
  },
  {
    path: "/myProjects",
    label: "نمونه کارها",
    icon: FolderGit2,
  },
  {
    path: "/games",
    label: "اتاق بازی",
    icon: Gamepad2,
    badge: "جدید",
  },
  {
    path: "/contactUs",
    label: "ارتباط با من",
    icon: Mail,
  },
];

export default tabs;

