'use client';
import {
  Architecture,
  Build,
  ConnectWithoutContactRounded,
  FaceRounded,
  Grading,
  HomeRounded,
  Person,
  School,
  TerminalRounded,
} from '@mui/icons-material';
import { SvgIconTypeMap } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';

type Tab = {
  path: string;
  label: string;
  icon: OverridableComponent<SvgIconTypeMap<{}, 'svg'>> & {
    muiName: string;
  };
};

const tabs: Tab[] = [
  {
    path: '/',
    label: 'صفحه اصلی',
    icon: HomeRounded,
  },
  {
    path: 'about',
    label: 'درباره من',
    icon: FaceRounded,
  },
  {
    path: 'myProjects',
    label: 'نمونه کارها',
    icon: TerminalRounded,
  },
  {
    path: 'contactUs',
    label: 'ارتباط با من',
    icon: ConnectWithoutContactRounded,
  },
];

const adminTabs: Tab[] = [
  ...tabs,
  {
    path: 'profile',
    label: 'پروفایل',
    icon: Person,
  },
  {
    path: 'skills',
    label: 'مهارت ها',
    icon: Architecture,
  },
  {
    path: 'sideSkills',
    label: 'مهارت های جانبی',
    icon: Build,
  },
  {
    path: 'education',
    label: 'تحصیلات',
    icon: School,
  },
  {
    path: 'projects',
    label: 'پروژه ها',
    icon: Grading,
  },
];

export { adminTabs };
export default tabs;
