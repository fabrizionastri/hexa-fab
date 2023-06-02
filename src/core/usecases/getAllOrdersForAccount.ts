import { Order } from '../entities/order'
import { OrderStore } from '../../adapters/stores/stores'
import { getByProperty } from './getByProperty'

export const getAllOrdersForAccount = async (accountId: string): Order[] => {
  const orders = await OrderStore.getAll()
  const buyOrders = getByProperty('clientId', accountId, orders)
  const sellOrders = getByProperty('supplierId', accountId, orders)
  return [...buyOrders, ...sellOrders]
}
