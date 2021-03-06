import { observable, action, runInAction } from 'mobx'

import UiStore from '../../../store/UiStore'

export class Store {
  @observable counter

  constructor(initialCounter = 0) {
    // Cannot decorate with @action constructors and observables can only be
    //  modified in actions (useStrict(true))
    runInAction(() => {
      this.counter = initialCounter
    })
  }

  @action
  increment = (value = 1) => {
    this.counter = this.counter + value
  }

  @action
  doubleAsync = () =>
     new Promise((resolve) => {
       UiStore.startRequest()
       setTimeout(() => {
         this.increment(this.counter)
         UiStore.endRequest()
         resolve()
       }, 500)
     })

}

const CounterStore = new Store()

export default CounterStore
