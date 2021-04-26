# WASM Roguelike Engine

A bare-bones [entity component system](https://en.wikipedia.org/wiki/Entity_component_system) for AssemblyScript / WASM.

## How to run

[Install wasmtime](https://wasmtime.dev/) (or another WASM runtime) first.

```sh
npm install
npm run asbuild:untouched && npm run wasmtime:untouched
```

## Code Layout

* [`assembly/`](assembly/) -- AssemblyScript code lives in here
  * [`ecs/`](assembly/ecs) -- ECS core
  * [`world.ts`](assembly/world.ts) -- Demo: Wiring ECS into a game state object
  * [`index.ts`](assembly/index.ts) -- Demo: entrypoint, demo components/system, tick the game state a few times

## Built With

* [AssemblyScript](https://www.assemblyscript.org/) (TypeScript subset -> WASM)
  * [as-container](https://www.npmjs.com/package/as-container) (Result type)
  * [as-wasi](https://github.com/jedisct1/as-wasi) (Console stub)
