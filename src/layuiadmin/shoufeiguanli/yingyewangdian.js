layui
  .config({
    base: "../../../layuiadmin/" //静态资源所在路径
  })
  .extend({
    index: "lib/index" //主入口模块
  })
  .use(["index", "table", "form",'consts',"common"], function() {
    
    var $ = layui.$,
    table = layui.table,
    common = layui.common,
    form = layui.form;
    var departments = {}
    var department = {}
    var position = {}
    var assistant = {}
    var shebeiPar = {}
    var laypage = layui.laypage;
    //用户管理表格渲染
    var yingyewangdianTable = table.render({
      elem: "#LAY-yingyewangdianTable",
      id:"LAY-yingyewangdianTable",
      url: layui.setter.revenueUrl + "/api/BusinessHall/query/list", //接口
      //response:layui.setter.response,
      where:{"Method":"list"},
      parseData:layui.setter.parseData,
      request: layui.setter.request,
      page:true,
      cols: [
        [
          { field: "Coding", title: "营业网点编码" ,templet: function(d) {
              return d.Me.Coding;
            }},
          { field: "Name",  title: "营业网点名称" ,templet: function(d) {
              return d.Me.Name;
            }},
          { field: "Addr", title: "营业地址",templet: function(d) {
              return d.Me.Addr;
            } },
          { field: "Tels", title: "联系电话",templet: function(d) {
              return d.Me.Tels;
            } },
          { field: "WorkTimeInfo",  title: "营业时间" ,templet: function(d) {
              return d.Me.WorkTimeInfo;
            }},
          { field: "LeaderName", title: "主管操作员",templet: function(d) {
              return d.Me.LeaderName;
            } },
          { field: "Description",  title: "描述" ,templet: function(d) {
              return d.Me.Description;
            }},

          { field: "CreateDate", title: "创建时间",templet: function(d) {
              return "<div>" + layui.util.toDateString(d.Me.CreateDate) + "</div>";
            } },
          { field: "ModifyDate", title: "修改时间",templet: function(d) {
              return "<div>" + layui.util.toDateString(d.Me.ModifyDate) + "</div>";
            } },
          
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
          {title: "操作",fixed: 'right', align:'center', width:160, toolbar: '#LAY-yingyewangdianTable-barOperation'}
          
        ]
      ],
      loading: true,
      limit: 10,
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
      add: function(data) {
        layer.closeAll();
        layer.load(0, { shade: false });
        var dataBean = layui.consts.basePostData();
        console.info(data)
        delete(data.P1) 
        delete(data.A1)
        delete(data.C1)

        dataBean.Data = data;
        dataBean.Data.LeaderName = shebeiPar.FixedUser_Name ? shebeiPar.FixedUser_Name:"";
        dataBean.Data.LeaderID = shebeiPar.FixedUser_Id ? shebeiPar.FixedUser_Id:"";
        dataBean.Method="insert";
        var str1 = JSON.stringify(dataBean);
        console.info("data", str1)
        $.ajax({
          type: "Post",
          url: layui.setter.revenueUrl + "/api/BusinessHall/insert",
          data: str1,
          async: true,
          dataType: "json",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          success: function(data) {
            layer.closeAll();
            
            if (data.IsSucceed) {
              layer.msg("添加营业网点成功!", { icon: 6 });
              table.reload("LAY-yingyewangdianTable");
              $("#lock-from").find('input[type=text],select,input[type=hidden]').each(function() {
                   $(this).val('');
              });
            } else {
              table.reload("LAY-yingyewangdianTable");
              layer.msg("失败: " + data.Errors[0].Message, { icon: 5 });
            }
          },
          error: function(err) {
            layer.closeAll();
            layer.msg("数据操作失败", { icon: 5 });
          }
        });
        table.reload("LAY-yingyewangdianTable");
      },
      delete: function(para) {
        layer.closeAll();
        layer.load(0, { shade: false });
        var dataBean = layui.consts.basePostData();
        dataBean.Data = {"Id":para.Me.Id}
        dataBean.Method = "remove"
        var str1 = JSON.stringify(dataBean);
        $.ajax({
          type: "delete",
          url: layui.setter.revenueUrl + "/api/BusinessHall/Remove/",
          async: true,
          data: str1,
          dataType: "json",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          success: function(data) {
            layer.closeAll();
            
            if (data.IsSucceed) {
              layer.msg("删除营业网点成功!", { icon: 6 });
              table.reload("LAY-yingyewangdianTable");
              
            } else {
              table.reload("LAY-yingyewangdianTable");
              layer.msg("删除失败: " + data.Errors[0].Message, { icon: 5 });
            }
          },
          error: function(err) {
            layer.closeAll();
            layer.msg("数据操作失败", { icon: 5 });
          }
        });
      },
      detail: function(data) {
        layer.load(0, { shade: false,time: 10*1000 });
        var dataBean = layui.consts.basePostData();
        var str1 = JSON.stringify(dataBean);
        $.ajax({
          type: "get",
          url:
            layui.setter.revenueUrl + "/api/BusinessHall/query/key?Data.Id="+para.Me.Id+"&Method=key",

          async: true,
          data: str1,
          dataType: "json",
          success: function(data) {
            if (data.IsSucceed) {
             
              layer.open({
                type: 0,
                title: "营业网点详情",
                content: $("#lock-from").html(),
                maxmin: true,
                area: ["700px", "400px"],
                btn: ["确定"],
                yes: function(index, layero) {
                  layer.close(index);
                  layer.closeAll('loading');
                }
              });
            } else {
              layer.msg("失败" + res.Errors[0].Description, { icon: 5 });
            }
          },
          error: function(err) {
            layer.closeAll();
            layer.msg("数据加载失败", { icon: 5 });
          }
        });
      },
      edit: function(para) {
        var dataBean = layui.consts.basePostData();
        $.ajax({
          type: "get",
          url:
            layui.setter.revenueUrl + "/api/BusinessHall/query/key?Data.Id="+para.Me.Id+"&Method=key",
          async: true, 
          success: function(data) {
            if (data.IsSucceed) {
              console.info(data)
              var res = data.Result.Me
              layer.open({
                type: 1,
                title: "修改营业网点",
                content: $('#lock-from'),
                maxmin: true,
                area: ["900px", "500px"],
                btn: ["确定", "取消"],
                yes: function(index, layero) {
                  var submit = $("#LAY-wangdian-add-submit");
                   //获取提交的字段
                  //监听提交
                  form.on('submit(LAY-wangdian-add-submit)', function (data) {
                    var field = data.field; //获取提交的字段
                  
                    //提交 Ajax 成功后，静态更新表格中的数据
                    var dataBean = layui.consts.basePostData();
                    var date = new Date();
                    dataBean.Data = field;
                    dataBean.Data.Id = res.Id;
                    delete(data.P1) 
                    delete(data.A1)
                    delete(data.C1)
                    dataBean.Data.LeaderName = shebeiPar.FixedUser_Name ? shebeiPar.FixedUser_Name:"";
                    dataBean.Data.LeaderID = shebeiPar.FixedUser_Id ? shebeiPar.FixedUser_Id:"";
                    dataBean.Method="update";
                    var str1 = JSON.stringify(dataBean);
                    console.info("data", str1)
                    $.ajax({
                      type: "Put",
                      url: layui.setter.revenueUrl + "/api/BusinessHall/update",
                      data: str1,
                      async: true,
                      dataType: "json",
                      headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json"
                      },
                      success: function(data) {
                        layer.closeAll();
                        
                        if (data.IsSucceed) {
                          layer.msg("修改营业网点成功!", { icon: 6 });
                          table.reload("LAY-yingyewangdianTable");
                          $("#lock-from").find('input[type=text],select,input[type=hidden]').each(function() {
                               $(this).val('');
                          });
                        } else {
                          table.reload("LAY-yingyewangdianTable");
                          layer.msg("失败: " + data.Errors[0].Message, { icon: 5 });
                        }
                      },
                      error: function(err) {
                        layer.closeAll();
                        layer.msg("数据操作失败", { icon: 5 });
                      }
                    });
                    
                    layer.close(index); //关闭弹层
                  });

                  submit.trigger("click");
                }
              });
              form.val("lock-from", {
                "Coding": res.Coding // "name": "value"
                ,"Name": res.Name
                ,"CompanyCoding": res.CompanyCoding
                ,"Addr": res.Addr
                ,"Tels": res.Tels
                ,"WorkTimeInfo": res.WorkTimeInfo
                ,"LeaderID":res.LeaderID
                ,"LeaderName":res.LeaderName
                ,"SortNum": res.SortNum
                ,"Description": res.Description
              })
              if(para.Me.LeaderName){
                assistant = common.findObjectByKeyVal(departments,"Title",para.Me.LeaderName)
                //console.info(assistant)
                position = common.findObjectByKeyVal(departments,"Id",assistant.ParentId)
                //console.info(position)
                department = common.findObjectByKeyVal(departments,"Id",position.ParentId)
                console.info(department.Title,position.Title,assistant.Title)
                $(province).html('');
                $(province).append('<option selected>全部</option>');
                for(var i in departments){
                  $(province).append('<option  &nbsp; id='+departments[i].Id+' &nbsp; value='+departments[i].Title+'>'+departments[i].Title+'</option>');
                }
                $(province).find("option[value='"+department.Title+"']").attr('selected', true); 
                form.render('select');
                //选择职位下拉框
                $(city).html('');
                $(city).append('<option>全部</option>');
                var cs = department.Children
                if(cs){
                  for(var i in cs){
                    $(city).append('<option &nbsp;  id='+cs[i].Id+' &nbsp;  value='+cs[i].Title+'>'+cs[i].Title+'</option>');
                  }
                  $(city).find("option[value='"+position.Title+"']").attr('selected', true); 
                }
                form.render('select');
                $(city).next().find('.layui-this').removeClass('layui-this').click();
                pca.formHidden('province', data.value);
                $('.pca-label-province').html(data.value);//此处可以自己修改 显示的位置, 不想显示可以直接去掉
                
                //选择营业员下拉框
                $(area).html('');
                  $(area).append('<option>全部</option>');
                cs = position.Children
                  if(cs){
                    for(var i in cs){
                      console.info(cs[i].Id)
                      $(area).append('<option &nbsp; id='+cs[i].Id+' &nbsp; value='+cs[i].Title+'>'+cs[i].Title+'</option>');
                    }
                    $(area).find("option[value='"+assistant.Title+"']").attr('selected', true); 
                  }
                form.render('select');
                $(area).next().find('.layui-this').removeClass('layui-this').click();
                pca.formHidden('city', data.value);
                $('.pca-label-city').html(data.value);
              }else{
                pca.init('select[name=P1]', 'select[name=C1]', 'select[name=A1]');
                form.render('select');
              }
              console.info(para)
              
            } else {
              layer.msg("失败" + data.Errors[0].Message, { icon: 5 });
            }
          },
          error: function(err) {
            layer.closeAll();
            layer.msg("数据加载失败", { icon: 5 });
          }
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
        $.ajax({
          type: "Get",
          url: layui.setter.baseUrl + "/api/Organ/treeview", 
          async: true,
          headers: {
            Accept: "application/json, text/javascript, */*; q=0.01",
          },
          success: function(data) {
            
            //console.log(data);
            if (data.IsSucceed) {
              departments = data.Result.TreeNodes[0].Children
              
              pca.init('select[name=P1]', 'select[name=C1]', 'select[name=A1]');
              form.render('select');
              //$("#BusinessHall_Name").append("<option value="+data.Id+">"+data.Name+"</option>");
            } 
          },
          error: function(err) {
            
            layer.msg("数据操作失败", { icon: 5 });
          }
        });
        layer.open({
          type: 1,
          title: "添加营业网点",
          content: $('#lock-from'),
          maxmin: true,
          area: ["900px", "500px"],
          btn: ["确定", "取消"],
          yes: function(index, layero) {
            var submit = $("#LAY-wangdian-add-submit");
             //获取提交的字段
            //监听提交
            form.on('submit(LAY-wangdian-add-submit)', function (data) {
              var field = data.field;

              $.ajax({
                type: "get",
                url: layui.setter.revenueUrl + "/api/Common/GetInsertGuid",
                async: true,
                dataType: "json",
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json"
                },
                success: function(data) {
                   
                  if (data.IsSucceed) {
                    field.Idd = data.Result;
                    wangdianSeverEvent.add(field);

                    layer.close(index); //关闭弹层
                  } else {
                    
                    layer.msg("添加网点数据失败" + data, { icon: 5 });
                  }

                },
                error: function(err) {
                  layer.closeAll();
                  layer.msg("数据操作失败", { icon: 5 });
                }
              });
            });
            submit.trigger("click");
            
          }
        });
      }
    };

    var pca = {};
  
    pca.keys = {};
    pca.ckeys = {};
    
    pca.init = function(province, city, area, initprovince, initcity, initarea){//jQuery选择器, 省-市-区
      if(!province || !$(province).length) return; 
      $(province).html('');
      $(province).append('<option selected>全部</option>');
      for(var i in departments){
        $(province).append('<option  &nbsp; id='+departments[i].Id+' &nbsp; value='+departments[i].Title+'>'+departments[i].Title+'</option>');
        pca.keys[departments[i].Title] = departments[i];
      }
      form.render('select');
      if(!city || !$(city).length) return;
      pca.formRender(city);
      form.on('select(province)', function(data){
        
          var cs = pca.keys[data.value].Children;
          $(city).html('');
          $(city).append('<option>全部</option>');
          if(cs){
            for(var i in cs){
              $(city).append('<option &nbsp;  id='+cs[i].Id+' &nbsp;  value='+cs[i].Title+'>'+cs[i].Title+'</option>');
              pca.ckeys[cs[i].Title] = cs[i];
            }
            $(city).find('option:eq(1)').attr('selected', true);
          }
        form.render('select');
        $(city).next().find('.layui-this').removeClass('layui-this').click();
        pca.formHidden('province', data.value);
        $('.pca-label-province').html(data.value);//此处可以自己修改 显示的位置, 不想显示可以直接去掉
      }); 
      
      if(!area || !$(area).length) return;
      pca.formRender(area);
      form.on('select(city)', function(data){
          var cs = pca.ckeys[data.value];

          $(area).html('');
          $(area).append('<option>全部</option>');
          if(cs){
            cs = cs.Children;
          for(var i in cs){
            console.info(cs[i].Id)
            $(area).append('<option &nbsp; id='+cs[i].Id+' &nbsp; value='+cs[i].Title+'>'+cs[i].Title+'</option>');
          }
          $(area).find('option:eq(1)').attr('selected', true);
          }
        form.render('select');
        $(area).next().find('.layui-this').removeClass('layui-this').click();
        pca.formHidden('city', data.value);
        $('.pca-label-city').html(data.value);  //此处可以自己修改 显示的位置, 不想显示可以直接去掉
      }); 
      form.on('select(area)', function(data){
        //console.info($("#area option[selected='selected']").attr('id'))
        //console.info($("#area option[selected='selected']").val())
        shebeiPar.FixedUser_Name = $("#area option[selected='selected']").val();
        shebeiPar.FixedUser_Id = $("#area option[selected='selected']").attr('id');
        
        pca.formHidden('area', data.value);   
        $('.pca-label-area').html(data.value);  //此处可以自己修改 显示的位置, 不想显示可以直接去掉
      }); 
    }

    pca.formRender = function(obj){
      $(obj).html('');
      $(obj).append('<option>全部</option>');
      form.render('select');
    }
    
    pca.formHidden = function(obj, val){
      if(!$('#pca-hide-'+obj).length) 
        $('body').append('<input id="pca-hide-'+obj+'" type="hidden" value="'+val+'" />');
      else
        $('#pca-hide-'+obj).val(val);
    }

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
        wangdianSeverEvent.detail(data)
        
      } else if(layEvent === 'del'){ //删除
        layer.confirm('真的删除行么', function(index){
          wangdianSeverEvent.delete(data); //删除对应行（tr）的DOM结构，并更新缓存
          layer.close(index);
          //向服务端发送删除指令
        });
      } else if(layEvent === 'edit'){ //编辑
        //do something
        console.info(data);
        //同步更新缓存对应的值
        
        $.ajax({
          type: "Get",
          url: layui.setter.baseUrl + "/api/Organ/treeview", 
          async: true,
          headers: {
            Accept: "application/json, text/javascript, */*; q=0.01",
          },
          success: function(re) {
            if (re.IsSucceed) {
              departments = re.Result.TreeNodes[0].Children

              console.info(departments)
              wangdianSeverEvent.edit(data)
              
            } 
          },
          error: function(err) {
            
            layer.msg("数据操作失败", { icon: 5 });
          }
        });
      }
    });
  });
