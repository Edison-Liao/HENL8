/*
 * @Author: hongChuan Zhang
 * @Date: 2018-10-12 09:10:12
 * @Last Modified by: hongChuan Zhang
 * @Last Modified time: 2018-11-16 16:30:49
 */

layui.define(function(exports) {
  var $ = layui.$,
    layer = layui.layer,
    laytpl = layui.laytpl,
    setter = layui.setter,
    view = layui.view,
    admin = layui.admin;
  /**
   * @description
   * @author hongChuan Zhang
   * @param {arry} strData
   * @returns
   */
  function renderNavBar(strData) {
    var data;
    if (typeof strData == "string") {
      var data = JSON.parse(strData); //字符串，转换一下
    } else {
      data = strData;
    }
    var ulHtml =
      '<ul class="layui-nav layui-nav-tree" lay-shrink="all" id="LAY-system-side-menu" lay-filter="layadmin-system-side-menu">';
    for (var i = 0; i < data.length; i++) {
      if (data[i].spread) {
        ulHtml += '<li class="layui-nav-item" >';
      } else {
        ulHtml += '<li class="layui-nav-item layui-nav-itemed" >';
      }
      if (data[i].Children != undefined && data[i].Children.length > 0) {
        //一级菜单
        ulHtml +=
          '<a  lay-tips="' +
          "href=javascript:;" +
          data[i].Title +
          '" lay-direction="2" ' +
          '" target="' +
          data[i].target +
          '">';
        //图标
        if (data[i].Icon != undefined && data[i].Icon != "") {
          if (i === 0) {
            ulHtml +=
              '<i class="layui-icon layui-icon-home" data-icon="' +
              data[i].Icon +
              '">' +
              "</i>";
          } else {
            ulHtml +=
              '<i class="layui-icon layui-icon-set" data-icon="' +
              data[i].Icon +
              '">' +
              "</i>";
          }
        }
        //字
        ulHtml += "<cite>" + data[i].Title + "</cite>";
        ulHtml += '<span class="layui-nav-more"></span>';
        ulHtml += "</a>";
        //二级目录
        ulHtml += '<dl class="layui-nav-child">';
        for (var j = 0; j < data[i].Children.length; j++) {
          var htmlUrl = data[i].Children[j].Url.split("?");
          ulHtml +=
            '<dd data-name="console" ><a lay-href="./views' +
            htmlUrl[0] +
            ".html?" +
            htmlUrl[0] +
            '">';
          ulHtml += "<cite>" + data[i].Children[j].Title + "</cite></a></dd>";
        }
        ulHtml += "</dl>";
      } else {
        //child 大于1 的情况
      }
      ulHtml += "</li>";
    }
    ulHtml += "</ul>";
    return ulHtml;
  }

  //对外暴露的接口
  exports("renderNav", renderNavBar);
});
