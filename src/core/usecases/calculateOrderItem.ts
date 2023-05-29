import { OrderItem } from '../entities/orderItem'

export const withoutTaxAmount = (orderItem: OrderItem): number => {
  return orderItem.price * orderItem.quantity
}

export const withTaxAmount = (orderItem: OrderItem): number => {
  return orderItem.price * orderItem.quantity * (1 + orderItem.tax)
}

export const taxAmount = (orderItem: OrderItem): number => {
  return orderItem.price * orderItem.quantity * orderItem.tax
}

export const calculateOrderItem = (orderItem: OrderItem): OrderItem => {
  return {
    ...orderItem,
    withoutTaxAmount: withoutTaxAmount(orderItem),
    withTaxAmount: withTaxAmount(orderItem),
    taxAmount: taxAmount(orderItem),
  }
}
