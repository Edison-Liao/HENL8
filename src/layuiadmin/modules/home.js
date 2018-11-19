/*
 * @Author: hongChuan Zhang
 * @Date: 2018-11-16 10:53:12
 * @Last Modified by: hongChuan Zhang
 * @Last Modified time: 2018-11-16 11:26:56
 */
//
layui
  .config({
    base: "../../../layuiadmin/" //静态资源所在路径
  })
  .extend({
    index: "lib/index" //主入口模块
  })
  .use(
    [
      "index",

      "layer",
      "jquery",
      "laypage",
      "setter",
      "element",
      "renderNav",
      "consts",
      "common"
    ],
    function() {
      var layer = parent.layer === undefined ? layui.layer : parent.layer,
        laypage = layui.laypage,
        laydata = layui.laydata,
        consts = layui.consts,
        common = layui.common,
        element = layui.element,
        $ = layui.jquery,
        renderNav = layui.renderNav;
      //consts.userManagerConfig
      var manager = new Oidc.UserManager(consts.userManagerConfig);
      ///////////////////////////////
      //event 事件
      ///////////////////////////////
      manager.events.addAccessTokenExpiring(function() {
        console.log("token expiring");
      });
      manager.events.addAccessTokenExpired(function() {
        console.log("token expired");
      });
      manager.events.addUserSignedOut(function() {
        console.log("检测退出事件(已经退出)");
      });
      manager.events.addSilentRenewError(function(e) {
        console.log("silent renew error", e.message);
      });
      manager.events.addUserLoaded(function(loadedUser) {
        user = loadedUser;
        manager
          .getUser()
          .then(function(user) {
            if (user && user.profile) {
              console.log("添加用户之前用户信息", user);
              common.setSessionStorage("access_token", user.access_token);
              renderIndex.render.showLoginName(user.profile);
            } else if (user === null) {
              console.log("用户信息为空", user);
              renderIndex.render.showStateInfo(user);
            }
          })
          .catch(function(err) {
            console.log(err);
          });
      });
      ///////////////////////////////
      //event 事件结束
      ///////////////////////////////
      manager
        .getUser()
        .then(function(user) {
          if (user && user.profile) {
            console.log("got user获取用户信息", user);
            renderIndex.render.showLoginName(user.profile);
          } else if (user === null) {
            console.log("用户信息为空", user);
            renderIndex.render.showStateInfo(user);
          }
        })
        .catch(function(err) {
          console.log(err);
        });
      manager
        .signinRedirectCallback()
        .then(function(user) {
          console.log("登录目标返回 success", user);
        })
        .catch(function(err) {
          //console.log(err);
        });
      manager
        .querySessionStatus()
        .then(function(res) {
          console.log("返回状态", res);
        })
        .catch(function(err) {
          console.log("查询状态错误", err);
        });
      //主页渲染
      var renderIndex = {
        init: function() {
          // this.renderLoad();
          this.events();
          this.server.getNav();
          //this.checkLogionState();
        },
        events: function() {
          $(".search_btn").click(function() {
            console.log(11);
          });
          $("#logout").click(function() {
            manager.signoutPopupCallback(true);
            manager.removeUser();
            manager.clearStaleState();
            manager
              .signoutRedirect({ state: "signOut" })
              .then(function(resp) {
                //mgr.signoutRedirect().then(function(resp) {
                log("signed out", resp);
              })
              .catch(function(err) {
                log(err);
              });
          });
        },
        server: {
          getNav: function() {
            $.ajax({
              type: "get",
              url: layui.setter.baseUrl + "/api/Navigation/treeview/menuLink",
              // async: true,
              success: function(data) {
                if (data.IsSucceed) {
                  const navData = data.Result.TreeNodes;
                  navData[0].Children.push({
                    Code: "06",
                    Flag: "nav",
                    Icon: "true",
                    Id: "001",
                    IsExpand: true,
                    Key: "001",
                    ParentId: null,
                    Title: "租户管理",
                    Url: "/platform/tenant?rad=1GpEZITN"
                  });
                  navData[0].Children.push({
                    Code: "07",
                    Flag: "nav",
                    Icon: "true",
                    Id: "002",
                    IsExpand: true,
                    Key: "003",
                    ParentId: null,
                    Title: "上传测试",
                    Url: "/tpl/from/updata?rad=1GpEZITN"
                  });
                  $("#navBox").html(renderNav(navData));
                  element.init();
                } else {
                  layer.msg("导航数据加载失败!", {
                    icon: 5
                  });
                }
              },
              error: function(err) {
                layer.closeAll();
                layer.msg("数据加载失败", { icon: 5 });
              }
            });
          }
        },
        render: {
          // showLoginName: function(data) {
          //   var name = data && data.name ? data.name : "sysadmin";
          //   $("#currentName").html(name);
          // },
          // showStateInfo: function(data) {
          //   console.log(data, "回调数据");
          //   layer.open({
          //     title: "信息!",
          //     content: "您未登录请先登录!",
          //     icon: 2,
          //     offset: "200px",
          //     yes: function(index, layero) {
          //       console.log("点击了回调");
          //       window.location = "./login.html";
          //     },
          //     cancel: function() {
          //       //右上角关闭回调
          //       console.log("取消关闭");
          //       //return false 开启该代码可禁止点击该按钮关闭
          //       window.location = "./login.html";
          //     }
          //   });
          // }
        },
        checkLogionState: function() {
          manager
            .getUser()
            .then(function(user) {
              console.log("got user获取用户信息", user);
            })
            .catch(function(err) {
              console.log(err);
            });
        }
      };
      renderIndex.init();
    }
  );
