<template>
  <div id="data-table">
    <v-layout wrap>
        <v-text-field
            v-model="hashValue"
            label="SHA256 or MD5"
            @keydown.enter="getData"
        ></v-text-field>
        <v-btn
            @click="getData"
        >Search
        </v-btn>
    </v-layout>
      <v-treeview :items="items">

      </v-treeview>
  </div>
</template>

<script>
  export default {
      data: () => ({
          items: [
              {
                  id: 1,
                  name: 'Applications :',
                  children: [
                      { id: 2, name: 'Calendar : app' },
                      { id: 3, name: 'Chrome : app' },
                      { id: 4, name: 'Webstorm : app' },
                  ],
              },
              {
                  id: 5,
                  name: 'Documents :',
                  children: [
                      {
                          id: 6,
                          name: 'vuetify :',
                          children: [
                              {
                                  id: 7,
                                  name: 'src :',
                                  children: [
                                      { id: 8, name: 'index : ts' },
                                      { id: 9, name: 'bootstrap : ts' },
                                  ],
                              },
                          ],
                      },
                      {
                          id: 10,
                          name: 'material2 :',
                          children: [
                              {
                                  id: 11,
                                  name: 'src :',
                                  children: [
                                      { id: 12, name: 'v-btn : ts' },
                                      { id: 13, name: 'v-card : ts' },
                                      { id: 14, name: 'v-window : ts' },
                                  ],
                              },
                          ],
                      },
                  ],
              },
              {
                  id: 15,
                  name: 'Downloads :',
                  children: [
                      { id: 16, name: 'October : pdf' },
                      { id: 17, name: 'November : pdf' },
                      { id: 18, name: 'Tutorial : html' },
                  ],
              },
              {
                  id: 19,
                  name: 'Videos :',
                  children: [
                      {
                          id: 20,
                          name: 'Tutorials :',
                          children: [
                              { id: 21, name: 'Basic layouts : mp4' },
                              { id: 22, name: 'Advanced techniques : mp4' },
                              { id: 23, name: 'All about app : dir' },
                          ],
                      },
                      { id: 24, name: 'Intro : mov' },
                      { id: 25, name: 'Conference introduction : avi' },
                  ],
              },
          ],
      }),
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
      getData(){

        let path = this.$rootPath + '/es/hashes'
        if(this.hashValue != ''){
            path = path +'/'+ this.hashValue
        }

        this.$http.get(path)
          .then(response => {
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
