'use client';
import {
  Architecture,
  Build,
  Collections,
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
  id: number;
  path: string;
  label: string;
  icon: OverridableComponent<SvgIconTypeMap<{}, 'svg'>> & {
    muiName: string;
  };
};

const tabs: Tab[] = [
  {
    id: 0,
    path: '/',
    label: 'صفحه اصلی',
    icon: HomeRounded,
  },
  {
    id: 1,
    path: 'about',
    label: 'درباره من',
    icon: FaceRounded,
  },
  {
    id: 2,
    path: 'myProjects',
    label: 'نمونه کارها',
    icon: TerminalRounded,
  },
  {
    id: 3,
    path: 'contactUs',
    label: 'ارتباط با من',
    icon: ConnectWithoutContactRounded,
  },
];

const adminTabs: Tab[] = [
  ...tabs,
  {
    id: 4,
    path: 'profile',
    label: 'پروفایل',
    icon: Person,
  },
  {
    id: 5,
    path: 'skills',
    label: 'مهارت ها',
    icon: Architecture,
  },
  {
    id: 6,
    path: 'sideSkills',
    label: 'مهارت های جانبی',
    icon: Build,
  },
  {
    id: 7,
    path: 'education',
    label: 'تحصیلات',
    icon: School,
  },
  {
    id: 8,
    path: 'projects',
    label: 'پروژه ها',
    icon: Grading,
  },
  {
    id: 9,
    path: 'images',
    label: 'گالری تصاویر',
    icon: Collections,
  },
];

export { adminTabs };
export default tabs;
