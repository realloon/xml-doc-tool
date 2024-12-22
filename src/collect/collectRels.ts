import { readdir } from 'node:fs/promises'
import parser from '../utils/parser'
import mergeXmlObjs from '../utils/mergeXmlObjs'
import recordDefRels from '../utils/recordRels'
import serializeRels from '../utils/serializeRels'

const input = './input/Core'

async function collectRels() {
  const paths = await readdir(input, { recursive: true })

  const xmlObjs = await Promise.all(
    paths
      .filter(path => path.includes('Defs/') && path.endsWith('.xml'))
      .map(async path => {
        const file = Bun.file(`${input}/${path}`)
        const xml = await file.text()
        const obj = parser.parse(xml)
        return obj
      })
  )

  const mergedObj = mergeXmlObjs(xmlObjs)
  const defRels = recordDefRels(mergedObj)

  return serializeRels(defRels)
}

export default collectRels
