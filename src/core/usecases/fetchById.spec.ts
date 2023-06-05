import { mockStore } from '~/mock/db'
import { orderStoreInMemory3 } from '~/src/adapters/stores/order.store'

import { Order } from '../entities/order'
import { orderGateway3 } from '../gateways/order.gateway'
import { fetchOrderById } from './fetchById'

const orders: Order[] = [...mockStore.orders]

describe('Usecase: orderById', () => {
  it('orderById should return the correct order', () => {
    const gateway = orderGateway3(orderStoreInMemory3())
    const useCase = fetchOrderById(gateway)
    const result = useCase('order1')
    expect(result).toEqual(orders[1])
  })

  it('orderById should return undefined for a non-existent order', () => {
    const gateway = orderGateway3(orderStoreInMemory3())
    const useCase = fetchOrderById(gateway)
    const result = useCase('nonExistentOrder')
    expect(result).toBeUndefined()
  })
})
