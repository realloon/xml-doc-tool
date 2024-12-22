import { XMLParser } from 'fast-xml-parser'

const parser = new XMLParser({
  ignoreDeclaration: true,
  ignoreAttributes: false,
  isArray: tagName => tagName.endsWith('Def'),
})

export default parser
