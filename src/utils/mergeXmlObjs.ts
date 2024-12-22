interface Result {
  [key: string]: unknown
  Defs: Record<string, Array<unknown>>
}

/**
 * Merge objects converted from Def Xml.
 */
function mergeXmlObjs(objs: Array<NormalObj>) {
  const result: Result = { Defs: {} }

  objs.forEach(obj => {
    const currentDefs = obj.Defs as Record<string, Array<unknown>>

    Object.keys(currentDefs).forEach(key => {
      if (!result.Defs[key]) {
        result.Defs[key] = [] // init
      }
      // Concat array.
      result.Defs[key] = result.Defs[key].concat(currentDefs[key])
    })
  })

  return result
}

export default mergeXmlObjs
