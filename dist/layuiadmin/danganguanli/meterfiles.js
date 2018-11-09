/** layuiAdmin.std-v1.0.0 LPPL License By http://www.layui.com/admin/ */
 ;"use strict";layui.config({base:"../../../layuiadmin/"}).extend({index:"lib/index"}).use(["index","table","layer"],function(){var e=layui.$,t=layui.form,a=layui.table,i=layui.layer,l=[];t.on("submit(IccRegist-search)",function(e){var t=e.field;console.log(e,"数据"),a.reload("meterFilesTable",{where:t})});a.render({elem:"#meterFilesTable",url:layui.setter.huibleUrl+"/api/IccWchat/regist/search",parseData:layui.setter.parseData,request:layui.setter.request,cols:[[{width:50,type:"checkbox"},{field:"DeviceId",title:"设备Id",minWidth:100},{field:"DeviceType",title:"设备类型",templet:function(e){return"blue"===e.DeviceType?'<span class="layui-badge layui-bg-blue">蓝牙</span>':'<span class="layui-badge layui-bg-gray">蓝牙</span>'}},{field:"IsActived",title:"设备是否激活",templet:function(e){return 1==e.IsActived?'<span class="layui-badge layui-bg-blue">已激活</span>':'<span class="layui-badge layui-bg-gray layui-badge-rim">未激活</span>'}},{field:"CreateDate",title:"设备创建时间",templet:function(e){return"<div>"+layui.util.toDateString(e.CreateDate)+"</div>"}},{title:"操作",width:150,align:"center",fixed:"right",toolbar:"#table-MeterFiles"}]],loading:!0,page:!0,limit:10,text:"对不起，加载出现异常！"});a.on("checkbox(table-MeterFiles)",function(e){console.log(l,"selectedData"),console.log(e.checked),console.log(e.data),console.log(e.type)}),a.on("tool(table-MeterFiles)",function(e){var t=e.data;if("unActive"===e.event){var a=t.IsActived?"确认要取消激活该设备吗?":"确认要激活该设备吗?";i.confirm(a,{icon:3,title:"提示"},function(e){s.unActive(t)})}});var s={addMac:function(t){i.closeAll(),i.load(0,{shade:!1});var l=layui.setter.basePostData;l.Data=t;var s=JSON.stringify(l);e.ajax({type:"Post",url:layui.setter.huibleUrl+"/api/IccWchat/regist",data:s,async:!0,dataType:"json",headers:{Accept:"application/json","Content-Type":"application/json"},success:function(e){i.closeAll(),console.log(e),e.IsSucceed?(i.msg("添加用户成功!",{icon:6}),a.reload("meterFilesTable")):(a.reload("meterFilesTable"),i.msg("失败"+e,{icon:5}))},error:function(e){i.closeAll(),i.msg("数据操作失败",{icon:5})}})},unActive:function(t){i.closeAll(),i.load(0,{shade:!1});var l=layui.setter.basePostData;l.Data={IsActived:!t.IsActived,RegistId:t.Id};var s=JSON.stringify(l);e.ajax({type:"put",url:layui.setter.huibleUrl+"/api/IccWchat/regist",data:s,async:!0,dataType:"json",headers:{Accept:"application/json","Content-Type":"application/json"},success:function(e){if(i.closeAll(),console.log(t),e.IsSucceed){var l=t.IsActived?"设备取消激活成功!":"设备激活成功!";i.msg(l,{icon:6}),a.reload("meterFilesTable")}else a.reload("meterFilesTable"),i.msg("失败"+e.Errors[0],{icon:5})},error:function(e){i.closeAll(),i.msg("数据操作失败",{icon:5})}})}},c={add:function(){i.open({type:1,title:"新增设备注册信息",content:e("#rigist-from"),area:["500px"],btn:["确认","取消"],yes:function(){var t={Mac:e("#Mac").val(),Description:"",DeviceType:"blue",IsForce:"fasle"},a=t.Mac.substr(0,7);return"34008AD"!==a?void i.msg("请输入34008AD开始的MAC号!"):12!==t.Mac.length?void i.msg("MAC号为12位字符串!"):void s.addMac(t)},btn2:function(e,t){console.log("取消锁定解锁1")}})}};e(".layui-btn").on("click",function(){var t=e(this).data("type");c[t]?c[t].call(this):""})});
//# sourceMappingURL=../src/maps/danganguanli/meterfiles.js.map
