layui
  .config({
    base: "../../layuiadmin/" //静态资源所在路径
  })
  .extend({
    index: "lib/index" //主入口模块
  })
  .use(["index", "cookie", "consts"], function() {
    var $ = layui.$,
      setter = layui.setter,
      admin = layui.admin,
      form = layui.form,
      consts = layui.consts,
      router = layui.router(),
      search = router.search;
    // form.render();

    var manager = new Oidc.UserManager(consts.userManagerConfig);
    var user;
    ///////////////////////////////
    //event 事件
    ///////////////////////////////

    manager.events.addAccessTokenExpiring(function() {
      console.log("token expiring");
    });
    manager.events.addAccessTokenExpired(function() {
      console.log("token expired");
    });

    manager.events.addSilentRenewError(function(e) {
      console.log("silent renew error", e.message);
    });
    manager.events.addUserLoaded(function(loadedUser) {
      user = loadedUser;
      manager.getUser().then(function(res) {
        console.log(res, "getUser loaded user after userLoaded event fired");
      });
    });
    //event 事件结束
    new Oidc.UserManager().signinSilentCallback();
    manager
      .getUser()
      .then(function(user) {
        console.log(user, "用户信息");
      })
      .catch(e => {
        console.log(e, "错误信息");
      });

    manager
      .signinRedirectCallback(function(data) {
        console.log(data);
        window.location.href = "./index.html";
      })
      .catch(function(error) {
        console.log("捕获到目前信息", error);
      });
    $(".clear").on("click", function() {
      // true param will keep popup window open
      manager.signoutPopupCallback(true);
      manager.clearStaleState();
      manager
        .signoutRedirect({ state: "some data" })
        .then(function(resp) {
          //mgr.signoutRedirect().then(function(resp) {
          log("signed out", resp);
        })
        .catch(function(err) {
          log(err);
        });
    });
    $(".login").on("click", function() {
      manager
        .signinRedirect({ state: "HL8_SASS" })
        .then(function() {
          console.log("signinRedirect done");
        })
        .catch(function(err) {
          layer.msg("授权登录出错!", { icon: 5 });
          console.log(err);
        });
    });
  });
