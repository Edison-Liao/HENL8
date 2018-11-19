/** layuiAdmin.std-v1.0.0 LPPL License By http://www.layui.com/admin/ */
 ;"use strict";layui.config({base:"../../../layuiadmin/"}).extend({index:"lib/index"}).use(["index","layer","tree","common","consts","jquery_ztree_excheck"],function(){var e=layui.$,r=(layui.table,layui.layer),t=(layui.tree,layui.common);layui.ztree,layui.jquery_ztree_excheck;e("body").on("mousedown",".layui-tree a",function(){e(this).siblings("ul").length||(e(".layui-tree a cite").css("color","#333"),e(this).find("cite").css("color","red"))}),e("#formTitle").click(function(){console.log(1);layui.admin});var n={init:function(e,r){this.render.renderTree(e,r)},baseData:{zTreeObj:{}},treeSeting:{check:{enable:!0,chkboxType:{Y:"s",N:"ps"},nocheckInherit:!1},data:{simpleData:{enable:!0}},callback:{onCheck:function(e,r,t){console.log(t,"callback")}}},event:{},render:{renderTree:function(r,t){n.baseData.zTreeObj=layui.jquery_ztree.init(e("#"+t),n.treeSeting,r);var a=layui.jquery_ztree.getZTreeObj(t),i=a.getNodes();i.length>0&&a.expandNode(i[0],!0,!1,!0)}}},a={init:function(){this.server.getTreeData(),this.server.getAccessOrganTreeData(),this.server.getAccessRightTreeData(),this.event()},baseData:{treeNode:{},id:"",nodeData:{},editFalge:!1},event:function(){e("#accessOrganSub").click(function(){var e=layui.jquery_ztree.getZTreeObj("treeOrgan").getCheckedNodes(!0),r=a.currData.getArryNodeId(e,"Id"),t=a.baseData.id;a.server.putRoleAccessRight("Organ",r,t)}),e("#accessRightSub").click(function(){var e=layui.jquery_ztree.getZTreeObj("treeAccessRight").getCheckedNodes(!0),r=a.currData.getArryNodeId(e,"Id"),t=a.baseData.id;a.server.putRoleAccessRight("Right",r,t)}),e("#accessUserSub").click(function(){var e=layui.jquery_ztree.getZTreeObj("treeOrganUser").getCheckedNodes(!0),r=a.currData.getArryNodeId(e,"Id"),t=a.baseData.id;a.server.putRoleAccessRight("User",r,t)})},server:{getTreeData:function(){t.ajaxFun("get","/api/Role/treeview").then(function(e){if(t.appResult.isSucceeded(e)){var r=function s(e){if(e.length>0)for(var r=0;r<e.length;r++)e[r].name=e[r].Title,e[r].children=e[r].Children,e[r].Children.length>0&&s(e[r].Children);return e},n=e.Result.TreeNodes,i=r(n);a.render.renderTree(i,"tree_accessRight")}else t.appResult.loadErrorText(e)}).fail(function(e){console.log(e)})},getAccessOrganTreeData:function(){t.ajaxFun("get","/api/organ/treeview").then(function(r){if(t.appResult.isSucceeded(r)){var n=function u(e,r){if(e.length>0)for(var t=0;t<e.length;t++){if(e[t].name=e[t].Title,e[t].children=e[t].Children,r){var n="staff"!==e[t].Flag;e[t].nocheck=n,"staff"===e[t].Flag&&(delete e[t].Children,delete e[t].children)}e[t].Children&&e[t].Children.length>0&&u(e[t].Children,r)}return e},i=r.Result.TreeNodes,s=e.extend(!0,[],i),c=e.extend(!0,[],i),o=n(s,!1),l=n(c,!0);a.render.renderAccessOrganTree(o),a.render.renderAccessOrganTreeUser(l)}else t.appResult.loadErrorText(r)}).fail(function(e){console.log(e)})},getAccessRightTreeData:function(){t.ajaxFun("get","/api/Module/deep/permission").then(function(e){if(t.appResult.isSucceeded(e)){var r=function s(e){if(e.length>0)for(var r=0;r<e.length;r++)e[r].name=e[r].Name,e[r].Functions&&e[r].Functions.length>0&&(e[r].children=e[r].Functions),e[r].Permissions&&e[r].Permissions.length>0&&(e[r].children=e[r].Permissions),e[r].children&&e[r].children.length>0&&s(e[r].children);return e},n=e.Result,i=r(n);a.render.renderAccessRightTree(i)}else t.appResult.loadErrorText(e)}).fail(function(e){console.log(e)})},getRoleAccessOrganNode:function(e,r){"roleInfo"===e&&(urlID="/api/Role/accessOrgan/"+r,t.ajaxFun("get","/api/Role/accessOrgan/"+r).then(function(e){t.appResult.isSucceeded(e)?a.render.setTreeNodeCheck(e.Result,"treeOrgan"):t.appResult.loadErrorText(e)}).fail(function(e){console.log(e)}))},getRoleAccessRightNode:function(e,n){var i="";"roleInfo"===e&&(i="/api/Role/accessRight/"+n,t.ajaxFun("get","/api/Role/accessRight/"+n).then(function(e){t.appResult.isSucceeded(e)?a.render.setTreeNodeCheck(e.Result,"treeAccessRight"):r.msg("获取功能访问权限数据失败! "+e.Errors[0].Message,{icon:5})}).fail(function(e){console.log(e)}))},getRoleUserRightNode:function(e,n){"roleInfo"===e&&(urlID="/api/Role/"+n+"/with/user",t.ajaxFun("get",urlID).then(function(e){t.appResult.isSucceeded(e)?a.render.setTreeNodeCheck(e.Result,"treeOrganUser"):r.msg("获取节点数据失败! "+e.Errors[0].Message,{icon:5})}).fail(function(e){console.log(e)}))},putRoleAccessRight:function(e,n,a){var i="";if("Organ"===e)i="/api/Role/accessOrgan/"+a;else if("Right"===e)i="/api/Role/accessRight/"+a;else{if("User"!==e)return r.msg("出错啦");i="/api/Role/"+a+"/with/user"}var s=layui.consts.basePostData();s.Data=n;var c=JSON.stringify(s);t.ajaxFun("get",i,c).then(function(e){t.appResult.isSucceeded(e)?r.msg("更新权限成功!",{icon:6}):r.msg("更新权限数据失败! "+e.Errors[0].Message,{icon:5})}).fail(function(e){console.log(e)})},getNodedata:function(e,n){var i="";if("roleCatalog"===e)i="/api/Role/"+n;else{if("roleInfo"!==e)return;i="/api/Role/"+n}t.ajaxFun("get",i).then(function(e){if(t.appResult.isSucceeded(e)){a.baseData.nodeData=e.Result;e.Result}else r.msg("获取节点数据失败! "+e.Errors[0].Message,{icon:5})}).fail(function(e){console.log(e)})}},render:{renderTree:function(e){layui.tree({elem:"#treeRole",target:"_blank",click:function(e){a.baseData.treeNode=e,a.baseData.id=e.Id,a.baseData.editFalge=!0,a.server.getRoleAccessOrganNode(e.Flag,e.Id),a.server.getRoleAccessRightNode(e.Flag,e.Id),a.server.getRoleUserRightNode(e.Flag,e.Id),a.render.disabledBtton(e.Flag)},nodes:e})},renderAccessOrganTree:function(e){n.init(e,"treeOrgan")},renderAccessRightTree:function(e){n.init(e,"treeAccessRight")},renderAccessOrganTreeUser:function(e){n.init(e,"treeOrganUser")},openDeleteConfirm:function(e){console.log(e,"模态框")},disabledBtton:function(e){t.isDisableButton(".layui-btn",!1)},setTreeNodeCheck:function(e,r){var t=layui.jquery_ztree.getZTreeObj(r);if(console.log(e,r,"树形结构check填充参数"),null!=t){t.checkAllNodes(!1);var n=t.getNodes();if(n.length>0&&e.length>0)for(var a=0;a<e.length;a++){console.log(e[a],r);var i=t.getNodeByParam("Id",e[a],null);t.expandNode(i,!0,!0,!0,!1),i.checked=!0,t.updateNode(i,!1)}}}},currData:{getArryNodeId:function(e,r){for(var t=[],n=0;n<e.length;n++){var a=e[n][r];t.push(a)}return t}}};a.init()});
//# sourceMappingURL=../src/maps/platform/roleauth.js.map
