import sitemap from '@astrojs/sitemap';
import starlight from '@astrojs/starlight';
import tailwindcss from '@tailwindcss/vite';
import AstroPWA from '@vite-pwa/astro';
import { defineConfig, passthroughImageService } from 'astro/config';
import { app } from './src/config';

// https://astro.build/config
export default defineConfig({
  site: app.url,
  compressHTML: true,
  image: {
    service: passthroughImageService(),
  },
  legacy: {
    collectionsBackwardsCompat: true,
  },
  integrations: [
    sitemap({
      customPages: ['https://sikessem.com/sitemap.xml'],
      changefreq: 'daily',
      priority: 0.8,
      lastmod: new Date(),
      i18n: {
        defaultLocale: 'en',
        locales: {
          en: 'en-US',
          fr: 'fr-CI',
        },
      },
    }),
    starlight({
      favicon: '/favicon.svg',
      logo: {
        src: './src/assets/logo.svg',
        alt: 'S-shaped logo',
      },
      title: 'Sigui Kessé Emmanuel',
      disable404Route: true,
      customCss: ['./src/styles/starlight.css'],
      social: [
        {
          icon: 'github',
          label: 'GitHub',
          href: 'https://github.com/ske-ci',
        },
        {
          icon: 'twitter',
          label: 'X',
          href: 'https://x.com/ske_ci',
        },
        {
          icon: 'discord',
          label: 'Discord',
          href: 'https://discord.gg/PURzNH7KBj',
        },
        {
          icon: 'youtube',
          label: 'YouTube',
          href: 'https://youtube.com/@ske-ci',
        },
      ],
      editLink: {
        baseUrl: 'https://github.com/ske-ci/ske-ci.github.io/edit/0.x/doc/',
      },
      sidebar: [
        {
          label: 'Open-source projects',
          link: '/opensource/',
        },
        {
          label: 'Getting started',
          items: [{ label: 'Quickstart', link: '/opensource/start/' }],
        },
        {
          label: 'Reference',
          items: [{ autogenerate: { directory: 'reference' } }],
        },
      ],
    }),
    AstroPWA({
      mode: 'development',
      base: '/',
      scope: '/',
      includeAssets: ['favicon.svg'],
      registerType: 'autoUpdate',
      manifest: {
        name: 'SIGUI Kessé Emmanuel',
        short_name: 'SIGUICI',
        theme_color: '#ffffff',
        display: 'standalone',
        icons: [
          {
            src: '/images/icons/manifest-icon-192.maskable.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: '/images/icons/manifest-icon-192.maskable.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'maskable',
          },
          {
            src: '/images/icons/manifest-icon-512.maskable.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: '/images/icons/manifest-icon-512.maskable.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
      pwaAssets: {
        disabled: true,
      },
      workbox: {
        navigateFallback: '/',
        globPatterns: ['**/*.{css,js,html,svg,png,ico,txt}'],
      },
      devOptions: {
        enabled: true,
        navigateFallbackAllowlist: [/^\/$/],
      },
      experimental: {
        directoryAndTrailingSlashHandler: true,
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
    logLevel: 'info',
    define: {
      __DATE__: `'${new Date().toISOString()}'`,
    },
    server: {
      fs: {
        // Allow serving files from hoisted root node_modules
        allow: ['../..'],
      },
    },
  },
});
