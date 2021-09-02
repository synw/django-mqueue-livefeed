import path from 'path'
import { defineConfig } from 'vite'
import typescript2 from "rollup-plugin-typescript2"
import vue from '@vitejs/plugin-vue'
import Components from 'vite-plugin-components'
import ViteIcons, { ViteIconsResolver } from 'vite-plugin-icons'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    typescript2({
      check: false,
      tsconfig: path.resolve(__dirname, 'tsconfig.json'),
      clean: true
    }),
    vue(),
    Components({
      customComponentResolvers: ViteIconsResolver(),
    }),
    ViteIcons(),
  ],
  resolve: {
    alias: [
      { find: '@/', replacement: '/frontend/' }
    ]
  },
  publicDir: "backend/static",
  build: {
    emptyOutDir: false,
    rollupOptions: {
      output: {
        dir: "backend/static",
        chunkFileNames: "assets/[name]-[hash].js",
        entryFileNames: "assets/[name].js",
        assetFileNames: "assets/[name]-[hash][extname]"
      }
    },
    /*watch: {
      include: "frontend/**"
    }*/
  }
})