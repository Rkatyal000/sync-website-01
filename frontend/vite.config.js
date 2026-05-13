import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

/**
 * Vite configuration for the SYNC media frontend.
 *
 * Notes:
 *  - Preserves CRA behavior wherever possible to keep the UI 100% identical:
 *      • `@/...` path alias points to `src/`.
 *      • `process.env.REACT_APP_*` (and `import.meta.env.REACT_APP_*`) keep working.
 *      • Dev server listens on host 0.0.0.0:3000 to remain compatible with the
 *        platform supervisor and the production preview proxy on :443.
 *  - JSX inside `.js` files is intentionally allowed (CRA tolerated this) so we
 *    don't need to rename hundreds of files. esbuild is configured to parse
 *    `.js` as JSX.
 */
export default defineConfig(({ mode }) => {
  // Load all REACT_APP_* and VITE_* variables from .env files for the
  // current mode (development / production). Then re-export them as
  // `process.env.<NAME>` so legacy CRA code (`process.env.REACT_APP_*`)
  // keeps working without touching application files.
  const env = loadEnv(mode, process.cwd(), ["REACT_APP_", "VITE_"]);
  const processEnvDefines = Object.fromEntries(
    Object.entries(env).map(([k, v]) => [`process.env.${k}`, JSON.stringify(v)]),
  );

  return {
  plugins: [
    react({
      // Allow JSX in `.js` files to keep CRA file naming intact.
      include: /\.(jsx?|tsx?)$/,
    }),
  ],

  // Keep CRA-style env vars working.
  envPrefix: ["REACT_APP_", "VITE_"],

  // Expose `process.env.REACT_APP_*` in client code for CRA compatibility.
  define: {
    ...processEnvDefines,
  },

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },

  // Treat .js files as JSX (CRA + many existing files contain JSX inside .js).
  esbuild: {
    loader: "jsx",
    include: /src\/.*\.[jt]sx?$/,
    exclude: [],
  },

  optimizeDeps: {
    esbuildOptions: {
      loader: { ".js": "jsx" },
    },
  },

  server: {
    host: "0.0.0.0",
    port: 3000,
    strictPort: true,
    // The preview is served via HTTPS on :443 through Emergent's ingress.
    // Configure HMR so the browser connects back over wss:// on :443.
    hmr: {
      clientPort: 443,
      protocol: "wss",
    },
    // Allow all hosts (preview emergentagent.com sub-domains).
    allowedHosts: true,
    watch: {
      ignored: [
        "**/node_modules/**",
        "**/.git/**",
        "**/build/**",
        "**/dist/**",
        "**/coverage/**",
      ],
    },
  },

  preview: {
    host: "0.0.0.0",
    port: 3000,
    strictPort: true,
    allowedHosts: true,
  },

  build: {
    outDir: "build", // keep CRA-compatible output dir
    sourcemap: false,
    chunkSizeWarningLimit: 1200,
  },
  };
});
