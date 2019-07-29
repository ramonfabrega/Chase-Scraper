# Chase-Scraper

`git clone https://github.com/ramonfabrega/Chase-Scraper/`

`cd Chase-Scraper && npm i`

## Usage

One liner run with `ENV`

`USERNAME="$user" PASSWORD="$pass" node scrape.js > dump.json`

---

Or,

create `credentials.js` at root and input info

```
module.exports = {
  username: $user,
  password: $pass'
};
```

and run with `node scrape.js > dump.json`
