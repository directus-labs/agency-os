# Agency OS Website Template Readme

Complete, opinionated agency website template. Nuxt 3 + Directus for Headless CMS.

**View The Demo Site**

**Features**

- Complete Nuxt 3 website example
- Built-in Directus - Headless CMS support
- Tailwind CSS with all plugins and HeadlessUI
- Dynamic Page Builder (M2A Interface) within Directus
- Blog posts and categories
- Projects pages
- Dynamic form generation with validation
- Dynamic social image generation
- SEO support
- Global search component and API route
- Redirects module
- Ready to use common components like modals, dropdowns, and file upload input
- Common utilities so you don't need to include yet another package
- Easy SVG Icons using Nuxt Icon module
- Google Fonts support
- ESLint and Prettier already configured
- Full Dark mode support
- Written in Typescript

**Why**

---

# ⭐ Features

## Dynamic Page Builder

Includes 15 ready-to-go blocks

- Hero
- Columns
- FAQs
- Call To Action
- Form
- Card Group
- Logo Cloud
- Rich Text
- Quote
- Steps
- Gallery
- Team
- Testimonial Slider
- Video
- Raw HTML

## Dynamic Forms

![ScreenShot 2023-04-07 at 10.59.05@2x.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/acc5abd8-ff4a-4c4c-8831-a50dcc3a148a/ScreenShot_2023-04-07_at_10.59.052x.png)

![ScreenShot 2023-04-07 at 10.59.41@2x.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/81f7d90a-585f-4c68-960c-00af4dc4e8f6/ScreenShot_2023-04-07_at_10.59.412x.png)

## Dynamic Menus

![ScreenShot 2023-04-07 at 11.21.14@2x.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/252de4d5-ff96-48db-9782-d8428598e408/ScreenShot_2023-04-07_at_11.21.142x.png)

![ScreenShot 2023-04-07 at 11.21.24@2x.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/9f4a058c-640b-4743-a63c-fc500a85ae12/ScreenShot_2023-04-07_at_11.21.242x.png)

## Dynamic Social Image Generation

![ScreenShot 2023-04-07 at 11.19.08@2x.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/cf7ccf54-4418-4c5c-bf80-10c282f9a4be/ScreenShot_2023-04-07_at_11.19.082x.png)

## Dark Mode Support

Agency OS has full dark mode support.

Dark mode is already enabled in the `tailwind.config.js` and all the base components included have full support.

