/**

 @Name：layuiAdmin（iframe版） 设置
 @Author：贤心
 @Site：http://www.layui.com/admin/
 @License: LPPL
    
 */

layui.define(["form", "common", "jquery_md5", "setter"], function(exports) {
  var $ = layui.$,
    layer = layui.layer,
    setter = layui.setter,
    common = layui.common;
  // 常量集
  var consts = {
    // ------------------ Kevin Bolton Editor ------------------ //
    // 显示相关
    DATA_NO: "暂无数据",
    DATA_NULL: "无",
    STATUS_ACTIVE: "启用",
    STATUS_BLOCK: "停用"
    // ------------------ Kevin Bolton END ------------------ //
  };

  var basePostData = function(method, IsEncryption) {
    var basePostData = {
      IsEncryption: IsEncryption || false,
      Method: method || "",
      Sign: $.md5(
        "Timestamp=" +
          layui.common.getTimeOffset() +
          "+Method=" +
          (method || "")
      ),
      Timestamp: layui.common.getTimeOffset()
    };
    return basePostData;
  };
  //表格数据为空 提示文本
  var tabelNoneText = "暂无数据!";
  //授权登录常量
  const { protocol } = window.location; // http:
  const local = window.location.hostname; // 192.168.5.191
  const { port } = window.location; //8080
  const userManagerConfig = {
    authority: setter.authorityUrl, //认证服务器
    client_id: "js", // 客户端标示
    automaticSilentRenew: true,
    popup_redirect_uri: `${protocol}//${local}:${port}`, // 重定向目标
    // silent_redirect_uri: `${protocol}//${local}:${port}/login.html`,
    silent_redirect_uri: `${protocol}//${local}:${port}/views/tpl/oidc/slient.html`,
    // response_type: 'id_token',
    post_logout_redirect_uri: `${protocol}//${local}:${port}/user/login`, // 退出URL
    redirect_uri: `${protocol}//${local}:${port}`,
    response_type: "id_token token",
    scope: "openid profile api1",
    filterProtocolClaims: true,
    loadUserInfo: true
  };
  //对外暴露的接口
  exports(
    "consts",
    $.extend(
      consts,
      { basePostData: basePostData },
      { userManagerConfig, userManagerConfig },
      { tabelNoneText: tabelNoneText }
    )
  );
});
