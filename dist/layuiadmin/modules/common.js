function _defineProperty(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}layui.define(function(e){var t=layui.$,r=layui.layer,s=(layui.laytpl,layui.setter,layui.view,layui.admin,"暂无数据"),n={getTreeNodeName:function(e,t,r){for(var i=0;i<e.length;i++){if(e[i].Id===t)return s=e[i][r];e[i].children.length>0&&n.getTreeNodeName(e[i].children,t,r)}return s},isDisableButton:function(e,r){r?t("body "+e).addClass("layui-btn-disabled").addClass("layui-btn-primary").attr("disabled","true"):t("body "+e).removeClass("layui-btn-disabled").removeAttr("disabled")},showtips:function(e){t(e).mouseenter(function(e){r.tips(t(this).data("tips"),t(this),{tips:[1,"#363636"]})}).mouseleave(function(e){r.closeAll("tips")})},getTimeOffset:function(){var e=new Date;return e.toUTCString(),Math.floor(e.getTime()/1e3)},getRequest:function(e){if(void 0==e)var t=location.search;else{var t=e,r=new Object;if(t.indexOf("?")!=-1){var s=t.indexOf("?"),n=t.substr(s+1);strs=n.split("&");for(var i=0;i<strs.length;i++)r[strs[i].split("=")[0]]=strs[i].split("=")[1]}}return r},formatRequertDate:function(e){if("string"!=typeof e&&e.length>1)return console.log("时间格式不符合规范"),"";var r=t.trim(e);return r.split("-").join("")}},i=function(e,s,n,i){var o={loading:!0,successText:"",errorText:"",headers:{Accept:"application/json","Content-Type":"application/json","X-Requested-With":"XMLHttpRequest"},baseUrl:layui.setter.baseUrl};t.extend(o,i);var a="",l=t.Deferred();if("string"!=typeof e)return r.msg("请求方法不正确!"),l.reject({statusText:"请求方法不正确!"});if("string"!=typeof s)return r.msg("缺少请求地址!"),l.reject({statusText:"缺少请求地址!"});o.loading&&(a="GET"===e.toUpperCase()?r.load(2):r.load(3));var u={_transport:function(e,s,n,i){return console.log(n),t.ajax({url:i.baseUrl+s,method:e.toUpperCase(),dataType:"json",timeout:2500,data:n,crossDomain:!0,hrFields:{withCredentials:!0},headers:i.headers,success:function(e,t,s){r.close(a),l.resolve("[]"==e?null:e,t,s)},error:function(e,t,s){r.close(a),i.errorText.length>0&&i.loading?r.msg(i.errorText+e.status,{icon:5}):i.loading&&r.msg("数据操作失败!"+e.status,{icon:5}),l.reject(e,t,s)}}),l.promise()}};return u._transport(e,s,n,o)},o={isSucceeded:function(e){return void 0!=e&&void 0!=e.IsSucceed&&e.IsSucceed},loadErrorText:function(e,s){if(t.isArray(e.Errors)&&e.Errors.length>0)r.msg(e.Errors[0].Message,{icon:5});else{var n=s?s:"数据操作失败!状态:未知";r.msg(n,{icon:5})}},result:function(e){return void 0==e||void 0==e.Succeeded?null:this.isSucceeded(e)?e.Result:null}};e("common",t.extend(n,{ajaxFun:i},_defineProperty({appResult:o},"appResult",o)))});
//# sourceMappingURL=src/maps/common.js.map
