(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["login"],{"53bf":function(e,t,n){},a55b:function(e,t,n){"use strict";n.r(t);var o=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"login"},[n("el-form",{ref:"form",attrs:{"label-width":"120px",model:e.loginModel,rules:e.rules}},[n("el-form-item",{attrs:{label:"AccessToken",prop:"accesstoken"}},[n("el-input",{model:{value:e.loginModel.accesstoken,callback:function(t){e.$set(e.loginModel,"accesstoken",t)},expression:"loginModel.accesstoken"}})],1),n("el-form-item",[n("el-checkbox",{model:{value:e.remember,callback:function(t){e.remember=t},expression:"remember"}},[e._v("下次免登录")])],1),n("el-form-item",[n("el-button",{attrs:{type:"primary"},on:{click:e.onSubmit}},[e._v("登录")])],1)],1)],1)},r=[],c=n("60b5"),s=n("6abc"),a=(n("6a61"),n("5880")),i=n("231d"),l={props:["from"],created:function(){this.changeTitle("用户登录")},data:function(){return{loginModel:{accesstoken:""},remember:!1,rules:{accesstoken:[{required:!0,message:"请输入accesstoken",trigger:"change"}]}}},methods:Object(s["a"])(Object(s["a"])({},Object(a["mapMutations"])(["setLoginStatus","setUserInfo"])),{},{onSubmit:function(){var e=this;this.$refs.form.validate(function(){var t=Object(c["a"])(regeneratorRuntime.mark((function t(n){var o;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(!n){t.next=5;break}return t.next=3,Object(i["a"])(e.loginModel.accesstoken);case 3:o=t.sent,o&&(localStorage.setItem("accesstoken",e.loginModel.accesstoken),e.$router.push(e.from||"/"));case 5:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}())}}),computed:Object(a["mapState"])(["loginStatus"])},u=l,m=(n("cc6a"),n("5d22")),b=Object(m["a"])(u,o,r,!1,null,"3b0b1330",null);t["default"]=b.exports},cc6a:function(e,t,n){"use strict";n("53bf")}}]);