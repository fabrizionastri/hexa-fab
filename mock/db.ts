import { Order } from '../src/core/entities/order'
import { OrderItem } from '../src/core/entities/orderItem'

export const ordersMock: Order[] = [
  {
    id: 'order1',
    name: '21 T-shirts (bleus + rouges)',
    orderItems: ['orderItem1', 'orderItem2'],
  },
  {
    id: 'order2',
    name: 'Chaussettes',
  },
  {
    id: 'order3',
    name: 'Chaussures',
  },
]

export const orderItemsMock: OrderItem[] = [
  {
    id: 'orderItem1',
    orderId: 'order1',
    name: 'T-shirt rouge',
    quantity: 15,
    unit: 'unit',
    price: 10,
    tax: 0.2,
  },
  {
    id: 'orderItem2',
    orderId: 'order1',
    name: 'T-shirt bleu',
    quantity: 6,
    unit: 'unit',
    price: 12,
    tax: 0.2,
  },
]
