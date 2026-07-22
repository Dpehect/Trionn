# Changed files

Replace these files in the project root:

- `package.json`
- `components/SmoothScroll.tsx`

Then delete the old dependency lock/cache and reinstall:

```bash
rm -rf node_modules package-lock.json .next
npm install
npm run build
```

On Vercel, redeploy without the previous build cache.
