import { nanoid } from 'nanoid'

import { mockStore } from '../../../../mock/db'
import { Order } from '../../../core/entities/order'
import { OrderItem } from '../../../core/entities/orderItem'
import { OrderItemGateway1 } from '../../../core/gateways/orderItem.gateway'
import { genericStoreInMemory1 } from './generic.store.inMemory'

export const orderItemStoreInMemory1: OrderItemGateway1 = (() => {
  const store: OrderItem[] = [...mockStore.orderItems]
  return {
    getById: async (id: string): Promise<OrderItem | undefined> => {
      return store.find((entity: OrderItem) => entity.id === id)
    },
    getAll: async (): Promise<OrderItem[] | undefined> => {
      return store
    },
    create: async (entity: OrderItem): Promise<OrderItem | undefined> => {
      // if entity does not have an id, generate an id using nanoid and loop if needed until it is unique
      if (!entity.id) {
        entity.id = nanoid()
        while (store.find((e: OrderItem) => e.id === entity.id)) {
          entity.id = nanoid()
        }
      }
      // else, if entity has an id but this id already exists, return undefined + log error
      else {
        if (store.find((e: OrderItem) => e.id === entity.id)) {
          console.log(`Error: Entity with ID ${entity.id} already exists in the store.`)
          return undefined
        }
      }
      store.push(entity)
      return entity
    },
    deleteById: async (id: string): Promise<OrderItem | undefined> => {
      // if the store does not contain an entity with this id, return undefined
      if (!store.find((entity: OrderItem) => entity.id === id)) return undefined
      // if the store contains an entity with this id, remove it and return the entity
      return store.splice(
        store.findIndex((entity: OrderItem) => entity.id === id),
        1
      )[0]
    },
    update: async (id: string, partialEntity: Partial<OrderItem>): Promise<OrderItem | undefined> => {
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
    getByProperty: async (property: keyof OrderItem, value: any): Promise<OrderItem[] | undefined> => {
      return store.filter((entity: OrderItem) => entity[property] === value)
    },
    getByOrderId: async (orderId: string): Promise<OrderItem[] | undefined> => {
      return store.filter((entity: OrderItem) => (entity as unknown as Order).clientId === orderId)
    },
  }
})()

export const orderItemStoreInMemory2: OrderItemGateway1 = (() => {
  const store: OrderItem[] = [...mockStore.orderItems]
  return {
    ...genericStoreInMemory1<OrderItem>(mockStore.orderItems),
    getByProperty: async (property: keyof OrderItem, value: any): Promise<OrderItem[] | undefined> => {
      return store.filter((entity: OrderItem) => entity[property] === value)
    },
    getByOrderId: async (orderId: string): Promise<OrderItem[] | undefined> => {
      return store.filter((entity: OrderItem) => (entity as unknown as Order).clientId === orderId)
    },
  }
})()
