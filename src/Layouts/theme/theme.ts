import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles/createPalette' {
   interface Palette {
      redAccent: PaletteColor;
      greenAccent: PaletteColor;
      progressbar: PaletteColor;
   }

   interface PaletteOptions {
      redAccent?: Partial<PaletteColor>;
      greenAccent?: PaletteColor;
      progressbar?: PaletteColor;
   }

   export default function createPalette(options: PaletteOptions): Palette;
}

//? NOTE Create Custom Theme
export const lightTheme = createTheme({
   direction: 'rtl',
   palette: {
      mode: 'light',
      primary: {
         main: '#E9B824',
         dark: '#E9B824',
      },
      secondary: {
         main: '#E9B824',
         dark: '#E9B824',
      },
      redAccent: {
         main: '#E9B824',
         dark: '#E9B824',
      },
      greenAccent: {
         main: '#43cf21',
         light: '#43ff21',
         dark: '#439921',
         contrastText: '#439921',
      },
      progressbar: {
         light: '#e54f69',
         main: '#df2343',
         dark: '#861528',
         contrastText: '#861528',
      },
   },
   typography: {
      fontFamily: 'vazir , roboto',
   },
});

export const darkTheme = createTheme({
   direction: 'rtl',
   palette: {
      mode: 'dark',
      primary: {
         main: '#E9B824',
      },
      secondary: {
         main: '#bd93f9',
      },
      redAccent: {
         light: '#e54f69',
         main: '#df2343',
         dark: '#861528',
         contrastText: '#861528',
      },
      greenAccent: {
         main: '#43cf21',
         light: '#43ff21',
         dark: '#439921',
         contrastText: '#439921',
      },
      progressbar: {
         light: '#b9f2fe',
         main: '#8be9fd',
         dark: '#538c98',
         contrastText: '#538c98',
      },
   },
   typography: {
      fontFamily: 'vazir , roboto',
   },
});
