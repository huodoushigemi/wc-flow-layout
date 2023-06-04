import './style.css'
import { minii, queueMicro } from './utils'

export default class FlowLayout extends HTMLElement {
  constructor() {
    super()
  }

  static default_props = Object.freeze({
    cols: 2,
    gap: 4
  })

  get gap() {
    return +(this.getAttribute('gap') || FlowLayout.default_props.gap)
  }
  set gap(val) {
    this.setAttribute('gap', val + '')
  }

  get cols() {
    return +(this.getAttribute('cols') || FlowLayout.default_props.cols)
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

  private _rb: ResizeObserver
  private _mb: MutationObserver
  private _mb2: MutationObserver

  connectedCallback() {
    // 监听大小变化
    this._rb = new ResizeObserver(() => this.relayout())
    this._rb.observe(this)

    // 监听元素增删
    this._mb = new MutationObserver(ms => {
      ms.forEach(m => {
        m.addedNodes.forEach(e => e instanceof HTMLElement && this._rb.observe(e))
        m.removedNodes.forEach(e => e instanceof HTMLElement && this._rb.unobserve(e))
      })
      this.relayout()
    })
    this._mb.observe(this, { childList: true, attributes: false })
    
    // 监听属性变化
    this._mb2 = new MutationObserver(() => this.relayout())
    this._mb2.observe(this, { childList: false, attributes: true })
  }

  disconnectedCallback() {
    this._rb.disconnect()
    this._mb.disconnect()
    this._mb2.disconnect()
  }

  private _layouting = false

  // 重排布局
  relayout() {
    if (this._layouting) return
    this._layouting = true
    queueMicro(() => {
      this._relayout()
      this._layouting = false
    })
  }

  // 重排布局
  private _relayout() {
    // console.log('relayout')
    if (this.children.length) {
      const { cols, gap } = this
      const { item_w: w } = this

      const style = window.getComputedStyle(this)
      const pt = parseInt(style.paddingTop), pl = parseInt(style.paddingLeft)
      const stack = Array(cols).fill(0)
      const els = this.children
      const hs = Array.prototype.map.call(this.children, (e: HTMLElement) => e.offsetHeight) as number[]
      for (let i = 0; i < els.length; i++) {
        const el = els[i] as HTMLElement
        const col = minii(stack)
        el.style.top = pt + stack[col] + 'px'
        el.style.left = pl + (w + gap) * col + 'px'
        el.style.width = w + 'px'
        stack[col] += hs[i] + gap
      }
      this.style.height = Math.max(...stack) - gap + 'px'
    } else {
      this.style.height = '0'
    }
    
    this._mb2.takeRecords()
  }
}

customElements.define('flow-layout', FlowLayout)
