/** layuiAdmin.std-v1.0.0 LPPL License By http://www.layui.com/admin/ */
 ;"use strict";layui.config({base:"../../../layuiadmin/"}).extend({index:"lib/index"}).use(["index","table","layer","common"],function(){var e=(layui.$,layui.form,layui.common),a=layui.table,t=layui.layer,l={baseUrl:layui.setter.readmeterplanUrl},n={getReadMeterPlan:function(a){e.ajaxFun("get","api/ReadMeterPlan/query/key?Data.Id="+a+"&Method=key","",l).then(function(a){e.appResult.isSucceeded(a)?console.log(a.Result):e.appResult.loadErrorText(a)}).fail(function(e){console.log(e)})},getExport:function(a){e.ajaxFun("get","/api/ReadMeterPlan/query/export","",l).then(function(a){console.log(a),e.appResult.isSucceeded(a)?console.log(a.Result):e.appResult.loadErrorText(a)}).fail(function(e){console.log(e)})},renderTable:function(){a.render({elem:"#ReadMeterPlan",id:"ReadMeterPlan",url:layui.setter.readmeterplanUrl+"api/ReadMeterPlan/query/list",where:{Method:"list"},parseData:layui.setter.parseData,request:layui.setter.request,page:!0,cols:[[{field:"ReadMeterPlanZTBZ",title:"重新规划",templet:function(e){return console.log(e),e.Me.ReadMeterPlanZTBZ}}]],loading:!0,limit:10,text:"对不起，加载出现异常！"})},add:function(a){t.closeAll();var n=layui.consts.basePostData();n.Data=a,n.Method="insert";var o=JSON.stringify(n);console.log(o),e.ajaxFun("post","api/ReadMeterPlan/insert",o,l).then(function(a){e.appResult.isSucceeded(a)||e.appResult.loadErrorText(a)}).fail(function(e){console.log(e)})}};n.getReadMeterPlan("6B863A23-46FB-4129-A1EF-F56F906A6CC6"),n.renderTable()});
//# sourceMappingURL=../src/maps/readmeterplan/readmeterplan.js.map