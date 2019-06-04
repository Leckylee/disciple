import { observable, computed, action } from "mobx"
import { StoreModule } from "@/utils/mobx-store"

class ModuleTest extends StoreModule {
    @observable
    state = {
        firstName: "",
        lastName: ""
    }

    @computed
    get fullName() {
        const { firstName, lastName } = this.state
        const cutting = firstName && lastName ? " - " : ""
        return firstName + cutting + lastName
    }

    @action
    onNameChange = (key, value) => {
        this.setState({ [key]: value })
    }
}

export default ModuleTest
