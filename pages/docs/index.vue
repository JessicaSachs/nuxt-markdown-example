<template>
  <div>
    <h1>I am the parent view</h1>
    <nuxt-child/>
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
