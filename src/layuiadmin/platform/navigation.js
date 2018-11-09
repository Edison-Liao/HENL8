layui
  .config({
    base: "../../../layuiadmin/"
  })
  .extend({
    index: "lib/index" //主入口模块
  })
  .use(
    [
      "index",
      "laydate",
      "table",
      "layer",
      "tree",
      "common",
      "consts",
      "z_treeConfig"
    ],
    function() {
      var $ = layui.$,
        form = layui.form,
        table = layui.table,
        layer = layui.layer,
        tree = layui.tree,
        z_treeConfig = layui.z_treeConfig;
      common = layui.common;

      $("body").on("mousedown", ".layui-tree a", function() {
        if (!$(this).siblings("ul").length) {
          $(".layui-tree a cite").css("color", "#333");
          $(this)
            .find("cite")
            .css("color", "red");
        }
      });
      //数据表单监听(部门)
      form.on("submit(DepartmentFrom)", function(data) {
        delete data.field.topName;
        if (organ.baseData.editFalge) {
          organ.server.eidtOrgan(data.field, "/api/Navigation");
        } else {
          organ.server.addOrgan(data.field, "/api/Navigation");
          console.log("执行添加命令");
        }
        return false;
      });

      //organ
      var organ = {
        init: function() {
          this.server.getTreeData();
          this.server.ModulePermission();
          this.render.showtips();
          this.event();
        },
        baseData: {
          treeNode: {},
          id: "",
          nodeData: {},
          editFalge: false,
          isSunNode: false,
          treeObj: {}
        },
        event: function() {
          $("#refresh").click(function() {
            $("#treeOrgan").html("");
            organ.server.getTreeData();
            $("#delet")
              .addClass("layui-btn-disabled")
              .attr("disabled", "true");
            organ.baseData.editFalge = false;
          });
          $("#showDepartment").click(function() {
            $("#formTitle").html("新增一级信息");
            $("#topName").addClass("layui-hide");
            $(".submit").html("立即提交");
            organ.render.renderFormData("clear");
            organ.baseData.editFalge = false;
            organ.baseData.isSunNode = false;
          });
          $("#showPosition").click(function() {
            $("#formTitle").html("新增多级导航信息");
            $("#topName").removeClass("layui-hide");
            $(".submit").html("立即提交");
            organ.render.renderFormData("clear");
            organ.baseData.editFalge = false;
            organ.baseData.isSunNode = true;
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
              url: layui.setter.baseUrl + "/api/Navigation/treeview/manager",
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
                  organ.render.renderTree(nodeData1);
                  organ.render.renderFormData("clear");
                } else {
                  layer.msg("获取数据失败" + data.Errors[0].Description, {
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
          ModulePermission: function() {
            $.ajax({
              type: "get",
              url: layui.setter.baseUrl + "/api/Module/deep/permission",
              dataType: "json",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
              },
              success: function(data) {
                layer.closeAll("loading");
                console.log(data, "~~~");
                if (data.IsSucceed) {
                  organ.render.loadSelect(data.Result);
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
            console.log("执行");
            var urlID = "";
            if (flage === "nav") {
              urlID = "/api/Navigation/" + id;
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
                  organ.render.renderFormData(flage, dataNode);
                }
              },
              error: function(err) {
                layer.closeAll();
                layer.msg("数据操作失败", { icon: 5 });
              }
            });
          },
          addOrgan: function(data, url, flage) {
            //var dataBean = layui.setter.basePostData;

            var dataBean = layui.consts.basePostData("CreateNavigation");

            if (organ.baseData.isSunNode) {
              data.ParentId = organ.baseData.id;
            }
            data.AccessType = "mvc";
            dataBean.Data = data;

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
            if (data.Flag === "nav") {
              urlID = "/api/Organ/department/" + data.Id + "/order/" + isRise;
            } else if (data.Flag === "position") {
              urlID = "/api/Organ/position/" + data.Id + "/order/" + isRise;
            } else {
              return;
            }
            layer.msg("暂未开放");
            return;
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
                  layer.msg("数据操作失败" + data.Errors[0].Description, {
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
            if (flage === "nav") {
              urlID = "/api/Navigation/" + id;
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
                  layer.msg("获取节点数据失败! " + data.Errors[0].Description, {
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
          // renderTree: function(data) {
          //   //树形渲染
          //   layui.tree({
          //     elem: "#treeOrgan", //指定元素
          //     target: "_blank", //是否新选项卡打开（比如节点返回href才有效）
          //     click: function(item) {
          //       //点击节点回调
          //       organ.baseData.treeNode = item;
          //       organ.baseData.id = item.Id;
          //       organ.baseData.editFalge = true;
          //       console.log(organ.baseData.treeNode);
          //       organ.server.getNodedata(item.Flag, item.Id);
          //       organ.render.renderTitle(item.Flag);
          //       organ.render.disabledBtton(item.Flag);
          //       organ.currData.getTreeNodeName(data, item.ParentId);
          //     },
          //     nodes: data
          //   });
          // },
          renderTree: function(data) {
            //渲染树 1.数据 2.DOM节点 3.配置项目

            organ.baseData.treeObj = layui.z_treeConfig.renderTree(
              data,
              "treeOrgan",
              {
                callback: {
                  onClick: organ.currData.treeOnClick
                }
              }
            );
          },
          renderTitle: function(flag, data) {
            $("#formTitle").html("修改导航信息");
          },
          renderFormData: function(flag, data) {
            console.log(data, "待填充的数据信息");
            if (flag === "nav") {
              form.val("DepartmentFrom", {
                Name: data.Name,
                Code: data.Code,
                MenuLinkId: data.MenuLinkId,
                Description: data.Description
              });
            } else if (flag == "clear") {
              form.val("DepartmentFrom", {
                Name: "",
                Code: "",
                MenuLinkId: "",
                Description: ""
              });
            }
          },
          disabledBtton: function(flage) {
            common.isDisableButton("#delet", false);
            common.isDisableButton("#lower", false);
            common.isDisableButton("#upper", false);
            common.isDisableButton("#showPosition", false);
          },
          loadSelect: function(data) {
            console.log(data);
            var opGroup = "<option value=''></option>";
            for (var i = 0; i < data.length; i++) {
              console.log(i);
              opGroup += "<optgroup label='" + data[i].Name + "'>";
              if (data[i].Functions.length > 0) {
                var op = data[i].Functions;
                console.log(op);
                for (var j = 0; j < op.length; j++) {
                  opGroup +=
                    "<option value=" +
                    op[j].MenuLinkMvcId +
                    ">" +
                    op[j].Name +
                    "</option>";
                }
              }
              opGroup += "</optgroup>";
            }

            //分组信息改造

            $("#MenuLinkId").html(opGroup);
            form.render();
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
                console.log("确认", data);
                organ.server.delet(data.Flag, data.Id);
              },
              function() {
                console.log("取消");
              }
            );
          }
        },
        currData: {
          getTreeNodeName: function(treeData, id) {},
          treeOnClick: function(e, id, node) {
            console.log(node);
            organ.baseData.treeNode = node;
            organ.baseData.id = node.Id;
            organ.baseData.editFalge = true;
            console.log(organ.baseData.treeNode);
            organ.server.getNodedata(node.Flag, node.Id);
            organ.render.renderTitle(node.Flag);
            organ.render.disabledBtton(node.Flag);
            //organ.currData.getTreeNodeName(data, node.ParentId);
            var PidNode = organ.baseData.treeObj.getNodeByTId(node.parentTId);

            $(".topName").val(PidNode.Title);
            $(".submit").html("立即修改");
          }
        }
      };
      organ.init();
      console.log("导航信息管理``````!!");
    }
  );
