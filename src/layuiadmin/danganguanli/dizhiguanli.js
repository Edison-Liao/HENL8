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
          baseUrl:layui.setter.revenueUrl
        }
    var villageType = {}
   // var areaStatus = {}
    //用户管理表格渲染
    var village = {}
    var building = {}
    var areaStatus = {}
    var addType = {}
    var readPtStatus = {}
    //服务交互  /api/Area/query/all?Data.AreaType=
    var dizhiSeverEvent = {
      getReadPoint: function(id){
        common.ajaxFun("get", "/api/ReadingPoint/query/key?Data.id="+id+"&Method=key",'',option).then(function(res) {
          if (common.appResult.isSucceeded(res)) {
            
            res.Result.Me.Name
          } else {
            common.appResult.loadErrorText(res);
          }
        })
        .fail(err => {
          console.log(err);
        });
      },
      getArea: function(id){
        common.ajaxFun("get", "/api/Area/query/key?Data.id="+id+"&Method=key",'',option).then(function(res) {
          if (common.appResult.isSucceeded(res)) {
            
            res.Result.Me.Name
          } else {
            common.appResult.loadErrorText(res);
          }
        })
        .fail(err => {
          console.log(err);
        });
      },
      getAllAvailableArea: function(data){
        common.ajaxFun("get", "/api/Area/query/all?Data.AreaType="+data.type+"&Data.Status="+data.status+"&Method=all",'',option).then(function(res) {
          if (common.appResult.isSucceeded(res)) {
            var result = {element:data.name,items:res.Result}

            render.renderSelect(result)
          } else {
            common.appResult.loadErrorText(res);
          }
        })
        .fail(err => {
          console.log(err);
        });
      },
      getAllAvailableReadPt: function(data){
        console.info(data)
        common.ajaxFun("get", "/api/ReadingPoint/query/all?Data.Area_Id_Village="+data.id+"&Data.Status="+data.status+"&Method=all",'',option).then(function(res) {
          if (common.appResult.isSucceeded(res)) {
            var result = {element:"#Area_Id_ReadingPoint",items:res.Result}

            render.renderSelect(result)
          } else {
            common.appResult.loadErrorText(res);
          }
        })
        .fail(err => {
          console.log(err);
        });
      },
      getAddtype: function(data){
        common.ajaxFun("get", "/api/Address/addresstype?Method=addresstype",'',option).then(function(res) {
          if (common.appResult.isSucceeded(res)) {
            addType = res
            var result = {element:"#AddressType",items:res.Result}
            render.renderAddSelect(result)
          } else {
            common.appResult.loadErrorText(res);
          }
        })
        .fail(err => {
          console.log(err);
        });
      },
      getAreaTypeObj: function(){
        common.ajaxFun("get", "/api/Area/areatype?Method=areatype",'',option).then(function(res) {
          if (common.appResult.isSucceeded(res)) {
            var areaAbleStatus = common.findObjectByKeyVal(areaStatus,"Text",'启用')
            village = common.findObjectByKeyVal(res,"Text",'小区')
            building = common.findObjectByKeyVal(res,"Text",'楼栋')
            var villageSelPara = {name:"#Area_Id_Village", status:areaAbleStatus.Value, type:village.Value}
            var bulSelPara = {name:"#Area_Id_Building", status:areaAbleStatus.Value, type:building.Value}
            //console.info(village)
            //console.info(villageSelPara)
            dizhiSeverEvent.getAllAvailableArea(villageSelPara)
            dizhiSeverEvent.getAllAvailableArea(bulSelPara)
            //render.renderSelect(villageSelPara)
            //render.renderSelect(bulSelPara)
            
          } else {
            common.appResult.loadErrorText(res);
          }
        })
        .fail(err => {
          console.log(err);
        });
      },
      getAllAvailableRsd_Bld: function() {
        common.ajaxFun("get", "/api/Area/areastatus?Method=areastatus",'',option).then(function(res) {
          if (common.appResult.isSucceeded(res)) {

            areaStatus  = res
            dizhiSeverEvent.getAreaTypeObj()
          } else {
            common.appResult.loadErrorText(res);
          }
        })
        .fail(err => {
          console.log(err);
        });
      },
      getAllAvailableReadPtByRsd: function(id) {
        common.ajaxFun("get", "/api/ReadingPoint/readingpointstatus?Method=readingpointstatus",'',option).then(function(res) {
          if (common.appResult.isSucceeded(res)) {
            readPtStatus = res
            var readPAbleStatus  = common.findObjectByKeyVal(readPtStatus,"Text",'启用')
            var data = {id : id, status:readPAbleStatus.Value}
            dizhiSeverEvent.getAllAvailableReadPt(data)
          } else {
            common.appResult.loadErrorText(res);
          }
        })
        .fail(err => {
          console.log(err);
        });
      },
      add: function(data) {
        layer.closeAll();
        var dataBean = layui.consts.basePostData();
        dataBean.Data = data;
        dataBean.Method="insert";
        
        
        var str1 = JSON.stringify(dataBean);
        //console.log(str1);
        common
          .ajaxFun("post", "/api/address/insert", str1,option)
          .then(function(res) {
            if (common.appResult.isSucceeded(res)) {
              table.reload("LAY-dizhiTable");
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
        console.info(para.Me)
        dataBean.Data = {Id:para.Me.Id,CompanyId:""}
        dataBean.Method = "remove"
        var str1 = JSON.stringify(dataBean);
        console.info(str1)
        common
          .ajaxFun("delete", "/api/Address/remove", str1,option)
          .then(function(res) {
            if (common.appResult.isSucceeded(res)) {
              table.reload("LAY-dizhiTable");
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
       
        common
          .ajaxFun("get", "/api/Address/query/key?Data.Id="+para.Id+"&Method=key","",option)
          .then(function(res) {
            if (common.appResult.isSucceeded(res)) {
              var res = res.Result
              layer.open({
                type: 1,
                title: "修改地址档案",
                content: $('#lock-from'),
                maxmin: true,
                area: ["800px", "500px"],
                btn: ["确定", "取消"],
                yes: function(index, layero) {
                  var submit = $("#LAY-dizhi-add-submit");
                   //获取提交的字段
                  //监听提交
                  form.on('submit(LAY-dizhi-add-submit)', function (data) {
                    var field = data.field; //获取提交的字段
                    console.info(field)
                    field.AddressStatus = field.AddressStatus =="on" ? 1 : 2;
                    field.AddressType = Number(field.AddressType);
                    field.AccountDay = Number(field.AccountDay);
                    field.Area_Id_Building = field.Area_Id_Building == "全部" ? "" : field.Area_Id_Building
                    field.Area_Id_ReadingPoint = field.Area_Id_ReadingPoint == "全部" ? "" : field.Area_Id_ReadingPoint
                    console.info(field)
                    if(field.AddressType == "全部"  ){
                      layer.msg("请选择地址类型", { icon: 5 });
                      
                    }
                    if(field.Area_Id_Village == "全部"){
                      layer.msg("请选择小区", { icon: 5 });
                      
                    }
                    //提交 Ajax 成功后，静态更新表格中的数据 
                    var dataBean = layui.consts.basePostData();
                    
                    dataBean.Data = field;
                    dataBean.Data.Id = para.Id;

                    dataBean.Method="update";
                    var str1 = JSON.stringify(dataBean);
                    console.info("data", str1)
                    common.ajaxFun("put", "/api/Address/update", str1,option).then(function(res) {
                      if (common.appResult.isSucceeded(res)) {
                        table.reload("LAY-dizhiTable");
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
              
              if(res.Area_Id_ReadingPointName){
                $("#Area_Id_ReadingPoint").removeAttr("disabled"); 
                $(Area_Id_ReadingPoint).append('<option &nbsp; value='+res.Me.Area_Id_ReadingPoint+'>'+res.Area_Id_ReadingPointName+'</option>');
              }

              if(res.Me.AddressType === "2" ){
                 $("#Area_Id_Building").attr("disabled","disabled");
                 $("#UnitNo").attr("disabled","disabled");
                 $("#FloorNo").attr("disabled","disabled");
                 $("#RoomNo").attr("disabled","disabled");
              }else{
                $("#Area_Id_Building").removeAttr("disabled"); 
                $("#RoomNo").removeAttr("disabled"); 
                $("#FloorNo").removeAttr("disabled"); 
                $("#UnitNo").removeAttr("disabled"); 
              }
              form.val("lock-from", {
                "AddressStatus": res.Me.AddressStatusName == "正常"? "on": "off"
                ,"AddressType": res.Me.AddressType
                ,"Area_Id_Village": res.Me.Area_Id_Village
                ,"Area_Id_ReadingPoint": res.Me.Area_Id_ReadingPoint
                ,"Area_Id_Building": res.Me.Area_Id_Building
                ,"UnitNo": res.Me.UnitNo
                ,"FloorNo": res.Me.FloorNo
                ,"RoomNo": res.Me.RoomNo
                ,"Address": res.Me.Address
                ,"AccountDay": res.Me.AccountDay

                ,"SortNum": res.Me.SortNum
                ,"Description": res.Me.Description
              })
               /*
              $(AddressType).find("option:contains("+res.AddressTypeName+")").removeAttr('selected');
              $(AddressType).find("option:contains("+res.AddressTypeName+")").attr('selected', true);
              $(Area_Id_Village).find("option:contains("+res.Area_Id_VillageName+")").removeAttr('selected');
              $(Area_Id_Village).find("option:contains("+res.Area_Id_VillageName+")").attr('selected', true);
             
              if(res.Area_Id_BuildingName){
                $(Area_Id_Building).find("option:contains("+res.Area_Id_BuildingName+")").attr('selected', true);
              }
              if(res.Area_Id_ReadingPointName){
                $("#Area_Id_ReadingPoint").removeAttr("disabled"); 
                $(Area_Id_ReadingPoint).find("option:contains("+res.Area_Id_ReadingPointName+")").attr('selected', true);
              }
              */
              form.render('select');
              
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
          title: "添加地址",
          content: $('#lock-from'),
          maxmin: true,
          area: ["800px", "500px"],
          btn: ["确定", "取消"],
          yes: function(index, layero) {
            var submit = $("#LAY-dizhi-add-submit");
            form.on('submit(LAY-dizhi-add-submit)', function (data) {
              var field = data.field;

              common.ajaxFun("get", "/api/Common/GetInsertGuid","",option).then(function(res) {
                if (common.appResult.isSucceeded(res)) {
                  field.Idd = res.Result;
                  field.AddressStatus = field.AddressStatus =="on" ? 1 : 2;
                  field.Area_Id_Building = field.Area_Id_Building == "全部" ? "" : field.Area_Id_Building
                  field.Area_Id_ReadingPoint = field.Area_Id_ReadingPoint == "全部" ? "" : field.Area_Id_ReadingPoint
                  //console.info(field)
                  if(field.AddressType == "全部"  ){
                      layer.msg("请选择地址类型", { icon: 5 });

                  }else if(field.Area_Id_Village == "全部"){
                      layer.msg("请选择小区", { icon: 5 });
                      
                  }else{
                    dizhiSeverEvent.add(field);
                  }
                  
                  
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
    var render = {
      renderSelect: function(data) {
        //console.info(data)
        $(data.element).html('');
        $(data.element).append('<option selected>全部</option>');
        var content
        for(var i in data.items){
          //content += '<option  &nbsp; id='+data.items[i].Me.Id+' &nbsp; value='+data.items[i].Me.Name+'>'+data.items[i].Me.Name+'</option>';
          content += '<option  &nbsp; value='+data.items[i].Me.Id+'>'+data.items[i].Me.Name+'</option>';
        }

        $(data.element).append(content);
        form.render('select');
      },
      renderAddSelect: function(data) {
        //console.info(data)
        $(data.element).html('');
        $(data.element).append('<option selected>全部</option>');
        var content
        for(var i in data.items){
          content += '<option  &nbsp; value='+data.items[i].Value+'>'+data.items[i].Text+'</option>';
        }

        $(data.element).append(content);
        form.render('select');
      },
      renderTable: function(){
        table.render({
            elem: "#LAY-dizhiTable",
            id:"LAY-dizhiTable",
            url: layui.setter.revenueUrl + "/api/Address/query/list", //接口
            where:{"Method":"list"},
            parseData:layui.setter.parseData,
            request: layui.setter.request,
            page:true,
            cols: [
              [ 
                { field: "Address", title: "地址",templet: function(d) {
                    return d.Me.Address;
                  } },
                { field: "Area_Id_ReadingPoint",  title: "抄表点" ,templet: function(d) {
                    //return dizhiSeverEvent.getReadPoint(d.Me.Area_Id_ReadingPoint)
                    return d.Area_Id_ReadingPointName
                  }},
                { field: "Area_Id_Village",  title: "小区" ,templet: function(d) {

                    return d.Area_Id_VillageName;
                  }}, 
                { field: "Area_Id_Building",  title: "楼栋" ,templet: function(d) {
                    return d.Area_Id_BuildingName;
                  }},  
                { field: "AddressStatus",  title: "地址状态" ,templet: function(d) {
                    return d.AddressStatusName
                  }},
                { field: "AddressType",  title: "地址类型" ,templet: function(d) {
                    return d.AddressTypeName
                    
                  }},
                { field: "AccountDay", title: "帐期",templet: function(d) {
                    return d.Me.AccountDay;
                  } },
                { field: "RoomNo", title: "房号",templet: function(d) {
                    return d.Me.RoomNo;
                  } },
                { field: "UnitNo", title: "单元号",templet: function(d) {
                    return d.Me.UnitNo;
                  } },
                { field: "FloorNo", title: "楼层",templet: function(d) {
                    return d.Me.FloorNo;
                  } },
                {title: "操作",fixed: 'right', align:'center', width:160,toolbar: '#LAY-dizhiTable-barOperation'}
              ]
            ],
            loading: true,
            limit: 10,
            text: "对不起，加载出现异常！"
          });
      },
      init: function() {
        dizhiSeverEvent.getAllAvailableRsd_Bld()
        dizhiSeverEvent.getAddtype()
        render.renderTable()
      },

    }


    $(".layui-btn.layuiadmin-btn-useradmin").on("click", function() {
      var type = $(this).data("type");
      active[type] ? active[type].call(this) : "";
    });

    $(".layui-btn.LAY-xiaoqu-search-submit").on("click", function(data){
      layer.open({
          type: 1,
          title: "查询营业网点",
          content: $('#lock-from-xiaoqu'),
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
    
    form.on('select(Area_Id_Village)', function(data){
      //conole.info(data)
      if(data.value === "全部" ){
         $("#Area_Id_ReadingPoint").attr("disabled","disabled");
      }else{
        $("#Area_Id_ReadingPoint").removeAttr("disabled"); 
        dizhiSeverEvent.getAllAvailableReadPtByRsd(data.value)
      }
      form.render('select');
      
    });

    form.on('select(AddressType)', function(data){
      //conole.info(data)
      //2 零散户 , 1 楼栋户
      if(data.value === "2" ){
         $("#Area_Id_Building").attr("disabled","disabled");
         $("#UnitNo").attr("disabled","disabled");
         $("#FloorNo").attr("disabled","disabled");
         $("#RoomNo").attr("disabled","disabled");
      }else{
        $("#Area_Id_Building").removeAttr("disabled"); 
        $("#RoomNo").removeAttr("disabled"); 
        $("#FloorNo").removeAttr("disabled"); 
        $("#UnitNo").removeAttr("disabled"); 
      }
      form.render('select');
      
    });

    table.on('tool()', function(obj){ //注：tool是工具条事件名，test是table原始容器的属性 lay-filter="对应的值"
      var data = obj.data; //获得当前行数据
      var layEvent = obj.event; //获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）
      var tr = obj.tr; //获得当前行 tr 的DOM对象
      if(layEvent === 'del'){ //删除
        layer.confirm('真的删除行么', function(index){
          dizhiSeverEvent.delete(data); //删除对应行（tr）的DOM结构，并更新缓存
          layer.close(index);
          //向服务端发送删除指令
        });
      } else if(layEvent === 'edit'){ //编辑
        //do something
        
        //同步更新缓存对应的值
        dizhiSeverEvent.edit(data.Me)
      }
    });
    render.init();
  });
