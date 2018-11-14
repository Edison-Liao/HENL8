/** layuiAdmin.std-v1.0.0 LPPL License By http://www.layui.com/admin/ */
 ;"use strict";layui.config({base:"../../../layuiadmin/"}).extend({index:"lib/index"}).use(["index","table","form","consts","common"],function(){var e=layui.$,t=layui.table,a=layui.form,i=layui.common,n=(layui.laypage,{baseUrl:layui.setter.revenueUrl}),l={},d={},o={},r={},s={},u={getReadPoint:function(e){i.ajaxFun("get","/api/ReadingPoint/query/key?Data.id="+e+"&Method=key","",n).then(function(e){i.appResult.isSucceeded(e)?e.Result.Me.Name:i.appResult.loadErrorText(e)}).fail(function(e){console.log(e)})},getArea:function(e){i.ajaxFun("get","/api/Area/query/key?Data.id="+e+"&Method=key","",n).then(function(e){i.appResult.isSucceeded(e)?e.Result.Me.Name:i.appResult.loadErrorText(e)}).fail(function(e){console.log(e)})},getAllAvailableArea:function(e){i.ajaxFun("get","/api/Area/query/all?Data.AreaType="+e.type+"&Data.Status="+e.status+"&Method=all","",n).then(function(t){if(i.appResult.isSucceeded(t)){var a={element:e.name,items:t.Result};p.renderSelect(a)}else i.appResult.loadErrorText(t)}).fail(function(e){console.log(e)})},getAllAvailableReadPt:function(e){console.info(e),i.ajaxFun("get","/api/ReadingPoint/query/all?Data.Area_Id_Village="+e.id+"&Data.Status="+e.status+"&Method=all","",n).then(function(e){if(i.appResult.isSucceeded(e)){var t={element:"#Area_Id_ReadingPoint",items:e.Result};p.renderSelect(t)}else i.appResult.loadErrorText(e)}).fail(function(e){console.log(e)})},getAddtype:function(e){i.ajaxFun("get","/api/Address/addresstype?Method=addresstype","",n).then(function(e){if(i.appResult.isSucceeded(e)){r=e;var t={element:"#AddressType",items:e.Result};p.renderAddSelect(t)}else i.appResult.loadErrorText(e)}).fail(function(e){console.log(e)})},getAreaTypeObj:function(){i.ajaxFun("get","/api/Area/areatype?Method=areatype","",n).then(function(e){if(i.appResult.isSucceeded(e)){var t=i.findObjectByKeyVal(o,"Text","启用");l=i.findObjectByKeyVal(e,"Text","小区"),d=i.findObjectByKeyVal(e,"Text","楼栋");var a={name:"#Area_Id_Village",status:t.Value,type:l.Value},n={name:"#Area_Id_Building",status:t.Value,type:d.Value};u.getAllAvailableArea(a),u.getAllAvailableArea(n)}else i.appResult.loadErrorText(e)}).fail(function(e){console.log(e)})},getAllAvailableRsd_Bld:function(){i.ajaxFun("get","/api/Area/areastatus?Method=areastatus","",n).then(function(e){i.appResult.isSucceeded(e)?(o=e,u.getAreaTypeObj()):i.appResult.loadErrorText(e)}).fail(function(e){console.log(e)})},getAllAvailableReadPtByRsd:function(e){i.ajaxFun("get","/api/ReadingPoint/readingpointstatus?Method=readingpointstatus","",n).then(function(t){if(i.appResult.isSucceeded(t)){s=t;var a=i.findObjectByKeyVal(s,"Text","启用"),n={id:e,status:a.Value};u.getAllAvailableReadPt(n)}else i.appResult.loadErrorText(t)}).fail(function(e){console.log(e)})},add:function(a){layer.closeAll();var l=layui.consts.basePostData();l.Data=a,l.Method="insert";var d=JSON.stringify(l);i.ajaxFun("post","/api/address/insert",d,n).then(function(a){i.appResult.isSucceeded(a)?(t.reload("LAY-dizhiTable"),e("#lock-from").find("input[type=text],select,input[type=hidden]").each(function(){e(this).val("")}),layer.msg("数据添加成功!",{icon:6})):i.appResult.loadErrorText(a)}).fail(function(e){console.log(e)})},"delete":function(e){layer.closeAll(),layer.load(0,{shade:!1});var a=layui.consts.basePostData();console.info(e.Me),a.Data={Id:e.Me.Id,CompanyId:""},a.Method="remove";var l=JSON.stringify(a);console.info(l),i.ajaxFun("delete","/api/Address/remove",l,n).then(function(e){i.appResult.isSucceeded(e)?(t.reload("LAY-dizhiTable"),layer.msg("数据删除成功!",{icon:6})):i.appResult.loadErrorText(e)}).fail(function(e){console.log(e)})},edit:function(l){layui.consts.basePostData();i.ajaxFun("get","/api/Address/query/key?Data.Id="+l.Id+"&Method=key","",n).then(function(d){if(i.appResult.isSucceeded(d)){var d=d.Result;layer.open({type:1,title:"修改地址档案",content:e("#lock-from"),maxmin:!0,area:["800px","500px"],btn:["确定","取消"],yes:function(d,o){var r=e("#LAY-dizhi-add-submit");a.on("submit(LAY-dizhi-add-submit)",function(a){var d=a.field;console.info(d),d.AddressStatus="on"==d.AddressStatus?1:2,d.AddressType=Number(d.AddressType),d.AccountDay=Number(d.AccountDay),d.Area_Id_Building="全部"==d.Area_Id_Building?"":d.Area_Id_Building,d.Area_Id_ReadingPoint="全部"==d.Area_Id_ReadingPoint?"":d.Area_Id_ReadingPoint,console.info(d),"全部"==d.AddressType&&layer.msg("请选择地址类型",{icon:5}),"全部"==d.Area_Id_Village&&layer.msg("请选择小区",{icon:5});var o=layui.consts.basePostData();o.Data=d,o.Data.Id=l.Id,o.Method="update";var r=JSON.stringify(o);console.info("data",r),i.ajaxFun("put","/api/Address/update",r,n).then(function(a){i.appResult.isSucceeded(a)?(t.reload("LAY-dizhiTable"),e("#lock-from").find("input[type=text],select,input[type=hidden]").each(function(){e(this).val("")}),layer.msg("数据更新成功!",{icon:6})):i.appResult.loadErrorText(a)}).fail(function(e){console.log(e)})}),layer.close(d),r.trigger("click")}}),d.Area_Id_ReadingPointName&&(e("#Area_Id_ReadingPoint").removeAttr("disabled"),e(Area_Id_ReadingPoint).append("<option &nbsp; value="+d.Me.Area_Id_ReadingPoint+">"+d.Area_Id_ReadingPointName+"</option>")),"2"===d.Me.AddressType?(e("#Area_Id_Building").attr("disabled","disabled"),e("#UnitNo").attr("disabled","disabled"),e("#FloorNo").attr("disabled","disabled"),e("#RoomNo").attr("disabled","disabled")):(e("#Area_Id_Building").removeAttr("disabled"),e("#RoomNo").removeAttr("disabled"),e("#FloorNo").removeAttr("disabled"),e("#UnitNo").removeAttr("disabled")),a.val("lock-from",{AddressStatus:"正常"==d.Me.AddressStatusName?"on":"off",AddressType:d.Me.AddressType,Area_Id_Village:d.Me.Area_Id_Village,Area_Id_ReadingPoint:d.Me.Area_Id_ReadingPoint,Area_Id_Building:d.Me.Area_Id_Building,UnitNo:d.Me.UnitNo,FloorNo:d.Me.FloorNo,RoomNo:d.Me.RoomNo,Address:d.Me.Address,AccountDay:d.Me.AccountDay,SortNum:d.Me.SortNum,Description:d.Me.Description}),a.render("select")}else i.appResult.loadErrorText(d)}).fail(function(e){console.log(e)})}},c={batchdel:function(){var e=t.checkStatus("LAY-user-manage"),a=e.data;return 0===a.length?layer.msg("请选择数据"):(layer.close(index),void layer.confirm("确定删除吗？",function(e){t.reload("LAY-user-manage"),layer.msg("已删除")}))},add:function(){layer.open({type:1,title:"添加地址",content:e("#lock-from"),maxmin:!0,area:["800px","500px"],btn:["确定","取消"],yes:function(t,l){var d=e("#LAY-dizhi-add-submit");a.on("submit(LAY-dizhi-add-submit)",function(e){var t=e.field;i.ajaxFun("get","/api/Common/GetInsertGuid","",n).then(function(e){i.appResult.isSucceeded(e)?(t.Idd=e.Result,t.AddressStatus="on"==t.AddressStatus?1:2,t.Area_Id_Building="全部"==t.Area_Id_Building?"":t.Area_Id_Building,t.Area_Id_ReadingPoint="全部"==t.Area_Id_ReadingPoint?"":t.Area_Id_ReadingPoint,"全部"==t.AddressType?layer.msg("请选择地址类型",{icon:5}):"全部"==t.Area_Id_Village?layer.msg("请选择小区",{icon:5}):u.add(t)):i.appResult.loadErrorText(e)}).fail(function(e){console.log(e)})}),d.trigger("click")}})}},p={renderSelect:function(t){e(t.element).html(""),e(t.element).append("<option selected>全部</option>");var i;for(var n in t.items)i+="<option  &nbsp; value="+t.items[n].Me.Id+">"+t.items[n].Me.Name+"</option>";e(t.element).append(i),a.render("select")},renderAddSelect:function(t){e(t.element).html(""),e(t.element).append("<option selected>全部</option>");var i;for(var n in t.items)i+="<option  &nbsp; value="+t.items[n].Value+">"+t.items[n].Text+"</option>";e(t.element).append(i),a.render("select")},renderTable:function(){t.render({elem:"#LAY-dizhiTable",id:"LAY-dizhiTable",url:layui.setter.revenueUrl+"/api/Address/query/list",where:{Method:"list"},parseData:layui.setter.parseData,request:layui.setter.request,page:!0,cols:[[{field:"Address",title:"地址",templet:function(e){return e.Me.Address}},{field:"Area_Id_ReadingPoint",title:"抄表点",templet:function(e){return e.Area_Id_ReadingPointName}},{field:"Area_Id_Village",title:"小区",templet:function(e){return e.Area_Id_VillageName}},{field:"Area_Id_Building",title:"楼栋",templet:function(e){return e.Area_Id_BuildingName}},{field:"AddressStatus",title:"地址状态",templet:function(e){return e.AddressStatusName}},{field:"AddressType",title:"地址类型",templet:function(e){return e.AddressTypeName}},{field:"AccountDay",title:"帐期",templet:function(e){return e.Me.AccountDay}},{field:"RoomNo",title:"房号",templet:function(e){return e.Me.RoomNo}},{field:"UnitNo",title:"单元号",templet:function(e){return e.Me.UnitNo}},{field:"FloorNo",title:"楼层",templet:function(e){return e.Me.FloorNo}},{title:"操作",fixed:"right",align:"center",width:160,toolbar:"#LAY-dizhiTable-barOperation"}]],loading:!0,limit:10,text:"对不起，加载出现异常！"})},init:function(){u.getAllAvailableRsd_Bld(),u.getAddtype(),p.renderTable()}};e(".layui-btn.layuiadmin-btn-useradmin").on("click",function(){var t=e(this).data("type");c[t]?c[t].call(this):""}),e(".layui-btn.LAY-xiaoqu-search-submit").on("click",function(t){layer.open({type:1,title:"查询营业网点",content:e("#lock-from-xiaoqu"),maxmin:!0,offset:"auto",zIndex:999999999,area:["800px","500px"],btn:["确定","取消"],yes:function(e,t){console.info(shebeiPar.BusinessHall_Name),a.val("lock-from",{BusinessHall_Name:shebeiPar.BusinessHall_Name}),layer.close(e)}})}),a.on("select(Area_Id_Village)",function(t){"全部"===t.value?e("#Area_Id_ReadingPoint").attr("disabled","disabled"):(e("#Area_Id_ReadingPoint").removeAttr("disabled"),u.getAllAvailableReadPtByRsd(t.value)),a.render("select")}),a.on("select(AddressType)",function(t){"2"===t.value?(e("#Area_Id_Building").attr("disabled","disabled"),e("#UnitNo").attr("disabled","disabled"),e("#FloorNo").attr("disabled","disabled"),e("#RoomNo").attr("disabled","disabled")):(e("#Area_Id_Building").removeAttr("disabled"),e("#RoomNo").removeAttr("disabled"),e("#FloorNo").removeAttr("disabled"),e("#UnitNo").removeAttr("disabled")),a.render("select")}),t.on("tool()",function(e){var t=e.data,a=e.event;e.tr;"del"===a?layer.confirm("真的删除行么",function(e){u["delete"](t),layer.close(e)}):"edit"===a&&u.edit(t.Me)}),p.init()});
//# sourceMappingURL=../src/maps/danganguanli/dizhiguanli.js.map