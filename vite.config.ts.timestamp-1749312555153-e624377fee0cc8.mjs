var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});

// vite.config.ts
import { defineConfig } from "file:///home/project/node_modules/vite/dist/node/index.js";
import react from "file:///home/project/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { VitePWA } from "file:///home/project/node_modules/vite-plugin-pwa/dist/index.js";
import legacy from "file:///home/project/node_modules/@vitejs/plugin-legacy/dist/index.mjs";
import compression from "file:///home/project/node_modules/vite-plugin-compression/dist/index.mjs";
var vite_config_default = defineConfig({
  plugins: [
    react({
      // Enable React Fast Refresh
      fastRefresh: true,
      // Optimize React imports
      jsxImportSource: "@emotion/react"
    }),
    // PWA for caching and offline support
    VitePWA({
      registerType: "autoUpdate",
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg,jpg,jpeg,webp}"],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/images\.pexels\.com\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "pexels-images",
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 * 30
                // 30 days
              }
            }
          },
          {
            urlPattern: /^https:\/\/cdn\.simpleicons\.org\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "simple-icons",
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 * 30
                // 30 days
              }
            }
          },
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: "StaleWhileRevalidate",
            options: {
              cacheName: "google-fonts-stylesheets"
            }
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "google-fonts-webfonts",
              expiration: {
                maxEntries: 30,
                maxAgeSeconds: 60 * 60 * 24 * 365
                // 1 year
              }
            }
          }
        ]
      }
    }),
    // Legacy browser support
    legacy({
      targets: ["defaults", "not IE 11"]
    }),
    // Gzip compression
    compression({
      algorithm: "gzip",
      ext: ".gz",
      threshold: 1024
    }),
    // Brotli compression (better than gzip)
    compression({
      algorithm: "brotliCompress",
      ext: ".br",
      threshold: 1024
    })
  ],
  build: {
    // Enable minification
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ["console.log", "console.info", "console.debug", "console.warn"]
      },
      mangle: {
        safari10: true
      }
    },
    // Code splitting optimization
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunks
          "react-vendor": ["react", "react-dom"],
          "animation-vendor": ["framer-motion"],
          "ui-vendor": ["lucide-react", "react-intersection-observer", "react-tilt"],
          // Component chunks
          "hero-chunk": ["./src/components/Hero.tsx"],
          "about-chunk": ["./src/components/About.tsx"],
          "projects-chunk": ["./src/components/Projects.tsx"],
          "skills-chunk": ["./src/components/Skills.tsx"],
          "contact-chunk": ["./src/components/Contact.tsx"]
        },
        // Optimize chunk file names
        chunkFileNames: (chunkInfo) => {
          const facadeModuleId = chunkInfo.facadeModuleId ? chunkInfo.facadeModuleId.split("/").pop().replace(".tsx", "") : "chunk";
          return `js/${facadeModuleId}-[hash].js`;
        },
        entryFileNames: "js/[name]-[hash].js",
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split(".");
          const ext = info[info.length - 1];
          if (/\.(css)$/.test(assetInfo.name)) {
            return `css/[name]-[hash].${ext}`;
          }
          if (/\.(png|jpe?g|svg|gif|tiff|bmp|ico)$/i.test(assetInfo.name)) {
            return `images/[name]-[hash].${ext}`;
          }
          return `assets/[name]-[hash].${ext}`;
        }
      }
    },
    // Increase chunk size warning limit
    chunkSizeWarningLimit: 1e3,
    // Enable source maps for production debugging (optional)
    sourcemap: false,
    // Target modern browsers for better optimization
    target: "es2020",
    // Optimize CSS
    cssCodeSplit: true,
    // Optimize assets
    assetsInlineLimit: 4096
    // 4kb
  },
  optimizeDeps: {
    include: [
      "react",
      "react-dom",
      "framer-motion",
      "lucide-react",
      "react-intersection-observer",
      "react-tilt"
    ],
    exclude: ["@vite/client", "@vite/env"],
    // Force optimization of these dependencies
    force: true
  },
  // Enable CSS code splitting
  css: {
    devSourcemap: false,
    // CSS optimization
    postcss: {
      plugins: [
        __require("file:///home/project/node_modules/autoprefixer/lib/autoprefixer.js"),
        __require("file:///home/project/node_modules/cssnano/src/index.js")({
          preset: "default"
        })
      ]
    }
  },
  // Server configuration for development
  server: {
    hmr: {
      overlay: false
    },
    // Enable HTTP/2
    https: false,
    // Optimize dev server
    fs: {
      strict: true
    }
  },
  // Resolve configuration
  resolve: {
    alias: {
      "@": "/src"
    }
  },
  // Define global constants
  define: {
    __DEV__: JSON.stringify(process.env.NODE_ENV === "development")
  },
  // Experimental features
  experimental: {
    renderBuiltUrl(filename, { hostType }) {
      if (hostType === "js") {
        return { js: `/${filename}` };
      } else {
        return { relative: true };
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9wcm9qZWN0XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvaG9tZS9wcm9qZWN0L3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9ob21lL3Byb2plY3Qvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJztcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCc7XG5pbXBvcnQgeyBWaXRlUFdBIH0gZnJvbSAndml0ZS1wbHVnaW4tcHdhJztcbmltcG9ydCBsZWdhY3kgZnJvbSAnQHZpdGVqcy9wbHVnaW4tbGVnYWN5JztcbmltcG9ydCBjb21wcmVzc2lvbiBmcm9tICd2aXRlLXBsdWdpbi1jb21wcmVzc2lvbic7XG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBwbHVnaW5zOiBbXG4gICAgcmVhY3Qoe1xuICAgICAgLy8gRW5hYmxlIFJlYWN0IEZhc3QgUmVmcmVzaFxuICAgICAgZmFzdFJlZnJlc2g6IHRydWUsXG4gICAgICAvLyBPcHRpbWl6ZSBSZWFjdCBpbXBvcnRzXG4gICAgICBqc3hJbXBvcnRTb3VyY2U6ICdAZW1vdGlvbi9yZWFjdCcsXG4gICAgfSksXG4gICAgLy8gUFdBIGZvciBjYWNoaW5nIGFuZCBvZmZsaW5lIHN1cHBvcnRcbiAgICBWaXRlUFdBKHtcbiAgICAgIHJlZ2lzdGVyVHlwZTogJ2F1dG9VcGRhdGUnLFxuICAgICAgd29ya2JveDoge1xuICAgICAgICBnbG9iUGF0dGVybnM6IFsnKiovKi57anMsY3NzLGh0bWwsaWNvLHBuZyxzdmcsanBnLGpwZWcsd2VicH0nXSxcbiAgICAgICAgcnVudGltZUNhY2hpbmc6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICB1cmxQYXR0ZXJuOiAvXmh0dHBzOlxcL1xcL2ltYWdlc1xcLnBleGVsc1xcLmNvbVxcLy4qL2ksXG4gICAgICAgICAgICBoYW5kbGVyOiAnQ2FjaGVGaXJzdCcsXG4gICAgICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgICAgIGNhY2hlTmFtZTogJ3BleGVscy1pbWFnZXMnLFxuICAgICAgICAgICAgICBleHBpcmF0aW9uOiB7XG4gICAgICAgICAgICAgICAgbWF4RW50cmllczogNTAsXG4gICAgICAgICAgICAgICAgbWF4QWdlU2Vjb25kczogNjAgKiA2MCAqIDI0ICogMzAsIC8vIDMwIGRheXNcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICB1cmxQYXR0ZXJuOiAvXmh0dHBzOlxcL1xcL2NkblxcLnNpbXBsZWljb25zXFwub3JnXFwvLiovaSxcbiAgICAgICAgICAgIGhhbmRsZXI6ICdDYWNoZUZpcnN0JyxcbiAgICAgICAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgICAgICAgY2FjaGVOYW1lOiAnc2ltcGxlLWljb25zJyxcbiAgICAgICAgICAgICAgZXhwaXJhdGlvbjoge1xuICAgICAgICAgICAgICAgIG1heEVudHJpZXM6IDEwMCxcbiAgICAgICAgICAgICAgICBtYXhBZ2VTZWNvbmRzOiA2MCAqIDYwICogMjQgKiAzMCwgLy8gMzAgZGF5c1xuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHVybFBhdHRlcm46IC9eaHR0cHM6XFwvXFwvZm9udHNcXC5nb29nbGVhcGlzXFwuY29tXFwvLiovaSxcbiAgICAgICAgICAgIGhhbmRsZXI6ICdTdGFsZVdoaWxlUmV2YWxpZGF0ZScsXG4gICAgICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgICAgIGNhY2hlTmFtZTogJ2dvb2dsZS1mb250cy1zdHlsZXNoZWV0cycsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgdXJsUGF0dGVybjogL15odHRwczpcXC9cXC9mb250c1xcLmdzdGF0aWNcXC5jb21cXC8uKi9pLFxuICAgICAgICAgICAgaGFuZGxlcjogJ0NhY2hlRmlyc3QnLFxuICAgICAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgICAgICBjYWNoZU5hbWU6ICdnb29nbGUtZm9udHMtd2ViZm9udHMnLFxuICAgICAgICAgICAgICBleHBpcmF0aW9uOiB7XG4gICAgICAgICAgICAgICAgbWF4RW50cmllczogMzAsXG4gICAgICAgICAgICAgICAgbWF4QWdlU2Vjb25kczogNjAgKiA2MCAqIDI0ICogMzY1LCAvLyAxIHllYXJcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICAgIH0sXG4gICAgfSksXG4gICAgLy8gTGVnYWN5IGJyb3dzZXIgc3VwcG9ydFxuICAgIGxlZ2FjeSh7XG4gICAgICB0YXJnZXRzOiBbJ2RlZmF1bHRzJywgJ25vdCBJRSAxMSddLFxuICAgIH0pLFxuICAgIC8vIEd6aXAgY29tcHJlc3Npb25cbiAgICBjb21wcmVzc2lvbih7XG4gICAgICBhbGdvcml0aG06ICdnemlwJyxcbiAgICAgIGV4dDogJy5neicsXG4gICAgICB0aHJlc2hvbGQ6IDEwMjQsXG4gICAgfSksXG4gICAgLy8gQnJvdGxpIGNvbXByZXNzaW9uIChiZXR0ZXIgdGhhbiBnemlwKVxuICAgIGNvbXByZXNzaW9uKHtcbiAgICAgIGFsZ29yaXRobTogJ2Jyb3RsaUNvbXByZXNzJyxcbiAgICAgIGV4dDogJy5icicsXG4gICAgICB0aHJlc2hvbGQ6IDEwMjQsXG4gICAgfSksXG4gIF0sXG4gIGJ1aWxkOiB7XG4gICAgLy8gRW5hYmxlIG1pbmlmaWNhdGlvblxuICAgIG1pbmlmeTogJ3RlcnNlcicsXG4gICAgdGVyc2VyT3B0aW9uczoge1xuICAgICAgY29tcHJlc3M6IHtcbiAgICAgICAgZHJvcF9jb25zb2xlOiB0cnVlLFxuICAgICAgICBkcm9wX2RlYnVnZ2VyOiB0cnVlLFxuICAgICAgICBwdXJlX2Z1bmNzOiBbJ2NvbnNvbGUubG9nJywgJ2NvbnNvbGUuaW5mbycsICdjb25zb2xlLmRlYnVnJywgJ2NvbnNvbGUud2FybiddLFxuICAgICAgfSxcbiAgICAgIG1hbmdsZToge1xuICAgICAgICBzYWZhcmkxMDogdHJ1ZSxcbiAgICAgIH0sXG4gICAgfSxcbiAgICAvLyBDb2RlIHNwbGl0dGluZyBvcHRpbWl6YXRpb25cbiAgICByb2xsdXBPcHRpb25zOiB7XG4gICAgICBvdXRwdXQ6IHtcbiAgICAgICAgbWFudWFsQ2h1bmtzOiB7XG4gICAgICAgICAgLy8gVmVuZG9yIGNodW5rc1xuICAgICAgICAgICdyZWFjdC12ZW5kb3InOiBbJ3JlYWN0JywgJ3JlYWN0LWRvbSddLFxuICAgICAgICAgICdhbmltYXRpb24tdmVuZG9yJzogWydmcmFtZXItbW90aW9uJ10sXG4gICAgICAgICAgJ3VpLXZlbmRvcic6IFsnbHVjaWRlLXJlYWN0JywgJ3JlYWN0LWludGVyc2VjdGlvbi1vYnNlcnZlcicsICdyZWFjdC10aWx0J10sXG4gICAgICAgICAgXG4gICAgICAgICAgLy8gQ29tcG9uZW50IGNodW5rc1xuICAgICAgICAgICdoZXJvLWNodW5rJzogWycuL3NyYy9jb21wb25lbnRzL0hlcm8udHN4J10sXG4gICAgICAgICAgJ2Fib3V0LWNodW5rJzogWycuL3NyYy9jb21wb25lbnRzL0Fib3V0LnRzeCddLFxuICAgICAgICAgICdwcm9qZWN0cy1jaHVuayc6IFsnLi9zcmMvY29tcG9uZW50cy9Qcm9qZWN0cy50c3gnXSxcbiAgICAgICAgICAnc2tpbGxzLWNodW5rJzogWycuL3NyYy9jb21wb25lbnRzL1NraWxscy50c3gnXSxcbiAgICAgICAgICAnY29udGFjdC1jaHVuayc6IFsnLi9zcmMvY29tcG9uZW50cy9Db250YWN0LnRzeCddLFxuICAgICAgICB9LFxuICAgICAgICAvLyBPcHRpbWl6ZSBjaHVuayBmaWxlIG5hbWVzXG4gICAgICAgIGNodW5rRmlsZU5hbWVzOiAoY2h1bmtJbmZvKSA9PiB7XG4gICAgICAgICAgY29uc3QgZmFjYWRlTW9kdWxlSWQgPSBjaHVua0luZm8uZmFjYWRlTW9kdWxlSWQgPyBjaHVua0luZm8uZmFjYWRlTW9kdWxlSWQuc3BsaXQoJy8nKS5wb3AoKS5yZXBsYWNlKCcudHN4JywgJycpIDogJ2NodW5rJztcbiAgICAgICAgICByZXR1cm4gYGpzLyR7ZmFjYWRlTW9kdWxlSWR9LVtoYXNoXS5qc2A7XG4gICAgICAgIH0sXG4gICAgICAgIGVudHJ5RmlsZU5hbWVzOiAnanMvW25hbWVdLVtoYXNoXS5qcycsXG4gICAgICAgIGFzc2V0RmlsZU5hbWVzOiAoYXNzZXRJbmZvKSA9PiB7XG4gICAgICAgICAgY29uc3QgaW5mbyA9IGFzc2V0SW5mby5uYW1lLnNwbGl0KCcuJyk7XG4gICAgICAgICAgY29uc3QgZXh0ID0gaW5mb1tpbmZvLmxlbmd0aCAtIDFdO1xuICAgICAgICAgIGlmICgvXFwuKGNzcykkLy50ZXN0KGFzc2V0SW5mby5uYW1lKSkge1xuICAgICAgICAgICAgcmV0dXJuIGBjc3MvW25hbWVdLVtoYXNoXS4ke2V4dH1gO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoL1xcLihwbmd8anBlP2d8c3ZnfGdpZnx0aWZmfGJtcHxpY28pJC9pLnRlc3QoYXNzZXRJbmZvLm5hbWUpKSB7XG4gICAgICAgICAgICByZXR1cm4gYGltYWdlcy9bbmFtZV0tW2hhc2hdLiR7ZXh0fWA7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBgYXNzZXRzL1tuYW1lXS1baGFzaF0uJHtleHR9YDtcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSxcbiAgICAvLyBJbmNyZWFzZSBjaHVuayBzaXplIHdhcm5pbmcgbGltaXRcbiAgICBjaHVua1NpemVXYXJuaW5nTGltaXQ6IDEwMDAsXG4gICAgLy8gRW5hYmxlIHNvdXJjZSBtYXBzIGZvciBwcm9kdWN0aW9uIGRlYnVnZ2luZyAob3B0aW9uYWwpXG4gICAgc291cmNlbWFwOiBmYWxzZSxcbiAgICAvLyBUYXJnZXQgbW9kZXJuIGJyb3dzZXJzIGZvciBiZXR0ZXIgb3B0aW1pemF0aW9uXG4gICAgdGFyZ2V0OiAnZXMyMDIwJyxcbiAgICAvLyBPcHRpbWl6ZSBDU1NcbiAgICBjc3NDb2RlU3BsaXQ6IHRydWUsXG4gICAgLy8gT3B0aW1pemUgYXNzZXRzXG4gICAgYXNzZXRzSW5saW5lTGltaXQ6IDQwOTYsIC8vIDRrYlxuICB9LFxuICBvcHRpbWl6ZURlcHM6IHtcbiAgICBpbmNsdWRlOiBbXG4gICAgICAncmVhY3QnLCBcbiAgICAgICdyZWFjdC1kb20nLCBcbiAgICAgICdmcmFtZXItbW90aW9uJywgXG4gICAgICAnbHVjaWRlLXJlYWN0JyxcbiAgICAgICdyZWFjdC1pbnRlcnNlY3Rpb24tb2JzZXJ2ZXInLFxuICAgICAgJ3JlYWN0LXRpbHQnXG4gICAgXSxcbiAgICBleGNsdWRlOiBbJ0B2aXRlL2NsaWVudCcsICdAdml0ZS9lbnYnXSxcbiAgICAvLyBGb3JjZSBvcHRpbWl6YXRpb24gb2YgdGhlc2UgZGVwZW5kZW5jaWVzXG4gICAgZm9yY2U6IHRydWUsXG4gIH0sXG4gIC8vIEVuYWJsZSBDU1MgY29kZSBzcGxpdHRpbmdcbiAgY3NzOiB7XG4gICAgZGV2U291cmNlbWFwOiBmYWxzZSxcbiAgICAvLyBDU1Mgb3B0aW1pemF0aW9uXG4gICAgcG9zdGNzczoge1xuICAgICAgcGx1Z2luczogW1xuICAgICAgICByZXF1aXJlKCdhdXRvcHJlZml4ZXInKSxcbiAgICAgICAgcmVxdWlyZSgnY3NzbmFubycpKHtcbiAgICAgICAgICBwcmVzZXQ6ICdkZWZhdWx0JyxcbiAgICAgICAgfSksXG4gICAgICBdLFxuICAgIH0sXG4gIH0sXG4gIC8vIFNlcnZlciBjb25maWd1cmF0aW9uIGZvciBkZXZlbG9wbWVudFxuICBzZXJ2ZXI6IHtcbiAgICBobXI6IHtcbiAgICAgIG92ZXJsYXk6IGZhbHNlLFxuICAgIH0sXG4gICAgLy8gRW5hYmxlIEhUVFAvMlxuICAgIGh0dHBzOiBmYWxzZSxcbiAgICAvLyBPcHRpbWl6ZSBkZXYgc2VydmVyXG4gICAgZnM6IHtcbiAgICAgIHN0cmljdDogdHJ1ZSxcbiAgICB9LFxuICB9LFxuICAvLyBSZXNvbHZlIGNvbmZpZ3VyYXRpb25cbiAgcmVzb2x2ZToge1xuICAgIGFsaWFzOiB7XG4gICAgICAnQCc6ICcvc3JjJyxcbiAgICB9LFxuICB9LFxuICAvLyBEZWZpbmUgZ2xvYmFsIGNvbnN0YW50c1xuICBkZWZpbmU6IHtcbiAgICBfX0RFVl9fOiBKU09OLnN0cmluZ2lmeShwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ2RldmVsb3BtZW50JyksXG4gIH0sXG4gIC8vIEV4cGVyaW1lbnRhbCBmZWF0dXJlc1xuICBleHBlcmltZW50YWw6IHtcbiAgICByZW5kZXJCdWlsdFVybChmaWxlbmFtZSwgeyBob3N0VHlwZSB9KSB7XG4gICAgICBpZiAoaG9zdFR5cGUgPT09ICdqcycpIHtcbiAgICAgICAgcmV0dXJuIHsganM6IGAvJHtmaWxlbmFtZX1gIH07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4geyByZWxhdGl2ZTogdHJ1ZSB9O1xuICAgICAgfVxuICAgIH0sXG4gIH0sXG59KTsiXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7OztBQUF5TixTQUFTLG9CQUFvQjtBQUN0UCxPQUFPLFdBQVc7QUFDbEIsU0FBUyxlQUFlO0FBQ3hCLE9BQU8sWUFBWTtBQUNuQixPQUFPLGlCQUFpQjtBQUd4QixJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUEsSUFDUCxNQUFNO0FBQUE7QUFBQSxNQUVKLGFBQWE7QUFBQTtBQUFBLE1BRWIsaUJBQWlCO0FBQUEsSUFDbkIsQ0FBQztBQUFBO0FBQUEsSUFFRCxRQUFRO0FBQUEsTUFDTixjQUFjO0FBQUEsTUFDZCxTQUFTO0FBQUEsUUFDUCxjQUFjLENBQUMsOENBQThDO0FBQUEsUUFDN0QsZ0JBQWdCO0FBQUEsVUFDZDtBQUFBLFlBQ0UsWUFBWTtBQUFBLFlBQ1osU0FBUztBQUFBLFlBQ1QsU0FBUztBQUFBLGNBQ1AsV0FBVztBQUFBLGNBQ1gsWUFBWTtBQUFBLGdCQUNWLFlBQVk7QUFBQSxnQkFDWixlQUFlLEtBQUssS0FBSyxLQUFLO0FBQUE7QUFBQSxjQUNoQztBQUFBLFlBQ0Y7QUFBQSxVQUNGO0FBQUEsVUFDQTtBQUFBLFlBQ0UsWUFBWTtBQUFBLFlBQ1osU0FBUztBQUFBLFlBQ1QsU0FBUztBQUFBLGNBQ1AsV0FBVztBQUFBLGNBQ1gsWUFBWTtBQUFBLGdCQUNWLFlBQVk7QUFBQSxnQkFDWixlQUFlLEtBQUssS0FBSyxLQUFLO0FBQUE7QUFBQSxjQUNoQztBQUFBLFlBQ0Y7QUFBQSxVQUNGO0FBQUEsVUFDQTtBQUFBLFlBQ0UsWUFBWTtBQUFBLFlBQ1osU0FBUztBQUFBLFlBQ1QsU0FBUztBQUFBLGNBQ1AsV0FBVztBQUFBLFlBQ2I7QUFBQSxVQUNGO0FBQUEsVUFDQTtBQUFBLFlBQ0UsWUFBWTtBQUFBLFlBQ1osU0FBUztBQUFBLFlBQ1QsU0FBUztBQUFBLGNBQ1AsV0FBVztBQUFBLGNBQ1gsWUFBWTtBQUFBLGdCQUNWLFlBQVk7QUFBQSxnQkFDWixlQUFlLEtBQUssS0FBSyxLQUFLO0FBQUE7QUFBQSxjQUNoQztBQUFBLFlBQ0Y7QUFBQSxVQUNGO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFBQSxJQUNGLENBQUM7QUFBQTtBQUFBLElBRUQsT0FBTztBQUFBLE1BQ0wsU0FBUyxDQUFDLFlBQVksV0FBVztBQUFBLElBQ25DLENBQUM7QUFBQTtBQUFBLElBRUQsWUFBWTtBQUFBLE1BQ1YsV0FBVztBQUFBLE1BQ1gsS0FBSztBQUFBLE1BQ0wsV0FBVztBQUFBLElBQ2IsQ0FBQztBQUFBO0FBQUEsSUFFRCxZQUFZO0FBQUEsTUFDVixXQUFXO0FBQUEsTUFDWCxLQUFLO0FBQUEsTUFDTCxXQUFXO0FBQUEsSUFDYixDQUFDO0FBQUEsRUFDSDtBQUFBLEVBQ0EsT0FBTztBQUFBO0FBQUEsSUFFTCxRQUFRO0FBQUEsSUFDUixlQUFlO0FBQUEsTUFDYixVQUFVO0FBQUEsUUFDUixjQUFjO0FBQUEsUUFDZCxlQUFlO0FBQUEsUUFDZixZQUFZLENBQUMsZUFBZSxnQkFBZ0IsaUJBQWlCLGNBQWM7QUFBQSxNQUM3RTtBQUFBLE1BQ0EsUUFBUTtBQUFBLFFBQ04sVUFBVTtBQUFBLE1BQ1o7QUFBQSxJQUNGO0FBQUE7QUFBQSxJQUVBLGVBQWU7QUFBQSxNQUNiLFFBQVE7QUFBQSxRQUNOLGNBQWM7QUFBQTtBQUFBLFVBRVosZ0JBQWdCLENBQUMsU0FBUyxXQUFXO0FBQUEsVUFDckMsb0JBQW9CLENBQUMsZUFBZTtBQUFBLFVBQ3BDLGFBQWEsQ0FBQyxnQkFBZ0IsK0JBQStCLFlBQVk7QUFBQTtBQUFBLFVBR3pFLGNBQWMsQ0FBQywyQkFBMkI7QUFBQSxVQUMxQyxlQUFlLENBQUMsNEJBQTRCO0FBQUEsVUFDNUMsa0JBQWtCLENBQUMsK0JBQStCO0FBQUEsVUFDbEQsZ0JBQWdCLENBQUMsNkJBQTZCO0FBQUEsVUFDOUMsaUJBQWlCLENBQUMsOEJBQThCO0FBQUEsUUFDbEQ7QUFBQTtBQUFBLFFBRUEsZ0JBQWdCLENBQUMsY0FBYztBQUM3QixnQkFBTSxpQkFBaUIsVUFBVSxpQkFBaUIsVUFBVSxlQUFlLE1BQU0sR0FBRyxFQUFFLElBQUksRUFBRSxRQUFRLFFBQVEsRUFBRSxJQUFJO0FBQ2xILGlCQUFPLE1BQU0sY0FBYztBQUFBLFFBQzdCO0FBQUEsUUFDQSxnQkFBZ0I7QUFBQSxRQUNoQixnQkFBZ0IsQ0FBQyxjQUFjO0FBQzdCLGdCQUFNLE9BQU8sVUFBVSxLQUFLLE1BQU0sR0FBRztBQUNyQyxnQkFBTSxNQUFNLEtBQUssS0FBSyxTQUFTLENBQUM7QUFDaEMsY0FBSSxXQUFXLEtBQUssVUFBVSxJQUFJLEdBQUc7QUFDbkMsbUJBQU8scUJBQXFCLEdBQUc7QUFBQSxVQUNqQztBQUNBLGNBQUksdUNBQXVDLEtBQUssVUFBVSxJQUFJLEdBQUc7QUFDL0QsbUJBQU8sd0JBQXdCLEdBQUc7QUFBQSxVQUNwQztBQUNBLGlCQUFPLHdCQUF3QixHQUFHO0FBQUEsUUFDcEM7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBO0FBQUEsSUFFQSx1QkFBdUI7QUFBQTtBQUFBLElBRXZCLFdBQVc7QUFBQTtBQUFBLElBRVgsUUFBUTtBQUFBO0FBQUEsSUFFUixjQUFjO0FBQUE7QUFBQSxJQUVkLG1CQUFtQjtBQUFBO0FBQUEsRUFDckI7QUFBQSxFQUNBLGNBQWM7QUFBQSxJQUNaLFNBQVM7QUFBQSxNQUNQO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxJQUNGO0FBQUEsSUFDQSxTQUFTLENBQUMsZ0JBQWdCLFdBQVc7QUFBQTtBQUFBLElBRXJDLE9BQU87QUFBQSxFQUNUO0FBQUE7QUFBQSxFQUVBLEtBQUs7QUFBQSxJQUNILGNBQWM7QUFBQTtBQUFBLElBRWQsU0FBUztBQUFBLE1BQ1AsU0FBUztBQUFBLFFBQ1AsVUFBUSxvRUFBYztBQUFBLFFBQ3RCLFVBQVEsd0RBQVMsRUFBRTtBQUFBLFVBQ2pCLFFBQVE7QUFBQSxRQUNWLENBQUM7QUFBQSxNQUNIO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFBQTtBQUFBLEVBRUEsUUFBUTtBQUFBLElBQ04sS0FBSztBQUFBLE1BQ0gsU0FBUztBQUFBLElBQ1g7QUFBQTtBQUFBLElBRUEsT0FBTztBQUFBO0FBQUEsSUFFUCxJQUFJO0FBQUEsTUFDRixRQUFRO0FBQUEsSUFDVjtBQUFBLEVBQ0Y7QUFBQTtBQUFBLEVBRUEsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0wsS0FBSztBQUFBLElBQ1A7QUFBQSxFQUNGO0FBQUE7QUFBQSxFQUVBLFFBQVE7QUFBQSxJQUNOLFNBQVMsS0FBSyxVQUFVLFFBQVEsSUFBSSxhQUFhLGFBQWE7QUFBQSxFQUNoRTtBQUFBO0FBQUEsRUFFQSxjQUFjO0FBQUEsSUFDWixlQUFlLFVBQVUsRUFBRSxTQUFTLEdBQUc7QUFDckMsVUFBSSxhQUFhLE1BQU07QUFDckIsZUFBTyxFQUFFLElBQUksSUFBSSxRQUFRLEdBQUc7QUFBQSxNQUM5QixPQUFPO0FBQ0wsZUFBTyxFQUFFLFVBQVUsS0FBSztBQUFBLE1BQzFCO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
