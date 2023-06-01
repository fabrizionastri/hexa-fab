import { JsonServerStore } from '../../adapters/stores/jsonServer/jsonServerStore'
import { OrderAdapterIM } from '../../adapters/stores/inMemory/order.adapter.im'
// import { JsonServerStore } from '../../adapters/stores/jsonServer/jsonServerStore'
import { Order } from '../entities/order'
import { OrderItem } from '../entities/orderItem'
import { Entity } from '../entities/store'

export type Store<T extends Entity> = {
  getById: (id: string) => Promise<T | undefined> // return undefined if ID not found or server error
  getAll: () => Promise<T[] | undefined> // return undefined if server error
  create: (entity: T) => Promise<T | undefined> // return undefined if server error, return entity with id if success. Entity can be posted with id (it will be retained) or without id (it will be generated by the store)
  deleteById: (id: string) => Promise<T | undefined> // return undefined if ID not found or if server error
  update: (partialEntity: Partial<T>) => Promise<T | undefined> // return undefined if ID not found or server error
  getByProperty: (property: keyof T, value: any) => Promise<T[] | undefined> // return undefined if server error
  getForAccount: (accountId: string) => Promise<T[] | undefined> // return undefined if server error
}

export interface OrderGateway {
  // store: Order[]
  getById: (id: string) => Promise<Order | undefined> // return undefined if ID not found or server error
  getAll: () => Promise<Order[] | undefined> // return undefined if server error
  create: (entity: Order) => Promise<Order | undefined> // return undefined if server error, return entity with id if success. Entity can be posted with id (it will be retained) or without id (it will be generated by the store)
  deleteById: (id: string) => Promise<Order | undefined> // return undefined if ID not found or if server error
  update: (partialEntity: Partial<Order>) => Promise<Order | undefined> // return undefined if ID not found or server error
  getByProperty: (
    property: keyof Order,
    value: any
  ) => Promise<Order[] | undefined> // return undefined if server error
  getForAccount: (accountId: string) => Promise<Order[] | undefined> // return undefined if server error
}

export const orderStore =
  process.env.STORE_TYPE === 'JsonServer'
    ? JsonServerStore<Order>('orders')
    : OrderAdapterIM<Order>('orders')

export const orderItemStore =
  process.env.STORE_TYPE === 'JsonServer'
    ? OrderAdapterIM<OrderItem>('orderItems')
    : OrderAdapterIM<OrderItem>('orderItems')
