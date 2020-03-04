<template>
  <div>
    <div style="flex-wrap: wrap" class="d-flex pa-2" v-for="prop in data" :key="prop['Prop name']">
      <div class="flex xs6 md3">
        <div class="text-capitalize overline text--secondary text--darken-3">Name</div>
        <span>{{ prop['Prop name'] }}</span>
      </div>
      <div class="flex xs6 md2 text-xs-right">
        <div class="text-capitalize overline text--secondary text--darken-3">Type</div>
        <span> {{ prop['Type'] }}</span>
      </div>
      <div class="flex xs12 md7 text-md-right">
        <div class="text-capitalize overline text--secondary text--darken-3">Default</div>
        <span>{{ prop['Default'] }}</span>
      </div>
      <div class="flex xs12 mt-2">
        <div class="text-capitalize overline text--secondary text--darken-3">Description</div>
        <div>{{ prop['Description'] }}</div>
      </div>
    </div>
  </div>

</template>

<script>
  export default {
    props: { data: {} },
  }
</script>

<style scoped lang="scss">

</style>
