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
      "layer",
      "tree",
      "common",
      "element",
      "consts",
      "jquery_ztree_excheck",
      "table"
    ],
    function() {
      var $ = layui.$,
        table = layui.table,
        layer = layui.layer,
        tree = layui.tree,
        common = layui.common,
        consts = layui.consts;
      jquery_ztree = layui.jquery_ztree_excheck;
      //表格
      //用户管理表格渲染

      var userManageTable = table.render({
        elem: "#userAuthTable",
        url: layui.setter.baseUrl + "/api/User/query/group/normal/1/10", //接口
        // response: layui.setter.response,
        parseData: layui.setter.parseData,
        cols: [
          [
            { type: "radio" },
            { field: "NormalizedName", title: "用户名" },
            {
              field: "GroupClassify",
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
            {
              field: "锁定/解锁",
              title: "锁定状态",
              templet: function(d) {
                if (d.LockoutEnabled) {
                  return '<span class="layui-btn layui-btn-primary layui-btn-xs">解锁</span>';
                } else {
                  return '<span class="layui-btn layui-btn-normal layui-btn-xs">锁定</span>';
                }
              }
            }
          ]
        ],
        page: true,
        loading: true,
        limit: 10,
        text: "对不起，加载出现异常！"
      });
      //表单选定
      table.on("radio(userAuthTable)", function(obj) {
        console.log(obj.checked); //当前是否选中状态
        console.log(obj.data); //选中行的相关数据
        if (obj.checked) {
          common.isDisableButton(".layui-btn", false);
          auth.baseData.id = obj.data.Id;
          //获取对应表格用户id 与权限
          auth.server.getUserAccessOrganNode("userTable", obj.data.Id);
          auth.server.getUserAccessRightNode("userTable", obj.data.Id);
          auth.server.getRoleWidthUserRightNode("userTable", obj.data.Id);
        }
      });
      //z-tree
      var z_tree = {
        init: function(treeData, el, riod) {
          this.render.renderTree(treeData, el, riod);
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
        treeSetingRiod: {
          check: {
            enable: true,
            chkStyle: "radio",
            radioType: "all",
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
              auth.baseData.id = treeNode.Id;
              if (treeNode.checked) {
                common.isDisableButton(".layui-btn", false);
                //获取对应表格用户id 与权限
                auth.server.getUserAccessOrganNode("userTable", treeNode.Id);
                auth.server.getUserAccessRightNode("userTable", treeNode.Id);
                auth.server.getRoleWidthUserRightNode("userTable", treeNode.Id);
              } else {
                common.isDisableButton(".layui-btn", true);
              }
            }
          }
        },
        event: {},
        render: {
          renderTree: function(treeData, el, riod) {
            var seting = riod ? z_tree.treeSetingRiod : z_tree.treeSeting;
            z_tree.baseData.zTreeObj = layui.jquery_ztree.init(
              $("#" + el),
              seting,
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
          this.server.getRoleTreeData();
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
            var userId = auth.baseData.id;
            auth.server.putRoleAccessRight("Organ", idArry, userId);
          });
          $("#accessRightSub").click(function() {
            var nodeArry = layui.jquery_ztree
              .getZTreeObj("treeAccessRight")
              .getCheckedNodes(true);
            var idArry = auth.currData.getArryNodeId(nodeArry, "Id");
            var userId = auth.baseData.id;
            auth.server.putRoleAccessRight("Right", idArry, userId);
          });
          $("#accessRoleSub").click(function() {
            var nodeArry = layui.jquery_ztree
              .getZTreeObj("roleTree")
              .getCheckedNodes(true);
            var idArry = auth.currData.getArryNodeId(nodeArry, "Id");
            var userId = auth.baseData.id;
            auth.server.putRoleAccessRight("User", idArry, userId);
          });
        },
        server: {
          getRoleTreeData: function() {
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
                        if (data[i].Flag == "roleCatalog") {
                          data[i].nocheck = true;
                        }
                        if (data[i].Children.length > 0) {
                          currData(data[i].Children);
                        }
                      }
                    }
                    return data;
                  }
                  var nodeData1 = currData(nodeData);
                  //z-tree树形结构渲染 数据,domID
                  auth.render.renderRoleTree(nodeData1);
                } else {
                  common.appResult.loadErrorText(data);
                }
              })
              .fail(err => {
                console.log(err);
              });
          },
          getAccessOrganTreeData: function() {
            //
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
                  //渲染树
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
          getUserAccessOrganNode: function(flage, id) {
            if (flage === "userTable") {
              urlID = "/api/User/accessOrgan/" + id;
            } else {
              return;
            }
            //
            common
              .ajaxFun("get", "/api/Role/accessOrgan/" + id)
              .then(function(data) {
                if (common.appResult.isSucceeded(data)) {
                  //选中节点
                  auth.render.setTreeNodeCheck(data.Result, "treeOrgan");
                } else {
                  common.appResult.loadErrorText(data);
                }
              })
              .fail(err => {
                console.log(err);
              });
          },
          getUserAccessRightNode: function(flage, id) {
            var urlID = "";
            if (flage === "userTable") {
              urlID = "/api/User/accessRight/" + id;
            } else {
              return;
            }
            //
            common
              .ajaxFun("get", urlID)
              .then(function(data) {
                if (common.appResult.isSucceeded(data)) {
                  //选中节点
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
          getRoleWidthUserRightNode: function(flage, id) {
            if (flage === "userTable") {
              urlID = "/api/Role/with/user/" + id;
            } else {
              return;
            }
            common
              .ajaxFun("get", urlID)
              .then(function(data) {
                if (common.appResult.isSucceeded(data)) {
                  //选中节点
                  auth.render.setTreeNodeCheck(data.Result, "roleTree");
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
          putRoleAccessRight: function(flage, data, userId) {
            var urlID = "";
            if (flage === "Organ") {
              urlID = "/api/Role/accessOrgan/" + userId;
            } else if (flage === "Right") {
              urlID = "/api/Role/accessRight/" + userId;
            } else if (flage === "User") {
              urlID = "/api/Role/with/user/" + userId;
            } else {
              return layer.msg("出错啦");
            }
            var dataBean = layui.consts.basePostData();
            dataBean.Data = data;
            var str1 = JSON.stringify(dataBean);
            //
            common
              .ajaxFun("put", urlID, str1)
              .then(function(data) {
                if (common.appResult.isSucceeded(data)) {
                  //选中节点
                  console.log(data.Result, "当前角色点");
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
          }
        },
        render: {
          renderRoleTree: function(data) {
            //树形渲染
            z_tree.init(data, "roleTree");
          },
          renderAccessOrganTree: function(data) {
            z_tree.init(data, "treeOrgan");
          },
          renderAccessRightTree: function(data) {
            z_tree.init(data, "treeAccessRight");
          },
          renderAccessOrganTreeUser: function(data) {
            z_tree.init(data, "treeOrganUser", true);
          },
          openDeleteConfirm: function(data) {
            console.log(data, "模态框");
          },
          setTreeNodeCheck: function(dataNode, el) {
            //获取树的实例
            var organTree = layui.jquery_ztree.getZTreeObj(el);
            console.log(dataNode, el, "被赋值的选项");
            //全部取消之前的选定
            if (organTree == null) {
              return;
            }
            organTree.checkAllNodes(false);
            var nodes = organTree.getNodes();
            if (nodes.length > 0 && dataNode.length > 0) {
              //挨个赋值选定
              for (var i = 0; i < dataNode.length; i++) {
                var node = organTree.getNodeByParam("Id", dataNode[i], null);
                organTree.expandNode(node, true, true, true, false);
                if (node === null) {
                  return;
                }
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
