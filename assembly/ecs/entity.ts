import {ComponentMap, IComponent} from './component'
import {Result} from 'as-container'

export type EntityMap = Map<u64, Entity>

export class Entity {
  constructor(
    public id: u64,
    private components: ComponentMap,
  ) { }

  addComponent(component: IComponent): Result<IComponent, string> {
    let type = component.type
    if (!this.hasComponent(type)) {
      this.components.set(type, component)
      return Result.Ok<IComponent, string>(component)
    }
    return Result.Err<IComponent, string>("Component already exists.")
  }
  deleteComponent(type: string): bool {
    return this.components.delete(type)
  }
  hasComponent(type: string): bool {
    return this.components.has(type)
  }
  getComponent(type: string): IComponent | null {
    if (this.hasComponent(type)) {
      // This crashes if they key doesn't exist
      return this.components.get(type)
    }
    return null
  }
}
