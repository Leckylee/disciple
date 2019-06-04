/**
 * @name Store
 * @desc store 构造器
 * @author daecrand
 * @version 2018-08-07
 */

import { action, configure } from "mobx"

configure({ enforceActions: "observed" })

class Store {
    constructor(modules) {
        Object.keys(modules).forEach(moduleName => {
            this[moduleName] = new modules[moduleName]({
                getStore: this.getStore.bind(this),
                rootState: this.rootState
            })
        })
    }

    rootState = {}

    getStore(moduleName) {
        if (moduleName) {
            return this[moduleName] ? this[moduleName] : console.error(new Error(`has no store named "${moduleName}"`))
        } else {
            return this
        }
    }
}

let $getStore = null
let $rootState = null
class StoreModule {
    constructor({ getStore, rootState }) {
        $getStore = getStore
        $rootState = rootState
    }

    getStore(name) {
        return $getStore(name)
    }

    getRootState() {
        return $rootState
    }

    setState(arg) {
        if (!arg) {
            return
        }

        let newState = null

        if (typeof arg === "object") {
            newState = arg
        } else if (typeof arg === "function") {
            const res = arg(this.state)
            if (res !== null && typeof res === "object") {
                newState = res
            }
        }

        if (!newState) {
            return
        }
        action(state => {
            for (const key in state) {
                this.state[key] = state[key]
            }
        })(newState)
    }
}

export { Store, StoreModule }
