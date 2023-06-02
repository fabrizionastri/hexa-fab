import { mockStore } from '../../../../mock/db'
import { OrderItem } from '../../../core/entities/orderItem'
import { OrderItemAdapterIM as OrderItemAdapter } from './orderItem.adapter.im'

const orders = mockStore.orderItems

const orderItem4: OrderItem = {
  id: 'orderItem4',
  orderId: 'Order2',
  name: 'chausse pied',
  quantity: 1,
  unit: 'unit',
  price: 5,
  tax: 0.2,
}
const orderItemX: OrderItem = {
  id: '',
  orderId: 'Order3',
  name: 'semelle',
  quantity: 1,
  unit: 'unit',
  price: 10,
  tax: 0.2,
}

describe('OrderItemAdapterIM', () => {
  describe('orders', () => {
    const orderItemAdapter = OrderItemAdapter

    describe('getById', () => {
      it('return 1 order for valid id', async () => {
        const result: OrderItem | undefined = await orderItemAdapter.getById(
          'orderItem1'
        )
        expect(result).toEqual(orders[1])
      })
      it('return undefined for inexistant id', async () => {
        const order: OrderItem | undefined = await orderItemAdapter.getById(
          'inexistant'
        )
        expect(order).toEqual(undefined)
      })
    })

    describe('getAll', () => {
      it('return all orders when orders are present', async () => {
        const result: OrderItem[] | undefined = await orderItemAdapter.getAll()
        expect(result).toEqual(orders)
      })
    })

    describe('create', () => {
      it('return order with same ID when posting order with ID', async () => {
        const result = await orderItemAdapter.create(orderItem4)
        // console.log('order4:', result)
        expect(result).toBeDefined()
        expect(result).toEqual(orderItem4)
      })

      it('return order with new ID when posting order without valid ID', async () => {
        const result = await orderItemAdapter.create(orderItemX)
        if (!result?.id) return undefined
        orderItemX.id = result.id
        // console.log('OrderItem X result from create:', result)
        // console.log('OrderItem X updated order with:', orderItemX)
        expect(result).toEqual(orderItemX)
        if (orderItemX.id) await orderItemAdapter.deleteById(orderItemX.id)
      })
    })

    describe('update', () => {
      it('return updated order when posting order with valid ID ', async () => {
        const updatedValues: Partial<OrderItem> = {
          name: 'Chausse pied en métal',
        }
        orderItem4.name = updatedValues.name ?? ''
        const result = await orderItemAdapter.update(
          'orderItem4',
          updatedValues
        )
        // console.log('orderItem4 updated object:', orderItem4)
        // console.log('orderItem4 updated result:', result)
        expect(result).toEqual(orderItem4)
      })

      it('return order with new ID when posting order without ID', async () => {
        const result = await orderItemAdapter.update('order5', orderItemX)
        if (!result?.id) return undefined
        orderItemX.id = result.id
        // console.log('newOrder 5 result:', result)
        // console.log('newOrder 5 newOrder:', orderItemX)
        expect(result).toEqual(orderItemX)
        if (orderItemX.id) await orderItemAdapter.deleteById(orderItemX.id)
      })
    })

    describe('deleteById', () => {
      it('return order when sucessfully deleting an order with a valid ID', async () => {
        const result = await orderItemAdapter.deleteById('order4')
        expect(result).toEqual(result)
      })
    })
  })
})
