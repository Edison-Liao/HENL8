layui
  .config({
    base: "../../../layuiadmin/"
  })
  .extend({
    index: "lib/index" //主入口模块
  })
  .use(["index", "table", "layer", "tree", "common", "consts", "haderSerch","laydate"], function() {
    var $ = layui.$,
      form = layui.form,
      table = layui.table,
      layer = layui.layer,
      tree = layui.tree,
      laydate = layui.laydate,
      common = layui.common;
    var option = {
      baseUrl:layui.setter.revenueUrl,
    }
    var selectedType ={};
    // const obj = { a: 1, b: { c: "csc", d: "cc" }, d: "dd" };
    // console.log(...obj, "~~~~~~~~~~~");
    // const a = { ...obj };
    // console.log(a, "解构");
    laydate.render({
      elem: '#LadderDatetime'
      ,range: true //指定元素
    });
    laydate.render({
      elem: '#PriceDateTime'
      ,range: true //指定元素
    });
    laydate.render({
      elem: '#PriceSurchargeStar'
    });
    
    $("body").on("mousedown", ".layui-tree a", function() {
      if (!$(this).siblings("ul").length) {
        $(".layui-tree a cite").css("color", "#333");
        $(this)
          .find("cite")
          .css("color", "red");
      }
    });


    table.on('tool()', function(obj){ //注：tool是工具条事件名，test是table原始容器的属性 lay-filter="对应的值"
      var data = obj.data; //获得当前行数据
      var layEvent = obj.event; //获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）
      var tr = obj.tr; //获得当前行 tr 的DOM对象
      if(layEvent === 'detail'){ //查看
        
        console.info(data);
      
        common.ajaxFun("get", "/api/PriceDetail/query/key?Data.Id="+data.Me.Id+"&Method=key","",option).then(function(res) {
          if (common.appResult.isSucceeded(res)) {

            //sconsole.info(res)
            var item = res.Result.Me
            layer.open({
                type: 1,
                title: "查看价格版本详情",
                content: $('#lock-detail-from'),
                maxmin: true,
                area: ["800px", "400px"],
                btn: ["关闭"],
            });
            console.info(item)
            form.val("lock-detail-from", {
                "PriceVersion": item.PriceVersion // "name": "value"
                ,"BasePrice": item.BasePrice
                ,"IsLadder": item.IsLadder
                ,"PriceLadderType": item.PriceLadderType
                ,"PriceLadderTypeName": item.PriceLadderTypeName
                ,"LadderCycleValue": item.LadderCycleValue
                ,"LadderDatetime": item.LadderStartDatetime.substr(0,10) //item.LadderStartDatetime
                ,"IsSale": item.IsSale

                ,"LadderGas1": item.LadderGas1
                ,"LadderPrice1": item.LadderPrice1
                ,"LadderGas2": item.LadderGas2
                ,"LadderPrice2": item.LadderPrice2
                ,"LadderGas3": item.LadderGas3
                ,"LadderPrice3": item.LadderPrice3
                ,"LadderGas4": item.LadderGas4
                ,"LadderPrice4": item.LadderPrice4

                ,"BasePersonCount": item.BasePersonCount
                ,"PersonLadderAdd1": item.PersonLadderAdd1
                ,"PersonLadderAdd2": item.PersonLadderAdd2
                ,"PersonLadderAdd3": item.PersonLadderAdd3
                ,"PersonLadderAdd4": item.PersonLadderAdd4
                ,"IsSurcharge": item.IsSurcharge
                ,"priceSurcharge": item.priceSurcharge
                //,"priceSurchargeName": item.priceSurchargeName

                ,"PriceSurchargeStart": item.PriceSurchargeStart
                //,"PriceSurchargeStartName": item.PriceSurchargeStartName
                ,"PriceSurchargeValue": item.PriceSurchargeValue
                ,"PriceSurchargeDelayMonth": item.PriceSurchargeDelayMonth
                ,"PriceSurchargeDelayDay": item.PriceSurchargeDelayDay
                ,"PriceDateTime":  item.PriceStartDateTime.substr(0,10) + " - " + item.PriceEndDateTime.substr(0,10)
                ,"SortNum": item.SortNum
                ,"Description": item.Description
            })
          } else {
            common.appResult.loadErrorText(res);
          }
        })
        .fail(err => {
          console.log(err);
        });
      
      } 
    });
    //organ
    var organ = {
      init: function() {
        this.server.getTreeData();
        this.render.showtips();
        this.event();
      },
      baseData: {
        treeNode: {},
        id: "",
        nodeData: {},
        editFalge: false
      },
      event: function() {
        $("#refresh").click(function() {
          $("#treeOrgan").html("");
          organ.server.getTreeData();
          organ.baseData.editFalge = false;
        });
        $("#addPriceType").click(function() {
          layer.open({
            type: 1,
            title: "添加价格类型",
            content: $('#lock-from'),
            maxmin: true,
            area: ["800px", "400px"],
            btn: ["确定", "取消"],
            yes: function(index, layero) {
              var submit = $("#LAY-jiageleixing-add-submit");
              //获取提交的字段
              //监听提交
              form.on('submit(LAY-jiageleixing-add-submit)', function (data) {
                var field = data.field;
                common.ajaxFun("get", "/api/Common/GetInsertGuid","",option).then(function(res) {
                  if (common.appResult.isSucceeded(res)) {
                    field.Idd = res.Result;
                    console.info(field)
                    organ.server.addType(field);
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
        
        $("#addPriceVersion").click(function() {
          console.info("addPriceVersion")
          if(JSON.stringify(selectedType) == "{}"){
            layer.msg("未选择价格类型，请选择后再进行修改操作", { icon: 5 });
            return
          }else{
            $("#lock-detail-from").find('input[type=text],select,input[type=hidden]').each(function() {
                   $(this).val('');
            });
            layer.open({
              type: 1,
              title: "添加价格版本",
              content: $('#lock-detail-from'),
              maxmin: true,
              area: ["800px", "400px"],
              btn: ["确定", "取消"],
              yes: function(index, layero) {
                var submit = $("#LAY-jiagebanben-add-submit");
                //获取提交的字段
                //监听提交
                form.on('submit(LAY-jiagebanben-add-submit)', function (data) {
                  var field = data.field;
                  field.PriceTypeID = selectedType.Id
                  common.ajaxFun("get", "/api/Common/GetInsertGuid","",option).then(function(res) {
                    if (common.appResult.isSucceeded(res)) {
                      field.Idd = res.Result;
                      var LadderDatetime = field.LadderDatetime.split(' ');
                      var PriceDateTime = field.PriceDateTime.split(' ');
                      field.PriceStartDateTime = PriceDateTime[0];
                      field.PriceEndDateTime = PriceDateTime[2];
                      field.LadderStartDatetime = LadderDatetime[0];
                      field.LadderEndDatetime = LadderDatetime[2];
                      field.IsLadder = field.IsLadder =="on" ? true : false;
                      field.IsSale = field.IsSale =="on" ? true : false;
                      field.IsSurcharge = field.IsSurcharge =="on" ? true : false;
                      delete(field.PriceDateTime)
                      delete(field.LadderDatetime)
                      organ.server.addVer(field);
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
          
        });
        $("#edtPriceType").click(function() {
          console.info(selectedType)
          if(JSON.stringify(selectedType) == "{}"){
            layer.msg("未选择价格类型，请选择后再进行修改操作", { icon: 5 });
            return
          }else{
            layer.open({
              type: 1,
              title: "修改用气类型",
              content: $('#lock-from'),
              maxmin: true,
              area: ["800px", "400px"],
              btn: ["确定", "取消"],
              yes: function(index, layero) {
                var submit = $("#LAY-jiageleixing-add-submit");
                //获取提交的字段
                //监听提交
                form.on('submit(LAY-jiageleixing-add-submit)', function (data) {
                  var field = data.field;
                  console.info(field)
                  organ.server.edit(field);
                });
                submit.trigger("click");
              }
            });
            form.val("lock-from", {
                "Coding": selectedType.Coding // "name": "value"
                ,"Name": selectedType.Name
                ,"CompanyCoding": selectedType.CompanyCoding
                ,"Status": selectedType.Status
                ,"MonthLimitGas": selectedType.MonthLimitGas
                ,"YearLimitGas": selectedType.YearLimitGas
                ,"SortNum": selectedType.SortNum
                ,"Description": selectedType.Description
            })

          }
        });
        $("#delPriceType").click(function() {
          console.info(selectedType)
          if(JSON.stringify(selectedType) == "{}"){
            layer.msg("未选择价格类型，请选择后再进行删除操作", { icon: 5 });
            return
          }else{
            layer.confirm('真的删除行么', function(){
              console.info(selectedType)
              organ.server.delete(selectedType.Id); 
            });
          }
        });
      },
      server: {
        getTreeData: function() {
          var dataBean = layui.consts.basePostData();
          dataBean.Data = {};
          dataBean.Data.PageIndex  = "1";
          dataBean.Data.PageSize   = "100";
          dataBean.Method="list";
          console.log(dataBean);
          var str1 = JSON.stringify(dataBean);
          
          common.ajaxFun("get", "/api/PriceType/query/list/?Data.PageIndex="+dataBean.Data.PageIndex+"&Data.PageSize="+dataBean.Data.PageSize+"&Method=list","",option).then(function(res) {
            if (common.appResult.isSucceeded(res)) {
              console.log(res.Result);
              var nodeData = res.Result.DataSource;
              function currData(data) {
                if (data.length > 0) {
                  for (var i = 0; i < data.length; i++) {
                    data[i].name = data[i].Name;
                  }
                }
                return data;
              }
              var nodeData1 = currData(nodeData);
              organ.render.renderTree(nodeData1);
            } else {
              common.appResult.loadErrorText(res);
            }
          })
          .fail(err => {
            console.log(err);
          });
          
        },
        addType: function(data, url, flage) {
          var dataBean = layui.consts.basePostData();

          dataBean.Data = data;
          dataBean.Data.CompanyCoding = "88888888";
          dataBean.Data.CompanyName = "88888888";
          dataBean.Method="insert";
          //console.log(data);
          var str1 = JSON.stringify(dataBean);
          layer.load();
          common.ajaxFun("post", "/api/PriceType/insert", str1,option).then(function(res) {
            if (common.appResult.isSucceeded(res)) {
              $("#lock-from").find('input[type=text],select,input[type=hidden]').each(function() {
                   $(this).val('');
              });
              $("#treeOrgan").html("");
              organ.server.getTreeData();
              layer.msg("数据添加成功!", { icon: 6 });
            } else {
              common.appResult.loadErrorText(res);
            }
          })
          .fail(err => {
            console.log(err);
          });
          layer.closeAll();
        },
        addVer: function(data, url, flage) {
          var dataBean = layui.consts.basePostData();
          dataBean.Data = data;
          dataBean.Method="insert";
          var str1 = JSON.stringify(dataBean);
          layer.load();
          common.ajaxFun("post", "/api/PriceDetail/insert", str1,option).then(function(res) {
            if (common.appResult.isSucceeded(res)) {
              $("#lock-from").find('input[type=text],select,input[type=hidden]').each(function() {
                   $(this).val('');
              });
              table.reload("LAY-jiagebanbenTable");
              layer.msg("数据添加成功!", { icon: 6 });
            } else {
              common.appResult.loadErrorText(res);
            }
          })
          .fail(err => {
            console.log(err);
          });
          layer.closeAll();
        },
        edit: function(data, url) {
          layer.load();
          var dataBean = layui.consts.basePostData();

          dataBean.Data = data;
          dataBean.Data.CompanyCoding = "88888888";
          dataBean.Data.CompanyName = "88888888";
          dataBean.Data.Id = selectedType.Id;
          dataBean.Method="update";
          console.log(data);
          var str1 = JSON.stringify(dataBean);
          common.ajaxFun("put", "/api/PriceType/update", str1,option).then(function(res) {
            if (common.appResult.isSucceeded(res)) {
              $("#lock-from").find('input[type=text],select,input[type=hidden]').each(function() {
                   $(this).val('');
              });
              $("#treeOrgan").html("");
              organ.server.getTreeData();
              layer.msg("数据修改成功!", { icon: 6 });
            } else {
              common.appResult.loadErrorText(res);
            }
          })
          .fail(err => {
            console.log(err);
          });
          layer.closeAll();
        },
        delete: function(id) {
          layer.load();
          var dataBean = layui.consts.basePostData();

          dataBean.Data = id;
          dataBean.Method="remove";
          console.log(dataBean);
          var str1 = JSON.stringify(dataBean);
          common.ajaxFun("delete", "/api/PriceType/remove", str1,option).then(function(res) {
            if (common.appResult.isSucceeded(res)) {

              $("#treeOrgan").html("");
              organ.server.getTreeData();
              layer.msg("数据删除成功!", { icon: 6 });
              form.val("PriceTypeFrom", {
                "Coding": "" // "name": "value"
                ,"Name": ""
                ,"CompanyCoding": ""
                ,"Status": ""
                ,"MonthLimitGas": ""
                ,"YearLimitGas": ""
                ,"SortNum": ""
                ,"Description": ""
              })
            } else {
              common.appResult.loadErrorText(res);
            }
          })
          .fail(err => {
            console.log(err);
          });

        }
      },
      render: {
        renderTree: function(data) {
          //树形渲染
          layui.tree({
            elem: "#treeOrgan", //指定元素
            target: "_blank", //是否新选项卡打开（比如节点返回href才有效）
            click: function(item) {
              //console.info(item)
              selectedType = item
              form.val("PriceTypeFrom", {
                "Coding": selectedType.Coding // "name": "value"
                ,"Name": selectedType.Name
                ,"CompanyCoding": selectedType.CompanyCoding
                ,"Status": selectedType.Status
                ,"MonthLimitGas": selectedType.MonthLimitGas
                ,"YearLimitGas": selectedType.YearLimitGas
                ,"SortNum": selectedType.SortNum
                ,"Description": selectedType.Description
              })
              var jiagebanbenTable = table.render({
                elem: "#LAY-jiagebanbenTable",
                id:"LAY-jiagebanbenTable",
                url: layui.setter.revenueUrl + "/api/PriceDetail/query/list", //接口
                //response:layui.setter.response,
                where:{"Data.PriceTypeId":selectedType.Id,"Method":"list"},
                parseData:layui.setter.parseData,
                request: layui.setter.request,
                page:true,
                cols: [
                  [
                    { field: "PriceVersion",  title: "价格版本" ,templet: function(d) {
                        return d.Me.PriceVersion;
                      }}, 
                    { field: "IsLadder",  title: "是否有阶梯" ,templet: function(d) {
                        return d.Me.IsLadder? "是" : "无";
                      }},
                    { field: "BasePrice",  title: "基础价格" ,templet: function(d) {
                        return d.Me.BasePrice;
                      }},
                     
                    { field: "LadderStartDatetime", title: "阶梯开始时间",templet: function(d) {
                        return "<div>" + layui.util.toDateString(d.LadderStartDatetime) + "</div>";
                      } },
                    { field: "PriceStartDateTime", title: "价格开始时间",templet: function(d) {
                        return "<div>" + layui.util.toDateString(d.Me.PriceStartDateTime) + "</div>";
                      } },
                    {title: "操作",fixed: 'right', align:'center', toolbar: '#LAY-jiagebanbenTable-barOperation'}
                  ]
                ],
                loading: true,
                limit: 10,
                text: "对不起，加载出现异常！"
              });
            },
            nodes: data
          });
        },
        renderTitle: function(flag) {
          if (flag === "roleCatalog") {
            $("#formTitle").html("编辑角色信息分组");
          } else if (flag === "roleInfo") {
            $("#formTitle").html("编辑角色信息");
          }
        },
        showtips: function() {
          common.showtips(".layui-btn-group button");
        },
        openDeleteConfirm: function(data) {
          layer.confirm(
            "你确定要删除<span style='font-weight:bolder'>" +
              data.Title +
              "</span>的节点吗?",
            {
              btn: ["确定", "取消"], //按钮
              icon: 3
            },
            function() {
              organ.server.delet(data.Flag, data.Id);
            },
            function() {
              console.log("取消");
            }
          );
        }
      },
      currData: {
        getTreeNodeName: function(treeData, id) {
          var title = common.getTreeNodeName(treeData, id, "name");
          $(".topName").val(title);
          $(".submit").html("立即修改");
        }
      }
    };
    organ.init();
  });
