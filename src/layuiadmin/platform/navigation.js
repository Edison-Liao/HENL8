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
            common
              .ajaxFun("get", "/api/Navigation/treeview/manager")
              .then(function(data) {
                if (common.appResult.isSucceeded(data)) {
                  //渲染树
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
                  common.appResult.loadErrorText(data);
                }
              })
              .fail(err => {
                console.log(err);
              });
          },
          ModulePermission: function() {
            common
              .ajaxFun("get", "/api/Module/deep/permission")
              .then(function(data) {
                if (common.appResult.isSucceeded(data)) {
                  //渲染树
                  organ.render.loadSelect(data.Result);
                } else {
                  common.appResult.loadErrorText(data);
                }
              })
              .fail(err => {
                console.log(err);
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
            //
            common
              .ajaxFun("get", urlID)
              .then(function(data) {
                if (common.appResult.isSucceeded(data)) {
                  //渲染树
                  organ.baseData.nodeData = data.Result;
                  var dataNode = data.Result;
                  organ.render.renderFormData(flage, dataNode);
                } else {
                  common.appResult.loadErrorText(data);
                }
              })
              .fail(err => {
                console.log(err);
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
            //
            common
              .ajaxFun("post", url, str1)
              .then(function(data) {
                if (common.appResult.isSucceeded(data)) {
                  //渲染树
                  $("#treeOrgan").html("");
                  organ.server.getTreeData();
                  layer.msg("添加成功!", { icon: 6 });
                } else {
                  common.appResult.loadErrorText(data);
                }
              })
              .fail(err => {
                console.log(err);
              });
          },
          eidtOrgan: function(data, url) {
            var dataBean = layui.consts.basePostData();
            data.Id = organ.baseData.id;
            dataBean.Data = data;
            var str1 = JSON.stringify(dataBean);
            //
            common
              .ajaxFun("put", url + "/" + organ.baseData.id, str1)
              .then(function(data) {
                if (common.appResult.isSucceeded(data)) {
                  //渲染树
                  $("#treeOrgan").html("");
                  organ.server.getTreeData();
                  layer.msg("修改成功!", { icon: 6 });
                } else {
                  common.appResult.loadErrorText(data);
                }
              })
              .fail(err => {
                console.log(err);
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
            common
              .ajaxFun("put", url + "/" + organ.baseData.id, str1)
              .then(function(data) {
                if (common.appResult.isSucceeded(data)) {
                  //渲染树
                  $("#treeOrgan").html("");
                  organ.server.getTreeData();
                  layer.msg("移动成功!", { icon: 6 });
                } else {
                  common.appResult.loadErrorText(data);
                }
              })
              .fail(err => {
                console.log(err);
              });
          },
          delet: function(flage, id) {
            layer.load();
            var urlID = "";
            if (flage === "nav") {
              urlID = "/api/Navigation/" + id;
            }
            //
            common
              .ajaxFun("DELETE", urlID)
              .then(function(data) {
                if (common.appResult.isSucceeded(data)) {
                  //渲染树
                  $("#treeOrgan").html("");
                  organ.server.getTreeData();
                  layer.alert("删除成功", { icon: 1 });
                } else {
                  common.appResult.loadErrorText(data);
                }
              })
              .fail(err => {
                console.log(err);
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
            try {
              $(".topName").val(PidNode.Title);
            } catch (err) {
              console.log(err);
              $(".topName").val("暂无数据");
            }

            $(".submit").html("立即修改");
          }
        }
      };
      organ.init();
      console.log("导航信息管理``````!!");
    }
  );
