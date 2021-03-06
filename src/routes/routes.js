import DashboardLayout from '../layout/DashboardLayout.vue'
// GeneralViews
import NotFound from '../pages/NotFoundPage.vue'

// Admin pages
import Overview from 'src/pages/Overview.vue'
import UserProfile from 'src/pages/UserProfile.vue'
import TableList from 'src/pages/TableList.vue'
import SearchLog from 'src/pages/SearchLog.vue'
import SearchLogVuetify from 'src/pages/SearchLogVuetify.vue'

import Typography from 'src/pages/Typography.vue'
import Icons from 'src/pages/Grid.vue'
import LogTrace from 'src/pages/LogTrace.vue'
import Notifications from 'src/pages/Notifications.vue'
import Upgrade from 'src/pages/Upgrade.vue'
import HashDetail from 'src/pages/HashDetail.vue'
import SshLevelC from 'src/pages/SshLevelC.vue'
import Vpn from 'src/pages/Vpn.vue'
import Usb from 'src/pages/Usb.vue'
import SmartPhone from 'src/pages/SmartPhone.vue'


const routes = [
  {
    path: '/',
    component: DashboardLayout,
    redirect: '/admin/overview'
  },
  {
    path: '/admin',
    component: DashboardLayout,
    redirect: '/admin/overview',
    children: [
      {
        path: 'overview',
        name: 'Overview',
        component: Overview
      },
      {
        path: 'user',
        name: 'User',
        component: UserProfile
      },
      {
        path: 'table-list',
        name: 'Table List',
        component: TableList
      },
      {
        path: 'search-log',
        name: 'SearchLog',
        component: SearchLog
      },
      {
        path: 'search-log-vuetify',
        name: 'SearchLogVuetify',
        component: SearchLogVuetify
      },
      {
        path: 'typography',
        name: 'Typography',
        component: Typography
      },
      {
        path: 'icons',
        name: 'Icons',
        component: Icons
      },
      {
        path: 'LogTrace',
        name: 'LogTrace',
        component: LogTrace
      },
      ,
      {
        path: 'ssh/level/c',
        name: 'SshLevelC',
        component: SshLevelC
      },
      {
        path: 'notifications',
        name: 'Notifications',
        component: Notifications
      },
      {
        path: 'upgrade',
        name: 'Upgrade to PRO',
        component: Upgrade
      },
      {
        path: 'hash-detail',
        name: 'detail',
        component: HashDetail
      },
      {
        path: 'vpn',
        name: 'vpn',
        component: Vpn
      },
      {
        path: 'usb',
        name: 'usb',
        component: Usb
      },
      {
        path: 'smart/phone',
        name: 'smart phone',
        component: SmartPhone
      }
    ]
  },
  { path: '*', component: NotFound }
]

/**
 * Asynchronously load view (Webpack Lazy loading compatible)
 * The specified component must be inside the Views folder
 * @param  {string} name  the filename (basename) of the view to load.
function view(name) {
   var res= require('../components/Dashboard/Views/' + name + '.vue');
   return res;
};**/

export default routes
