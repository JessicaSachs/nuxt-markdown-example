
<script>
  import { VueLive } from "vue-live";

  export default {
    props: {
      content: { type: String, required: false },
      components: { type: Object, required: false },
      component: { type: Object, required: false },
      layout: {},
      showCode: { type: Boolean, required: false, default: true }
    },
    data() {
      return { }
    },
    methods: {
      renderCode(node, h) {
        // for each node
        // if node doesn't need to be hydrated, just render it out
        // else, wrap it in a VueLive component and pass the right code to it with the right imports

        const hasCode = n => n.getElementsByClassName('language-vue').length ||
          n.getElementsByClassName('language-jsx').length
        const isCode = n => n.tagName === 'code' || n.tagName === 'CODE'

        if (isCode(node)) {
          return h(VueLive, {
            domProps: {
              className: ['code-example'].concat(this.showCode ? ['show-code'] : ['hide-code']).join(' ')
            },
            props: {
              code: node.innerText,
              components: this.components,
              layout: this.layout,
              layoutProps: { component: this.component },
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

<style lang="scss">
  .code-example {
    color: black;

    &.hide-code {
      .editor-wrapper {
        display: none;
      }
    }
  }
</style>
