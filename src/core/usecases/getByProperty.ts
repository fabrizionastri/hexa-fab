// for a given parent object p, and a given entity type T, getChilds returns a Promise of an array of entities T, using the

import { Entity } from '../entities/store'
import { Store } from '../gateways/store.gateway'

export const getByProperty = async <T extends Entity>(
  property: keyof T,
  value: any,
  store: Store<T>
): Promise<T[]> => {
  const array = (await store.getAll()) as T[]
  return array.filter((item) => item[property] === value)
}
