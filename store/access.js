export const state = () => ({
  originToken: null
})

export const mutations = {
  setOriginToken(state, originToken) {
    state.originToken = originToken
  }
}

export const actions = {
  setOriginToken(context, originToken) {
    context.commit('setOriginToken', originToken)
  }
}
