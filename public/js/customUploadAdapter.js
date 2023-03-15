$(document).ready(function () {
  ClassicEditor.create(document.querySelector("#ckeditor-classic"))
    .then((newEditor) => {
      newEditor.plugins.get("FileRepository").createUploadAdapter = (loader) =>
        new CustomUploadAdapter(loader);
      editor = newEditor;
    })
    .catch((error) => {
      console.error(error);
    });
});

class CustomUploadAdapter {
  constructor(loader) {
    this.loader = loader;
  }

  async upload() {
    return this.loader.file.then(
      async (file) =>
        new Promise(async (resolve, reject) => {
          await this._sendRequest(resolve, reject, file);
        })
    );
  }

  async _sendRequest(resolve, reject, file) {
    const formData = new FormData();
    formData.append("image", file);
    const res = await fetch("/admin/ckeditor-images", {
      method: "post",
      body: formData,
    });
    const data = (await res.json()).imageUrl;
    resolve({
      default: data,
    });
    console.log("sendrequestdata", data)
  }
}
