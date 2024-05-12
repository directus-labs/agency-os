import { createDirectus, rest, readItems } from "@directus/sdk";
import fields from "~/fields/fields";

const config = useRuntimeConfig();
const baseUrl = config.public.directus.rest.baseUrl as string;

// Initialize the SDK.
const directus = createDirectus(baseUrl).with(rest());

// Call the Directus API using the SDK using the locale of the frontend and the slug.
async function getPages(languageCode: string, slug: string) {
  console.log("languageCode", languageCode);
  console.log("slug", slug);

  const pages = await directus.request(
    readItems("pages", {
      deep: {
        translations: {
          _filter: {
            _and: [
              {
                languages_code: { _eq: languageCode },
              },
              {
                slug: { _eq: slug },
              },
            ],
          },
        },
      },
      fields: [{ translations: ["*"] }],
      limit: 1,
    })
  );

  console.log(pages[0]);

  return pages[0];
}
export default defineEventHandler((event) => {
  if (event.context && event.context.params) {
    const languageCode = event.context.params.code;

    const slug = event.context.slug;

    return getPages(languageCode, slug);
  }

  // Handle the case where event.context or event.context.params is undefined
  return null;
});
