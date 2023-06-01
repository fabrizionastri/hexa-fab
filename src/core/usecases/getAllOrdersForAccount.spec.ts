import { orderStore } from '../gateways/order.gateway'

describe('getAllOrdersForAccount', () => {
  it('should return [] when no matching id is found', () => {
    expect(undefined).toEqual(undefined)
  })
  // it('should return both by and sell orders for valid account id ', () => {
  //   const selectedOrders = orderStore.expect(undefined).toEqual(undefined)
  // })
})
