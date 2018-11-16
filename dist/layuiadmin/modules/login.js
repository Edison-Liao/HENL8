layui.config({base:"../../layuiadmin/"}).extend({index:"lib/index"}).use(["index","cookie","consts"],function(){var e,n=layui.$,o=(layui.setter,layui.admin,layui.form,layui.consts),i=layui.router(),t=(i.search,new Oidc.UserManager(o.userManagerConfig));t.events.addAccessTokenExpiring(function(){console.log("token expiring")}),t.events.addAccessTokenExpired(function(){console.log("token expired")}),t.events.addSilentRenewError(function(e){console.log("silent renew error",e.message)}),t.events.addUserLoaded(function(n){e=n,t.getUser().then(function(e){console.log(e,"getUser loaded user after userLoaded event fired")})}),(new Oidc.UserManager).signinSilentCallback(),t.getUser().then(function(e){console.log(e,"用户信息")})["catch"](function(e){console.log(e,"错误信息")}),t.signinRedirectCallback(function(e){console.log(e),window.location.href="./index.html"})["catch"](function(e){console.log("捕获到目前信息",e)}),n(".clear").on("click",function(){t.signoutPopupCallback(!0),t.clearStaleState(),t.signoutRedirect({state:"some data"}).then(function(e){log("signed out",e)})["catch"](function(e){log(e)})}),n(".login").on("click",function(){t.signinRedirect({state:"HL8_SASS"}).then(function(){console.log("signinRedirect done")})["catch"](function(e){layer.msg("授权登录出错!",{icon:5}),console.log(e)})})});
//# sourceMappingURL=src/maps/login.js.map
