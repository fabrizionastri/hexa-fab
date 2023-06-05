import { Order } from '../src/core/entities/order'
import { OrderItem } from '../src/core/entities/orderItem'

export const mockStore: {
  orders: Order[]
  orderItems: OrderItem[]
} = {
  orders: [
    {
      id: 'order0',
      clientId: 'accountX',
      supplierId: 'accountB',
    },
    {
      id: 'order1',
      clientId: 'accountA',
      supplierId: 'accountB',
      name: '21 T-shirts (bleus + rouges)',
    },
    {
      id: 'order2',
      clientId: 'accountC',
      supplierId: 'accountA',
      name: 'Chaussettes',
    },
    {
      id: 'order3',
      clientId: 'accountB',
      supplierId: 'accountC',
      name: 'Chaussures',
    },
  ],
  orderItems: [
    {
      id: 'orderItem0',
      orderId: 'order0',
      name: '0',
      quantity: 0,
      unit: 'unit',
      price: 0,
      tax: 0,
    },
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
    {
      id: 'orderItem3',
      orderId: 'order2',
      name: 'chaussette noire',
      quantity: 3,
      unit: 'pair',
      price: 5,
      tax: 0.2,
    },
  ],
}
