const Koa = require('koa');
const path = require('path');
const serve = require('koa-static');
const app = new Koa();


const home = serve(path.join(__dirname) + '/dist/', {
    gzip: true,
});

app.use(async (ctx, next) => {
    console.log(new Date(), ctx.request.url);
    await next();
})

app.use(home);
app.listen(7878);
console.log('server is running at http://localhost:7878');