<template>
  <v-container
    fill-height
    fluid
    grid-list-xl
  >
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
      <td> <input type="number" name="value" id="q.id"> </td>
    </tr>
  
  </table>
  </v-container>
</template>

<script>
  export default {
    data: () => ({
      dialog: false,
      headers: [
        {
          sortable: true,
          text: 'ID',
          value: 'id'
        },
        {
          sortable: false,
          text: 'Categoría',
          value: 'category'
        },{
          sortable: false,
          text: 'Subcategoría',
          value: 'subcategory'
        },{
          sortable: false,
          text: 'Sección',
          value: 'section'
        },{
          sortable: false,
          text: 'Pregunta',
          value: 'question'
        },{
          sortable: false,
          text: '% cumpliemiento',
          value: 'value'
        },
      ],
      items: [],
    }),
    methods: {
    },
    created: function () {
      this.items = require('../assets/template.json').data
    }
  }
</script>
