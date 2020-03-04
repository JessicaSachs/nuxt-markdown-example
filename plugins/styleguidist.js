
export default ({ store }, inject) => {
  const files = []
  if (process.server) {
    function getComponents() {
      const glob = require('glob')
      const path = require('path')
      const outputPrefix = './dist/docs/your-app'
      const sourcePrefix = './your-app'
      const contentDocs = glob.sync(`${outputPrefix}/**/*.md`)
      const components = glob.sync(`${sourcePrefix}/**/*.vue`)

      const normalizeName = (n, prefix) => n.replace(`${prefix}/`, '').split('.').shift()
      const map = {}

      for (const doc of contentDocs) {
        const name = normalizeName(doc, outputPrefix)
        map[name] = map[name] || {}
        map[name].docFile = doc
      }

      for (const component of components) {
        const name = normalizeName(component, sourcePrefix)
        map[name] = map[name] || {}
        map[name].componentFile = component
      }

      for (const key of Object.keys(map)) {
        const entry = map[key]
        const title = (entry.componentFile || entry.docFile)
          .split('/')
          .pop()
          .split('.')
          .shift()

        const kebab = title.split('').reduce((acc, curr, index) => {
          if (index > 0 && curr.charCodeAt(0) < 97) {
            acc.push(`-${curr.toLowerCase()}`)
            return acc;
          }
          acc.push(curr.toLowerCase())
          return acc
        }, []).join('')

          map[key].names = {
            kebab,
            title,
          }

        const parts = key.split('/')
        const pathName = parts.pop().replace(title, kebab)

        map[key].path = parts.slice(0, parts.length - 2).concat(pathName).join('/')
        map[key].markdown = require('../dist/docs' + map[key].docFile.replace('./dist/docs', '')).default
      }

      return map
    }
    store.dispatch('components/setComponents', getComponents())
  }
  inject('myInjectedFunction', () => console.log('Some files', files))
}
