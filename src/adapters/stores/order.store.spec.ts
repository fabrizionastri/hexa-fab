import { mockStore } from 'mock/db'

import { orderStoreInMemory1, orderStoreInMemory3 } from './order.store'

const orderStores = [
  { storeName: 'OrderStoreInMemory1', orderStore: orderStoreInMemory1 },
  { storeName: 'OrderStoreInMemory3()', orderStore: orderStoreInMemory3() },
]

const orders = mockStore.orders

describe('orderStore', () => {
  orderStores.forEach(({ storeName, orderStore }) => {
    describe(storeName, () => {
      describe('getById', () => {
        it('return 1 order for valid id', async () => {
          const result = await orderStore.getById('order1')
          expect(result).toEqual(orders[1])
        })
        it('return undefined for inexistant id', async () => {
          const result = await orderStore.getById('inexistant')
          expect(result).toEqual(undefined)
        })
      })

      describe('getAll', () => {
        it('return all orders when orders are present', async () => {
          const result = await orderStore.getAll()
          expect(result).toEqual(orders)
        })
      })
    })
  })
})
