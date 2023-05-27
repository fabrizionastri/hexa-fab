import { ID } from './generic'

export type OrderItem = {
  id?: ID
  orderId: ID
  name: string
  quantity: number
  price: number
}
