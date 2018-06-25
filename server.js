/* eslint-disable no-console */
const Koa = require('koa');
const Router = require('koa-router');
const koaStatic = require('koa-static');
const cors = require('@koa/cors');
const enforceHttps = require('koa-sslify');
const axios = require('axios');

const app = new Koa();
const router = new Router();

/* global process */
const port = process.env.PORT || 3001;

router.get('/api/proxy', async ctx => {
	const { authorization } = ctx.request.headers;
	const { _proxyTo, ...params } = ctx.query;

	console.log(`${_proxyTo} :: ${JSON.stringify(params)}`);

	try {
		let r = await axios.get(_proxyTo, {
			params,
			headers: { Authorization: authorization },
		});
		ctx.body = r.data;
	} catch (e) {
		ctx.status = e.response.status;
		ctx.body = e.response.data;
	}
});

if (process.env.NODE_ENV === 'production') {
	// Force HTTPS on all page
	app.use(
		enforceHttps({
			trustProtoHeader: true,
		})
	);
}
app.use(cors());
app.use(router.routes());
app.use(router.allowedMethods());
app.use(koaStatic('build'));
app.listen(port);
console.log(`Listening on ${port}`);
