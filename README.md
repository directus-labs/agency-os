# \_AgencyOS

**the modern dev agency template**

There's plenty of "starters" for Nuxt, Next, and other front-end frameworks out there. BUT there are few "complete examples" available.

This "example" was born out of my own frustration. It is an opinionated "complete" template for Nuxt 3 using Directus as a backend.

## Setup

Make sure to install the dependencies:

```bash
# yarn
yarn install

# npm
npm install

# pnpm
pnpm install
```

## Development Server

Start the development server on http://localhost:3000

```bash
yarn dev
```

## Production

Build the application for production:

```bash
yarn build
```

Locally preview production build:

```bash
yarn preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

---

**[View The Demo Site](https://directus-nuxt3-starter.netlify.app/)**

**Features**

- Built-in Directus 9 support to use as your backend, API, headless CMS - whatever your use case
- Demo of a Page Builder (Many-to-Any relationships) within Directus
- Tailwind CSS with all plugins, HeadlessUI, and Heroicons (Now Using V2) icon support
- Authentication and user store already configured for you
- Ready to use common components like modals, dropdowns, and file upload input
- Common utilities like relative time and currency formatting so you don't need to include yet another package
- ESLint and Prettier already configured
- Dark mode support

---

# 🧰 Stack

<img src="./public/logos/nuxt3.svg" height="50" />

## Nuxt 3

The leading Vue framework that handles routing, server side rendering, and more.

**⚠️ Warning: Nuxt 3 is still in RC and is not recommended for production use.**

Be sure to keep your eye on [their roadmap](https://v3.nuxtjs.org/community/roadmap) for the latest information.

---

<img src="./public/logos/directus.svg" height="50" />

## Directus

### Nuxt Plugin using Directus SDK

If you're not familiar - Directus is an open data platform backed by a SQL database that allows you to quickly created a ready-to-use backend / API to power your application without writing any code.

For a smooth experience, the [Directus SDK](https://docs.directus.io/reference/sdk/#javascript-sdk) is already integrated for you and availably globally as a Nuxt plugin.

```vue
<script setup>
// Get the $directus plugin from Nuxt App composable
const { $directus } = useNuxtApp()

// Fetch content from Directus
const { data } = await $directus.items('your_collection_name').readByQuery({
  filter: {
    status: { _eq: 'published' },
  },
  limit: 5,
})
</script>
```

There is also an included composable for getting the asset urls for your Directus files. Nuxt 3 auto-imports all your composables within the `/composables` directory so calling this helper is super simple.

```vue
<template>
  <img :src="fileUrl(file.id)" />
</template>
<script setup>
const { fileUrl } = useFiles()

const file = {
  id: 'lkerwfdafaddfgglk3242',
}
</script>
```

There are ready to go examples for:

- Authentication
- Fetching content from your Directus instance
- Protecting content with Nuxt Middleware
- Uploading files

### Page Builder - (M2A) Many To Any Relationship

A common feature of many headless CMS's (lots of s's there 🤣) is a "page builder" or "block editor" or whatever all the cool kids are calling it these days.

Directus supports this use case using their Many-to-Any (M2A) relationships.

![Public Permissions](./examples/page-builder.gif)

---

<img src="./public/logos/tailwind.svg" height="40" />

## Tailwind CSS

If you don't already have a license for Tailwind UI, I highly recommend picking one up.

### Primary Color

All the base components included in the starter use a `primary` class like `class="text-primary-600 bg-primary-500"` for colors to make it simple to change your preferred base color.

Just adjust it within your `tailwind.config.js`

```vue
// tailwind.config.js ... theme: { extend: { colors: { primary: colors.violet,
// Change this to your preferred Tailwind shade ie colors.yourShade gray:
colors.slate, }, }, }, ...
```

### Dark Mode

Dark mode is already enabled in the `tailwind.config.js` and all the base components included have full support.

Dark mode toggling is provided by [VueUse `useDark` composable](https://vueuse.org/core/usedark/#usedark). And there is an example toggle component you can use.

If you don't wish to use dark mode, you can simply remove the composable and the `dark:` classes from the components.

### Tailwind Plugins

All the official Tailwind Plugins are installed and ready to use as well.

- [Typography](https://tailwindcss.com/docs/typography-plugin)
- [Forms](https://tailwindcss.com/docs/plugins#forms)
- [Aspect Ratio](https://github.com/tailwindlabs/tailwindcss-aspect-ratio)
- [Line Clamp](https://tailwindcss.com/docs/plugins#line-clamp)

---

<img src="./public/logos/headlessui.svg" height="50" />

## Headless UI

[Headless UI ](https://headlessui.dev/) makes it so simple to implement custom components like dropdowns, modals, and select boxes.

And there's two include examples that you can use right away.

### Modals

```vue
<template>
  <VButton @click="isModalOpen = true" class="mt-2" variant="primary">
    Open Modal
  </VButton>
  <VModal
    title="Sample Modal"
    :is-open="isModalOpen"
    @close="isModalOpen = false"
  >
    <div class="prose dark:prose-invert">
      <p>{{ modalContent }}</p>
    </div>
  </VModal>
</template>
<script setup>
const isModalOpen = ref(false)
</script>
```

### Dropdowns

```vue
<template>
  <VDropdown
    button-label="Dropdown Menu"
    variant="primary"
    :menu-items="dropdownItems"
  />
</template>
<script setup>
const dropdownItems = [
  {
    label: 'Console Log',
    action: () => {
      console.log('Dropdown button clicked!')
    },
  },
  {
    label: 'Visit Protected Page',
    action: () => {
      router.push('/protected-page')
    },
  },
]
</script>
```

---

<img src="./public/logos/pinia.svg" height="50" />

## Pinia

The template uses [Pinia](https://pinia.vuejs.org/) for stores instead of Vuex. It's much easier to use and less verbose.

The `auth` store is all setup and ready to go. Using it is also super easy.

```vue
<template>
  <p>The logged-in user is: {{ auth.user }}</p>
