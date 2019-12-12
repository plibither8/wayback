const fastify = require('fastify')()
const fetch = require('node-fetch')

fastify.register(require('fastify-url-data'))

fastify.get('/*', async (req, reply) => {
	const { path } = req.urlData()
	const url = 'http://' + decodeURIComponent(path).substring(1)

})

fastify.listen(process.env.PORT || 3000, err => {
	if (err) throw err
})
