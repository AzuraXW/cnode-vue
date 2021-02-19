import { dateSub } from './filters/date'
import { response } from './directives/response'
import api from '../api'

export default function (Vue, options) {
  Vue.filter('datesub', dateSub)
  Vue.directive('response', response)
  Vue.prototype.$api = api
}
