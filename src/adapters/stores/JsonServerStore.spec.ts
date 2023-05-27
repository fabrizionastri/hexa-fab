import { ordersMock } from '../../../mock/db'
import { Order } from '../../core/entities/order'
import { JsonServerStore } from './JsonServerStore'

// import { JsonServerOrderStore } from './JsonServerStore'

// describe('JsonServerOrderStore', () => {
//   it('should return Order for get', async () => {
//     const order: Order | undefined = await JsonServerOrderStore.get('order1')
//     expect(order).toEqual(ordersMock[0])
//   })

//   it('should return Order[] for getAll', async () => {
//     const orders: Order[] = await JsonServerOrderStore.getAll()
//     expect(orders).toEqual(ordersMock)
//   })
// })

describe('JsonServerStore with Order', () => {
  const orderStore = JsonServerStore<Order>('orders')

  it('should return Order for get', async () => {
    const order: Order | undefined = await orderStore.get('order1')
    expect(order).toEqual(ordersMock[0])
  })

  it('should return Order[] for getAll', async () => {
    const orders: Order[] = await orderStore.getAll()
    expect(orders).toEqual(ordersMock)
  })
})
