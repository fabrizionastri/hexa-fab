import { orderDbAdapterInMemory1, orderDbAdapterInMemory2 } from 'src/adapters/dbAdapters/inMemory/order.dbAdapter'
import { inMemoryDb } from 'mock/inMemoryDb'
import { fetchOrderById } from './fetchById'

const orders = inMemoryDb.orders

const orderDbAdapters = [
  { dbName: 'OrderDbInMemory1', orderDbAdapter: orderDbAdapterInMemory1 },
  { dbName: 'OrderDbInMemory2()', orderDbAdapter: orderDbAdapterInMemory2() },
]

describe('Usecase: fetchOrderById  → for each orderDbAdapter', () => {
  orderDbAdapters.forEach(({ dbName, orderDbAdapter }) => {
    describe(dbName, () => {
      it('shoud return an order for valid id', () => {
        const result = fetchOrderById(orderDbAdapter)('order1')
        expect(result).toEqual(orders[1])
      })

      it('should return undefined for inexistant id', () => {
        const result = fetchOrderById(orderDbAdapter)('inexistant')
        expect(result).toEqual(undefined)
      })
    })
  })
})
