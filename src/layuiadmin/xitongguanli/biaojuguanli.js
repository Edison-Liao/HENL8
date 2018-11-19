layui
  .config({
    base: "../../../layuiadmin/" //静态资源所在路径
  })
  .extend({
    index: "lib/index" //主入口模块
  })
  .use(["index", "table", "form","consts","common","layer","laydate","element"], function() {
    
    var $ = layui.$,
    table = layui.table,
    form = layui.form,
    laydate = layui.laydate,
    element = layui.element,
    common = layui.common;
    var laypage = layui.laypage;
    var option = {
          baseUrl:layui.setter.revenueUrl
        }
    var meterPara = {}

    //服务交互 
    var biaojuSeverEvent = {
      getMeterFireResult: function(data){
        common.ajaxFun("get", "/api/Meter/MeterFireResult?Method=meterfireresult",'',option).then(function(res) {
          if (common.appResult.isSucceeded(res)) {
            console.info("res", res)
            addType = res
            var result = {element:data,items:res.Result}
            //console.info(result)
            render.renderSelect(result)
          } else {
            common.appResult.loadErrorText(res);
          }
        })
        .fail(err => {
          console.log(err);
        });
      },
      getMeterCalculateType: function(data){
        common.ajaxFun("get", "/api/Meter/MeterCalculateType?Method=metercalculatetype",'',option).then(function(res) {
          if (common.appResult.isSucceeded(res)) {
            addType = res
            var result = {element:"CalculateType",items:res.Result}
            //console.info(result)
            render.renderSelect(result)
          } else {
            common.appResult.loadErrorText(res);
          }
        })
        .fail(err => {
          console.log(err);
        });
      },
      getGasDirection: function(data){
        common.ajaxFun("get", "/api/Meter/MeterGasDirection?Method=metergasdirection",'',option).then(function(res) {
          if (common.appResult.isSucceeded(res)) {
            addType = res
            var result = {element:"GasDirection",items:res.Result}
            //console.info(result)
            render.renderSelect(result)
          } else {
            common.appResult.loadErrorText(res);
          }
        })
        .fail(err => {
          console.log(err);
        });
      },
      getMeterStatus: function(data){
        common.ajaxFun("get", "/api/Meter/MeterStatus?Method=meterstatus",'',option).then(function(res) {
          if (common.appResult.isSucceeded(res)) {
            addType = res
            var result = {element:"MeterStatus",items:res.Result}
            //console.info(result)
            render.renderSelect(result)
          } else {
            common.appResult.loadErrorText(res);
          }
        })
        .fail(err => {
          console.log(err);
        });
      },
      getMeterPayMode: function(data){
        common.ajaxFun("get", "/api/Meter/MeterPayMode?Method=meterpaymode",'',option).then(function(res) {
          if (common.appResult.isSucceeded(res)) {
            addType = res
            var result = {element:"MeterPayMode",items:res.Result}
            //console.info(result)
            render.renderSelect(result)
          } else {
            common.appResult.loadErrorText(res);
          }
        })
        .fail(err => {
          console.log(err);
        });
      }, 
      getPriceType: function(data){
        common.ajaxFun("get", "/api/PriceType/query/all?Method=all",'',option).then(function(res) {
          if (common.appResult.isSucceeded(res)) {
            addType = res
            var result = {element:"PriceTypeId",items:res.Result}
            //console.info(result)
            render.renderObjSelect(result)
          } else {
            common.appResult.loadErrorText(res);
          }
        })
        .fail(err => {
          console.log(err);
        });
      },
      addMeter: function(data) {
        layer.closeAll();
        var dataBean = layui.consts.basePostData();
        dataBean.Data = data;
        dataBean.Method="insert";
        var str1 = JSON.stringify(dataBean);
        //console.log(str1);
        common
          .ajaxFun("post", "/api/Meter/insert", str1,option)
          .then(function(res) {
            if (common.appResult.isSucceeded(res)) {
              table.reload("LAY-meterTable");
              layer.msg("数据添加成功!", { icon: 6 });
            } else {
              common.appResult.loadErrorText(res);
            }
          })
          .fail(err => {
            console.log(err);
          });
      },
      detailMeter: function(data) {
        layer.closeAll();
        var dataBean = layui.consts.basePostData();
        dataBean.Data = data;
        dataBean.Method="insert";
        var str1 = JSON.stringify(dataBean);
        //console.log(str1);
        common
          .ajaxFun("get", "/api/Meter/query/key?Data.Id="+data.Id+"&Method=key", "",option)
          .then(function(res) {
            if (common.appResult.isSucceeded(res)) {
              var res = res.Result
              
              $("#lock-meterEditDetail-from").find('input[type=text],select,input[type=hidden],textarea').each(function() {
                  $(this).attr("disabled","disabled");
              });

              $("#LAY-edit-address-search-submit").attr("disabled","disabled");
              $("#LAY-fire-add").attr("disabled","disabled");
              $("#LAY-edit-address-search-submit").attr("class","layui-btn layui-btn-disabled");
              $("#LAY-fire-add").attr("class","layui-btn layui-btn-disabled");
              layer.open({
                type: 1,
                title: "表具详情",
                content: $('#lock-meterEdit-from'),
                maxmin: true,
                area: ["800px", "500px"],
              });
              
              meterPara.meterId = res.Me.MeterId
              console.info("res", res)
              form.val("lock-meterEditDetail-from", {
                "Address": res.Address.Address //== 1 ? res.Area_Id_VillageName +"-"+Area_Id_BuildingName+"-"+res.Address.UnitNo+"-"+res.Address.FloorNo+"-"+res.Address.RoomNo:
                ,"EditMeterStatus": res.Me.MeterStatus
                ,"EditMeterPayMode": res.Me.MeterPayMode
                ,"StepFamilyMembers": res.Me.StepFamilyMembers
                ,"EditStepFamilyMemberEndDate": res.Me.StepFamilyMemberEndDate.substr(0,10)
                ,"EditPriceTypeId": res.Me.PriceTypeId
                //,"EditMeterFactoryId": res.Me.MeterFactoryId
                //,"EditMeterTypeId": res.Me.MeterTypeId
                ,"MeterFactoryId": res.Me.MeterFactoryId
                ,"MeterTypeId": res.Me.MeterTypeId
                ,"MeterSize": res.Me.MeterSize
                ,"MeterCode": res.Me.MeterCode
                ,"BeginNum": res.Me.BeginNum
                ,"EditGasDirection": res.Me.GasDirection
                ,"MeterAddress": res.Me.MeterAddress
                ,"MeterDate": res.Me.MeterDate.substr(0,10)
                ,"Pid": res.Me.Pid
                ,"EditCalculateType": res.Me.CalculateType
                ,"CalculateValue": res.Me.CalculateValue
                ,"OldNo": res.Me.OldNo
                ,"OldOtherInfo": res.Me.OldOtherInfo
                ,"SortNum": res.Me.SortNum
                ,"Description": res.Me.Description
              })
              form.render('select');
              render.renderMeterFireTable(res.Me.Id,true)
            } else {
              common.appResult.loadErrorText(res);
            }
          })
          .fail(err => {
            console.log(err);
          });
      },
      editMeter: function(data) {

        common
          .ajaxFun("get", "/api/Meter/query/key?Data.Id="+data.Id+"&Method=key", "",option)
          .then(function(res) {
            if (common.appResult.isSucceeded(res)) {
              var res = res.Result
              
              $("#lock-meterEditDetail-from").find('input[type=text],select,input[type=hidden],textarea').each(function() {
                  $(this).removeAttr("disabled");
              });
              $("#LAY-edit-address-search-submit").removeAttr("disabled");
              $("#LAY-fire-add").removeAttr("disabled");

              $("#LAY-edit-address-search-submit").attr("class","layui-btn");
              $("#LAY-fire-add").attr("class","layui-btn ");
              layer.open({
                type: 1,
                title: "修改表具信息",
                content: $('#lock-meterEdit-from'),
                maxmin: true,
                area: ["800px", "500px"],
                btn: ["确定", "取消"],
                yes: function(index, layero) {
                  var submit = $("#LAY-biaoju-Edit-submit");
                   //获取提交的字段
                  //监听提交
                  form.on('submit(LAY-biaoju-Edit-submit)', function (data) {
                    var field = data.field; //获取提交的字段
                    field.AddressId = meterPara.AddressId == undefined ? res.Me.AddressId : meterPara.AddressId
                    field.MeterStatus = field.EditMeterStatus
                    field.MeterPayMode = field.EditMeterPayMode
                    field.StepFamilyMemberEndDate = field.EditStepFamilyMemberEndDate
                    field.GasDirection = field.EditGasDirection
                    field.CalculateType = field.EditCalculateType == ""? 0 : field.EditCalculateType
                    field.PriceTypeId = field.EditPriceTypeId
                    //MeterFactoryId MeterTypeId
                    delete(field.Address)
                    delete(field.EditMeterStatus)
                    delete(field.EditMeterPayMode)
                    delete(field.EditGasDirection)
                    delete(field.EditCalculateType)
                    delete(field.EditPriceTypeId)
                    console.info(field)
                    
                    var dataBean = layui.consts.basePostData();
                    //delete(field.Meter)
                    dataBean.Data = field;
                    dataBean.Data.Id = meterPara.MeterId

                    dataBean.Method="update";
                    var str1 = JSON.stringify(dataBean);

                    console.info("update", str1)
                    common.ajaxFun("put", "/api/Meter/update", str1,option).then(function(res) {
                      if (common.appResult.isSucceeded(res)) {
                        table.reload("LAY-meterTable");
                        layer.close(index);
                        layer.msg("数据更新成功!", { icon: 6 });
                      } else {
                        common.appResult.loadErrorText(res);
                      }
                    })
                    .fail(err => {
                      console.log(err);
                    });
                    
                  });
                  // //关闭弹层
                  submit.trigger("click");
                }
              });
              
              meterPara.meterId = res.Me.MeterId
              console.info("res", res)
              form.val("lock-meterEditDetail-from", {
                "Address": res.Address.Address //== 1 ? res.Area_Id_VillageName +"-"+Area_Id_BuildingName+"-"+res.Address.UnitNo+"-"+res.Address.FloorNo+"-"+res.Address.RoomNo:
                ,"EditMeterStatus": res.Me.MeterStatus
                ,"EditMeterPayMode": res.Me.MeterPayMode
                ,"StepFamilyMembers": res.Me.StepFamilyMembers
                ,"EditStepFamilyMemberEndDate": res.Me.StepFamilyMemberEndDate.substr(0,10)
                ,"EditPriceTypeId": res.Me.PriceTypeId
                //,"EditMeterFactoryId": res.Me.MeterFactoryId
                //,"EditMeterTypeId": res.Me.MeterTypeId
                ,"MeterFactoryId": res.Me.MeterFactoryId
                ,"MeterTypeId": res.Me.MeterTypeId
                ,"MeterSize": res.Me.MeterSize
                ,"MeterCode": res.Me.MeterCode
                ,"BeginNum": res.Me.BeginNum
                ,"EditGasDirection": res.Me.GasDirection
                ,"MeterAddress": res.Me.MeterAddress
                ,"MeterDate": res.Me.MeterDate.substr(0,10)
                ,"Pid": res.Me.Pid
                ,"EditCalculateType": res.Me.CalculateType
                ,"CalculateValue": res.Me.CalculateValue
                ,"OldNo": res.Me.OldNo
                ,"OldOtherInfo": res.Me.OldOtherInfo
                ,"SortNum": res.Me.SortNum
                ,"Description": res.Me.Description
              })
              form.render('select');
              render.renderMeterFireTable(res.Me.Id)
            } else {
              common.appResult.loadErrorText(res);
            }
          })
          .fail(err => {
            console.log(err);
          });
      },
      deleteMeter: function(para) {
        layer.closeAll();
        layer.load(0, { shade: false });
        var dataBean = layui.consts.basePostData();
        console.info(para.Me)
        dataBean.Data = {Id:para.Me.Id,}
        dataBean.Method = "remove"
        var str1 = JSON.stringify(dataBean);
        console.info(str1)
        common
          .ajaxFun("delete", "/api/Meter/remove", str1,option)
          .then(function(res) {
            if (common.appResult.isSucceeded(res)) {
              table.reload("LAY-meterTable");
              layer.msg("数据删除成功!", { icon: 6 });
            } else {
              common.appResult.loadErrorText(res);
            }
          })
          .fail(err => {
            console.log(err);
          });
      },
      addMeterFire: function(data) {
        layer.closeAll();
        var dataBean = layui.consts.basePostData();
        dataBean.Data = data;
        dataBean.Method="insert";
        var str1 = JSON.stringify(dataBean);
        //console.log(str1);
        common
          .ajaxFun("post", "/api/MeterFire/insert", str1,option)
          .then(function(res) {
            if (common.appResult.isSucceeded(res)) {
              table.reload("LAY-MeterFireTable");
              $("#lock-meterFireAdd-from").find('input[type=text],select,input[type=hidden],textarea').each(function() {
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
      deleteMeterFire: function(para) {
        var dataBean = layui.consts.basePostData();
        console.info(para)
        dataBean.Data = {Id:para.Id,}
        dataBean.Method = "remove"
        var str1 = JSON.stringify(dataBean);
        console.info(str1)
        
        common
          .ajaxFun("delete", "/api/MeterFire/remove", str1,option)
          .then(function(res) {
            if (common.appResult.isSucceeded(res)) {
              table.reload("LAY-MeterFireTable");
              layer.msg("数据删除成功!", { icon: 6 });
            } else {
              common.appResult.loadErrorText(res);
            }
          })
          .fail(err => {
            console.log(err);
          });
        
      },
      editMeterFire: function(para) {
        var dataBean = layui.consts.basePostData();
        common
          .ajaxFun("get", "/api/MeterFire/query/key?Data.Id="+para.Id+"&Method=key","",option)
          .then(function(res) {
            if (common.appResult.isSucceeded(res)) {
              var res = res.Result
              layer.open({
                type: 1,
                title: "修改点火信息",
                content: $('#lock-meterFireAdd-from'),
                maxmin: true,
                area: ["800px", "500px"],
                btn: ["确定", "取消"],
                yes: function(index, layero) {
                  var submit = $("#LAY-fire-submit");
                   //获取提交的字段
                  //监听提交
                  form.on('submit(LAY-fire-submit)', function (data) {
                    var field = data.field; //获取提交的字段
                    if(field.FireResult == "全部"){
                      layer.msg("请选择点火状态", { icon: 5 });
                    }else{
                      var dataBean = layui.consts.basePostData();
                      field = {
                        "MeterId": para.MeterId,
                        "Id":para.Id,
                        "FireResult": field.NewFireResult,
                        "FireDate": field.NewFireDate,
                        "FireMembers": field.FireMembers,
                        "SortNum": field.FireSortNum,
                        "Description": field.FireDescription,
                      }
                      delete(field.NewFireDate)
                      delete(field.NewFireDate)
                      delete(field.FireSortNum)
                      delete(field.FireDescription)
                      dataBean.Data = field;
                      dataBean.Method="update";
                      var str1 = JSON.stringify(dataBean);
                      console.info("data", str1)
                      
                      common.ajaxFun("put", "/api/MeterFire/update", str1,option).then(function(res) {
                        if (common.appResult.isSucceeded(res)) {
                          table.reload("LAY-MeterFireTable");
                          $("#LAY-fire-submit").find('input[type=text],select,input[type=hidden],textarea').each(function() {
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
                      
                    }
                    
                  });
                  layer.close(index); //关闭弹层
                  submit.trigger("click");
                }
              });
              console.info(res)
              meterPara.meterId = res.Me.MeterId
              form.val("lock-meterFireAdd-from", {
                //"Meter": res.Me.MeterId
                "NewFireDate": res.Me.FireDate.substr(0,10)
                ,"FireMembers": res.Me.FireMembers
                ,"NewFireResult": res.Me.FireResult
                ,"FireSortNum": res.Me.SortNum
                ,"FireDescription": res.Me.Description
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

    var render = {
      renderObjSelect: function(data) {
        $("#Edit"+ data.element).html('');
        $("#Edit"+ data.element).append('<option selected>全部</option>');
        $("#"+data.element).html('');
        $("#"+data.element).append('<option selected>全部</option>');
        var content
        for(var i in data.items){
          //content += '<option  &nbsp; id='+data.items[i].Me.Id+' &nbsp; value='+data.items[i].Me.Name+'>'+data.items[i].Me.Name+'</option>';
          content += '<option  &nbsp; value='+data.items[i].Id+'>'+data.items[i].Name+'</option>';
        }

        $("#Edit"+ data.element).append(content);
        $("#"+data.element).append(content);
        form.render('select');       
      },
      renderSelect: function(data) { 
        $("#Edit"+ data.element).html('');
        $("#Edit"+ data.element).append('<option selected>全部</option>');
        $("#"+data.element).html('');
        $("#"+data.element).append('<option selected>全部</option>');
        var content
        for(var i in data.items){
          content += '<option  &nbsp; value='+data.items[i].Value+'>'+data.items[i].Text+'</option>';
        }

        $("#Edit"+ data.element).append(content);
        $("#"+data.element).append(content);
        form.render('select');
      },
      renderAddTable: function(){
        table.render({
            elem: "#LAY-MeterAddressTable",
            id:"LAY-MeterAddressTable",
            url: layui.setter.revenueUrl + "/api/Address/query/list", //接口
            where:{"Method":"list"},
            parseData:layui.setter.parseData,
            request: layui.setter.request,
            page:true,
            cols: [
              [ 
                {type: 'radio', fixed: 'left'},
                { field: "Area_Id_VillageName",  title: "小区" , width:120,templet: function(d) {
                    return d.Area_Id_VillageName
                  }},
                { field: "Area_Id_BuildingName",  title: "楼栋" ,width:120,templet: function(d) {
                    return d.Area_Id_BuildingName;
                  }}, 
                { field: "Address", title: "地址",width:120,templet: function(d) {
                    return d.Me.Address;
                  } },
                { field: "UnitNo", title: "单元",width:60,templet: function(d) {
                    return d.Me.UnitNo;
                  } },
                { field: "FloorNo", title: "楼层",width:60,templet: function(d) {
                    return d.Me.FloorNo;
                  } },
                { field: "RoomNo", title: "房号",width:60,templet: function(d) {
                    return d.Me.RoomNo;
                  } },
                { field: "AddressStatusName",  title: "状态" ,width:80,templet: function(d) {
                    return d.AddressStatusName;
                  }},  
                { field: "AddressTypeName",  title: "类型" ,width:80,templet: function(d) {
                    return d.AddressTypeName
                  }},
              ]
            ],
            loading: true,
            limit: 10,
            text: "对不起，加载出现异常！"
          });
      },
      renderMeterTable: function(){
        table.render({
            elem: "#LAY-meterTable",
            id:"LAY-meterTable",
            url: layui.setter.revenueUrl + "/api/Meter/query/list", //接口
            where:{"Method":"list"},
            parseData:layui.setter.parseData,
            request: layui.setter.request,
            page:true,
            cols: [
              [ 
                { field: "MeterCode", title: "表编号",templet: function(d) {
                    return d.Me.MeterCode;
                  } },
                { field: "MeterFactoryName", title: "表厂家",templet: function(d) {
                  return d.MeterFactoryName;
                } },
                { field: "MeterTypeName", title: "表类型",templet: function(d) {
                  return d.MeterTypeName;
                } },
                { field: "MeterSizeName", title: "表规格",templet: function(d) {
                  return d.MeterSizeName;
                } },
                { field: "Address", title: "地址",templet: function(d) {
                    return d.Address.Address;
                  } },
                { field: "UnitNo",  title: "单元号" ,templet: function(d) {
                    return d.Address.UnitNo
                  }},
                { field: "FloorNo",  title: "楼层" ,templet: function(d) {
                    return d.Address.FloorNo;
                  }}, 
                { field: "RoomNo",  title: "房号" ,templet: function(d) {
                    return d.Address.RoomNo;
                  }}, 
                { field: "Area_Id_BuildingName",  title: "楼栋" ,templet: function(d) {
                    return d.Area_Id_BuildingName;
                  }},  
                { field: "Area_Id_VillageName",  title: "小区" ,templet: function(d) {
                    return d.Area_Id_VillageName
                  }},
                {title: "操作",fixed: 'right', align:'center', width:200,toolbar: '#LAY-meterTable-barOperation'}
              ]
            ],
            loading: true,
            limit: 10,
            text: "对不起，加载出现异常！"
          });
      },
      renderMeterFireTable: function(data,flag){
        if(flag){

          console.info("flag",flag)
          table.render({
            elem: "#LAY-MeterFireTable",
            id:"LAY-MeterFireTable",// meterid 
            url: layui.setter.revenueUrl + "/api/MeterFire/query/list?&Data.MeterId="+data+"&Method=list", //接口
            where:{"Method":"list"},
            parseData:layui.setter.parseData,
            request: layui.setter.request,
            page:true,
            cols: [
              [ 
                { field: "FireResult", title: "点火状态",templet: function(d) {
                  return d.FireResultName;
                } },
                { field: "FireDate", title: "点火时间",templet: function(d) {
                  return d.Me.FireDate;
                } },
                { field: "FireMembers", title: "点火人",templet: function(d) {
                  return d.Me.FireMembers;
                } },
                { field: "SortNum", title: "排序号",templet: function(d) {
                    return d.Me.SortNum;
                  } },
                { field: "Description",  title: "备注" ,templet: function(d) {
                    return d.Me.Description
                  }},
              ]
            ],
            loading: true,
            limit: 10,
            text: "对不起，加载出现异常！"
          });
        }else{
          table.render({
            elem: "#LAY-MeterFireTable",
            id:"LAY-MeterFireTable",// meterid 
            url: layui.setter.revenueUrl + "/api/MeterFire/query/list?&Data.MeterId="+data+"&Method=list", //接口
            where:{"Method":"list"},
            parseData:layui.setter.parseData,
            request: layui.setter.request,
            page:true,
            cols: [
              [ 
                { field: "FireResult", title: "点火状态",templet: function(d) {
                  return d.FireResultName;
                } },
                { field: "FireDate", title: "点火时间",templet: function(d) {
                  return d.Me.FireDate;
                } },
                { field: "FireMembers", title: "点火人",templet: function(d) {
                  return d.Me.FireMembers;
                } },
                { field: "SortNum", title: "排序号",templet: function(d) {
                    return d.Me.SortNum;
                  } },
                { field: "Description",  title: "备注" ,templet: function(d) {
                    return d.Me.Description
                  }},
                {title: "操作",fixed: 'right', align:'center', width:200,toolbar: '#LAY-fireTable-barOperation'}
              ]
            ],
            loading: true,
            limit: 10,
            text: "对不起，加载出现异常！"
          });
        }
        
      },
      renderMeterDate: function(){
        laydate.render({
          elem: '#MeterDate'
        });
      },
      renderFireDate: function(){
        laydate.render({
          elem: '#FireDate'
        });
      },
      renderNewFireDate: function(){
        laydate.render({
          elem: '#NewFireDate'
        });
      },
      renderStepFamilyMemberEndDate: function(){
        laydate.render({
          elem: '#StepFamilyMemberEndDate'
        });
        laydate.render({
          elem: '#EditStepFamilyMemberEndDate'
        });
      },
      init: function() {
        biaojuSeverEvent.getMeterStatus()
        biaojuSeverEvent.getMeterPayMode()
        biaojuSeverEvent.getGasDirection()
        biaojuSeverEvent.getMeterCalculateType()
        biaojuSeverEvent.getPriceType()
        biaojuSeverEvent.getMeterFireResult('NewFireResult')
        biaojuSeverEvent.getMeterFireResult('FireResult')
        render.renderAddTable()
        render.renderMeterTable()
        render.renderMeterDate()
        render.renderFireDate()
        render.renderNewFireDate()
        render.renderStepFamilyMemberEndDate()
      },
    }

    element.on('tab(meterAdd-tab)', function(){
      console.info(this.getAttribute('lay-id'))
    });

    $(".layui-btn.layuiadmin-btn-meterAdd").on("click", function() {
      //var type = $(this).data("type");
      //active[type] ? active[type].call(this) : "";
      $("#lock-meterAddDetail-from").find('input[type=text],select,input[type=hidden],textarea').each(function() {
        $(this).val('');
        $(this).removeAttr("disabled");
        $(this).removeClass("layui-disabled");
      });
      $("#lock-fireDetail-from").find('input[type=text],select,input[type=hidden],textarea').each(function() {
        $(this).val('');
        $(this).removeAttr("disabled");
        $(this).removeClass("layui-disabled");
      });
      $("#LAY-address-search-submit").removeAttr("disabled");
      form.render('select');
      layer.open({
          type: 1,
          title: "添加表具",
          content: $('#lock-meterAdd-from'),
          maxmin: true,
          area: ["800px", "500px"],
          btn: ["确定", "取消"],
          yes: function(index, layero) {
            var submit = $("#LAY-biaoju-submit")

            form.on('submit(LAY-biaoju-submit)', function (data) {
              var field = data.field;
              if(field.Address == ""){
                layer.msg("请查询并选择表具所在地址", { icon: 5 });
              }else{
                common.ajaxFun("get", "/api/Common/GetInsertGuid","",option).then(function(meter_res) {
                  if (common.appResult.isSucceeded(meter_res)) {
                    field.Idd = meter_res.Result;
                    if(field.FireResult){
                      common.ajaxFun("get", "/api/Common/GetInsertGuid","",option).then(function(fire_res) {
                        if (common.appResult.isSucceeded(fire_res)) {
                          field.AddressId = meterPara.AddressId

                          field.SortNum = field.SortNum == ""? 0 : field.SortNum
                          //CalculateType 默认应该为空
                          field.MeterFireInfo = [{
                            "MeterId": field.Idd,
                            "Idd":fire_res.Result,
                            "FireResult": field.FireResult,
                            "FireDate": field.FireDate,
                            "FireMembers": field.FireMembers,
                            "SortNum": field.FireSortNum,
                            "Description": field.FireDescription,
                          }]
                          delete(field.Address)
                          delete(field.FireDate)
                          delete(field.FireMembers)
                          delete(field.FireResult)
                          delete(field.FireSortNum)
                          delete(field.FireDescription)
                          field.CalculateType = (field.CalculateType == "全部" || field.CalculateType == "") ? "0" :field.CalculateType
                          console.info(field)
                          biaojuSeverEvent.addMeter(field);
                        } else {
                          common.appResult.loadErrorText(res);
                        }
                      })
                      .fail(err => {
                        console.log(err);
                      });
                    }else{
                      field.AddressId = meterPara.AddressId
                      field.SortNum = field.SortNum == ""? 0 : field.SortNum
                      field.MeterFireInfo = []
                      delete(field.Address)
                      field.CalculateType = (field.CalculateType == "全部" || field.CalculateType == "") ? "1" :field.CalculateType
                      console.info(field)
                      biaojuSeverEvent.addMeter(field);
                    }
                    
                    //biaojuSeverEvent.addMeter(field);
                  } else {
                    common.appResult.loadErrorText(res);
                  }
                })
                .fail(err => {
                  console.log(err);
                });
              }
              
            });
            submit.trigger("click");
          }
        });
    });
    
    $(".layui-btn.layuiadmin-btn-meterFireAdd").on("click", function() {

      layer.open({
          type: 1,
          title: "添加点火信息",
          content: $('#lock-meterFireAdd-from'),
          maxmin: true,
          area: ["800px", "500px"],
          btn: ["确定", "取消"],
          yes: function(index, layero) {
            var submit = $("#LAY-fire-submit")

            form.on('submit(LAY-fire-submit)', function (data) {
              var field = data.field;

              common.ajaxFun("get", "/api/Common/GetInsertGuid","",option).then(function(meter_res) {
                if (common.appResult.isSucceeded(meter_res)) {
                  field.Idd = meter_res.Result;
                    common.ajaxFun("get", "/api/Common/GetInsertGuid","",option).then(function(fire_res) {
                      if (common.appResult.isSucceeded(fire_res)) {
                        field.FireSortNum = field.FireSortNum == ""? 0 : field.FireSortNum
                        //CalculateType 默认应该为空
                        field.MeterFireInfo = {
                          "MeterId": meterPara.MeterId,
                          "Idd":field.Idd,
                          "FireResult": field.NewFireResult,
                          "FireDate": field.NewFireDate,
                          "FireMembers": field.FireMembers,
                          "SortNum": field.FireSortNum,
                          "Description": field.FireDescription,
                        }
                        console.info(field.MeterFireInfo)
                        biaojuSeverEvent.addMeterFire(field.MeterFireInfo);
                      } else {
                        common.appResult.loadErrorText(res);
                      }
                    })
                    .fail(err => {
                      console.log(err);
                    });
                  
                  
                  //biaojuSeverEvent.addMeter(field);
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
    });

    table.on('radio(LAY-MeterAddressTable)', function(data){
      var res = data.data
      meterPara.AddressId = res.Me.Id;
      meterPara.Address = res.Me.Address;
      console.info(meterPara)
    });
    
    $(".layui-btn.LAY-address-search-submit").on("click", function(data){
      console.info("LAY-address-search-submit")
      layer.open({
          type: 1,
          title: "查询地址",
          content: $('#lock-address-from'),
          maxmin: true,
          offset: 'auto',
          zIndex :999999999,
          area: ["1000px", "550px"],
          btn: ["确定", "取消"],
          yes: function(index, layero) {
            console.info(meterPara.Address)
            
            form.val("lock-meterAddDetail-from", {
              "Address": meterPara.Address // "name": "value"
            })
            form.val("lock-meterEditDetail-from", {
              "Address": meterPara.Address // "name": "value"
            })

            layer.close(index);
          }
      });
    });

    $(".layui-btn.LAY-edit-address-search-submit").on("click", function(data){
      console.info("LAY-address-search-submit")
      layer.open({
          type: 1,
          title: "查询地址",
          content: $('#lock-address-from'),
          maxmin: true,
          offset: 'auto',
          zIndex :999999999,
          area: ["1000px", "550px"],
          btn: ["确定", "取消"],
          yes: function(index, layero) {
            console.info(meterPara.Address)
            
            form.val("lock-meterAddDetail-from", {
              "Address": meterPara.Address // "name": "value"
            })
            form.val("lock-meterEditDetail-from", {
              "Address": meterPara.Address // "name": "value"
            })

            layer.close(index);
          }
      });
    });

    table.on('tool(LAY-meterTable)', function(obj){ //注：tool是工具条事件名，test是table原始容器的属性 lay-filter="对应的值"
      var data = obj.data; //获得当前行数据
      var layEvent = obj.event; //获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）
      var tr = obj.tr; //获得当前行 tr 的DOM对象
      if(layEvent === 'detail'){ //删除
        biaojuSeverEvent.detailMeter(data.Me)
      } else if(layEvent === 'del'){ //删除
        layer.confirm('真的删除行么', function(index){
          biaojuSeverEvent.deleteMeter(data); //删除对应行（tr）的DOM结构，并更新缓存
          layer.close(index);
          //向服务端发送删除指令
        });
      } else if(layEvent === 'edit'){ //编辑
        //do something
        console.info(data.Me)
        meterPara.MeterId = data.Me.Id
        //同步更新缓存对应的值
        biaojuSeverEvent.editMeter(data.Me)
      } 
    });

    table.on('tool(LAY-MeterFireTable)', function(obj){ //注：tool是工具条事件名，test是table原始容器的属性 lay-filter="对应的值"
      var data = obj.data; //获得当前行数据
      var layEvent = obj.event; //获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）
      var tr = obj.tr; //获得当前行 tr 的DOM对象
      if(layEvent === 'fireEdit'){ //编辑
        //do something
        console.info("editMeterFire")
        //同步更新缓存对应的值
        biaojuSeverEvent.editMeterFire(data.Me)
      } else if(layEvent === 'fireDel'){ //编辑
        //do something
        console.info("deleteMeterFire")
        //同步更新缓存对应的值
        biaojuSeverEvent.deleteMeterFire(data.Me)
      }

    });

    form.verify({
      notNull:function(value){
        console.info(value)
        console.info(value == "")
        console.info(value == null)
        console.info(value == undefined)
        //console.info(new RegExp("^\s+$").test(value))
        if(value == "" || value == null || value == undefined){
          return "地址不能为空";
        }
        
      },
      notDefault:function(value){
        if(new RegExp("^全部$").test(value) || value == "" || value == null || value == undefined){
          return "下拉框不能为默认值";
        }
      },
    })
    render.init();
  });
