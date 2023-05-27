import { Order } from '../src/core/entities/order'
import { OrderItem } from '../src/core/entities/orderItem'

export const ordersMock: Order[] = [
  {
    id: 'order1',
    name: '21 T-shirts',
  },
  {
    id: 'set879',
    name: 'Chaussettes',
  },
  {
    id: 'jkl789',
    name: 'Chaussures',
  },
]

export const orderItemsMock: OrderItem[] = [
  {
    id: 'orderItem1',
    orderId: 'order1',
    name: 'T-shirt',
    quantity: 21,
    price: 10,
  },
]
