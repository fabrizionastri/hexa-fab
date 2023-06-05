export const fetchOrderById = (gateway: any) => (orderId: string) => {
  return gateway.getById(orderId)
}
