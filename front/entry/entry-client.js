import Vue from 'vue'
import createApp from '../src/main'

Vue.mixin({
    async beforeRouteUpdate(to, from, next) {
        const { asyncData } = this.$options
        if (asyncData !== undefined) {
            try {
                await asyncData({
                    store: this.$store,
                    route: to
                })
            } catch (e) {
                console.log(e)
            }
        }
        next()
    }
})

const { app, router, store } = createApp()

router.onReady(async () => {
    await router.beforeResolve((to, from, next) => {
        const matched = router.getMatchedComponents(to)
        const preMatched = router.getMatchedComponents(from)
        let diffed = false
        const activated = matched.filter((c, i) => {
            return diffed || (diffed = (preMatched[i] !== c))
        })
        if (!activated.length) {
            return next()
        }
        activated.forEach(async Component => {
            if (Component.asyncData) {
                try {
                    await Component.asyncData({
                        store,
                        route: to
                    })
                } catch (e) {
                    console.log(e)
                }
            }
        })
        next()
    })  
    app.$mount('#app')
})