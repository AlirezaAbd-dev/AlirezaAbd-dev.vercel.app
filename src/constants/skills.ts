'use client';
import {
  htmlIcon,
  cssIcon,
  gitIcon,
  javascriptIcon,
  nodeIcon,
  reactIcon,
  nextJsIcon,
} from '../assets/icons';

export const devSkills = {
  htmlSkill: {
    id: 0,
    name: 'HTML',
    icon: htmlIcon,
    color: 'error' as const,
  },
  cssSkill: {
    id: 1,
    name: 'CSS',
    icon: cssIcon,
    color: 'info' as const,
  },
  jsSkill: {
    id: 2,
    name: 'JavaScript',
    icon: javascriptIcon,
    color: 'warning' as const,
  },
  reactSkill: {
    id: 3,
    name: 'React',
    icon: reactIcon,
    color: 'info' as const,
  },
  nodeSkill: {
    id: 4,
    name: 'NodeJS',
    icon: nodeIcon,
    color: 'success' as const,
  },
  nextJsSkill: {
    id: 5,
    name: 'NextJS',
    icon: nextJsIcon,
    color: 'primary' as const,
  },
  gitSkill: {
    id: 6,
    name: 'Git',
    icon: gitIcon,
    color: 'secondary' as const,
  },
};
