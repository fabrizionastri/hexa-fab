export type Store<T> = {
  getById: (id: string) => Promise<T | undefined>
  getAll: () => Promise<T[] | undefined>
  post: (entity: T) => Promise<T | undefined>
  deleteById: (id: string) => Promise<void>
  create: (entity: T) => Promise<T | undefined>
}

// if and orderItem is a strin (an id) then we need to fetch it from the database using OrderItemStore.getById(id) and assign it to the OrderItem property
type IdOrObject<T> = string | T

export const populateProperty = async <T>(
  property: IdOrObject<T>[],
  getById: (id: string) => Promise<T | undefined>
): Promise<IdOrObject<T>[]> => {
  const populatedProperty = await Promise.all(
    property.map(async (item) => {
      if (typeof item === 'string') {
        const object = await getById(item)
        return object || item
      } else {
        return item
      }
    })
  )

  return populatedProperty
}
