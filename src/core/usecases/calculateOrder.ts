import { orderItemStore } from '../../adapters/stores/stores'
import { Order } from '../entities/order'
import { OrderItem } from '../entities/orderItem'
import { calculateOrderItem } from './calculateOrderItem'
import { getByProperty } from './getByProperty'

export const withoutTaxAmount = (orderItems: OrderItem[]): number => {
  return orderItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
}

export const withTaxAmount = (orderItems: OrderItem[]): number => {
  return orderItems.reduce((acc, item) => acc + item.price * item.quantity * (1 + item.tax), 0)
}

export const taxAmount = (orderItems: OrderItem[]): number => {
  return orderItems.reduce((acc, item) => acc + item.price * item.quantity * item.tax, 0)
}

export const calculateOrder = async (order: Order): Promise<Order> => {
  let orderItems = await getByProperty<OrderItem>('orderId', order.id, orderItemStore)
  // for each orderItem, calculateOrderItem and update the orderItem
  orderItems = orderItems.map((item) => calculateOrderItem(item))

  return {
    ...order,
    orderItems,
    withoutTaxAmount: withoutTaxAmount(orderItems),
    withTaxAmount: withTaxAmount(orderItems),
    taxAmount: taxAmount(orderItems),
  }
}
