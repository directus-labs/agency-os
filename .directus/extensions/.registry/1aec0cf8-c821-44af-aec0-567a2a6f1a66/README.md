# Directus extension - M2M tags

![](https://raw.githubusercontent.com/dimitrov-adrian/directus-extension-tags-m2m-interface/main/screenshot.gif)

Use M2M relation with quick item referencing in tagging style.

## Installation

In your Directus installation root

```bash
npm install directus-extension-tags-m2m-interface
```

Restart directus

## How to use

1. Create new M2M relation field to your collection
2. For interface select **Tags**
3. Select **Corresponding Field**

The interface uses the corresponding field to make the references, if no related item exists, then new one will be
created with just the value set for the field. Please note that if you collection have some other required fields
without default value, then probabbly saving will throw an error message.

## Building locally and contributing

You can also clone this repository and build it by yourself.

```
npm ci
npm run build
```

Then use `dist/index.js` in your custom `/extensions/interfaces/tags-m2m` directory or create a symlink so `npm run dev`
to rebuild upon a change.

## FAQ

### Why this extension?

This extension is some kind of fork of my [PR #3654](https://github.com/directus/directus/pull/3654) with some
modifications.
