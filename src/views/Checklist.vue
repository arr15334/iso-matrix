<template>
  <v-container
    fluid
  >
  <v-row>
    <v-simple-table
      :fixed-header="true"
      :height="600"
    >
        <template v-slot:default>
          <thead>
            <tr>
              <th>Categoría</th>
              <th>Subcategoría</th>
              <th>Sección</th>
              <th>Pregunta</th>
              <th>Cumplimiento</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="q in items"
              :key="q.id"
            >
              <td>{{ q.category }}</td>
              <td>{{ q.subcategory }}</td>
              <td>{{ q.section }}</td>
              <td>{{ q.question }}</td>
              <td>
                <input
                  id="q.id"
                  v-model="q.value"
                  type="number"
                  name="value"
                  max="100"
                  min="0"
                >
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-row
          :align="center"
          :justify="center"
        >
          <v-btn
            color="purple darken-2"
            width="100%"
            class="white--text"
            @click="updateData"
          >
            <v-icon dark> mdi-content-save-edit </v-icon>
            Guardar
          </v-btn>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    data: () => ({
      dialog: false,
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
