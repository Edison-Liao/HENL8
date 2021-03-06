/*
 * @Author: hongChuan Zhang 
 * @Date: 2018-10-12 09:10:12 
 * @Last Modified by: hongChuan Zhang
 * @Last Modified time: 2018-10-31 16:38:29
 */

layui.define(function(exports) {
  var $ = layui.$,
    upload = layui.upload;
  var uploadInst = upload.render({
    elem: "#test-upload-normal",
    url: "/upload/",
    before: function(obj) {
      //预读本地文件示例，不支持ie8
      obj.preview(function(index, file, result) {
        $("#test-upload-normal-img").attr("src", result); //图片链接（base64）
      });
    },
    done: function(res) {
      //如果上传失败
      if (res.code > 0) {
        return layer.msg("上传失败");
      }
      //上传成功
    },
    error: function() {
      //演示失败状态，并实现重传
      var demoText = $("#test-upload-demoText");
      demoText.html(
        '<span style="color: #FF5722;">上传失败</span> <a class="layui-btn layui-btn-mini demo-reload">重试</a>'
      );
      demoText.find(".demo-reload").on("click", function() {
        uploadInst.upload();
      });
    }
  });
  function showImgBox(index, file, result) {
    var icon =
      '<svg viewBox="64 64 896 896" class="" data-icon="close" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 0 0 203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"></path></svg>';
    var alink = `<a class="alink"   class="ant-upload-list-item-name" title=${
      file.name
    } >${file.name}</a>`;
    var el = `<div class="img_list_box"><img  layer-src="${result}" src="${result}" alt="${
      file.name
    }" class="layui-upload-img">${alink}<i class='close_btn_icon'>${icon}<i></div>`;
    return el;
  }
  //图片盒子(预览)
  $("body").on("click", ".img_list_box", function(e) {
    e.stopPropagation();

    console.log("预览");
    layer.photos({
      shade: [0.7, "#000"],
      photos: ".img_list_box",
      anim: 0
    });
  });
  //删除(图片消失)
  $("#test-upload-more-list").on("click", ".close_btn_icon", function(e) {
    e.stopPropagation();
    common
      .ajaxFun("post", "/api/....")
      .then(function(res) {
        if (common.appResult.isSucceeded(res)) {
          //$(this).parent().hide(700);
        } else {
          common.appResult.loadErrorText(res);
        }
      })
      .fail(err => {
        console.log("错处啦");
        $(this)
          .parent()
          .hide(700);
      });
    console.log("关闭");

    // console.log($(this).parent(), '父级节点')
  });
  //多图片上传
  upload.render({
    elem: "#test-upload-more",
    url: "/upload/",
    multiple: true,
    before: function(obj) {
      console.log(obj, "~~~");
      //预读本地文件示例，不支持ie8
      obj.preview(function(index, file, result) {
        $("#test-upload-more-list").append(showImgBox(index, file, result));
      });
    },
    done: function(res) {
      //上传完毕
    }
  });
  //对外暴露的接口
  exports("upload", uploadInst);
});
