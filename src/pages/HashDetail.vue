<template>
    <v-app>
    <div id="app">
        <v-text-field
                v-model="hashValue"
                label="SHA256 or MD5"
                @keydown="getData"
        ></v-text-field>
            <v-card
                    class="mx-auto"
            >
                <v-toolbar
                        color="indigo"
                        dark
                >
                    <v-toolbar-title>기본정보</v-toolbar-title>
                </v-toolbar>


                <v-list class="transparent">
                    <v-list-item
                            v-for="basic in items.basic"
                            :key="basic.name"
                    >
                    <v-list-item-title>{{ basic.name }}</v-list-item-title>
                    <v-list-item-subtitle>{{ basic.value }}</v-list-item-subtitle>

                    </v-list-item>
                </v-list>


            </v-card>

            <v-card
                    class="mx-auto"
            >
                <v-toolbar
                        color="green"
                        dark
                >
                    <v-toolbar-title>생성이력</v-toolbar-title>
                </v-toolbar>

                <v-list class="transparent">
                    <v-list-item
                            v-for="history in items.history"
                            :key="history.name"
                    >
                        <v-list-item-title>{{ history.name }}</v-list-item-title>
                        <v-list-item-subtitle>{{ history.value }}</v-list-item-subtitle>

                    </v-list-item>
                </v-list>

            </v-card>

            <v-card
                    class="mx-auto"
            >
                <v-toolbar
                        color="red"
                        dark
                >
                    <v-toolbar-title>위험도</v-toolbar-title>
                </v-toolbar>

                <v-list class="transparent">
                    <v-list-item
                            v-for="risk in items.risk"
                            :key="risk.name"
                    >
                        <v-list-item-title>{{ risk.name }}</v-list-item-title>
                        <v-list-item-subtitle>{{ risk.value }}</v-list-item-subtitle>

                    </v-list-item>
                </v-list>


            </v-card>
    </div>
    </v-app>
</template>

<script>
  export default {
    data () {
      return {
          hashValue:'',
          selectable : false,
          items: {
          }
      }
    },
    watch: {
    },
    methods: {
      getData(){

        let path = this.$rootPath + '/es/risk/'+ this.hashValue
        this.$http.get(path)
          .then(response => {
              console.log(response)
              this.items = response.data
          })
          .catch(error => {
              console.log('처리중 오류가 발생하였습니다. 관리자에게 문의 바랍니다.')
              console.log(error)
          })
      },
    }
  }
</script>
<style scoped>
  #app {
    padding-right: 15px;
    padding-left: 15px;
  }
</style>
