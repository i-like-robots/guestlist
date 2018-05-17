const express = require('express')
const { guard, rule, patrol } = require('../')

const help = `
The server is listening on http://localhost:3000

Try it out:-
  - http://localhost:3000?term=Hello+World&page=1
  - http://localhost:3000?term=With+a+date&date=2018-01-01
  - http://localhost:3000?term=With+an+invalid+page&page=101
  - http://localhost:3000?tags=123&tags=456&tags=789

Press ctrl+c to stop server.
`

const app = express()

const queryStringGuard = guard()
  .query('term', rule().isLength({ min: 2 }).trim().escape())
  .query('page', rule().isInt({ min: 1, max: 100 }).toInt(), { default: 1 })
  .query('date', rule().isISO8601().toDate())
  .query('tags', rule().isInt().toInt(), { array: true })

app.get('/', patrol(queryStringGuard), (req, res) => {
  res.json(req.query)
})

app.listen(3000, () => console.log(help))
