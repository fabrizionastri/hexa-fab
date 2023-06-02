import axios, { AxiosResponse, Method } from 'axios'
import { OrderGateway } from '../../../core/gateways/order.gateway'
import { Order } from '../../../core/entities/order'

const myAxios = axios.create({
  baseURL: 'http://localhost:3057/',
  timeout: 1000,
})

const handleRequest =
  (httpMethod: Method) =>
  async <Order>(url: string, data?: any): Promise<Order | undefined> => {
    try {
      const response: AxiosResponse = await myAxios.request({
        url,
        method: httpMethod,
        data,
      })
      return response.data
    } catch (error) {
      // console.error(error)
      return undefined
    }
  }

const $axios = {
  get: handleRequest('get'),
  post: handleRequest('post'),
  delete: handleRequest('delete'),
  put: handleRequest('put'),
}

export const OrderStoreJsonServer: OrderGateway = {
  getById: async (id: string): Promise<Order | undefined> => {
    return $axios.get<Order>(`/orders/${id}`)
  },
  getAll: async (): Promise<Order[] | undefined> => {
    return $axios.get<Order[]>('/orders')
  },
  create: async (entity: Order): Promise<Order | undefined> => {
    return await $axios.post<Order>('/orders', entity)
  },
  deleteById: async (id: string): Promise<Order | undefined> => {
    return await $axios.delete<Order>(`/orders/${id}`)
  },
  update: async (id: string, partialEntity: Partial<Order>): Promise<Order | undefined> => {
    const existingEntity = await $axios.get<Order>(`/orders/${id}`)
    const updatedEntity = Object.assign({
      ...existingEntity,
      ...partialEntity,
    })
    return await $axios.put<Order>(`/orders/${id}`, updatedEntity)
  },
  getByProperty() {
    throw new Error('Method not implemented.')
  },
  getForAccount: async (accountId: string): Promise<Order[] | undefined> => {
    return $axios.get<Order[]>(`/orders?clientId=${accountId}`)
  },
}
