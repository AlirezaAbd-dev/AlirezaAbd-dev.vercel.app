'use client';
import { darkTheme, lightTheme } from '../Layouts/theme/theme';
import { RecursivePartial, IOptions } from 'tsparticles-engine';

export const createLinks = (
   mode: 'light' | 'dark',
): RecursivePartial<IOptions> => {
   return {
      fps_limit: 60,
      interactivity: {
         detect_on: 'canvas',
         events: {
            onclick: { enable: false, mode: 'push' },
            onhover: {
               enable: true,
               mode: 'attract',
               parallax: { enable: true, force: 60, smooth: 15 },
            },
            resize: true,
         },
         modes: {
            push: { quantity: 4 },
            attract: { distance: 200, duration: 0.4, factor: 5 },
         },
      },
      particles: {
         color: {
            value:
               mode === 'light'
                  ? lightTheme.palette.secondary.main
                  : darkTheme.palette.primary.light,
         },
         line_linked: {
            color:
               mode === 'light'
                  ? lightTheme.palette.secondary.main
                  : darkTheme.palette.primary.light,
            distance: 150,
            enable: true,
            opacity: 0.5,
            width: 0.5,
         },
         move: {
            attract: { enable: false, rotateX: 600, rotateY: 1200 },
            bounce: false,
            direction: 'none',
            enable: true,
            out_mode: 'out',
            random: false,
            speed: 2,
            straight: false,
         },
         number: { density: { enable: true, value_area: 800 }, value: 100 },
         opacity: {
            anim: { enable: false, opacity_min: 0.1, speed: 1, sync: false },
            random: false,
            value: 0.5,
         },
         shape: {
            character: {
               fill: false,
               font: 'Verdana',
               style: '',
               value: '*',
               weight: '400',
            },
            polygon: { nb_sides: 5 },
            stroke: { color: '#000000', width: 0 },
            type: 'circle',
         },
         size: {
            anim: { enable: true, size_min: 0.1, speed: 40, sync: false },
            random: true,
            value: 5,
         },
      },
      polygon: {
         draw: { enable: false, lineColor: '#ffffff', lineWidth: 0.5 },
         move: { radius: 10 },
         scale: 1,
         type: 'none',
         url: '',
      },
      retina_detect: true,
   };
};
