layui.define(function(exports) {
  var $ = layui.$,
    layer = layui.layer,
    laytpl = layui.laytpl,
    setter = layui.setter,
    view = layui.view,
    admin = layui.admin;
  //公共业务的逻辑处理可以写在此处，切换任何页面都会执行
  /**
   * @description
   */
  var title = "暂无数据";
  var commonFunction = {
    //树形结构查询 '2d765b20-a14e'=>'张三'
    getTreeNodeName: function(treeData, id, name) {
      for (var i = 0; i < treeData.length; i++) {
        // if (title !== "暂无数据") {
        //   break; //跳出循环
        // }
        if (treeData[i].Id === id) {
          title = treeData[i][name];
          return title;
          break;
        } else if (treeData[i].children.length > 0) {
          commonFunction.getTreeNodeName(treeData[i].children, id, name);
        } else {
          continue;
        }
      }
      return title;
    },
    //按钮禁用与反
    isDisableButton: function(el, isDisable) {
      if (isDisable) {
        $("body " + el)
          .addClass("layui-btn-disabled")
          .addClass("layui-btn-primary")
          .attr("disabled", "true");
      } else {
        $("body " + el)
          .removeClass("layui-btn-disabled")
          .removeAttr("disabled");
      }
    },
    //吸附弹出层
    showtips: function(el) {
      $(el)
        .mouseenter(function(e) {
          layer.tips($(this).data("tips"), $(this), {
            tips: [1, "#363636"]
          });
        })
        .mouseleave(function(e) {
          layer.closeAll("tips");
        });
    },
    //获取当前时间偏移量
    getTimeOffset: function() {
      const d1 = new Date();
      d1.toUTCString();
      return Math.floor(d1.getTime() / 1000);
    },
    //获取网址url后参数信息?name='张三'&age=14=>{name:张三,age:14}
    getRequest: function(webside) {
      // 接收一个url 如果没有参数则获取本地网址
      if (webside == undefined) {
        var url = location.search; // 获取本地url中"?"符后的字串
      } else {
        var url = webside;
        var theRequest = new Object();
        if (url.indexOf("?") != -1) {
          const num = url.indexOf("?");
          const str = url.substr(num + 1);
          strs = str.split("&"); // 分割为数组
          for (let i = 0; i < strs.length; i++) {
            // 循环创建对象
            theRequest[strs[i].split("=")[0]] = strs[i].split("=")[1];
          }
        }
      }
      return theRequest;
    },
    //时间 格式化 2018-11-11=>20181111
    formatRequertDate: function(data) {
      if (typeof data !== "string" || data.length > 1) {
        console.log("时间格式不符合规范");
        return "";
      }
      var trimDate = $.trim(data);
      return trimDate.split("-").join("");
    },
    setSessionStorage: function(key, data) {
      try {
        if (typeof data === "object") {
          sessionStorage.setItem(key, JSON.stringify(data));
        } else {
          sessionStorage.setItem(key, data);
        }
      } catch (Exception) {
        console.log("超出本地存储限额！");
        layer.msg("存储数据失败!");
        return false;
      }
    }
  };

  //ajax 简单封装
  var ajaxFun = function(method, url, data, option) {
    var _option = {
      loading: true, //是否开启loading 框
      successText: "",
      errorText: "",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest", // 用于判断是否为ajax请求
        Authorization: `Bearer ${sessionStorage.getItem("access_token")}` //token
      },
      baseUrl: layui.setter.baseUrl
    };

    $.extend(_option, option);
    var load = "";
    //设置Promise
    var dtd = $.Deferred();
    if (typeof method !== "string") {
      layer.msg("请求方法不正确!");
      return dtd.reject({ statusText: "请求方法不正确!" });
    }
    if (typeof url !== "string") {
      layer.msg("缺少请求地址!");
      return dtd.reject({ statusText: "缺少请求地址!" });
    }
    if (_option.loading) {
      if (method.toUpperCase() === "GET") {
        load = layer.load(2);
      } else {
        load = layer.load(3);
      }
    }
    var ajaxReq = {
      _transport: function(method, url, data, _option) {
        console.log(data);
        $.ajax({
          url: _option.baseUrl + url,
          method: method.toUpperCase(),
          dataType: "json",
          timeout: 2500,
          data: data,
          crossDomain: true,
          hrFields: {
            withCredentials: true
          },
          headers: _option.headers,
          success: function(data, textStatus, jqXHR) {
            layer.close(load);
            dtd.resolve(data == "[]" ? null : data, textStatus, jqXHR);
          },
          error: function(jqXHR, textStatus, errorThrown) {
            layer.close(load);
            //捕获状态码子
            if (_option.errorText.length > 0 && _option.loading) {
              layer.msg(_option.errorText + jqXHR.status, { icon: 5 });
            } else if (_option.loading) {
              layer.msg("数据操作失败!" + jqXHR.status, { icon: 5 });
            }
            dtd.reject(jqXHR, textStatus, errorThrown);
            //  epd.ui.toast(epd.textError);
          }
        });
        return dtd.promise();
      }
    };
    return ajaxReq._transport(method, url, data, _option);
  };
  //ajax 返回结果判断
  var appResult = {
    //判断是否为成功状态
    isSucceeded: function(appResultJson) {
      if (appResultJson == undefined || appResultJson.IsSucceed == undefined) {
        return false;
      }

      return appResultJson.IsSucceed;
    },
    //错误文本
    loadErrorText: function(appResultJson, ErrorText) {
      if ($.isArray(appResultJson.Errors) && appResultJson.Errors.length > 0) {
        layer.msg(appResultJson.Errors[0].Message, { icon: 5 });
      } else {
        var text = ErrorText ? ErrorText : "数据操作失败!状态:未知";
        layer.msg(text, { icon: 5 });
      }
    },
    // 正确返回的数据
    result: function(appResultJson) {
      if (appResultJson == undefined || appResultJson.Succeeded == undefined)
        return null;
      if (this.isSucceeded(appResultJson)) return appResultJson.Result;
      return null;
    }
  };

  var findObjectByKeyVal = function(obj, key, val) {
    if (!obj || typeof obj === "string") {
      return null;
    }
    if (obj[key] === val) {
      return obj;
    }

    for (var i in obj) {
      if (obj.hasOwnProperty(i)) {
        var found = findObjectByKeyVal(obj[i], key, val);
        if (found) {
          return found;
        }
      }
    }
    return null;
  };
  //对外暴露的接口
  exports(
    "common",
    $.extend(
      commonFunction,
      { ajaxFun: ajaxFun },
      { appResult, appResult },
      { findObjectByKeyVal: findObjectByKeyVal }
    )
  );
});
