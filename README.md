# mjml-react email templates

## Usage

```bash
npm install
npm start
```

and afterwards just open your browser using the link [http://localhost:3000/](http://localhost:3000/).

> The http server will listen and restart upon each change inside src folder.
> You just need to refresh a browser window manually.

### Running from command line

Generate `email.html` in root directory:

```bash
npm run generate
```

And you can automate things by sending the generated email to your test inbox:

```bash
npm run build
npm run generate | mail -s "$(echo -e "This is a test email\nContent-Type: text/html")" myemail@myprovider.com
```

### Syntax highlighting

Example 
```<MjmlText><pre>const foo = () => {}</pre></MjmlText>```

---

📃[mjml documentation](https://mjml.io/documentation/)

---

Based on [mjml](https://mjml.io/) and [mjml-react](https://github.com/wix-incubator/mjml-react).
