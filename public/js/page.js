$(document).ready(function () {
  $("#create1").click(function () {
    const editorData = editor.getData();
    const data = {};
    data.name = $("#name").val();
    data.title = $("#title").val();
    data.content = editorData;
    data.status = 0;
    $.ajax({
      url: "/admin/page",
      method: "POST",
      data: data,
      success: function (da) {
        console.log(da);
        if (da.status == 200) {
          $("#ignismyModal").modal("show");
          setTimeout(function () {
            // location.reload()
            window.location.replace("/admin/page");
          }, 1500);
        }
      },
      error: function (jqXHR, textStatus, errorThrown) {
        alert("Lỗi đăng ký");
        console.log(jqXHR, textStatus, errorThrown)
      },
    });
  });
  $("#create2").click(function () {
    const editorData = editor.getData();
    const data = {};
    data.name = $("#name").val();
    data.title = $("#title").val();
    data.content = editorData;
    data.status = 1;
    $.ajax({
      url: "/admin/page",
      method: "POST",
      data: data,
      success: function (da) {
        console.log(da);
        if (da.status == 200) {
          $("#ignismyModal").modal("show");
          setTimeout(function () {
            window.location.replace("/admin/page");
            // location.reload()
          }, 1500);
        }
      },
      error: function (jqXHR, textStatus, errorThrown) {
        alert("Lỗi đăng ký");
      },
    });
  });
});

$(document).ready(function () {
  $("#create1").click(function () {
    $("#s").val("0");
  });
  $("#create2").click(function () {
    $("#s").val("1");
  });
});
