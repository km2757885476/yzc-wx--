//引入koa
const Koa = require('koa')
// 引入koa-router
const Router = require('koa-router')
// 实例化koa
const app = new Koa()
// 实例化koa-router
const router = new Router()
// 设置请求地址及返回和数据
router.get('/',(ctx,next)=>{
    ctx.body={
        code:200,
        name:"小甜甜"
    }
})
const indexData = require('./config.json');

router.get('/getIndexData',(ctx,next)=>{
    ctx.body={
        code:200,
        indexData
    }
})

// 使用所有的路由及相关的方法
app.use(router.routes()).use(router.allowedMethods())
// 监听端口，启动服务器
app.listen('3333',(err)=>{
    if(err){
        console.log("服务器启动失败",err)
        return
    }
    console.log('服务器启动成功地址为：http://localhost:3333')
})