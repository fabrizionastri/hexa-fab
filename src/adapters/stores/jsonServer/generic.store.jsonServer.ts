import axios, { AxiosResponse, Method } from 'axios'

import { GenericGateway } from '../../../core/gateways/generic.gateway'

export const myAxios = axios.create({
  baseURL: 'http://localhost:3057/',
  timeout: 1000,
})

export const handleRequest =
  (httpMethod: Method) =>
  async <T>(url: string, data?: any): Promise<T | undefined> => {
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

export const JsonServerStore = <T extends { id: string }>(resource: string): GenericGateway<T> => {
  return {
    getById: async (id: string): Promise<T | undefined> => {
      return $axios.get<T>(`/${resource}/${id}`)
    },
    getAll: async (): Promise<T[] | undefined> => {
      return $axios.get<T[]>(`/${resource}`)
    },
    create: async (entity: T): Promise<T | undefined> => {
      return await $axios.post<T>(`/${resource}`, entity)
    },
    deleteById: async (id: string): Promise<T | undefined> => {
      return await $axios.delete<T>(`/${resource}/${id}`)
    },
    update: async (id: string, partialEntity: Partial<T>): Promise<T | undefined> => {
      const existingEntity = await $axios.get<T>(`/${resource}/${id}`)
      const updatedEntity = Object.assign({
        ...existingEntity,
        ...partialEntity,
      })
      return await $axios.put<T>(`/${resource}/${id}`, updatedEntity)
    },
    getByProperty: async (property: keyof T, value: any): Promise<T[] | undefined> => {
      return $axios.get<T[]>(`/${resource}?${String(String(property))}=${value}`)
    },
    // getForAccount: async (accountId: string): Promise<T[] | undefined> => {
    //   return $axios.get<T[]>(`/${resource}?clientId=${accountId}&supplierId=${accountId}`)
    // },
  }
}
