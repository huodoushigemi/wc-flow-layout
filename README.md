# wc-waterfall

The `wc-waterfall` is a high performance waterfall component written using `web-component`

It can support running in various frameworks, such as `React` `Vue` `SolidJs`

![image](https://github.com/huodoushigemi/flow-layout-wc/assets/41646242/684221b7-f31b-4e71-b6b5-5380245bda42)

## 🌈 Demo

- https://huodoushigemi.github.io/wc-flow-layout/
- [codepen — Basic usage](https://codepen.io/huodoushigemi/pen/dyQbmgW?editors=1100)
- [codepen — Photo wall](https://codepen.io/huodoushigemi/pen/BaGBxKM?editors=1100)
- [Vue SFC Playground](https://play.vuejs.org/#eNqFlE1z0zAQhv+KRj0Uhjr+yAdFmM4A0wMcgAGOvrjWxlZrSxpJTgyZ/HfWdhKcCtrxwda7z0qvVivv6HutZ5sWKKOpLYzQjlhwrb7JpGi0Mo5cbotgmzsw67yuLzOZhiOHBA4cNLrGKI4ISacoYWWu32U0jjJKWKFqi4N5RgcSWS42N1Gchv17KiW+NPelhS8tfWnlS6996dqX3nhSHPmS7z723ce++9h3H0/cp+G0jiil4aTMOLTuV91/XuRak12f0uSmFJKRvHXq7Sh0wVZwVzGyjBPdobjvc4cUXGhM0znnQpaMHBBC1kq6wIrfwEgCzSDdKcPBBCbnorWMrA7kXV48lEa1kgd4uMowcnEd9U8SPV6MSVcFRSVq/mIhySsSvyQ7UoEoK4fLRBHOSDDhf3gyxePkOXx+hi+fwxdnZlZHHNt8qDK9ouNFCJpcz+6tknhVhuJlh4DNKBvL2WvTo+sDGa2c05aFYcEl5nOoxcbMJLhQ6ubspLEBrAuF5NDNhFgD0hnt50U7e/ThbKHkWpSPXBSq0aIG81U7oeS5G5xVbT8PmjMtXB31ooLi4R/6ve1G098MWDAbyOgp5rDHwI3h2x9foMPvU7BRvK2RfiL4Hayq297jiH3A1kHbE25w+2koKnblT3vbOZD2uKne6FCNgc8o/rU+PrH1v3bns/mpivs/g3GUPA==)
- [SolidJs Playground](https://playground.solidjs.com/anonymous/78577fad-c8e2-41fc-8a27-f47849e24615)

## ⚙️ Installation

- ### npm

```shell
npm i wc-waterfall
```

- ### scripts

```html
<script src="https://cdn.jsdelivr.net/npm/wc-waterfall/dist/index.iife.js"></script>
```

## 🦄 Example

### 🐔 Use in VanillaJS

```js
import 'wc-waterfall'
```

```html
<wc-waterfall gap="10" cols="3">
  <div>01</div>
  <div>02</div>
  <div>03</div>
  <div>04</div>
  <div>05</div>
  <div>06</div>
</wc-waterfall>
```

### 🐔 Use in React

```tsx
// App.tsx
import 'wc-waterfall'

export default function MyApp() {
  return (
    <wc-waterfall gap={10} cols={3}>
      <div>01</div>
      <div>02</div>
      <div>03</div>
      <div>04</div>
      <div>05</div>
      <div>06</div>
    </wc-waterfall>
  )
}
```

### 🐔 Use in Vue

```js
// main.ts
import 'wc-waterfall'
```

```html
<!-- App.vue -->
<template>
  <wc-waterfall :gap="10" :cols="3">
    <div>01</div>
    <div>02</div>
    <div>03</div>
    <div>04</div>
    <div>05</div>
    <div>06</div>
  </wc-waterfall>
</template>
```

```ts
// vite.config.ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: { isCustomElement: (tag) => tag.startsWith('wc-') }
      },
    })
  ],
})
```

## 📄 Props

| Name | Type     | Default | Description            |
| ---- | -------- | ------- | ---------------------- |
| cols | `number` | 2       | Number of columns      |
| gap  | `number` | 4       | Interval between cells |

## ⭐️ Show Your Support

Please give a ⭐️ if this project helped you!

## 👏 Contributing

If you have any questions or requests or want to contribute, please write the issue or give me a Pull Request freely.
