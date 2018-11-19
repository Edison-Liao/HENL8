layui
  .config({
    base: "../../../layuiadmin/" //静态资源所在路径
  })
  .extend({
    index: "lib/index" //主入口模块
  })
  .use(["index", "table", "layer", "common", "consts", "haderSerch"], function () {
    var $ = layui.$,
      form = layui.form,
      common = layui.common,
      table = layui.table,
      consts = layui.consts,
      layer = layui.layer;
    layui.haderSerch("#readmeterplan-search", {
      data: [{
        key: "查询关键字"
      }]
    });
    var option = {
      baseUrl: layui.setter.revenueUrl
    }

    var chongxinguihua = {
        // getReadMeterPlan: function (id) {
        //   common.ajaxFun("get", "api/ReadMeterPlan/query/key?Data.Id=" + id + "&Method=key", "", option).then(function (res) {
        //       if (common.appResult.isSucceeded(res)) {
        //         console.log(res.Result)
        //         res.Result.Me.Name
        //       } else {
        //         common.appResult.loadErrorText(res);
        //       }
        //     })
        //     .fail(err => {
        //       console.log(err);
        //     });
        // },
        // getExport: function (id) {
        //   common.ajaxFun("get", "/api/ReadMeterPlan/query/export", "", option).then(function (res) {
        //       console.log(res)
        //       if (common.appResult.isSucceeded(res)) {
        //         console.log(res.Result)
        //       } else {
        //         common.appResult.loadErrorText(res);
        //       }
        //     })
        //     .fail(err => {
        //       console.log(err);
        //     });
        // },
        renderTable: function () {
          table.render({
            elem: "#ReadMeterPlan",
            id: "ReadMeterPlan",
            url: layui.setter.revenueUrl + "/api/ReadMeterPlan/query/list", //接口
            where: {
              "Method": "list"
            },
            parseData: layui.setter.parseData,
            request: layui.setter.request,
            page: true,
            cols: [
              [{
                  field: "ReadMeterPlanZTBZ",
                  title: "计划代码",
                  templet: function (d) {
                    return "";
                  }
                },
                {
                  field: "ReadMeterPlanName",
                  title: "计划名称",
                  templet: function (d) {
                    return d.Me.Name;
                  }
                },
                {
                  field: "ReadMeterPlanName",
                  title: "抄表周期",
                  templet: function (d) {
                    return "";
                  }
                },
                {
                  field: "ReadMeterPlanKsrq",
                  title: "计划开始时间",
                  templet: function (d) {
                    return d.Me.ksrq;
                  }
                },
                {
                  field: "ReadMeterPlanJsrq",
                  title: "计划结束时间",
                  templet: function (d) {
                    return d.Me.jsrq;
                  }
                },
                {
                  field: "ReadMeterPlanZTBZNAME",
                  title: "当前状态",
                  templet: function (d) {
                    return d.Me.ReadMeterPlanZTBZNAME;
                  }
                },
                {
                  field: "ReadMeterPlanModifyDate",
                  title: "修改时间",
                  templet: function (d) {
                    return layui.util.toDateString(d.Me.ModifyDate);
                  }
                },
                // {title: "操作",fixed: 'right', align:'center', width:160,toolbar: '#LAY-dizhiTable-barOperation'}
              ]
            ],
            loading: true,
            limit: 10,
            text: {
              none: consts.tabelNoneText //默认：无数据。注：该属性为 layui 2.2.5 开始新增
            }
          });
        },
        add: function (data) {
          layer.closeAll();
          var dataBean = layui.consts.basePostData();
          dataBean.Data = data;
          dataBean.Method = "insert";
          var str1 = JSON.stringify(dataBean);
          console.log(str1);
          common
            .ajaxFun("post", "/api/ReadMeterPlan/insert", str1, option)
            .then(function (res) {
              if (common.appResult.isSucceeded(res)) {
                $("#lock-from").find('input[type=text],select,input[type=hidden]').each(function () {
                  $(this).val('');
                });
                table.reload("table-ReadMeterPlan");
                layer.msg("数据添加成功!", {
                  icon: 6
                });
              } else {
                common.appResult.loadErrorText(res);
              }
            })
            .fail(err => {
              console.log(err);
            });
        },
      },
      active = {
        add: function () {
          layer.open({
            type: 1,
            title: "添加地址",
            content: $('#lock-from'),
            maxmin: true,
            area: ["800px", "500px"],
            btn: ["确定", "取消"],
            yes: function (index, layero) {
              var submit = $("#LAY-chaobiaojihua-add-submit");

              form.on('submit(LAY-chaobiaojihua-add-submit)', function (data) {
                var field = data.field;
                console.log(field)
                common.ajaxFun("get", "/api/Common/GetInsertGuid", "", option).then(function (res) {
                    if (common.appResult.isSucceeded(res)) {
                      field.Idd = res.Result;
                      // field.AddressStatus = field.AddressStatus == "on" ? 1 : 2;
                      // field.Area_Id_Building = field.Area_Id_Building == "全部" ? "" : field.Area_Id_Building
                      // field.Area_Id_ReadingPoint = field.Area_Id_ReadingPoint == "全部" ? "" : field.Area_Id_ReadingPoint
                      console.info(field)
                      // if (field.ReadMeterPlanZTBZ == "全部") {
                      //   layer.msg("请选择抄表计划状态", {
                      //     icon: 5
                      //   });

                      // } else {
                      //   dizhiSeverEvent.add(field);
                      // }
                      chongxinguihua.add(field);

                    } else {
                      common.appResult.loadErrorText(res);
                    }
                  })
                  .fail(err => {
                    console.log(err);
                  });
              });
              submit.trigger("click");

            }
          });
        }
      }
    //监听搜索
    form.on("submit(searchbtn)", function (data) {
      var field = data.field;
      console.log(field, "搜索数据");
      var DatetimeBegin = common.formatRequertDate(
        field.Datetime.split("~")[0]
      );
      var DatetimeEnd = common.formatRequertDate(
        field.Datetime.split("~")[1]
      );
      table.reload("LAY-user-manage", {
        where: {
          "Data.Key": field.key,
          // "Data.DatetimeBegin": DatetimeBegin || "20180511",
          "Data.PageIndex": 1,
          "Data.PageSize": 10
        }
      });
    });
    // chongxinguihua.getReadMeterPlan("ba751bf5-5887-4a1f-8d85-cb3291351dbc")
    chongxinguihua.renderTable()

    $(".layui-btn.layuiadmin-btn-useradmin").on("click", function () {
      var type = $(this).data("type");
      active[type] ? active[type].call(this) : "";
    });
  });
