import { Order } from '../entities/order'
import { orderStore } from '../gateways/store.gateway'
import { getByProperty } from './getByProperty'

export const getAllOrdersForAccount = (accountId: string): Order[] => {
  const orders = orderStore.orders
  const buyOrders = getByProperty('clientId', accountId, orders)
  const sellOrders = getByProperty('supplierId', accountId, orders)
  return [...buyOrders, ...sellOrders]
}
