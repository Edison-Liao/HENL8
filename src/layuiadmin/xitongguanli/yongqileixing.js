layui
  .config({
    base: "../../../layuiadmin/" //静态资源所在路径
  })
  .extend({
    index: "lib/index" //主入口模块
  })
  .use(["index", "table", "form","consts","common",], function() {
    
    var $ = layui.$,
    table = layui.table,
    form = layui.form,
    common = layui.common;
    var laypage = layui.laypage;
    var option = {
      baseUrl:layui.setter.revenueUrl,
    }
    //用户管理表格渲染
    var yongqileixingTable = table.render({
      elem: "#LAY-yongqileixingTable",
      id:"LAY-yongqileixingTable",
      url: layui.setter.revenueUrl + "/api/UsergasType/query/list", //接口
      //response:layui.setter.response,
      where:{"Data.Name":"","Method":"list"},
      parseData:layui.setter.parseData,
      request: layui.setter.request,
      page:true,
      cols: [
        [
        /*
          {
            field: "Id",
            width: 100,
            title: "用气类型ID",templet: function(d) {
              return d.Id;
            }
          },
          { field: "CompanyCoding", title: "公司编码", width: 100,templet: function(d) {
              return d.CompanyCoding;
            } },
          { field: "CompanyName", title: "公司名称", width: 100,templet: function(d) {
              return d.CompanyCoding;
            } },

          { field: "Coding", title: "用气类型编码" ,templet: function(d) {
              return d.Coding;
            }},
          */
          { field: "Name",  title: "用气类型名称" ,templet: function(d) {
              return d.Name;
            }},
          { field: "Description",  title: "描述" ,templet: function(d) {
              return d.Description;
            }},
          { field: "SortNum",  title: "排序号" ,templet: function(d) {
              return d.SortNum;
            }},  
          { field: "CreateDate", title: "创建时间",templet: function(d) {
              return "<div>" + layui.util.toDateString(d.CreateDate) + "</div>";
            } },
          { field: "ModifyDate", title: "修改时间",templet: function(d) {
              return "<div>" + layui.util.toDateString(d.ModifyDate) + "</div>";
            } },
          {title: "操作",fixed: 'right', align:'center', toolbar: '#LAY-yongqileixingTable-barOperation'}
        ]
      ],
      loading: true,
      limit: 10,
      text: "对不起，加载出现异常！"
    });

    //服务交互
    var yongqiSeverEvent = {
      add: function(data) {
        layer.closeAll();
        var dataBean = layui.consts.basePostData();
        dataBean.Data = data;
        dataBean.Data.CompanyCoding = "88888888";
        dataBean.Data.CompanyName = "88888888";
        dataBean.Method="insert";
        
        console.log(data);
        var str1 = JSON.stringify(dataBean);
        common
          .ajaxFun("post", "/api/UsergasType/insert", str1,option)
          .then(function(res) {
            if (common.appResult.isSucceeded(res)) {
              table.reload("LAY-yongqileixingTable");
              $("#lock-from").find('input[type=text],select,input[type=hidden]').each(function() {
                   $(this).val('');
              });
              layer.msg("数据添加成功!", { icon: 6 });
            } else {
              common.appResult.loadErrorText(res);
            }
          })
          .fail(err => {
            console.log(err);
          });
      },
      delete: function(para) {
        layer.closeAll();
        layer.load(0, { shade: false });
        var dataBean = layui.consts.basePostData();
        dataBean.Data = {}
        dataBean.Data.Id = para.Id
        dataBean.Data.CompanyId = para.CompanyId
        dataBean.Method = "remove"
        var str1 = JSON.stringify(dataBean);
        common
          .ajaxFun("delete", "/api/UsergasType/remove", str1,option)
          .then(function(res) {
            if (common.appResult.isSucceeded(res)) {
              table.reload("LAY-yongqileixingTable");
              layer.msg("数据删除成功!", { icon: 6 });
            } else {
              common.appResult.loadErrorText(res);
            }
          })
          .fail(err => {
            console.log(err);
          });
      },
      edit: function(para) {
        var dataBean = layui.consts.basePostData();
        dataBean.Data = {}
        dataBean.Data.Id = para.Id
        common
          .ajaxFun("get", "/api/UsergasType/query/key?Data.Id="+para.Id+"&Method=key","",option)
          .then(function(res) {
            if (common.appResult.isSucceeded(res)) {
              var res = res.Result
              layer.open({
                type: 1,
                title: "修改用气类型",
                content: $('#lock-from'),
                maxmin: true,
                area: ["500px", "300px"],
                btn: ["确定", "取消"],
                yes: function(index, layero) {
                  var submit = $("#LAY-yongqileixi-add-submit");
                   //获取提交的字段
                  //监听提交
                  form.on('submit(LAY-yongqileixi-add-submit)', function (data) {
                    var field = data.field; //获取提交的字段
                  
                    //提交 Ajax 成功后，静态更新表格中的数据
                    var dataBean = layui.consts.basePostData();
                    
                    dataBean.Data = field;
                    dataBean.Data.Id = res.Id;
                    dataBean.Data.CompanyName = res.CompanyName;
                    dataBean.Data.CompanyCoding = res.CompanyCoding;
                    dataBean.Method="update";
                    var str1 = JSON.stringify(dataBean);
                    console.info("data", str1)
                    common.ajaxFun("put", "/api/UsergasType/update", str1,option).then(function(res) {
                      if (common.appResult.isSucceeded(res)) {
                        table.reload("LAY-yongqileixingTable");
                        $("#lock-from").find('input[type=text],select,input[type=hidden]').each(function() {
                               $(this).val('');
                        });
                        layer.msg("数据更新成功!", { icon: 6 });
                      } else {
                        common.appResult.loadErrorText(res);
                      }
                    })
                    .fail(err => {
                      console.log(err);
                    });
                    
                    });
                    layer.close(index); //关闭弹层
                  submit.trigger("click");
                }
              });
              console.info(res)
              form.val("lock-from", {
                "Coding": res.Coding // "name": "value"
                ,"Name": res.Name
                ,"SortNum": res.SortNum
                ,"Description": res.Description
              })
            } else {
              common.appResult.loadErrorText(res);
            }
          })
          .fail(err => {
            console.log(err);
          });
      }
    }
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
      add: function() {
        layer.open({
          type: 1,
          title: "添加用气类型",
          content: $('#lock-from'),
          maxmin: true,
          area: ["500px", "300px"],
          btn: ["确定", "取消"],
          yes: function(index, layero) {
            var submit = $("#LAY-yongqileixi-add-submit");
            //获取提交的字段
            //监听提交
            form.on('submit(LAY-yongqileixi-add-submit)', function (data) {
              var field = data.field;
              common.ajaxFun("get", "/api/Common/GetInsertGuid","",option).then(function(res) {
                if (common.appResult.isSucceeded(res)) {
                  field.Idd = res.Result;
                  yongqiSeverEvent.add(field);
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
    };

    $(".layui-btn.layuiadmin-btn-useradmin").on("click", function() {
      var type = $(this).data("type");
      active[type] ? active[type].call(this) : "";
    });

    table.on('tool()', function(obj){ //注：tool是工具条事件名，test是table原始容器的属性 lay-filter="对应的值"
      var data = obj.data; //获得当前行数据
      var layEvent = obj.event; //获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）
      var tr = obj.tr; //获得当前行 tr 的DOM对象
      if(layEvent === 'detail'){ //查看
        
        console.info("do detail");
        yongqiSeverEvent.detail(data)
        
      } else if(layEvent === 'del'){ //删除
        layer.confirm('真的删除行么', function(index){
          console.info(data)
          yongqiSeverEvent.delete(data); //删除对应行（tr）的DOM结构，并更新缓存
          layer.close(index);
          //向服务端发送删除指令
        });
      } else if(layEvent === 'edit'){ //编辑
        //do something
        console.info(data);
        //同步更新缓存对应的值
        yongqiSeverEvent.edit(data)
      }
    });
  });
