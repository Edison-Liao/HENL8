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
        if (region.baseData.editFalge) {
          console.log("执行编辑命令");
          region.server.eidtOrgan(data.field, "/api/Role", "department");
        } else {
          region.server.addOrgan(data.field, "/api/Role", "department");
          console.log("执行添加命令");
        }
        return false;
      });
      //数据表单监听(角色)
      form.on("submit(staffFrom)", function(data) {
        delete data.field.topName;
        console.log("新增");
        if (region.baseData.editFalge) {
          region.server.eidtOrgan(data.field, "/api/Role", "staff");
        } else {
          region.server.addOrgan(data.field, "/api/Role", "staff");
        }
        return false;
      });
      //region
      var region = {
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
            region.server.getTreeData();
            region.baseData.editFalge = false;
            region.baseData.sunNodeFalge = false;
            common.isDisableButton("#delet", true);
            common.isDisableButton("#delet", true);
          });
          $("#showDepartment").click(function() {
            $("#formTitle").html("新增区域信息");
            $(".submit").html("立即提交");
            form.val("DepartmentFrom", {
              topName: region.baseData.nodeData.Title
            });
            region.baseData.editFalge = false;
            region.baseData.sunNodeFalge = false;
          });
          $("#showStaff").click(function() {
            $("#formTitle").html("新增子域信息");
            $(".submit").html("立即提交");
            region.baseData.sunNodeFalge = true;
            region.baseData.editFalge = false;
          });
          $("#delet").click(function() {
            region.render.openDeleteConfirm(region.baseData.nodeData);
          });
        },
        server: {
          getTreeData: function() {
            common
              .ajaxFun("get", "/api/Region/tree")
              .then(function(res) {
                if (common.appResult.isSucceeded(res)) {
                  //渲染树
                  region.render.renderTree(res.Result.TreeNodes);
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
              region.render.showForm("#DepartmentFrom");
            } else if (flage === "roleInfo") {
              urlID = "/api/Role/" + id;
              region.render.showForm("#staffFrom");
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
                  region.baseData.nodeData = data.Result;
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
            if (region.baseData.sunNodeFalge) {
              data.ParentId = region.baseData.nodeData.Id;
            } else {
              data.ParentId = "";
            }
            dataBean.Data = data;
            console.log(data);
            var str1 = JSON.stringify(dataBean);
            common
              .ajaxFun("post", "/api/Region/info", str1)
              .then(function(res) {
                if (common.appResult.isSucceeded(res)) {
                  region.server.getTreeData();
                  layer.msg("数据添加成功!", { icon: 6 });
                } else {
                  common.appResult.loadErrorText(res);
                }
              })
              .fail(err => {
                console.log(err);
              });
          },
          eidtOrgan: function(data, url) {
            var dataBean = layui.consts.basePostData();
            data.Id = region.baseData.id;
            dataBean.Data = data;

            var str1 = JSON.stringify(dataBean);
            var dataBean = layui.consts.basePostData();
            if (flage === "staff") {
              data.ParentId = region.baseData.id;
            }
            data.ParentId = "";
            dataBean.Data = data;
            var str1 = JSON.stringify(dataBean);
            common
              .ajaxFun("put", "/api/Region/info", str1)
              .then(function(res) {
                if (common.appResult.isSucceeded(res)) {
                  console.log("数据添加成功");
                } else {
                  common.appResult.loadErrorText(res);
                }
              })
              .fail(err => {
                console.log(err);
              });
          },
          delet: function(flage, id) {
            console.log(flage, id, "id信息");
            var urlID = "";
            if (flage === "regionInfo") {
              urlID = "/api/Region/info/" + id;
            } else {
              return;
            }
            common
              .ajaxFun("DELETE", urlID)
              .then(function(res) {
                if (common.appResult.isSucceeded(res)) {
                  region.server.getTreeData();
                  layer.msg("数据删除成功!", { icon: 6 });
                } else {
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
            region.baseData.treeObj = layui.z_treeConfig.renderTree(
              data,
              "treeRegion",
              {
                callback: {
                  onClick: region.currData.treeOnClick
                }
              }
            );
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
                region.server.delet(data.Flag, data.Id);
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
          treeOnClick: function(e, id, node) {
            console.log(node);
            common.isDisableButton("#delet", false);
            common.isDisableButton("#showStaff", false);
            region.baseData.nodeData = node;
          }
        }
      };
      region.init();
    }
  );
