layui
  .config({
    base: "../../../layuiadmin/"
  })
  .extend({
    index: "lib/index" //主入口模块
  })
  .use(
    ["index", "laydate", "layer", "tree", "common", "consts", "z_treeConfig"],
    function() {
      var $ = layui.$,
        form = layui.form,
        layer = layui.layer,
        tree = layui.tree,
        laydate = layui.laydate,
        common = layui.common,
        consts = layui.consts;
      laydate.render({
        elem: "#Birthdate"
        //value: "1990-08-18"
      });

      //数据表单监听(部门)
      form.on("submit(DepartmentFrom)", function(data) {
        console.log(data.field, "新增部门");
        delete data.field.topName;
        if (organ.baseData.editFalge) {
          console.log("执行编辑命令");
          organ.server.eidtOrgan(
            data.field,
            "/api/Organ/department",
            "department"
          );
        } else {
          organ.server.addOrgan(
            data.field,
            "/api/Organ/department",
            "department"
          );
          console.log("执行添加命令");
        }
        return false;
      });
      //数据表单监听(职位)
      form.on("submit(PositionFrom)", function(data) {
        console.log(data.field, "新增职位");
        delete data.field.topName;
        if (organ.baseData.editFalge) {
          console.log("执行编辑命令");
          organ.server.eidtOrgan(data.field, "/api/Organ/position", "position");
        } else {
          organ.server.addOrgan(data.field, "/api/Organ/position", "position");
          console.log("执行添加命令");
        }
        return false;
      });
      //数据表单监听(人员)
      form.on("submit(staffFrom)", function(data) {
        delete data.field.topName;
        console.log(data.field, "提交的人员信息");
        var obj = {};
        if (data.field.IsRegisterUser) {
          obj.Name = data.field.Name;
          obj.NormalizedName = data.field.Name;
          obj.Code = data.field.Code;
          obj.JobNumber = data.field.JobNumber;
          obj.Gender = data.field.Gender;
          obj.Birthdate = data.field.Birthdate;
          obj.PositionId = data.field.PositionId;
          obj.IsStaffMainPosition = data.field.IsStaffMainPosition;
          obj.IsRegisterUser = data.field.IsRegisterUser;
          obj.Description = data.field.Description;
          obj.CreateUser = {
            Password: data.field.Password,
            ConfirmPassword: data.field.ConfirmPassword,
            ProviderKey: data.field.ConfirmPassword,
            DisplayName: data.field.DisplayName,
            Email: data.field.Email,
            PhoneNumber: data.field.Email,
            Portrait: data.field.Portrait,
            Description: data.field.DescriptionIcc
          };
        } else {
          obj.Name = data.field.Name;
          obj.NormalizedName = data.field.Name;
          obj.Code = data.field.Code;
          obj.JobNumber = data.field.JobNumber;
          obj.Gender = data.field.Gender;
          obj.Birthdate = data.field.Birthdate;
          obj.PositionId = data.field.PositionId;
          obj.IsStaffMainPosition = new Boolean(
            data.field.IsStaffMainPosition
          ).toString();
          obj.IsRegisterUser = new Boolean(
            data.field.IsRegisterUser
          ).toString();
          obj.Description = data.field.Description;
          obj.CreateUser = {};
        }
        console.log(obj, "获取到的数据");
        if (organ.baseData.editFalge) {
          organ.server.eidtOrgan(obj, "/api/Organ/staff", "staff");
        } else {
          organ.server.addOrgan(obj, "/api/Organ/staff", "staff");
        }
        return false;
      });
      //数据switch监听(注册人员)
      form.on("switch(IsRegisterUser)", function(data) {
        if (data.elem.checked) {
          console.log("执行验证信息");
          $(".iccUserBox").slideDown();
          $(".iccUserBox input").attr("lay-verify", "required");
        } else {
          $(".iccUserBox").slideUp();
          $(".iccUserBox input").attr("lay-verify", "");
        }
      });
      //
      //organ
      var organ = {
        init: function() {
          this.server.getOrganTreeData();
          this.render.showtips();
          this.event();
        },
        baseData: {
          treeNode: {},
          id: "",
          nodeData: {},
          editFalge: false
        },
        event: function() {
          $("#refresh").click(function() {
            $("#treeOrgan").html("");
            organ.server.getOrganTreeData();
            $("#delet")
              .addClass("layui-btn-disabled")
              .attr("disabled", "true");
            organ.baseData.editFalge = false;
          });
          $("#showDepartment").click(function() {
            $("#formTitle").html("新增部门信息");
            $(".submit").html("立即提交");
            organ.render.showForm("#DepartmentFrom");
            organ.baseData.editFalge = false;
          });
          $("#showPosition").click(function() {
            $("#formTitle").html("新增职位信息");
            $(".submit").html("立即提交");
            organ.render.showForm("#PositionFrom");

            organ.baseData.editFalge = false;
          });
          $("#showStaff").click(function() {
            $("#formTitle").html("新增员工信息");
            $(".submit").html("立即提交");
            organ.render.showForm("#staffFrom");
            organ.baseData.editFalge = false;
          });
          $("#showStaff").click(function() {
            $("#formTitle").html("新增员工信息");
            $(".submit").html("立即提交");
            organ.render.showForm("#staffFrom");
            form.val("staffFrom", {
              topName: organ.baseData.treeNode.name
            });
            organ.baseData.editFalge = false;
          });
          $("#lower").click(function() {
            organ.server.moveNodeData(organ.baseData.treeNode, false);
            organ.baseData.editFalge = false;
          });
          $("#upper").click(function() {
            organ.server.moveNodeData(organ.baseData.treeNode, true);
            organ.baseData.editFalge = false;
          });
          $("#delet").click(function() {
            organ.render.openDeleteConfirm(organ.baseData.treeNode);
          });
        },
        server: {
          getOrganTreeData: function() {
            $.ajax({
              type: "get",
              url: layui.setter.baseUrl + "/api/Organ/treeview",
              dataType: "json",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
              },
              success: function(data) {
                layer.closeAll("loading");
                console.log(data);
                if (data.IsSucceed) {
                  console.log(data.Result.TreeNodes);
                  var nodeData = data.Result.TreeNodes;

                  var nodeData1 = organ.currData.addIcon(nodeData);
                  organ.render.renderTree(nodeData1);
                } else {
                  layer.msg("获取数据失败" + data, { icon: 5 });
                }
              },
              error: function(err) {
                layer.closeAll();
                layer.msg("数据操作失败", { icon: 5 });
              }
            });
          },
          getNodedata: function(flage, id) {
            var urlID = "";
            if (flage === "department") {
              urlID = "/api/Organ/department/" + id;
              organ.render.showForm("#DepartmentFrom");
            } else if (flage === "position") {
              urlID = "/api/Organ/position/" + id;
              organ.render.showForm("#PositionFrom");
            } else if (flage === "staff") {
              urlID = "/api/Organ/staff/" + id;
              organ.render.showForm("#staffFrom");
            } else {
              organ.render.showForm("#organFrom");
              return;
            }
            layer.load(2);
            $.ajax({
              type: "get",
              url: layui.setter.baseUrl + urlID,
              dataType: "json",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
              },
              success: function(data) {
                layer.closeAll();
                console.log(data);
                if (data.IsSucceed) {
                  organ.baseData.nodeData = data.Result;
                  var dataNode = data.Result;
                  if (flage === "department") {
                    form.val("DepartmentFrom", {
                      Name: dataNode.Name,
                      NormalizedName: dataNode.NormalizedName,
                      Code: dataNode.Code,
                      IsMainBody: dataNode.IsMainBody,
                      Description: data.Description
                    });
                  } else if (flage === "position") {
                    form.val("PositionFrom", {
                      Name: dataNode.Name,
                      NormalizedName: dataNode.NormalizedName,
                      Code: dataNode.Code,
                      IsMainBody: dataNode.IsMainBody,
                      Description: data.Description
                    });
                  } else if (flage === "staff") {
                    var dataDate = dataNode.Birthdate;
                    if (dataNode.Birthdate.indexOf("T") > -1) {
                      dataDate = dataNode.Birthdate.substring(
                        0,
                        dataNode.Birthdate.indexOf("T")
                      );
                    }
                    form.val("staffFrom", {
                      Name: dataNode.Name,
                      NormalizedName: dataNode.NormalizedName,
                      JobNumber: dataNode.JobNumber,
                      Birthdate: dataDate,
                      Code: dataNode.Code,
                      IsMainBody: dataNode.IsMainBody,
                      Description: dataNode.Description
                    });
                  }
                } else {
                  layer.msg("获取节点数据失败! " + data.Errors[0].Message, {
                    icon: 5
                  });
                }
              },
              error: function(err) {
                layer.closeAll();
                layer.msg("数据操作失败", { icon: 5 });
              }
            });
          },
          addOrgan: function(data, url, flage) {
            var dataBean = layui.consts.basePostData("CreateStaff");
            if (flage === "department") {
              data.ParentId = organ.baseData.id;
            } else if (flage === "position") {
              data.DepartmentId = organ.baseData.id;
            } else if (flage === "staff") {
              data.PositionId = organ.baseData.id;
            }
            dataBean.Data = data;
            console.log(dataBean);
            var str1 = JSON.stringify(dataBean);
            layer.load();
            $.ajax({
              type: "post",
              url: layui.setter.baseUrl + url,
              data: str1,
              dataType: "json",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
              },
              success: function(data) {
                layer.closeAll();
                console.log(data);
                if (data.IsSucceed) {
                  $("#treeOrgan").html("");
                  organ.server.getOrganTreeData();
                  layer.msg("添加成功!", { icon: 6 });
                } else {
                  layer.msg("增加数据失败! " + data.Errors[0].Message, {
                    icon: 5
                  });
                }
              },
              error: function(err) {
                layer.closeAll();
                layer.msg("数据操作失败", { icon: 5 });
              }
            });
          },
          eidtOrgan: function(data, url, flage) {
            var dataBean = layui.consts.basePostData();
            data.Id = organ.baseData.id;
            dataBean.Data = data;
            var urlID = "";
            if (flage === "staff") {
              urlID = url;
            } else {
              urlID = url + "/" + organ.baseData.id;
            }
            console.log(data);
            var str1 = JSON.stringify(dataBean);
            layer.load();
            $.ajax({
              type: "put",
              url: layui.setter.baseUrl + urlID,
              data: str1,
              dataType: "json",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
              },
              success: function(data) {
                layer.closeAll();
                console.log(data);
                if (data.IsSucceed) {
                  $("#treeOrgan").html("");
                  organ.server.getOrganTreeData();
                  layer.msg("修改成功!", { icon: 6 });
                } else {
                  layer.msg("增加数据失败! " + data.Errors[0].Message, {
                    icon: 5
                  });
                }
              },
              error: function(err) {
                layer.closeAll();
                layer.msg("数据操作失败", { icon: 5 });
              }
            });
          },
          moveNodeData: function(data, isRise) {
            var urlID = "";
            if (data.Flag === "department") {
              urlID = "/api/Organ/department/" + data.Id + "/order/" + isRise;
            } else if (data.Flag === "position") {
              urlID = "/api/Organ/position/" + data.Id + "/order/" + isRise;
            } else {
              organ.render.showForm("#organFrom");
              return;
            }
            layer.load();
            $.ajax({
              type: "put",
              url: layui.setter.baseUrl + urlID,
              dataType: "json",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
              },
              success: function(data) {
                layer.closeAll("loading");
                console.log(data);
                if (data.IsSucceed) {
                  $("#treeOrgan").html("");
                  organ.server.getOrganTreeData();
                  layer.msg("数据移动成功", { icon: 1 });
                } else {
                  layer.msg("数据操作失败" + data.Errors[0].Message, {
                    icon: 5
                  });
                }
              },
              error: function(err) {
                layer.closeAll();
                layer.msg("数据操作失败", { icon: 5 });
              }
            });
          },
          delet: function(flage, id) {
            layer.load();
            var urlID = "";
            if (flage === "department") {
              urlID = "/api/Organ/department/" + id;
            } else if (flage === "position") {
              urlID = "/api/Organ/position/" + id;
            } else if (flage === "staff") {
              urlID = "/api/Organ/staff/" + id;
            } else {
              layer.closeAll();
              return;
            }
            $.ajax({
              type: "DELETE",
              url: layui.setter.baseUrl + urlID,
              dataType: "json",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
              },
              success: function(data) {
                layer.closeAll();
                console.log(data);
                if (data.IsSucceed) {
                  $("#treeOrgan").html("");
                  organ.server.getOrganTreeData();
                  layer.alert("删除成功", {
                    icon: 1
                  });
                } else {
                  layer.msg("获取节点数据失败! " + data.Errors[0].Message, {
                    icon: 5
                  });
                }
              },
              error: function(err) {
                layer.closeAll();
                layer.msg("数据操作失败", { icon: 5 });
              }
            });
          }
        },
        render: {
          renderTree: function(data) {
            //渲染树 1.数据 2.DOM节点 3.配置项目
            organ.baseData.treeObj = layui.z_treeConfig.renderTree(
              data,
              "treeOrgan",
              {
                callback: {
                  onClick: organ.currData.treeOnClick
                }
              }
            );
          },
          renderTitle: function(flag) {
            console.log(flag);
            if (flag === "organ") {
              $("#formTitle").html("公司基础信息");
            } else if (flag === "department") {
              $("#formTitle").html("编辑部门信息");
            } else if (flag === "position") {
              $("#formTitle").html("编辑职位信息");
            } else if (flag === "staff") {
              $("#formTitle").html("编辑人员信息");
            }
          },
          showForm: function(id) {
            $("#DepartmentFrom").addClass("layui-hide");
            $("#PositionFrom").addClass("layui-hide");
            $("#staffFrom").addClass("layui-hide");
            $("#organFrom").addClass("layui-hide");
            $(id).show();
            $(id).removeClass("layui-hide");
          },
          renderFormData: function(data) {
            if (data.Flag === "department") {
              form.val("DepartmentFrom", {
                Name: data.Title
              });
            }
          },
          disabledBtton: function(flage) {
            common.isDisableButton("#delet", false);
            common.isDisableButton("#lower", false);
            common.isDisableButton("#upper", false);
            if (flage === "organ") {
              common.isDisableButton("#lower", true);
              common.isDisableButton("#upper", true);
              common.isDisableButton("#showDepartment", false);
              common.isDisableButton("#showPosition", true);
              common.isDisableButton("#showStaff", true);
            } else if (flage === "department") {
              common.isDisableButton("#showPosition", false);
              common.isDisableButton("#showDepartment", false);
              common.isDisableButton("#showStaff", true);
            } else if (flage === "position") {
              common.isDisableButton("#showPosition", true);
              common.isDisableButton("#showDepartment", true);
              common.isDisableButton("#showStaff", false);
            } else if (flage === "staff") {
              common.isDisableButton("#showPosition", true);
              common.isDisableButton("#showDepartment", true);
              common.isDisableButton("#showStaff", true);
              common.isDisableButton("#lower", true);
              common.isDisableButton("#upper", true);
            }
          },
          showtips: function() {
            common.showtips(".layui-btn-group button");
          },
          openDeleteConfirm: function(data) {
            layer.confirm(
              "你确定要删除<span style='font-weight:bolder'>" +
                data.Title +
                "</span>的节点吗?",
              {
                btn: ["确定", "取消"], //按钮
                icon: 3
              },
              function() {
                console.log("确认", data);
                organ.server.delet(data.Flag, data.Id);
              },
              function() {
                console.log("取消");
              }
            );
          }
        },
        currData: {
          getTreeNodeName: function(treeData, id) {
            var title = common.getTreeNodeName(treeData, id, "name");
            $(".topName").val(title);
            $(".submit").html("立即修改");
          },
          addIcon: function(data) {
            if (data.length > 0) {
              for (var i = 0; i < data.length; i++) {
                if (data[i].Flag === "organ") {
                  data[i].icon =
                    "../../../layuiadmin/style/img/ztreeImg/company.png";
                  data[i].iconOpen =
                    "../../../layuiadmin/style/img/ztreeImg/companyOp.png";
                } else if (data[i].Flag === "department") {
                  data[i].icon =
                    "../../../layuiadmin/style/img/ztreeImg/department.png";
                  data[i].iconOpen =
                    "../../../layuiadmin/style/img/ztreeImg/departmentOp.png";
                } else if (data[i].Flag === "position") {
                  data[i].icon =
                    "../../../layuiadmin/style/img/ztreeImg/position.png";
                  data[i].iconOpen =
                    "../../../layuiadmin/style/img/ztreeImg/positionOp.png";
                } else if (data[i].Flag === "staff") {
                  delete data[i].Children;
                  data[i].icon =
                    "../../../layuiadmin/style/img/ztreeImg/staff.png";
                  data[i].iconOpen =
                    "../../../layuiadmin/style/img/ztreeImg/staffOp.png";
                }
                if (data[i].Children && data[i].Children.length > 0) {
                  organ.currData.addIcon(data[i].Children);
                }
              }
            }
            return data;
          },
          treeOnClick: function(e, id, node) {
            console.log(node);
            organ.baseData.treeNode = node;
            organ.baseData.id = node.Id;
            organ.baseData.editFalge = true;
            organ.render.renderTitle(node.Flag);
            organ.server.getNodedata(node.Flag, node.Id);
            organ.render.disabledBtton(node.Flag);
            var PidNode = organ.baseData.treeObj.getNodeByTId(node.parentTId);
            if (PidNode) {
              $("body .topName").val(PidNode.Title);
              $(".submit").html("立即修改");
            }
          }
        }
      };
      organ.init();
    }
  );
