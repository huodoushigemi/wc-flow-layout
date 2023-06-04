import './style.css'
import { minii, queueMicro } from './utils'

export default class FlowLayout extends HTMLElement {
  constructor() {
    super()
    // @ts-ignore
    Object.keys(FlowLayout.default_props).forEach(e => (this[e] ||= FlowLayout.default_props[e]))
  }

  static default_props = Object.freeze({
    gap: 4,
    cols: 2
  })

  get gap() {
    return +this.getAttribute('gap')
  }
  set gap(val) {
    this.setAttribute('gap', val + '')
  }

  get cols() {
    return +this.getAttribute('cols')
  }
  set cols(val) {
    this.setAttribute('cols', val + '')
  }

  get item_w() {
    const { cols, gap } = this
    const style = window.getComputedStyle(this)
    const pl = parseInt(style.paddingLeft), pr = parseInt(style.paddingRight)
    return (this.offsetWidth - gap * (cols - 1) - (pl + pr)) / cols
  }

  #rb!: ResizeObserver
  #mb!:MutationObserver
  #mb2!:MutationObserver

  connectedCallback() {
    // 监听大小变化
    this.#rb = new ResizeObserver(() => (console.log(1), this.relayout()))
    this.#rb.observe(this)

    // 监听元素增删
    this.#mb = new MutationObserver(ms => {
      ms.forEach(m => {
        m.addedNodes.forEach(e => e instanceof HTMLElement && this.#rb.observe(e))
        m.removedNodes.forEach(e => e instanceof HTMLElement && this.#rb.unobserve(e))
      })
      this.relayout()
    })
    this.#mb.observe(this, { childList: true, attributes: false })
    
    // 监听属性变化
    this.#mb2 = new MutationObserver(() => this.relayout())
    this.#mb2.observe(this, { childList: false, attributes: true })
  }

  disconnectedCallback() {
    this.#rb.disconnect()
    this.#mb.disconnect()
    this.#mb2.disconnect()
  }

  #layouting = false

  // 重排布局
  relayout() {
    if (this.#layouting) return
    this.#layouting = true
    queueMicro(() => {
      this.#relayout()
      this.#layouting = false
    })
  }

  // 重排布局
  #relayout() {
    console.log('relayout')
    if (this.children.length) {
      const { cols, gap } = this
      const { item_w: w } = this

      const style = window.getComputedStyle(this)
      const pt = parseInt(style.paddingTop), pl = parseInt(style.paddingLeft)
      const hs = Array(cols).fill(0)
      const els = this.children
      for (let i = 0; i < els.length; i++) {
        const el = els[i] as HTMLElement
        const col = minii(hs)
        el.style.top = pt + hs[col] + 'px'
        el.style.left = pl + (w + gap) * col + 'px'
        el.style.width = w + 'px'
        hs[col] += el.offsetHeight + gap
      }
      this.style.height = Math.max(...hs) - gap + 'px'
    } else {
      this.style.height = '0'
    }
    this.#mb2.takeRecords()
  }
}

customElements.define('flow-layout', FlowLayout)
