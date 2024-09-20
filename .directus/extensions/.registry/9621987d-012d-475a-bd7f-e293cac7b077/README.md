# Directus Tab Group Interface

A tab group interface for Directus.
This interface allows you to group fields into tabs as an alternative to
the default accordion group.

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="./docs/screenshot-dark.png">
  <img alt="Screenshot of the tab group interface" src="./docs/screenshot-light.png">
</picture>

## Installation

Add `directus-extension-group-tabs-interface` to your project:


```shell
# Using pnpm
pnpm add directus-extension-group-tabs-interface
# Using yarn
yarn add directus-extension-group-tabs-interface
# Using npm
npm install directus-extension-group-tabs-interface
```

## Usage

When creating a new field you can select `Tab Group` in the `Groups` section.

Alternatively you can change the interface of an existing group field in the
`Interface` section.

### Options

- `Overwrite Group Width`: If checked, force Directus to display the tab list in the "Fill Width" mode.
Normally, the width option is not available for groups, but so far no problems have been encountered. Please open an
issue if you encounter any visual bugs.

