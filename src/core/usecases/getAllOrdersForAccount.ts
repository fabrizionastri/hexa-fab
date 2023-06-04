import { orderStore } from '../../adapters/stores/stores'
import { Order } from '../entities/order'
// import { getByProperty } from './getByProperty'

export const getAllOrdersForAccount = async (/* accountId: string */): Promise<Order[] | undefined> => {
  const orders = await orderStore.getAll()
  // const buyOrders = getByProperty('clientId', accountId, orders)
  // const sellOrders = getByProperty('supplierId', accountId, orders)
  // return [...buyOrders, ...sellOrders]
  return orders
}
