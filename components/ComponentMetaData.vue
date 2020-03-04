<template>
  <v-sheet>
    <a href="#api" class="text--primary link">
      <h1>API</h1>
    </a>
  <v-card flat outlined>
    <v-toolbar flat color="primary" dark>
      <v-toolbar-title>Docs</v-toolbar-title>
    </v-toolbar>
    <v-tabs vertical>
      <template v-for="key in keys" v-if="$data[key]">
        <v-tab>{{ key }}</v-tab>
        <v-tab-item>
          <v-data-iterator :items="$data[key].data" hide-default-footer>
            <template #default="things">
              <component :is="componentForKey(key)" :data="things.items"/>
            </template>
          </v-data-iterator>
        </v-tab-item>
      </template>
    </v-tabs>
  </v-card>
  </v-sheet>
</template>
<script>
  import PropsCard from "./ApiExplorer/PropsCard";
  export default {
    props: {
      content: {},
    },
    computed: {
      keys() {
        return ['slots', 'events', 'props']
      }
    },
    data() {
      return {
        slots: null,
        events: null,
        props: null
      }
    },
    methods: {
      parseContent() {
        const wrapper = document.createElement('table')
        wrapper.innerHTML = this.content
        const headers = wrapper.getElementsByTagName('th')
        const output = {
          slots: {},
          events: {},
          props: {}
        }


        function makeStructureFromTable(key, th) {
          const intermediate = Array.from(th.parentElement.children).map((th, i) => [th.innerText, i])
          output[key].headers = intermediate.map(t => t[0])
          output[key].data = []
          Array.from(wrapper.getElementsByTagName('tbody')[0].children)
            .forEach((row) => {
              const data = {}
              Array.from(row.children).forEach((col, idx) => {
                let d;
                try {
                  d = JSON.parse(col.innerText)
                } catch {
                  d = col.innerText
                }
                data[output[key].headers[idx]] = d
              })
              output[key].data.push(data)
            })
        }

        const keysToLabels = {
          Bindings: 'slots',
          'Prop name': 'props',
          'Event name': 'events'
        }

        Array.from(headers)
          .filter(n => ['Bindings', 'Event name', 'Prop name'].includes(n.innerText))
          .forEach(th => makeStructureFromTable(keysToLabels[th.innerText], th))

        this.slots = Object.keys(output.slots).length ? output.slots : null
        this.events = Object.keys(output.events).length ? output.events : null
        this.props = Object.keys(output.props).length ? output.props : null
      },
      componentForKey(key) {
        if (key === 'props') {
          return PropsCard
        }
      }
    },
    created() {
      this.parseContent()
    }
  }
</script>

<style scoped>
  .link {
    text-decoration-color: rgba(0, 0, 0, 0.87);
    text-decoration-line: none;
  }
</style>
