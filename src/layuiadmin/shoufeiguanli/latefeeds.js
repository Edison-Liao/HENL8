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
    var userSeverEvent = {
      addMac: function(data) {
        layer.closeAll();
        layer.load(0, { shade: false });
        var dataBean = layui.setter.basePostData;
        dataBean.Data = data;
        var str1 = JSON.stringify(dataBean);
        $.ajax({
          type: "Post",
          url: layui.setter.huibleUrl + "/api/IccWchat/regist",
          data: str1,
          async: true,
          dataType: "json",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          success: function(data) {
            layer.closeAll();
            console.log(data);
            if (data.IsSucceed) {
              layer.msg("添加用户成功!", { icon: 6 });
              table.reload("iccRegistTable");
            } else {
              table.reload("iccRegistTable");
              layer.msg("失败" + data, { icon: 5 });
            }
          },
          error: function(err) {
            layer.closeAll();
            layer.msg("数据操作失败", { icon: 5 });
          }
        });
      },
      unActive: function(data) {
        layer.closeAll();
        layer.load(0, { shade: false });
        var dataBean = layui.setter.basePostData;
        dataBean.Data = {
          IsActived: !data.IsActived,
          RegistId: data.Id
        };
        var str1 = JSON.stringify(dataBean);
        $.ajax({
          type: "put",
          url: layui.setter.huibleUrl + "/api/IccWchat/regist",
          data: str1,
          async: true,
          dataType: "json",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          success: function(res) {
            layer.closeAll();
            console.log(data);
            if (res.IsSucceed) {
              var msg = data.IsActived ? "设备取消激活成功!" : "设备激活成功!";
              layer.msg(msg, { icon: 6 });
              table.reload("iccRegistTable");
            } else {
              table.reload("iccRegistTable");
              layer.msg("失败" + res.Errors[0], { icon: 5 });
            }
          },
          error: function(err) {
            layer.closeAll();
            layer.msg("数据操作失败", { icon: 5 });
          }
        });
      }
    };
    //事件
    var active = {
      add: function() {
        layer.open({
          type: 1,
          title: "新增设备注册信息", //不显示标题
          content: $("#rigist-from"),
          area: ["500px"],
          btn: ["确认", "取消"],
          yes: function() {
            var macData = {
              Mac: $("#Mac").val(),
              Description: "",
              DeviceType: "blue",
              IsForce: "fasle"
            };
            var MacStr = macData.Mac.substr(0, 7);
            if (MacStr !== "34008AD") {
              layer.msg("请输入34008AD开始的MAC号!");
              return;
            } else if (macData.Mac.length !== 12) {
              layer.msg("MAC号为12位字符串!");
              return;
            }
            userSeverEvent.addMac(macData);
          },
          btn2: function(index, layero) {
            console.log("取消锁定解锁1");
          }
        });
      }
    };
    //按钮操作
    $(".layui-btn").on("click", function() {
      var type = $(this).data("type");
      active[type] ? active[type].call(this) : "";
    });
  });
