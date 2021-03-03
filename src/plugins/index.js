import { dateSub } from './filters/date'
import { response } from './directives/response'
import api from '../api'
// import noData from './extends/nodata'
import noData from '@/components/noData'

export default function (Vue, options) {
  Vue.filter('datesub', dateSub)
  Vue.directive('response', response)
  Vue.prototype.$api = api
  // Vue.prototype.$noData = noData
  Vue.component('noData', noData)
}
