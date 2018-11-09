import $ = require("jquery");
import Oidc = require("oidc-client");
import { authUrl } from "../common/const";
const { protocol } = window.location; // http:
const local = window.location.hostname; // 192.168.5.191
const { port } = window.location; // 8089
console.log(protocol, local, port, "地址信息");

const userManagerConfig = {
  // authority: 'http://auth.huizhongcloud.com', // 认证服务器
  authority: authUrl,
  client_id: "js", // 客户端标示
  automaticSilentRenew: true,
  popup_redirect_uri: `${protocol}//${local}:${port}`, // 重定向目标
  // response_type: 'id_token',
  post_logout_redirect_uri: `${protocol}//${local}:${port}/user/login#`, // 退出URL
  redirect_uri: `${protocol}//${local}:${port}`,
  response_type: "id_token token",
  scope: "openid profile api1",
  filterProtocolClaims: true,
  loadUserInfo: true
};

var manager: any = new Oidc.UserManager(userManagerConfig);
var user;
manager.events.addUserLoaded(function(loadedUser: any) {
  user = loadedUser;
  console.log(user, "登录信息");
  window.location.href = "./index.html";
});
manager
  .signinRedirectCallback(function() {
    window.location.href = "./index.html";
  })
  .catch(function(error: any) {
    console.error("未捕获到目前信息", error);
  });

$(".clear").on("click", function() {
  // true param will keep popup window open
  manager.events.addUserUnloaded(function(e: any) {
    console.log("用户信息已经卸载!");
  });

  manager.clearStaleState();

  manager
    .signoutRedirectCallback()
    .then(function(resp: any) {
      console.log("退出", resp);
    })
    .catch(function(err: any) {
      console.log("出错啦", err);
    });

  // manager
  //   .signoutRedirect({ state: "some data" })
  //   .then(function() {
  //     console.log("signed out");
  //   })
  //   .catch(function(err: any) {
  //     console.log(err);
  //   });
});
$(".login").on("click", function() {
  manager
    .signinRedirect(function(data: any) {
      console.log(data);
    })
    .catch(function(error: any) {
      console.error("error while logging in through the popup", error);
    });
});

export const loginModel = {
  events: function() {
    console.log("111~~~~~~~~~~~~~~~~~~1~");
  }
};
