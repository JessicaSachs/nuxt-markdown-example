<template>
  <div>
    Hello this is the name for some component.
    <p>My Route: {{ myRoute }}</p>
    <p v-if="myError">My Error: {{ myError }}</p>
    <p>My Component Name: {{ myComponentName }}</p>

    <client-only>
      <MarkdownRenderer
        :content="content"
        :components="components"
        v-if="components"/>
    </client-only>
  </div>
</template>

<script>
  import MarkdownRenderer from "../../../components/MarkdownRenderer";
  import { VueLive } from "vue-live";
  import { mapGetters } from 'vuex'

  export default {
    components: { VueLive, MarkdownRenderer },
    data() {
      return {
        myRoute: null,
        myError: null,
        myComponentName: null,
        myComponentModule: null,
        componentModule: null,
        componentMarkdownModule: null
      };
    },
    computed: {
      ...mapGetters({
        component: 'components/findComponentByPath'
      }),
      componentNameKebab() {
        const parts = this.$router.currentRoute.path.split('/')

        // Not normalized yet -- need to figure out which name it matches
        return parts[parts.length - 1]
      },
      componentNameTitle() {
        // Not normalized yet -- need to figure out which name it matches
        return this.componentNameKebab
          .split('-')
          .map(word => word[0].toUpperCase() + word.slice(1, word.length))
          .join('')
      },
      content() {
        if (!this.$ssrContext && this.componentMarkdownModule) {
          return this.componentMarkdownModule.default
        }
      },
      components() {
        if (this.componentModule) {
          const components = {}
          const module = this.componentModule.default
          components[module.name] = module
          return components
        }
      }
    },
    async created() {
      const component = this.component(this.$router)
      if (component) {
        this.componentMarkdownModule = await import('../../../dist/docs/' + component.docFile.replace('./dist/docs/', ''))
        this.componentModule = await import('../../../your-app/' + component.componentFile.replace('./your-app/', ''))
      }

    },
    async fetch({ store }) {
      // const router = context.route
      // const parts = router.path.split('/')
      //
      // // Not normalized yet -- need to figure out which name it matches
      // const componentNameKebab = parts[parts.length - 1]
      // const componentNameTitle = componentNameKebab
      //   .split('-')
      //   .map(word => word[0].toUpperCase() + word.slice(1, word.length))
      //   .join('')
      //
      let error = null
      let componentMarkdownModule = null
      // let componentModule = null
      //
      // const deepPathKebab = parts.slice(2, parts.length - 1).concat(componentNameKebab).join('/')
      // const deepPathTitle = parts.slice(2, parts.length - 1).concat(componentNameTitle).join('/')
      // console.log('store', store)
      // const component = store.getters('components/findComponentByPath');
      // try {
      //   componentMarkdownModule = await import(component.docFile)
      // } catch (err) {
      //   error = 'err'
      // }
      //
      return {
        myError: error,
        // myComponentName: component.name.kebab
      }
    }
  }
</script>
