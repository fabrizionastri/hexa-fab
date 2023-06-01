import { OrderGateway } from '../../../core/gateways/order.gateway'
import { mockStore } from '../../../../mock/db'
import { Order } from '../../../core/entities/order'
import { OrderItem } from '../../../core/entities/orderItem'
import { nanoid } from 'nanoid'

const store: Order[] = mockStore.orders

export const OrderAdapterIM: OrderGateway = {
  getById: async (id: string): Promise<Order | undefined> => {
    return store.find((entity: Order) => entity.id === id)
  },
  getAll: async (): Promise<Order[] | undefined> => {
    return store
  },
  create: async (entity: Order): Promise<Order | undefined> => {
    // if entity does not have an id, generate an unique id using nanoid
    if (!entity.id) entity.id = nanoid()
    // if this id already exists, replace it with a unique id using nanoid
    while (store.find((e: Order) => e.id === entity.id)) {
      entity.id = nanoid()
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
  update: async (partialEntity: Partial<Order>): Promise<Order | undefined> => {
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
    property: keyof Order,
    value: any
  ): Promise<Order[] | undefined> => {
    return store.filter((entity: Order) => entity[property] === value)
  },
  getForAccount: async (accountId: string): Promise<Order[] | undefined> => {
    return store.filter(
      (entity: Order) =>
        (entity as unknown as Order).clientId === accountId ||
        (entity as unknown as Order).supplierId === accountId
    )
  },
  // getAllCommitmentForAccount: async (accountId: string): Promise<Order[] | undefined> => {
  //   return store.filter(
  //     (entity: Order) =>
  //       (entity as unknown as Order).payeeId === accountId ||
  //       (entity as unknown as Order).payorId === accountId
  //   )
  // }
}
