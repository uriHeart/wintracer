<template>
  <div class="wrapper">
    <side-bar>
      <mobile-menu slot="content"></mobile-menu>
      <sidebar-link to="/admin/overview">
        <i class="nc-icon nc-chart-pie-35"></i>
        <p>Dashboard</p>
      </sidebar-link>
      <!--<sidebar-link to="/admin/user">-->
        <!--<i class="nc-icon nc-circle-09"></i>-->
        <!--<p>User Profile</p>-->
      <!--</sidebar-link>-->
      <sidebar-link to="/admin/table-list">
        <i class="nc-icon nc-notes"></i>
        <p>Hash List</p>
      </sidebar-link>
      <sidebar-link to="/admin/search-log">
        <i class="nc-icon nc-notes"></i>
        <p>Search log</p>
      </sidebar-link>

      <!--<sidebar-link to="/admin/search-log-vuetify">-->
        <!--<i class="nc-icon nc-notes"></i>-->
        <!--<p>Search log vuetify</p>-->
      <!--</sidebar-link>-->


      <!--<sidebar-link to="/admin/typography">-->
        <!--<i class="nc-icon nc-paper-2"></i>-->
        <!--<p>Typography</p>-->
      <!--</sidebar-link>-->
      <!--<sidebar-link to="/admin/icons">-->
        <!--<i class="nc-icon nc-atom"></i>-->
        <!--<p>Icons</p>-->
      <!--</sidebar-link>-->
      <sidebar-link to="/admin/LogTrace">
        <i class="nc-icon nc-pin-3"></i>
        <p>LogTrace</p>
      </sidebar-link>
      <!--<sidebar-link to="/admin/notifications">-->
        <!--<i class="nc-icon nc-bell-55"></i>-->
        <!--<p>Notifications</p>-->
      <!--</sidebar-link>-->

        <sidebar-link class="active"
                      to="/admin/hash-detail">
          <i class="nc-icon nc-alien-33"></i>
          <p>Hash Detail</p>
        </sidebar-link>

      <!--<template slot="bottom-links">-->
        <!--<sidebar-link class="active"-->
                      <!--to="/admin/upgrade">-->
          <!--<i class="nc-icon nc-alien-33"></i>-->
          <!--<p>Upgrade to PRO</p>-->
        <!--</sidebar-link>-->
      <!--</template>-->
      <v-flex xs12>
        <v-img
                :src="require('../../public/img/logo.svg')"
                class="my-3"
                contain
                height="200"
        ></v-img>
      </v-flex>
    </side-bar>
    <div class="main-panel">
      <top-navbar></top-navbar>

      <dashboard-content @click="toggleSidebar">

      </dashboard-content>

      <content-footer></content-footer>
    </div>
  </div>
</template>
<style lang="scss">

</style>
<script>
  import TopNavbar from './TopNavbar.vue'
  import ContentFooter from './ContentFooter.vue'
  import DashboardContent from './Content.vue'
  import MobileMenu from './MobileMenu.vue'
  export default {
    data(){
      return  {
        type: ['', 'info', 'success', 'warning', 'danger']
      }
    },
    components: {
      TopNavbar,
      ContentFooter,
      DashboardContent,
      MobileMenu
    },
    methods: {
      toggleSidebar () {
        if (this.$sidebar.showSidebar) {
          this.$sidebar.displaySidebar(false)
        }
      },
      notifyVue (verticalAlign, horizontalAlign,data) {
        const color = Math.floor((Math.random() * 4) + 1)
        this.$notifications.notify(
                {
                  message: `<span>${data.json_data.Product} <b>${data.json_data.Image}</b></span>`,
                  icon: 'nc-icon nc-app',
                  horizontalAlign: horizontalAlign,
                  verticalAlign: verticalAlign,
                  type: this.type[color]
                })
      }
    },
    sockets: {
      response1: function (data) {
        this.notifyVue('top', 'right',data)
        console.log(data)
      },
      customEmit: function (data) {
        console.log('this method was fired by the socket server. eg: io.emit("customEmit", data)',data)
      }
    }
  }

</script>
