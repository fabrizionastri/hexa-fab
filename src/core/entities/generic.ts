export type ID = string

export type Store<T> = {
  get: (id: ID) => Promise<T | undefined>
  getAll: () => Promise<T[]>
  post: (entity: T) => Promise<ID>
}
