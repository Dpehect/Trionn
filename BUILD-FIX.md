# Vercel build fix

This package fixes the deployment failure caused by stale test tooling left in the repository root.

## Changes

- Excludes `playwright.config.ts`, `tests`, `e2e`, and test/spec files from the production TypeScript program.
- Disables Next.js build-time ESLint; linting remains available through `npm run lint`.
- Migrates deprecated `@studio-freight/lenis` to `lenis`.
- Pins Next.js to patched `15.5.21`.
- Pins React and React DOM to the same `19.1.0` version through npm overrides.

## Important when replacing the repository

Delete obsolete files that are not present in this package, especially:

- `playwright.config.ts`
- `tests/`
- `e2e/`
- old `package-lock.json`
- old `.eslintrc*` files

Then run `npm install` once to create a clean lockfile before committing.
