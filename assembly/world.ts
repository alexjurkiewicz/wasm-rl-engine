import { Console } from "as-wasi"

import { ComponentMap } from "./ecs/component"
import { EntityMap, Entity } from "./ecs/entity"
import { ISystem } from "./ecs/system"

export class World {
  private _tick: u64 = 0
  get tick(): u64 {
    return this._tick
  }

  private entities: EntityMap = new Map<u64, Entity>()
  private nextEntityId: u64 = 0
  registerEntity(components: ComponentMap): u64 {
    let id = this.nextEntityId++
    this.entities.set(id, new Entity(id, components))
    return id
  }

  private systems: ISystem[] = []
  registerSystem(system: ISystem): void {
    this.systems.push(system)
  }

  public advance(): void {
    this._tick++
    Console.log(`Tick ${this._tick}`)
    for (let i = 0; i < this.systems.length; ++i) {
      let system = this.systems[i]
      Console.log(`Running ${system.id()}`)
      system.update(this.entities)
    }
    Console.log('')
  }
}
