# Flow Layout WC

The `flow-layout-wc` is a high performance flow layout component written using `web-component`

It can support running in various frameworks, such as `React` `Vue`

![image](https://github.com/huodoushigemi/flow-layout-wc/assets/41646242/684221b7-f31b-4e71-b6b5-5380245bda42)

## 🌈 Demo

- https://huodoushigemi.github.io/flow-layout-wc/

## ⚙️ Installation

- ### npm

```shell
npm i flow-layout-wc
```

- ### scripts

```html
<script src="https://cdn.jsdelivr.net/npm/flow-layout-wc/dist/index.iife.js"></script>
```

## 🦄 Example

### 🐔 Use in VanillaJS

```js
import 'flow-layout-wc'
```

```html
<flow-layout gap="10" cols="3">
  <div>01</div>
  <div>02</div>
  <div>03</div>
  <div>04</div>
  <div>05</div>
  <div>06</div>
</flow-layout>
```

### 🐔 Use in React

> **📄 App.tsx**

```tsx
import 'flow-layout-wc'

export default function MyApp() {
  return (
    <flow-layout gap={10} cols={3}>
      <div>01</div>
      <div>02</div>
      <div>03</div>
      <div>04</div>
      <div>05</div>
      <div>06</div>
    </flow-layout>
  )
}
```

### 🐔 Use in Vue

> **📄 main.ts**
```js
import 'flow-layout-wc'
```

> **📄 App.vue**

```html
<template>
  <flow-layout :gap="10" :cols="3">
    <div>01</div>
    <div>02</div>
    <div>03</div>
    <div>04</div>
    <div>05</div>
    <div>06</div>
  </flow-layout>
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
