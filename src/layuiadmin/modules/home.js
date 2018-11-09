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
      "form",
      "layer",
      "jquery",
      "laypage",
      "setter",
      "element",
      "renderNav"
    ],
    function() {
      var layer = parent.layer === undefined ? layui.layer : parent.layer,
        laypage = layui.laypage,
        laydata = layui.laydata,
        element = layui.element,
        $ = layui.jquery,
        renderNav = layui.renderNav;

      function getCookie(name) {
        var arr = document.cookie.match(
          new RegExp("(^| )" + name + "=([^;]*)(;|$)")
        );
        if (arr != null) {
          return unescape(arr[2]);
        } else {
          return null;
        }
      }
      var renderIndex = {
        init: function() {
          //this.renderLoad();
          this.events();
          this.server.getNav();
        },
        events: function() {
          $(".search_btn").click(function() {
            console.log(11);
          });
        },
        server: {
          getNav: function() {
            $.ajax({
              type: "get",
              url: layui.setter.baseUrl + "/api/Navigation/treeview/menuLink",
              // async: true,
              success: function(data) {
                layer.closeAll();
                console.log(data, "数据");
                if (data.IsSucceed) {
                  const navData = data.Result.TreeNodes;

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
        }
      };
      renderIndex.init();
    }
  );
