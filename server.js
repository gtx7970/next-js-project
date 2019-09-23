/**
 * custom server use koa  https://nextjs.org/docs#custom-configuration
 */
const Koa = require('koa')
const Router = require('koa-router')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
app.prepare()
  .then(() => {
    const sevrer = new Koa()
    sevrer.use(async (ctx, next) => {
      // nodejs http request, respone object
      await handle(ctx.req, ctx.res)
      ctx.body = `<span>hello</span>`
      ctx.respond = false
      await next()
    })

    sevrer.listen(3000, () => console.log('server start at port 3000'))
  })
