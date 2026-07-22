# Vercel dependency fix

The original package used `@react-three/fiber` v8 with React 19. R3F v8 requires React below 19, so npm stopped with ERESOLVE.

Updated versions:

- React: 19.2.0
- React DOM: 19.2.0
- @react-three/fiber: 9.6.1
- @react-three/drei: 10.7.7
- Three.js: 0.176.0

Delete any old `package-lock.json`, `node_modules`, and Vercel build cache before redeploying if the old dependency tree remains cached.
