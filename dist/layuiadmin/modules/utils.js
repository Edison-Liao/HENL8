layui.define(function(e){var t=layui.$,n=layui.layer,r={test:function(){console.log("test utilsFunction")},request:function(e,r){var o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"GET",i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"数据加载出错!";if(e.IsSucceed){var r=e.Result;console.log(e,"成功后回调"),console.log(r,"result")}else n.msg(t,{icon:5})},s=arguments.length>4&&void 0!==arguments[4]?arguments[4]:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"数据加载失败";console.log(e,"失败后回调"),n.msg(t,{icon:5})},u=arguments.length>5&&void 0!==arguments[5]?arguments[5]:{},l=(u.baseUrl||layui.setter.revenueUrl)+e,c="POST"===o.toUpperCase()||"DELETE"===o.toUpperCase()||"PUT"===o.toUpperCase()?JSON.stringify(r):r;t.ajax({type:o,url:l,data:c,dataType:u.dataType||"json",contentType:u.contentType||"application/x-www-form-urlencoded",success:i,error:s})},getMenus:function(e){arguments.length>1&&void 0!==arguments[1]?arguments[1]:[];return e.reduce(function(e,t){var n=[];return n.length>0&&(obj.children=n),e.push(obj),e},[])},getFirstMenu:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];return e.reduce(function(e,t){return"00000000-0000-0000-0000-000000000000"===t.Pid||""===t.Pid?e.concat(t):e},[])},getChildMenus:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[];return t.reduce(function(t,n){var r=[];return e===n.Pid&&(r.length>0&&(obj.children=r),t.push(obj)),t},[])},getRequest:function(e){var t=e?e:location.search,n={};if(t.indexOf("?")!=-1){var r=t.indexOf("?"),o=t.substr(r+1);strs=o.split("&");for(var i=0;i<strs.length;i++)n[strs[i].split("=")[0]]=strs[i].split("=")[1]}return n}};e("utils",r)});
//# sourceMappingURL=src/maps/utils.js.map