"use client";
import {
  ConnectWithoutContactRounded,
  FaceRounded,
  HomeRounded,
  TerminalRounded,
} from "@mui/icons-material";

const tabs = [
  {
    path: "/",
    label: "صفحه اصلی",
    icon: HomeRounded,
  },
  {
    path: "about",
    label: "درباره من",
    icon: FaceRounded,
  },
  {
    path: "myProjects",
    label: "نمونه کارها",
    icon: TerminalRounded,
  },
  {
    path: "contactUs",
    label: "ارتباط با من",
    icon: ConnectWithoutContactRounded,
  },
];

export default tabs;
