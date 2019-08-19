<template>
    <div id="app">

        <v-layout wrap>
            <v-text-field
                    v-model="searchText"
                    label="any thing"
                    @keydown="getData"
            ></v-text-field>
            <v-btn
                    @click="getData"
            >Search
            </v-btn>
        </v-layout>
        <v-app>
            <template>
                <v-data-table :headers="headers" :items="desserts" :pagination.sync="pagination" item-key="name" class="elevation-1">
                    <template slot="items" slot-scope="props">
                        <tr >
                            <td >{{ props.item.event_id }}</td>
                            <td >{{ props.item.timestamp }}</td>

                            <td >{{ props.item.event_data }}</td>
                        </tr>
                    </template>
                </v-data-table>
            </template>
        </v-app>
    </div>

</template>
<script>

  export default {
      data () {
          return {
              searchText:'',
              total:'',
              pagination: {
                  sortBy: 'event_id'
              },
              headers: [
                  { text: '이벤트 ID', value: 'event_id' },
                  { text: '이벤트 발생 시간', value: 'timestamp' },
                  {
                      text: '이벤트',
                      align: 'left',
                      sortable: false,
                      value: 'event_data',
                  },
              ],
              desserts:[{
                  timestamp: 237,
                  event_id: 9.0,
                  event_data: 37
              },
                  {
                      timestamp: 262,
                      event_id: 16.0,
                      event_data: 23
                  },]
          }
      },methods: {
          getData(keydown){
              const path = this.$rootPath + '/es/log'
              const params ={searchText:this.searchText}

              if(keydown.keyCode ==13){
                  this.$http.post(path,params)
                      .then(response => {
                          console.log(response)
                          this.desserts = response.data.datas

                      })
                      .catch(error => {
                          console.log('처리중 오류가 발생하였습니다. 관리자에게 문의 바랍니다.')
                      })
              }
          },
          alertSelectedUids () {
              alert(this.selection.map(({ uid }) => uid))
          },test(){
              alert("test")
          }
      }
  }
</script>
<style scoped>

</style>
