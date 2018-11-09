layui
  .config({
    base: "../../../layuiadmin/" //静态资源所在路径
  })
  .extend({
    index: "lib/index" //主入口模块
  })
  .use(["index", "table", "layer"], function() {
    var $ = layui.$,
      form = layui.form,
      table = layui.table;
    layer = layui.layer;
    //监听搜索
    form.on("submit(IccRegist-search)", function(data) {
      var field = data.field;
      console.log(data, "数据");
      //执行重载
      table.reload("iccRegistTable", {
        where: field
      });
    });

    //用户管理表格渲染
    var iccRegistTable = table.render({
      elem: "#iccRegistTable",
      url: layui.setter.huibleUrl + "/api/IccWchat/regist/search", //接口
      parseData: layui.setter.parseData,
      request: layui.setter.request,
      cols: [
        [
          {
            field: "Mac",
            // width: 100,
            title: "Mac号"
          },
          { field: "DeviceId", title: "设备Id", minWidth: 100 },
          {
            field: "DeviceType",
            title: "设备类型",
            templet: function(d) {
              if (d.DeviceType === "blue") {
                return '<span class="layui-badge layui-bg-blue">蓝牙</span>';
              } else {
                return '<span class="layui-badge layui-bg-gray">蓝牙</span>';
              }
            }
          },
          {
            field: "IsActived",
            title: "设备是否激活",
            templet: function(d) {
              if (d.IsActived == true) {
                return '<span class="layui-badge layui-bg-blue">已激活</span>';
              } else {
                return '<span class="layui-badge layui-bg-gray layui-badge-rim">未激活</span>';
              }
            }
          },
          {
            field: "CreateDate",
            title: "设备创建时间",
            templet: function(d) {
              return "<div>" + layui.util.toDateString(d.CreateDate) + "</div>";
            }
          },
          {
            title: "操作",
            width: 150,
            align: "center",
            fixed: "right",
            toolbar: "#table-IccRegist"
          }
        ]
      ],
      loading: true,
      page: true,
      limit: 10,
      text: "对不起，加载出现异常！"
    });

    //监听工具条
    table.on("tool(table-IccRegist)", function(obj) {
      var data = obj.data;
      if (obj.event === "unActive") {
        var msg = data.IsActived
          ? "确认要取消激活该设备吗?"
          : "确认要激活该设备吗?";
        layer.confirm(msg, { icon: 3, title: "提示" }, function(index) {
          userSeverEvent.unActive(data);
        });
      }
    });
    //服务交互

    //事件
    var active = {
      import: function() {
        console.log("模板导入");
      },
      export: function() {
        console.log("导出数据");
      }
    };

    //按钮操作
    $(".layui-btn").on("click", function() {
      var type = $(this).data("type");
      active[type] ? active[type].call(this) : "";
    });
  });
