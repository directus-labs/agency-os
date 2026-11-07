import type { Globals } from '~/types';

declare module "#app" {
  interface RuntimeNuxtHooks {
    "directus:loggedIn": (state: boolean) => void;
  }
}

declare module "nuxt/schema" {
  interface CustomAppConfig {
    globals?: Globals;
  }
}

declare module "@nuxt/schema" {
  interface CustomAppConfig {
    globals?: Globals;
  }
}

export {};
