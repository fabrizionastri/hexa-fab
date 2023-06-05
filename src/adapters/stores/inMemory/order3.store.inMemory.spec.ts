import { mockStore } from 'mock/db'

import { orderStoreInMemory3 } from './order.store.inMemory'

const orders = mockStore.orders

describe('orderStoreInMemory3', () => {
  const orderStore = orderStoreInMemory3()
  it('should return all orders', async () => {
    expect(orderStore.getAll()).toEqual(orders)
  })
  it('should return the order with the specified ID', async () => {
    const id = 'order1'
    expect(orderStore.getById(id)).toEqual(orders[1])
  })
  it('should return an empty array when accountId is not found', async () => {
    const accountId = 'will not be found'
    expect(orderStore.getByAccountId(accountId)).toEqual([])
  })
  it('should return 2 orders for accountA exists', async () => {
    const accountId = 'accountA'
    expect(orderStore.getByAccountId(accountId)).toMatchObject(orders.splice(1, 2))
  })
})
