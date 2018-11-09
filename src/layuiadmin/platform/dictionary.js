layui
  .config({
    base: "../../../layuiadmin/" //静态资源所在路径
  })
  .extend({
    index: "lib/index" //主入口模块
  })
  .use(["index", "table", "consts", "common", "z_treeConfig"], function() {
    var $ = layui.$,
      form = layui.form,
      consts = layui.consts,
      common = layui.common,
      table = layui.table;
    z_treeConfig = layui.z_treeConfig;
    //右侧表格页面管理

    form.on("submit(DepartmentSub)", function(data) {
      console.log(data.field); //当前容器的全部表单字段;
      dictionary.server.add(data.field);
      return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
    });
    //监听工具条
    table.on("tool(dectionaryTable)", function(obj) {
      var data = obj.data;
      console.log(data);
      if (obj.event === "del") {
        var msg = "你确定要删除该数据吗?";
        layer.confirm(msg, { icon: 3, title: "提示" }, function(index) {
          dictionary.server.delet(data);
        });
      } else if (obj.event === "edit") {
        dictionary.render.openFrom(true);
        form.val("DepartmentFrom", {
          Name: data.Name, // "name": "value"
          Code: data.Code,
          Sort: data.Sort,
          open: false,
          Description: "我爱layui"
        });
      }
    });
    //
    //字典管理
    var dictionary = {
      init: function() {
        dictionary.server.getDictionaryData();
        dictionary.event();
      },
      baseData: {
        baseData: {},
        editFalge: false
      },
      event: function() {
        $("#delet").click(function() {
          layer.confirm(
            "你确定要删除该数据吗?",
            {
              btn: ["确定", "取消"], //按钮
              icon: 3
            },
            function() {
              console.log("确认", data);
              organ.server.delet(data.Flag, data.Id);
            },
            function() {
              console.log("取消");
            }
          );
        });
        //弹出层
        $("#showDepartment").click(function() {
          dictionary.render.openFrom(false);
          dictionary.currData.clearForm();
        });
      },
      server: {
        getDictionaryData: function(data) {
          common
            .ajaxFun("get", "/api/Dictionary/info/business/list")
            .then(function(res) {
              if (common.appResult.isSucceeded(res)) {
                console.log(res, "返回数据");
                //渲染树
                var data = [
                  { Name: "字段1", Code: "0001", Sort: 1, Text: "属性1" },
                  { Name: "字段2", Code: "0002", Sort: 2, Text: "属性1" }
                ];
                dictionary.render.renderTree(res.Result);
                dictionary.render.renderTable(data);
              } else {
                common.appResult.loadErrorText(res);
              }
            })
            .fail(err => {
              console.log(err);
            });
        },
        add: function(data) {
          var dataBean = layui.consts.basePostData("CreateDictionaryInfo");
          dataBean.data = data;
          var str1 = JSON.stringify(dataBean);
          common
            .ajaxFun("post", "/api/Dictionary/info", str1)
            .then(function(res) {
              if (common.appResult.isSucceeded(res)) {
                layer.msg("添加成功!", { icon: 6 });
                table.reload("LAY-user-manage");
              } else {
                layer.msg("添加数据失败!", { icon: 5 });
                common.appResult.loadErrorText(res);
              }
            })
            .fail(err => {
              console.log(err);
            });
        },
        eidt: function(data) {
          var dataBean = layui.consts.basePostData("UpdateDictionaryInfo");
          dataBean.data = data;
          var str1 = JSON.stringify(dataBean);
          common
            .ajaxFun("put", "/api/Dictionary/info", str1)
            .then(function(res) {
              if (common.appResult.isSucceeded(res)) {
                layer.msg("数据更新成功!", { icon: 6 });
                table.reload("LAY-user-manage");
              } else {
                common.appResult.loadErrorText(res);
              }
            })
            .fail(err => {
              console.log(err);
            });
        },
        delet: function(data) {
          var dataBean = layui.consts.basePostData("RemoveDictionaryInfo");
          dataBean.data = data;
          var str1 = JSON.stringify(dataBean);
          common
            .ajaxFun("DELETE", "/api/Dictionary/info", str1)
            .then(function(res) {
              if (common.appResult.isSucceeded(res)) {
                layer.msg("数据删除成功!", { icon: 6 });
                table.reload("LAY-user-manage");
              } else {
                layer.msg("数据删除失败!", { icon: 5 });
                common.appResult.loadErrorText(res);
              }
            })
            .fail(err => {
              console.log(err);
            });
        }
      },
      render: {
        renderTree: function(data) {
          //渲染树 1.数据 2.DOM节点 3.配置项目
          console.log(11);
          dictionary.baseData.treeObj = layui.z_treeConfig.renderTree(
            data,
            "treeDictionary",
            {
              callback: {
                onClick: dictionary.currData.treeOnClick
              }
            }
          );
        },
        renderTable: function(data) {
          table.render({
            elem: "#dectionaryTable", //指定原始表格元素选择器（推荐id选择器）
            data: data,
            cols: [
              [
                {
                  field: "Code",
                  title: "字段编码"
                },
                { field: "Name", title: "字段名" },
                { field: "Sort", title: "排序", sort: true },
                {
                  title: "操作",
                  width: 150,
                  align: "center",
                  fixed: "right",
                  toolbar: "#table-tool"
                }
              ]
            ]
          });
        },
        openFrom: function(flage) {
          dictionary.baseData.editFalge = flage;
          layer.open({
            type: 1,
            title: dictionary.baseData.editFalge ? "编辑字典" : "添加字典",
            content: $("#DepartmentFrom"),
            area: "500px",
            btn: ["确定", "取消"],
            yes: function(index, layero) {
              var submit = $("#DepartmentSub");
              submit.trigger("click");
            }
          });
        }
      },
      currData: {
        //清空表单
        clearForm: function() {
          form.val("DepartmentFrom", {
            Name: "", // "name": "value"
            Code: "",
            Sort: "",
            open: "",
            Description: ""
          });
        }
      }
    };
    dictionary.init();
  });
