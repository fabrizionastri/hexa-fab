import axios, { AxiosResponse, Method } from 'axios'
import { ID, Store } from '../../core/entities/generic'

const $axios = axios.create({
  baseURL: 'http://localhost:3000/',
  timeout: 1000,
})

interface AxiosRequestConfigCustom {
  url: string
  method: Method
  entity?: any
}

const handleAxiosRequest =
  <T>(
    axiosMethod: (
      config: AxiosRequestConfigCustom
    ) => Promise<AxiosResponse<any>>,
    httpMethod: Method,
    defaultValue: T
  ) =>
  async (url: string, entity?: any): Promise<T> => {
    try {
      const response = await axiosMethod({ url, method: httpMethod, entity })
      return response.data
    } catch (error) {
      // console.error(error)
      return defaultValue
    }
  }

const $get = <T>(defaultValue: T) =>
  handleAxiosRequest<T>($axios.request, 'get', defaultValue)

const $post = <T>(defaultValue: T) =>
  handleAxiosRequest<T>($axios.request, 'post', defaultValue)

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
  }
}
