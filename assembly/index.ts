import "wasi"

import {Console} from 'as-wasi'

import {IComponent} from './ecs/component'
import {EntityMap} from './ecs/entity'
import {ISystem} from './ecs/system'
import { World } from "./world"

Console.log("Starting")
let world = new World()

// Fake component
class BossDamageComponent implements IComponent {
  get type(): string {
    return 'BossDamageComponent'
  }
  constructor(
    public damage: i32 = 5,
  ) { }
}
class BossHealthComponent implements IComponent {
  get type(): string {
    return 'BossHealthComponent'
  }
  constructor(
    public health: i32 = 35,
  ) { }
}

// Fake system
class BossSystem extends ISystem {
  public id(): string {
    return 'BossSystem'
  }
  public update(entities: EntityMap): void {
    // Sum up all the boss damage
    let totalDmg: u32 = 0
    for (let id = 0; id < entities.keys().length; ++id) {
      let e = entities.get(id)
      if (e.hasComponent('BossDamageComponent')) {
        let c = e.getComponent('BossDamageComponent') as BossDamageComponent
        let dmg = c.damage
        Console.log(`Entity ${id} adds ${dmg} dmg`)
        totalDmg += dmg
      }
    }
    Console.log(`Found a total of ${totalDmg} boss damage`)
    // Damage the boss
    for (let id = 0; id < entities.keys().length; ++id) {
      let e = entities.get(id)
      if (e.hasComponent('BossHealthComponent')) {
        let c = e.getComponent('BossHealthComponent') as BossHealthComponent
        let origHealth = c.health
        let newHealth = origHealth - totalDmg
        c.health = max(0, newHealth)
        Console.log(`Boss (id: ${id}) hp ${origHealth} - ${totalDmg} = ${c.health}`)
      }
    }
  }
}
world.registerSystem(new BossSystem())

// Fake entities
let heroComponents = new Map<string, IComponent>()
heroComponents.set('BossDamageComponent', new BossDamageComponent())
world.registerEntity(heroComponents)
world.registerEntity(heroComponents)

let bossComponents = new Map<string, IComponent>()
bossComponents.set('BossHealthComponent', new BossHealthComponent(35))
world.registerEntity(bossComponents)
bossComponents = new Map<string, IComponent>()
bossComponents.set('BossHealthComponent', new BossHealthComponent(45))
world.registerEntity(bossComponents)

world.advance()
world.advance()
world.advance()
world.advance()
world.advance()
