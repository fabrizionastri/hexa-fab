import { ordersMock } from '../../../mock/db'
import { Order } from '../../core/entities/order'
import { JsonServerStore } from './JsonServerStore'

describe('JsonServerStore', () => {
  describe('Order', () => {
    const orderStore = JsonServerStore<Order>('orders')
    describe('get', () => {
      it('should return Order for get', async () => {
        const order: Order | undefined = await orderStore.get('order1')
        expect(order).toEqual(ordersMock[0])
      })
    })
    describe('getAll', () => {
      it('should return Order[] for getAll', async () => {
        const orders: Order[] = await orderStore.getAll()
        expect(orders).toEqual(ordersMock)
      })
    })
    describe('put', () => {
      it('should return true when posting a valid new order', async () => {
        const order: Order = {
          id: 'order2',
          name: 'Culotte',
        }
        const result = await orderStore.post(order)
        expect(result).toBeDefined()
      })
    })
  })
})
