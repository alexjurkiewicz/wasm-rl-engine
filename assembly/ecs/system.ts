import {Entity, EntityMap} from './entity'

export abstract class ISystem {
  public abstract id(): string
  public abstract update(entities: EntityMap): void
}
