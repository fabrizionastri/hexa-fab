import { orderGateway } from './order.gateway'

describe('orderGateway', () => {
  it('should return empty array if no orders', () => {
    expect(orderGateway()).toEqual([])
  })
})
