import {
  ConnectWithoutContactRounded,
  FaceRounded,
  HomeRounded,
  TerminalRounded,
} from "@mui/icons-material";

const tabProps = (index) => {
  return {
    id: `sidebar-tab-${index}`,
    "aria-controls": `tabpanel-${index}`,
  };
};

const tabs = [
  {
    label: "صفحه اصلی",
    icon: <HomeRounded />,
    ...tabProps(0),
  },
  {
    label: "درباره من",
    icon: <FaceRounded />,
    ...tabProps(1),
  },
  {
    label: "نمونه کارها",
    icon: <TerminalRounded />,
    ...tabProps(2),
  },
  {
    label: "ارتباط با من",
    icon: <ConnectWithoutContactRounded />,
    ...tabProps(3),
  },
];

export default tabs;
