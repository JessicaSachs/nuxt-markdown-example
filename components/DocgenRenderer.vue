<script>
  import MarkdownRenderer from "./MarkdownRenderer";
  import ComponentMetaData from "./ComponentMetaData";
  const props = {
    content: { type: String, required: false },
    components: { type: Object, required: false },
    component: { type: Object, required: false },
    layout: {},
    showCode: { type: Boolean, required: false, default: true }
  }
  export default {
    props,
    methods: {
      makePropsForNode(node) {
        const _this = this
        return Object.keys(props).reduce((acc, curr) => {
          acc[curr] = curr === 'content' ? node.innerHTML : _this[curr]
          return acc;
        }, {})
      },
      renderDocgenExample(node, state, h) {
        if (!state.completedDocgenSection) {
          if (node.tagName === 'TABLE' && !state.tablesHandled) {
            state.tablesHandled = true
            const tables = node.parentElement.getElementsByTagName('table')
            const content = Array.from(tables).map(t => t.innerHTML).join('')
            return h(ComponentMetaData, { props: { content } })
          } else if (node.tagName === 'HR') {
            state.completedDocgenSection = true;
            return h('hr')
          }
          return Array.from(node.children).map((c => this.renderDocgenExample(c, state, h)))
        }

        return h(MarkdownRenderer, {
          props: this.makePropsForNode(node)
        })
      }
    },
    render(h) {
      let completedDocgenSection = false
      let tablesHandled = false
      const wrapper = document.createElement('div')
      wrapper.innerHTML = this.content

      const result = this.renderDocgenExample(wrapper, { completedDocgenSection, tablesHandled }, h)
      console.log('result', result)
      if (Array.isArray(result)) {
        return h('div', result)
      }
      return result
    }
  }
</script>
