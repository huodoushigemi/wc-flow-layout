import './style.css'
import { flow_layout } from './utils'

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
    requestAnimationFrame(() => {
      this._relayout()
      this._layouting = false
    })
  }

  // 重排布局
  private _relayout() {
    // console.log('relayout')

    flow_layout(
      this,
      {
        getW: el => el.offsetWidth,
        setW: (el, v) => el.style.width = (v) + 'px',
        getH: el => (el._fl_w = el.offsetWidth, el._fl_h = el.offsetHeight),
        setH: (el, v) => el.style.height = (v) + 'px',
        getPad: el => { const pad = getComputedStyle(el); return [parseInt(pad.paddingTop), parseInt(pad.paddingRight), -parseInt(pad.paddingTop), parseInt(pad.paddingLeft)] },
        setX: (el, v) => el.style.left = v + 'px',
        setY: (el, v) => el.style.top = v + 'px',
        getChildren: el => el.children as any,
      },
      {
        cols: this.cols,
        gap: this.gap,
      }
    )

    this._fl_w = this.offsetWidth
    this._fl_h = this.offsetHeight
    
    this._mb2.takeRecords()
  }
}

customElements.define('wc-flow-layout', FlowLayout)
