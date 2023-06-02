import { mockStore } from '../../../../mock/db'
import { Order } from '../../../core/entities/order'
import { OrderItem } from '../../../core/entities/orderItem'
import { nanoid } from 'nanoid'
import { OrderItemGateway } from '../../../core/gateways/orderItem.gateway'

const store: OrderItem[] = mockStore.orderItems

export const OrderItemStoreIM: OrderItemGateway = {
  getById: async (id: string): Promise<OrderItem | undefined> => {
    return store.find((entity: OrderItem) => entity.id === id)
  },
  getAll: async (): Promise<OrderItem[] | undefined> => {
    return store
  },
  create: async (entity: OrderItem): Promise<OrderItem | undefined> => {
    // if entity does not have an id, generate an unique id using nanoid
    if (!entity.id) entity.id = nanoid()
    // if this id already exists, replace it with a unique id using nanoid
    while (store.find((e: OrderItem) => e.id === entity.id)) {
      entity.id = nanoid()
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
  getByProperty: async (
    property: keyof OrderItem,
    value: any
  ): Promise<OrderItem[] | undefined> => {
    return store.filter((entity: OrderItem) => entity[property] === value)
  },
  getForOrder: async (orderId: string): Promise<OrderItem[] | undefined> => {
    return store.filter((entity: OrderItem) => (entity as unknown as Order).clientId === orderId)
  },
}
