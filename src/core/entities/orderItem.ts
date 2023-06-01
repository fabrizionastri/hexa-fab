export interface OrderItem {
  id: string
  orderId: string
  name: string
  unit: string
  quantity: number
  price: number
  tax: number
  withoutTaxAmount?: number
  withTaxAmount?: number
  taxAmount?: number
}
