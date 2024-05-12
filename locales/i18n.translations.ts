export default defineI18nLocale(async (locale) => {
  const config = useRuntimeConfig();

  const baseUrl = config.public.directus.rest.baseUrl;
  const token = config.public.directus.rest.token;

  const fields = `translations.*&deep[translations][_filter][languages_code][_eq]=${locale}`;
  const itemId = "8ece685c-e903-443b-b29d-b36491709743";
  const collection = "block_hero";
  const url = `${baseUrl}/items/${collection}/${itemId}?fields=${fields}&access_token=${token}`;
  // console.log(url);
  // console.log(locale);

  // WIP if you want to transform the translations data variables
  // const { data } = await useFetch(url, {
  //   transform: (translations) => {
  //     return data.translations.map((translations) => ({
  //       title: translations.title,
  //       description: translations.description,
  //       content: translations.content,
  //     }));
  //   },
  // });

  return $fetch(url);
  // return $fetch(`/api/translations/${locale}`);
});
