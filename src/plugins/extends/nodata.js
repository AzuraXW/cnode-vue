import noData from '@/components/noData'
import Vue from 'vue'
const NoData = Vue.extend(noData)

export default function (options) {
  const { container, icon, text } = options
  const nodata = new NoData({
    el: document.createElement('div'),
    data () {
      return {
        text,
        icon
      }
    }
  })
  const parentNode = document.querySelector(container)
  parentNode.appendChild(nodata.$el)
}
