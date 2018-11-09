/**

 @Name：layuiAdmin（iframe版） 设置
 @Author：贤心
 @Site：http://www.layui.com/admin/
 @License: LPPL
    
 */

layui.define(["form", "common", "jquery_md5"], function(exports) {
  var $ = layui.$,
    layer = layui.layer,
    common = layui.common;
  // 常量集
  var consts = {
    // ------------------ Kevin Bolton Editor ------------------ //
    // 显示相关
    DATA_NO: "暂无数据",
    DATA_NULL: "无",
    STATUS_ACTIVE: "启用",
    STATUS_BLOCK: "停用"
    // ------------------ Kevin Bolton END ------------------ //
  };

  var basePostData = function(method, IsEncryption) {
    var basePostData = {
      IsEncryption: IsEncryption || false,
      Method: method || "",
      Sign: $.md5(
        "Timestamp=" +
          layui.common.getTimeOffset() +
          "+Method=" +
          (method || "")
      ),
      Timestamp: layui.common.getTimeOffset()
    };
    return basePostData;
  };
  //表格数据为空 提示文本
  var tabelNoneText = "暂无数据!";
  //对外暴露的接口
  exports(
    "consts",
    $.extend(
      consts,
      { basePostData: basePostData },
      { tabelNoneText: tabelNoneText }
    )
  );
});
