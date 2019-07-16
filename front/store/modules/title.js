const title = {
    state: {
        titleList: []
    },
    mutations: {
        setTitleList(state, list){
            state.titleList = list
        }
    },
    actions: {
        async getCurTitles({ commit }, route) {
            const curType = route.params.type
            const titles = await this._vm.api({
                method: 'get',
                url: 'http://47.105.168.226:8081/getTitles?type=' + curType
            })
            commit('setTitleList', titles.data)
        }
    }
}
export default title