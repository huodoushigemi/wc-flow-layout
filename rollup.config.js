import { defineConfig } from 'rollup'
import esbuild from 'rollup-plugin-esbuild'
import typescript from '@rollup/plugin-typescript'
import inline from './plugins/inline.js'
import { dts } from 'rollup-plugin-dts'
import pkg from './package.json' assert { type: 'json' }

const formats = {
  esm: 'mjs',
  cjs: 'cjs',
  iife: 'iife.js',
}

export default defineConfig([
  {
    input: 'src/index.ts',
    output: Object.entries(formats).map(([format, ext]) => ({
      format,
      file: `./dist/index.${ext}`,
    })),
    external: Object.keys(pkg.dependencies ?? []),
    plugins: [
      inline(),
      typescript({ declaration: true, emitDeclarationOnly: true, outDir: 'dist/types' }),
      esbuild({ minify: true, target: ['chrome67', 'ios13'] }),
    ],
  },
  {
    input: 'dist/types/index.d.ts',
    output: { file: 'dist/index.d.ts' },
    external: /\.css/,
    plugins: [dts()]
  },
])
