import { readFile } from 'fs/promises'
import { extname } from 'path'

import { defineConfig } from 'rollup'
import postcss from 'postcss'
import cssnano from 'cssnano'
import cssminify from 'postcss-clean'

/**
 * @example
 * import cssText from './style.css?inline'
 * 
 * console.log(cssText) // div{display:none}
 */
const inline = () => defineConfig({
  name: 'inline',
  async resolveId(id, importer) {
    if (!/[&?]inline(?:&|$)/.test(id)) return
    const file = id.replace(/[#?].*$/s, '')
    return id.replace(file, (await this.resolve(file, importer)).id)
  },
  async load(id) {
    if (!/[&?]inline(?:&|$)/.test(id)) return
    const file = id.replace(/[#?].*$/s, '')
    let code = await readFile(file, 'utf8')
    if (extname(file) == '.css') {
      code = (await postcss()
        .use(cssminify())
        // .use(cssnano({ preset: 'default' }))
        .process(code, { from: file }))
        .css
    }
    return `export default ${JSON.stringify(code)}`
  }
})

export default inline