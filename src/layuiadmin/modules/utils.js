/*
 * @Author: Kevin Bolton
 * @Date: 2018-10-22 13:51:28
 * @Last Modified by: Kevin Bolton
 * @Last Modified time: 2018-11-09 10:16:51
 */
layui.define(function(exports) {
  var $ = layui.$,
    layer = layui.layer;

  var utilsFunction = {
    test() {
      console.log("test utilsFunction");
    },
    // Request
    request(
      url,
      params,
      method = "GET",
      success = function(data, msg = "数据加载出错!") {
        if (data.IsSucceed) {
          const result = data.Result;
          console.log(data, "成功后回调");
          console.log(result, "result");
        } else {
          layer.msg(msg, {
            icon: 5
          });
        }
      },
      error = function(err, msg = "数据加载失败") {
        console.log(err, "失败后回调");
        layer.msg(msg, { icon: 5 });
      },
      opts = {}
    ) {
      var apiUrl = (opts.baseUrl || layui.setter.revenueUrl) + url;
      var passData =
        method.toUpperCase() === "POST" ||
        method.toUpperCase() === "DELETE" ||
        method.toUpperCase() === "PUT"
          ? JSON.stringify(params)
          : params;
      $.ajax({
        type: method,
        url: apiUrl,
        data: passData,
        dataType: opts.dataType || "json",
        contentType: opts.contentType || "application/x-www-form-urlencoded",
        // async: true,
        success,
        error
      });
    },
    /**
     * 无限级数菜单
     * --- START ---
     * @description 生成无限级数菜单
     * @param {Array} firstMenus 一级菜单
     * @param {Array} [data=[]]  菜单数据
     */
    getMenus(firstMenus, data = []) {
      return firstMenus.reduce((arr, current) => {
        const children = [];
        // const obj = { ...current };
        // children.push(...this.getChildMenus(current.Id, data));
        if (children.length > 0) {
          obj.children = children;
        }
        arr.push(obj);
        return arr;
      }, []);
    },
    /**
     * @description 生成一级菜单
     * @param {Array} [data=[]]  菜单数据
     */
    getFirstMenu(data = []) {
      return data.reduce((arr, current) => {
        if (
          current.Pid === "00000000-0000-0000-0000-000000000000" ||
          current.Pid === ""
        ) {
          return arr.concat(current);
        }
        return arr;
      }, []);
    },
    /**
     * @description 生成下级菜单
     * @param {Array} [data=[]]  菜单数据
     */
    getChildMenus(Id, data = []) {
      return data.reduce((arr, current) => {
        const children = [];
        if (Id === current.Pid) {
          // const obj = { ...current };
          // children.push(...this.getChildMenus(current.Id, data));
          if (children.length > 0) {
            obj.children = children;
          }
          arr.push(obj);
        }
        return arr;
      }, []);
    },
    // 网址参数提取
    getRequest(weburl) {
      // 接收一个url 如果没有参数则获取本地网址
      var url = weburl ? weburl : location.search; // 获取本地url中"?"符后的字串

      const theRequest = {};
      if (url.indexOf("?") != -1) {
        const num = url.indexOf("?");
        const str = url.substr(num + 1);
        strs = str.split("&"); // 分割为数组
        for (let i = 0; i < strs.length; i++) {
          // 循环创建对象
          theRequest[strs[i].split("=")[0]] = strs[i].split("=")[1];
        }
      }
      return theRequest;
    }
  };

  //对外暴露的接口
  exports("utils", utilsFunction);
});
