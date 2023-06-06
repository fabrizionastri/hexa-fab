import { inMemoryDb } from 'mock/inMemoryDb'
import { orderDbAdapterInMemory1, orderDbAdapterInMemory2 } from './order.dbAdapter'

const orderDbAdapters = [
  { dbName: 'OrderDbInMemory1', orderDbAdapter: orderDbAdapterInMemory1 },
  { dbName: 'OrderDbInMemory2()', orderDbAdapter: orderDbAdapterInMemory2() },
]

const orders = inMemoryDb.orders

describe('Adapters → for each orderDbAdapter', () => {
  orderDbAdapters.forEach(({ dbName, orderDbAdapter }) => {
    describe(dbName, () => {
      describe('getById', () => {
        it('should return an order for valid id', async () => {
          const result = orderDbAdapter.getById('order1')
          expect(result).toEqual(orders[1])
        })
        it('should return undefined for inexistant id', async () => {
          const result = orderDbAdapter.getById('inexistant')
          expect(result).toEqual(undefined)
        })
      })

      describe('getAll', () => {
        it('return all orders when orders are present', async () => {
          const result = orderDbAdapter.getAll()
          expect(result).toEqual(orders)
        })
      })
    })
  })
})
