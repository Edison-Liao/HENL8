function navBar(strData,el) {
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
     
  ulHtml +=
        '<a  lay-tips="' +
        data[i].Title +
        '" lay-direction="2" lay-href="' +
        data[i].href +
        '" target="' +
        data[i].target +
        '">';
      if (data[i].Icon != undefined && data[i].Icon != "") {
        if (data[i].Icon.indexOf("icon-") == -1) {
          ulHtml +=
            '<i class="iconfont ' +
            data[i].Icon +
            '" data-icon="' +
            data[i].Icon +
            '"></i>';
        } else {
          ulHtml +=
            '<i class="layui-icon" data-icon="' +
            data[i].Icon +
            '">' +
            data[i].Icon +
            "</i>";
        }
      }
      ulHtml += "<cite>" + data[i].Title + "</cite>";
      ulHtml += '<span class="layui-nav-more"></span>';
      ulHtml += "</a>";
      ulHtml += '<dl class="layui-nav-child">';
      for (var j = 0; j < data[i].Children.length; j++) {
        if (data[i].Children[j].target == "_blank") {
          ulHtml +=
            '<dd ><a  lay-href="' +
            data[i].Children[j].href +
            '" target="' +
            data[i].Children[j].target +
            '">';
        } else {
          ulHtml += '<dd><a lay-href="' + data[i].Children[j].href + '">';
        }
        if (
          data[i].Children[j].Icon != undefined &&
          data[i].Children[j].Icon != ""
        ) {
          if (data[i].Children[j].Icon.indexOf("icon-") != -1) {
            ulHtml +=
              '<i class="iconfont ' +
              data[i].Children[j].Icon +
              '" data-icon="' +
              data[i].Children[j].Icon +
              '"></i>';
          } else {
            ulHtml +=
              '<i class="layui-icon" data-icon="' +
              data[i].Children[j].Icon +
              '">' +
              data[i].Children[j].Icon +
              "</i>";
          }
        }
        ulHtml += "<cite>" + data[i].Children[j].Title + "</cite></a></dd>";
      }
      ulHtml += "</dl>";
    } else {
      //一级目录
      if (true) {
        ulHtml +=
          '<a  lay-tips="' +
          data[i].Title +
          '" lay-direction="2" lay-href="' +
          data[i].href +
          '" target="' +
          data[i].target +
          '">';
      } else {
        ulHtml += '<a  lay-href="' + data[i].href + '">';
      }
      if (data[i].Icon != undefined && data[i].Icon != "") {
        if (data[i].Icon.indexOf("icon-") != -1) {
          ulHtml +=
            '<i class="iconfont ' +
            data[i].Icon +
            '" data-icon="' +
            data[i].Icon +
            '"></i>';
        } else {
          ulHtml +=
            '<i class="layui-icon"  data-icon="' +
            data[i].Icon +
            '">' +
            data[i].Icon +
            "</i>";
        }
      }
      ulHtml += "<cite>" + data[i].Title + "</cite></a>";
    }
    ulHtml += "</li>";
  }
  ulHtml += "</ul>";
  return ulHtml;
 
}
