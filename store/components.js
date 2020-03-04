
export const state = () => ({
  components: {},
})

export const mutations = {
  ADD_COMPONENT(state, component) {
    state.components[component.name] = component
  },
  SET_COMPONENTS(state, components) {
    state.components = components
  }
}


export const actions = {
  addComponent({ commit }, component) {
    commit('ADD_COMPONENT', component)
  },
  setComponents({ commit }, components) {
    commit('SET_COMPONENTS', components)
  }
}

export const getters = {
  components(state) { return state.components },
  componentNameFromPath() {
    return router => router.currentRoute.path.split('/docs/').pop()
  },
  findComponentByPath(state, getters) {
    return router => {
      for (const component of Object.values(state.components)) {
        if (component.path === getters.componentNameFromPath(router)) { return component }
      }
    }
  }
}
