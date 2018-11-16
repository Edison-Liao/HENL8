/**

 @Name：layuiAdmin iframe版全局配置
 @Author：贤心
 @Site：http://www.layui.com/admin/
 @License：LPPL（layui付费产品协议）
    
 */

layui.define(["laytpl", "layer", "element", "util"], function(exports) {
  exports("setter", {
    container: "LAY_app", //容器ID
    base: layui.cache.base, //记录静态资源所在路径

    views: layui.cache.base + "tpl/", //动态模板所在目录
    entry: "index", //默认视图文件名
    engine: ".html", //视图文件后缀名
    pageTabs: true, //是否开启页面选项卡功能。iframe版推荐开启
    name: "layuiAdmin",
    tableName: "layuiAdmin", //本地存储表名
    MOD_NAME: "admin", //模块事件名
    debug: true, //是否开启调试模式。如开启，接口异常时会抛出异常 URL 等信息

    //自定义请求字段
    request: {
      tokenName: false,
      pageName: "Data.PageIndex",
      limitName: "Data.PageSize"
    },
    //基础配置url
    baseUrl: "http://192.168.5.103:3850",
    //营收系统url
    revenueUrl: "http://192.168.5.242:60011",
    //慧付宝测试url
    huibleUrl: "https://huizhongcloud.com/blemanager-dev",
    //授权地址
    authorityUrl: "http://192.168.5.103:3851/",
    //重新规划
    readmeterplanUrl:"http://192.168.5.32:3818/",
    //自定义响应字段
    response: {
      statusName: "IsSucceed", //数据状态的字段名称
      statusCode: true,
      msgName: "Message", //状态信息的字段名称
      dataName: "Result.DataSource", //数据详情的字段名称
      countName: "Result.TotalNumber" //规定数据总数的字段名称，默认：count
    },
    //自定义返回字段
    parseData: function(res) {
      console.log("自定义返回字段", res);
      //res 即为原始返回的数据
      return {
        code: res.IsSucceed ? 0 : 1, //解析接口状态
        msg: res.IsSucceed == true ? "" : res.Errors[0].Message, //解析提示文本
        count: res.IsSucceed ? res.Result["TotalNumber"] : 0, //解析数据长度
        data: res.IsSucceed ? res.Result["DataSource"] : [] //解析数据列表
      };
    },
    //设置
    basePostData: {
      IsEncryption: false,
      Sign: "ascascascascw",
      Timestamp: "20180112"
    },
    //扩展的第三方模块
    extend: [
      "echarts", //echarts 核心包
      "echartsTheme" //echarts 主题
    ],

    //主题配置
    theme: {
      //内置主题配色方案
      color: [
        {
          main: "#20222A", //主题色
          selected: "#009688", //选中色
          alias: "default" //默认别名
        },
        {
          main: "#03152A",
          selected: "#3B91FF",
          alias: "dark-blue" //藏蓝
        },
        {
          main: "#2E241B",
          selected: "#A48566",
          alias: "coffee" //咖啡
        },
        {
          main: "#50314F",
          selected: "#7A4D7B",
          alias: "purple-red" //紫红
        },
        {
          main: "#344058",
          logo: "#1E9FFF",
          selected: "#1E9FFF",
          alias: "ocean" //海洋
        },
        {
          main: "#3A3D49",
          logo: "#2F9688",
          selected: "#5FB878",
          alias: "green" //墨绿
        },
        {
          main: "#20222A",
          logo: "#F78400",
          selected: "#F78400",
          alias: "red" //橙色
        },
        {
          main: "#28333E",
          logo: "#AA3130",
          selected: "#AA3130",
          alias: "fashion-red" //时尚红
        },
        {
          main: "#24262F",
          logo: "#3A3D49",
          selected: "#009688",
          alias: "classic-black" //经典黑
        },
        {
          logo: "#226A62",
          header: "#2F9688",
          alias: "green-header" //墨绿头
        },
        {
          main: "#344058",
          logo: "#0085E8",
          selected: "#1E9FFF",
          header: "#1E9FFF",
          alias: "ocean-header" //海洋头
        },
        {
          header: "#393D49",
          alias: "classic-black-header" //经典黑头
        }
      ],

      //初始的颜色索引，对应上面的配色方案数组索引
      //如果本地已经有主题色记录，则以本地记录为优先，除非请求本地数据（localStorage）
      initColorIndex: 0
    }
  });
});
