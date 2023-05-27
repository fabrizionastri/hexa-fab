export type Store<T> = {
  get: (id: string) => Promise<T | undefined>
  getAll: () => Promise<T[] | undefined>
  post: (entity: T) => Promise<T | undefined>
  delete: (id: string) => Promise<void>
  put: (entity: T) => Promise<T | undefined>
}