</template>
<script setup>
import { useAuth } from '~~/store/auth'
const auth = useAuth()
</script>
```

If you like destructuring, make sure you use the `storeToRefs` helper from Pinia.

```vue
<script setup>
import {storeToRefs} from 'pinia' import {useAuth} from '~~/store/auth' const
auth = useAuth() const {(isLoggedIn, user)} = storeToRefs(auth)
</script>
```

---

<img src="./public/logos/vueuse.svg" height="50" />

## VueUse

[VueUse](https://vueuse.org/) is already installed and configured so you can just import any of the composables in their library straight away.

---

## Common Utilities

It's good to avoid adding external packages unless your use case really justifies it.

I always end up using some combination of these utils in most of my projects so I've chosen to include them in this starter.

### Time

**Filename:** `/utils/time.js`

- `getRelativeTime(date)`
- `getFriendlyDate(date)`
- `greetUser()`

### Currency

These are helpful when you are working with third party ecommerce or billing APIs like Stripe.

**Filename:** `/utils/currency.js`

- `formatCurrency(number, {hideZeros: false})`
- `centsToDollars(cents)`
- `dollarsToCents(dollars)`

### Math

**Filename:** `/utils/math.js`

- `formatPercent(number)`
- `percentChange(num1, num2)`
- `roundToDecimal(value, decimals)`

### Strings

**Filename:** `/utils/strings.js`

- `stripHTML(string)`
- `truncateString(string)`
- `slugify(string)`
- `deslugify(string)`
- `toTitleCase(string)`

---

# 🚧 Development

## Directus - Backend

#### 1 - Register for a free Directus Cloud account

https://directus.cloud/register

If you're prefer the self-hosted version, you can find [install instructions here](https://docs.directus.io/getting-started/installation/cli/).

#### 2 - Create a new project

Directus has a free Community Cloud tier that's perfect for tinkering or their Standard version has a bit more power if you're ready to start a live project.

Make sure you save your project URL.

#### 3 - Generate a static token for the admin user

You need the static token to seed the project.

1. Go to the User Directory
2. Choose the Adminstrative User
3. Scroll down to the Token field
4. Generate token and copy it
5. Save the user (don't forget to save!)

![Use This Template](./examples/generate-token.png)

---

## Nuxt - Frontend

#### 1 - Clone the repo

[Use This Template](https://github.com/bryantgillespie/nuxt3-directus-starter/generate)

_Or from the terminal_

```bash
git clone https://github.com/bryantgillespie/nuxt3-directus-starter.git your-project
```

#### 2 - Fix your .env file

- Change the filename `env.example` to `.env`
- Add the url to your Directus instance
- Add the static token for your admin user you generated above

If you're using Directus Cloud, it should look something like this.

```
DIRECTUS_URL="https://youruniquedomain.directus.app"
DIRECTUS_ADMIN_TOKEN="your_admin_static_token_here"
```

If you're using the self hosted version, it should look something like this.

```
DIRECTUS_URL="http://localhost:8055"
```

#### 3 - Install your dependencies

```bash
yarn install
```

#### 4 - Seed your Directus project

I've created a script within the `/setup` directory for seeding your Directus project (especially if you're using Directus Cloud).

This will create the following items from the demo site...

- Collections
- Fields
- Relations
- Permissions

To seed the project, simply navigate to the root directory of your Nuxt app and run the following:

```bash
node /setup/seed.ts
```

⚠️ Note: You only need to run this ONCE. If you run it again, the Directus API should warn you that the data already exists, but be mindful.

#### 6 - Start the development server\*\*

http://localhost:3000

```bash
yarn dev
```

#### 7 - Remove all the example content

When you're ready to tackle your own project instead of the example, just delete the following directories

- `/examples`
- `/components/Examples`
- `/public/logos`

#### 8 - Build for production when you're ready

```bash
yarn build
```

---

# 🚢 Deployment

Be sure to check out the Nuxt 3 official [deployment documentation](https://v3.nuxtjs.org/docs/deployment).

**Netlify**

<a href="https://app.netlify.com/start/deploy?repository=https://github.com/bryantgillespie/nuxt3-directus-starter#DIRECTUS_URL=https://youruniqueid.directus.app"><img src="https://www.netlify.com/img/deploy/button.svg" alt="Deploy to Netlify"></a>

**Vercel**

<a href="https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fbryantgillespie%2Fnuxt3-directus-starter%2F&env=DIRECTUS_URL&demo-title=Directus%20Nuxt%203%20Starter%20&demo-description=Nuxt%203%20starter%20for%20Directus%20with%20Tailwind%20CSS%20and%20lots%20of%20other%20goodies&demo-url=https%3A%2F%2Fdirectus-nuxt3-starter.netlify.app%2F&demo-image=https%3A%2F%2F4bgd2mtg.directus.app%2Fassets%2F0d374f4a-9111-4b4f-90d0-cff45a92a784"><img src="https://vercel.com/button" alt="Deploy with Vercel"/></a>

---

# 💼 Other Resources

- [**Directus Doc Search**](https://github.com/bryantgillespie/alfred-directus-docs)

  If you're using a Mac and you have [Alfred](https://www.alfredapp.com/) check out my Directus Docs Search workflow for it so that you can quickly and easily search their documentation.

- [**Directus Discord**](https://discord.com/invite/directus)

- [**Nuxt Discord**](https://discord.com/invite/ps2h6QT)
