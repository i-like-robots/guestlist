const express = require('express')
const guestlist = require('../')

const help = `
The server is listening on http://localhost:3000

Try it out:-
  - http://localhost:3000?term=Hello+World&page=1
  - http://localhost:3000?term=With+a+date&date=2018-01-01
  - http://localhost:3000?term=With+an+invalid+page&page=101

Press ctrl+c to stop server.
`

const app = express()

const query = guestlist.guard('query')
  .permit('term', guestlist.rule().isLength({ min: 2 }).trim().escape())
  .permit('page', guestlist.rule().isInt({ min: 1, max: 100 }).toInt())
  .permit('date', guestlist.rule().isISO8601().toDate())

app.get('/', query.secure(), (req, res) => {
  res.json(req.query)
})

app.listen(3000, () => console.log(help))
