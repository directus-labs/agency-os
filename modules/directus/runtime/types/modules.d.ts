import type { RestClient } from "@directus/sdk";

declare module "#app" {
  interface NuxtApp {
    $directus: {
      rest: RestClient<DirectusSchema>;
    };
  }
  interface RuntimeNuxtHooks {
    "directus:loggedIn": (state: boolean) => void;
  }
}

declare module "vue" {
  interface ComponentCustomProperties {
    $directus: {
      rest: RestClient<DirectusSchema>;
    };
  }
}

declare global {
  interface DirectusSchema {}
}

export {};
