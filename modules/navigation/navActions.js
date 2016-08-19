import { POP_ROUTE, PUSH_ROUTE } from './actionTypes'

function push(route) {
  return {
    type: PUSH_ROUTE,
    route
  }
}

function pop() {
  return {
    type: POP_ROUTE
  }
}

export {
    push,
    pop
}