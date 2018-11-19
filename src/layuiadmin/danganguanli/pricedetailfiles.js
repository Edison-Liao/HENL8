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
    function () {
      var $ = layui.$,
        form = layui.form,
        table = layui.table,
        layer = layui.layer,
        tree = layui.tree,
        ztree = layui.ztree,
        jquery_ztree = layui.jquery_ztree_excheck,
        utils = layui.utils,
        common = layui.common,
        ladderType = [],
        surchargeType = [],
        surchargeStartType = [];


      //监听搜索
      form.on("submit(Handler-search)", function (data) {
        var field = data.field;
        console.log(data, "数据");

        //执行重载
        table.reload("priceDetailFilesTable", {
          where: field
        });
      });

      // 表格渲染
      var priceDetailFilesTable = table.render({
        elem: "#priceDetailFilesTable",
        url: layui.setter.revenueUrl + "/api/PriceDetail/query/list", //接口
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
              // width: 100,
              title: "价格类型名称",
              templet: function (d) {
                return d.PriceName;
              }
            },
            {
              title: "价格类型编号",
              templet: function (d) {
                return d.PriceCoding;
              }
            },
            {
              title: "价格版本",
              templet: function (d) {
                return d.Me.PriceVersion;
              }
            },
            {
              title: "基础价格",
              templet: function (d) {
                return d.Me.BasePrice;
              }
            },
            {
              title: "是否启用阶梯",
              templet: function (d) {
                return (d.Me.IsLadder === true) ? "是" : "否";
              }
            },
            {
              title: "创建时间",
              templet: function (d) {
                // console.log(d, "创建时间");
                return (
                  "<div>" + layui.util.toDateString(d.Me.CreateDate) + "</div>"
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
      table.on("tool(table-Handler)", function (obj) {
        console.log(obj.event, "obj 监听工具条");

        // 删除
        if (obj.event === "delete") {
          active.delete({
            Tip: "是否确认删除？",
            // Sign: "string",
            Method: "remove",
            // Timestamp: 0,
            Data: { Id: obj.data.Me.Id }
          });
        }

        // 编辑
        if (obj.event === "edit") {
          active.edit({
            type: obj.event,
            haveArray: true,
            ladderType: JSON.stringify(ladderType),
            surchargeType: JSON.stringify(surchargeType),
            surchargeStartType: JSON.stringify(surchargeStartType),
            data: JSON.stringify([obj.data])
          });
        }
      });

      //服务交互
      var request = {
        //获取阶梯类型
        getLadderType() {
          utils.request(
            "/api/PriceDetail/priceladdertypestatus",
            { Method: "priceladdertypestatus" },
            "GET",
            function (res) {
              if (res.IsSucceed) {
                ladderType = res.Result;
              } else {
                var errorMessage = res.Errors[0].Message;
                layer.msg(errorMessage, {
                  icon: 5
                });
              }
            },
            function (err) {
              console.log(err, "err");
            }
          );
        },
        //获取滞纳金类型
        getSurchargeType() {
          utils.request(
            "/api/PriceDetail/pricesurchargetypestatus",
            { Method: "pricesurchargetypestatus" },
            "GET",
            function (res) {
              if (res.IsSucceed) {
                surchargeType = res.Result;
              } else {
                var errorMessage = res.Errors[0].Message;
                layer.msg(errorMessage, {
                  icon: 5
                });
              }
            },
            function (err) {
              console.log(err, "err");
            }
          );
        },
        //获取滞纳金开始日类型
        getSurchargeStartType() {
          utils.request(
            "/api/PriceDetail/pricesurchargestarttypestatus",
            { Method: "pricesurchargestarttypestatus" },
            "GET",
            function (res) {
              if (res.IsSucceed) {
                surchargeStartType = res.Result;
              } else {
                var errorMessage = res.Errors[0].Message;
                layer.msg(errorMessage, {
                  icon: 5
                });
              }
            },
            function (err) {
              console.log(err, "err");
            }
          );
        },
        getSomeTypes(method, result) {
          utils.request(
            "/api/PriceDetail/" + method,
            { Method: method },
            "GET",
            function (res) {
              if (res.IsSucceed) {
                result = res.Result;
              } else {
                var errorMessage = res.Errors[0].Message;
                layer.msg(errorMessage, {
                  icon: 5
                });
              }
            },
            function (err) {
              console.log(err, "err");
            }
          );
        },
        // 插入新价格明细
        insertPriceDetail(params) {
          utils.request(
            "/api/PriceDetail/insert",
            params,
            "POST",
            function (res) {
              // console.log(res, "res");
              if (res.IsSucceed) {
                // 重载表格
                table.reload("priceDetailFilesTable");

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
            function (err) {
              console.log(err, "err");
            },
            {
              contentType: "application/json"
            }
          );
        },
        // 新增价格明细
        addPriceDetail(params) {
          utils.request(
            "/api/Common/GetInsertGuid",
            {},
            "GET",
            function (res) {
              console.log(res, "获取 Guid res");
              if (res.IsSucceed) {
                // 获取到的Guid赋值给params
                params.Data.Idd = res.Result;
                params.Data.PriceTypeID = res.Result;
                // 插入新价格明细
                request.insertPriceDetail(params);
              } else {
                layer.msg("获取Guid失败", {
                  icon: 5
                });
              }
            },
            function (err) {
              console.log(err, "获取 Guid err");
            }
          );
        },
        // 修改价格明细
        editPriceDetail(params) {
          utils.request(
            "/api/PriceDetail/update",
            params,
            "PUT",
            function (res) {
              // console.log(res, "res");
              if (res.IsSucceed) {
                // 重载表格
                table.reload("priceDetailFilesTable");

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
            function (err) {
              console.log(err, "err");
            },
            {
              contentType: "application/json"
            }
          );
        },
        // 删除价格明细
        delPriceDetail(params) {
          // console.log(params, "调用接口: /api/PriceDetail/remove");
          utils.request(
            "/api/PriceDetail/remove",
            params,
            "DELETE",
            function (res) {
              // console.log(res, "res");
              if (res.IsSucceed) {
                // 重载表格
                table.reload("priceDetailFilesTable");

                layer.msg("删除成功", {
                  icon: 1
                });
              } else {
                layer.msg("删除失败", {
                  icon: 5
                });
              }
            },
            function (err) {
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
        export: function () {
          console.log("导出数据");
        },
        create: function (params) {
          console.log("新增");

          var content = "../tpl/from/priceDetailForm.html?" + $.param(params);

          layer.open({
            type: 2,
            title: "新增价格明细",
            content,
            maxmin: true,
            area: ["700px", "400px"],
            btn: ["确定", "取消"],
            yes: function (index, layero) {
              console.log("点击确定");
              var iframeWindow = window["layui-layer-iframe" + index],
                submitID = "LAY-pricetype-files-submit",
                submit = layero
                  .find("iframe")
                  .contents()
                  .find("#" + submitID);
              //监听提交
              iframeWindow.layui.form.on("submit(" + submitID + ")", function (
                data
              ) {
                var field = data.field; //获取提交的字段
                //时间转utc(????待验证是否需要如此操作)
                field.PriceStartDateTime= new Date(field.PriceStartDateTime).toISOString()
                field.PriceEndDateTime= new Date(field.PriceEndDateTime).toISOString()
                var params = { Method: "insert", Data: field };
                console.log(params, "新增价格明细 params");

                // 新增价格明细
                request.addPriceDetail(params);

                layer.close(index); //关闭弹层
              });
              submit.trigger("click");
            },
            btn2: function () {
              console.log("点击取消");
            },
            cancel: function () {
              console.log("点击取消");
            }
          });
        },
        edit: function (params) {
          console.log("编辑");

          var content = "../tpl/from/priceDetailForm.html?" + $.param(params);
          // console.log(content, "content");
          layer.open({
            type: 2,
            title: "编辑价格明细",
            content,
            maxmin: true,
            area: ["700px", "400px"],
            btn: ["确定", "取消"],
            yes: function (index, layero) {
              console.log("点击确定");
              var iframeWindow = window["layui-layer-iframe" + index],
                submitID = "LAY-pricetype-files-submit",
                submit = layero
                  .find("iframe")
                  .contents()
                  .find("#" + submitID);
              //监听提交
              iframeWindow.layui.form.on("submit(" + submitID + ")", function (
                data
              ) {
                var parseParams = JSON.parse(params.data)[0];
                var field = $.extend({}, data.field, { Id: parseParams.Id }); //获取提交的字段
                var passFields = { Method: "update", Data: field };
                console.log(passFields, "passFields");

                // 修改价格明细
                request.editPriceDetail(passFields);

                layer.close(index); //关闭弹层
              });
              submit.trigger("click");
            },
            btn2: function () {
              console.log("点击取消");
            },
            cancel: function () {
              console.log("点击取消");
            }
          });
        },
        delete: function (params) {
          console.log("删除", params);

          layer.confirm(params.Tip, { icon: 3, title: "删除提示" }, function () {
            console.log(params.Data.Id, "待删除的ID");

            // 删除价格明细
            request.delPriceDetail(params);
          });
        }
      };

      //按钮操作
      $(".layui-btn").on("click", function () {
        var type = $(this).data("type");
        active[type]
          ? active[type].call(this, {
            type,
            haveArray: true,
            ladderType: JSON.stringify(ladderType),
            surchargeType: JSON.stringify(surchargeType),
            surchargeStartType: JSON.stringify(surchargeStartType),
            data: []
          })
          : "";
      });

      //获取阶梯类型,滞纳金类型,滞纳金开启日类型
      request.getLadderType();
      request.getSurchargeType();
      request.getSurchargeStartType();
    }
  );
