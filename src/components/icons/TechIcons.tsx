import React from "react";

interface IconProps {
  className?: string;
}

export function CSharpIcon({ className = "w-5 h-5" }: IconProps) {
  return (
    <svg viewBox="0 0 128 128" className={className} fill="none">
      <path
        d="M64 8.7L15.4 36.8v56.4L64 121.3l48.6-28.1V36.8L64 8.7z"
        fill="#9B4993"
      />
      <path
        d="M64 16.4l41.9 24.2v48.4L64 113.2 22.1 89V40.6L64 16.4z"
        fill="#68217A"
      />
      <path
        d="M64.6 37.8c-14.8 0-26.8 12-26.8 26.8s12 26.8 26.8 26.8c10.3 0 19.3-5.8 23.8-14.3l-8.6-5c-3 5.4-8.8 9-15.2 9-9.8 0-17.7-7.9-17.7-17.7s7.9-17.7 17.7-17.7c6.4 0 12.2 3.6 15.2 9l8.6-5c-4.5-8.5-13.5-14.3-23.8-14.3z"
        fill="#fff"
      />
      <path
        d="M93.3 53.6h4.5v-4.5h3.2v4.5h4.5v3.2h-4.5v4.5h4.5v3.2h-4.5v4.5h-3.2v-4.5h-4.5v-3.2h4.5v-4.5h-4.5v-3.2zm10.9 4.5h-4.5v4.5h4.5v-4.5z"
        fill="#fff"
      />
    </svg>
  );
}

export function DotnetIcon({ className = "w-5 h-5" }: IconProps) {
  return (
    <svg viewBox="0 0 128 128" className={className} fill="none">
      <circle cx="64" cy="64" r="60" fill="#512BD4" />
      <path
        d="M32 78V48h8.5l14 19.8V48h6.5v30h-8.5L38.5 58.2V78H32zm34-10c0-6.1 4.5-10.5 10.7-10.5 6.1 0 10.6 4.4 10.6 10.5 0 6.1-4.5 10.5-10.6 10.5-6.2 0-10.7-4.4-10.7-10.5zm15.1 0c0-3.3-2-5.7-4.4-5.7-2.5 0-4.5 2.4-4.5 5.7 0 3.3 2 5.7 4.5 5.7 2.4 0 4.4-2.4 4.4-5.7zm11.9 10V54h-5.2v-5.5h5.2V44h6.2v4.5h7.2V54H99v24h-6z"
        fill="#fff"
      />
    </svg>
  );
}

export function NestJSIcon({ className = "w-5 h-5" }: IconProps) {
  return (
    <svg viewBox="0 0 128 128" className={className} fill="none">
      <path
        d="M109.8 28.5c-4.4-8.8-13.8-13.8-23.7-12.7-8.1.9-15.1 5.9-18.7 13.2-6.5-6.2-15.8-8.8-24.8-6.9-10.6 2.3-18.9 10.5-21.2 21.1-1.3 5.9-.4 12 2.5 17.2L12 99.8l10.9 10.9 39.4-11.8c5.2 2.9 11.3 3.8 17.2 2.5 10.6-2.3 18.9-10.6 21.1-21.2 1.9-9-.7-18.3-6.9-24.8 7.3-3.6 12.3-10.6 13.2-18.7 1.1-9.9-3.9-19.3-12.7-23.7z"
        fill="#E0234E"
      />
      <path
        d="M74.3 43.8c-2.3 4.6-7.2 7.3-12.4 6.7-4.2-.5-7.9-3.1-9.8-6.9-3.4 3.3-8.3 4.6-13 3.6-5.6-1.2-9.9-5.6-11.1-11.1-.7-3.1-.2-6.3 1.3-9L16 61.2l5.7 5.7 20.6-6.2c2.7 1.5 5.9 2 9 1.3 5.6-1.2 9.9-5.6 11.1-11.1 1-4.7-.4-9.6-3.6-13 3.8 1.9 6.4 5.6 6.9 9.8.6 5.2-2.1 10.1-6.7 12.4z"
        fill="#fff"
        opacity="0.35"
      />
    </svg>
  );
}

