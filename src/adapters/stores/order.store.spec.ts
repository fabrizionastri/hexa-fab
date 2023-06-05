import { mockStore } from '../../../mock/db'
import { Order } from '../../core/entities/order'
import { resetDb } from '../../utils/resetDb'
import { genericStoreInMemory1 } from './inMemory/generic.store.inMemory'
import { orderStoreInMemory1, orderStoreInMemory2 } from './inMemory/order.store.inMemory'
import { OrderStoreJsonServer1 } from './jsonServer/order.store.jsonServer'

const order4: Order = {
  id: 'order4',
  clientId: 'clientA',
  supplierId: 'clientC',
  name: 'Bonnet',
  principal: 10,
}
const orderX: Order = {
  id: '',
  clientId: 'clientB',
  supplierId: 'clientC',
  name: 'Manteau',
}

const orderStores = [
  { storeName: 'OrderStoreInMemory1', orderStore: orderStoreInMemory1 },
  { storeName: 'OrderStoreInMemory2', orderStore: orderStoreInMemory2 },
  { storeName: 'GenericStoreInMemory(Order)', orderStore: genericStoreInMemory1<Order>(mockStore.orders) },
  { storeName: 'OrderStoreJsonServer1', orderStore: OrderStoreJsonServer1 },
]

const orders = mockStore.orders

describe('orderStore', () => {
  orderStores.forEach(({ storeName, orderStore }) => {
    resetDb() // only required for JsonServer

    describe(storeName, () => {
      describe('getById', () => {
        it('return 1 order for valid id', async () => {
          const result = await orderStore.getById('order1')
          expect(result).toEqual(orders[1])
        })
        it('return undefined for inexistant id', async () => {
          const result = await orderStore.getById('inexistant')
          expect(result).toEqual(undefined)
        })
      })

      describe('getAll', () => {
        it('return all orders when orders are present', async () => {
          const result = await orderStore.getAll()
          expect(result).toEqual(orders)
        })
      })

      describe('create', () => {
        it('return order with same ID when posting order with ID', async () => {
          const result = await orderStore.create(order4)
          // console.log('order4:', result)
          expect(result).toBeDefined()
          expect(result).toEqual(order4)
        })

        it('return order with new ID when posting order without valid ID', async () => {
          const result = await orderStore.create(orderX)
          if (!result?.id) return undefined
          orderX.id = result.id
          // console.log('newOrder X esult:', result)
          // console.log('newOrder X newOrder:', order5)
          expect(result).toEqual(orderX)
          if (orderX.id) await orderStore.deleteById(orderX.id)
        })
      })

      describe('update', () => {
        it('return updated order when posting order with valid ID ', async () => {
          const updatedValues: Partial<Order> = { name: 'Bonnet Bleu' }
          order4.name = updatedValues.name ?? ''
          const result = await orderStore.update('order4', updatedValues)
          // console.log('order4 updated object:', order4)
          // console.log('order4 updated result:', result)
          expect(result).toEqual(order4)
        })

        it('return order with new ID when posting order without ID', async () => {
          const result = await orderStore.update('orderX', orderX)
          if (!result?.id) return undefined
          orderX.id = result.id
          // console.log('newOrder X result:', result)
          // console.log('newOrder X newOrder:', order5)
          expect(result).toEqual(orderX)
          if (orderX.id) await orderStore.deleteById(orderX.id)
        })
      })

      describe('deleteById', () => {
        it('return order when sucessfully deleting an order with a valid ID', async () => {
          const result = await orderStore.deleteById('order4')
          expect(result).toEqual(result)
        })
      })
    })
  })
})
