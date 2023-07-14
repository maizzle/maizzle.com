import mitt from 'mitt'

const emitter = mitt()

export default {
  $on: (...args) => emitter.on(...args),
  $off: (...args) => emitter.off(...args),
  $all: (...args) => emitter.all(...args),
  $emit: (...args) => emitter.emit(...args)
}
