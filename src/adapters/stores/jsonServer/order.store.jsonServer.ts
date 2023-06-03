import axios, { AxiosResponse, Method } from 'axios'

import { Order } from '../../../core/entities/order'
import { OrderGateway1 } from '../../../core/gateways/order.gateway'

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

export const OrderStoreJsonServer1: OrderGateway1 = {
  getById: async (id: string): Promise<Order | undefined> => {
    return $axios.get<Order>(`/orders/${id}`)
  },
  getAll: async (): Promise<Order[] | undefined> => {
    return $axios.get<Order[]>('/orders')
  },
  create: async (entity: Order): Promise<Order | undefined> => {
    // if entity has an id but this id already exists in the Json Server, return undefined and log error
    if (entity.id) {
      const existingEntity = await $axios.get<Order>(`/orders/${entity.id}`)
      if (existingEntity) {
        console.error(`Entity with id ${entity.id} already exists`)
        return undefined
      }
    }
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
