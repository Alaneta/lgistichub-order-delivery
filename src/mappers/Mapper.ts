export interface Mapper<T> {
  toDomain(raw): T

  toDTO(t: T)

  toPersistence(t: T)
}
