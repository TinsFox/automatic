(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1e68f721"],{"48fb":function(e,t,n){"use strict";n.d(t,"c",(function(){return a})),n.d(t,"a",(function(){return r})),n.d(t,"d",(function(){return o})),n.d(t,"e",(function(){return c})),n.d(t,"b",(function(){return s}));var i=n("b775");function a(e){return Object(i["a"])({url:"/statistics/time?start_time="+e.start_time+"&end_time="+e.end_time,method:"get"})}function r(e){return Object(i["a"])({url:"/statistics/build?build="+e.build+"&start_time="+e.searchTimestamp.start_time+"&end_time="+e.searchTimestamp.end_time,method:"get"})}function o(e){return Object(i["a"])({url:"/statistics/device?device="+e.device+"&start_time="+e.searchTimestamp.start_time+"&end_time="+e.searchTimestamp.end_time,method:"get"})}function c(e){return Object(i["a"])({url:"/statistics/type",method:"get"})}function s(e){return Object(i["a"])({url:"/statistics/classroom",method:"get"})}},6724:function(e,t,n){"use strict";n("8d41");var i="@@wavesContext";function a(e,t){function n(n){var i=Object.assign({},t.value),a=Object.assign({ele:e,type:"hit",color:"rgba(0, 0, 0, 0.15)"},i),r=a.ele;if(r){r.style.position="relative",r.style.overflow="hidden";var o=r.getBoundingClientRect(),c=r.querySelector(".waves-ripple");switch(c?c.className="waves-ripple":(c=document.createElement("span"),c.className="waves-ripple",c.style.height=c.style.width=Math.max(o.width,o.height)+"px",r.appendChild(c)),a.type){case"center":c.style.top=o.height/2-c.offsetHeight/2+"px",c.style.left=o.width/2-c.offsetWidth/2+"px";break;default:c.style.top=(n.pageY-o.top-c.offsetHeight/2-document.documentElement.scrollTop||document.body.scrollTop)+"px",c.style.left=(n.pageX-o.left-c.offsetWidth/2-document.documentElement.scrollLeft||document.body.scrollLeft)+"px"}return c.style.backgroundColor=a.color,c.className="waves-ripple z-active",!1}}return e[i]?e[i].removeHandle=n:e[i]={removeHandle:n},n}var r={bind:function(e,t){e.addEventListener("click",a(e,t),!1)},update:function(e,t){e.removeEventListener("click",e[i].removeHandle,!1),e.addEventListener("click",a(e,t),!1)},unbind:function(e){e.removeEventListener("click",e[i].removeHandle,!1),e[i]=null,delete e[i]}},o=function(e){e.directive("waves",r)};window.Vue&&(window.waves=r,Vue.use(o)),r.install=o;t["a"]=r},8433:function(e,t,n){"use strict";n.r(t);var i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"app-container"},[n("div",{staticClass:"filter-container"},[n("el-button",{staticClass:"filter-item",attrs:{type:"primary"},on:{click:e.getDeviceList}},[e._v("\n      统计设备\n    ")]),e._v(" "),n("el-button",{staticClass:"filter-item",attrs:{type:"primary"},on:{click:e.getBuildList}},[e._v("\n      统计教学楼\n    ")]),e._v(" "),n("el-button",{staticClass:"filter-item",attrs:{type:"primary",loading:e.downloadLoading,icon:"el-icon-download"},on:{click:e.handleDownload}},[e._v("\n      订单数据导出\n    ")]),e._v(" "),n("span",{staticClass:"demonstration filter-container",staticStyle:{display:"flex","justify-content":"center",width:"auto"}},[e._v("\n      各"+e._s("device"===e.t?"设备":"教学楼")+"累计报修\n    ")])],1),e._v(" "),n("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],key:e.tableKey,attrs:{data:e.list,border:"",fit:"","highlight-current-row":""}},[n("el-table-column",{attrs:{label:"序号",type:"index",align:"center",width:"50"}}),e._v(" "),n("el-table-column",{attrs:{label:"device"===e.t?"设备名称":"教学楼",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var i=t.row;return[n("span",[e._v(e._s(i.name))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"累计次数",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var i=t.row;return[n("span",[e._v(e._s(i.total))])]}}])})],1),e._v(" "),n("ve-pie",{attrs:{data:e.chartData}})],1)},a=[],r=n("6724"),o=n("48fb"),c=n("f8b7"),s={name:"UserTable",directives:{waves:r["a"]},data:function(){return{t:"device",chartData:{columns:["name","total"],rows:[]},value:"",tableKey:0,list:null,total:0,listLoading:!0,dialogFormVisible:!1,dialogStatus:"",downloadLoading:!1}},created:function(){this.getDeviceList()},methods:{handleDownload:function(){var e=this;this.downloadLoading=!0,Object(c["d"])().then((function(t){var n=new Blob([t]),i="订单记录.xlsx",a=document.createElement("a");a.download=i,a.style.display="none",a.href=URL.createObjectURL(n),document.body.appendChild(a),a.click(),URL.revokeObjectURL(a.href),document.body.removeChild(a),e.downloadLoading=!1}))},formData:function(e){var t=[];for(var n in e){var i={};i.name=n,i.total=e[n],t.push(i)}return t},getDeviceList:function(){var e=this;this.listLoading=!0,this.t="device",Object(o["e"])().then((function(t){e.list=e.formData(t.data),console.log(e.list),e.chartData.rows=e.list,setTimeout((function(){e.listLoading=!1}),500)}))},getBuildList:function(){var e=this;this.listLoading=!0,this.t="build",console.log(this.t),Object(o["b"])().then((function(t){e.list=e.formData(t.data),console.log(e.list),e.chartData.rows=e.list,setTimeout((function(){e.listLoading=!1}),500)}))}}},l=s,u=(n("d94a"),n("2877")),d=Object(u["a"])(l,i,a,!1,null,null,null);t["default"]=d.exports},"8d41":function(e,t,n){},"8fd6":function(e,t,n){},d94a:function(e,t,n){"use strict";var i=n("8fd6"),a=n.n(i);a.a},f8b7:function(e,t,n){"use strict";n.d(t,"e",(function(){return a})),n.d(t,"d",(function(){return r})),n.d(t,"l",(function(){return o})),n.d(t,"c",(function(){return c})),n.d(t,"k",(function(){return s})),n.d(t,"b",(function(){return l})),n.d(t,"g",(function(){return u})),n.d(t,"h",(function(){return d})),n.d(t,"f",(function(){return m})),n.d(t,"j",(function(){return p})),n.d(t,"i",(function(){return f})),n.d(t,"a",(function(){return g}));var i=n("b775");function a(e){return Object(i["a"])({url:"/repair_item/missed_orders?page="+e.page,method:"get"})}function r(e){return Object(i["a"])({url:"/repair_item/excel",method:"get",responseType:"blob"})}function o(e){return Object(i["a"])({url:"/repair_item/actions/order?repair_item_id="+e,method:"put"})}function c(e){return Object(i["a"])({url:"/repair_item/actions/complete?repair_item_id="+e,method:"put"})}function s(e){return Object(i["a"])({url:"/repair_item/actions/maintenance_cancel?repair_item_id="+e,method:"put"})}function l(e){return Object(i["a"])({url:"/repair_item/actions/cancel_repair?repair_item_id="+e,method:"put"})}function u(e){return Object(i["a"])({url:"/repair_item/my/missed_orders?page="+e.page,method:"get"})}function d(e){switch(e.key){case"订单号":return Object(i["a"])({url:"/repair_item/actions/search",method:"get",params:{repair_item_id:e.value,page:e.page,range:e.range}});case"接单人学号":return Object(i["a"])({url:"/repair_item/actions/search",method:"get",params:{repair_item_id:e.value,page:e.page,range:e.range}});case"下单人姓名":return Object(i["a"])({url:"/repair_item/actions/search",method:"get",params:{repair_item_id:e.value,page:e.page,range:e.range}});case"接单人姓名":return Object(i["a"])({url:"/repair_item/actions/search",method:"get",params:{repair_item_id:e.value,page:e.page,range:e.range}})}}function m(e){return Object(i["a"])({url:"/repair_item/my/processed_orders?page="+e.page,method:"get"})}function p(e){return Object(i["a"])({url:"/repair_item/id/missed_orders?page="+e.page,method:"get"})}function f(e){return Object(i["a"])({url:"/repair_item/id/processed_orders?page="+e.page,method:"get"})}function g(e){return Object(i["a"])({url:"/repair_item",method:"post",data:e})}}}]);