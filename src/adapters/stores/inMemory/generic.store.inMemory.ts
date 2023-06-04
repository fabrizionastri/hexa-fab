import { nanoid } from 'nanoid'

import { GenericGateway } from './../../../core/gateways/generic.gateway'

export function genericStoreInMemory1<T extends { id: string }>(data: T[]): GenericGateway<T> {
  const store: T[] = [...data]

  return {
    getById: async (id: string): Promise<T | undefined> => {
      return store.find((entity: T) => entity.id === id)
    },
    getAll: async (): Promise<T[] | undefined> => {
      return store
    },
    create: async (entity: T): Promise<T | undefined> => {
      // if entity does not have an id, generate an id using nanoid and loop if needed until it is unique
      if (!entity.id) {
        entity.id = nanoid()
        while (store.find((e: T) => e.id === entity.id)) {
          entity.id = nanoid()
        }
      }
      // else, if entity has an id but this id already exists, return undefined + log error
      else {
        if (store.find((e: T) => e.id === entity.id)) {
          console.log(`Error: Entity with ID ${entity.id} already exists in the store.`)
          return undefined
        }
      }
      store.push(entity)
      return entity
    },
    deleteById: async (id: string): Promise<T | undefined> => {
      // if the store does not contain an entity with this id, return undefined
      if (!store.find((entity: T) => entity.id === id)) return undefined
      // if the store contains an entity with this id, remove it and return the entity
      return store.splice(
        store.findIndex((entity: T) => entity.id === id),
        1
      )[0]
    },
    update: async (id: string, partialEntity: Partial<T>): Promise<T | undefined> => {
      const index = store.findIndex((entity) => entity.id === id)
      if (index === -1) return undefined
      const existingEntity = store[index]
      const updatedEntity = Object.assign({
        ...existingEntity,
        ...partialEntity,
      })
      store[index] = updatedEntity
      return updatedEntity
    },
    getByProperty: async (property: keyof T, value: any): Promise<T[] | undefined> => {
      return store.filter((entity: T) => entity[property] === value)
    },
  }
}

export function genericStoreInMemory2<T extends { id: string }>(data: T[]): GenericGateway<T> {
  const store: T[] = [...data]

  return {
    getById: async (id: string): Promise<T | undefined> => {
      return store.find((entity: T) => entity.id === id)
    },
    getAll: async (): Promise<T[] | undefined> => {
      return store
    },
    create: async (entity: T): Promise<T | undefined> => {
      // if entity does not have an id, generate an id using nanoid and loop if needed until it is unique
      if (!entity.id) {
        entity.id = nanoid()
        while (store.find((e: T) => e.id === entity.id)) {
          entity.id = nanoid()
        }
      }
      // else, if entity has an id but this id already exists, return undefined + log error
      else {
        if (store.find((e: T) => e.id === entity.id)) {
          console.log(`Error: Entity with ID ${entity.id} already exists in the store.`)
          return undefined
        }
      }
      store.push(entity)
      return entity
    },
    deleteById: async (id: string): Promise<T | undefined> => {
      // if the store does not contain an entity with this id, return undefined
      if (!store.find((entity: T) => entity.id === id)) return undefined
      // if the store contains an entity with this id, remove it and return the entity
      return store.splice(
        store.findIndex((entity: T) => entity.id === id),
        1
      )[0]
    },
    update: async (id: string, partialEntity: Partial<T>): Promise<T | undefined> => {
      const index = store.findIndex((entity) => entity.id === id)
      if (index === -1) return undefined
      const existingEntity = store[index]
      const updatedEntity = Object.assign({
        ...existingEntity,
        ...partialEntity,
      })
      store[index] = updatedEntity
      return updatedEntity
    },
    getByProperty: async (property: keyof T, value: any): Promise<T[] | undefined> => {
      return store.filter((entity: T) => entity[property] === value)
    },
  }
}

/* 
probably not a good idea have a sub-generic store. Better to have a single generic store
better to have a generic gateway and store, and then specific gateway and store for each entity that extends the generic one 
*/

// export const GenericStoreInMemoryWithAccountId = <T extends { id: string; accountId: string }>(
//   resource: keyof MockStore & string
// ): GenericGatewayWithAccountId<T> => {
//   const store = GenericStoreInMemory<T>(resource)

//   return {
//     ...store,
//     getByAccountId: async (accountId: string): Promise<T[] | undefined> => {
//       const allEntities = await store.getAll()
//       return allEntities?.filter((entity: T) => entity.accountId === accountId)
//     },
//   }
// }
