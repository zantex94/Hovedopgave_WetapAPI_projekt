let fileUpload = document.getElementsByName("Product_file")[0];
let contenttype = document.getElementsByName("Contenttype")[0];

function file() {
  console.log('in scope');
  const file = fileUpload.files[0];

  contenttype.value = file.type;
  console.log(file);
}
fileUpload.addEventListener("change", file);
