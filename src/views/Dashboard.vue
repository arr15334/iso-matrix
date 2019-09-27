<template>
  <v-container fluid>
    <v-row>
      <v-col
        cols="12"
        lg="12"
      >
        <material-chart-card
          :data="isoAccChart.data"
          :options="isoAccChart.options"
          color="purple"
          type="Bar"
        >
          <h4> Cumplimiento por dominio </h4>
        </material-chart-card>
      </v-col>

      <!--      <v-col
        cols="12"
        sm="6"
        lg="3"
      >
        <material-stats-card
          color="green"
          icon="mdi-store"
          title="Revenue"
          value="$34,245"
          sub-icon="mdi-calendar"
          sub-text="Last 24 Hours"
        />
      </v-col>

      <v-col
        cols="12"
        sm="6"
        lg="3"
      >
        <material-stats-card
          color="orange"
          icon="mdi-content-copy"
          title="Used Space"
          value="49/50"
          small-value="GB"
          sub-icon="mdi-alert"
          sub-icon-color="error"
          sub-text="Get More Space..."
          sub-text-color="text-primary"
        />
      </v-col>

      <v-col
        cols="12"
        sm="6"
        lg="3"
      >
        <material-stats-card
          color="red"
          icon="mdi-information-outline"
          title="Fixed Issues"
          value="75"
          sub-icon="mdi-tag"
          sub-text="Tracked from Github"
        />
      </v-col>

      <v-col
        cols="12"
        sm="6"
        lg="3"
      >
        <material-stats-card
          color="purple"
          icon="mdi-twitter"
          title="Followers"
          value="+245"
          sub-icon="mdi-update"
          sub-text="Just Updated"
        />
      </v-col> -->

      <v-col
        cols="12"
        lg="12"
      >
        <material-card
          color="green"
          title="Cumplimiento por control"
          text="Resumen"
        >
          <v-data-table
            :headers="headers"
            :items="tableData"
            class="elevation-1"
            hide-default-footer
          >
            <template v-slot:item.val="{ item }">
              <v-chip
                :color="getColor(item.val)"
                dark
              >
                {{ item.val }}
              </v-chip>
            </template>
          </v-data-table>
        </material-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        isoAccData: null,
        isoAccChart: null,
        headers: [],
        tableData: [],
        tabs: 0,
        list: {
          0: false,
          1: false,
          2: false,
        },
      }
    },
    created: function () {
      this.getChartData()
      this.groupByControl()
    },
    methods: {
      getChartData () {
        let rawData = window.localStorage.getItem('iso-data') || null
        let categories = []
        let values = []
        let cleanData = {}
        if (rawData) {
          rawData = JSON.parse(rawData)
          for (const item of rawData) {
            if (categories.indexOf(item.category) < 0) {
              categories.push(item.category)
              cleanData[item.category] = {
                count: 1,
                acc: item.value * 1,
                val: item.value * 1,
              }
            } else {
              cleanData[item.category].count++
              cleanData[item.category].acc = cleanData[item.category].acc * 1 + item.value * 1
              cleanData[item.category].val = cleanData[item.category].acc / cleanData[item.category].count
            }
          }
        }

        for (let k in cleanData) {
          if (cleanData.hasOwnProperty(k)) {
            values.push(cleanData[k].val)
          }
        }
        this.isoAccChart = {
          data: {
            labels: categories,
            series: [
              values,
            ],
          },
          options: {
            axisX: {
              showGrid: false,
            },
            low: 0,
            high: 100,
            chartPadding: {
              top: 0,
              right: 5,
              bottom: 0,
              left: 0,
            },
          },
          responsiveOptions: [
            ['screen and (max-width: 640px)', {
              seriesBarDistance: 5,
              axisX: {
                labelInterpolationFnc: function (value) {
                  return value[0]
                },
              },
            }],
          ],
        }
      },
      complete (index) {
        this.list[index] = !this.list[index]
      },
      groupByControl () {
        let rawData = window.localStorage.getItem('iso-data') || null
        let subcategories = []
        let values = []
        let cleanData = {}
        if (rawData) {
          rawData = JSON.parse(rawData)
          for (const item of rawData) {
            if (subcategories.indexOf(item.subcategory) < 0) {
              cleanData[item.subcategory] = {
                category: item.category,
                subcategory: item.subcategory,
                acc: item.value * 1,
                count: 1,
                val: item.value,
              }
            } else {
              cleanData[item.subcategory].count++
              cleanData[item.subcategory].acc = cleanData[item.subcategory].acc * 1 + item.value * 1
              cleanData[item.subcategory].val = cleanData[item.subcategory].acc / cleanData[item.subcategory].count
            }
          }
        }
        for (let k in cleanData) {
          values.push(cleanData[k])
        }
        this.headers = [
          {
            sortable: false,
            text: 'Dominio',
            value: 'category',
            align: 'left',
          },
          {
            sortable: false,
            text: 'Objetivo',
            value: 'subcategory',
            align: 'left',
          },
          { text: 'Cumplimiento', value: 'val' },
        ]
        this.tableData = values
      },
      getColor (val) {
        if (val < 25) return 'red'
        else if (val < 75) return 'orange'
        else return 'green'
      },
    },
  }
</script>
