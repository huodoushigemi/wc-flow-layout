import './style.css'
import { waterfall_layout } from './utils'

interface FlEl extends HTMLElement {
  _fl_w: number
  _fl_h: number
}

export class Waterfall extends HTMLElement implements FlEl {
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
    return +(this.getAttribute('gap') || Waterfall.default_props.gap)
  }
  set gap(val) {
    this.setAttribute('gap', val + '')
  }

  get cols() {
    return +(this.getAttribute('cols') || Waterfall.default_props.cols)
  }
  set cols(val) {
    this.setAttribute('cols', val + '')
  }

  #sizeObs: ResizeObserver
  #childObs: MutationObserver
  #attrsObs: MutationObserver

  connectedCallback() {
    // 监听大小变化
    // @ts-ignore
    this.#sizeObs = new ResizeObserver(es => es.some(({ target: el }) => el._fl_w != el.offsetWidth || el._fl_h != el.offsetHeight) && this.relayout())
    this.#sizeObs.observe(this)
    Array.prototype.forEach.call(this.children, el => this.#sizeObs.observe(el))

    this.relayout()

    // 监听元素增删
    this.#childObs = new MutationObserver(ms => {
      ms.forEach(m => {
        m.addedNodes.forEach(el => el instanceof HTMLElement && this.#sizeObs.observe(el))
        m.removedNodes.forEach(el => el instanceof HTMLElement && this.#sizeObs.unobserve(el))
      })
      this.relayout()
    })
    this.#childObs.observe(this, { childList: true, attributes: false })
    
    // 监听属性变化
    this.#attrsObs = new MutationObserver(() => this.relayout())
    this.#attrsObs.observe(this, { childList: false, attributes: true })
  }

  disconnectedCallback() {
    this.#sizeObs.disconnect()
    this.#childObs.disconnect()
    this.#attrsObs.disconnect()
  }

  #layouting = false

  // 重排布局
  relayout() {
    if (this.#layouting) return
    this.#layouting = true
    requestAnimationFrame(() => {
      this.#relayout()
      this.#layouting = false
    })
  }

  // 重排布局
  #relayout() {
    // console.log('relayout')

    waterfall_layout(
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
    
    this.#attrsObs.takeRecords()
  }
}
