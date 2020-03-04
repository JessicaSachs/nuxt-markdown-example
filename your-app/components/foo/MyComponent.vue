<template>
  <div @click="$emit('weird-event', false)">
    Okay yeah
    <!-- @slot This slot is for putting things in -->
    <slot name="anything-you-want" :that-thing="2" :also-this="{}">But not that</slot>
  </div>
</template>

<script>
  export default {
    props: {
      /**
       * A message is a way of communicating with everyone around you.
       * It can be short, long, or nonexistent
       */
      message: { type: String, default: "yeah, what's up fam?" }
    }
  }
</script>

<docs>
  Hello world
  ```jsx
  <MyComponent style="color: orange;">A live example</MyComponent>
  ```
</docs>
