/** layuiAdmin.std-v1.0.0 LPPL License By http://www.layui.com/admin/ */
 ;"use strict";layui.config({base:"../../../layuiadmin/"}).extend({index:"lib/index"}).use(["index","table","layer","tree","jquery_ztree_excheck","utils","common"],function(){var e=layui.$,t=layui.form,n=layui.table,a=layui.layer,o=(layui.tree,layui.ztree,layui.jquery_ztree_excheck,layui.utils),i=(layui.common,[]);t.on("submit(Handler-search)",function(e){var t=e.field;console.log(e,"数据"),n.reload("areaFilesTable",{where:t})});n.render({elem:"#areaFilesTable",url:"http://192.168.5.242:60011/api/Area/query/list",parseData:function(e){return console.log(e,"自定义返回字段"),{code:1==e.IsSucceed?0:1,msg:e.Message,count:e.Result.length,data:e.Result.DataSource}},request:layui.setter.request,where:{Method:"list","Data.CompanyCoding":"string"},cols:[[{title:"所属公司",templet:function(e){return e.Me.CompanyName}},{field:"AreaTypeName",title:"区域类型"},{title:"区域名称",minWidth:100,templet:function(e){return e.Me.Name}},{title:"区域编码",templet:function(e){return e.Me.Coding}},{field:"StatusName",title:"区域状态"},{title:"创建时间",templet:function(e){return"<div>"+layui.util.toDateString(e.CreateDate)+"</div>"}},{title:"操作",width:150,align:"center",fixed:"right",toolbar:"#table-Handler"}]],loading:!0,page:!0,limit:10,text:{none:"暂无数据"}});n.on("tool(table-Handler)",function(e){if(console.log(e.event,"obj 监听工具条"),"delete"===e.event){var t="是否确认删除？";a.confirm(t,{icon:3,title:"删除提示"},function(t){console.log(e.data.Me.Id,"待删除的ID"),l.delArea({Method:"remove",Data:{Key:e.data.Me.Id}}),a.closeAll()})}"edit"===e.event&&r.edit({type:e.event,haveArray:!0,areaTypes:JSON.stringify(i),data:JSON.stringify([e.data.Me])})});var l={getAreaType:function(){o.request("/api/Area/areatype",{Method:"areatype"},"GET",function(e){if(console.log(e,"res"),e.IsSucceed)i=e.Result;else{var t=e.Errors[0].Message;a.msg(t,{icon:5})}},function(e){console.log(e,"err")})},delArea:function(e){o.request("/api/Area/remove",e,"DELETE",function(e){e.IsSucceed?(n.reload("areaFilesTable"),a.msg("删除成功",{icon:1})):a.msg("删除失败",{icon:5})},function(e){console.log(e,"err")},{contentType:"application/json"})}},r={"export":function(){console.log("导出数据")},create:function(t){var i="../tpl/from/areaFilesForm.html?"+e.param(t);a.open({type:2,title:"新增区域档案",content:i,maxmin:!0,area:["700px","400px"],btn:["确定","取消"],yes:function(e,t){console.log("点击确定");var i=window["layui-layer-iframe"+e],l="LAY-area-files-submit",r=t.find("iframe").contents().find("#"+l);i.layui.form.on("submit("+l+")",function(t){var i=t.field,l={Method:"insert",Data:i};o.request("/api/Common/GetInsertGuid",{},"GET",function(e){console.log(e,"获取 Guid res"),e.IsSucceed?(l.Data.Idd=e.Result,o.request("/api/Area/insert",l,"POST",function(e){if(e.IsSucceed)n.reload("areaFilesTable"),a.msg("新增成功",{icon:1});else{var t=e.Errors[0].Message;a.msg(t,{icon:5})}},function(e){console.log(e,"err")},{contentType:"application/json"})):a.msg("获取Guid失败",{icon:5})},function(e){console.log(e,"获取 Guid err")}),a.close(e)}),r.trigger("click")},btn2:function(){console.log("点击取消")},cancel:function(){console.log("点击取消")}})},edit:function(t){console.log("编辑");var i="../tpl/from/areaFilesForm.html?"+e.param(t);a.open({type:2,title:"编辑区域档案",content:i,maxmin:!0,area:["700px","400px"],btn:["确定","取消"],yes:function(i,l){console.log("点击确定");var r=window["layui-layer-iframe"+i],c="LAY-area-files-submit",s=l.find("iframe").contents().find("#"+c);r.layui.form.on("submit("+c+")",function(l){var r=JSON.parse(t.data)[0],c=e.extend({},l.field,{Id:r.Id}),s={Method:"update",Data:c};console.log(s,"passFields"),o.request("/api/Area/update",s,"PUT",function(e){if(e.IsSucceed)n.reload("areaFilesTable"),a.msg("修改成功",{icon:1});else{var t=e.Errors[0].Message;a.msg(t,{icon:5})}},function(e){console.log(e,"err")},{contentType:"application/json"}),a.close(i)}),s.trigger("click")},btn2:function(){console.log("点击取消")},cancel:function(){console.log("点击取消")}})},"delete":function(){console.log("删除")}};e(".layui-btn").on("click",function(){var t=e(this).data("type");r[t]?r[t].call(this,{type:t,haveArray:!0,areaTypes:JSON.stringify(i),data:[]}):""}),l.getAreaType()});
//# sourceMappingURL=../src/maps/areafiles/areafiles.js.map
