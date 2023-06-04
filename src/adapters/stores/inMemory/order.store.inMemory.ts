import { nanoid } from 'nanoid'

import { mockStore } from '../../../../mock/db'
import { Order } from '../../../core/entities/order'
import { OrderGateway1, OrderGateway2 } from '../../../core/gateways/order.gateway'
import { GenericStoreInMemory } from './generic.store.inMemory'

// Both stores (1 and 2) work both with both gateways (1 and 2)

export const OrderStoreInMemory1: OrderGateway1 = (() => {
  const store: Order[] = [...mockStore.orders]
  return {
    getById: async (id: string): Promise<Order | undefined> => {
      return store.find((entity: Order) => entity.id === id)
    },
    getAll: async (): Promise<Order[] | undefined> => {
      return store
    },
    create: async (entity: Order): Promise<Order | undefined> => {
      // if entity does not have an id, generate an id using nanoid and loop if needed until it is unique
      if (!entity.id) {
        entity.id = nanoid()
        while (store.find((e: Order) => e.id === entity.id)) {
          entity.id = nanoid()
        }
      }
      // else, if entity has an id but this id already exists, return undefined + log error
      else {
        if (store.find((e: Order) => e.id === entity.id)) {
          console.log(`Error: Entity with ID ${entity.id} already exists in the store.`)
          return undefined
        }
      }
      store.push(entity)
      return entity
    },
    deleteById: async (id: string): Promise<Order | undefined> => {
      // if the store does not contain an entity with this id, return undefined
      if (!store.find((entity: Order) => entity.id === id)) return undefined
      // if the store contains an entity with this id, remove it and return the entity
      return store.splice(
        store.findIndex((entity: Order) => entity.id === id),
        1
      )[0]
    },
    update: async (id: string, partialEntity: Partial<Order>): Promise<Order | undefined> => {
      // if (!('id' in partialEntity)) return undefined
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
    getByProperty: async (property: keyof Order, value: any): Promise<Order[] | undefined> => {
      return store.filter((entity: Order) => entity[property] === value)
    },
    getForAccount: async (accountId: string): Promise<Order[] | undefined> => {
      return store.filter(
        (entity: Order) =>
          (entity as unknown as Order).clientId === accountId || (entity as unknown as Order).supplierId === accountId
      )
    },
  }
})()

export const OrderStoreInMemory2: OrderGateway2 = (() => {
  const store: Order[] = [...mockStore.orders]

  return {
    ...GenericStoreInMemory<Order>(mockStore.orders),
    getByProperty: async (property: keyof Order, value: any): Promise<Order[] | undefined> => {
      return store.filter((entity: Order) => entity[property] === value)
    },
    getForAccount: async (accountId: string): Promise<Order[] | undefined> => {
      return store.filter(
        (entity: Order) =>
          (entity as unknown as Order).clientId === accountId || (entity as unknown as Order).supplierId === accountId
      )
    },
  }
})()
