layui
  .config({
    base: "../../../layuiadmin/" //静态资源所在路径
  })
  .extend({
    index: "lib/index" //主入口模块
  })
  .use(["index", "table"], function() {
    
    var $ = layui.$,
    table = layui.table,
    form = layui.form;
    var laypage = layui.laypage;
    //用户管理表格渲染
    var yingyewangdianTable = table.render({
      elem: "#LAY-yingyewangdianTable",
      url: layui.setter.baseUrl + "/api/BusinessHall/query/list", //接口
      //response:layui.setter.response,
      where:{"CompanyCoding":"88888888",
            "ZutiCoding":"00",
            },
            parseData:layui.setter.parseData,
      request: layui.setter.request,
      page:true,
      cols: [
        [
          {
            field: "zhangqiId",
            width: 100,
            title: "帐期ID",
          },
          { field: "Status", title: "帐期状态", width: 100, },
          { field: "ZutiCoding", title: "帐期代码" },
          { field: "Name",  title: "所属年月" },
          { field: "Name",  title: "帐期开始时间" },
          { field: "Name",  title: "帐期结束时间" },
          //{ field: "caozuoyuan",  title: "主管操作员" },
          //{ field: "dizhi",  title: "营业网点地址" ,width: 180},
          //{ field: "dianhua",  title: "联系电话" },
          //{ field: "gongzuoshijian",  title: "办公时间" },
          //{ field: "sex",  title: "排序号" },
          /*
          { field: "Creator",  title: "建档人" },
          {
            field: "CreateDate",
            title: "建档日期",
            width: 120,
            sort: true,
            templet: function(d) {
              return "<div>" + layui.util.toDateString(d.CreateDate) + "</div>";
            }
          },
          { field: "Updator",  title: "更新人" },
          {
            field: "UpdateDate",
            title: "更新日期",
            width: 120,
            sort: true,
            templet: function(d) {
              return "<div>" + layui.util.toDateString(d.CreateDate) + "</div>";
            }
          },
          */
          
        ]
      ],
      loading: true,
      
      text: "对不起，加载出现异常！"
    });

  //分页
    //监听搜索
    /*
    form.on("submit(LAY-user-front-search)", function(data) {
      var field = data.field;
      //执行重载
      table.reload("LAY-user-manage", {
        where: field
      });
    });
    */

    //服务交互
    var wangdianSeverEvent = {
      addWangdian: function(data) {
        layer.closeAll();
        layer.load(0, { shade: false });
        var dataBean = layui.setter.basePostData;
        var date = new Date();
        data.CompanyCoding="88888888";
        data.ZutiCoding= "00";
        dataBean.Data = data;
        
        data.Sign="string";
        data.Method="string";
        data.Timestamp= date.getTime();
        var str1 = JSON.stringify(dataBean);
        console.info("data", str1)
        $.ajax({
          type: "Post",
          url: layui.setter.baseUrl + "/api/BusinessHall/insert",
          data: str1,
          async: true,
          dataType: "json",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          success: function(data) {
            layer.closeAll();
            console.log(data);
            if (data.IsSucceed) {
              layer.msg("添加用户成功!", { icon: 6 });
              table.reload("LAY-yingyewangdianTable");
            } else {
              table.reload("LAY-yingyewangdianTable");
              layer.msg("失败" + data, { icon: 5 });
            }
          },
          error: function(err) {
            layer.closeAll();
            layer.msg("数据操作失败", { icon: 5 });
          }
        });
      },
      delete: function(data) {
        layer.closeAll();
        layer.load(0, { shade: false });
        $.ajax({
          type: "get",
          url:
            layui.setter.baseUrl + "/api/company/search/pageIndex/1/pageSize/99",
          async: true,
          success: function(data) {
            console.log(data);
            if (data.IsSucceed) {
              layer.closeAll();
              adminCompany.companyList();
            } else {
              layer.closeAll();
              layer.msg("失败" + res.Errors[0].Description, { icon: 5 });
            }
          },
          error: function(err) {
            layer.closeAll();
            layer.msg("数据加载失败", { icon: 5 });
          }
        });
      },
        edit: function(data) {
        console.log(data);
      }
    };
    //事件
    var active = {
      batchdel: function() {
        var checkStatus = table.checkStatus("LAY-user-manage"),
          checkData = checkStatus.data; //得到选中的数据
        if (checkData.length === 0) {
          return layer.msg("请选择数据");
        }
        layer.close(index);
        layer.confirm("确定删除吗？", function(index) {
          table.reload("LAY-user-manage");
          layer.msg("已删除");
        });
      },
      edit: function() {
        layer.open({
          type: 2,
          title: "修改营业网点",
          content: "../tpl/from/wangdianFrom.html",
          maxmin: true,
          area: ["700px", "400px"],
          btn: ["确定"],
          yes: function(index, layero) {
            var iframeWindow = window["layui-layer-iframe" + index],
              submitID = "LAY-wangdian-get-submit",
              submit = layero
                .find("iframe")
                .contents()
                .find("#" + submitID);
            //监听提交
            iframeWindow.layui.form.on("submit(" + submitID + ")", function(
              data
            ) {
              var field = data.field; //获取提交的字段
              wangdianSeverEvent.getWangdian(field);
              //提交 Ajax 成功后，静态更新表格中的数据
              //$.ajax({});

              layer.close(index); //关闭弹层
            });

            submit.trigger("click");
          }
        });
      },
      detail: function() {
        layer.open({
          type: 0,
          title: "营业网点详情",
          content: "../tpl/from/wangdianFrom.html",
          maxmin: true,
          area: ["700px", "400px"],
          btn: ["确定"],
          yes: function(index, layero) {
            var iframeWindow = window["layui-layer-iframe" + index],
              submitID = "LAY-wangdian-get-submit",
              submit = layero
                .find("iframe")
                .contents()
                .find("#" + submitID);
            //监听提交
            iframeWindow.layui.form.on("submit(" + submitID + ")", function(
              data
            ) {
              var field = data.field; //获取提交的字段
              wangdianSeverEvent.getWangdian(field);
              //提交 Ajax 成功后，静态更新表格中的数据
              //$.ajax({});

              layer.close(index); //关闭弹层
            });

            submit.trigger("click");
          }
        });
      },
      add: function() {
        layer.open({
          type: 2,
          title: "添加营业网点",
          content: "../tpl/from/wangdianFrom.html",
          maxmin: true,
          area: ["700px", "400px"],
          btn: ["确定", "取消"],
          yes: function(index, layero) {
            var iframeWindow = window["layui-layer-iframe" + index],
              submitID = "LAY-wangdian-add-submit",
              submit = layero
                .find("iframe")
                .contents()
                .find("#" + submitID);
            //监听提交
            iframeWindow.layui.form.on("submit(" + submitID + ")", function(
              data
            ) {
              var field = data.field; //获取提交的字段
              wangdianSeverEvent.addWangdian(field);
              //提交 Ajax 成功后，静态更新表格中的数据
              //$.ajax({});

              layer.close(index); //关闭弹层
            });

            submit.trigger("click");
          }
        });
      }
    };

    $(".layui-btn.layuiadmin-btn-useradmin").on("click", function() {
      var type = $(this).data("type");
      active[type] ? active[type].call(this) : "";
    });
  });
