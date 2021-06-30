document.addEventListener("DOMContentLoaded", function () {
  const submitForm = document.getElementById("inputBook");

  submitForm.addEventListener("submit", function (e) {
    e.preventDefault();
    addBook();
  });

  const submitSeacrh = document.getElementById("searchBook");

  submitSeacrh.addEventListener("submit", function (e) {
    e.preventDefault();
    searchBook();
  });

  if (isStorageExist()) {
    loadDataFromStorage();
  }
});

document.addEventListener("ondatasaved", () => {
  console.log("Data berhasil disimpan.");
});

document.addEventListener("ondataloaded", () => {
  refreshDataFromBooks();
});
