/** layuiAdmin.std-v1.0.0 LPPL License By http://www.layui.com/admin/ */
 ;"use strict";layui.config({base:"../../../layuiadmin/"}).extend({index:"lib/index"}).use(["index","useradmin","table","common","consts"],function(){var a=layui.$,e=layui.form,n=layui.common,i=layui.table;e.on("submit(LAY-user-front-search)",function(a){var e=a.field;i.reload("LAY-user-manage",{where:e})});var t={addUser:function(a){var e=layui.consts.basePostData();e.Data=a,console.log(a);var t=JSON.stringify(e);n.ajaxFun("post","/api/User",t).then(function(a){n.appResult.isSucceeded(a)?(layer.msg("数据添加成功!",{icon:6}),layer.closeAll(),i.reload("LAY-user-manage")):n.appResult.loadErrorText(a)}).fail(function(a){console.log(a)})}},r={batchdel:function(){var a=i.checkStatus("LAY-user-manage"),e=a.data;return 0===e.length?layer.msg("请选择数据"):(layer.close(index),void layer.confirm("确定删除吗？",function(a){i.reload("LAY-user-manage"),layer.msg("已删除")}))},add:function(){layer.open({type:2,title:"添加用户",content:"../tpl/from/userFrom.html",maxmin:!0,area:["700px","400px"],btn:["确定","取消"],yes:function(a,e){var n=window["layui-layer-iframe"+a],i="LAY-user-front-submit",r=e.find("iframe").contents().find("#"+i);n.layui.form.on("submit("+i+")",function(e){var n=e.field;t.addUser(n),layer.close(a)}),r.trigger("click")}})}};a(".layui-btn.layuiadmin-btn-useradmin").on("click",function(){var e=a(this).data("type");r[e]?r[e].call(this):""})});
//# sourceMappingURL=../src/maps/platform/userAdmin.js.map
