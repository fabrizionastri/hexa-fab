import { inMemoryDb } from 'mock/inMemoryDb'
import { OrderGateway1 } from 'gateways/order.gateway'
import { Order } from 'entities/order'

// Both dbs (1 and 2) work both with both gateways (1 and 2)

export const orderDbAdapterInMemory1: OrderGateway1 = (() => {
  const ordersDb: Order[] = [...inMemoryDb.orders]
  return {
    getAll: () => ordersDb,
    getById: (orderId: string) => ordersDb.find((order) => order.id === orderId),
  }
})()

export const orderDbAdapterInMemory2 = () => {
  const ordersDb: Order[] = [...inMemoryDb.orders]
  return {
    getAll: () => ordersDb,
    getById: (orderId: string) => ordersDb.find((order) => order.id === orderId),
  }
}
