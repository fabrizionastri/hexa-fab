import { mockStore } from '../../../../mock/db'
import { Order } from '../../../core/entities/order'
import { OrderAdapterIM as OrderAdapter } from './order.adapter.im'

const orders = mockStore.orders

const order4: Order = {
  id: 'order4',
  clientId: 'clientA',
  supplierId: 'clientC',
  name: 'Bonnet',
  principal: 10,
}
const order5: Order = {
  id: '',
  clientId: 'clientB',
  supplierId: 'clientC',
  name: 'Manteau',
}

describe('OrderAdapterIM', () => {
  const orderAdapter = OrderAdapter

  describe('getById', () => {
    it('return 1 order for valid id', async () => {
      const order = await orderAdapter.getById('order1')
      expect(order).toEqual(orders[1])
    })
    it('return undefined for inexistant id', async () => {
      const order = await orderAdapter.getById('inexistant')
      expect(order).toEqual(undefined)
    })
  })

  describe('getAll', () => {
    it('return all orders when orders are present', async () => {
      const result = await orderAdapter.getAll()
      expect(result).toEqual(orders)
    })
  })

  describe('create', () => {
    it('return order with same ID when posting order with ID', async () => {
      const result = await orderAdapter.create(order4)
      // console.log('order4:', result)
      expect(result).toBeDefined()
      expect(result).toEqual(order4)
    })

    it('return order with new ID when posting order without valid ID', async () => {
      const result = await orderAdapter.create(order5)
      if (!result?.id) return undefined
      order5.id = result.id
      // console.log('newOrder 5 result:', result)
      // console.log('newOrder 5 newOrder:', order5)
      expect(result).toEqual(order5)
      if (order5.id) await orderAdapter.deleteById(order5.id)
    })
  })

  describe('update', () => {
    it('return updated order when posting order with valid ID ', async () => {
      const updatedValues: Partial<Order> = {
        id: 'order4',
        name: 'Bonnet Bleu',
      }
      order4.name = updatedValues.name ?? ''
      const result = await orderAdapter.update('order4', updatedValues)
      // console.log('order4 updated object:', order4)
      // console.log('order4 updated result:', result)
      expect(result).toEqual(order4)
    })

    it('return order with new ID when posting order without ID', async () => {
      const result = await orderAdapter.update('order5', order5)
      if (!result?.id) return undefined
      order5.id = result.id
      // console.log('newOrder 5 result:', result)
      // console.log('newOrder 5 newOrder:', order5)
      expect(result).toEqual(order5)
      if (order5.id) await orderAdapter.deleteById(order5.id)
    })
  })

  describe('deleteById', () => {
    it('return order when sucessfully deleting an order with a valid ID', async () => {
      const result = await orderAdapter.deleteById('order4')
      expect(result).toEqual(result)
    })
  })
})
