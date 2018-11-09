/** layuiAdmin.std-v1.0.0 LPPL License By http://www.layui.com/admin/ */
 ;"use strict";layui.config({base:"../../../layuiadmin/"}).extend({index:"lib/index"}).use(["index","layer","tree","common","consts","jquery_ztree_excheck"],function(){var e=layui.$,r=(layui.table,layui.layer),t=(layui.tree,layui.common);layui.ztree,layui.jquery_ztree_excheck;e("body").on("mousedown",".layui-tree a",function(){e(this).siblings("ul").length||(e(".layui-tree a cite").css("color","#333"),e(this).find("cite").css("color","red"))}),e("#formTitle").click(function(){console.log(1);layui.admin});var n={init:function(e,r){this.render.renderTree(e,r)},baseData:{zTreeObj:{}},treeSeting:{check:{enable:!0,chkboxType:{Y:"s",N:"ps"},nocheckInherit:!1},data:{simpleData:{enable:!0}},callback:{onCheck:function(e,r,t){console.log(t,"callback")}}},event:{},render:{renderTree:function(r,t){n.baseData.zTreeObj=layui.jquery_ztree.init(e("#"+t),n.treeSeting,r);var s=layui.jquery_ztree.getZTreeObj(t),a=s.getNodes();a.length>0&&s.expandNode(a[0],!0,!1,!0)}}},s={init:function(){this.server.getTreeData(),this.server.getAccessOrganTreeData(),this.server.getAccessRightTreeData(),this.event()},baseData:{treeNode:{},id:"",nodeData:{},editFalge:!1},event:function(){e("#accessOrganSub").click(function(){var e=layui.jquery_ztree.getZTreeObj("treeOrgan").getCheckedNodes(!0),r=s.currData.getArryNodeId(e,"Id"),t=s.baseData.id;s.server.putRoleAccessRight("Organ",r,t)}),e("#accessRightSub").click(function(){var e=layui.jquery_ztree.getZTreeObj("treeAccessRight").getCheckedNodes(!0),r=s.currData.getArryNodeId(e,"Id"),t=s.baseData.id;s.server.putRoleAccessRight("Right",r,t)}),e("#accessUserSub").click(function(){var e=layui.jquery_ztree.getZTreeObj("treeOrganUser").getCheckedNodes(!0),r=s.currData.getArryNodeId(e,"Id"),t=s.baseData.id;s.server.putRoleAccessRight("User",r,t)})},server:{getTreeData:function(){e.ajax({type:"get",url:layui.setter.baseUrl+"/api/Role/treeview",dataType:"json",headers:{Accept:"application/json","Content-Type":"application/json"},success:function(e){if(r.closeAll("loading"),e.IsSucceed){var t=function c(e){if(e.length>0)for(var r=0;r<e.length;r++)e[r].name=e[r].Title,e[r].children=e[r].Children,e[r].Children.length>0&&c(e[r].Children);return e};console.log(e.Result.TreeNodes);var n=e.Result.TreeNodes,a=t(n);s.render.renderTree(a,"tree_accessRight")}else r.msg("获取角色数据失败!"+e,{icon:5})},error:function(e){r.closeAll(),r.msg("数据操作失败",{icon:5})}})},getAccessOrganTreeData:function(){e.ajax({type:"get",url:layui.setter.baseUrl+"/api/organ/treeview",dataType:"json",headers:{Accept:"application/json","Content-Type":"application/json"},success:function(t){if(r.closeAll("loading"),t.IsSucceed){var n=function u(e,r){if(e.length>0)for(var t=0;t<e.length;t++){if(e[t].name=e[t].Title,e[t].children=e[t].Children,r){var n="staff"!==e[t].Flag;e[t].nocheck=n,"staff"===e[t].Flag&&(delete e[t].Children,delete e[t].children)}e[t].Children&&e[t].Children.length>0&&u(e[t].Children,r)}return e};console.log(t.Result.TreeNodes);var a=t.Result.TreeNodes,c=e.extend(!0,[],a),o=e.extend(!0,[],a),i=n(c,!1),l=n(o,!0);s.render.renderAccessOrganTree(i),s.render.renderAccessOrganTreeUser(l)}else r.msg("获取数据失败"+t,{icon:5})},error:function(e){r.closeAll(),r.msg("数据操作失败",{icon:5})}})},getAccessRightTreeData:function(){e.ajax({type:"get",url:layui.setter.baseUrl+"/api/Module/deep/permission",dataType:"json",headers:{Accept:"application/json","Content-Type":"application/json"},success:function(e){if(r.closeAll("loading"),e.IsSucceed){var t=function c(e){if(e.length>0)for(var r=0;r<e.length;r++)e[r].name=e[r].Name,e[r].Functions&&e[r].Functions.length>0&&(e[r].children=e[r].Functions),e[r].Permissions&&e[r].Permissions.length>0&&(e[r].children=e[r].Permissions),e[r].children&&e[r].children.length>0&&c(e[r].children);return e},n=e.Result,a=t(n);s.render.renderAccessRightTree(a)}else r.msg("获取数据失败"+e,{icon:5})},error:function(e){r.closeAll(),r.msg("数据操作失败",{icon:5})}})},getRoleAccessOrganNode:function(t,n){"roleInfo"===t&&(urlID="/api/Role/accessOrgan/"+n,e.ajax({type:"get",url:layui.setter.baseUrl+"/api/Role/accessOrgan/"+n,dataType:"json",headers:{Accept:"application/json","Content-Type":"application/json"},success:function(e){console.log(e,"accessOrgan"),r.closeAll(),e.IsSucceed?s.render.setTreeNodeCheck(e.Result,"treeOrgan"):r.msg("获取节点数据失败! "+e.Errors[0].Message,{icon:5})},error:function(e){r.closeAll(),r.msg("数据操作失败",{icon:5})}}))},getRoleAccessRightNode:function(t,n){var a="";"roleInfo"===t&&(a="/api/Role/accessRight/"+n,r.load(2),e.ajax({type:"get",url:layui.setter.baseUrl+a,dataType:"json",headers:{Accept:"application/json","Content-Type":"application/json"},success:function(e){console.log(e,"accessRight"),r.closeAll(),e.IsSucceed?s.render.setTreeNodeCheck(e.Result,"treeAccessRight"):r.msg("获取功能访问权限数据失败! "+e.Errors[0].Message,{icon:5})},error:function(e){r.closeAll(),r.msg("数据操作失败",{icon:5})}}))},getRoleUserRightNode:function(t,n){"roleInfo"===t&&(urlID="/api/Role/"+n+"/with/user",e.ajax({type:"get",url:layui.setter.baseUrl+urlID,dataType:"json",headers:{Accept:"application/json","Content-Type":"application/json"},success:function(e){r.closeAll(),e.IsSucceed?s.render.setTreeNodeCheck(e.Result,"treeOrganUser"):r.msg("获取节点数据失败! "+e.Errors[0].Message,{icon:5})},error:function(e){r.closeAll(),r.msg("数据操作失败",{icon:5})}}))},putRoleAccessRight:function(t,n,s){var a="";if("Organ"===t)a="/api/Role/accessOrgan/"+s;else if("Right"===t)a="/api/Role/accessRight/"+s;else{if("User"!==t)return r.msg("出错啦");a="/api/Role/"+s+"/with/user"}var c=layui.consts.basePostData();c.Data=n;var o=JSON.stringify(c);r.load(),e.ajax({type:"put",url:layui.setter.baseUrl+a,dataType:"json",data:o,headers:{Accept:"application/json","Content-Type":"application/json"},success:function(e){r.closeAll(),e.IsSucceed?(console.log(e.Result,"当前角色点"),r.msg("更新权限成功!",{icon:6})):r.msg("更新权限数据失败! "+e.Errors[0].Message,{icon:5})},error:function(e){r.closeAll(),r.msg("数据操作失败",{icon:5})}})},getNodedata:function(t,n){var a="";if("roleCatalog"===t)a="/api/Role/"+n;else{if("roleInfo"!==t)return;a="/api/Role/"+n}e.ajax({type:"get",url:layui.setter.baseUrl+a,dataType:"json",headers:{Accept:"application/json","Content-Type":"application/json"},success:function(e){if(r.closeAll(),console.log(e),e.IsSucceed){s.baseData.nodeData=e.Result;e.Result}else r.msg("获取节点数据失败! "+e.Errors[0].Message,{icon:5})},error:function(e){r.closeAll(),r.msg("数据操作失败",{icon:5})}})}},render:{renderTree:function(e){layui.tree({elem:"#treeRole",target:"_blank",click:function(e){s.baseData.treeNode=e,s.baseData.id=e.Id,s.baseData.editFalge=!0,s.server.getRoleAccessOrganNode(e.Flag,e.Id),s.server.getRoleAccessRightNode(e.Flag,e.Id),s.server.getRoleUserRightNode(e.Flag,e.Id),s.render.disabledBtton(e.Flag)},nodes:e})},renderAccessOrganTree:function(e){n.init(e,"treeOrgan")},renderAccessRightTree:function(e){n.init(e,"treeAccessRight")},renderAccessOrganTreeUser:function(e){n.init(e,"treeOrganUser")},openDeleteConfirm:function(e){console.log(e,"模态框")},disabledBtton:function(e){t.isDisableButton(".layui-btn",!1)},setTreeNodeCheck:function(e,r){var t=layui.jquery_ztree.getZTreeObj(r);if(console.log(e,r,"树形结构check填充参数"),null!=t){t.checkAllNodes(!1);var n=t.getNodes();if(n.length>0&&e.length>0)for(var s=0;s<e.length;s++){var a=t.getNodeByParam("Id",e[s],null);t.expandNode(a,!0,!0,!0,!1),a.checked=!0,t.updateNode(a,!1)}}}},currData:{getArryNodeId:function(e,r){for(var t=[],n=0;n<e.length;n++){var s=e[n][r];t.push(s)}return t}}};s.init()});
//# sourceMappingURL=../src/maps/platform/roleauth.js.map
