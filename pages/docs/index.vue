<template>
  <div>
    <h1>Component List</h1>
    <ul>
      <li v-for="component in components"
          :key="component.names.kebab"
      >
        <nuxt-link :to="component.path">{{ component.names.title }}</nuxt-link>
      </li>
    </ul>
    <nuxt-child :key="$route.fullPath"/>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    computed: {
      ...mapGetters({
        components: 'components/components'
      })
    },
    data() {
      return {
        visibleComponent: null
      }
    },
    methods: {
      select(path) {
        this.visibleComponent = path
      }
    }
  }
</script>
