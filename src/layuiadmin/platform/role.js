layui
  .config({
    base: "../../../layuiadmin/"
  })
  .extend({
    index: "lib/index" //主入口模块
  })
  .use(
    ["index", "table", "layer", "tree", "common", "consts", "z_treeConfig"],
    function() {
      var $ = layui.$,
        form = layui.form,
        table = layui.table,
        layer = layui.layer,
        tree = layui.tree,
        common = layui.common;

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
      form.on("submit(staffFrom)", function(data) {
        delete data.field.topName;
        if (organ.baseData.editFalge) {
          organ.server.eidtOrgan(data.field, "/api/Role", "staff");
        } else {
          organ.server.addOrgan(data.field, "/api/Role", "staff");
        }
        return false;
      });
      //organ
      var organ = {
        init: function() {
          this.server.getTreeData();
          this.render.showtips();
          this.event();
        },
        baseData: {
          treeNode: {},
          id: "",
          nodeData: {},
          editFalge: false
        },
        event: function() {
          $("#refresh").click(function() {
            $("#treeOrgan").html("");
            organ.server.getTreeData();
            organ.baseData.editFalge = false;
          });
          $("#showDepartment").click(function() {
            $("#formTitle").html("新增角色分组信息");
            $(".submit").html("立即提交");
            organ.render.showForm("#DepartmentFrom");
            form.val("DepartmentFrom", {
              topName: organ.baseData.treeNode.name
            });
            organ.baseData.editFalge = false;
          });
          $("#showStaff").click(function() {
            $("#formTitle").html("新增角色信息");
            $(".submit").html("立即提交");
            organ.render.showForm("#staffFrom");
            form.val("staffFrom", {
              topName: organ.baseData.treeNode.name
            });
            organ.baseData.editFalge = false;
          });
          $("#lower").click(function() {
            organ.server.moveNodeData(organ.baseData.treeNode, false);
            organ.baseData.editFalge = false;
          });
          $("#upper").click(function() {
            organ.server.moveNodeData(organ.baseData.treeNode, true);
            organ.baseData.editFalge = false;
          });
          $("#delet").click(function() {
            organ.render.openDeleteConfirm(organ.baseData.treeNode);
          });
        },
        server: {
          getTreeData: function() {
            $.ajax({
              type: "get",
              url: layui.setter.baseUrl + "/api/Role/treeview",
              dataType: "json",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
              },
              success: function(data) {
                layer.closeAll("loading");
                console.log(data);
                if (data.IsSucceed) {
                  console.log(data.Result.TreeNodes);
                  var nodeData = data.Result.TreeNodes;
                  function currData(data) {
                    if (data.length > 0) {
                      for (var i = 0; i < data.length; i++) {
                        data[i].name = data[i].Title;
                        data[i].children = data[i].Children;
                        if (data[i].Children.length > 0) {
                          currData(data[i].Children);
                        }
                      }
                    }
                    return data;
                  }
                  var nodeData1 = currData(nodeData);
                  organ.render.renderTree(nodeData);
                } else {
                  layer.msg("获取数据失败" + data, { icon: 5 });
                }
              },
              error: function(err) {
                layer.closeAll();
                layer.msg("数据操作失败", { icon: 5 });
              }
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
                console.log(data);
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
          },
          addOrgan: function(data, url, flage) {
            var dataBean = layui.consts.basePostData();
            if (flage === "staff") {
              data.ParentId = organ.baseData.id;
            }
            dataBean.Data = data;
            console.log(data);
            var str1 = JSON.stringify(dataBean);
            layer.load();
            $.ajax({
              type: "post",
              url: layui.setter.baseUrl + url,
              data: str1,
              dataType: "json",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
              },
              success: function(data) {
                layer.closeAll();
                console.log(data);
                if (data.IsSucceed) {
                  $("#treeOrgan").html("");
                  organ.server.getTreeData();
                  layer.msg("添加成功!", { icon: 6 });
                } else {
                  layer.msg("增加数据失败! " + data.Errors[0].Message, {
                    icon: 5
                  });
                }
              },
              error: function(err) {
                layer.closeAll();
                layer.msg("数据操作失败", { icon: 5 });
              }
            });
          },
          eidtOrgan: function(data, url) {
            var dataBean = layui.consts.basePostData();
            data.Id = organ.baseData.id;
            dataBean.Data = data;

            var str1 = JSON.stringify(dataBean);
            layer.load();
            $.ajax({
              type: "put",
              url: layui.setter.baseUrl + url + "/" + organ.baseData.id,
              data: str1,
              dataType: "json",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
              },
              success: function(data) {
                layer.closeAll();
                console.log(data);
                if (data.IsSucceed) {
                  $("#treeOrgan").html("");
                  organ.server.getTreeData();
                  layer.msg("修改成功!", { icon: 6 });
                } else {
                  layer.msg("增加数据失败! " + data.Errors[0].Message, {
                    icon: 5
                  });
                }
              },
              error: function(err) {
                layer.closeAll();
                layer.msg("数据操作失败", { icon: 5 });
              }
            });
          },
          moveNodeData: function(data, isRise) {
            var urlID = "";
            if (data.Flag === "roleInfo") {
              urlID = "/api/Role/" + data.Id + "/order/" + isRise;
            } else {
              return;
            }
            layer.load();
            $.ajax({
              type: "put",
              url: layui.setter.baseUrl + urlID,
              dataType: "json",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
              },
              success: function(data) {
                layer.closeAll("loading");
                console.log(data);
                if (data.IsSucceed) {
                  $("#treeOrgan").html("");
                  organ.server.getTreeData();
                  layer.msg("数据移动成功", { icon: 1 });
                } else {
                  layer.msg("数据操作失败" + data.Errors[0].Message, {
                    icon: 5
                  });
                }
              },
              error: function(err) {
                layer.closeAll();
                layer.msg("数据操作失败", { icon: 5 });
              }
            });
          },
          delet: function(flage, id) {
            layer.load();
            var urlID = "";
            if (flage === "roleInfo" || flage === "roleCatalog") {
              urlID = "/api/Role/" + id;
            } else {
              layer.closeAll();
              return;
            }
            $.ajax({
              type: "DELETE",
              url: layui.setter.baseUrl + urlID,
              dataType: "json",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
              },
              success: function(data) {
                layer.closeAll();
                console.log(data);
                if (data.IsSucceed) {
                  $("#treeOrgan").html("");
                  organ.server.getTreeData();
                  layer.alert("删除成功", {
                    icon: 1
                  });
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
            //树形渲染

            organ.baseData.treeObj = layui.z_treeConfig.renderTree(
              data,
              "treeOrgan",
              {
                callback: {
                  onClick: organ.currData.treeOnClick
                }
                // view: {
                //   showIcon: organ.currData.viewshowIcon
                // }
              }
            );
          },
          renderTitle: function(flag) {
            if (flag === "roleCatalog") {
              $("#formTitle").html("编辑角色信息分组");
            } else if (flag === "roleInfo") {
              $("#formTitle").html("编辑角色信息");
            }
          },
          showForm: function(id) {
            $("#DepartmentFrom").addClass("layui-hide");
            $("#staffFrom").addClass("layui-hide");
            $(id).show();
            $(id).removeClass("layui-hide");
          },
          renderFormData: function(data) {
            if (data.Flag === "roleCatalog") {
              form.val("DepartmentFrom", {
                Name: data.Title
              });
            }
          },
          disabledBtton: function(flage) {
            common.isDisableButton("#lower", false);
            common.isDisableButton("#upper", false);
            common.isDisableButton("#delet", false);
            if (flage === "roleCatalog") {
              common.isDisableButton("#lower", true);
              common.isDisableButton("#upper", true);
              common.isDisableButton("#showDepartment", false);
              common.isDisableButton("#showStaff", false);
            } else if (flage === "roleInfo") {
              common.isDisableButton("#showDepartment", true);
              common.isDisableButton("#showStaff", true);
            }
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
          getTreeNodeName: function(treeData, id) {
            var title = common.getTreeNodeName(treeData, id, "name");
            $(".topName").val(title);
            $(".submit").html("立即修改");
          },
          viewshowIcon: function(treeId, treeNode) {
            return treeNode.Flag !== "roleInfo";
          },
          treeOnClick: function(e, id, node) {
            console.log(node);
            organ.baseData.treeNode = node;
            organ.baseData.id = node.Id;
            organ.baseData.editFalge = true;
            organ.render.renderTitle(node.Flag);
            organ.server.getNodedata(node.Flag, node.Id);
            organ.render.disabledBtton(node.Flag);
            var PidNode = organ.baseData.treeObj.getNodeByTId(node.parentTId);
            if (PidNode) {
              $("body .topName").val(PidNode.Title);
              $(".submit").html("立即修改");
            }
          }
        }
      };
      organ.init();
    }
  );
