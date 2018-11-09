layui
  .config({
    base: "../../../layuiadmin/" //静态资源所在路径
  })
  .extend({
    index: "lib/index" //主入口模块
  })
  .use(["index", "table", "layer"], function() {
    var $ = layui.$,
      form = layui.form,
      table = layui.table;
      layer = layui.layer;
    //监听搜索
    form.on("submit(IccRegist-search)", function(data) {
      var field = data.field;
      console.log(data, "数据");
      //执行重载
      table.reload("xuhaoTable", {
        where: field
      });
    });

    $("#searchBtn").click( function() {
      console.info("hello world");
      var zhangben = $("#zhangben  option:selected").text();
      var bianma = $("#bianma").val();
      var xingming = $("#xingming").val();
      console.info(zhangben);
      console.info(bianma);
      console.info(xingming);
      
    });
    //xuhao
    var xuhao = {
      init: function() {
        /*
        this.server.getTreeData();
        this.render.showtips();
        this.event();
        */
      },
      baseData: {
        treeNode: {},
        id: "",
        nodeData: {},
        editFalge: false
      },
      
      server: {
        getSearchData: function() {
          $.ajax({
            type: "get",
            url: layui.setter.baseUrl + "/api/xuhao/treeview",
            dataType: "json",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json"
            },
            success: function(data) {
              layer.closeAll("loading");
              console.log(data);
              if (data.IsSucceed) {
                console.log(data.Result.TreeNodes);
                var nodeData = data.Result.TreeNodes;
                function currData(data) {
                  if (data.length > 0) {
                    for (var i = 0; i < data.length; i++) {
                      data[i].name = data[i].Title;
                      data[i].children = data[i].Children;
                      if (data[i].Children.length > 0) {
                        currData(data[i].Children);
                      }
                    }
                  }
                  return data;
                }
                var nodeData1 = currData(nodeData);
                xuhao.render.renderTree(nodeData1);
              } else {
                layer.msg("获取数据失败" + data, { icon: 5 });
              }
            },
            error: function(err) {
              layer.closeAll();
              layer.msg("数据操作失败", { icon: 5 });
            }
          });
        },
        eidtXuhao: function(data, url) {
          var dataBean = layui.setter.basePostData;
          data.Id = organ.baseData.id;
          dataBean.Data = data;
          console.log(data);
          var str1 = JSON.stringify(dataBean);
          layer.load();
          $.ajax({
            type: "put",
            url: layui.setter.baseUrl + url + "/" + organ.baseData.id,
            data: str1,
            dataType: "json",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json"
            },
            success: function(data) {
              layer.closeAll();
              console.log(data);
              if (data.IsSucceed) {
                $("#treeOrgan").html("");
                organ.server.getTreeData();
                layer.msg("修改成功!", { icon: 6 });
              } else {
                layer.msg("增加数据失败! " + data.Errors[0].Description, {
                  icon: 5
                });
              }
            },
            error: function(err) {
              layer.closeAll();
              layer.msg("数据操作失败", { icon: 5 });
            }
          });
        },
      },
      /*
      render: {
        renderTree: function(data) {
          //树形渲染
          layui.tree({
            elem: "#treexuhao", //指定元素
            target: "_blank", //是否新选项卡打开（比如节点返回href才有效）
            click: function(item) {
              //点击节点回调
              xuhao.baseData.treeNode = item;
              xuhao.baseData.id = item.Id;
              xuhao.baseData.editFalge = true;
              console.log(xuhao.baseData.treeNode);
              xuhao.render.renderTitle(item.Flag);
              xuhao.server.getNodedata(item.Flag, item.Id);
              xuhao.render.disabledBtton(item.Flag);
              xuhao.currData.getTreeNodeName(data, item.ParentId);
            },
            nodes: data
          });
        },
        
      },
      currData: {
        getTreeNodeName: function(treeData, id) {
          var title = common.getTreeNodeName(treeData, id, "name");
          $(".topName").val(title);
          $(".submit").html("立即修改");
        }
      }
      */
    };
    xuhao.init();
    //按钮操作
    $(".layui-btn").on("click", function() {
      var type = $(this).data("type");
      active[type] ? active[type].call(this) : "";
    });

    layui.use(['laypage', 'layer'], function(){
      var laypage = layui.laypage
      ,layer = layui.layer;
      
      //总页数低于页码总数
      laypage.render({
        elem: 'pager'
        ,count: 10 //数据总数
      });
    });
  });
