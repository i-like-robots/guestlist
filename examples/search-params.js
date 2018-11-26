const express = require('express')
const { list, rule, validate } = require('../')

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

const safelist = list()
  .add('term', rule().isLength({ min: 2 }).trim().escape())
  .add('page', rule().isInt({ min: 1, max: 100 }).toInt(), { default: 1 })
  .add('date', rule().isISO8601().toDate().customSanitizer(formatDate))
  .add('tags', rule().isInt().toInt(), { array: true })

app.get('/', (request, response) => {
  const validProperties = validate(request, safelist)
  response.json(validProperties)
})

app.listen(3000, () => console.log(help))
