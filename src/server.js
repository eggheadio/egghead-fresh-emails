import '@babel/polyfill'
import settings from './settings'
import express from 'express'
import {render} from 'mjml-react'
import * as email1 from './email'
const fetch = require('node-fetch')
const Prism = require('prismjs'),
  loadLanguages = require('prismjs/components/index')
const mailbrush = require('mailbrush')
const he = require('he')
import {namedEntityToHexCode} from 'mjml-react/utils'

loadLanguages(['php', 'python', 'javascript', 'bash', 'html', 'css'])

const port = 3000
const app = express()

const options = {
  language: 'javascript',
  cssOptions: {
    // backgroundColor: 'pink',
  },
}

fetch(
  `https://egghead.io/api/v1/fresh?d=${settings.DAYS_BACK}&pop=${settings.POPULAR_COUNT}`
)
  .catch(err => console.error(err))
  .then(res => res.json())
  .then(data =>
    app.get('*', (req, res) => {
      const codeRegex = /(?<=(<pre>))(\w|\d|\n|[().,\-:;@#$=%^&*\[\]"'+–/\/®°⁰!?{}|`~]| )+?(?=(<\/pre>))/gm
      let {html} = render(email1.generate(data, settings.DAYS_BACK), {
        validationLevel: 'soft',
      })
      const codeMatches = html.match(codeRegex)
      let arr = []
      if (codeMatches) {
        codeMatches.forEach((m, i, ms) => {
          m = he.decode(m)
          mailbrush.convert(m, options, output => {
            arr.push(output)
            if (i === ms.length - 1) {
              const newHtml = html.replace(codeRegex, () => arr.shift())
              namedEntityToHexCode(newHtml)
              res.send(newHtml)
            }
          })
        })
      } else {
        res.send(html)
      }
    })
  )

app.listen(port, () => console.log(`Listening on port ${port}!`))
