// for a given parent object p, and a given entity type T, getChilds returns a Promise of an array of entities T, using the

import { GenericGateway } from '../gateways/generic.gateway'

export const getByProperty = async <T extends { id: string }>(
  property: keyof T,
  value: any,
  store: GenericGateway<T>
): Promise<T[]> => {
  const array = (await store.getAll()) as T[]
  return array.filter((item) => item[property] === value)
}
