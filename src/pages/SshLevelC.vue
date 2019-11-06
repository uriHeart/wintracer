<template>
  <div id="data-table">
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
        tblClass: 'table-bordered',
        tblStyle: 'table-layout: fixed', // must
        Pagination:true,
        pageSizeOptions: [10, 20, 50, 100],
        columns:  [
            { title: '이벤트 ID', field: 'event_id',colStyle:{width:'5%'}},
            { title: '접속대상 IP', field: 'destination_ip',colStyle:{width:'10%'}},
            { title: 'ssh 접속 IP', field: 'source_ip',colStyle:{width:'10%'}},
            { title: '이벤트 발생 시간', field: 'timestamp',colStyle:{width:'10%'}, sortable: true},
            { title: '접속 사용자', field: 'user',colStyle:{width:'15%'}},
            { title: '접속 실행 프로그램', field: 'image',colStyle:{width:'15%'}}

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
        xprops: {
          eventbus: new Vue()
        },
        hashValue:'',

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

        let path = this.$rootPath + '/es/ssh/attach/same/co'
        if(this.hashValue != ''){
            path = path +'/'+ this.hashValue
        }

        this.$http.get(path)
          .then(response => {
              console.log(response.data)
              this.data = response.data.datas
              this.origin_data = response.data.datas
              this.total = response.data.total
              this.handleDataChange()

          })
          .catch(error => {
              console.log('처리중 오류가 발생하였습니다. 관리자에게 문의 바랍니다.')
              console.log(error)
          })
      },
      alertSelectedUids () {
        alert(this.selection.map(({ uid }) => uid))
      },test(){
          this.getData();
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
