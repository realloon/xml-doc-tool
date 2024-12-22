import collectRels from './collect/collectRels'
import parser from './utils/parser'
import recordRels from './utils/recordRels'
import serializeRels from './utils/serializeRels'

const output = { version: '1.5' }
const defRels = await collectRels()

Object.assign(output, defRels)

Bun.write('dist/assets/db.json', JSON.stringify(output))

const xml = `<?xml version="1.0" encoding="utf-8"?>
<Defs>
  <ThingDef Abstract="True" Name="Weapon">
    <category>Item</category>
    <statBases>
      <MaxHitPoints>100</MaxHitPoints>
    </statBases>
  </ThingDef>
</Defs>`

console.log(JSON.stringify(serializeRels(recordRels(parser.parse(xml))), null, 2))
