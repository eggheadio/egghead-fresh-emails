import {render} from 'mjml-react'
import settings from './settings'
import fs from 'fs'
import fetch from 'node-fetch'
import loadLanguages from 'prismjs/components/index'
import mailbrush from 'mailbrush'
import he from 'he'

import * as email1 from './email'

// code blocks syntax highlighting
loadLanguages(['php', 'python', 'javascript', 'bash', 'css'])
const options = {
  language: 'javascript',
  cssOptions: {
    // example:
    // backgroundColor: 'pink',
  },
}

fetch(
  `https://egghead.io/api/v1/fresh?d=${settings.DAYS_BACK}&pop=${settings.POPULAR_COUNT}`
)
  .catch(err => console.error(err))
  .then(res => res.json())
  .then(data => {
    let {html} = render(email1.generate(data, settings.DAYS_BACK), {
      validationLevel: 'soft',
    })

    const codeRegex = /(?<=(<pre>))(\w|\d|\n|[().,\-:;@#$=%^&*\[\]"'+–/\/®°⁰!?{}|`~]| )+?(?=(<\/pre>))/gm
    const codeBlocks = html.match(codeRegex)
    let codeSnippets = []

    if (codeBlocks) {
      codeBlocks.forEach((codeSnippet, i, ms) => {
        codeSnippet = he.decode(codeSnippet)
        mailbrush.convert(codeSnippet, options, output => {
          codeSnippets.push(output)
          if (i === ms.length - 1) {
            const htmlWithCodeBlocks = html.replace(codeRegex, () =>
              codeSnippets.shift()
            )
            console.log(htmlWithCodeBlocks)
            fs.writeFile('email.html', htmlWithCodeBlocks, function(err) {
              if (err) throw err
              else console.log('✅ Saved as email.html 👍')
            })
          }
        })
      })
    } else {
      console.log(html)
      fs.writeFile('email.html', html, function(err) {
        if (err) throw err
        else console.log('✅ Saved as email.html 👍')
      })
    }
  })