Dark mode toggling is provided by [VueUse `useDark` composable](https://vueuse.org/core/usedark/#usedark). And there is an example toggle component you can use.

If you don't wish to use dark mode, you can simply remove the composable and the `dark:` classes from the components.

## Tasteful Animations

Animations are handled using vue-use/motion

## Dev Toolbar

## Guest-Author Ready

## Content and Analytics Dashboards

![ScreenShot 2023-04-07 at 11.03.42@2x.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/cf89faf1-4eca-4da8-b679-993db91f8427/ScreenShot_2023-04-07_at_11.03.422x.png)

## Pre-Built Automations

Deploy Your Site

Generate Social Images

Create Slugs Automatically

Post Approval Notifications

## Pre-Built Components

### Global Search

### Typography

Title

Headline

Prose

### Image Gallery

### Accordion

### Badges

### Modals

```jsx
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

### Dropdown

```jsx
<template>
  <VDropdown
    button-label="Dropdown Menu" variant="primary"
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

### Alert

### Video

### Buttons

## Common Utilities

It's good to avoid adding external packages unless your use case really justifies it.

I always end up using some combination of these utils in most of my projects so I've chosen to include them in this starter.

Nuxt 3 is configured by default to auto-import `/utils` directory.

---

# 🧰 Stack

![https://github.com/bryantgillespie/nuxt3-directus-starter/raw/m2a/public/logos/nuxt3.svg](https://github.com/bryantgillespie/nuxt3-directus-starter/raw/m2a/public/logos/nuxt3.svg)

## Nuxt 3 - Front End Framework

The leading Vue framework that handles routing, server side rendering, and more.

---

![https://github.com/bryantgillespie/nuxt3-directus-starter/raw/m2a/public/logos/directus.svg](https://github.com/bryantgillespie/nuxt3-directus-starter/raw/m2a/public/logos/directus.svg)

## Directus - Headless CMS

### Nuxt Plugin using Directus SDK

If you're not familiar - Directus is an open data platform backed by a SQL database that allows you to quickly created a ready-to-use backend / API to power your application without writing any code.

For a smooth experience, the [Directus SDK](https://docs.directus.io/reference/sdk/#javascript-sdk) is already integrated for you and availably globally as a Nuxt plugin.

```jsx
<script setup>
// Get the $directus plugin from Nuxt App composable
const { $directus } = useNuxtApp()

// Fetch content from Directusconst { data } = await $directus.items('your_collection_name').readByQuery({
  filter: {
    status: { _eq: 'published' },
  },
  limit: 5,
})
</script>
```

---

![https://github.com/bryantgillespie/nuxt3-directus-starter/raw/m2a/public/logos/tailwind.svg](https://github.com/bryantgillespie/nuxt3-directus-starter/raw/m2a/public/logos/tailwind.svg)

## Tailwind CSS

If you don't already have a license for Tailwind UI, I highly recommend picking one up.

### Primary Color

All the base components included in the starter use a `primary` class like `class="text-primary-600 bg-primary-500"` for colors to make it simple to change your preferred base color.

Just adjust it within your `tailwind.config.js`

`// tailwind.config.js ... theme: { extend: { colors: { primary: colors.violet,
// Change this to your preferred Tailwind shade ie colors.yourShade gray:
colors.slate, }, }, }, ...`

### Tailwind Plugins

All the official Tailwind Plugins are installed and ready to use as well.

- [Typography](https://tailwindcss.com/docs/typography-plugin)
- [Forms](https://tailwindcss.com/docs/plugins#forms)
- [Aspect Ratio](https://github.com/tailwindlabs/tailwindcss-aspect-ratio)

---

![https://github.com/bryantgillespie/nuxt3-directus-starter/raw/m2a/public/logos/headlessui.svg](https://github.com/bryantgillespie/nuxt3-directus-starter/raw/m2a/public/logos/headlessui.svg)

## Headless UI

[Headless UI](https://headlessui.dev/) makes it simple to implement accessible custom components like dropdowns, modals, and select boxes.

---

![formkit.svg](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/2364fc87-4e4a-4f0a-b5f9-73395570a747/formkit.svg)

## FormKit

---

![https://github.com/bryantgillespie/nuxt3-directus-starter/raw/m2a/public/logos/pinia.svg](https://github.com/bryantgillespie/nuxt3-directus-starter/raw/m2a/public/logos/pinia.svg)

## Pinia

The template uses [Pinia](https://pinia.vuejs.org/) for stores instead of Vuex. It's much easier to use and less verbose.

---

![https://github.com/bryantgillespie/nuxt3-directus-starter/raw/m2a/public/logos/vueuse.svg](https://github.com/bryantgillespie/nuxt3-directus-starter/raw/m2a/public/logos/vueuse.svg)

## VueUse

[VueUse](https://vueuse.org/) is already installed and configured so you can just import any of the composables in their library straight away.

---

# 🚧 Installation and Development

## Directus - Headless CMS

### 1 - Register for a Directus Cloud account

[https://directus.cloud/register](https://directus.cloud/register)

If you're prefer the self-hosted version, you can find [install instructions here](https://docs.directus.io/getting-started/installation/cli/).

### 2 - Create a new project

Make sure you save your project URL.

### 3 - Generate a static token for the admin user

You need the static token to seed the project.

1. Go to the User Directory
2. Choose the Adminstrative User
3. Scroll down to the Token field
4. Generate token and copy it
5. Save the user (don't forget to save!)

---

## Nuxt - Frontend

### 1 - Clone the repo

[Use This Template](https://github.com/bryantgillespie/nuxt3-directus-starter/generate)

_Or from the terminal_

`git clone  your-project`

### 2 - Fix your .env file

- Change the filename `env.example` to `.env`
- Add the url to your Directus instance
- Add the static token for your admin user you generated above

If you're using Directus Cloud, it should look something like this.

`DIRECTUS_URL="https://youruniquedomain.directus.app"
DIRECTUS_ADMIN_TOKEN="your_admin_static_token_here"`

If you're using the self hosted version, it should look something like this.

`DIRECTUS_URL="http://localhost:8055"`

### 3 - Install your dependencies

`yarn install`

### 4 - Seed your Directus project

### 6 - Start the development server\*\*

[http://localhost:3000](http://localhost:3000/)

`yarn dev`

### 7 - Build for production when you're ready

`yarn build`

---

# 🚢 Deployment

Be sure to check out the Nuxt 3 official [deployment documentation](https://v3.nuxtjs.org/docs/deployment).

**Netlify**

[https://camo.githubusercontent.com/417d890ba67c98ad5856b715343a61cdbf07d72b9bd5b79dd45d43de634c29ea/68747470733a2f2f7777772e6e65746c6966792e636f6d2f696d672f6465706c6f792f627574746f6e2e737667](https://camo.githubusercontent.com/417d890ba67c98ad5856b715343a61cdbf07d72b9bd5b79dd45d43de634c29ea/68747470733a2f2f7777772e6e65746c6966792e636f6d2f696d672f6465706c6f792f627574746f6e2e737667)

**Vercel**

[https://camo.githubusercontent.com/5e471e99e8e022cf454693e38ec843036ec6301e27ee1e1fa10325b1cb720584/68747470733a2f2f76657263656c2e636f6d2f627574746f6e](https://camo.githubusercontent.com/5e471e99e8e022cf454693e38ec843036ec6301e27ee1e1fa10325b1cb720584/68747470733a2f2f76657263656c2e636f6d2f627574746f6e)

---

# 💼 Other Resources

- **[Directus Discord](https://discord.com/invite/directus)**
- **[Nuxt Discord](https://discord.com/invite/ps2h6QT)**
