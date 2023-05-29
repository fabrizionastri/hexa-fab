import { mockStore } from '../../../mock/db'
import { InMemoryStore } from '../../adapters/stores/inMemory/inMemoryStore'
import { JsonServerStore } from '../../adapters/stores/jsonServer/jsonServerStore'
// import { Order } from '../../core/entities/order'
import { OrderItem } from '../entities/orderItem'
import { getByProperty } from './getByProperty'

const ordersItems = mockStore.orderItems

describe('getByProperty from Mock arrays', () => {
  const orderItemStore = InMemoryStore<OrderItem>('orderItems')
  it('return list of 2 childs of Order 1', async () => {
    // const orderInMemoryStore = ordersMock
    expect(
      await getByProperty<OrderItem>('orderId', 'order1', orderItemStore)
    ).toEqual(ordersItems.slice(0, 2))
  })
  it('return list of 1 child of Order 2', async () => {
    // const orderInMemoryStore = ordersMock
    expect(
      await getByProperty<OrderItem>('orderId', 'order2', orderItemStore)
    ).toEqual(ordersItems.slice(2, 3))
  })
})

describe('getByProperty from Json Server', () => {
  const orderItemStore = JsonServerStore<OrderItem>('orderItems')
  it('return list of 2 childs of Order 1', async () => {
    expect(
      await getByProperty<OrderItem>('orderId', 'order1', orderItemStore)
    ).toEqual(ordersItems.slice(0, 2))
  })
  it('return list of 1 child of Order 2', async () => {
    expect(
      await getByProperty<OrderItem>('orderId', 'order2', orderItemStore)
    ).toEqual(ordersItems.slice(2, 3))
  })
})
