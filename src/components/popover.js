import Vue from 'vue'
import popover from './popover.vue'

const Popover = Vue.extend(popover)

function popoverFunc () {
  const popoverInstance = new Popover()
  return popoverInstance.$mount()
}

export default popoverFunc()
