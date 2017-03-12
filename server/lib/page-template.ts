import { PageTemplate } from '../middleware/ssr'

export const pageTemplate: PageTemplate = (html, state, script) => `
<html>
    <head>
        <title>SSR + code splitting</title>
    </head>
    <body>
        <div id="root">${html}</div>
        <script>
          // WARNING: See the following for security issues around embedding JSON in HTML:
          // http://redux.js.org/docs/recipes/ServerRendering.html#security-considerations
          window.__PRELOADED_STATE__ = ${JSON.stringify(state).replace(/</g, '\\u003c')}
        </script>
        <script src="/assets/${script}"></script>
    </body>
</html>
`
