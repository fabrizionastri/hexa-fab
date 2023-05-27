export type ID = string

export type Store<T> = {
  get: (id: ID) => Promise<T | undefined>
  getAll: () => Promise<T[] | undefined>
  post: (entity: T) => Promise<T | undefined>
  delete: (id: ID) => Promise<void>
  put: (entity: T) => Promise<T | undefined>
}
