import path from 'path'
import { defineConfig } from 'vite'
import typescript2 from "rollup-plugin-typescript2"
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'

export default defineConfig({
  plugins: [
    typescript2({
      check: false,
      tsconfig: path.resolve(__dirname, 'tsconfig.json'),
      clean: true
    }),
    vue(),
    Components({
      resolvers: [
        IconsResolver()
      ],
    }),
    Icons({
      scale: 1.2,
      defaultClass: 'inline-block align-middle',
      compiler: 'vue3',
    }),
  ],
  base: process.env.NODE_ENV === 'production' ? '/static/app/' : './',
  resolve: {
    alias: [
      { find: '@/', replacement: '/src/' }
    ]
  },
  publicDir: "../static/app",
  build: {
    emptyOutDir: false,
    rollupOptions: {
      output: {
        dir: "../static/app",
        chunkFileNames: "assets/[name]-[hash].js",
        entryFileNames: "assets/[name].js",
        assetFileNames: "assets/[name]-[hash][extname]"
      }
    },
  }
})