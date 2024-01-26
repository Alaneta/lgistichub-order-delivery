export interface Repository<T> {
  save(t: T): Promise<T>

  update(t: T): Promise<T>

  delete(t: T): Promise<number>
}
