const common = {
    state: {
        tags: [],
        titleList: [],
    },
    mutations: {
        initTags(state, tags) {
            state.tags = tags
        },
        initHotTitles(state, list) {
            state.titleList = list
        }
    },
    actions: {
        async getInitData({ commit }) {
            const tags = await this._vm.api({
                url: 'http://47.105.168.226:8081/getTags',
                method: 'GET'
            })
            const titles = await this._vm.api({
                url: 'http://47.105.168.226:8081/getHotTitles',
                method: 'GET'
            })
            commit("initTags", tags.data)
            commit("initHotTitles", titles.data)
        }
    }
}

export default common