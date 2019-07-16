import createApp from '../src/main'
import commonComponent from '../src/components/public/left-boxes'

export default  context => new Promise( resolve => {
    const { app, store, router } = createApp()
    router.push(context.url)
    router.onReady( async () => {
        const matchedComponents = router.getMatchedComponents()  //匹配路由组件
        matchedComponents.push(commonComponent)      // 加入非路由组建
        const len = matchedComponents.length
        for(let i = 0 ; i < len ; i ++){
            let Component = matchedComponents[i]
            if (Component.asyncData) {
                try {
                    await Component.asyncData({
                        store,
                        route: router.currentRoute
                    })
                } catch (e) {
                    console.log(e)
                }
            }
        }
        context.state = store.state
        resolve( app )
    })
})