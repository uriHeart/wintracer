<template>
        <v-treeview
                open-all
                activatable
                return-object
                @click="getData"
                @input="getData"
                :items="items"
        ></v-treeview>
</template>

<script>
  export default {
    data () {
      return {
          open: ['public'],
          items:[
              {
                  id: 1,
                  name: '악성프로그램',
                  children: [
                      {
                          id: 2,
                          name: '실행프로그램',
                          children: [
                              {
                                  id: 3,
                                  name: '실행명령어'
                              },
                          ],
                      }]
              }
          ]
      }
    },
    watch: {
        '$store.state.treeItems': function () {
            this.items =this.$store.state.treeItems
         }
    },
    methods: {
      getData(){
          console.log('처리중 오류가 발생하였습니다. 관리자에게 문의 바랍니다.')


      }
    }

  }
</script>
<style scoped>

</style>
