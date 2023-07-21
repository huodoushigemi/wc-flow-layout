# WC Flow Layout

The `wc-flow-layout` is a high performance flow layout component written using `web-component`

It can support running in various frameworks, such as `React` `Vue`

![image](https://github.com/huodoushigemi/flow-layout-wc/assets/41646242/684221b7-f31b-4e71-b6b5-5380245bda42)

## 🌈 Demo

- [codepen — Basic usage](https://codepen.io/huodoushigemi/pen/dyQbmgW?editors=1100)
- [codepen — Photo wall](https://codepen.io/huodoushigemi/pen/BaGBxKM?editors=1100)
- [Vue SFC Playground](https://play.vuejs.org/#eNqFlE1z0zAQhv+KRj0Uhjr+yAdFmM4A0wMcgAGOvriWYquVJY0kJy6Z/HfWdhLsiLbjg613n5VerVbe4Y9azzYNwwSntjBcO2SZa/RNJnmtlXHoclsEa6G2gcgfVeMuM5mGAwkMDByrtcgdgxFC6RRGpMz1hwzHUYYRKZSwMJhnuGeBpnxzE8Vp2L3HUuJLc19a+NLSl1a+9NaXrn3pnSfFkS/57mPffey7j3338ch9Gk4rCWIajkoNQ+seRfd5kWuNdl1SnZuSS4Lyxqn3g9AGW05dRdAyTnQL4r7L7VNgqSFN55RyWRJ0QBBaK+kCy/8wghJW99KdMpSZwOSUN5ag1YG8y4uH0qhG0gCOVxmCLq6j7kmi88WIdFVQVFzQVwuJ3qD4NdqhivGycrBMFMGMCBKewpMxHicv4fMJvnwJX0zMrI44tHpfZXyFh+sQ1Lme3Vsl4cL0xcsOAZthMpSz06aH14UyXDmnLQnDgkqYgTLBN2YmmQulrs9OG9rAupBLytoZ52sGfIa7ucHSHrw4Wyi55uWZk0LVmgtmvmvHlZw6ygVM/7XXnGnY1VEvKlY8/Ee/t+1g+4dhlpkNy/Ap5qDP2GFXt7++sRa+T8Fa0UYA/UzwJ7NKNJ3HAfsE7QO2R1zv9ktfWOjM3/a2dUza46Y6o301ej7D8P/6/MzW/9mdz+anKu7/Ah2emAE=)
- https://huodoushigemi.github.io/wc-flow-layout/

## ⚙️ Installation

- ### npm

```shell
npm i wc-flow-layout
```

- ### scripts

```html
<script src="https://cdn.jsdelivr.net/npm/wc-flow-layout/dist/index.iife.js"></script>
```

## 🦄 Example

### 🐔 Use in VanillaJS

```js
import 'wc-flow-layout'
```

```html
<wc-flow-layout gap="10" cols="3">
  <div>01</div>
  <div>02</div>
  <div>03</div>
  <div>04</div>
  <div>05</div>
  <div>06</div>
</wc-flow-layout>
```

### 🐔 Use in React

> **📄 App.tsx**

```tsx
import 'wc-flow-layout'

export default function MyApp() {
  return (
    <wc-flow-layout gap={10} cols={3}>
      <div>01</div>
      <div>02</div>
      <div>03</div>
      <div>04</div>
      <div>05</div>
      <div>06</div>
    </wc-flow-layout>
  )
}
```

### 🐔 Use in Vue

> **📄 main.ts**
```js
import 'wc-flow-layout'
```

> **📄 App.vue**

```html
<template>
  <wc-flow-layout :gap="10" :cols="3">
    <div>01</div>
    <div>02</div>
    <div>03</div>
    <div>04</div>
    <div>05</div>
    <div>06</div>
  </wc-flow-layout>
</template>
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
