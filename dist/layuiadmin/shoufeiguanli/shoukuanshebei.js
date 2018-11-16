/** layuiAdmin.std-v1.0.0 LPPL License By http://www.layui.com/admin/ */
 ;"use strict";layui.config({base:"../../../layuiadmin/"}).extend({index:"lib/index"}).use(["index","table","consts","common"],function(){var e=layui.$,a=layui.table,t=layui.common;form=layui.form;var i=(layui.laypage,{baseUrl:layui.setter.revenueUrl},a.render({elem:"#LAY-yingyewangdian_SKTable",id:"LAY-yingyewangdian_SKTable",url:layui.setter.revenueUrl+"/api/BusinessHall/query/list",where:{Method:"list"},parseData:layui.setter.parseData,request:layui.setter.request,cols:[[{type:"radio",fixed:"left"},{field:"Id",title:"营业网点ID",templet:function(e){return e.Me.Id}},{field:"Name",title:"营业网点名称",templet:function(e){return e.Me.Name}}]],page:!0,loading:!0,limit:10,align:"center",text:"对不起，加载出现异常！"}),{FixedUserFlag:!1,Status:2}),n={},l={},s={},o={},r=(a.render({elem:"#LAY-shoukuanmanageTable",id:"LAY-shoukuanmanageTable",url:layui.setter.revenueUrl+"/api/BusinessHallDevice/query/list",where:{"Data.CompanyCoding":"88888888",Method:"list"},parseData:layui.setter.parseData,request:layui.setter.request,page:!0,cols:[[{field:"BusinessHall_Name",title:"营业网点名称",width:100},{field:"StatusName",title:"设备状态"},{field:"Coding",title:"设备编码",templet:function(e){return e.Me.Coding}},{field:"Name",title:"设备名称",templet:function(e){return e.Me.Name}},{field:"Mac",title:"特征标识（MAC）",templet:function(e){return e.Me.Mac}},{field:"FixedUserFlag",title:"指定营业员",templet:function(e){return e.Me.FixedUserFlag}},{field:"FixedUser_Name",title:"指定营业员名称",templet:function(e){return e.Me.FixedUser_Name}},{field:"SortNum",title:"排序号",templet:function(e){return e.Me.SortNum}},{field:"Description",title:"描述",templet:function(e){return e.Me.Description}},{field:"CreateDate",title:"建档日期",sort:!0,templet:function(e){return"<div>"+layui.util.toDateString(e.Me.CreateDate)+"</div>"}},{field:"ModifyDate",title:"更新日期",sort:!0,templet:function(e){return"<div>"+layui.util.toDateString(e.Me.CreateDate)+"</div>"}},{title:"操作",align:"center",width:160,toolbar:"#LAY-shebeiTable-barOperation"}]],loading:!0,limit:10,text:"对不起，加载出现异常！"}),{});r.keys={},r.ckeys={},r.init=function(a,t,l,s,o,d){if(a&&e(a).length){e(a).html(""),e(a).append("<option selected>全部</option>");for(var c in n)e(a).append("<option  &nbsp; id="+n[c].Id+" &nbsp; value="+n[c].Title+">"+n[c].Title+"</option>"),r.keys[n[c].Title]=n[c];form.render("select"),t&&e(t).length&&(r.formRender(t),form.on("select(province)",function(a){var i=r.keys[a.value].Children;if(e(t).html(""),e(t).append("<option>全部</option>"),i){for(var n in i)e(t).append("<option &nbsp;  id="+i[n].Id+" &nbsp;  value="+i[n].Title+">"+i[n].Title+"</option>"),r.ckeys[i[n].Title]=i[n];e(t).find("option:eq(1)").attr("selected",!0)}form.render("select"),e(t).next().find(".layui-this").removeClass("layui-this").click(),r.formHidden("province",a.value),e(".pca-label-province").html(a.value)}),l&&e(l).length&&(r.formRender(l),form.on("select(city)",function(a){var t=r.ckeys[a.value];if(e(l).html(""),e(l).append("<option>全部</option>"),t){t=t.Children;for(var i in t)console.info(t[i].Id),e(l).append("<option &nbsp; id="+t[i].Id+" &nbsp; value="+t[i].Title+">"+t[i].Title+"</option>");e(l).find("option:eq(1)").attr("selected",!0)}form.render("select"),e(l).next().find(".layui-this").removeClass("layui-this").click(),r.formHidden("city",a.value),e(".pca-label-city").html(a.value)}),form.on("select(area)",function(a){i.FixedUser_Name=e("#area option[selected='selected']").val(),i.FixedUser_Id=e("#area option[selected='selected']").attr("id"),r.formHidden("area",a.value),e(".pca-label-area").html(a.value)})))}},r.formRender=function(a){e(a).html(""),e(a).append("<option>全部</option>"),form.render("select")},r.formHidden=function(a,t){e("#pca-hide-"+a).length?e("#pca-hide-"+a).val(t):e("body").append('<input id="pca-hide-'+a+'" type="hidden" value="'+t+'" />')};var d={add:function(t){layer.closeAll(),layer.load(0,{shade:!1});var i=layui.consts.basePostData();i.Data=t,i.Method="insert";var n=JSON.stringify(i);i.Data.FixedUserFlag?i.Data.FixedUser_Id&&i.Data.FixedUser_Name?(console.info("营业员已选择"),e.ajax({type:"Post",url:layui.setter.revenueUrl+"/api/BusinessHallDevice/insert",data:n,async:!0,dataType:"json",headers:{Accept:"application/json","Content-Type":"application/json"},success:function(t){layer.closeAll(),t.IsSucceed?(layer.msg("添加设备成功!",{icon:6}),a.reload("LAY-shoukuanmanageTable"),e("#lock-from").find("input[type=text],select,input[type=hidden]").each(function(){e(this).val("")})):(a.reload("LAY-shoukuanmanageTable"),layer.msg("添加设备数据失败: "+t.Errors[0].Message,{icon:5}))},error:function(e){layer.closeAll(),layer.msg("数据操作失败",{icon:5})}})):(layer.closeAll(),layer.msg("营业员未选择, 请选择固定营业员或取消指定营业员 ",{icon:5})):(console.info("营业员为空"),e.ajax({type:"Post",url:layui.setter.revenueUrl+"/api/BusinessHallDevice/insert",data:n,async:!0,dataType:"json",headers:{Accept:"application/json","Content-Type":"application/json"},success:function(t){layer.closeAll(),t.IsSucceed?(layer.msg("添加设备成功!",{icon:6}),layer.closeAll(),a.reload("LAY-shoukuanmanageTable"),e("#lock-from").find("input[type=text],select,input[type=hidden]").each(function(){e(this).val("")})):(a.reload("LAY-shoukuanmanageTable"),layer.msg("添加设备数据失败: "+t.Errors[0].Message,{icon:5}))},error:function(e){layer.closeAll(),layer.msg("数据操作失败",{icon:5})}}))},"delete":function(t){layer.closeAll(),layer.load(0,{shade:!1});var i=layui.consts.basePostData();i.Data={Id:t.Me.Id},i.Method="remove";var n=JSON.stringify(i);console.info(n),e.ajax({type:"delete",url:layui.setter.revenueUrl+"/api/BusinessHallDevice/remove",async:!0,data:n,dataType:"json",headers:{Accept:"application/json","Content-Type":"application/json"},success:function(e){layer.closeAll(),e.IsSucceed?(layer.msg("删除营业设备成功!",{icon:6}),a.reload("LAY-shoukuanmanageTable")):(a.reload("LAY-yingyewangdianTable"),layer.msg("删除失败: "+e.Errors[0].Message,{icon:5}))},error:function(e){layer.closeAll(),layer.msg("数据操作失败",{icon:5})}})},edit:function(d){e.ajax({type:"get",url:layui.setter.revenueUrl+"/api/BusinessHallDevice/query/key?Data.key="+d.Me.Id+"&Method=key",async:!0,success:function(c){if(console.info(d.BusinessHall_Name),c.IsSucceed){var u=c.Result.Me;if(layer.open({type:1,title:"修改收款设备",content:e("#lock-from"),maxmin:!0,area:["700px","400px"],btn:["确定","取消"],yes:function(t,n){var l=e("#LAY-shebei-add-submit");form.on("submit(LAY-shebei-add-submit)",function(n){var l=n.field,s=layui.consts.basePostData();s.Data=l,s.Data.BusinessHall_Id=u.BusinessHall_Id,s.Data.BusinessHall_Name=d.BusinessHall_Name,s.Data.Id=u.Id,s.Data.Status="on"==l.Status?1:2,s.Data.CompanyCoding="88888888",s.Data.FixedUserFlag="on"==l.FixedUserFlag,s.Data.FixedUser_Id=i.FixedUser_Id,s.Data.FixedUser_Name=i.FixedUser_Name,s.Method="update",delete s.Data.P1,delete s.Data.C1,delete s.Data.A1,delete s.Data.layTableRadio_1;var o=JSON.stringify(s);e.ajax({type:"Put",url:layui.setter.revenueUrl+"/api/BusinessHallDevice/update",data:o,async:!0,dataType:"json",headers:{Accept:"application/json","Content-Type":"application/json"},success:function(t){layer.closeAll(),t.IsSucceed?(layer.msg("修改营业网点成功!",{icon:6}),a.reload("LAY-shoukuanmanageTable"),e("#lock-from").find("input[type=text],select,input[type=hidden]").each(function(){e(this).val("")})):(a.reload("LAY-shoukuanmanageTable"),layer.msg("失败: "+t.Errors[0].Message,{icon:5}))},error:function(e){layer.closeAll(),layer.msg("数据操作失败",{icon:5})}}),layer.close(t)}),l.trigger("click")}}),form.val("lock-from",{Coding:u.Coding,Name:u.Name,CompanyCoding:u.CompanyCoding,CompanyName:u.CompanyName,Mac:u.Mac,SortNum:u.SortNum,Status:1==u.Status,Description:u.Description,FixedUser_Id:u.FixedUser_Id,FixedUser_Name:u.FixedUser_Name,FixedUserFlag:u.FixedUserFlag,Id:u.Id,BusinessHall_Id:u.BusinessHall_Id,BusinessHall_Name:d.BusinessHall_Name}),u.FixedUserFlag){o=t.findObjectByKeyVal(n,"Title",u.FixedUser_Name),s=t.findObjectByKeyVal(n,"Id",o.ParentId),l=t.findObjectByKeyVal(n,"Id",s.ParentId),console.info(l.Title,s.Title,o.Title),e("#province").removeAttr("disabled"),e("#city").removeAttr("disabled"),e("#area").removeAttr("disabled"),e(province).html(""),e(province).append("<option selected>全部</option>");for(var p in n)e(province).append("<option  &nbsp; id="+n[p].Id+" &nbsp; value="+n[p].Title+">"+n[p].Title+"</option>");e(province).find("option[value='"+l.Title+"']").attr("selected",!0),form.render("select"),e(city).html(""),e(city).append("<option>全部</option>");var y=l.Children;if(y){for(var p in y)e(city).append("<option &nbsp;  id="+y[p].Id+" &nbsp;  value="+y[p].Title+">"+y[p].Title+"</option>");e(city).find("option[value='"+s.Title+"']").attr("selected",!0)}if(form.render("select"),e(city).next().find(".layui-this").removeClass("layui-this").click(),r.formHidden("province",c.value),e(".pca-label-province").html(c.value),e(area).html(""),e(area).append("<option>全部</option>"),y=s.Children){for(var p in y)console.info(y[p].Id),e(area).append("<option &nbsp; id="+y[p].Id+" &nbsp; value="+y[p].Title+">"+y[p].Title+"</option>");e(area).find("option[value='"+o.Title+"']").attr("selected",!0)}form.render("select"),e(area).next().find(".layui-this").removeClass("layui-this").click(),r.formHidden("city",c.value),e(".pca-label-city").html(c.value)}else e("#province").attr("disabled","disabled"),e("#city").attr("disabled","disabled"),e("#area").attr("disabled","disabled"),r.init("select[name=P1]","select[name=C1]","select[name=A1]"),form.render("select")}else layer.msg("失败"+u.Errors[0].Description,{icon:5})},error:function(e){layer.closeAll(),layer.msg("数据加载失败",{icon:5})}})}},c={batchdel:function(){var e=a.checkStatus("LAY-user-manage"),t=e.data;return 0===t.length?layer.msg("请选择数据"):(layer.close(index),void layer.confirm("确定删除吗？",function(e){a.reload("LAY-user-manage"),layer.msg("已删除")}))},add:function(){e.ajax({type:"Get",url:layui.setter.baseUrl+"/api/Organ/treeview",async:!0,headers:{Accept:"application/json, text/javascript, */*; q=0.01"},success:function(e){e.IsSucceed&&(n=e.Result.TreeNodes[0].Children,r.init("select[name=P1]","select[name=C1]","select[name=A1]"),form.render("select"))},error:function(e){layer.msg("数据操作失败",{icon:5})}}),a.reload("LAY-yingyewangdian_SKTable"),layer.open({type:1,title:"添加设备",content:e("#lock-from"),maxmin:!0,area:["800px","500px"],btn:["确定","取消"],yes:function(a,t){var n=e("#LAY-shebei-add-submit");form.on("submit(LAY-shebei-add-submit)",function(t){var n=t.field;e.ajax({type:"get",url:layui.setter.revenueUrl+"/api/Common/GetInsertGuid",async:!0,dataType:"json",headers:{Accept:"application/json","Content-Type":"application/json"},success:function(e){e.IsSucceed?(i.Idd=e.Result,i.Mac=n.Mac,i.Coding=n.Coding,i.Description=n.Description,i.Name=n.Name,i.SortNum=n.SortNum,i.Coding=n.Coding,i.Status="on"==n.Status?1:2,console.info("shebeiPar: ",i),d.add(i),layer.close(a)):layer.msg("设备数据失败"+e.Errors[0].Message,{icon:5})},error:function(e){layer.closeAll(),layer.msg("数据操作失败",{icon:5})}}),layer.close(a)}),n.trigger("click")}})}};e(".layui-btn.layuiadmin-btn-shoukuanAdd").on("click",function(){var a=e(this).data("type");c[a]?c[a].call(this):""}),e(".layui-btn.LAY-wangdian-search-submit").on("click",function(a){layer.open({type:1,title:"查询营业网点",content:e("#lock-from-BusinessHall"),maxmin:!0,offset:"auto",zIndex:999999999,area:["800px","500px"],btn:["确定","取消"],yes:function(e,a){console.info(i.BusinessHall_Name),form.val("lock-from",{BusinessHall_Name:i.BusinessHall_Name}),layer.close(e)}})}),form.on("switch(FixedUserFlag)",function(a){i.FixedUserFlag=a.elem.checked,i.FixedUserFlag?(e("#province").removeAttr("disabled"),e("#city").removeAttr("disabled"),e("#area").removeAttr("disabled")):(e("#province").attr("disabled","disabled"),e("#city").attr("disabled","disabled"),e("#area").attr("disabled","disabled")),form.render("select")}),a.on("radio(LAY-yingyewangdian_SKTable)",function(e){console.info(e.data);var a=e.data.Me;i.BusinessHall_Id=a.Id,i.BusinessHall_Name=a.Name}),a.on("tool()",function(a){var t=a.data,i=a.event;a.tr;"del"===i?layer.confirm("真的删除行么",function(e){d["delete"](t),layer.close(e)}):"edit"===i&&e.ajax({type:"Get",url:layui.setter.baseUrl+"/api/Organ/treeview",async:!0,headers:{Accept:"application/json, text/javascript, */*; q=0.01"},success:function(e){e.IsSucceed&&(n=e.Result.TreeNodes[0].Children,console.info(t),d.edit(t))},error:function(e){layer.msg("数据操作失败",{icon:5})}})})});
//# sourceMappingURL=../src/maps/shoufeiguanli/shoukuanshebei.js.map
