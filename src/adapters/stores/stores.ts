import dotenv from 'dotenv'

import { OrderGateway1 } from '../../core/gateways/order.gateway'
import { OrderItemGateway1 } from '../../core/gateways/orderItem.gateway'
import { OrderStoreInMemory1, OrderStoreInMemory2 } from './inMemory/order.store.inMemory'
import { OrderItemStoreInMemory1, OrderItemStoreInMemory2 } from './inMemory/orderItem.store.inMemory'
import { OrderStoreJsonServer1 } from './jsonServer/order.store.jsonServer'

// load environment variables from .env file
dotenv.config()

const STORE_TYPE = process.env.STORE_TYPE ?? 'inMemory'

let OrderStore: OrderGateway1
let OrderItemStore: OrderItemGateway1

switch (STORE_TYPE) {
  case 'inMemory':
    OrderStore = OrderStoreInMemory1
    OrderItemStore = OrderItemStoreInMemory1
    break
  case 'genericInMemory':
    OrderStore = OrderStoreInMemory2
    OrderItemStore = OrderItemStoreInMemory2
    break
  case 'jsonServer':
    OrderStore = OrderStoreJsonServer1
    // You would also define your OrderItemStore for the jsonServer case here
    break
  default:
    throw new Error('Invalid STORE_TYPE in .env file')
}

export { OrderItemStore, OrderStore }
