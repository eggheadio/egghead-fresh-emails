import settings from './settings'
import express from 'express'
import {render} from 'mjml-react'
import * as email1 from './email'
const fetch = require('node-fetch')

const port = 3000
const app = express()

fetch(
  `https://egghead.io/api/v1/fresh?d=${settings.DAYS_BACK}&pop=${settings.POPULAR_COUNT}`
)
  .catch(err => console.error(err))
  .then(res => res.json())
  .then(data =>
    app.get('*', (req, res) => {
      const {html} = render(email1.generate(data, settings.DAYS_BACK), {
        validationLevel: 'soft',
      })
      res.send(html)
    })
  )

app.listen(port, () => console.log(`Listening on port ${port}!`))
