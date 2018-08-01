const express = require('express')
const bodyParser = require('body-parser')
const { guard, rule, secure } = require('../')

const help = `
The server is listening on http://localhost:3000

Press ctrl+c to stop server.
`

const hobbies = [
  'Cooking',
  'Driving',
  'Gaming',
  'Knitting',
  'Painting',
  'Reading',
  'Woodwork'
]

const html = `
<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Guestlist Profile Form Demo</title>
  </head>
  <body>
    <form method="post">
      <fieldset>
        <legend>You</legend>
        <label>
          Name
          <input name="name" type="text">
        </label>
        <br>
        <label>
          Age (min 18)
          <input name="age" type="number">
        </label>
      </fieldset>
      <fieldset>
        <legend>Your interests</legend>
        <label>
          Hobbies
          <select name="hobbies" multiple size="3">
            ${hobbies.map((item) => `<option>${item}</option>`).join('')}
          </select>
        </label>
        <br>
        <label>
          Ambition (1 is low, 10 is high)
          <input name="ambition" type="range" min="1" max="10">
        </label>
      </fieldset>
      <button type="submit">Submit</button>
    </form>
  </body>
</html>
`

const app = express()

const formGuard = guard()
  .body('name', rule().isLength({ min: 2 }).trim())
  .body('age', rule().isInt({ min: 18 }).toInt())
  .body('hobbies', rule().isIn(hobbies), { array: true })
  .body('ambition', rule().isInt({ min: 1, max: 10 }).toInt())

app.get('/', (req, res) => {
  res.send(html)
})

app.post('/', bodyParser.urlencoded({ extended: false }), secure(formGuard), (req, res) => {
  res.json(req.body)
});

app.listen(3000, () => console.log(help))
