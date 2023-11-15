<a href="https://directus.io" target="_blank">
  <img alt="Agency OS - Complete Nuxt3 + Directus project" src="./public/logos/agencyos.png">
  <h1 align="center">AgencyOS</h1>
</a>

<p align="center">AgencyOS is everything you need to get your agency off the ground, or improve tooling for your existing company. Nuxt 3 Website / Application + Directus Backend.</p>

<p align="center"><em>Brought to you by partnership magic ✨ between <a href="https://directus.io" target="_blank">Directus</a> and <a href="https://nuxtlabs.com" target="_blank">NuxtLabs</a>.</em>
</p>

<p align="center">
  <a href="#introduction"><strong>Introduction</strong></a> ·
  <a href="#features"><strong>⭐ Features</strong></a> ·
  <a href="#installation-and-development"><strong>🚧 Installation and Development</strong></a> ·
  <a href="#deployment"><strong>🚢 Deployment</strong></a> ·
  <a href="#-tech-stack"><strong>🧰 Tech Stack</strong></a> ·
  <a href="#community-help"><strong>🛟 Community Help</strong></a> ·
  <a href="#%EF%B8%8F-contributing"><strong>❤️ Contributing</strong></a>
</p>
<br/>
<br />

# Introduction

One of the **easiest parts** of running a successful digital agency is doing the **actual work**. I mean - who doesn’t
love to put their head down to collaborate, design, and build amazing stuff for clients?

The **hard bits** are everything else that goes along with that – managing large projects with tons of moving pieces,
communicating with clients to properly manage expectations, ensuring you’re paid on time, and more.

When every billable hour counts, you don’t have the time to build your own tools from scratch. And you shouldn’t be
forced to settle for off-the-shelf tech that falls short of your preferred workflow.

**AgencyOS is the open source operating system to help you run (or start) your digital agency.** It’s built on open
source tools (Nuxt and Directus) and designed to be 100% hackable so you can build YOUR solution, YOUR project
management app, YOUR agency’s operating system – in record time.

**Why?**

