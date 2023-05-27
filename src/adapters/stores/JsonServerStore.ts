import axios, { AxiosResponse, Method } from 'axios'
import { ID, Store } from '../../core/entities/generic'

const myAxios = axios.create({
  baseURL: 'http://localhost:3000/',
  timeout: 1000,
})

interface AxiosRequestConfigCustom {
  url: string
  method: Method
  data?: any
}

const $axios =
  <T>(
    axiosMethod: (
      config: AxiosRequestConfigCustom
    ) => Promise<AxiosResponse<any>>,
    httpMethod: Method,
    defaultValue: T
  ) =>
  async (url: string, data?: any): Promise<T> => {
    try {
      const response = await axiosMethod({ url, method: httpMethod, data })
      return response.data
    } catch (error) {
      // console.error(error)
      return defaultValue
    }
  }

const $get = <T>(defaultValue: T) =>
  $axios<T>(myAxios.request, 'get', defaultValue)

const $post = <T>(defaultValue: T) =>
  $axios<T>(myAxios.request, 'post', defaultValue)

const $delete = <T>(defaultValue: T) =>
  $axios<T>(myAxios.request, 'delete', defaultValue)

export const JsonServerStore = <T>(resource: string): Store<T> => {
  return {
    get: async (id: ID): Promise<T | undefined> => {
      return $get<T | undefined>(undefined)(`/${resource}/${id}`)
    },
    getAll: async (): Promise<T[]> => {
      return $get<T[]>([])(`/${resource}`)
    },
    post: async (entity: T): Promise<string> => {
      const response = await $post<string>('')(`/${resource}`, entity)
      return response
    },
    delete: async (id: ID): Promise<void> => {
      return await $delete<void>(undefined)(`/${resource}/${id}`)
    },
  }
}
