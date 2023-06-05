import { OrderItem } from '../../../core/entities/orderItem'

export const orderItemStoreInMemory3 = (): any => {
  let localArray: OrderItem[] = []
  return {
    getAll: (): OrderItem[] => {
      return localArray
    },
    getByOrderId: (orderId: string): OrderItem[] => {
      return localArray.filter((orderItem) => orderItem.orderId === orderId)
    },
    feedWith: (...data: OrderItem[]): void => {
      localArray = data
    },
  }
}
