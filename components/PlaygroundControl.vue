<template>
    <v-speed-dial
      absolute
      v-model="fab"
      top
      right
      :direction="direction"
      open-on-hover
      :transition="transition"
    >
      <template v-slot:activator>
        <v-btn
          @click="$emit('click')"
          v-model="fab"
          color="purple darken-2"
          small
          dark
          fab
        >
          <v-icon v-if="fab">mdi-close</v-icon>
          <v-icon v-else>mdi-code-tags</v-icon>
        </v-btn>
      </template>
      <v-btn
        fab
        dark
        small
        color="green darken-2"
      >
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
      <v-btn
        fab
        dark
        small
        color="indigo darken-2"
      >
        <v-icon>mdi-github-face</v-icon>
      </v-btn>
      <v-btn
        fab
        dark
        small
        color="red darken-2"
      >
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </v-speed-dial>
</template>

<script>
  export default {
    data: () => ({
      direction: 'bottom',
      fab: false,
      fling: true,
      hover: true,
      tabs: null,
      top: true,
      right: true,
      transition: 'scale-transition',
    }),

    computed: {
      activeFab () {
        switch (this.tabs) {
          case 'one': return { class: 'purple', icon: 'account_circle' }
          case 'two': return { class: 'red', icon: 'edit' }
          case 'three': return { class: 'green', icon: 'keyboard_arrow_up' }
          default: return {}
        }
      },
    },

    watch: {
      top (val) {
        this.bottom = !val
      },
      right (val) {
        this.left = !val
      },
      bottom (val) {
        this.top = !val
      },
      left (val) {
        this.right = !val
      },
    },
  }
</script>
