import Vue from 'vue'
import {
  Button,
  Col,
  Row,
  Card,
  Scrollbar,
  Loading,
  InfiniteScroll,
  Notification,
  Backtop,
  Avatar,
  Link,
  Form,
  FormItem,
  Input,
  Checkbox,
  Dropdown,
  Popover,
  Message,
  Select,
  Option,
  Dialog
} from 'element-ui'

Vue.use(Button)
Vue.use(Col)
Vue.use(Row)
Vue.use(Card)
Vue.use(Scrollbar)
Vue.use(Loading)
Vue.use(InfiniteScroll)
Vue.use(Backtop)
Vue.use(Avatar)
Vue.use(Link)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Checkbox)
Vue.use(Dropdown)
Vue.use(Popover)
Vue.use(Select)
Vue.use(Option)
Vue.use(Dialog)
Vue.prototype.$notify = Notification
Vue.prototype.$msg = Message
