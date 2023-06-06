import { Order } from '../src/core/entities/order'

export const inMemoryDb: {
  orders: Order[]
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
}
