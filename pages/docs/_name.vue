<template>
  <div>
    Hello this is the name for some component.
    <p>My Route: {{ myRoute }}</p>
    <p v-if="myError">My Error: {{ myError }}</p>
    <p>My Component Name: {{ myComponentName }}</p>

    <client-only>
      <!-- TODO: create the components correctly.
          Filter the code blocks out and re-render them in the appropriate order -->
      <div class="example" v-html="content"/>
      <VueLive v-for="code in codeBlocks"
               :key="code"
               :code="code"
               :components="thoseComponents"></VueLive>
    </client-only>
  </div>
</template>

<script>
  import { VueLive } from "vue-live";
  export default {
    components: { VueLive },
    data() {
      return {
        myContent: null,
        myRoute: null,
        myError: null,
        myComponentName: null,
        myComponentModule: null,
      };
    },
    computed: {
      codeBlocks() {
        if (!this.$ssrContext) {
          const container = document.createElement('div')
          container.innerHTML = this.myContent
          return Array.from(container.getElementsByClassName('language-vue')).map(c => c.textContent);
        }
      },
      content() {
        if (!this.$ssrContext) {
          const container = document.createElement('div')
          container.innerHTML = this.myContent

          // TODO: This isn't working. Get it to work.
          Array.from(container.getElementsByClassName('language-vue')).forEach(c => {
            // container.removeChild(c)
            console.log('c', c)
          })
          return container.innerHTML
        }
      },
      thoseComponents() {
        const components = {}
        this.myComponentModule.name = 'HelloWorld'

        console.log('hello world')
        components['HelloWorld'] = this.myComponentModule
        console.log(Object.keys(components))
        return components;
      }
    },
    async asyncData(context) {
      const router = context.route
      const parts = router.path.split('/')

      // Not normalized yet -- need to figure out which name it matches
      const componentNameKebab = parts[parts.length - 1]
      const componentNameTitle = componentNameKebab
        .split('-')
        .map(word => word[0].toUpperCase() + word.slice(1, word.length))
        .join('')

      let error = null
      let componentMarkdownModule = null
      let componentModule = null
      try {
        componentMarkdownModule = await import(`../../dist/docs/your-app/components/${componentNameTitle}.md`) ||
          await import(`../../dist/docs/your-app/components/${componentNameKebab}.md`)
        componentModule = await import(`../../your-app/components/${componentNameTitle}.vue`) ||
          await import(`../../your-app/components/${componentNameKebab}.vue`)
      } catch (err) {
        error = `Cannot find the module. Tried: ${componentNameTitle} and ${componentNameKebab} inside of ../../dist/docs/your-app/components
          ${err}
        `
      }

      return {
        myError: error,
        myComponentName: componentNameKebab,
        myRoute: context.route.path,
        myComponentModule: (componentModule && componentModule.default) || {},
        myContent: componentMarkdownModule && componentMarkdownModule.default
      }
    }
  }
</script>
