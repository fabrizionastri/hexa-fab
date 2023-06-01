import { OrderItem } from './orderItem'

// Question: should we have the calculate properites as optional, functions, or a separate object "OderCalculation"
// Question: should we store order items in order or order it in items ?
// Question: should we store them as ids or as objects ?

export interface Order {
  id: string
  clientId: string
  supplierId: string
  name: string
  orderItems: OrderItem[]
  principal?: number
  withoutTaxAmount?: number
  withTaxAmount?: number
  taxAmount?: number
}
