/** layuiAdmin.std-v1.0.0 LPPL License By http://www.layui.com/admin/ */
 ;"use strict";layui.config({base:"../../../layuiadmin/"}).extend({index:"lib/index"}).use(["index","table","layer"],function(){var e=layui.$,a=layui.form,n=layui.table;layer=layui.layer,a.on("submit(IccRegist-search)",function(e){var a=e.field;console.log(e,"数据"),n.reload("xuhaoTable",{where:a})}),e("#searchBtn").click(function(){console.info("hello world");var a=e("#zhangben  option:selected").text(),n=e("#bianma").val(),l=e("#xingming").val();console.info(a),console.info(n),console.info(l)});var l={init:function(){},baseData:{treeNode:{},id:"",nodeData:{},editFalge:!1},server:{getSearchData:function(){e.ajax({type:"get",url:layui.setter.baseUrl+"/api/xuhao/treeview",dataType:"json",headers:{Accept:"application/json","Content-Type":"application/json"},success:function(e){if(layer.closeAll("loading"),console.log(e),e.IsSucceed){var a=function i(e){if(e.length>0)for(var a=0;a<e.length;a++)e[a].name=e[a].Title,e[a].children=e[a].Children,e[a].Children.length>0&&i(e[a].Children);return e};console.log(e.Result.TreeNodes);var n=e.Result.TreeNodes,o=a(n);l.render.renderTree(o)}else layer.msg("获取数据失败"+e,{icon:5})},error:function(e){layer.closeAll(),layer.msg("数据操作失败",{icon:5})}})},eidtXuhao:function(a,n){var l=layui.setter.basePostData;a.Id=organ.baseData.id,l.Data=a,console.log(a);var o=JSON.stringify(l);layer.load(),e.ajax({type:"put",url:layui.setter.baseUrl+n+"/"+organ.baseData.id,data:o,dataType:"json",headers:{Accept:"application/json","Content-Type":"application/json"},success:function(a){layer.closeAll(),console.log(a),a.IsSucceed?(e("#treeOrgan").html(""),organ.server.getTreeData(),layer.msg("修改成功!",{icon:6})):layer.msg("增加数据失败! "+a.Errors[0].Description,{icon:5})},error:function(e){layer.closeAll(),layer.msg("数据操作失败",{icon:5})}})}}};l.init(),e(".layui-btn").on("click",function(){var a=e(this).data("type");active[a]?active[a].call(this):""}),layui.use(["laypage","layer"],function(){var e=layui.laypage;layui.layer;e.render({elem:"pager",count:10})})});
//# sourceMappingURL=../src/maps/chaobiao/xuhao.js.map