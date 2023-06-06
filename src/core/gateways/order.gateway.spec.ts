import { Order } from 'entities/order'
import { orderDbAdapterInMemory2 } from 'src/adapters/dbAdapters/inMemory/order.dbAdapter'

import { inMemoryDb } from '~/mock/inMemoryDb'

import { orderGateway2, orderGateway4 } from './order.gateway'

const orders: Order[] = inMemoryDb.orders

// TESTS

// Note : no need to test orderGateway1 because it is an interface, not a function

describe('orderGateway2 and orderDbInMemory2', () => {
  describe('orderGateway2 and orderDbInMemory2', () => {
    it('should return all orders from the db', () => {
      const orderGateway = orderGateway2(orderDbAdapterInMemory2())
      const result = orderGateway.getAll()
      return expect(result).toEqual(orders)
    })

    it('should return the order with the specified ID from the db', () => {
      const orderGateway = orderGateway2(orderDbAdapterInMemory2())
      const result = orderGateway.getById('order1')
      return expect(result).toEqual(orders[1])
    })
  })

  describe('orderGateway4 and orderDbInMemory4', () => {
    it('should return all orders from the db', () => {
      const orderGateway = orderGateway4(orderDbAdapterInMemory2())
      const result = orderGateway.getAll()
      return expect(result).toEqual(orders)
    })

    it('should return the order with the specified ID from the db', () => {
      const orderGateway = orderGateway4(orderDbAdapterInMemory2())
      const result = orderGateway.getById('order1')
      return expect(result).toEqual(orders[1])
    })
  })
})
