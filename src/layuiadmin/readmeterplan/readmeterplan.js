layui
  .config({
    base: "../../../layuiadmin/" //静态资源所在路径
  })
  .extend({
    index: "lib/index" //主入口模块
  })
  .use(["index", "table", "layer", "common"], function () {
    var $ = layui.$,
      form = layui.form,
      common = layui.common,
      table = layui.table,
      layer = layui.layer;
    var option = {
      baseUrl: layui.setter.readmeterplanUrl
    }

    var chongxinguihua = {
      getReadMeterPlan: function (id) {
        common.ajaxFun("get", "api/ReadMeterPlan/query/key?Data.Id=" + id + "&Method=key", "", option).then(function (res) {
            if (common.appResult.isSucceeded(res)) {
              console.log(res.Result)
            } else {
              common.appResult.loadErrorText(res);
            }
          })
          .fail(err => {
            console.log(err);
          });
      },
      getExport: function (id) {
        common.ajaxFun("get", "/api/ReadMeterPlan/query/export", "", option).then(function (res) {
            console.log(res)
            if (common.appResult.isSucceeded(res)) {
              console.log(res.Result)
            } else {
              common.appResult.loadErrorText(res);
            }
          })
          .fail(err => {
            console.log(err);
          });
      },
      renderTable: function () {
        table.render({
          elem: "#ReadMeterPlan",
          id: "ReadMeterPlan",
          url: layui.setter.readmeterplanUrl + "api/ReadMeterPlan/query/list", //接口
          where: {
            "Method": "list"
          },
          parseData: layui.setter.parseData,
          request: layui.setter.request,
          page: true,
          cols: [
            [{
                field: "ReadMeterPlanZTBZ",
                title: "重新规划",
                templet: function (d) {
                  console.log(d)
                  return d.Me.ReadMeterPlanZTBZ;
                }
              },
              // {title: "操作",fixed: 'right', align:'center', width:160,toolbar: '#LAY-dizhiTable-barOperation'}
            ]
          ],
          loading: true,
          limit: 10,
          text: "对不起，加载出现异常！"
        });
      },
      add: function(data) {
        layer.closeAll();
        var dataBean = layui.consts.basePostData();
        dataBean.Data = data;
        dataBean.Method="insert";
        var str1 = JSON.stringify(dataBean);
        console.log(str1);
        common
          .ajaxFun("post", "api/ReadMeterPlan/insert", str1,option)
          .then(function(res) {
            if (common.appResult.isSucceeded(res)) {
              // table.reload("LAY-dizhiTable");
              // $("#lock-from").find('input[type=text],select,input[type=hidden]').each(function() {
              //      $(this).val('');
              // });
              // layer.msg("数据添加成功!", { icon: 6 });
            } else {
              common.appResult.loadErrorText(res);
            }
          })
          .fail(err => {
            console.log(err);
          });
      },
    }
    chongxinguihua.getReadMeterPlan("6B863A23-46FB-4129-A1EF-F56F906A6CC6")
    chongxinguihua.renderTable()

  });
