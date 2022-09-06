export interface Mapper<E, D> {
  toDomain(raw: D): E;
  toDTO(t: E): D;
  toPersistence(e: Partial<E>): any;
}