export function AngularIcon({ className = "w-5 h-5" }: IconProps) {
  return (
    <svg viewBox="0 0 128 128" className={className} fill="none">
      <path
        d="M64 14L14 31.8l7.6 66L64 114l42.4-16.2 7.6-66L64 14z"
        fill="#DD0031"
      />
      <path
        d="M64 14v100l42.4-16.2 7.6-66L64 14z"
        fill="#C3002F"
      />
      <path
        d="M64 30.5L37.7 89.2h9.9l5.3-13.3h22.2l5.3 13.3h9.9L64 30.5zm7.8 38.2H56.2L64 49.3l7.8 19.4z"
        fill="#fff"
      />
    </svg>
  );
}

export function NextJsIcon({ className = "w-5 h-5" }: IconProps) {
  return (
    <svg viewBox="0 0 128 128" className={className} fill="none">
      <circle cx="64" cy="64" r="60" fill="#000" />
      <path
        d="M89.7 94.6L44.8 36.9H36v54.2h7.8V47.5l40.7 52.3c1.7-1.6 3.4-3.3 5.2-5.2z"
        fill="#fff"
      />
      <path
        d="M84.2 36.9h7.8v37.8h-7.8z"
        fill="#fff"
      />
    </svg>
  );
}

export function ReactIcon({ className = "w-5 h-5" }: IconProps) {
  return (
    <svg viewBox="0 0 128 128" className={className} fill="none">
      <circle cx="64" cy="64" r="10.5" fill="#00D8FF" />
      <ellipse
        cx="64"
        cy="64"
        rx="54"
        ry="20.5"
        stroke="#00D8FF"
        strokeWidth="6"
        transform="rotate(30 64 64)"
      />
      <ellipse
        cx="64"
        cy="64"
        rx="54"
        ry="20.5"
        stroke="#00D8FF"
        strokeWidth="6"
        transform="rotate(90 64 64)"
      />
      <ellipse
        cx="64"
        cy="64"
        rx="54"
        ry="20.5"
        stroke="#00D8FF"
        strokeWidth="6"
        transform="rotate(150 64 64)"
      />
    </svg>
  );
}

export function TypeScriptIcon({ className = "w-5 h-5" }: IconProps) {
  return (
    <svg viewBox="0 0 128 128" className={className} fill="none">
      <rect width="128" height="128" rx="16" fill="#3178C6" />
      <path
        d="M62 44.8v10.3H49.2v46.1h-12V55.1H24.5V44.8H62zm34.2 19.3c-2.3-1.6-5.4-2.8-9.1-3.6-2.5-.5-4.2-1.1-5.3-1.8-1.1-.7-1.6-1.6-1.6-2.7 0-1.2.5-2.2 1.6-2.9 1.1-.7 2.6-1.1 4.5-1.1 2.1 0 3.9.5 5.4 1.5 1.5 1 2.5 2.5 3 4.5l10.3-4.4c-1.3-3.7-3.8-6.6-7.5-8.8-3.7-2.1-8.3-3.2-13.8-3.2-4.9 0-9.1.9-12.7 2.7-3.6 1.8-6.4 4.3-8.4 7.5-2 3.2-3 6.9-3 11 0 4.6 1.3 8.3 3.9 11.2 2.6 2.9 6.5 5 11.7 6.4 3 .8 5.2 1.6 6.5 2.3 1.3.8 2 1.8 2 3.1 0 1.5-.6 2.7-1.9 3.6-1.3.9-3.2 1.3-5.7 1.3-3 0-5.4-.7-7.3-2.1-1.9-1.4-3.1-3.5-3.6-6.3l-10.6 4.3c1.2 4.6 3.9 8.3 8.1 11.1 4.2 2.8 9.6 4.2 16.2 4.2 5.5 0 10.3-1 14.3-3 4-2 7.1-4.7 9.2-8.1 2.1-3.4 3.2-7.3 3.2-11.7 0-5-1.4-9-4.2-12-2.8-2.9-6.9-5.1-12.3-6.6z"
        fill="#fff"
      />
    </svg>
  );
}

