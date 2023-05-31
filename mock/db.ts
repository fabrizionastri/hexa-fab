import { Order } from '../src/core/entities/order'
import { OrderItem } from '../src/core/entities/orderItem'

export const mockStore: {
  orders: Order[]
  orderItems: OrderItem[]
} = {
  orders: [
    {
      id: 'order1',
      clientId: 'accountA',
      supplierId: 'accountB',
      name: '21 T-shirts (bleus + rouges)',
    },
    {
      id: 'order2',
      clientId: 'accountA',
      supplierId: 'accountC',
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
    {
      id: 'orderItem4',
      orderId: 'order3',
      name: 'Chaussures en cuir',
      quantity: 1,
      unit: 'pair',
      price: 250,
      tax: 0.2,
    },
  ],
}
