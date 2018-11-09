layui
  .config({
    base: "../../../layuiadmin/" //静态资源所在路径
  })
  .extend({
    index: "lib/index" //主入口模块
  })
  .use(
    [
      "index",
      "table",
      "layer",
      "tree",
      "jquery_ztree_excheck",
      "utils",
      "common",
      "consts"
    ],
    function() {
      var $ = layui.$,
        form = layui.form,
        table = layui.table,
        layer = layui.layer,
        tree = layui.tree,
        ztree = layui.ztree,
        jquery_ztree = layui.jquery_ztree_excheck,
        utils = layui.utils,
        common = layui.common,
        villageTypes = []; // 所属小区

      // utils.test();

      //z-tree
      // var z_tree = {
      //   init: function(treeData, el) {
      //     // this.render.renderTree(treeData, el);
      //   },
      //   baseData: {
      //     zTreeObj: {}
      //   },
      //   treeSeting: {
      //     check: {
      //       enable: true,
      //       chkboxType: { Y: "s", N: "ps" }
      //     },
      //     data: {
      //       simpleData: {
      //         enable: true
      //       }
      //     },
      //     callback: {
      //       onCheck: function(e, treeId, treeNode) {
      //         console.log(treeNode, "areafiles onCheck callback");
      //       },
      //       onClick: function(e, treeId, treeNode) {
      //         console.log(treeNode, "areafiles onClick callback");
      //         console.log(this.getZTreeObj("treeArea").getNodes());
      //       }
      //     }
      //   },
      //   event: {},
      //   render: {
      //     // renderTree: function(treeData, el) {
      //     //   console.log($("#" + el), treeData, "DOM节点");
      //     //   z_tree.baseData.zTreeObj = layui.jquery_ztree.init(
      //     //     $("#" + el),
      //     //     z_tree.treeSeting,
      //     //     treeData
      //     //   );
      //     //   var treeObj = layui.jquery_ztree.getZTreeObj(el);
      //     //   var nodes = treeObj.getNodes();
      //     //   if (nodes.length > 0) {
      //     //     //自动展开第一项
      //     //     treeObj.expandNode(nodes[0], true, false, true);
      //     //   }
      //     // }
      //   }
      // };

      // Test 树形菜单
      // areaTreeNode = [
      //   {
      //     name: "父节点1",
      //     children: [{ name: "子节点1" }, { name: "子节点2" }]
      //   }
      // ];
      // z_tree.init(areaTreeNode, "treeArea");

      //监听搜索
      form.on("submit(Handler-search)", function(data) {
        var field = data.field;
        console.log(data, "数据");

        //执行重载
        table.reload("metereadTable", {
          where: field
        });
      });

      // 表格渲染
      var metereadTable = table.render({
        elem: "#metereadTable",
        url: layui.setter.revenueUrl + "/api/ReadingPoint/query/list", //接口
        parseData: layui.setter.parseData,
        request: layui.setter.request,
        where: {
          Method: "list",
          "Data.CompanyCoding": "string"
        }, // 传递给接口的参数
        // request: { CompanyCoding: "string" }, // 传递给请求头
        cols: [
          [
            {
              title: "所属公司",
              templet: function(d) {
                return d.CompanyName || layui.consts["DATA_NULL"];
              }
            },
            {
              title: "所属区域-小区",
              templet: function(d) {
                return d["Area_Id_VillageName"] || layui.consts["DATA_NULL"];
              }
            },
            {
              field: "Coding",
              title: "编号"
            },
            {
              field: "Name",
              title: "名称"
            },
            {
              field: "Address",
              title: "详细地址",
              minWidth: 300,
              templet: function(d) {
                return d.Address || layui.consts["DATA_NULL"];
              }
            },
            {
              title: "状态",
              width: 100,
              templet: function(d) {
                return (
                  d.StatusName ||
                  (parseInt(d.Status, 10) === 0
                    ? layui.consts["STATUS_ACTIVE"]
                    : layui.consts["STATUS_BLOCK"])
                );
              }
            },
            {
              title: "创建时间",
              width: 200,
              templet: function(d) {
                // console.log(d, "创建时间");
                return (
                  "<div>" + layui.util.toDateString(d.CreateDate) + "</div>"
                );
              }
            },
            {
              title: "操作",
              width: 150,
              align: "center",
              fixed: "right",
              toolbar: "#table-Handler"
            }
          ]
        ],
        loading: true,
        page: true,
        limit: 10,
        text: {
          none: layui.consts["DATA_NO"] //默认：无数据。注：该属性为 layui 2.2.5 开始新增
        }
      });

      //监听工具条
      table.on("tool(table-Handler)", function(obj) {
        console.log(obj.event, "obj 监听工具条");
        // 删除
        if (obj.event === "delete") {
          var msg = "是否确认删除？";
          layer.confirm(msg, { icon: 3, title: "删除提示" }, function(index) {
            console.log(obj.data.Id, "待删除的ID");

            request.delVillage({
              // Sign: "string",
              Method: "remove",
              // Timestamp: 0,
              Data: { Id: obj.data.Id }
            });
            layer.closeAll(); // 关闭所有弹窗
          });
        }

        // 编辑
        if (obj.event === "edit") {
          active.edit({
            type: obj.event,
            haveArray: true,
            villageTypes: JSON.stringify(villageTypes),
            data: JSON.stringify([obj.data])
          });
        }
      });
      //服务交互
      var request = {
        // getArea(params) {
        // console.log("调用接口: /api/Area/query/all");
        // utils.request(
        //   "/api/Area/query/all",
        //   params,
        //   "GET",
        //   function(res) {
        //     // console.log(res, "res");
        //     if (res.IsSucceed) {
        //       var data = res.Result;
        //       // console.log(data, "获取的接口数据");
        //       // 区域树形菜单
        //       // 获取一级菜单
        //       var firstMenu = utils.getFirstMenu(data);
        //       var areaMenu = utils
        //         .getMenus(firstMenu, data)
        //         .map(function(current) {
        //           console.log(current, "current");
        //           return {
        //             // ...current,
        //             name: current.Name
        //           };
        //         });
        //       // console.log(areaMenu, "areaMenu");
        //       // 初始化树形菜单
        //       z_tree.init(areaMenu, "treeArea");
        //     } else {
        //       layer.msg("获取区域数据失败", {
        //         icon: 5
        //       });
        //     }
        //   },
        //   function(err) {
        //     console.log(err, "err");
        //   }
        // );
        // },
        getVillageType() {
          // 获取所属小区
          utils.request(
            "/api/Area/query/all",
            { Method: "all", "Data.AreaType": 3 },
            "GET",
            function(res) {
              console.log(res, "res");
              if (res.IsSucceed) {
                villageTypes = res.Result;
              } else {
                var errorMessage = res.Errors[0].Message;
                layer.msg(errorMessage, {
                  icon: 5
                });
              }
            },
            function(err) {
              console.log(err, "err");
            }
          );
        },
        // 删除所属小区
        delVillage(params) {
          console.log(params, "调用接口: /api/Area/remove");
          utils.request(
            "/api/ReadingPoint/remove",
            params,
            "DELETE",
            function(res) {
              // console.log(res, "res");
              if (res.IsSucceed) {
                // 重载表格
                table.reload("metereadTable");

                layer.msg("删除成功", {
                  icon: 1
                });
              } else {
                layer.msg("删除失败", {
                  icon: 5
                });
              }
            },
            function(err) {
              console.log(err, "err");
            },
            {
              contentType: "application/json"
            }
          );
        }
      };
      // 获取树形菜单数据
      // request.getArea({ CompanyCoding: "string" });

      //事件
      var active = {
        export: function() {
          console.log("导出数据");
        },
        create: function(params) {
          var content = "../tpl/from/meteReadForm.html?" + $.param(params);

          layer.open({
            type: 2,
            title: "新增抄表点档案",
            content,
            maxmin: true,
            area: ["700px", "400px"],
            btn: ["确定", "取消"],
            yes: function(index, layero) {
              console.log("点击确定");
              var iframeWindow = window["layui-layer-iframe" + index],
                submitID = "LAY-area-files-submit",
                submit = layero
                  .find("iframe")
                  .contents()
                  .find("#" + submitID);
              //监听提交
              iframeWindow.layui.form.on("submit(" + submitID + ")", function(
                data
              ) {
                var field = data.field; //获取提交的字段
                var params = { Method: "insert", Data: field };
                // 获取 Guid
                utils.request(
                  "/api/Common/GetInsertGuid",
                  {},
                  "GET",
                  function(res) {
                    console.log(res, "获取 Guid res");
                    if (res.IsSucceed) {
                      // 获取到的Guid赋值给params
                      params.Data.Idd = res.Result;
                      console.log("新增所属小区参数: params", params);
                      // 新增所属小区
                      utils.request(
                        "/api/ReadingPoint/insert",
                        params,
                        "POST",
                        function(res) {
                          // console.log(res, "res");
                          if (res.IsSucceed) {
                            // 重载表格
                            table.reload("metereadTable");

                            layer.msg("新增成功", {
                              icon: 1
                            });
                          } else {
                            var errorMessage = res.Errors[0].Message;
                            layer.msg(errorMessage, {
                              icon: 5
                            });
                          }
                        },
                        function(err) {
                          console.log(err, "err");
                        },
                        {
                          contentType: "application/json"
                        }
                      );
                    } else {
                      layer.msg("获取Guid失败", {
                        icon: 5
                      });
                    }
                  },
                  function(err) {
                    console.log(err, "获取 Guid err");
                  }
                );

                layer.close(index); //关闭弹层
              });
              submit.trigger("click");
            },
            btn2: function() {
              console.log("点击取消");
            },
            cancel: function() {
              console.log("点击取消");
            }
          });
        },
        edit: function(params) {
          console.log("编辑");

          var content = "../tpl/from/meteReadForm.html?" + $.param(params);
          // console.log(content, "content");
          layer.open({
            type: 2,
            title: "编辑抄表点档案",
            content,
            maxmin: true,
            area: ["700px", "400px"],
            btn: ["确定", "取消"],
            yes: function(index, layero) {
              console.log("点击确定");
              var iframeWindow = window["layui-layer-iframe" + index],
                submitID = "LAY-area-files-submit",
                submit = layero
                  .find("iframe")
                  .contents()
                  .find("#" + submitID);
              //监听提交
              iframeWindow.layui.form.on("submit(" + submitID + ")", function(
                data
              ) {
                var parseParams = JSON.parse(params.data)[0];
                var field = $.extend({}, data.field, { Id: parseParams.Id }); //获取提交的字段
                var passFields = { Method: "update", Data: field };
                console.log(passFields, "passFields");

                // 修改所属小区
                utils.request(
                  "/api/ReadingPoint/update",
                  passFields,
                  "PUT",
                  function(res) {
                    // console.log(res, "res");
                    if (res.IsSucceed) {
                      // 重载表格
                      table.reload("metereadTable");

                      layer.msg("修改成功", {
                        icon: 1
                      });
                    } else {
                      var errorMessage = res.Errors[0].Message;
                      layer.msg(errorMessage, {
                        icon: 5
                      });
                    }
                  },
                  function(err) {
                    console.log(err, "err");
                  },
                  {
                    contentType: "application/json"
                  }
                );

                layer.close(index); //关闭弹层
              });
              submit.trigger("click");
            },
            btn2: function() {
              console.log("点击取消");
            },
            cancel: function() {
              console.log("点击取消");
            }
          });
        },
        delete: function() {
          console.log("删除");
        }
      };

      //按钮操作
      $(".layui-btn").on("click", function() {
        var type = $(this).data("type");
        active[type]
          ? active[type].call(this, {
              type,
              haveArray: true,
              villageTypes: JSON.stringify(villageTypes),
              data: []
            })
          : "";
      });

      // 获取所属小区
      request.getVillageType();
    }
  );
