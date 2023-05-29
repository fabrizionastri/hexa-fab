// a generic function for type T which, when given an array of IDs (strings) representing the IDs of the entities T to be retrieved, returns a Promise of an array of entities T, using the getById method of the store. For each ID, if the entity is found, it is returned, otherwise undefined is returned.

import { Store } from '../gateways/store.gateway'

export const getEntitiesByIds = <T>(
  store: Store<T>,
  ids: string[]
): Promise<(T | undefined)[]> => {
  return Promise.all(ids.map((id) => store.getById(id)))
}
