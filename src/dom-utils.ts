export const isEl = (el: Node): el is Element => el.nodeType == 1

abstract class WebComponentBase<P> {
  $props: P
  abstract render(): void
}

export const createWebComponent = <P extends Record<string, any>>(attrs: () => P, formats?: Record<string, (v: any) => any>) => {
  const initial = attrs()
  abstract class WebComponent extends HTMLElement {
    $props = attrs()
    constructor() {
      super()
      const map = {} as any
      for (const k in this.$props)
        map[k] = {
          get: () => this.$props[k],
          set: (v: any) => {
            this.$props[k] = formats?.[k] ? formats[k](v) : typeMapping(initial, k, v)
            this.render()
          },
        }
      Object.defineProperties(this, map)
    }

    // 仅监听基础类型
    static get observedAttributes() {
      return Object.keys(initial).filter(k => isBasic(initial[k]))
    }

    attributeChangedCallback(k: string, old: string, v: unknown) {
      // @ts-ignore
      this.$props[k] = formats?.[k] ? formats[k](v) : typeMapping(initial, k, v)
    }

    // 子类实现
    abstract render(): void
  }
  return WebComponent as unknown as new () => WebComponentBase<P> & P & HTMLElement
}

const typeMapping = (t: Record<string, any>, k: string, v: any) => {
  const prev = t[k]
  if (!isBasic(prev)) return
  const type = typeof prev
  return {
    number: (v: string) => Number(v),
    string: (v: string) => String(v),
    boolean: (v: string) => v != null && v != 'false',
  }[type as string]!(v)
}

const isBasic = (v: any): v is boolean | number | string => {
  const type = typeof v
  return type == 'number' || type == 'string' || type == 'boolean'
}
