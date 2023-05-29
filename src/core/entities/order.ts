import { OrderItem } from './orderItem'

export type Order = {
  id: string
  name: string
  orderItems?: OrderItem[]
  principal?: number
  withoutTaxAmount?: number
  withTaxAmount?: number
  taxAmount?: number
}
