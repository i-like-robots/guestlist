const express = require('express')
const { guard, rule, validate } = require('../')

const help = `
The server is listening on http://localhost:3000

Try it out:-
  - http://localhost:3000?term=Hello+World&page=1
  - http://localhost:3000?term=With+a+date&date=2018-01-01
  - http://localhost:3000?term=With+an+invalid+page&page=101
  - http://localhost:3000?tags=123&tags=456&tags=789

Press ctrl+c to stop server.
`

// Format the date as a YYYY-MM-DD string
const formatDate = (date) => date.toISOString().slice(0, 10);

const app = express()

const safelist = guard()
  .permit('term', rule().isLength({ min: 2 }).trim().escape())
  .permit('page', rule().isInt({ min: 1, max: 100 }).toInt(), { default: 1 })
  .permit('date', rule().isISO8601().toDate().customSanitizer(formatDate))
  .permit('tags', rule().isInt().toInt(), { array: true })

app.get('/', (request, response) => {
  const validProperties = validate(request, safelist)
  response.json(validProperties)
})

app.listen(3000, () => console.log(help))
