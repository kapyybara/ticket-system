import { defineConfig, splitVendorChunkPlugin } from 'vite';

import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

import path from 'path';

import { simpleGit } from 'simple-git';

const git = simpleGit();

export default async function () {
  const sha = await git.raw('rev-parse', '--short', 'HEAD');

  return defineConfig({
    build: {
      // target: 'esnext',
      outDir: './dist',
      rollupOptions: {
        output: {
          // manualChunks: {
          //   classnames: ['classnames'],
          //   react: ['react', 'react-dom', 'react-router-dom', 'react/jsx-runtime'],
          //   signal: ['@preact/signals-core'],
          //   model: ['@ithan/core'],
          //   'react-select': ['react-select'],
          //   'ag-grid': ['ag-grid-enterprise', 'ag-grid-community'],
          //   tippy: ['tippy.js'],
          //   'react-flow': ['reactflow', 'dagre'],
          // },
          // manualChunks: (id, options): any => {
          //   if (id.includes('node_modules')) {
          //     if (id.includes('react-dom')) {
          //       return 'vendor';
          //     }
          //     if (id.includes('react')) {
          //       return 'vendor';
          //     }
          //   }
          // },
        },
        external: ['ag-grid-community'],
      },
    },
    define: {
      APP_VERSION: `'${sha?.trim()}'`,
    },
    resolve: {
      alias: {
        src: path.resolve('./src'),
        '@': path.resolve('.'),
      },
    },
    plugins: [
      svgr(),
      react({ jsxRuntime: 'automatic', jsxImportSource: '@/src' }),
      // splitVendorChunkPlugin()
    ],
  });
}
