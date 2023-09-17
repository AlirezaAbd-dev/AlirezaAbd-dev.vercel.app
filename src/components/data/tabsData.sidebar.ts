'use client';
import {
   ConnectWithoutContactRounded,
   FaceRounded,
   HomeRounded,
   TerminalRounded,
} from '@mui/icons-material';
import AdminPanelSettingsRoundedIcon from '@mui/icons-material/AdminPanelSettingsRounded';
import { SvgIconTypeMap } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';

const tabs = [
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
   {
      path: 'admin',
      label: 'پنل ادمین',
      icon: AdminPanelSettingsRoundedIcon,
   },
] satisfies {
   path: string;
   label: string;
   icon: OverridableComponent<SvgIconTypeMap<{}, 'svg'>> & {
      muiName: string;
   };
}[];

export default tabs;
