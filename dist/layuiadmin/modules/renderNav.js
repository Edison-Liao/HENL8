layui.define(function(i){function a(i){var a;if("string"==typeof i)var a=JSON.parse(i);else a=i;for(var l='<ul class="layui-nav layui-nav-tree" lay-shrink="all" id="LAY-system-side-menu" lay-filter="layadmin-system-side-menu">',e=0;e<a.length;e++){if(l+=a[e].spread?'<li class="layui-nav-item" >':'<li class="layui-nav-item layui-nav-itemed" >',void 0!=a[e].Children&&a[e].Children.length>0){l+='<a  lay-tips="href=javascript:;'+a[e].Title+'" lay-direction="2" " target="'+a[e].target+'">',void 0!=a[e].Icon&&""!=a[e].Icon&&(l+=0===e?'<i class="layui-icon layui-icon-home" data-icon="'+a[e].Icon+'"></i>':'<i class="layui-icon layui-icon-set" data-icon="'+a[e].Icon+'"></i>'),l+="<cite>"+a[e].Title+"</cite>",l+='<span class="layui-nav-more"></span>',l+="</a>",l+='<dl class="layui-nav-child">';for(var n=0;n<a[e].Children.length;n++){var t=a[e].Children[n].Url.split("?");l+='<dd data-name="console" ><a lay-href="./views'+t[0]+".html?"+t[0]+'">',l+="<cite>"+a[e].Children[n].Title+"</cite></a></dd>"}l+="</dl>"}l+="</li>"}return l+="</ul>"}layui.$,layui.layer,layui.laytpl,layui.setter,layui.view,layui.admin;i("renderNav",a)});
//# sourceMappingURL=src/maps/renderNav.js.map