Quite a few folks on the [Directus](https://github.com/directus/directus) core team have experience running agencies and
we know it’s not all rainbows and sunshine. We wanted to build an tool that our
[agency partners](https://directus.io/solutions/agencies) (and any other agency) would get a lot of value from. It was
also created as a complete example to showcase the power and flexibility of Directus as a platform to rapidly build your
own apps and tools.

**Getting Started**

- → **[Read Installation Instructions](#🚧-installation-and-development)**
- → **[View The Demo Site](https://agency-os.vercel.app/)**
- → **[Watch the Video Tutorials](https://www.youtube.com/playlist?list=PLD--x9rY3ZL1tPNZxCTE_-IsFTrFGKHH-)**

---

# ⭐ Features

## Website

When you’re hard at work delivering for clients - your own site tends to suffer. AgencyOS includes beautiful website
template that’s easily customizable and already integrated with an easy-to-use headless CMS.

It’s not a starter template. It’s a complete website project for you customize or inspire you to build an even better
solution.

- Dynamic page builder with live preview
- Blog posts and categories
- Dynamic form generation with validation
- Dynamic OG image generation
- Full SEO support out of the box – (meta tags, sitemap, redirects, JSON-LD, and more)
- Global search functionality
- Common utilities so you don't need to include yet another package
- Google Fonts support
- ESLint and Prettier pre-configured
- Full dark mode support
- Themeable with easy config file

### CRM / Project Tracker

Maintaining important client relationships doesn’t just fall to the sales team. So why maintain separate project
management and CRM tools? AgencyOS includes a completely customizable CRM so you can work the way you want.

- Organizations and contacts
- Sales pipeline and activities
- Dynamic project proposal builder
- Project and task management
- Customizable project templates
- Invoicing and expense tracking
- Customize and build your own dashboards without writing code
- Automate processes using Directus Flows

### Client Portal

Communication is probably the biggest driver of project success. With AgencyOS’s private client portal - you can insure
your clients stay up to date and even hold them accountable for delivering the files and information you need to
complete their project

- Private authenticated portal for clients to self-serve
- Clients can view their projects, tasks, and files
- Clients can pay invoices through Stripe
- Assign tasks to clients as part of project templates

<br />

---

<br />

# **🚧 Installation and Development**

There are two main pieces to AgencyOS - the backend and APIs powered by [Directus](https://directus.io) and the frontend
website and application powered by [Nuxt](https://nuxt.com).

## **🐰 Directus - Backend + Headless CMS**

### 1 - Create a Directus project

There are two ways you can quickly setup a Directus project to use for AgencyOS.

**1a - Register for a Directus Cloud account**

https://directus.cloud/register

This is the easy button. You don’t have to mess with Docker or working out how to deploy a Directus instance at AWS,
Digital Ocean, or similar hosts. A couple of clicks and in less than 2 minutes you’ll have a ready to go Directus
project.

Directus offers a 14 day free trial for Cloud projects which is plenty of time to give AgencyOS a spin. Note: After the
14 day trial you will need to pay for the service.
[Consult the Directus pricing page](https://directus.io/pricing/cloud) for the latest pricing information.

OR

**1b - Self Host a Directus Instance**

If you're prefer to self-host Directus, we highly recommend you do so with Docker.

**Important Note**: This is a free and open source community release. Therefore, we cannot provide support for
self-hosted instances WITHOUT an Enterprise Self-Hosted license or formal support agreement.
[Learn more and contact our team for details on Enterprise Self-Hosted](https://directus.io/pricing/self-hosted).

You’ll find a `docker-compose.yaml` inside the repo that you can use to quickly spin up a local instance of Directus to
test with. You should have Docker installed and running on your machine first. You
can **[download it here](https://docs.docker.com/get-docker/)**.

[PostgreSQL](https://www.postgresql.org/) is the **tested and preferred** database vendor for this project. The project
has been tested and verified to work against the docker-compose.yaml file included in the repo. Directus does support
many different SQL database vendors, but we ONLY test this project against PostgreSQL.

```bash
# Navigate to the .directus directory
$ cd .directus

# Run docker compose
$ docker compose up

# Docker does it's thing and your Directus project will be available at http://localhost:8055/ or http://0.0.0.0:8055/
```

You can find more [install instructions using Docker here](https://docs.directus.io/self-hosted/quickstart.html) on the
Directus documentation.

For deploying the project live, please see the [Deployment](#deployment) section.

### 2 **- Generate a static token for the admin user**

You need the static token to seed the project.

1. Go to the User Directory
2. Choose the Administrative User
3. Scroll down to the Token field
4. Generate token and copy it
5. Save the user (do NOT forget to save because you’ll get an error that shows Invalid token!)

### 3 **- Apply the AgencyOS Template**

Open your terminal, run the following command, and simply follow the prompts.

`npx directus-template-cli@latest apply`

Using the @latest tag ensures you download the most up to date version of our templates - in case you've ran the command
previously.

1. Choose the `Agency OS` template.
2. Paste the URL to your Directus instance
3. Paste your Admin user static token
4. Wait for script to finish

You can learn more about the
[Directus Template CLI tool here](https://github.com/directus-community/directus-template-cli). _Note_: It can take a
few minutes for the template script to run if you’re using a remotely hosted Directus instance.

<br />

---

<br />

## **⛰️ Nuxt - Frontend**

For your website and client portal, AgencyOS uses Nuxt as the frontend framework of choice.

### **1 - Clone the repo**

[Use This Template](https://github.com/directus-community/agency-os/generate)

_Or from the terminal_

`git clone https://github.com/directus-community/agency-os.git your-project`

Navigate to the project

`cd your-project`

### **2 - Fix your .env file**

- Change the filename `env.example` to `.env`
- Add the url to your Directus instance
- Add the static token for your admin user you generated above

Your `.env` file should look similar to this.

```env
# Directus Setup
DIRECTUS_URL="https://your-instance.directus.app"
DIRECTUS_SERVER_TOKEN="your_directus_server_token_for_server_only_routes"
SITE_URL="http://localhost:3000"

# Stripe Setup (If you want to allow payments within the portal)
STRIPE_SECRET_KEY=sk_test_xxxxxxxxxxxxxxx
STRIPE_PUBLISHABLE_KEY=pk_xxxxxxxxxxxxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxxxx
```

### **3 - Install your dependencies**

`pnpm i`

### **4 - Start the development server**

`pnpm dev`

[http://localhost:3000](http://localhost:3000/)

### **5 - Build for production when you're ready**

`pnpm build`

<br />

# 🚢 Deployment

## **Deploying Nuxt - Frontend**

Please check the official [Nuxt Deployment Documentation](https://nuxt.com/docs/getting-started/deployment) for the
supported providers. Here’s a few of the more popular hosts that work well with Nuxt.

### One Click Options

Note: Vercel is the recommended deployment target for AgencyOS at the moment because of a few memory issues with the
build process on Netlify.

**Vercel**

<a href="https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fdirectus-community%2Fagency-os&env=DIRECTUS_URL,DIRECTUS_SERVER_TOKEN,NUXT_PUBLIC_SITE_URL,STRIPE_SECRET_KEY,STRIPE_PUBLISHABLE_KEY,STRIPE_WEBHOOK_SECRET&project-name=agency-os&demo-title=AgencyOS&demo-description=AgencyOS%20is%20everything%20you%20need%20to%20get%20your%20agency%20off%20the%20ground%2C%20or%20improve%20tooling%20for%20your%20existing%20company.%20Nuxt%203%20Website%20%2F%20Application%20%2B%20Directus%20Backend.&demo-url=https%3A%2F%2Fagencyos.dev&demo-image=https%3A%2F%2Fgithub.com%2Fdirectus-community%2Fagency-os%2Fraw%2Fmain%2Fpublic%2Flogos%2Fagencyos.png&skippable-integrations=1"><img src="https://vercel.com/button" alt="Deploy with Vercel"/></a>

**Netlify**

<a href="https://app.netlify.com/start/deploy?repository=https://github.com/directus-community/agency-os#DIRECTUS_URL=https://youruniqueid.directus.app"><img src="https://www.netlify.com/img/deploy/button.svg" alt="Deploy to Netlify"></a>

## **Deploying Directus - Backend**

If you don't want to mess with DevOps or spinning up servers, you
can [spin up a new project on Directus Cloud](https://directus.cloud/) in about 90 seconds.

If you prefer self-hosting, Docker is the recommended way to deploy Directus. Please check the
official [Directus Docker Guide](https://docs.directus.io/self-hosted/docker-guide.html)

**Resources for Self Hosting Directus**

- [Deploy Directus to DigitalOcean with Docker](https://docs.directus.io/blog/deploy-directus-digital-ocean-docker.html)
- [Deploy Directus on Railway](https://railway.app/template/2fy758)

<br />

---

<br />

# 🧰 Tech Stack

<a href="https://nuxt.com" target="_blank"><img src="./public/logos/nuxt3.svg" height="40" /></a>

## Nuxt

Build your next Vue.js application with confidence using Nuxt. An open source framework under MIT license that makes web
development simple and powerful. The leading Vue framework that handles routing, server side rendering, and more.

[Learn more about Nuxt](https://nuxt.com)

<br />

<a href="https://directus.io" target="_blank"><img src="./public/logos/directus.svg" height="50" /></a>

## Directus

Directus is a headless CMS that instantly turns your SQL database into REST and GraphQL APIs and gives you a beautiful,
intuitive no-code app to manage all your content and data. But it's also more than just a headless CMS. It’s an open
data platform that has all the tools you need for creating, managing, serving, visualizing, and even automating your
data for your next web, mobile, or digital project.

[Learn more about Directus](https://directus.io)

---

## UI

- [Nuxt UI](https://ui.nuxt.com/) - Fully styled and customizable components for Nuxt. Nuxt UI is the official UI
  component library for Nuxt.
- [Tailwind CSS](https://tailwindcss.com/) – Utility-first CSS framework that allows you to rapidly build sites and
  maintain consistency across team members. There are several Tailwind Plugins installed and ready to use as well –
  [Typography](https://tailwindcss.com/docs/typography-plugin) and [Forms](https://tailwindcss.com/docs/plugins#forms).
- [Headless UI](https://headlessui.dev/) – Completely unstyled, fully accessible UI components.
- [FormKit](https://formkit.com/) – Form library for Vue that saves you hours of time by simplifying form creation.
  Includes error handling, validation, theming, and even generation from a schema out of the box.
- [Nuxt Icon](https://github.com/nuxt-modules/icon) - Adds `<Icon>` component that allows you use tons of icons.
  [See available icons here](https://icones.js.org/).

## Utilities

- [VueUse](https://vueuse.org/) – Collection of Vue Composition Utilities. Already installed and configured so you can
  just import any of the composables in their library straight away.
- [VueUse Motion](https://motion.vueuse.org/) – Composables putting your components in motion. Makes it easy to provide
  tasteful animations with less effort.

<br />

# 🛟 Community Help

For community help or support, please see the Directus Discord server.

- **[Directus Discord](https://discord.com/invite/directus)** – Join over 10k+ developers and community members to ask
  questions and live discussion around Directus.
- **[Nuxt Discord](https://discord.com/invite/ps2h6QT)**

<br />

# ❤️ Contributing

AgencyOS is a community driven project so we'd love to have your contributions.

Here's how you can contribute:

- [Open an issue](https://github.com/directus-community/agency-os/issues) if you believe you've encountered a bug.
- [Make a pull request](https://github.com/directus-community/agency-os/pulls) to add new features/make quality-of-life
  improvements/fix bugs.

## 🙏 Thanks To

AgencyOS was created by Bryant Gillespie ([@bryantgillespie](https://twitter.com/bryantgillespie)). But big thank yous
are owed to...

- [@rijkvanzanten](https://github.com/rijkvanzanten) and [@benhaynes](https://github.com/benhaynes) for building
  Directus and including me on the journey.
- [@atinux](https://github.com/Atinux) and [@alexchopin](https://github.com/alexchopin) for creating the Nuxt framework.
- [@intevel](https://github.com/Intevel) and [@becem-gharbi](https://github.com/becem-gharbi) for each of their separate
  `nuxt-directus` modules which served as source of inspiration.
