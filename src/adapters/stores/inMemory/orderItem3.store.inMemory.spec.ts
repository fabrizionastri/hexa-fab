import { mockStore } from 'mock/db'

import { orderItemStoreInMemory3 } from './orderItem3.apater'

const orderItems = mockStore.orderItems

describe('orderItemStoreInMemory3', () => {
  const orderItemStore = orderItemStoreInMemory3()
  orderItemStore.feedWith(...orderItems)
  it('should return all order items', () => {
    expect(orderItemStore.getAll()).toEqual(orderItems)
  })
  it('should return three items for order1', () => {
    const orderId = 'order1'
    expect(orderItemStore.getByOrderId(orderId)).toMatchObject(orderItems.splice(1, 2))
  })
  it('should return an empty array for an non existing order', () => {
    const orderId = 'non-existing-order'
    expect(orderItemStore.getByOrderId(orderId)).toMatchObject([])
  })
})

const getAdapter = () => {
  const adapter = orderItemStoreInMemory3()
  adapter.feedWith(...orderItems)
  return adapter
}
