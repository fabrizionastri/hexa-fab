import { OrderStoreInMemory } from './inMemory/order.store.inMemory'
import { OrderItemStoreInMemory } from './inMemory/orderItem.store.inMemory'
import { OrderStoreJsonServer } from './jsonServer/order.store.jsonServer'
import dotenv from 'dotenv'

// load environment variables from .env file
dotenv.config()

const STORE_TYPE = process.env.STORE_TYPE

let OrderStore
let OrderItemStore

switch (STORE_TYPE) {
  case 'inMemory':
    OrderStore = OrderStoreInMemory
    OrderItemStore = OrderItemStoreInMemory
    break
  case 'jsonServer':
    OrderStore = OrderStoreJsonServer
    // You would also define your OrderItemStore for the jsonServer case here
    break
  default:
    throw new Error('Invalid STORE_TYPE in .env file')
}

export { OrderStore, OrderItemStore }
