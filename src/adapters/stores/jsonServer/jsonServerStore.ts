import axios, { AxiosResponse, Method } from 'axios'
import { Store } from '../../../core/gateways/store.gateway'
import { Entity } from '../../../core/entities/store'

const myAxios = axios.create({
  baseURL: 'http://localhost:3000/',
  timeout: 1000,
})

const handleRequest =
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

export const JsonServerStore = <T extends Entity>(
  resource: string
): Store<T> => {
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
    update: async (partialEntity: Partial<T>): Promise<T | undefined> => {
      if (!('id' in partialEntity)) return undefined
      const id = partialEntity.id
      const existingEntity = await $axios.get<T>(`/${resource}/${id}`)
      const updatedEntity = Object.assign({
        ...existingEntity,
        ...partialEntity,
      })
      return await $axios.put<T>(`/${resource}/${id}`, updatedEntity)
    },
  }
}
