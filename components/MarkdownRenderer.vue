
<script>
  import { VueLive } from "vue-live";
  export default {
    props: {
      content: { type: String, required: false },
      components: { type: Object, required: false }
    },
    methods: {
      renderCode(node, h) {
        // for each node
        // if node doesn't need to be hydrated, just render it out
        // else, wrap it in a VueLive component and pass the right code to it with the right imports

        const hasCode = wrapper => wrapper.getElementsByClassName('language-vue').length ||
          wrapper.getElementsByClassName('language-jsx').length
        const isCode = wrapper => wrapper.tagName === 'code' || wrapper.tagName === 'CODE'

        if (isCode(node)) {
          return h(VueLive, {
            domProps: {
              className: 'code-example'
            },
            props: {
              code: node.innerText,
              components: this.components
            }
          });
        }

        if (!hasCode(node)) {
          return h(node.tagName, { domProps: { innerHTML: node.innerHTML } } )
        }

        return Array.from(node.children).map(c => this.renderCode(c,h))
      }
    },
    render(h) {
      const wrapper = document.createElement('div')
      wrapper.innerHTML = this.content
      const result = this.renderCode(wrapper, h)
      if (result.length) {
        return h('div', result)
      }
      return result
    }
  }
</script>

<style scoped>
  .code-example {
    color: black;
  }
</style>
