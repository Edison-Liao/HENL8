/*
 * @Author: hongChuan Zhang
 * @Date: 2018-10-25 16:52:39
 * @Last Modified by: hongChuan Zhang
 * @Last Modified time: 2018-11-16 09:03:00
 */

layui.define(["form", "jquery_ztree", "jquery_ztree_excheck"], function(
  exports
) {
  var $ = layui.$;
  var jquery_ztree = layui.jquery_ztree;
  var z_treeConfig = {};
  function renderTree(treeData, el, treeSeting) {
    var _treeSeting = {
      check: {
        enable: false,
        chkboxType: { Y: "s", N: "ps" },
        nocheckInherit: false
      },
      data: {
        // simpleData: {
        //   enable: true
        // },
        key: {
          children: "Children",
          name: "Title"
        }
      },
      callback: {
        onCheck: "onCheck",
        onClick: "onClick"
      }
    };
    //$.extend(_treeSeting, treeSeting);

    var op = Object.assign({}, _treeSeting, treeSeting);

    var z_tree = {
      zTreeObj: {},
      renderTree: function(treeData, el) {
        if (!Array.isArray(treeData)) {
          $("#" + el)
            .html("<span class='nullTreebox'>数据格式错误!</span>")
            .removeClass("ztree");
          return;
        }
        if (treeData && treeData.length === 0) {
          $("#" + el)
            .html("<span class='nullTreebox'>暂无数据信息</span>")
            .removeClass("ztree");
          return;
        }
        z_tree.zTreeObj = layui.jquery_ztree.init($("#" + el), op, treeData);
        var treeObj = layui.jquery_ztree.getZTreeObj(el);
        var nodes = treeObj.getNodes();
        if (nodes.length > 0) {
          //自动展开第一项
          treeObj.expandNode(nodes[0], true, false, true);
        }
      }
    };
    //执行渲染
    z_tree.renderTree(treeData, el);
    return z_tree.zTreeObj;
  }

  //对外暴露的接口
  exports("z_treeConfig", $.extend(z_treeConfig, { renderTree: renderTree }));
});
