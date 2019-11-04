<template>
  <div id="data-table">
    <v-layout wrap>
        <v-text-field
            v-model="searchText"
            label="anything"
            @keydown="keyDown"
        ></v-text-field>
        <v-btn
            @click="getData"
        >Search
        </v-btn>
    </v-layout>
    <datatable v-bind="$data" >
      <!--<button class="btn btn-default" @click="alertSelectedUids" :disabled="!selection.length">-->
      <!--<i class="fa fa-commenting-o"></i>-->
      <!--Alert selected uid(s)-->
      <!--</button>-->
    </datatable>
  </div>
</template>
<script>
  import dataHandler from 'src/components/_dataHandler'

  export default {
    name: 'FriendsTable', // `name` is required as a recursive component
    components: {},
    props: ['row'], // from the parent FriendsTable (if exists)
    data () {
      const amINestedComp = !!this.row
      return {
        searchText:'',
        tblStyle: 'table-layout: fixed', // must
         // tblStyle: 'color: #666',
        columns:   [
            { title: '이벤트 ID', field: 'event_id',colStyle:{width:'10%'}, sortable: true},
            // { title: 'MD5', field: 'MD5',colStyle:{width:'100px'}},
            // { title: 'SHA256', field: 'SHA256'},
            { title: '이벤트 발생 시간', field: 'timestamp',colStyle:{width:'20%'}},
            { title: '이벤트', field: 'event_data',colStyle:{width:'70%'}}

          ],
        data: [],
        origin_data: [],
        total: 0,
          HeaderSettings:false,
        //selection: [],
        summary: {},
        // `query` will be initialized to `{ limit: 10, offset: 0, sort: '', order: '' }` by default
        // other query conditions should be either declared explicitly in the following or set with `Vue.set / $vm.$set` manually later
        // otherwise, the new added properties would not be reactive
        query: amINestedComp ? { uid: this.row.friends } : {},
        // any other staff that you want to pass to dynamic components (thComp / tdComp / nested components)
          deep: true
      }
    },
    watch: {
      query: {
        handler () {
          if(this.data.length==0){
            this.getData({keydown: {keyCode:13}})
          }else{
            this.handleDataChange()
          }
        },
        deep: true
      }
    },
    methods: {
      handleDataChange () {
        dataHandler(this.query,this.origin_data,['ip', 'reason'])
                .then(({ rows, total }) => {
                  this.data = rows
                  this.total = total
                })
      },
        getData: function () {
            const path = this.$rootPath + '/es/log'
            const params = {searchText: this.searchText}
            this.$http.post(path, params)
                .then(response => {
                    console.log(response)
                    this.data = response.data.datas
                    this.origin_data = response.data.datas
                    this.total = response.data.total
                    this.handleDataChange()

                })
                .catch(error => {
                    console.log('처리중 오류가 발생하였습니다. 관리자에게 문의 바랍니다.')
                })

        },
        keyDown : function (keydown) {
            if (keydown.keyCode == 13) {
                this.getData()
            }
        },
        alertSelectedUids () {
        alert(this.selection.map(({ uid }) => uid))
      }
    }
  }
</script>
<style scoped>
  #data-table {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    /*text-align: center;*/
    color: #2c3e50;
    padding-right: 15px;
    padding-left: 15px;

  }
  >>>th {
    background-color: lightslategray;
    padding: 5px;
    margin-bottom: 10px;
    text-align: center;
    color: white;
  }
  >>>.table > thead > tr > th {
    padding: 5px;

    background-color: lightslategray;
    text-align: center !important;
    border-bottom-width: 1px;
    font-size: 1em;
    text-transform: uppercase;
    color: white;
    width :20% ;
    /* font-weight: 10; */
    /* padding-bottom: 5px; */
    /* border-top: none !important; */
    /* border-bottom: none; */
    font-family: 'Nanum Gothic';

  }

  >>>.table{
      width: 100%;
      height: 100%;
      overflow-x: auto;
      overflow-y: auto;
  }

</style>
