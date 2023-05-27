import axios, { AxiosResponse, Method } from 'axios'
import { ID, Store } from '../../core/entities/generic'

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
}

export const JsonServerStore = <T>(resource: string): Store<T> => {
  return {
    get: async (id: ID): Promise<T | undefined> => {
      return $axios.get<T>(`/${resource}/${id}`)
    },
    getAll: async (): Promise<T[] | undefined> => {
      return $axios.get<T[]>(`/${resource}`)
    },
    post: async (entity: T): Promise<T | undefined> => {
      return await $axios.post<T>(`/${resource}`, entity)
    },
    delete: async (id: ID): Promise<void> => {
      return await $axios.delete<void>(`/${resource}/${id}`)
    },
  }
}
