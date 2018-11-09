/** layuiAdmin.std-v1.0.0 LPPL License By http://www.layui.com/admin/ */
 ;"use strict";layui.config({base:"../../../layuiadmin/"}).extend({index:"lib/index"}).use(["index","table","consts","common","haderSerch","laydate"],function(){var e=layui.$,a=layui.form,t=layui.consts,n=layui.common,i=layui.table;layui.haderSerch("#headerSerch",{isRenderdate:{render:"请选择日期"},data:[{key:"关键字1"},{isrender:"范围"},{demo:"德玛"}]}),dataBen=t.basePostData("CompanyPageSearch"),delete dataBen.IsEncryption;var o={key:"",DatetimeBegin:"20180511",DatetimeEnd:"20191230",PageIndex:1,PageSize:1};dataBen.Data=o;i.render({elem:"#LAY-user-manage",url:layui.setter.baseUrl+"/api/Tenant/company/info/search",where:{Sign:t.basePostData("CompanyPageSearch").Sign,Method:t.basePostData("CompanyPageSearch").Method,Timestamp:t.basePostData("CompanyPageSearch").Timestamp,"Data.DatetimeBegin":o.DatetimeBegin,"Data.DatetimeEnd":o.DatetimeEnd,"Data.PageIndex":o.PageIndex,"Data.PageSize":o.PageSize},parseData:layui.setter.parseData,cols:[[{field:"ComCoding",width:100,title:"公司编码"},{field:"ComName",title:"公司名称",minWidth:100},{field:"ComPassword",title:"公司密码"},{field:"SassPassword",title:"sass平台密码"},{field:"ProvinceName",title:"所在省市",templet:function(e){return"<div>"+e.ProvinceName+"/"+e.CityName+"</div>"}},{field:"CreateDate",title:"创建日期",sort:!0,templet:function(e){return"<div>"+layui.util.toDateString(e.CreateDate)+"</div>"}},{field:"公司状态",title:"公司状态",templet:function(e){return e.IsActived?'<a class="layui-btn layui-btn-normal layui-btn-xs" lay-event="unActived">已启用</a><a>'+layui.util.toDateString(e.ActivedTime)+"</a>":'<a class="layui-btn layui-btn-primary layui-btn-xs" lay-event="active">禁用中</a>'}},{title:"操作",width:150,align:"center",fixed:"right",toolbar:"#table-tool"}]],loading:!0,limit:10,text:{none:t.tabelNoneText}});a.on("submit(searchbtn)",function(e){var a=e.field;console.log(a,"搜索数据")}),i.on("tool(LAY-user-manage)",function(e){var a=e.data;"del"===e.event?r.event.del(a):"edit"===e.event?r.event.edit(a):"active"===e.event?r.event.active(a):"unActived"===e.event&&r.event.active(a)});var r={init:function(){},baseData:{nodeData:{},editFalge:!1},event:{del:function(e){layer.confirm("你确定要删除该数据吗?",{btn:["确定","取消"],icon:3},function(){console.log("确认",e),organ.server.delet({Id:e.Id})},function(){console.log("取消")})},add:function(e){r.baseData.editFalge=!1,r.render.openFrom({})},edit:function(e){r.baseData.editFalge=!0,r.render.openFrom(e)},active:function(e){console.log(e);var a=e.IsActived?"你确定要<strong>停用</strong>该数据吗?":"你确定要<strong>启用</strong>该数据吗?";layer.confirm(a,{btn:["确定","取消"],icon:3},function(){r.server.active({Id:e.Id,IsActived:!e.IsActived})},function(){console.log("取消")})}},server:{add:function(e){var a=layui.consts.basePostData("PushCompanyInfo");a.data=e;var t=JSON.stringify(a);n.ajaxFun("post","/api/Tenant/company/info/push",t).then(function(e){n.appResult.isSucceeded(e)?(layer.msg("添加成功!",{icon:6}),i.reload("LAY-user-manage")):(layer.msg("添加数据失败!",{icon:5}),n.appResult.loadErrorText(e))}).fail(function(e){console.log(e)})},eidt:function(e){var a=layui.consts.basePostData("UpdateCompanyInfo");a.data=e;var t=JSON.stringify(a);n.ajaxFun("put","/api/Tenant/company/info",t).then(function(e){n.appResult.isSucceeded(e)?(layer.msg("数据更新成功!",{icon:6}),i.reload("LAY-user-manage")):n.appResult.loadErrorText(e)}).fail(function(e){console.log(e)})},active:function(e){var a=layui.consts.basePostData("UpdateCompanyActived");a.data=e;var t=JSON.stringify(a);n.ajaxFun("put","/api/Tenant/company/info/actived",t).then(function(e){n.appResult.isSucceeded(e)?(layer.msg("数据更新成功!",{icon:6}),i.reload("LAY-user-manage")):n.appResult.loadErrorText(e)}).fail(function(e){console.log(e)})},delet:function(e){var a=layui.consts.basePostData("RemoveCompanyInfo");a.data=e;var t=JSON.stringify(a);n.ajaxFun("DELETE","/api/Tenant/company/info",t).then(function(e){n.appResult.isSucceeded(e)?(layer.msg("数据删除成功!",{icon:6}),i.reload("LAY-user-manage")):(layer.msg("数据删除成功!",{icon:5}),n.appResult.loadErrorText(e))}).fail(function(e){console.log(e)})}},render:{openFrom:function(a){var t=r.baseData.editFalge?"编辑租户":"添加租户",n=e.param(a);console.log(n);var i=r.baseData.editFalge?"../tpl/from/tenant.html?"+n:"../tpl/from/tenant.html";layer.open({type:2,title:t,content:i,maxmin:!0,area:["1000px","320px"],btn:["确定","取消"],yes:function(e,a){var t=window["layui-layer-iframe"+e],n="LAY-user-front-submit",i=a.find("iframe").contents().find("#"+n);t.layui.form.on("submit("+n+")",function(e){var a=e.field;console.log(a,"数据提交"),r.baseData.editFalge?r.server.eidt(a):r.server.add(a)}),i.trigger("click")}})}},currData:{}};e("body .layui-btn").on("click",function(){var a=e(this).data("type");r.event[a]?r.event[a].call(this):""})});
//# sourceMappingURL=../src/maps/platform/tenant.js.map