layui
  .config({
    base: "../../../layuiadmin/"
  })
  .extend({
    index: "lib/index" //主入口模块
  })
  .use(
    ["index", "layer", "tree", "common", "consts", "jquery_ztree_excheck"],
    function() {
      var $ = layui.$,
        table = layui.table,
        layer = layui.layer,
        tree = layui.tree,
        common = layui.common,
        ztree = layui.ztree,
        jquery_ztree = layui.jquery_ztree_excheck;
      $("body").on("mousedown", ".layui-tree a", function() {
        if (!$(this).siblings("ul").length) {
          $(".layui-tree a cite").css("color", "#333");
          $(this)
            .find("cite")
            .css("color", "red");
        }
      });
      $("#formTitle").click(function() {
        console.log(1);
        var admin = layui.admin;
        // common
        //   .ajaxFun("get", "/api/organ/treeview", null, {
        //     loading: true
        //   })
        //   .done(function(res) {
        //     if (res.IsSucceed) {
        //       console.log(res.Result, "成功");
        //     } else {
        //       common.appResult.loadErrorText(res);
        //     }
        //   })
        //   .fail(function(err) {
        //     console.log(err, "错误处理");
        //   });
        //auth.render.disabledBtton();
      });
      //z-tree
      var z_tree = {
        init: function(treeData, el) {
          this.render.renderTree(treeData, el);
        },
        baseData: {
          zTreeObj: {}
        },
        treeSeting: {
          check: {
            enable: true,
            chkboxType: { Y: "s", N: "ps" },
            nocheckInherit: false
          },
          data: {
            simpleData: {
              enable: true
            }
          },
          callback: {
            onCheck: function(e, treeId, treeNode) {
              console.log(treeNode, "callback");
            }
          }
        },
        event: {},
        render: {
          renderTree: function(treeData, el) {
            z_tree.baseData.zTreeObj = layui.jquery_ztree.init(
              $("#" + el),
              z_tree.treeSeting,
              treeData
            );
            var treeObj = layui.jquery_ztree.getZTreeObj(el);
            var nodes = treeObj.getNodes();
            if (nodes.length > 0) {
              //自动展开第一项
              treeObj.expandNode(nodes[0], true, false, true);
            }
          }
        }
      };

      //auth
      var auth = {
        init: function() {
          this.server.getTreeData();
          this.server.getAccessOrganTreeData();
          this.server.getAccessRightTreeData();
          this.event();
        },
        baseData: {
          treeNode: {},
          id: "",
          nodeData: {},
          editFalge: false
        },
        event: function() {
          $("#accessOrganSub").click(function() {
            var nodeArry = layui.jquery_ztree
              .getZTreeObj("treeOrgan")
              .getCheckedNodes(true);
            var idArry = auth.currData.getArryNodeId(nodeArry, "Id");
            var roleId = auth.baseData.id;
            auth.server.putRoleAccessRight("Organ", idArry, roleId);
          });
          $("#accessRightSub").click(function() {
            var nodeArry = layui.jquery_ztree
              .getZTreeObj("treeAccessRight")
              .getCheckedNodes(true);
            var idArry = auth.currData.getArryNodeId(nodeArry, "Id");
            var roleId = auth.baseData.id;
            auth.server.putRoleAccessRight("Right", idArry, roleId);
          });
          $("#accessUserSub").click(function() {
            var nodeArry = layui.jquery_ztree
              .getZTreeObj("treeOrganUser")
              .getCheckedNodes(true);
            var idArry = auth.currData.getArryNodeId(nodeArry, "Id");
            var roleId = auth.baseData.id;

            auth.server.putRoleAccessRight("User", idArry, roleId);
          });
        },
        server: {
          getTreeData: function() {
            common
              .ajaxFun("get", "/api/Role/treeview")
              .then(function(data) {
                if (common.appResult.isSucceeded(data)) {
                  //渲染树
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
                  //z-tree树形结构渲染 数据,domID
                  auth.render.renderTree(nodeData1, "tree_accessRight");
                } else {
                  common.appResult.loadErrorText(data);
                }
              })
              .fail(err => {
                console.log(err);
              });
          },
          getAccessOrganTreeData: function() {
            common
              .ajaxFun("get", "/api/organ/treeview")
              .then(function(data) {
                if (common.appResult.isSucceeded(data)) {
                  //渲染树

                  var nodeData = data.Result.TreeNodes;

                  function currData(data, userflage) {
                    if (data.length > 0) {
                      for (var i = 0; i < data.length; i++) {
                        data[i].name = data[i].Title;
                        data[i].children = data[i].Children;
                        if (userflage) {
                          var nocheck = data[i].Flag === "staff" ? false : true;
                          data[i].nocheck = nocheck;
                          if (data[i].Flag === "staff") {
                            delete data[i].Children;
                            delete data[i].children;
                          }
                        }
                        if (data[i].Children && data[i].Children.length > 0) {
                          currData(data[i].Children, userflage);
                        }
                      }
                    }
                    return data;
                  }
                  //深拷贝数据
                  var checkNode = $.extend(true, [], nodeData);
                  var checkUserNode = $.extend(true, [], nodeData);

                  var nodeData1 = currData(checkNode, false);
                  var nodeData2 = currData(checkUserNode, true);

                  auth.render.renderAccessOrganTree(nodeData1);
                  auth.render.renderAccessOrganTreeUser(nodeData2);
                } else {
                  common.appResult.loadErrorText(data);
                }
              })
              .fail(err => {
                console.log(err);
              });
          },
          getAccessRightTreeData: function() {
            common
              .ajaxFun("get", "/api/Module/deep/permission")
              .then(function(data) {
                if (common.appResult.isSucceeded(data)) {
                  var nodeData = data.Result;
                  function currData(data) {
                    if (data.length > 0) {
                      for (var i = 0; i < data.length; i++) {
                        data[i].name = data[i].Name;
                        if (data[i].Functions && data[i].Functions.length > 0) {
                          data[i].children = data[i].Functions;
                        }
                        if (
                          data[i].Permissions &&
                          data[i].Permissions.length > 0
                        ) {
                          data[i].children = data[i].Permissions;
                        }
                        if (data[i].children && data[i].children.length > 0) {
                          currData(data[i].children);
                        }
                      }
                    }
                    return data;
                  }
                  var nodeData1 = currData(nodeData);

                  auth.render.renderAccessRightTree(nodeData1);
                } else {
                  common.appResult.loadErrorText(data);
                }
              })
              .fail(err => {
                console.log(err);
              });
          },
          getRoleAccessOrganNode: function(flage, id) {
            if (flage === "roleInfo") {
              urlID = "/api/Role/accessOrgan/" + id;
            } else {
              return;
            }
            //获取数据访问授权
            common
              .ajaxFun("get", "/api/Role/accessOrgan/" + id)
              .then(function(data) {
                if (common.appResult.isSucceeded(data)) {
                  auth.render.setTreeNodeCheck(data.Result, "treeOrgan");
                } else {
                  common.appResult.loadErrorText(data);
                }
              })
              .fail(err => {
                console.log(err);
              });
          },
          getRoleAccessRightNode: function(flage, id) {
            var urlID = "";
            if (flage === "roleInfo") {
              urlID = "/api/Role/accessRight/" + id;
            } else {
              return;
            }
            //获取功能访问授权
            common
              .ajaxFun("get", "/api/Role/accessRight/" + id)
              .then(function(data) {
                if (common.appResult.isSucceeded(data)) {
                  auth.render.setTreeNodeCheck(data.Result, "treeAccessRight");
                } else {
                  layer.msg(
                    "获取功能访问权限数据失败! " + data.Errors[0].Message,
                    {
                      icon: 5
                    }
                  );
                }
              })
              .fail(err => {
                console.log(err);
              });
          },
          getRoleUserRightNode: function(flage, id) {
            if (flage === "roleInfo") {
              urlID = "/api/Role/" + id + "/with/user";
            } else {
              return;
            }
            //获取角色用户特定关系
            common
              .ajaxFun("get", urlID)
              .then(function(data) {
                if (common.appResult.isSucceeded(data)) {
                  auth.render.setTreeNodeCheck(data.Result, "treeOrganUser");
                } else {
                  layer.msg("获取节点数据失败! " + data.Errors[0].Message, {
                    icon: 5
                  });
                }
              })
              .fail(err => {
                console.log(err);
              });
          },
          putRoleAccessRight: function(flage, data, roleId) {
            var urlID = "";
            if (flage === "Organ") {
              urlID = "/api/Role/accessOrgan/" + roleId;
            } else if (flage === "Right") {
              urlID = "/api/Role/accessRight/" + roleId;
            } else if (flage === "User") {
              urlID = "/api/Role/" + roleId + "/with/user";
            } else {
              return layer.msg("出错啦");
            }
            var dataBean = layui.consts.basePostData();
            dataBean.Data = data;
            var str1 = JSON.stringify(dataBean);

            common
              .ajaxFun("get", urlID, str1)
              .then(function(data) {
                if (common.appResult.isSucceeded(data)) {
                  layer.msg("更新权限成功!", { icon: 6 });
                } else {
                  layer.msg("更新权限数据失败! " + data.Errors[0].Message, {
                    icon: 5
                  });
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
            } else if (flage === "roleInfo") {
              urlID = "/api/Role/" + id;
            } else {
              return;
            }
            common
              .ajaxFun("get", urlID)
              .then(function(data) {
                if (common.appResult.isSucceeded(data)) {
                  auth.baseData.nodeData = data.Result;
                  var dataNode = data.Result;
                } else {
                  layer.msg("获取节点数据失败! " + data.Errors[0].Message, {
                    icon: 5
                  });
                }
              })
              .fail(err => {
                console.log(err);
              });
          }
        },
        render: {
          renderTree: function(data) {
            //树形渲染
            layui.tree({
              elem: "#treeRole", //指定元素
              target: "_blank", //是否新选项卡打开（比如节点返回href才有效）
              click: function(item) {
                //点击节点回调
                auth.baseData.treeNode = item;
                auth.baseData.id = item.Id;
                auth.baseData.editFalge = true;
                //auth.server.getNodedata(item.Flag, item.Id);
                auth.server.getRoleAccessOrganNode(item.Flag, item.Id);
                auth.server.getRoleAccessRightNode(item.Flag, item.Id);
                auth.server.getRoleUserRightNode(item.Flag, item.Id);
                auth.render.disabledBtton(item.Flag);
              },
              nodes: data
            });
          },
          renderAccessOrganTree: function(data) {
            z_tree.init(data, "treeOrgan");
          },
          renderAccessRightTree: function(data) {
            z_tree.init(data, "treeAccessRight");
          },
          renderAccessOrganTreeUser: function(data) {
            z_tree.init(data, "treeOrganUser");
          },
          openDeleteConfirm: function(data) {
            console.log(data, "模态框");
          },
          disabledBtton: function(data) {
            //
            common.isDisableButton(".layui-btn", false);
          },
          setTreeNodeCheck: function(dataNode, el) {
            //获取树的实例
            var organTree = layui.jquery_ztree.getZTreeObj(el);
            //全部取消之前的选定
            console.log(dataNode, el, "树形结构check填充参数");
            if (organTree == null) {
              return;
            }
            organTree.checkAllNodes(false);
            var nodes = organTree.getNodes();
            if (nodes.length > 0 && dataNode.length > 0) {
              //挨个赋值选定
              for (var i = 0; i < dataNode.length; i++) {
                console.log(dataNode[i], el);
                var node = organTree.getNodeByParam("Id", dataNode[i], null);
                organTree.expandNode(node, true, true, true, false);
                node.checked = true;
                organTree.updateNode(node, false);
              }
            }
          }
        },
        currData: {
          getArryNodeId: function(ArrayNode, item) {
            var arr = [];
            for (var i = 0; i < ArrayNode.length; i++) {
              var id = ArrayNode[i][item];
              arr.push(id);
            }
            return arr;
          }
        }
      };
      auth.init();
    }
  );
