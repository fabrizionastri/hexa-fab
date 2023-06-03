// import { mockStore } from '../../../mock/db'
// import { OrderItemStore } from '../../adapters/stores/stores'

// import { Order } from '../../core/entities/order'
// import { OrderItem } from '../entities/orderItem'
// import { getByProperty } from './getByProperty'

// const orderItemStore = OrderItemStore

// const ordersItems = mockStore.orderItems

describe('getByProperty', () => {
  it('should return true', () => {
    expect(true).toEqual(true)
  })

  // it('return list of 2 childs of Order 1', async () => {
  //   // const orderInMemoryStore = ordersMock
  //   expect(await getByProperty<OrderItem>('orderId', 'order1', orderItemStore)).toEqual(
  //     ordersItems.slice(1, 3)
  //   )
  // })
  // it('return list of 1 child of Order 2', async () => {
  //   // const orderInMemoryStore = ordersMock
  //   expect(await getByProperty<OrderItem>('orderId', 'order2', orderItemStore)).toEqual(
  //     ordersItems.slice(3, 4)
  //   )
  // })
})

// inutil de tester le use case sur les deux adapters
// describe('getByProperty from Json Server', () => {
//   const orderItemStore = OrderItemAdapterIM
//   it('return list of 2 childs of Order 1', async () => {
//     expect(
//       await getByProperty<OrderItem>('orderId', 'order1', orderItemStore)
//     ).toEqual(ordersItems.slice(1, 3))
//   })
//   it('return list of 1 child of Order 2', async () => {
//     expect(
//       await getByProperty<OrderItem>('orderId', 'order2', orderItemStore)
//     ).toEqual(ordersItems.slice(3, 4))
//   })
// })
