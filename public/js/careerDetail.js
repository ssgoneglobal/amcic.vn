$(document).ready(function () {
  const d = $("#con").text();
  $("#updateImage").hide();
  $("#up").click(() => {
    $("#cancle").css("color", "red");
    $("#cancle").css("margin-left", "10px");
    $("#show-image").hide();
    $("#updateImage").show();
  });
  $("#cancle").click(() => {
    $("#cancle").css("color", "red");
    $("#cancle").css("margin-left", "10px");
    $("#show-image").show();
    $("#updateImage").hide();
    $("#customFile").val("");
  });
  ClassicEditor.create(document.querySelector("#ckeditor-classic"))
    .then((newEditor) => {
      editor = newEditor;
      editor.setData(d);
    })
    .catch((error) => {
      console.error(error);
    });

  $("#status").click(function () {
    const slug = $("#slug").text();
    const status = $("input[name=formRadios]:checked").val();
    const data = {};
    data.status = status;
    $.ajax({
      url: `/admin/career/${slug}`,
      method: "POST",
      data: data,
      success: function (da) {
        console.log(da);
        if (da.boolean) {
          $("#myModal").modal("hide");
          $("#ignismyModal").modal("show");
          setTimeout(function () {
            window.location.replace("/career");
          }, 1500);
        }
      },
      error: function (jqXHR, textStatus, errorThrown) {
        alert("Lỗi đăng ký");
      },
    });
  });
});
