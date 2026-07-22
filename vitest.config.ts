import { defineConfig } from "vitest/config";
import path from "node:path";

export default defineConfig({
  test:{
    environment:"jsdom",
    setupFiles:["./src/test/setup.ts"],
    coverage:{
      provider:"v8",
      reporter:["text","json-summary","html"],
      thresholds:{ lines:70, functions:70, branches:65, statements:70 },
      exclude:["src/lib/database.generated.ts","src/app/**/layout.tsx"],
    },
  },
  resolve:{alias:{"@":path.resolve(__dirname,"./src")}},
});
