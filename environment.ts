declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_RECAPTCHA_SITE_KEY: string;
      NEXT_PUBLIC_BASE_URL: string;
      NEXT_PUBLIC_API_URL: string;
    }
  }
}

export {};
