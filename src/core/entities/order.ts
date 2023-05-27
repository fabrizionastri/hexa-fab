import { ID } from './generic'

export type Order = {
  id: ID
  name: string
}

export type OrderStore = {
  get: (id: ID) => Promise<Order | undefined>
  getAll: () => Promise<Order[]>
}
