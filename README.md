# Agency OS Website Template Readme

Complete, opinionated agency website template. Nuxt 3 + Directus for Headless CMS.

Spin up a beautiful site for your agency or freelancing business in minutes. Or use Agency OS as the foundation for your next client project.

---

_Brought to you by partnership magic ✨ between:_

[Directus](https://directus.io?ref=agency_os) + [NuxtLabs](https://nuxtlabs.com)

---

[**-> View The Demo Site**](https://agency-os.vercel.app/)

**Features**

- Complete Nuxt 3 website example
- Built-in Directus - Headless CMS support
- Tailwind CSS and HeadlessUI
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

---

# ⭐ Features

## Dynamic Page Builder

Includes 15 ready-to-go page blocks

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

## Dynamic Menus

## Dynamic Social Image Generation

## Dark Mode Support

Agency OS has full dark mode support.

Dark mode is already enabled in the `tailwind.config.js` and all the base components included have full support.

Dark mode toggling is provided by [VueUse `useDark` composable](https://vueuse.org/core/usedark/#usedark). And there is an example toggle component you can use.

If you don't wish to use dark mode, you can simply remove the composable and the `dark:` classes from the components.

## Tasteful Animations

Animations are handled using [@vueuse/motion](https://motion.vueuse.org/)

## Dev Toolbar

## Guest-Author Ready

## Content and Analytics Dashboards

## Pre-Built Automations

- Deploy Your Site
- Generate Social Images
- Create Slugs Automatically
- Post Approval Notifications

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

### Dropdown

### Alert

### Video

### Buttons

## Common Utilities

Nuxt 3 is configured by default to auto-import `/utils` directory.

---

# 🧰 Stack

<img src="./public/logos/nuxt3.svg" height="50" />

## Nuxt 3 - Front End Framework

Build your next Vue.js application with confidence using Nuxt. An open source framework under MIT license that makes web development simple and powerful. The leading Vue framework that handles routing, server side rendering, and more.

---

<img src="./public/logos/directus.svg" height="50" />

## Directus - Headless CMS

Directus is a headless CMS that instantly turns your SQL database into REST and GraphQL APIs and gives you a beautiful, intuitive no-code app to manage all your content and data.

But it's also more than just a headless CMS. It’s an open data platform that has all the tools you need for creating, managing, serving, visualizing, and even automating your data for your next web, mobile, or digital project.

⚡ Now with 🕸️🧦 WebSockets and GraphQL subscription support through Directus Realtime.

### Nuxt Plugin using Directus SDK

For a smooth experience, the [Directus SDK](https://docs.directus.io/reference/sdk/#javascript-sdk) is already integrated for you and availably globally as a Nuxt plugin.

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

---

<img src="./public/logos/tailwind.svg" height="40" />

## Tailwind CSS

[Tailwind](https://tailwindcss.com/) is a utility-first CSS framework that allows you to rapidly build sites and maintain consistency across team members.

There are several Tailwind Plugins installed and ready to use as well.

- [Typography](https://tailwindcss.com/docs/typography-plugin)
- [Forms](https://tailwindcss.com/docs/plugins#forms)

---

<img src="./public/logos/headlessui.svg" height="50" />

## Headless UI

[Headless UI](https://headlessui.dev/) makes it simple to implement accessible custom components like dropdowns, modals, and select boxes.

---

<img src="./public/logos/formkit.svg" height="50" />

## FormKit

[FormKit](https://formkit.com/) is form library for Vue that saves you hours of time by simplifying form creation. Includes error handling, validation, theming, and even generation from a schema out of the box.

---

<img src="./public/logos/vueuse.svg" height="50" />

## VueUse

[VueUse](https://vueuse.org/) is already installed and configured so you can just import any of the composables in their library straight away.

---

# 🚧 Installation and Development

## Directus - Headless CMS

### 1 - Register for a Directus Cloud account

[https://directus.cloud/register](https://directus.cloud/register)

If you're prefer the self-hosted version, you can find [install instructions using Docker here](https://docs.directus.io/self-hosted/quickstart.html).

### 2 - Create a new project

Make sure you save your project URL.

### 3 - Generate a static token for the admin user

You need the static token to seed the project.

1. Go to the User Directory
2. Choose the Adminstrative User
3. Scroll down to the Token field
4. Generate token and copy it
5. Save the user (don't forget to save!)

### 4 - Apply the Template

Open your terminal run the following command and simply follow the prompts.

`npx directus-template-cli apply`

1. Choose the `Headless CMS - Website` template.
2. Paste the URL to your Directus instance
3. Paste your Admin user static token
4. Wait for script to finish

---

## Nuxt - Frontend

### 1 - Clone the repo

[Use This Template](https://github.com/directus-community/agency-os/generate)

_Or from the terminal_

`git clone https://github.com/directus-community/agency-os.git your-project`

### 2 - Fix your .env file

- Change the filename `env.example` to `.env`
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
DIRECTUS_ADMIN_TOKEN="your_admin_static_token_here"
```

### 3 - Install your dependencies

`yarn install`

### 4 - Start the development server

`yarn dev`

[http://localhost:3000](http://localhost:3000/)

### 5 - Build for production when you're ready

`yarn build`

---

# 🚢 Deployment

Be sure to check out the Nuxt 3 official [deployment documentation](https://v3.nuxtjs.org/docs/deployment).

**Netlify**

<a href="https://app.netlify.com/start/deploy?repository=https://github.com/bryantgillespie/nuxt3-directus-starter#DIRECTUS_URL=https://youruniqueid.directus.app"><img src="https://www.netlify.com/img/deploy/button.svg" alt="Deploy to Netlify"></a>

**Vercel**

<a href="https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fbryantgillespie%2Fnuxt3-directus-starter%2F&env=DIRECTUS_URL&demo-title=Directus%20Nuxt%203%20Starter%20&demo-description=Nuxt%203%20starter%20for%20Directus%20with%20Tailwind%20CSS%20and%20lots%20of%20other%20goodies&demo-url=https%3A%2F%2Fdirectus-nuxt3-starter.netlify.app%2F&demo-image=https%3A%2F%2F4bgd2mtg.directus.app%2Fassets%2F0d374f4a-9111-4b4f-90d0-cff45a92a784"><img src="https://vercel.com/button" alt="Deploy with Vercel"/></a>

---

# 💼 Other Resources

- **[Directus Discord](https://discord.com/invite/directus)**
- **[Nuxt Discord](https://discord.com/invite/ps2h6QT)**
