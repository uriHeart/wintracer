<template>
  <v-data-table
          :headers="headers"
          :items="items"
          :items-per-page="5"
          class="elevation-1"
          @click:row="click1"
  >
    <template slot="items" slot-scope="props" >

      <td >{{ props.item.event_id }}</td>
      <td>{{ props.item.kr_date_str }}</td>
      <td>{{ props.item.company }}</td>
      <td>{{ props.item.original_file_name }}</td>
      <td>{{ props.item.parent_process_id }}</td>
      <td>{{ props.item.parent_image }}</td>
      <td>{{ props.item.command_line }}</td>
    </template>
  </v-data-table>
</template>

<script>
  export default {
    data: () => ({
      indexId:'',
      searchText: '',
      dialog: true,
      totalItems:10,
      expand:true,
      headers: [
        {
          text: '이벤트 ID',
          align: 'left',
          sortable: false,
          value: 'event_id',
        },
        { text: '발생일시', value: 'kr_date_str' },
        { text: '관련조직', value: 'company' },
        { text: '파일명', value: 'original_file_name' },
        { text: '상위 실행 ID', value: 'parent_process_id' },
        { text: '상위 실행파일', value: 'parent_image' },
        { text: '실행 명령어', value: 'command_line' },

      ],
      items: [],
      editedIndex: -1,
      editedItem: {
        name: '',
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0,
      },
      defaultItem: {
        name: '',
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0,
      },
    }),
    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      },
    },
    watch: {
      dialog (val) {
        val || this.close()
      },
    },
    created () {
      this.initialize()
    },
    methods: {
      initialize () {
        let path = this.$rootPath + '/es/malicious'

        this.searchText ='ping'

        path = path +'/'+ this.searchText
        this.$http.get(path)
          .then(response => {
            this.items = response.data.datas
            console.log(this.items)
          })
          .catch(error => {
            console.log('처리중 오류가 발생하였습니다. 관리자에게 문의 바랍니다.')
          })
       },
      editItem (item) {
        this.editedIndex = this.items.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },
      deleteItem (item) {
        const index = this.items.indexOf(item)
        confirm('Are you sure you want to delete this item?') && this.items.splice(index, 1)
      },
      close () {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },
      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.items[this.editedIndex], this.editedItem)
        } else {
          this.items.push(this.editedItem)
        }
        this.close()
      },
      click1(row){
        let path = this.$rootPath + '/es/malicious/tree/' +row.id

        this.$http.get(path)
            .then(response => {
              console.log( response.data)
              this.$store.state.treeItems = response.data

            })
            .catch(error => {
              console.log('처리중 오류가 발생하였습니다. 관리자에게 문의 바랍니다.')
              console.log(error)
            })
      }
    },
  }
</script>
<style>
  tbody tr:nth-of-type(odd) {
    background-color: rgba(0, 0, 0, .05);
  }
</style>
