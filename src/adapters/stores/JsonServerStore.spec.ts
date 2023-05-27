import { ordersMock } from '../../../mock/db'
import { Order } from '../../core/entities/order'
import { JsonServerStore } from './JsonServerStore'

describe('JsonServerStore', () => {
  describe('orders', () => {
    const orderStore = JsonServerStore<Order>('orders')

    describe('get', () => {
      it('valid order for valid id', async () => {
        const order: Order | undefined = await orderStore.get('order1')
        expect(order).toEqual(ordersMock[0])
      })
      it('undefined for inexistant id', async () => {
        const order: Order | undefined = await orderStore.get('inexistant')
        expect(order).toEqual(undefined)
      })
    })

    describe('getAll', () => {
      it('all orders', async () => {
        const orders: Order[] | undefined = await orderStore.getAll()
        expect(orders).toEqual(ordersMock)
      })
    })

    describe('post', () => {
      it('order when posting an order with ID', async () => {
        const newOrder: Order = {
          id: 'Order2',
          name: 'Bonnet',
        }
        const result = await orderStore.post(newOrder)
        expect(result).toBeDefined()
        expect(result).toEqual(newOrder)
      })
      it('id added when posting an order without an ID', async () => {
        const newOrder: Order = {
          name: 'Manteau',
        }
        const result = await orderStore.post(newOrder)
        newOrder.id = result?.id
        expect(result).toBeDefined()
        expect(result).toEqual(newOrder)
        await orderStore.delete(result?.id)
      })
    })

    describe('delete', () => {
      it('{} when deleting an order', async () => {
        const result = await orderStore.delete('Order2')
        expect(result).toEqual({})
      })
    })
  })
})
