import { OrderItem } from './orderItem'

export type Order = {
  id: string
  name: string
  orderItems?: OrderItem[]
  principal?: number
}

export const withoutTaxAmount = (items: OrderItem[]): number => {
  return items.reduce((acc, item) => acc + item.price * item.quantity, 0)
}

export const withTaxAmount = (items: OrderItem[]): number => {
  return items.reduce(
    (acc, item) => acc + item.price * item.quantity * (1 + item.tax),
    0
  )
}

export const taxAmount = (items: OrderItem[]): number => {
  return items.reduce(
    (acc, item) => acc + item.price * item.quantity * item.tax,
    0
  )
}
