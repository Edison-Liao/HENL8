layui
  .config({
    base: "../../../layuiadmin/"
  })
  .extend({
    index: "lib/index" //主入口模块
  })
  .use(
    ["index", "table", "layer", "common", "consts", "z_treeConfig"],
    function() {
      var $ = layui.$,
        form = layui.form,
        table = layui.table,
        layer = layui.layer,
        tree = layui.tree,
        common = layui.common,
        z_treeConfig = layui.z_treeConfig;
      //数据表单监听(部门)
      form.on("submit(DepartmentFrom)", function(data) {
        console.log(data.field, "新增部门");
        delete data.field.topName;
        if (organ.baseData.editFalge) {
          console.log("执行编辑命令");
          organ.server.eidtOrgan(data.field, "/api/Role", "department");
        } else {
          organ.server.addOrgan(data.field, "/api/Role", "department");
          console.log("执行添加命令");
        }
        return false;
      });
      //数据表单监听(角色)

      //organ
      var organ = {
        init: function() {
          this.server.getTreeData();
          this.render.showtips();
          this.event();
        },
        baseData: {
          treeObj: {},
          id: "",
          nodeData: {},
          sunNodeFalge: false,
          editFalge: false
        },
        event: function() {
          $("#refresh").click(function() {
            $("#treeOrgan").html("");
            organ.server.getTreeData();

            common.isDisableButton("#delet", true);
            common.isDisableButton("#delet", true);
          });
          $("#showDepartment").click(function() {
            organ.currData.getcheckedData();
          });
          $("#showStaff").click(function() {});
          $("#delet").click(function() {
            organ.render.openDeleteConfirm(organ.baseData.nodeData);
          });
        },
        server: {
          getTreeData: function() {
            console.log("获取数据信息");
            common
              .ajaxFun("get", "/api/Organ/treeview")
              .then(function(res) {
                if (common.appResult.isSucceeded(res)) {
                  var iconCode = organ.currData.addIcon(res.Result.TreeNodes);
                  //渲染树
                  organ.render.renderTree(iconCode);
                } else {
                  common.appResult.loadErrorText(res);
                }
              })
              .fail(err => {
                console.log(err);
              });
          },
          getNodedata: function(flage, id) {
            var urlID = "";
            if (flage === "roleCatalog") {
              urlID = "/api/Role/" + id;
              organ.render.showForm("#DepartmentFrom");
            } else if (flage === "roleInfo") {
              urlID = "/api/Role/" + id;
              organ.render.showForm("#staffFrom");
            } else {
              return;
            }
            layer.load(2);
            $.ajax({
              type: "get",
              url: layui.setter.baseUrl + urlID,
              dataType: "json",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
              },
              success: function(data) {
                layer.closeAll();

                if (data.IsSucceed) {
                  organ.baseData.nodeData = data.Result;
                  var dataNode = data.Result;
                  if (flage === "roleCatalog") {
                    form.val("DepartmentFrom", {
                      Name: dataNode.Name,
                      Code: dataNode.Code,
                      Message: dataNode.Message
                    });
                  } else if (flage === "roleInfo") {
                    form.val("staffFrom", {
                      Name: dataNode.Name,
                      Code: dataNode.Code,
                      Message: dataNode.Message
                    });
                  }
                } else {
                  layer.msg("获取节点数据失败! " + data.Errors[0].Message, {
                    icon: 5
                  });
                }
              },
              error: function(err) {
                layer.closeAll();
                layer.msg("数据操作失败", { icon: 5 });
              }
            });
          }
        },
        render: {
          renderTree: function(data) {
            //渲染树 1.数据 2.DOM节点 3.配置项目
            organ.baseData.treeObj = layui.z_treeConfig.renderTree(
              data,
              "treeRegion",
              {
                callback: {
                  onClick: organ.currData.treeOnClick
                },
                check: {
                  enable: true
                }
              }
            );
          },
          showtips: function() {
            common.showtips(".layui-btn-group button");
          },
          openDeleteConfirm: function(data) {
            layer.confirm(
              "你确定要删除<span style='font-weight:bolder'>" +
                data.Title +
                "</span>的节点吗?",
              {
                btn: ["确定", "取消"], //按钮
                icon: 3
              },
              function() {
                organ.server.delet(data.Flag, data.Id);
              },
              function() {
                console.log("取消");
              }
            );
          }
        },
        currData: {
          addIcon: function(data) {
            console.log(data, "数据");
            if (data.length > 0) {
              for (var i = 0; i < data.length; i++) {
                if (data[i].Flag === "organ") {
                  data[i].icon =
                    "../../../layuiadmin/style/img/ztreeImg/company.png";
                  data[i].iconOpen =
                    "../../../layuiadmin/style/img/ztreeImg/companyOp.png";
                } else if (data[i].Flag === "department") {
                  data[i].icon =
                    "../../../layuiadmin/style/img/ztreeImg/department.png";
                  data[i].iconOpen =
                    "../../../layuiadmin/style/img/ztreeImg/departmentOp.png";
                } else if (data[i].Flag === "position") {
                  data[i].icon =
                    "../../../layuiadmin/style/img/ztreeImg/position.png";
                  data[i].iconOpen =
                    "../../../layuiadmin/style/img/ztreeImg/positionOp.png";
                } else if (data[i].Flag === "staff") {
                  delete data[i].Children;
                  data[i].icon =
                    "../../../layuiadmin/style/img/ztreeImg/staff.png";
                  data[i].iconOpen =
                    "../../../layuiadmin/style/img/ztreeImg/staffOp.png";
                }
                if (data[i].Children && data[i].Children.length > 0) {
                  organ.currData.addIcon(data[i].Children);
                }
              }
            }
            return data;
          },
          getTreeNodeName: function(treeData, id) {
            var title = common.getTreeNodeName(treeData, id, "name");
            $(".topName").val(title);
            $(".submit").html("立即修改");
          },
          //每个节点的点击事件
          treeOnClick: function(e, id, node) {
            console.log(node);
            common.isDisableButton("#delet", false);
            common.isDisableButton("#showStaff", false);
            organ.baseData.nodeData = node;
          },
          //获取勾选的数据
          getcheckedData() {
            //获取节点
            var data = organ.baseData.treeObj.getCheckedNodes(true);
            console.log(data, "打印节点");
          }
        }
      };
      organ.init();
    }
  );
