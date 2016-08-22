import { POP_ROUTE, PUSH_ROUTE, CHANGE_TAB } from './actionTypes'

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

function changeTab(index) {
  return {
    type: CHANGE_TAB,
    index
  }
}

export {
    push,
    pop,
    changeTab
}