layui.config({base:"../../../layuiadmin/"}).extend({index:"lib/index"}).use(["index","layer","jquery","laypage","setter","element","renderNav","consts","common"],function(){var e=void 0===parent.layer?layui.layer:parent.layer,n=(layui.laypage,layui.laydata,layui.consts),o=layui.common,t=layui.element,l=layui.jquery,i=layui.renderNav,s=new Oidc.UserManager(n.userManagerConfig);s.events.addAccessTokenExpiring(function(){console.log("token expiring")}),s.events.addAccessTokenExpired(function(){console.log("token expired")}),s.events.addUserSignedOut(function(){console.log("检测退出事件(已经退出)")}),s.events.addSilentRenewError(function(e){console.log("silent renew error",e.message)}),s.events.addUserLoaded(function(e){user=e,s.getUser().then(function(e){e&&e.profile?(console.log("添加用户之前用户信息",e),o.setSessionStorage("access_token",e.access_token),c.render.showLoginName(e.profile)):null===e&&(console.log("用户信息为空",e),c.render.showStateInfo(e))})["catch"](function(e){console.log(e)})}),s.getUser().then(function(e){e&&e.profile?(console.log("got user获取用户信息",e),c.render.showLoginName(e.profile)):null===e&&(console.log("用户信息为空",e),c.render.showStateInfo(e))})["catch"](function(e){console.log(e)}),s.signinRedirectCallback().then(function(e){console.log("登录目标返回 success",e)})["catch"](function(e){}),s.querySessionStatus().then(function(e){console.log("返回状态",e)})["catch"](function(e){console.log("查询状态错误",e)});var c={init:function(){this.events(),this.server.getNav()},events:function(){l(".search_btn").click(function(){console.log(11)}),l("#logout").click(function(){s.signoutPopupCallback(!0),s.removeUser(),s.clearStaleState(),s.signoutRedirect({state:"signOut"}).then(function(e){log("signed out",e)})["catch"](function(e){log(e)})})},server:{getNav:function(){l.ajax({type:"get",url:layui.setter.baseUrl+"/api/Navigation/treeview/menuLink",success:function(n){if(n.IsSucceed){var o=n.Result.TreeNodes;o[0].Children.push({Code:"06",Flag:"nav",Icon:"true",Id:"001",IsExpand:!0,Key:"001",ParentId:null,Title:"租户管理",Url:"/platform/tenant?rad=1GpEZITN"}),o[0].Children.push({Code:"07",Flag:"nav",Icon:"true",Id:"002",IsExpand:!0,Key:"003",ParentId:null,Title:"上传测试",Url:"/tpl/from/updata?rad=1GpEZITN"}),l("#navBox").html(i(o)),t.init()}else e.msg("导航数据加载失败!",{icon:5})},error:function(n){e.closeAll(),e.msg("数据加载失败",{icon:5})}})}},render:{},checkLogionState:function(){s.getUser().then(function(e){console.log("got user获取用户信息",e)})["catch"](function(e){console.log(e)})}};c.init()});
//# sourceMappingURL=src/maps/home.js.map
