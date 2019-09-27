<template>
  <v-container
    fluid
  >
  <v-row>
    <table>
      <tr>
        <th>ID</th>
        <th>Categoría</th>
        <th>Subcategoría</th>
        <th>Sección</th>
        <th>Pregunta</th>
        <th>Cumplimiento</th>
      </tr>

      <tr v-for="q in items" v-bind:key="q.id">
        <td>{{ q.id }}</td>
        <td>{{ q.category }}</td>
        <td>{{ q.subcategory }}</td>
        <td>{{ q.section }}</td>
        <td>{{ q.question }}</td>
        <td> <input type="number" name="value" id="q.id" v-model="q.value"
        max=100 min=0> </td>
      </tr>
    </table>
  </v-row>
  <v-btn
    color="primary"
    v-on:click="updateData"
    >
    Actualizar
  </v-btn>
  </v-container>
</template>

<script>
  export default {
    data: () => ({
      dialog: false,
      headers: [
        {
          sortable: false,
          text: 'Categoría',
          value: 'category',
        },
        {
          sortable: false,
          text: 'Subcategoría',
          value: 'subcategory',
        },
        {
          sortable: false,
          text: 'Sección',
          value: 'section',
        },
        {
          sortable: false,
          text: 'Pregunta',
          value: 'question',
        },
        {
          sortable: false,
          text: '% cumpliemiento',
          value: 'value',
        },
      ],
      items: [],
    }),
    created: function () {
      this.items = require('../assets/template.json').data
    },
    methods: {
      updateData: function () {
        const jsonOutput = JSON.stringify(this.items)
        window.localStorage.setItem('iso-data', jsonOutput)
      },
    },
  }
</script>
