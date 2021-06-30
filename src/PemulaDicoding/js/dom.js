const UNREAD_BOOK_LIST = "incompleteBookshelfList";
const READ_BOOK_LIST = "completeBookshelfList";
const BOOK_ITEMID = "itemId";

function bookItem(textTitle, textWriter, textYear, isCompleted) {
  const itemContainer = document.createElement("article");
  itemContainer.classList.add("book_item");

  const titleBook = document.createElement("h3");
  titleBook.innerText = textTitle;

  const writer = document.createElement("p");
  writer.innerText = `Penulis: ${textWriter}`;

  const year = document.createElement("p");
  year.innerText = `Tahun: ${textYear}`;

  const actionContainer = document.createElement("div");
  actionContainer.classList.add("action");

  itemContainer.append(titleBook, writer, year, actionContainer);

  if (isCompleted) {
    actionContainer.append(createUnreadButton());
    actionContainer.append(createDeleteButton());
  } else {
    actionContainer.append(createReadButton());
    actionContainer.append(createDeleteButton());
  }
  return itemContainer;
}

function addBook() {
  const unreadBookList = document.getElementById(UNREAD_BOOK_LIST);
  const readBookList = document.getElementById(READ_BOOK_LIST);

  const textTitle = document.getElementById("inputBookTitle").value;
  const textWriter = document.getElementById("inputBookAuthor").value;
  const textYear = document.getElementById("inputBookYear").value;
  const readUnreadBook = document.getElementById("inputBookIsComplete").checked;

  const book = bookItem(textTitle, textWriter, textYear, readUnreadBook);
  const bookObject = composeBookObject(
    textTitle,
    textWriter,
    textYear,
    readUnreadBook
  );

  book[BOOK_ITEMID] = bookObject.id;

  books.push(bookObject);
  console.log(bookObject);
  if (readUnreadBook) {
    readBookList.append(book);
  } else {
    unreadBookList.append(book);
  }

  updateDataToStorage();
}

function createButton(buttonTypeClass, textButton, eventListener) {
  const button = document.createElement("button");
  button.classList.add(buttonTypeClass);
  button.setAttribute("id", "btnDeleteConfirm");
  button.innerText = textButton;
  button.addEventListener("click", function (e) {
    eventListener(e);
  });

  return button;
}

function addBookToCompleted(bookElement) {
  const bookTitle = bookElement.querySelector(".book_item > h3").innerText;
  const bookText = bookElement.querySelectorAll(".book_item > p");
  const bookWriter = bookText[0].innerText.replace("Penulis: ", "");
  const bookYear = bookText[1].innerText.replace("Tahun: ", "");

  const newBook = bookItem(bookTitle, bookWriter, bookYear, true);
  const book = findBook(bookElement[BOOK_ITEMID]);
  book.isCompleted = true;
  newBook[BOOK_ITEMID] = book.id;

  const listRead = document.getElementById(READ_BOOK_LIST);
  listRead.append(newBook);
  bookElement.remove();

  updateDataToStorage();
}

function createReadButton() {
  return createButton("green", "Selesai Dibaca", function (e) {
    addBookToCompleted(e.target.parentElement.parentElement);
  });
}

function deleteBookFromCompleted(bookElement) {
  const bookPosition = findBookIndex(bookElement[BOOK_ITEMID]);
  books.splice(bookPosition, 1);

  bookElement.remove();

  updateDataToStorage();
}

function dialogConfirmHTML(deleteButton) {
  const confirm = document.createElement("div");
  const confirm_window = document.createElement("div");
  const confirm_titlebar = document.createElement("div");
  const confirm_title = document.createElement("span");
  const confirm_Close = document.createElement("button");
  const confirm_content = document.createElement("div");
  const confirm_buttons = document.createElement("div");
  const confirm_button1 = document.createElement("button");
  const confirm_button2 = document.createElement("button");

  confirm_window.classList.add("confirm_window");
  confirm.classList.add("confirm");

  confirm_title.classList.add("confirm_title");
  confirm_Close.classList.add("confirm_close");
  confirm_titlebar.classList.add("confirm_titlebar");

  confirm_title.innerText = "Hapus Buku";
  confirm_Close.innerHTML = "&times;";

  confirm_titlebar.append(confirm_title, confirm_Close);

  confirm_content.classList.add("confirm_content");
  confirm_content.innerText = "Apakah Anda yakin ingin menghapus buku ini?";

  confirm_button1.classList.add(
    "confirm_button",
    "confirm_button--ok",
    "confirm_button--fill"
  );
  confirm_button1.innerText = "YA";
  confirm_button2.classList.add("confirm_button", "confirm_button--cancel");
  confirm_button2.innerText = "TIDAK";
  confirm_buttons.classList.add("confirm_buttons");

  confirm_buttons.append(confirm_button1, confirm_button2);

  confirm_window.append(confirm_titlebar, confirm_content, confirm_buttons);
  confirm.append(confirm_window);

  const main = document.querySelector("main");
  main.append(confirm);

  confirm.addEventListener("click", function (e) {
    let result = true;
    if (
      e.target.innerText === "YA" ||
      e.target.innerHTML === "×" ||
      e.target.innerText === "TIDAK"
    ) {
      if (e.target.innerText === "YA") {
        closeDialogConfirm(e.target);
      } else {
        closeDialogConfirm(e.target);
        result = false;
      }
    }
    console.log(result);

    if (result == true) {
      deleteBookFromCompleted(deleteButton.target.parentElement.parentElement);
    }
  });
}

function closeDialogConfirm(confirmElement) {
  const parentConfirm =
    confirmElement.parentElement.parentElement.parentElement;
  parentConfirm.remove();
}

function createDeleteButton() {
  return createButton("red", "Hapus Buku", function (e) {
    dialogConfirmHTML(e);
  });
}

function undoBookFromCompleted(bookElement) {
  const bookTitle = bookElement.querySelector(".book_item > h3").innerText;
  const bookText = bookElement.querySelectorAll(".book_item > p");
  const bookWriter = bookText[0].innerText.replace("Penulis: ", "");
  const bookYear = bookText[1].innerText.replace("Tahun: ", "");

  const newBook = bookItem(bookTitle, bookWriter, bookYear, false);

  const book = findBook(bookElement[BOOK_ITEMID]);
  book.isCompleted = false;
  newBook[BOOK_ITEMID] = book.id;

  const listUncompleted = document.getElementById(UNREAD_BOOK_LIST);

  listUncompleted.append(newBook);
  bookElement.remove();

  updateDataToStorage();
}

function createUnreadButton() {
  return createButton("green", "Belum Selesai Dibaca", function (e) {
    undoBookFromCompleted(e.target.parentElement.parentElement);
  });
}

function searchBook() {
  const searchText = document.getElementById("searchBookTitle").value;
  const booksTitle = document.querySelectorAll(".book_item > h3");

  for (title of booksTitle) {
    const itemBook = title.parentElement;
    if (!getTitle(searchText, title.innerText)) {
      itemBook.setAttribute("hidden", true);
    }

    if (searchText == "") {
      itemBook.removeAttribute("hidden");
    }
  }
}

function getTitle(subtitle, title) {
  const getSubString = title.toUpperCase().indexOf(subtitle.toUpperCase());

  if (getSubString != -1) {
    return true;
  }

  return false;
}
