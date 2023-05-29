export type OrderItem = {
  id: string
  orderId: string
  name: string
  unit: string
  quantity: number
  price: number
  tax: number
}

export const withoutTaxAmount = (item: OrderItem): number => {
  return item.price * item.quantity
}

export const withTaxAmount = (item: OrderItem): number => {
  return item.price * item.quantity * (1 + item.tax)
}

export const taxAmount = (item: OrderItem): number => {
  return item.price * item.quantity * item.tax
}

export const calculateOrderItems = (item: OrderItem): any => {
  return {
    ...item,
    withoutTaxAmount: withoutTaxAmount(item),
    withTaxAmount: withTaxAmount(item),
    taxAmount: taxAmount(item),
  }
}
