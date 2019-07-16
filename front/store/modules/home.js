const home = {
    state: {
        articleList: []
    },
    mutations: {
        initLikeBlogs(state, blogs) {
            state.articleList = blogs
        }
    },
    actions: {
        async getLikeBlogs({ commit }) {
            const blogs = await this._vm.api({
                url: 'http://47.105.168.226:8081/getLikeBlogs',
                method: 'GET'
            })
            commit("initLikeBlogs", blogs.data)
        }
    }
}

export default home