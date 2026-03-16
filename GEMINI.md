# Yarn 4 Monorepo

Welcome! This repository is set up as a Yarn 4 (Berry) monorepo using workspaces.

## How to use Yarn in this project

1.  **Installation**: Yarn is managed via Corepack. Run `corepack enable` if it's not already enabled on your machine.
2.  **Add a dependency**:
    *   To a specific package: `yarn workspace <package-name> add <library>`
    *   To the root (dev only): `yarn add -D <library>`
3.  **Run a script**: `yarn workspace <package-name> run <script-name>` (e.g., `yarn workspace server-website dev`)
4.  **Install all dependencies**: Run `yarn` in the root.
5.  **Add a new package**: Create a folder in `packages/` and run `yarn init` inside it.

## Package Structure

- `packages/user-agent`: Node.js + TypeScript
- `packages/server-agent`: Node.js + TypeScript
- `packages/server-website`: Vite + React + Tailwind + TypeScript
- `packages/chrome-extension`: Vite + React + Tailwind + TypeScript
