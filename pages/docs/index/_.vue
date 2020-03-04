<template>
  <v-sheet>
    <v-divider></v-divider>
    <div>Loading... {{ name }}</div>
      <client-only>
        <DocgenRenderer
        :content="component.markdown"
        :component="component"
        :components="components"
        :layout="layout"
        v-if="components"/>
      </client-only>
  </v-sheet>
</template>

<script>
  import DocgenRenderer from "../../../components/DocgenRenderer";
  import { VueLive } from "vue-live";
  import { mapGetters } from 'vuex'
  import CustomLayout from '../../../components/CustomLayout'

  export default {
    components: { VueLive, DocgenRenderer },
    data() {
      return {
        componentModule: null,
        componentMarkdownModule: null,
        layout: CustomLayout
      };
    },
    computed: {
      ...mapGetters({
        componentByPath: 'components/findComponentByPath'
      }),
      name() {
        if (this.component) { return this.component.names.title }
      },
      content() {
        return this.componentMarkdownModule && this.componentMarkdownModule.default
      },
      component() {
        return this.componentByPath(this.$router)
      },
      components() {
        if (this.componentModule) {
          const components = {}
          const module = this.component
          components[module.names.title] = this.componentModule
          return components
        }
      }
    },
    async created() {
      if (!this.$ssrContext) {
        console.log(this.component.markdown)
      }
      this.componentMarkdownModule = this.component.markdown
      this.componentModule = () => import('../../../your-app/' + this.component.componentFile.replace('./your-app/', ''))
    },
    async fetch() {
    }
  }
</script>
