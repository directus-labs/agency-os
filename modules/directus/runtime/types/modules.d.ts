import type { RestClient } from "@directus/sdk";

declare module "#app" {
  interface NuxtApp {
    $directus: DirectusClient<DirectusSchema> & AuthenticationClient<DirectusSchema> & RestClient<DirectusSchema>;
  }
  interface RuntimeNuxtHooks {
    "directus:loggedIn": (state: boolean) => void;
  }
}

declare module "vue" {
  interface ComponentCustomProperties {
    $directus:  DirectusClient<DirectusSchema> & AuthenticationClient<DirectusSchema> & RestClient<DirectusSchema>
  }
}

declare global {
  interface DirectusSchema {}
}

export { };

