import settings from './settings'
var fs = require('fs')
const fetch = require('node-fetch')
import {render} from 'mjml-react'
import {generate} from './email'

fetch(
  `https://egghead.io/api/v1/fresh?d=${settings.DAYS_BACK}&pop=${settings.POPULAR_COUNT}`
)
  .catch(err => console.error(err))
  .then(res => res.json())
  .then(data => {
    const {html} = render(generate(data, settings.DAYS_BACK), {
      validationLevel: 'soft',
    })
    console.log(html)
    fs.writeFile('email.html', html, function(err) {
      if (err) throw err
      else console.log('✅ Saved to email.html 👍')
    })
  })
