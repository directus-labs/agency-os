[![npm version](https://badge.fury.io/js/directus-extension-schema-management-module.svg)](https://badge.fury.io/js/directus-extension-schema-management-module)

# Introduction
Tired of creating the same collection all over again? This module extension can make it easier to share schema between Directus instances. Simply copy the schema code from one Directus and paste it to the other and you are done.

- **Export/import schema definitions as code**. Choose any collections you want to export as code. You can choose to download or view the code. The downloaded code can be uploaded to another Directus to restore the chosen collections.
- **Lightweight**. No third-party libraries.
- **Schema Presets**. A preset consists of many collections predesigned for a specific use case such as Content Management System or E-commerce. You can choose one or multiple presets based on your use case to set up your Directus app rapidly. For more information about the design & detailed installation, visit [directus-schema-presets](https://github.com/rezo-labs/directus-schema-presets).

![](./screenshots/screenshot1.jpeg)
![](./screenshots/screenshot2.jpeg)

# Installation
```
npm i directus-extension-schema-management-module
```

# Get Started
1. Go to **Settings** -> **Project Settings**, in the **Modules** section, enable module **Schema Management Module**.
2. Go to **Schema Management Module**. 

# TODO
- Automatically select junction collections when selecting collections that have M2M relations.
- Automatically rollback if importing failed.
