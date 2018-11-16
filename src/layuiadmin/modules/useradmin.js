layui.define(["table", "form", "common", "consts"], function(exports) {
  var $ = layui.$,
    table = layui.table,
    common = layui.common,
    form = layui.form;
  var laypage = layui.laypage;
  //用户管理表格渲染
  var userManageTable = table.render({
    elem: "#LAY-user-manage",
    url: layui.setter.baseUrl + "/api/User/query/group/normal/1/10", //接口
    // ,response:layui.setter.response
    parseData: layui.setter.parseData,
    cols: [
      [
        {
          field: "GroupClassify",
          width: 100,
          title: "类别",
          templet: function(d) {
            if ((d.GroupClassify = "normal")) {
              return "普通用户";
            } else if ((d.GroupClassify = "manager")) {
              return "业务管理员";
            } else {
              return "未知类别";
            }
          }
        },
        { field: "NormalizedName", title: "用户名", minWidth: 100 },
        { field: "Email", title: "邮箱" },
        { field: "sex", width: 80, title: "性别" },
        {
          field: "CreateDate",
          title: "创建日期",
          sort: true,
          templet: function(d) {
            return "<div>" + layui.util.toDateString(d.CreateDate) + "</div>";
          }
        },
        {
          field: "锁定/解锁",
          title: "锁定/解锁",
          templet: function(d) {
            if (d.LockoutEnabled) {
              return '<a class="layui-btn layui-btn-primary layui-btn-xs" lay-event="unlock">解锁</a>';
            } else {
              return '<a class="layui-btn layui-btn-normal layui-btn-xs" lay-event="lock">锁定</a>';
            }
          }
        },
        {
          title: "操作",
          width: 150,
          align: "center",
          fixed: "right",
          toolbar: "#table-useradmin-webuser"
        }
      ]
    ],
    loading: true,
    // page: {
    //   jump: function(obj, first) {
    //     console.log(obj, first, "shusju");
    //   }
    // },
    limit: 10,
    text: "对不起，加载出现异常！"
  });

  //分页
  laypage.render({
    elem: "page",
    count: 70, //数据总数，从服务端得到
    curr: location.hash.replace("#!fenye=", ""), //获取起始页
    hash: "fenye", //自定义hash值
    layout: ["prev", "page", "next"],
    jump: function(obj, first) {
      //obj包含了当前分页的所有参数，比如：
      //首次不执行
      if (!first) {
        table.reload("LAY-user-manage", {
          url:
            layui.setter.baseUrl +
            "/api/User/query/group/normal/" +
            obj.curr +
            "/" +
            obj.limit
        });
      }
    }
  });

  //服务交互
  var userSeverEvent = {
    lockUser: function(data) {
      var str1 = JSON.stringify(dataBean);
      var dataBean = layui.consts.basePostData();
      dataBean.Data = data;
      var str1 = JSON.stringify(dataBean);
      common
        .ajaxFun("put", "/api/User/lockout/active", str1)
        .then(function(res) {
          if (common.appResult.isSucceeded(res)) {
            layer.msg("用户状态修改成功!", { icon: 6 });
            layer.closeAll();
            table.reload("LAY-user-manage");
          } else {
            common.appResult.loadErrorText(res);
          }
        })
        .fail(err => {
          console.log(err);
        });
    },
    unLockUser: function(data) {
      common
        .ajaxFun("put", "/api/User/lockout/cancel/" + data.Id)
        .then(function(res) {
          if (common.appResult.isSucceeded(res)) {
            table.reload("LAY-user-manage"); //数据刷新
            layer.msg("数据解锁成功", { time: 4000, icon: 6 });
          } else {
            common.appResult.loadErrorText(res);
          }
        })
        .fail(err => {
          console.log(err);
        });
    },
    delete: function(data) {
      common
        .ajaxFun("delete")
        .then(function(res) {
          if (common.appResult.isSucceeded(res)) {
            console.log("用户删除成功!");
          } else {
            common.appResult.loadErrorText(res);
          }
        })
        .fail(err => {
          console.log(err);
        });
    },
    edit: function(data) {
      console.log(data);
    }
  };
  //监听工具条
  table.on("tool(LAY-user-manage)", function(obj) {
    var data = obj.data;
    if (obj.event === "del") {
      layer.close();
      layer.confirm("确认删除该用户吗?", { icon: 3, title: "提示" }, function(
        index
      ) {
        userSeverEvent.delete(data);
      });
    } else if (obj.event === "edit") {
      var tr = $(obj.tr);
      layer.open({
        type: 2,
        title: "编辑用户",
        content: "../tpl/from/userFrom.html",

        maxmin: true,
        area: ["700px", "400px"],
        btn: ["确定", "取消"],
        yes: function(index, layero) {
          var iframeWindow = window["layui-layer-iframe" + index],
            submitID = "LAY-user-front-submit",
            submit = layero
              .find("iframe")
              .contents()
              .find("#" + submitID);
          //监听提交
          iframeWindow.layui.form.on("submit(" + submitID + ")", function(
            data
          ) {
            var field = data.field; //获取提交的字段
            //提交 Ajax 成功后，静态更新表格中的数据
            //$.ajax({});
            console.log(file, "编辑");
            layer.close(index); //关闭弹层
          });
          submit.trigger("click");
        },
        success: function(layero, index) {}
      });
    } else if (obj.event === "lock") {
      layer.open({
        type: 1,
        title: "锁定解锁", //不显示标题
        content: $("#lock-from"),
        area: ["700px"],
        btn: ["确认", "取消"],
        yes: function() {
          var userinfo = {
            Seconds: $("#Seconds").val(),
            IsLockForever: $("input[name='IsLockForever']:checked").val(),
            UserId: data.Id
          };
          var r = /^\+?[0-9][0-9]*$/; //正整数
          var flag = r.test(userinfo.Seconds);
          if (!flag) {
            layer.msg("请输入正确的秒数!");
            return;
          }
          userSeverEvent.lockUser(userinfo);
        },
        btn2: function(index, layero) {
          console.log("取消锁定解锁1");
        }
      });
    } else if (obj.event === "unlock") {
      layer.confirm("确认要解锁该用户吗?", { icon: 3, title: "提示" }, function(
        index
      ) {
        userSeverEvent.unLockUser(data);
      });
    }
  });
  exports("useradmin", {});
});
