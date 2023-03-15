$(document).ready(function () {
  const d = $("#con").text();
  console.log(d);
  ClassicEditor.create(document.querySelector("#ckeditor-classic"))
    .then((newEditor) => {
      editor = newEditor;
      editor.setData(d);
    })
    .catch((error) => {
      console.error(error);
    });
  $("#update").click(function () {
    const slug = $("#slug").text();
    const editorData = editor.getData();
    const data = {};
    data.name = $("#name").val();
    data.title = $("#title").val();
    data.content = editorData;

    $.ajax({
      url: `/admin/page/${slug}`,
      method: "POST",
      data: data,
      success: function (da) {
        console.log(da);
        if (da.status === 200) {
          $("#ignismyModal").modal("show");
          setTimeout(function () {
            location.reload();
          }, 1500);
        }
      },
      error: function (jqXHR, textStatus, errorThrown) {
        alert("Lỗi đăng ký");
      },
    });
  });
  $("#status").click(function () {
    const slug = $("#slug").text();
    const status = $("input[name=formRadios]:checked").val();
    const data = {};
    data.status = status;
    $.ajax({
      url: `/admin/page/${slug}`,
      method: "POST",
      data: data,
      success: function (da) {
        if (da.status === 200) {
          $("#myModal").modal("hide");
          $("#ignismyModal").modal("show");
          setTimeout(function () {
            location.reload()
          }, 1500);
        }
      },
      error: function (jqXHR, textStatus, errorThrown) {
        alert("Lỗi đăng ký");
      },
    });
  });
});
