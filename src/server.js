import settings from './settings'
import express from 'express'
import {render} from 'mjml-react'
import * as email1 from './email'
const fetch = require('node-fetch')
const Prism = require('prismjs'),
  loadLanguages = require('prismjs/components/index')
const mailbrush = require('mailbrush')

loadLanguages(['php', 'python', 'javascript'])

const port = 3000
const app = express()

const options = {
  language: 'javascript',
  cssOptions: {
    // backgroundColor: 'pink',
  },
}

const snippet = `{
  "key": "value",
  "key2": "value 2"
}`

fetch(
  `https://egghead.io/api/v1/fresh?d=${settings.DAYS_BACK}&pop=${settings.POPULAR_COUNT}`
)
  .catch(err => console.error(err))
  .then(res => res.json())
  .then(data =>
    app.get('*', (req, res) => {
      const codeRegex = /(?<=(<wtf>))(\w|\d|\n|[().,\-:;@#$=%^&*\[\]"'+–/\/®°⁰!?{}|`~]| )+?(?=(<\/wtf>))/gm
      const {html} = render(email1.generate(data, settings.DAYS_BACK), {
        validationLevel: 'soft',
      })

      const match = [html.match(codeRegex)]

      // TODO: match multiple rather than only first

      match.forEach((match, i) => {
        mailbrush.convert(match[i], options, output => {
          // Returns HTML with inlined CSS for email client compatibility
          //console.log('highlighted code:', html)

          const html2 = html.replace(match[i], output)
          res.send(html2)
        })
      })
    })
  )

app.listen(port, () => console.log(`Listening on port ${port}!`))
