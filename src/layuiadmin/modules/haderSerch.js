/*
 * @Author: hongChuan Zhang 
 * @Date: 2018-11-01 20:11:17 
 * @Last Modified by: hongChuan Zhang
 * @Last Modified time: 2018-11-08 10:17:38
 */

layui.define(function(exports) {
  var $ = layui.$,
    laydate = layui.laydate;
  /**
   * @description
   * @author hongChuan Zhang
   * @param {string} el
   * @param {object} op =>op.data 数组对象
   * @returns  html tpl
   */
  function renderHeaderserch(el, op) {
    if (el == "undefined") {
      console.log("缺少id");
      return;
    }
    //需要严格按照一下格式构造数据
    const _op = {
      // isRenderdate: { render: "请选择日期" },
      data: [{ key: "关键字" }],
      // selctData: {
      //   title: "请选择下拉值",
      //   data: [{ value: "121212", text: "选择项目一" }]
      // },
      searchbtn: "searchbtn"
    };
    const ops = Object.assign({}, _op, op);
    //普通列表
    const render = obj => {
      const tpl = `<div class="layui-inline">
                        <label class="layui-form-label">
                        ${obj[Object.keys(obj)[0]]}
                        </label>
                        <div class="layui-input-block">
                            <input type="text"
                            name=${Object.keys(obj)[0]} 
                            placeholder="请输入${obj[Object.keys(obj)[0]]}" 
                            autocomplete="off"
                            class="layui-input">
                        </div>
                    </div>`;
      return tpl;
    };
    //时间控件选择
    const renderDate = obj => {
      const tpl = `<div class="layui-inline">
                        <label class="layui-form-label">
                        ${obj[Object.keys(obj)[0]]}
                        </label>
                        <div class="layui-input-block">
                            <input type="text" 
                            name=${Object.keys(obj)[0]}
                            id='${Object.keys(obj)[0]}'
                            placeholder="请输入${obj[Object.keys(obj)[0]]}" 
                            autocomplete="off" 
                            class="layui-input">
                        </div>
                    </div>`;
      return tpl;
    };
    //下拉框选择
    const renderSelectData = selctData => {
      var op = `<div class="layui-inline">`;
      op += `<label class="layui-form-label">${selctData.title}</label>`;
      op += `<div class="layui-input-block"><select name="selected">`;
      op += "<option value='' />";
      selctData.data.map(item => {
        op += `<option value="${item.value}">${item.text}</option>`;
      });
      op += `</select></div></div>`;
      return op;
    };
    //按钮搜索
    const serchButton = filterKey => {
      const a = `<div class="layui-inline">
                    <button class="layui-btn layuiadmin-btn-useradmin" lay-submit lay-filter="${filterKey}">
                        <i class="layui-icon layui-icon-search layuiadmin-button-btn"></i>
                    </button>
                </div>`;
      return a;
    };
    const mainHTML = ops.data.map((item, index) => {
      const tpl = render(item);
      $(el).append(tpl);
    });
    if (ops.selctData) {
      const tpl = renderSelectData(ops.selctData);
      $(el).append(tpl);
      layui.form.render("select");
    }
    if (ops.isRenderdate) {
      const tpl = renderDate(ops.isRenderdate);
      $(el).append(tpl);
      const dateEl = `#${Object.keys(ops.isRenderdate)[0]}`;

      layui.laydate.render({ elem: dateEl, range: "~" });
    }

    //添加搜索按钮
    $(el).append(serchButton(ops.searchbtn));
  }

  //对外暴露的接口
  exports("haderSerch", renderHeaderserch);
});
