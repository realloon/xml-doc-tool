/**
 * Record the parent-child relationships.
 */
function recordRels(obj: Record<string, unknown>): Rels {
  const relations: Rels = {}
  const visited = new Set<unknown>()

  /**
   * 递归遍历对象或数组
   * @param current 当前遍历的对象或数组
   * @param parentName 当前对象的父级名称
   */
  function traverse(
    current: Record<string, unknown> | Array<Record<string, unknown>>,
    parentName: string
  ) {
    if (visited.has(current)) return

    if (Array.isArray(current)) {
      visited.add(current)
      current.forEach(item => traverse(item, parentName))
    } else if (current !== null && typeof current === 'object') {
      visited.add(current)

      const attributeKeys: string[] = []
      const childKeys: string[] = []

      Object.keys(current).forEach(key => {
        if (key.startsWith('@_')) {
          attributeKeys.push(key)
        } else {
          childKeys.push(key)
        }
      })

      // Record atrrs.
      if (parentName) {
        // Init the rel.
        relations[parentName] = relations[parentName] ?? {
          parents: new Set(),
          children: new Set(),
          attributes: new Map(),
          values: new Set(),
        }

        const parentRel = relations[parentName]
        attributeKeys.forEach(attrKey => {
          const attrName = attrKey.slice(2)
          const attrValue = <string>current[attrKey]
          if (!parentRel.attributes.has(attrName)) {
            parentRel.attributes.set(attrName, new Set<string>())
          }
          parentRel.attributes.get(attrName)!.add(attrValue)
        })
      }

      // Handle child Keys.
      childKeys.forEach(key => {
        if (!relations[key]) {
          relations[key] = {
            parents: new Set(),
            children: new Set(),
            attributes: new Map(),
            values: new Set(),
          }
        }

        if (parentName) {
          relations[key].parents.add(parentName)
        }

        const value = current[key]
        const values = Array.isArray(value) ? value : [value]

        if (values.some(v => v !== null && typeof v === 'object')) {
          // Record all children keys.
          const childrenKeys: Set<string> = new Set()

          values.forEach((item: any) => {
            if (item !== null && typeof item === 'object') {
              Object.keys(item).forEach(k => {
                if (!k.startsWith('@_')) {
                  childrenKeys.add(k)
                }
              })
            }
          })

          childrenKeys.forEach(childKey => {
            relations[key].children.add(childKey)
          })

          traverse(values, key) // recursion
        } else {
          // Record value.
          values.forEach(val => {
            relations[key].values.add(val)
          })
        }
      })
    }
  }

  // Start recursion.
  traverse(obj, '_root')

  delete relations['_root']
  return relations
}

export default recordRels
