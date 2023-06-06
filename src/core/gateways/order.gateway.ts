import { Order } from '../entities/order'

export interface OrderGateway1 {
  getAll: () => Order[] | undefined
  getById: (id: string) => Order | undefined
}

export const orderGateway2 = (orderDbAdapter: any) => {
  return {
    getAll: (): Order[] => orderDbAdapter.getAll(),
    getById: (orderId: string): Order => orderDbAdapter.getById(orderId),
  }
}

// this is equivalent to orderGateway2: different syntax but same usage and result
export const orderGateway4 = (orderDbAdapter: any) => {
  return {
    getAll: orderDbAdapter.getAll,
    getById: orderDbAdapter.getById,
  }
}
