import { mockStore } from '../../../mock/db'

import { OrderItemAdapterIM } from '../../adapters/stores/inMemory/orderItem.adapter.im'
import { JsonServerStore } from '../../adapters/stores/jsonServer/jsonServerStore'
// import { Order } from '../../core/entities/order'
import { OrderItem } from '../entities/orderItem'
import { getByProperty } from './getByProperty'

const ordersItems = mockStore.orderItems

describe('getByProperty from Mock arrays', () => {
  const orderItemStore = OrderItemAdapterIM
  it('return list of 2 childs of Order 1', async () => {
    // const orderInMemoryStore = ordersMock
    expect(
      await getByProperty<OrderItem>('orderId', 'order1', orderItemStore)
    ).toEqual(ordersItems.slice(1, 3))
  })
  it('return list of 1 child of Order 2', async () => {
    // const orderInMemoryStore = ordersMock
    expect(
      await getByProperty<OrderItem>('orderId', 'order2', orderItemStore)
    ).toEqual(ordersItems.slice(3, 4))
  })
})

describe('getByProperty from Json Server', () => {
  const orderItemStore = JsonServerStore<OrderItem>('orderItems')
  it('return list of 2 childs of Order 1', async () => {
    expect(
      await getByProperty<OrderItem>('orderId', 'order1', orderItemStore)
    ).toEqual(ordersItems.slice(1, 3))
  })
  it('return list of 1 child of Order 2', async () => {
    expect(
      await getByProperty<OrderItem>('orderId', 'order2', orderItemStore)
    ).toEqual(ordersItems.slice(3, 4))
  })
})
