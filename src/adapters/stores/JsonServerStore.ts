import axios, { AxiosResponse, Method } from 'axios'
import { ID, Store } from '../../core/entities/generic'
import { Order, OrderStore } from '../../core/entities/order'

const $axios = axios.create({
  baseURL: 'http://localhost:3000/',
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
      // console.error(error)
      return defaultValue
    }
  }

const $get = <T>(defaultValue: T) =>
  handleAxiosRequest<T>($axios.request, 'get', defaultValue)

// export const JsonServerOrderStore: OrderStore = {
//   get: async (id: ID): Promise<Order | undefined> => {
//     return $get<Order | undefined>(undefined)(`/orders/${id}`)
//   },

//   getAll: async (): Promise<Order[]> => {
//     return $get<Order[]>([])(`/orders/`)
//   },
// }

export const JsonServerStore = <T>(resource: string): Store<T> => {
  return {
    get: async (id: ID): Promise<T | undefined> => {
      return $get<T | undefined>(undefined)(`/${resource}/${id}`)
    },

    getAll: async (): Promise<T[]> => {
      return $get<T[]>([])(`/${resource}`)
    },
  }
}

// const $post = <T>(defaultValue: T) =>
//   handleAxiosRequest<T>($axios.request, 'post', defaultValue)

// post: async (entity: T): Promise<boolean> => {
//   return $post<T | undefined>(undefined)(`/${resource}`)
// },
