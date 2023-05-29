import { orderGateway } from '../gateways/order.gateway'

export const getAllOrdersWithItems = () => {
  return orderGateway()
}
