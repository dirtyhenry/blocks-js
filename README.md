<h1 align="center">
    <img 
        src="https://raw.githubusercontent.com/dirtyhenry/web-blocks/main/web-blocks.jpg"
        alt="web-blocks logo">
</h1>

# 🧱 Blocks

A collection of my Web building blocks.

## How this works

This repo is powered by:

- 🏎 [Turborepo](https://turborepo.org) — High-performance build system for
  Monorepos
- 🚀 [React](https://reactjs.org/) — JavaScript library for user interfaces
- 🛠 [Tsup](https://github.com/egoist/tsup) — TypeScript bundler powered by
  esbuild
- 📖 [Storybook](https://storybook.js.org/) — UI component environment powered
  by Vite

As well as a few others tools preconfigured:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting
- [Changesets](https://github.com/changesets/changesets) for managing versioning
  and changelogs
- [GitHub Actions](https://github.com/changesets/action) for fully automated
  package publishing

## Using this example

To be completed.

### Useful Commands

- `yarn build` - Build all packages including the Storybook site
- `yarn dev` - Run all packages locally and preview with Storybook
- `yarn lint` - Lint all packages
- `yarn run changeset` - Generate a changeset
- `yarn clean` - Clean up all `node_modules` and `dist` folders (runs each
  package's clean script)

## Apps & Packages

This Turborepo includes the following packages and applications:

- `apps/docs`: Component documentation site with Storybook
- `packages/@dirtyhenry/utils`: Shared React utilities
- `packages/@dirtyhenry/tsconfig`: Shared `tsconfig.json`s used throughout the
  Turborepo
- `packages/@statium/core`: Core React components for Statium
- `packages/eslint-config-dirtyhenry`: ESLint preset

Each package and app is 100% [TypeScript](https://www.typescriptlang.org/). Yarn
Workspaces enables us to "hoist" dependencies that are shared between packages
to the root `package.json`. This means smaller `node_modules` folders and a
better local dev experience. To install a dependency for the entire monorepo,
use the `-W` workspaces flag with `yarn add`.

This example sets up your `.gitignore` to exclude all generated files, other
folders like `node_modules` used to store your dependencies.

### Compilation

To make the core library code work across all browsers, we need to compile the
raw TypeScript and React code to plain JavaScript. We can accomplish this with
`tsup`, which uses `esbuild` to greatly improve performance.

Running `yarn build` from the root of the Turborepo will run the `build` command
defined in each package's `package.json` file. Turborepo runs each `build` in
parallel and caches & hashes the output to speed up future builds.

For `statium-core`, the `build` command is the following:

```bash
tsup src/index.tsx --format esm,cjs --dts --external react
```

`tsup` compiles `src/index.tsx`, which exports all of the components in the
design system, into both ES Modules and CommonJS formats as well as their
TypeScript types. The `package.json` for `statium-core` then instructs the
consumer to select the correct format:

```json:statium-core/package.json
{
  "name": "@statium/core",
  "version": "0.0.0",
  "main": "./dist/index.js",
  "module": "./dist/index.mjs",
  "types": "./dist/index.d.ts",
  "sideEffects": false,
}
```

Run `yarn build` to confirm compilation is working correctly. You should see a
folder `statium-core/dist` which contains the compiled output.

```bash
statium-core
└── dist
    ├── index.d.ts  <-- Types
    ├── index.js    <-- CommonJS version
    └── index.mjs   <-- ES Modules version
```

## Components

Each file inside of `statium-core/src` is a component inside our design system.
For example:

```tsx:statium-core/src/Button.tsx
import * as React from 'react';

export interface ButtonProps {
  children: React.ReactNode;
}

export function Button(props: ButtonProps) {
  return <button>{props.children}</button>;
}

Button.displayName = 'Button';
```

When adding a new file, ensure the component is also exported from the entry
`index.tsx` file:

```tsx:statium-core/src/index.tsx
import * as React from "react";
export { Button, type ButtonProps } from "./Button";
// Add new component exports here
```

## Storybook

Storybook provides us with an interactive UI playground for our components. This
allows us to preview our components in the browser and instantly see changes
when developing locally. This example preconfigures Storybook to:

- Use Vite to bundle stories instantly (in milliseconds)
- Automatically find any stories inside the `stories/` folder
- Support using module path aliases like `@dirtyhenry/statium-core` for imports
- Write MDX for component documentation pages

For example, here's the included Story for our `Button` component:

```js:apps/docs/stories/button.stories.mdx
import { Button } from '@dirtyhenry/statium-core/src';
import { Meta, Story, Preview, Props } from '@storybook/addon-docs/blocks';

<Meta title="Components/Button" component={Button} />

# Button

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget consectetur tempor, nisl nunc egestas nisi, euismod aliquam nisl nunc euismod.

## Props

<Props of={Box} />

## Examples

<Preview>
  <Story name="Default">
    <Button>Hello</Button>
  </Story>
</Preview>
```

This example includes a few helpful Storybook scripts:

- `yarn dev`: Starts Storybook in dev mode with hot reloading at
  `localhost:6006`
- `yarn build`: Builds the Storybook UI and generates the static HTML files
- `yarn preview-storybook`: Starts a local server to view the generated
  Storybook UI

## Versioning & Publishing Packages

This example uses [Changesets](https://github.com/changesets/changesets) to
manage versions, create changelogs, and publish to npm. It's preconfigured so
you can start publishing packages immediately.

You'll need to create an `NPM_TOKEN` and `GITHUB_TOKEN` and add it to your
GitHub repository settings to enable access to npm. It's also worth installing
the [Changesets bot](https://github.com/apps/changeset-bot) on your repository.

### Generating the Changelog

To generate your changelog, run `yarn run changeset` locally:

1. **Which packages would you like to include?** – This shows which packages and
   changed and which have remained the same. By default, no packages are
   included. Press `space` to select the packages you want to include in the
   `changeset`.
1. **Which packages should have a major bump?** – Press `space` to select the
   packages you want to bump versions for.
1. If doing the first major version, confirm you want to release.
1. Write a summary for the changes.
1. Confirm the changeset looks as expected.
1. A new Markdown file will be created in the `changeset` folder with the
   summary and a list of the packages included.

### Releasing

When you push your code to GitHub, the
[GitHub Action](https://github.com/changesets/action) will run the `release`
script defined in the root `package.json`:

```bash
turbo run build --filter=docs^... && changeset publish
```

Turborepo runs the `build` script for all publishable packages (excluding docs)
and publishes the packages to npm.
