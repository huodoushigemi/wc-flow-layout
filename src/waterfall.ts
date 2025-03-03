import cssText from './style.css?inline'
document.head.appendChild(Object.assign(document.createElement('style'), { innerText: cssText }))

import { useWaterfall } from './layout-use'
import { createWebComponent } from './dom-utils'
import { WaterfallProps } from './layout'

const default_props = () => ({
  cols: 2,
  gap: 4
} as WaterfallProps)

const formats = {
  gap: (v: any) => {
    if (typeof v === 'string') {      
      if (v.includes(',')) {
        return v.split(',').map(Number);
      }
      
      if (v.includes(' ')) {
        return v.split(' ').map(Number);
      }
      
      return Number(v);
    } 
    else if (Array.isArray(v)) {
      return v.map(Number);
    } 
    else {
      return v;
    }
  }
}

export class WaterfallElement extends createWebComponent(default_props, formats) {
  constructor() {
    super()
  }

  _layout: ReturnType<typeof useWaterfall>

  connectedCallback() {
    this._layout = useWaterfall(this, this)
    this._layout.mount()
  }

  disconnectedCallback() {
    this._layout.unmount()
  }

  /**update layout */
  render() {
    this._layout?.relayout()
  }
}