export function JavaScriptIcon({ className = "w-5 h-5" }: IconProps) {
  return (
    <svg viewBox="0 0 128 128" className={className} fill="none">
      <rect width="128" height="128" rx="16" fill="#F7DF1E" />
      <path
        d="M34.5 99.8c3.2 5.2 7.4 8.7 14.5 8.7 6.1 0 10-3 10-14.7V46.6h12v47.2c0 18.5-10.7 26.6-24.8 26.6-11.3 0-17.8-5.8-21.3-14.3l9.6-6.3zm50.6-1.8c2.9 4.7 6.8 8.1 13.5 8.1 5.7 0 9.4-2.8 9.4-6.8 0-4.7-3.8-6.4-10.2-9.2l-3.5-1.5c-10.1-4.3-16.8-9.7-16.8-21.2 0-10.5 8.1-18.5 20.8-18.5 9 0 15.5 3.1 19.8 11.2l-9.3 6c-2.1-3.7-4.8-5.3-10.5-5.3-4.7 0-7.8 2.5-7.8 5.8 0 3.6 2.4 5.2 8 7.6l3.5 1.5c11.9 5.1 19 10.3 19 22.3 0 12.7-10 19.9-23 19.9-12.9 0-21-6.4-25.5-15.2l12.6-6.7z"
        fill="#000"
      />
    </svg>
  );
}

export function TailwindIcon({ className = "w-5 h-5" }: IconProps) {
  return (
    <svg viewBox="0 0 128 128" className={className} fill="none">
      <path
        d="M64 32c-19.2 0-30.4 9.6-33.6 28.8 7.2-9.6 16-13.6 26.4-12 5.9.9 10.1 5.2 14.8 9.9C79.2 66.4 88.5 76 108 76c19.2 0 30.4-9.6 33.6-28.8-7.2 9.6-16 13.6-26.4 12-5.9-.9-10.1-5.2-14.8-9.9C92.8 41.6 83.5 32 64 32zM20 76c-19.2 0-30.4 9.6-33.6 28.8 7.2-9.6 16-13.6 26.4-12 5.9.9 10.1 5.2 14.8 9.9 7.6 7.7 16.9 17.3 36.4 17.3 19.2 0 30.4-9.6 33.6-28.8-7.2 9.6-16 13.6-26.4 12-5.9-.9-10.1-5.2-14.8-9.9C48.8 85.6 39.5 76 20 76z"
        fill="#06B6D4"
        transform="translate(10, -5) scale(0.85)"
      />
    </svg>
  );
}

export function NodeJsIcon({ className = "w-5 h-5" }: IconProps) {
  return (
    <svg viewBox="0 0 128 128" className={className} fill="none">
      <path
        d="M64 12L16 39.7v55.4L64 122.8l48-27.7V39.7L64 12z"
        fill="#339933"
      />
      <path
        d="M64 21.6l40 23.1v46.2L64 114 24 90.9V44.7l40-23.1z"
        fill="#215732"
      />
      <path
        d="M64 35c-16 0-29 13-29 29s13 29 29 29 29-13 29-29-13-29-29-29zm0 46c-9.4 0-17-7.6-17-17s7.6-17 17-17 17 7.6 17 17-7.6 17-17 17z"
        fill="#fff"
      />
    </svg>
  );
}

export function MongoDbIcon({ className = "w-5 h-5" }: IconProps) {
  return (
    <svg viewBox="0 0 128 128" className={className} fill="none">
      <path
        d="M64 12c-1.3 0-2.4 1.1-2.4 2.4v1.8c-7.3 12.3-25.4 46.1-13.8 69.8 9.3 19 28.2 28.8 30.6 30 1.2.6 2.8.6 4 0 2.4-1.2 21.3-11 30.6-30 11.6-23.7-6.5-57.5-13.8-69.8V14.4c0-1.3-1.1-2.4-2.4-2.4H64z"
        fill="#13AA52"
      />
      <path
        d="M64 14.4v97.2c-.4 0-14.8-7.5-22.6-23.4-9.3-19 5.2-46.1 11-56.1l11.6-17.7z"
        fill="#10AA50"
      />
      <path
        d="M64 111.6V14.4l11.6 17.7c5.8 10 20.3 37.1 11 56.1-7.8 15.9-22.2 23.4-22.6 23.4z"
        fill="#4DB33D"
      />
    </svg>
  );
}

