import { orderStoreInMemory3 } from '~/src/adapters/stores/inMemory/order.store.inMemory'

import { mockStore } from '../../../mock/db'
import { Order } from '../entities/order'
import { orderGateway3, orderGateway4 } from './order.gateway'

const orders: Order[] = mockStore.orders

// TESTS
describe('orderGateway1 : rien à tester', () => {
  it("il n'y a rien a testers", () => {
    return expect(true).toEqual(true)
  })
})
describe('orderGateway1 : rien à tester', () => {
  it("il n'y a rien a testers", () => {
    return expect(true).toEqual(true)
  })
})

describe('orderGateway3 and orderStoreInMemory3', () => {
  it('should return all orders from the store', () => {
    const orderGateway = orderGateway3(orderStoreInMemory3())
    const result = orderGateway.getAll()
    return expect(result).toEqual(orders)
  })

  it('should return the order with the specified ID from the store', () => {
    const orderGateway = orderGateway3(orderStoreInMemory3())
  })
})

describe('orderGateway4 and orderStoreInMemory4', () => {
  it('should return all orders from the store', () => {
    const orderGateway = orderGateway4(orderStoreInMemory3())
    const result = orderGateway.getAll()
    return expect(result).toEqual(orders)
  })

  it('should return the order with the specified ID from the store', () => {
    const orderGateway = orderGateway4(orderStoreInMemory3())
    const result = orderGateway.getById('order1')
    return expect(result).toEqual(orders[1])
  })
})
