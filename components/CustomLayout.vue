<template>
  <div>
    <v-card style="position: relative" outlined>
      <v-toolbar color="blue darken-2" dark dense class="playground-toolbar">
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn icon @click="editor = !editor">
            <v-icon>mdi-code-tags</v-icon>
          </v-btn>
          <v-btn icon>
            <v-icon>mdi-github-circle</v-icon>
          </v-btn>
          <v-btn icon>
            <v-icon>mdi-share</v-icon>
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-expand-transition>
        <v-sheet v-if="editor" color="rgba(0,0,0,0.1)">
          <v-toolbar dark dense flat tile>
            <v-toolbar-title>Live Editor</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <v-btn disabled>JSX</v-btn>
            </v-toolbar-items>
          </v-toolbar>
          <v-divider/>
          <v-sheet color="transparent" style="padding: 1em">
            <div class="editor-wrapper">
              <slot name="editor"></slot>
            </div>
          </v-sheet>
        </v-sheet>
      </v-expand-transition>
      <v-sheet>
        <div class="preview-wrapper">
          <slot name="preview"></slot>
        </div>
      </v-sheet>
    </v-card>
  </div>
</template>
<script>
  export default {
    methods: {},
    props: {
      component: {type: Object}
    },
    data() {
      return {
        editor: false,
      }
    }
  }
</script>
<style lang="scss">
  .preview-code {
    margin: 0 auto;
  }

  .preview-wrapper {
    padding: 1em;
  }

  .preview-code {
    .editor-wrapper, .preview-wrapper {
      width: 100%;
    }
  }

  .preview-code .editor-wrapper {
    border-radius: 10px 0 0 10px;
    overflow: hidden;

    & > div {
      height: calc(100% - 1em);

      & > div {
        height: 100%;
      }
    }
  }

  .preview-code .preview-wrapper {
    padding: 30px;
    background-color: #fff;
    text-align: center;
    border-radius: inherit;
  }

  @media only screen and (max-width: 1000px) {
    .preview-code {
      width: 90vw;
    }
  }

  @media only screen and (max-width: 568px) {
    .preview-code {
      display: block;
    }
    .preview-code {
      .editor-wrapper, .preview-wrapper {
        width: auto;
      }
    }
    .preview-code .editor-wrapper {
      border-radius: inherit;
    }
    .preview-code .preview-wrapper {
      border-radius: inherit;
    }
  }
</style>
