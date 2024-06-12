import { WaterfallElement } from './waterfall'

export * from './waterfall'
export type { WaterfallProps } from './layout'

if (!customElements.get('wc-waterfall')) { customElements.define('wc-waterfall', WaterfallElement); }