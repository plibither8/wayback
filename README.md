# &#x1F3DB;&#xFE0F; wayback

Microservice that redirects to redirects to [archived version](https://web.archive.org/web/) of the URL if found, otherwise saves it the [**Internet Archive**](https://archive.org).

**Base URL:** [wayback.now.sh](https://wayback.now.sh)

## Usage

**`GET /:url`**

URL must be safely encoded. Eg: `encodeURIComponent()` in JavaScript.

Checks whether a cached/archived version of the webpage on the *URL* is available.

- If available => redirect to the most recent archived version of the webpage.
- If not available => redirect to _save webpage_ link of the Wayback Machine.

**Example:** [wayback.now.sh/mihir.ch](https://wayback.now.sh/mihir.ch) redirects to most recent archived version of [https://mihir.ch](https://mihir.ch) on the Wayback Machine.

## License

[MIT](LICENSE)
