const fastify = require('fastify')()
const fetch = require('node-fetch')
const fs = require('fs')
const marked = require('marked')
const path = require('path')

const BLACKLIST = require('./blacklist.json')

// Construct availability checker URL
function getCheckLink(targetUrl) {
	const baseUrl = 'http://archive.org/wayback/available'
	// Current date and time's timestamp as per API specs
	const timestamp = new Date()
		.toISOString()
		.split('.')[0]
		.replace(/[-:T]/g, '')

	return baseUrl +
		'?timestamp=' + timestamp +
		'&url=' + encodeURIComponent(targetUrl)
}

// Construct save link URL
function getSaveLink(targetUrl) {
	const baseUrl = 'https://web.archive.org/save/'
	return baseUrl + targetUrl
}

// Check if a snapshot of the target url is available
async function checkAvailability(url) {
	const availibilityUrl = getCheckLink(url)
	const result = await fetch(availibilityUrl)
		.then(res => res.json())
		.then(res => res.archived_snapshots)

	return 'closest' in result ? result.closest.url : false
}

// Get final redirection url => existing snapshot or save link
async function getRedirectionUrl(url) {
	const resultUrl = await checkAvailability(url)
	return resultUrl || getSaveLink(url)
}

// Required to parse the URL and its path
fastify.register(require('fastify-url-data'))

fastify.get('/', async (req, reply) => {
	fs.readFile(path.join(__dirname, './README.md'), 'utf8', function(err, data) {
		reply
			.type('text/html')
			.send(require('./render-html')(marked(data)))
	})
})

// Main GET request parsing function
fastify.get('/*', async (req, reply) => {
	const { path } = req.urlData()

	// Blacklisted paths handling
	if (BLACKLIST.paths.includes(path)) {
		reply
			.status(404)
			.send(BLACKLIST.error.replace('$', path))
		return
	}

	const targetUrl = decodeURIComponent(path).substring(1) // construct target url
	const redirectionUrl = await getRedirectionUrl(targetUrl)

	reply.redirect(redirectionUrl)
})

fastify.listen(process.env.PORT || 3000, err => {
	if (err) throw err
})
