import { isEl } from './dom-utils'
import { WaterfallProps, waterfall_layout } from './layout'

const prevh = Symbol(), prevw = Symbol()

/**
 * 布局监听
 * 
 * @example
 * const layout = useLayoutObs(div, () => console.log('layout changed'))
 * layout.mount()
 */
export function useLayoutObs(el: HTMLElement, relayout: () => void) {
  let sizeObs: ResizeObserver // 监听大小变化
  let childObs: MutationObserver // 监听元素增删
  let attrsObs: MutationObserver // 监听属性变化

  function mount() {
    // 监听大小变化
    sizeObs = new ResizeObserver(es => es.some(({ target: el }) => el[prevw] != el.offsetWidth || el[prevh] != el.offsetHeight) && doRelayout())
    sizeObs.observe(el)
    Array.prototype.forEach.call(el.children, el => sizeObs.observe(el))

    // 监听元素增删
    childObs = new MutationObserver(ms => {
      ms.forEach(m => {
        m.addedNodes.forEach(el => isEl(el) && sizeObs.observe(el))
        m.removedNodes.forEach(el => isEl(el) && sizeObs.unobserve(el))
      })
      doRelayout()
    })
    childObs.observe(el, { childList: true, attributes: false })

    // 监听属性变化
    attrsObs = new MutationObserver(() => doRelayout())
    attrsObs.observe(el, { childList: false, attributes: true })

    doRelayout()
  }

  function unmount() {
    sizeObs.disconnect()
    childObs.disconnect()
    attrsObs.disconnect()
  }

  let layouting = false
  /** 重排布局 */
  function doRelayout() {
    if (layouting) return
    layouting = true
    requestAnimationFrame(() => {
      relayout()
      el[prevw] = el.offsetWidth
      el[prevh] = el.offsetHeight
      attrsObs.takeRecords()
      layouting = false
    })
  }

  return { relayout: doRelayout, mount, unmount }
}

/**
 * 瀑布流布局
 * 
 * @example
 * const layout = useWaterfall(div, { cols: 4, gap: 4 })
 * layout.mount()
 */
export const useWaterfall = (el: HTMLElement, props: WaterfallProps) => (
  useLayoutObs(el, () => {
    // console.log('relayout')
    waterfall_layout(
      el,
      {
        getW: el => el.offsetWidth,
        setW: (el, v) => (el.style.width = v + 'px'),
        getH: el => ((el[prevw] = el.offsetWidth), (el[prevh] = el.offsetHeight)),
        setH: (el, v) => (el.style.height = v + 'px'),
        getPad: el => { const pad = getComputedStyle(el); return [parseInt(pad.paddingTop), parseInt(pad.paddingRight), parseInt(pad.paddingBottom), parseInt(pad.paddingLeft)] },
        setX: (el, v) => (el.style.left = v + 'px'),
        setY: (el, v) => (el.style.top = v + 'px'),
        getChildren: (el) => el.children as any,
      },
      props
    )
  })
)