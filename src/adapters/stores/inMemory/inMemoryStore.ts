import { Store } from '../../../core/gateways/order.gateway'
import { mockStore } from '../../../../mock/db'
import { Entity } from '../../../core/entities/store'
import { Order } from '../../../core/entities/order'
import { OrderItem } from '../../../core/entities/orderItem'
import { nanoid } from 'nanoid'

type MockStore = {
  orders: Order[]
  orderItems: OrderItem[]
}

export const InMemoryStore = <T extends Entity>(
  resource: keyof MockStore & string
): Store<T> => {
  // if ressource is not a property of object mockStore, throw error

  const keys = Object.keys(mockStore)
  if (!keys.includes(resource)) throw new Error('Resource not found')

  const store = mockStore[resource] as unknown as T[]

  return {
    getById: async (id: string): Promise<T | undefined> => {
      return store.find((entity: T) => entity.id === id)
    },
    getAll: async (): Promise<T[] | undefined> => {
      return store
    },
    create: async (entity: T): Promise<T | undefined> => {
      // if entity does not have an id, generate an unique id using nanoid
      if (!entity.id) entity.id = nanoid()
      // if this id already exists, replace it with a unique id using nanoid
      while (store.find((e: T) => e.id === entity.id)) {
        entity.id = nanoid()
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
    update: async (partialEntity: Partial<T>): Promise<T | undefined> => {
      // if (!('id' in partialEntity)) return undefined
      const id = partialEntity.id
      const index = store.findIndex((entity) => entity.id === id)
      if (index === -1) return undefined
      const existingEntity = store[index]
      // const updatedEntity = { ...store[index], ...partialEntity }
      const updatedEntity = Object.assign({
        ...existingEntity,
        ...partialEntity,
      })
      store[index] = updatedEntity
      return updatedEntity
    },
    getByProperty: async (
      property: keyof T,
      value: any
    ): Promise<T[] | undefined> => {
      return store.filter((entity: T) => entity[property] === value)
    },
    getForAccount: async (accountId: string): Promise<T[] | undefined> => {
      return store.filter(
        (entity: T) =>
          (entity as unknown as Order).clientId === accountId ||
          (entity as unknown as Order).supplierId === accountId
      )
    },
    // getAllCommitmentForAccount: async (accountId: string): Promise<T[] | undefined> => {
    //   return store.filter(
    //     (entity: T) =>
    //       (entity as unknown as Order).payeeId === accountId ||
    //       (entity as unknown as Order).payorId === accountId
    //   )
    // }
  }
}
