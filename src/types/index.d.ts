interface Rel {
  parents: Set<string>
  children: Set<string>
  values: Set<string | boolean>
  attributes: Map<string, Set<string>>
}

type Rels = Record<string, Rel>

type NormalObj = Record<string, unknown>