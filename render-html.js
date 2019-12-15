module.exports = function(bodyContent) {
	const head = `
		<head>
			<title>&#x1F3DB;&#xFE0F; Wayback</title>
			<meta name="viewport" content="width=device-width, initial-scale=1.0">
			<style>
				body {
					max-width: 600px;
					width: 90%;
					margin: 0 auto;
					padding: 30px 0;
				}
			</style>
		</head>
	`

	const body = `
		<body>${bodyContent}</body>
	`

	return `
		<html>
			${head}
			${body}
		</html>
	`
}