export function PostgreSqlIcon({ className = "w-5 h-5" }: IconProps) {
  return (
    <svg viewBox="0 0 128 128" className={className} fill="none">
      <circle cx="64" cy="64" r="56" fill="#336791" />
      <path
        d="M64 24c-22.1 0-40 17.9-40 40 0 18.2 12.2 33.6 28.9 38.3 1.6.4 2.8-.7 2.8-2v-7.1c-11.1 2.4-13.5-4.7-13.5-4.7-1.8-4.6-4.4-5.8-4.4-5.8-3.6-2.5.3-2.4.3-2.4 4 0.3 6.1 4.1 6.1 4.1 3.6 6.1 9.4 4.3 11.6 3.3.4-2.6 1.4-4.3 2.5-5.3-8.9-1-18.2-4.4-18.2-19.8 0-4.4 1.6-7.9 4.1-10.7-.4-1-.8-5.1.4-10.6 0 0 3.4-1.1 11 4.1 3.2-.9 6.6-1.3 10-1.3 3.4 0 6.8.4 10 1.3 7.6-5.2 11-4.1 11-4.1 1.2 5.5.8 9.6.4 10.6 2.5 2.8 4.1 6.3 4.1 10.7 0 15.4-9.3 18.7-18.3 19.7 1.4 1.2 2.7 3.7 2.7 7.4v11c0 1.3 1.2 2.4 2.8 2 16.7-4.7 28.9-20.1 28.9-38.3 0-22.1-17.9-40-40-40z"
        fill="#fff"
      />
    </svg>
  );
}

export function DockerIcon({ className = "w-5 h-5" }: IconProps) {
  return (
    <svg viewBox="0 0 128 128" className={className} fill="none">
      <rect width="128" height="128" rx="16" fill="#2496ED" />
      <path
        d="M107.5 59.8c-1.3-.9-4.2-1.7-8.1-1.2-.8-4.9-4.1-9.2-8.7-11.4l-2.4-1.2-1.6 2.2c-3.1 4.3-4.3 9.4-3.6 14.5-2.2 1.2-5.7 1.8-9.4 1.8H18.5c-1.9 0-3.5 1.6-3.5 3.5 0 9.9 3.6 19.4 10.2 26.6 7.4 8.1 17.6 12.8 28.7 13.2 23.3.8 44.5-12.8 52.8-33.8 3.5-.4 9.8-2.6 10.8-14.2zM48 40h10v10H48V40zm-14 0h10v10H34V40zm28 0h10v10H62V40zm-28 14h10v10H34V54zm14 0h10v10H48V54zm14 0h10v10H62V54zm14 0h10v10H76V54zm14 0h10v10H90V54z"
        fill="#fff"
      />
    </svg>
  );
}

export function RedisIcon({ className = "w-5 h-5" }: IconProps) {
  return (
    <svg viewBox="0 0 128 128" className={className} fill="none">
      <path
        d="M64 18L18 41.5 64 65l46-23.5L64 18z"
        fill="#D82C20"
      />
      <path
        d="M18 45v38l46 23.5v-38L18 45z"
        fill="#A3241C"
      />
      <path
        d="M110 45l-46 23.5v38L110 83V45z"
        fill="#821C16"
      />
      <circle cx="64" cy="41" r="7" fill="#fff" />
    </svg>
  );
}

export function CleanArchIcon({ className = "w-5 h-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  );
}

export function WebRtcIcon({ className = "w-5 h-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M23 7l-7 5 7 5V7z" />
      <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
    </svg>
  );
}
