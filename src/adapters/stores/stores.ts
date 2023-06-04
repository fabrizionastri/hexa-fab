import dotenv from 'dotenv'

import { OrderGateway1 } from '../../core/gateways/order.gateway'
import { OrderItemGateway1 } from '../../core/gateways/orderItem.gateway'
import { orderStoreInMemory1, orderStoreInMemory2 } from './inMemory/order.store.inMemory'
import { orderItemStoreInMemory1, orderItemStoreInMemory2 } from './inMemory/orderItem.store.inMemory'
import { OrderStoreJsonServer1 } from './jsonServer/order.store.jsonServer'

// load environment variables from .env file
dotenv.config()

const STORE_TYPE = process.env.STORE_TYPE ?? 'inMemory'

let orderStore: OrderGateway1
let orderItemStore: OrderItemGateway1

switch (STORE_TYPE) {
  case 'inMemory':
    orderStore = orderStoreInMemory1
    orderItemStore = orderItemStoreInMemory1
    break
  case 'inMemory2':
    orderStore = orderStoreInMemory2
    orderItemStore = orderItemStoreInMemory2
    break
  case 'jsonServer':
    orderStore = OrderStoreJsonServer1
    // orderItemStore = orderItemStoreInMemory2 // not yet implemented
    break
  default:
    throw new Error('Invalid STORE_TYPE in .env file')
}

export { orderItemStore as orderItemStore, orderStore as orderStore }
