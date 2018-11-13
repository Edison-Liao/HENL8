layui
  .config({
    base: "../../../layuiadmin/" //静态资源所在路径
  })
  .extend({
    index: "lib/index" //主入口模块
  })
  .use(
    ["index", "table", "consts", "common", "haderSerch", "laydate"],
    function() {
      var $ = layui.$,
        form = layui.form,
        consts = layui.consts,
        common = layui.common,
        table = layui.table;
      layui.haderSerch("#headerSerch", {
        isRenderdate: { Datetime: "请选择日期" },
        data: [{ key: "查询关键字" }]
      });
      //获取
      dataBen = consts.basePostData("CompanyPageSearch");
      delete dataBen.IsEncryption;
      var Data = {
        key: "",
        DatetimeBegin: "20180511",
        DatetimeEnd: "20191230",
        PageIndex: 1,
        PageSize: 1
      };
      dataBen.Data = Data;
      var tenantTable = table.render({
        elem: "#LAY-user-manage",
        url: layui.setter.baseUrl + "/api/Tenant/company/info/search", //接口
        where: {
          Sign: consts.basePostData("CompanyPageSearch").Sign,
          Method: consts.basePostData("CompanyPageSearch").Method,
          Timestamp: consts.basePostData("CompanyPageSearch").Timestamp,
          "Data.DatetimeBegin": "20180511",
          "Data.DatetimeEnd": "20191230"
          // "Data.PageIndex": Data.PageIndex,
          // "Data.PageSize": Data.PageSize
        },
        parseData: layui.setter.parseData,
        request: layui.setter.request,
        cols: [
          [
            {
              field: "ComCoding",
              width: 100,
              title: "公司编码"
            },
            { field: "ComName", title: "公司名称", minWidth: 100 },
            { field: "ComPassword", title: "公司密码" },
            { field: "SassPassword", title: "sass平台密码" },
            {
              field: "ProvinceName",
              title: "所在省市",
              templet: function(d) {
                return "<div>" + d.ProvinceName + "/" + d.CityName + "</div>";
              }
            },
            {
              field: "CreateDate",
              title: "创建日期",
              sort: true,
              templet: function(d) {
                return (
                  "<div>" + layui.util.toDateString(d.CreateDate) + "</div>"
                );
              }
            },
            {
              field: "公司状态",
              title: "公司状态",
              templet: function(d) {
                if (d.IsActived) {
                  return `<a class="layui-btn layui-btn-normal layui-btn-xs" lay-event="unActived">已启用</a><a>${layui.util.toDateString(
                    d.ActivedTime
                  )}</a>`;
                } else {
                  return '<a class="layui-btn layui-btn-primary layui-btn-xs" lay-event="active">禁用中</a>';
                }
              }
            },
            {
              title: "操作",
              width: 150,
              align: "center",
              fixed: "right",
              toolbar: "#table-tool"
            }
          ]
        ],
        loading: true,
        page: {},
        limit: 10,
        text: {
          none: consts.tabelNoneText //默认：无数据。注：该属性为 layui 2.2.5 开始新增
        }
      });
      //监听搜索
      form.on("submit(searchbtn)", function(data) {
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
            "Data.DatetimeBegin": DatetimeBegin || "20180511",
            "Data.PageIndex": 1,
            "Data.PageSize": 10
          }
        });
      });
      //监听工具条
      table.on("tool(LAY-user-manage)", function(obj) {
        var data = obj.data;
        if (obj.event === "del") {
          tenant.event.del(data);
        } else if (obj.event === "edit") {
          tenant.event.edit(data);
        } else if (obj.event === "active") {
          tenant.event.active(data);
        } else if (obj.event === "unActived") {
          tenant.event.active(data);
        }
      });
      //租户管理
      var tenant = {
        init: function() {},
        baseData: {
          nodeData: {},
          editFalge: false
        },
        event: {
          del: function(data) {
            layer.confirm(
              "你确定要删除该数据吗?",
              {
                btn: ["确定", "取消"], //按钮
                icon: 3
              },
              function() {
                tenant.server.delet({ Id: data.Id });
              },
              function() {
                console.log("取消");
              }
            );
          },
          add: function(data) {
            tenant.baseData.editFalge = false;
            tenant.render.openFrom({});
          },
          edit: function(data) {
            tenant.baseData.editFalge = true;
            tenant.render.openFrom(data);
          },
          active: function(data) {
            console.log(data);
            var title = data.IsActived
              ? "你确定要<strong>停用</strong>该数据吗?"
              : "你确定要<strong>启用</strong>该数据吗?";
            layer.confirm(
              title,
              {
                btn: ["确定", "取消"], //按钮
                icon: 3
              },
              function() {
                tenant.server.active({
                  Id: data.Id,
                  IsActived: !data.IsActived
                });
              },
              function() {
                console.log("取消");
              }
            );
          }
        },
        server: {
          add: function(data) {
            var dataBean = layui.consts.basePostData("PushCompanyInfo");
            dataBean.data = data;
            var str1 = JSON.stringify(dataBean);
            common
              .ajaxFun("post", "/api/Tenant/company/info/push", str1)
              .then(function(res) {
                if (common.appResult.isSucceeded(res)) {
                  layer.msg("添加成功!", { icon: 6 });
                  table.reload("LAY-user-manage");
                  layer.closeAll();
                } else {
                  layer.msg("添加数据失败!", { icon: 5 });
                  common.appResult.loadErrorText(res);
                }
              })
              .fail(err => {
                console.log(err);
              });
          },
          eidt: function(data) {
            var dataBean = layui.consts.basePostData("UpdateCompanyInfo");
            dataBean.data = data;
            var str1 = JSON.stringify(dataBean);
            common
              .ajaxFun("put", "/api/Tenant/company/info", str1)
              .then(function(res) {
                if (common.appResult.isSucceeded(res)) {
                  layer.msg("数据更新成功!", { icon: 6 });
                  table.reload("LAY-user-manage");
                  layer.closeAll();
                } else {
                  common.appResult.loadErrorText(res);
                }
              })
              .fail(err => {
                console.log(err);
              });
          },
          active: function(data) {
            var dataBean = layui.consts.basePostData("UpdateCompanyActived");
            dataBean.data = data;
            var str1 = JSON.stringify(dataBean);
            common
              .ajaxFun("put", "/api/Tenant/company/info/actived", str1)
              .then(function(res) {
                if (common.appResult.isSucceeded(res)) {
                  layer.msg("数据更新成功!", { icon: 6 });
                  table.reload("LAY-user-manage");
                } else {
                  common.appResult.loadErrorText(res);
                }
              })
              .fail(err => {
                console.log(err);
              });
          },
          delet: function(data) {
            var dataBean = layui.consts.basePostData("RemoveCompanyInfo");
            dataBean.data = data;
            var str1 = JSON.stringify(dataBean);
            common
              .ajaxFun("DELETE", "/api/Tenant/company/info", str1)
              .then(function(res) {
                if (common.appResult.isSucceeded(res)) {
                  layer.msg("数据删除成功!", { icon: 6 });
                  table.reload("LAY-user-manage");
                } else {
                  layer.msg("数据删除成功!", { icon: 5 });
                  common.appResult.loadErrorText(res);
                }
              })
              .fail(err => {
                console.log(err);
              });
          }
        },
        render: {
          openFrom: function(data) {
            var title = tenant.baseData.editFalge ? "编辑租户" : "添加租户";
            var params = $.param(data);
            var content = !tenant.baseData.editFalge
              ? "../tpl/from/tenant.html"
              : "../tpl/from/tenant.html?" + params;
            layer.open({
              type: 2,
              title: title,
              content: content,
              maxmin: true,
              area: ["1000px", "320px"],
              btn: ["确定", "取消"],
              yes: function(index, layero) {
                var iframeWindow = window["layui-layer-iframe" + index],
                  submitID = "LAY-user-front-submit",
                  submit = layero
                    .find("iframe")
                    .contents()
                    .find("#" + submitID);
                //监听提交
                iframeWindow.layui.form.on("submit(" + submitID + ")", function(
                  res
                ) {
                  var field = res.field; //获取提交的字段
                  console.log(field, "数据提交");

                  if (tenant.baseData.editFalge) {
                    field.Id = data.Id;
                    tenant.server.eidt(field);
                  } else {
                    tenant.server.add(field);
                  }

                  // layer.close(index); //关闭弹层
                });

                submit.trigger("click");
              }
            });
          }
        },
        currData: {}
      };

      $("body .layui-btn").on("click", function() {
        var type = $(this).data("type");
        tenant.event[type] ? tenant.event[type].call(this) : "";
      });
    }
  );
