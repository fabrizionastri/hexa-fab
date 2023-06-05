import { Order } from '../entities/order'

export interface OrderGateway1 {
  getAll: () => Promise<Order[] | undefined>
  getById: (id: string) => Promise<Order | undefined>
}

export const orderGateway3 = (orderStore: any) => {
  return {
    getAll: (): Order[] => orderStore.getAll(),
    getById: (orderId: string): Order => orderStore.getById(orderId),
  }
}

// this is equivalent to orderGateway3: different syntax but same usage and result
export const orderGateway4 = (orderStore: any) => {
  return {
    getAll: orderStore.getAll,
    getById: orderStore.getById,
  }
}
