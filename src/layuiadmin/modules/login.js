layui
  .config({
    base: "../../layuiadmin/" //静态资源所在路径
  })
  .extend({
    index: "lib/index" //主入口模块
  })
  .use(["index", "cookie"], function() {
    var $ = layui.$,
      setter = layui.setter,
      admin = layui.admin,
      form = layui.form,
      router = layui.router(),
      search = router.search;
    // form.render();
    console.log();
    const { protocol } = window.location; // http:
    const local = window.location.hostname; // 192.168.5.191
    const { port } = window.location; // 8000
    console.log(protocol, local, port, "地址信息");

    const userManagerConfig = {
      authority: setter.authorityUrl, //认证服务器
      client_id: "js", // 客户端标示
      automaticSilentRenew: true,
      popup_redirect_uri: `${protocol}//${local}:${port}`, // 重定向目标
      // response_type: 'id_token',
      post_logout_redirect_uri: `${protocol}//${local}:${port}/user/login`, // 退出URL
      redirect_uri: `${protocol}//${local}:${port}`,
      response_type: "id_token token",
      scope: "openid profile api1",
      filterProtocolClaims: true,
      loadUserInfo: true
    };
    var manager = new Oidc.UserManager(userManagerConfig);
    var user;
    manager.events.addUserLoaded(function(loadedUser) {
      user = loadedUser;
      console.log(user, "登录信息");
      window.location.href = "./index.html";
    });
    manager
      .signinRedirectCallback(function(data) {
        window.location.href = "./index.html";
      })
      .catch(function(error) {
        console.log("捕获到目前信息", error);
      });
    $(".clear").on("click", function() {
      // true param will keep popup window open
      manager.signoutPopupCallback(true);
      manager.clearStaleState();
      manager.signoutRedirectCallback(function(data) {
        console.log(data, "退出");
      });
      manager.signoutRedirect(function(data) {
        console.log(data, "退出");
      });
    });
    $(".login").on("click", function() {
      manager
        .signinRedirect(function(data) {
          console.log(data);
        })
        .catch(function(error) {
          console.error("error while logging in through the popup", error);
        });
    });
  });
