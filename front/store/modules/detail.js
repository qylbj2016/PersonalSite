const detail = {
    state : {
        article: {}
    },
    mutations: {
        initArticle(state, article) {
            state.article = article
        }
    },
    actions: {
        async getArticle({ commit }, route) {
            const blogId = route.params.id
            const res = await this._vm.api({
                method: 'GET',
                url: 'http://47.105.168.226:8081/getBlogs?id=' + blogId
            })
            commit('initArticle', res.data[0])
        }
    }
}

export default detail