layui
  .config({
    base: "../../../layuiadmin/" //静态资源所在路径
  })
  .extend({
    index: "lib/index" //主入口模块
  })
  .use(["index", "useradmin", "table", "common", "consts"], function() {
    var $ = layui.$,
      form = layui.form,
      common = layui.common,
      table = layui.table;
    //监听搜索
    form.on("submit(LAY-user-front-search)", function(data) {
      var field = data.field;
      //执行重载
      table.reload("LAY-user-manage", {
        where: field
      });
    });
    //服务交互
    var userSeverEvent = {
      addUser: function(data) {
        //
        var dataBean = layui.consts.basePostData();
        dataBean.Data = data;
        console.log(data);
        var str1 = JSON.stringify(dataBean);
        common
          .ajaxFun("post", "/api/User", str1)
          .then(function(res) {
            if (common.appResult.isSucceeded(res)) {
              layer.msg("数据添加成功!", { icon: 6 });
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
      loadUserClassify: function() {
        common
          .ajaxFun("get", "/api/User/groups")
          .then(function(data) {
            if (common.appResult.isSucceeded(data)) {
              render.loadSelect(data.Result);
            } else {
              common.appResult.loadErrorText(res);
            }
          })
          .fail(err => {
            console.log(err);
          });
      }
    };
    //事件
    var active = {
      batchdel: function() {
        var checkStatus = table.checkStatus("LAY-user-manage"),
          checkData = checkStatus.data; //得到选中的数据
        if (checkData.length === 0) {
          return layer.msg("请选择数据");
        }
        layer.close(index);
        layer.confirm("确定删除吗？", function(index) {
          table.reload("LAY-user-manage");
          layer.msg("已删除");
        });
      },
      add: function() {
        layer.open({
          type: 2,
          title: "添加用户",
          content: "../tpl/from/userFrom.html",
          // content: "../tpl/tree/organTree.html",
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

              userSeverEvent.addUser(field);
              //提交 Ajax 成功后，静态更新表格中的数据
              //$.ajax({});

              layer.close(index); //关闭弹层
            });

            submit.trigger("click");
          }
        });
      }
    };
    var render = {
      loadSelect: function(selectData) {
        var op = "<option value=''></option>";
        for (var i in selectData) {
          op +=
            "<option value=" +
            selectData[i].Value +
            ">" +
            selectData[i].Text +
            "</option>";
        }
        $("#userGroupSelect").html(op);
        form.render("select");
      }
    };
    userSeverEvent.loadUserClassify();
    $(".layui-btn.layuiadmin-btn-useradmin").on("click", function() {
      var type = $(this).data("type");
      active[type] ? active[type].call(this) : "";
    });
  });
