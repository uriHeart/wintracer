<template>
  <div id="data-table">
    <v-layout wrap>
        <v-text-field
            v-model="title"
            label="SHA256 or MD5"
            @submit="test"
        ></v-text-field>
        <v-btn
            @click="test"
        >Search
        </v-btn>
    </v-layout>
    <datatable v-bind="$data">
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
        title:'',
        supportBackup: false,
        supportNested: true,
        tblClass: 'table-bordered',
        // tblStyle: 'color: #666',
        Pagination:true,
        pageSizeOptions: [10, 20, 50, 100],
        //fixHeaderAndSetBodyMaxHeight :800,
        columns: (() => {
          const cols = [
            { title: '이벤트 ID', field: 'event_id',tdStyle:{width:'20%'}},
            // { title: 'MD5', field: 'MD5',colStyle:{width:'100px'}},
            { title: 'SHA256', field: 'SHA256'},
            { title: '이벤트 발생 시간', field: 'timestamp'},
            { title: '실행 파일명', field: 'OriginalFileName'},
            { title: '상위 프로세서', field: 'ParentCommandLine'}

          ]
          const groupsDef = {
            Normal: ['SHA256', 'MD5']
          }
          return cols.map(col => {                  col.width  ='20%'

              Object.keys(groupsDef).forEach(groupName => {
              if(groupsDef[groupName].includes(col.title)) {
                col.group = groupName
              }
            })
            return col
          })
        })(),
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
        xprops: {
          eventbus: new Vue()
        }
      }
    },
    watch: {
      query: {
        handler () {
          if(this.data.length==0){
            this.getData()
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
      getData(){
        const path = this.$rootPath + '/es/hash'
        this.$http.get(path)
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
      alertSelectedUids () {
        alert(this.selection.map(({ uid }) => uid))
      },test(){
        alert("test")
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

</style>
