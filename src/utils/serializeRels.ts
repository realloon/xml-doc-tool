function serializeRels(relations: Rels) {
  const serialized: Record<string, any> = {}

  for (const key in relations) {
    serialized[key] = {
      parents: Array.from(relations[key].parents),
      children: Array.from(relations[key].children),
      values: Array.from(relations[key].values),
      attributes: {},
    }

    relations[key].attributes.forEach(
      (valueSet: Iterable<string>, attrKey: string) => {
        serialized[key].attributes[attrKey] = Array.from(valueSet)
      }
    )
  }

  return serialized
}

export default serializeRels
