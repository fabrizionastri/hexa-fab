import { orderStoreInMemory1, orderStoreInMemory3 } from '../../adapters/stores/order.store'
import { Order } from '../entities/order'
// import { getByProperty } from './getByProperty'

export const fetchAll1 = async (): Promise<Order[] | undefined> => {
  return await orderStoreInMemory1.getAll()
}

export const fetchAll3 = (gateway3: any) => () => {
  return gateway3.getAll()
}

// this is equivalent to 3, but defeats the purpose of the gateway
export const fetchAll3_2 = (): Order[] => {
  return orderStoreInMemory3().getAll()
}
