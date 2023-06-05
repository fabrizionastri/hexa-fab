import { mockStore } from '../../../mock/db'
import { Order } from '../../core/entities/order'
import { OrderGateway1 } from '../../core/gateways/order.gateway'

// Both stores (1 and 2) work both with both gateways (1 and 2)

export const orderStoreInMemory1: OrderGateway1 = (() => {
  const store: Order[] = [...mockStore.orders]
  return {
    getAll: async (): Promise<Order[] | undefined> => {
      return store
    },
    getById: async (id: string): Promise<Order | undefined> => {
      return store.find((entity: Order) => entity.id === id)
    },
  }
})()

export const orderStoreInMemory3 = () => {
  const store: Order[] = [...mockStore.orders]
  return {
    getAll: () => store,
    getById: (orderId: string) => store.find((order) => order.id === orderId),
  }
}
