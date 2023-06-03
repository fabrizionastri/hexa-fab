import { mockStore } from '../../../mock/db'
import { OrderItem } from '../../core/entities/orderItem'
// import { resetDb } from '../../utils/resetDb'
import { GenericStoreInMemory } from './inMemory/generic.store.inMemory'
import { OrderItemStoreInMemory1, OrderItemStoreInMemory2 } from './inMemory/orderItem.store.inMemory'

const orderItem4: OrderItem = {
  id: 'orderItem4',
  orderId: 'Order2',
  name: 'chausse pied',
  quantity: 1,
  unit: 'unit',
  price: 5,
  tax: 0.2,
}
const orderItemX: OrderItem = {
  id: '',
  orderId: 'Order3',
  name: 'semelle',
  quantity: 1,
  unit: 'unit',
  price: 10,
  tax: 0.2,
}

const orderItemStores = [
  { storeName: 'OrderItemStoreInMemory 1', orderItemStore: OrderItemStoreInMemory1 },
  { storeName: 'OrderItemStoreInMemory 2', orderItemStore: OrderItemStoreInMemory2 },
  {
    storeName: 'GenericStoreInMemory(OrderItem)',
    orderItemStore: GenericStoreInMemory<OrderItem>(mockStore.orderItems),
  },
  // { storeName: 'OrderItemStoreJsonServer', orderItemStore: OrderItemStoreJsonServer },
]
const orderItems: OrderItem[] = mockStore.orderItems

describe('OrderItemStore', () => {
  orderItemStores.forEach(({ storeName, orderItemStore }) => {
    // resetDb() // only required for JsonServer

    describe(storeName, () => {
      describe('getById', () => {
        it('return 1 orderItem for valid id', async () => {
          const result = await orderItemStore.getById('orderItem1')
          expect(result).toEqual(orderItems[1])
        })
        it('return undefined for inexistant id', async () => {
          const result = await orderItemStore.getById('inexistant')
          expect(result).toEqual(undefined)
        })
      })

      describe('getAll', () => {
        it('return all orderItems when orderItems are present', async () => {
          const result = await orderItemStore.getAll()
          expect(result).toEqual(orderItems)
        })
      })

      describe('create', () => {
        it('return orderItem with same ID when posting orderItem with ID', async () => {
          const result = await orderItemStore.create(orderItem4)
          // console.log('order4 after creation:', result)
          expect(result).toBeDefined()
          expect(result).toEqual(orderItem4)
        })

        it('return orderItem with new ID when posting orderItem without valid ID', async () => {
          const result = await orderItemStore.create(orderItemX)
          if (!result?.id) return undefined
          orderItemX.id = result.id
          // console.log('OrderItem X result from create:', result)
          // console.log('OrderItem X updated orderItem with:', orderItemX)
          expect(result).toEqual(orderItemX)
          if (orderItemX.id) await orderItemStore.deleteById(orderItemX.id)
        })
      })

      describe('update', () => {
        it('return updated orderItem when posting orderItem with valid ID ', async () => {
          const updatedValues: Partial<OrderItem> = { name: 'Chausse pied en métal' }
          orderItem4.name = updatedValues.name ?? ''
          const result = await orderItemStore.update('orderItem4', updatedValues)
          // console.log('orderItem4 updated object:', orderItem4)
          // console.log('orderItem4 updated result:', result)
          expect(result).toEqual(orderItem4)
        })

        it('return orderItem with new ID when posting orderItem without ID', async () => {
          const result = await orderItemStore.update('orderX', orderItemX)
          if (!result?.id) return undefined
          orderItemX.id = result.id
          // console.log('newOrder X result:', result)
          // console.log('newOrder X newOrder:', orderItemX)
          expect(result).toEqual(orderItemX)
          if (orderItemX.id) await orderItemStore.deleteById(orderItemX.id)
        })
      })

      describe('deleteById', () => {
        it('return orderItem when sucessfully deleting an orderItem with a valid ID', async () => {
          const result = await orderItemStore.deleteById('order4')
          expect(result).toEqual(result)
        })
      })
    })
  })
})
