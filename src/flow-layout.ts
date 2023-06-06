import './style.css'
import { minii, queueMicro } from './utils'

interface FlEl extends HTMLElement {
  _fl_w: number
  _fl_h: number
}

export default class FlowLayout extends HTMLElement implements FlEl {
  _fl_w: number
  _fl_h: number

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
    // @ts-ignore
    this._rb = new ResizeObserver(es => es.some(({ target: el }) => el._fl_w != el.offsetWidth || el._fl_h != el.offsetHeight) && this.relayout())
    this._rb.observe(this)
    Array.prototype.forEach.call(this.children, el => this._rb.observe(el))

    this.relayout()

    // 监听元素增删
    this._mb = new MutationObserver(ms => {
      ms.forEach(m => {
        m.addedNodes.forEach(el => el instanceof HTMLElement && this._rb.observe(el))
        m.removedNodes.forEach(el => el instanceof HTMLElement && this._rb.unobserve(el))
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
    const els = this.children
    if (els.length) {
      const { cols, gap } = this
      const { item_w: w } = this
      
      // 获取每个 item 的高度
      Array.prototype.forEach.call(els, el => el.style.width = w + 'px')
      const hs = Array.prototype.map.call(els, (el: FlEl) => (el._fl_w = el.offsetWidth, el._fl_h = el.offsetHeight)) as number[]
      
      // 计算位置
      const stack = Array(cols).fill(0)
      const style = window.getComputedStyle(this)
      const pt = parseInt(style.paddingTop), pl = parseInt(style.paddingLeft)

      for (let i = 0; i < els.length; i++) {
        const el = els[i] as HTMLElement
        const col = minii(stack)
        el.style.top = pt + stack[col] + 'px'
        el.style.left = pl + (w + gap) * col + 'px'
        stack[col] += hs[i] + gap
      }
      
      // 设置容器高度
      this.style.height = Math.max(...stack) - gap + 'px'
      this._fl_w = this.offsetWidth
      this._fl_h = this.offsetHeight
    } else {
      this.style.height = '0'
    }
    
    this._mb2.takeRecords()
  }
}

customElements.define('wc-flow-layout', FlowLayout)
