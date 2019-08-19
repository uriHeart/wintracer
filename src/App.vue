<template>
  <v-app>
  <div :class="{'nav-open': $sidebar.showSidebar}">
    <notifications></notifications>
    <router-view></router-view>
  </div>
  </v-app>
</template>

<script>
  import Datatable from 'vue2-datatable-component'
  import Vue from 'vue'
  import Opt from './components/comps/td-Opt'
  import DisplayRow from './components/comps/nested-DisplayRow'
  import Color from './components/comps/td-Color'
  import CreatetimeTd from './components/comps/td-Createtime'
  import CreatetimeTh from './components/comps/th-Createtime'
  import Email from './components/comps/td-Email'
  import IP from './components/comps/td-IP'
  import FilterTh from './components/comps/th-Filter'
  import VTooltip from 'v-tooltip'
  import SlimDialog from 'v-slim-dialog'

  Vue.use(SlimDialog)
  Vue.use(VTooltip)

  window.Vue = Vue
  Vue.use(Datatable)

  Vue.component('Opt',Opt)
  Vue.component('DisplayRow',DisplayRow)
  Vue.component('Color',Color)
  Vue.component('CreatetimeTd',CreatetimeTd)
  Vue.component('CreatetimeTh',CreatetimeTh)
  Vue.component('Email',Email)
  Vue.component('IP',IP)
  Vue.component('FilterTh',FilterTh)

  export default {}
</script>
<style lang="scss">
  .vue-notifyjs.notifications{
    .list-move {
      transition: transform 0.3s, opacity 0.4s;
    }
    .list-item {
      display: inline-block;
      margin-right: 10px;

    }
    .list-enter-active {
      transition: transform 0.2s ease-in, opacity 0.4s ease-in;
    }
    .list-leave-active {
      transition: transform 1s ease-out, opacity 0.4s ease-out;
    }

    .list-enter {
      opacity: 0;
      transform: scale(1.1);

    }
    .list-leave-to {
      opacity: 0;
      transform: scale(1.2, 0.7);
    }
  }
</style>
