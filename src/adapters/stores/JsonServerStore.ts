import axios, { AxiosResponse, Method } from 'axios'
import { Order } from '../../core/entities/order'
import { OrderStore } from '../../core/entities/order'
import { ID, Store } from '../../core/entities/generic'

const $axios = axios.create({
  baseURL: 'http://localhost:3000/orders',
  timeout: 1000,
})

interface AxiosRequestConfigCustom {
  url: string
  method: Method
}

const handleAxiosRequest =
  <T>(
    axiosMethod: (
      config: AxiosRequestConfigCustom
    ) => Promise<AxiosResponse<any>>,
    httpMethod: Method,
    defaultValue: T
  ) =>
  async (url: string): Promise<T> => {
    try {
      const response = await axiosMethod({ url, method: httpMethod })
      return response.data
    } catch (error) {
      console.error(error)
      return defaultValue
    }
  }

const $get = <T>(defaultValue: T) =>
  handleAxiosRequest<T>($axios.request, 'get', defaultValue)

export const JsonServerStore = <T>(): Store<T> => {
  return {
    get: async (id: ID): Promise<T | undefined> => {
      return $get<T | undefined>(undefined)(`/${id}`)
    },

    getAll: async (): Promise<T[]> => {
      return $get<T[]>([])(`/`)
    },
  }
}
