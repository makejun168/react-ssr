// 纯前端相关的 交互逻辑
import {
  observable, computed, action, autorun,
} from 'mobx';

// 一个 store 一个 事例
export class AppState {
	@observable count = 0

	@observable name = 'Poloma'

	@computed get msg() {
	  return `${this.name} say count is ${this.count}`
	}

	@action add() {
	  this.count += 1
	}
}

const appState = new AppState()

autorun(() => {
  console.log(appState.msg)
})

setInterval(() => {
  appState.count += 1
}, 1000)

export default appState
