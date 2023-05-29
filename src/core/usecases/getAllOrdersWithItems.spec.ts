import { getAllOrdersWithItems } from './getAllOrdersWithItems'

describe('getAllOrdersWithItems', () => {
  // beforeEach(() => {
  //   gateway = orderGateway()
  // })

  it('should return empty array if no orders', () => {
    expect(getAllOrdersWithItems()).toEqual([])
  })

  // describe('when there are orders', () => {
  //   let gateway: any
  //   beforeEach(() => {
  //     gateway = orderGateway([
  //       { id: 'order1', name: 'order1' },
  //       { id: 'order2', name: 'order2' },
  //     ])
  //   })

  //   it('should return all orders', () => {
  //     expect(getAllOrdersWithItems()).toEqual([
  //       { id: 'order1', name: 'order1' },
  //       { id: 'order2', name: 'order2' },
  //     ])
  //   })
  // })
})
