layui
  .config({
    base: "../../../layuiadmin/" //静态资源所在路径
  })
  .extend({
    index: "lib/index" //主入口模块
  })
  .use(["index", "table",'consts'], function() {
    
    var $ = layui.$,
    table = layui.table,
    form = layui.form;
    var laypage = layui.laypage;

    var wangdianTable = table.render({
      elem: "#LAY-yingyewangdian_SKTable",
      id:"LAY-yingyewangdian_SKTable",
      url: layui.setter.baseUrl + "/api/BusinessHall/query/list", //接口
      //response:layui.setter.response,
      where:{"Data.CompanyCoding":"88888888","Method":"list"},
      parseData:layui.setter.parseData,
      request: layui.setter.request,
      cols: [
        [
          {type: 'radio', fixed: 'left'},
          {
            field: "Id",
            title: "营业网点ID",templet: function(d) {
              return d.Me.Id;
            }
          },
          { field: "Name",  title: "营业网点名称",templet: function(d) {
              return d.Me.Name;
            } },
        ]
      ],
      page:true,
      loading: true,
      limit: 10,
  
      align:"center",
      text: "对不起，加载出现异常！"
    });
    var shebeiPar={FixedUserFlag: false,
                   Status:2,
    }
    var departments = {}
    var department = {}
    var position = {}
    var assistant = {}
    //用户管理表格渲染
    var shoukuanshebeiTable = table.render({
      elem: "#LAY-shoukuanmanageTable",
      id:"LAY-shoukuanmanageTable",
      url: layui.setter.baseUrl + "/api/BusinessHallDevice/query/list", //接口
      where:{"Data.CompanyCoding":"88888888","Method":"list"},
      parseData:layui.setter.parseData,
      request: layui.setter.request,
      page:true,
      cols: [
        [
          { field: "BusinessHall_Name", title: "营业网点名称", width: 100, },
          { field: "StatusName", title: "设备状态" },
          { field: "Coding",  title: "设备编码",templet: function(d) {
              return d.Me.Coding;
            } },
          { field: "Name",  title: "设备名称",templet: function(d) {
              return d.Me.Name;
            } },
          { field: "Mac",  title: "特征标识（MAC）",
            templet: function(d) {
              return d.Me.Mac;
            }},
          { field: "FixedUserFlag",  title: "指定营业员",templet: function(d) {
              return d.Me.FixedUserFlag;
            } },
          { field: "FixedUser_Name",  title: "指定营业员名称",templet: function(d) {
              return d.Me.FixedUser_Name;
            } },
          { field: "SortNum",  title: "排序号",templet: function(d) {
              return d.Me.SortNum;
            } },
          { field: "Description",  title: "描述",templet: function(d) {
              return d.Me.Description;
            } },
          {
            field: "CreateDate",
            title: "建档日期",
            sort: true,
            templet: function(d) {
              return "<div>" + layui.util.toDateString(d.Me.CreateDate) + "</div>";
            }
          },
          {
            field: "ModifyDate",
            title: "更新日期",
            sort: true,
            templet: function(d) {
              return "<div>" + layui.util.toDateString(d.Me.CreateDate) + "</div>";
            }
          },
          {
            title: "操作",
            align: "center",
            width:160,
            toolbar: '#LAY-shebeiTable-barOperation'
          }
        ]
      ],
      loading: true,
   
      limit: 10,
      text: "对不起，加载出现异常！"
    });

    
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

    //服务交互
    var shoukuanSeverEvent = {
      add: function(para) {
        layer.closeAll();
        layer.load(0, { shade: false });
        var dataBean = layui.consts.basePostData();
        dataBean.Data = para;
        dataBean.Data.CompanyCoding = "88888888";
        dataBean.Data.CompanyName = "88888888";
        dataBean.Method="insert";
        var str1 = JSON.stringify(dataBean);
        if(dataBean.Data.FixedUserFlag){
          if(!dataBean.Data.FixedUser_Id || !dataBean.Data.FixedUser_Name){
            layer.closeAll();
            layer.msg("营业员未选择, 请选择固定营业员或取消指定营业员 ", { icon: 5 });
          }else{
            console.info("营业员已选择")
            $.ajax({
              type: "Post",
              url: layui.setter.baseUrl + "/api/BusinessHallDevice/insert",
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
                  layer.msg("添加设备成功!", { icon: 6 });
                  table.reload("LAY-shoukuanmanageTable");
                  $("#lock-from").find('input[type=text],select,input[type=hidden]').each(function() {
                   $(this).val('');
                  });
                } else {
                  table.reload("LAY-shoukuanmanageTable");
                  layer.msg("添加设备数据失败: " + data.Errors[0].Message, { icon: 5 });
                }
              },
              error: function(err) {
                layer.closeAll();
                layer.msg("数据操作失败", { icon: 5 });
              }
            });
          }
        }else{
          console.info("营业员为空")
            $.ajax({
              type: "Post",
              url: layui.setter.baseUrl + "/api/BusinessHallDevice/insert",
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
                  layer.msg("添加设备成功!", { icon: 6 });
                  layer.closeAll();
                  table.reload("LAY-shoukuanmanageTable");
                  $("#lock-from").find('input[type=text],select,input[type=hidden]').each(function() {
                   $(this).val('');
              });
                } else {
                  table.reload("LAY-shoukuanmanageTable");
                  layer.msg("添加设备数据失败: " + data.Errors[0].Message, { icon: 5 });
                }
              },
              error: function(err) {
                layer.closeAll();
                layer.msg("数据操作失败", { icon: 5 });
              }
            });
          }
        
      },
      delete: function(para) {
        layer.closeAll();
        layer.load(0, { shade: false });
        var dataBean = layui.consts.basePostData();
        dataBean.Data = {"Key":para.Me.Id}
        dataBean.Method = "remove"
        var str1 = JSON.stringify(dataBean);
        console.info(str1)
        $.ajax({
          type: "delete",
          url: layui.setter.baseUrl + "/api/BusinessHallDevice/remove",
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
              layer.msg("删除营业设备成功!", { icon: 6 });
              table.reload("LAY-shoukuanmanageTable");
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
      edit: function(para) {
      //console.info(para)
      $.ajax({
        type: "get",
        url:
        layui.setter.baseUrl + "/api/BusinessHallDevice/query/key?Data.key="+para.Me.Id+"&Method=key",
        async: true,
        success: function(data) {
          console.info(para.BusinessHall_Name)
          if (data.IsSucceed) {
            var res = data.Result.Me
            layer.open({
              type: 1,
              title: "修改收款设备",
              content: $('#lock-from'),
              maxmin: true,
              area: ["700px", "400px"],
              btn: ["确定", "取消"],
              yes: function(index, layero) {
                var submit = $("#LAY-shebei-add-submit");
                //获取提交的字段
                //监听提交
                form.on('submit(LAY-shebei-add-submit)', function (data) {
                  var field = data.field; //获取提交的字段
                  //提交 Ajax 成功后，静态更新表格中的数据
                  var dataBean = layui.consts.basePostData();
                  dataBean.Data = field;
                  dataBean.Data.BusinessHall_Id = res.BusinessHall_Id;
                  dataBean.Data.BusinessHall_Name = para.BusinessHall_Name;
                  dataBean.Data.Id = res.Id;
                  dataBean.Data.Status = field.Status == "on"? 1 : 2;
                  dataBean.Data.CompanyCoding = "88888888";
                  dataBean.Data.FixedUserFlag = field.FixedUserFlag == "on"? true : false;
                  dataBean.Data.FixedUser_Id = shebeiPar.FixedUser_Id;
                  dataBean.Data.FixedUser_Name = shebeiPar.FixedUser_Name;
                  dataBean.Method="update";
                  delete dataBean.Data["P1"]
                  delete dataBean.Data["C1"]
                  delete dataBean.Data["A1"]
                  delete dataBean.Data["layTableRadio_1"]
                  var str1 = JSON.stringify(dataBean);
                  //console.info("data", str1)
                  
                  $.ajax({
                    type: "Put",
                    url: layui.setter.baseUrl + "/api/BusinessHallDevice/update",
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
                        table.reload("LAY-shoukuanmanageTable");
                        $("#lock-from").find('input[type=text],select,input[type=hidden]').each(function() {
                             $(this).val('');
                        });
                      } else {
                        table.reload("LAY-shoukuanmanageTable");
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
              ,"CompanyName": res.CompanyName
              ,"Mac": res.Mac
              ,"SortNum":res.SortNum
              ,"Status": res.Status ==1 ? true : false
              ,"Description": res.Description
              ,"FixedUser_Id":res.FixedUser_Id
              ,"FixedUser_Name":res.FixedUser_Name
              ,"FixedUserFlag":res.FixedUserFlag
              ,"Id":res.Id
              ,"BusinessHall_Id":res.BusinessHall_Id
              ,"BusinessHall_Name":para.BusinessHall_Name
            })
            
            if(res.FixedUserFlag){
              assistant = findObjectByKeyVal(departments,"Title",res.FixedUser_Name)
              //console.info(assistant)
              position = findObjectByKeyVal(departments,"Id",assistant.ParentId)
              //console.info(position)
              department = findObjectByKeyVal(departments,"Id",position.ParentId)
              console.info(department.Title,position.Title,assistant.Title)
              $("#province").removeAttr("disabled");  
              $("#city").removeAttr("disabled"); 
              $("#area").removeAttr("disabled"); 
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
              $('.pca-label-city').html(data.value);  //此处可以自己修改 显示的位置, 不想显示可以直接去掉
              
            }else{
              $("#province").attr("disabled","disabled");
              $("#city").attr("disabled","disabled");
              $("#area").attr("disabled","disabled");
              pca.init('select[name=P1]', 'select[name=C1]', 'select[name=A1]');
              form.render('select');
            }
          } else {
            layer.msg("失败" + res.Errors[0].Description, { icon: 5 });
          }
        },
        error: function(err) {
          layer.closeAll();
          layer.msg("数据加载失败", { icon: 5 });
        }
      });
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
      add: function() {
        $.ajax({
          type: "Get",
          url: layui.setter.magUrl + "/api/Organ/treeview", 
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
        table.reload("LAY-yingyewangdian_SKTable");

        layer.open({
          type: 1,
          title: "添加设备",
          content: $('#lock-from'),
          maxmin: true,
          area: ["800px", "500px"],
          btn: ["确定", "取消"],
          yes: function(index, layero) {
            var submit = $("#LAY-shebei-add-submit");
            
            //获取提交的字段
            //监听提交
            form.on('submit(LAY-shebei-add-submit)', function (data) {
              var field = data.field; //获取提交的字段
              //
              //提交 Ajax 成功后，静态更新表格中的数据
              //$.ajax({});
              
              $.ajax({
                type: "get",
                url: layui.setter.baseUrl + "/api/Common/GetInsertGuid",
                async: true,
                dataType: "json",
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json"
                },
                success: function(data) {
                  if (data.IsSucceed) {
                    shebeiPar.Idd = data.Result;
                    shebeiPar.Mac = field.Mac;
                    shebeiPar.Coding = field.Coding;
                    shebeiPar.Description = field.Description;

                    shebeiPar.Name = field.Name;
                    shebeiPar.SortNum = field.SortNum;
                    shebeiPar.Coding = field.Coding;
                    shebeiPar.Status = field.Status == "on"? 1 :2;
                    //shebeiPar.Description = field.Description;
                    console.info("shebeiPar: ", shebeiPar)
                    shoukuanSeverEvent.add(shebeiPar);
                    layer.close(index); //关闭弹层
                  } else {
                    layer.msg("设备数据失败" + data.Errors[0].Message, { icon: 5 });
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
        
      }
    };

    $(".layui-btn.layuiadmin-btn-shoukuanAdd").on("click", function() {
      var type = $(this).data("type");
      active[type] ? active[type].call(this) : "";
    });
    /*
    form.on('switch(status)', function(data){
      //console.log(data.elem); //得到checkbox原始DOM对象
      //console.log(data.elem.checked); //开关是否开启，true或者false
      //console.log(data.value); //开关value值，也可以通过data.elem.value得到
      shebeiPar.statue = data.elem.checked
    }); 
    */
    $(".layui-btn.LAY-wangdian-search-submit").on("click", function(data){
      layer.open({
          type: 1,
          title: "查询营业网点",
          content: $('#lock-from-BusinessHall'),
          maxmin: true,
          offset: 'auto',
          zIndex :999999999,
          area: ["800px", "500px"],
          btn: ["确定", "取消"],
          yes: function(index, layero) {
            console.info(shebeiPar.BusinessHall_Name)
            //$("#BusinessHall_Name").attr({value:shebeiPar.BusinessHall_Name});
            form.val("lock-from", {
              "BusinessHall_Name": shebeiPar.BusinessHall_Name // "name": "value"
            })
            layer.close(index);
          }
      });
    });

    form.on('switch(FixedUserFlag)', function(data){
      //console.log(data.elem); //得到checkbox原始DOM对象
      //console.log(data.elem.checked); //开关是否开启，true或者false
      //console.log(data.value); //开关value值，也可以通过data.elem.value得到
      shebeiPar.FixedUserFlag = data.elem.checked;
      if(shebeiPar.FixedUserFlag){
        $("#province").removeAttr("disabled");  
        $("#city").removeAttr("disabled"); 
        $("#area").removeAttr("disabled");   
      }else{
        $("#province").attr("disabled","disabled");
        $("#city").attr("disabled","disabled");
        $("#area").attr("disabled","disabled");
      }
      form.render('select');
    }); 

    table.on('radio(LAY-yingyewangdian_SKTable)', function(data){
      console.info(data.data)
      var res = data.data.Me
      shebeiPar.BusinessHall_Id = res.Id;
      shebeiPar.BusinessHall_Name = res.Name;
    }); 

    table.on('tool()', function(obj){ //注：tool是工具条事件名，test是table原始容器的属性 lay-filter="对应的值"
      var data = obj.data; //获得当前行数据
      var layEvent = obj.event; //获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）
      var tr = obj.tr; //获得当前行 tr 的DOM对象
      if(layEvent === 'del'){ //删除
        layer.confirm('真的删除行么', function(index){
          shoukuanSeverEvent.delete(data); //删除对应行（tr）的DOM结构，并更新缓存
          layer.close(index);
          //向服务端发送删除指令
        });
      } else if(layEvent === 'edit'){ //编辑
        //do something
        $.ajax({
          type: "Get",
          url: layui.setter.magUrl + "/api/Organ/treeview", 
          async: true,
          headers: {
            Accept: "application/json, text/javascript, */*; q=0.01",
          },
          success: function(re) {
            if (re.IsSucceed) {
              departments = re.Result.TreeNodes[0].Children
              //console.info(departments)
              
              console.info(data)
              shoukuanSeverEvent.edit(data)
              //pca.init('select[name=P1]', 'select[name=C1]', 'select[name=A1]');
              //form.render('select');
              //$("#BusinessHall_Name").append("<option value="+data.Id+">"+data.Name+"</option>");
            } 
          },
          error: function(err) {
            
            layer.msg("数据操作失败", { icon: 5 });
          }
        });
       
      }
    });

    var findObjectByKeyVal= function (obj, key, val) {
      if (!obj || (typeof obj === 'string')) {
        return null
      }
      if (obj[key] === val) {
        return obj
      }

      for (var i in obj) {
        if (obj.hasOwnProperty(i)) {
          var found = findObjectByKeyVal(obj[i], key, val)
          if (found) {
            return found
          }
        }
      }
      return null
    }
  });
