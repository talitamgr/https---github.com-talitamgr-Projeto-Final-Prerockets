var cards = document.querySelector(".cardsBooks");
var divModal = document.querySelector(".no-modal");
var inputSearch = document.querySelector("#searchTitle");
var inputSelect = document.querySelector("select");
var book = localStorage.getItem("book");
var bookIndex = localStorage.getItem("index");

let data;

fetch("../data.json")
  .then((response) => {
    data = response.json();
    return data;
  })
  .then((body) => {
    data = body.data;
    if (book) {
      data.books.splice(bookIndex, 1, JSON.parse(book));
      checkBook(bookIndex);
    }
    var books = data.books;
    for (var i = 0; i < books.length; i++) {
      showElements(books[i], i);
    }
  });

function showElements(item, index) {
  var card = document.createElement("div");
  card.classList.add("card");
  var img = document.createElement("img");
  img.src = item.image;
  card.appendChild(img);
  card.onclick = () => checkBook(index);
  var p = document.createElement("p");
  var title = document.createTextNode(item.tittle);
  p.appendChild(title);
  card.appendChild(p);
  cards.appendChild(card);
}

inputSearch.addEventListener("keyup", function (e) {
  if (e.keyCode === 13) {
    searchBook();
  }
});

function searchBook() {
  cards.textContent = " ";
  var noMatch = true;
  var entrySearch = new RegExp(inputSearch.value, "i");
  if (inputSelect.value) {
    var filterToUse = inputSelect.value;
    for (var i = 0; i < data.books.length; i++) {
      var compared = entrySearch.test(data.books[i][filterToUse]);
      if (compared) {
        showElements(data.books[i], i);
        noMatch = false;
      }
    }
  } else {
    for (var i = 0; i < data.books.length; i++) {
      var compareTitle = entrySearch.test(data.books[i].tittle);
      var compareGenre = entrySearch.test(data.books[i].genre);
      var compareAuthor = entrySearch.test(data.books[i].author);
      var compareDate = entrySearch.test(data.books[i].systemEntryDate);
      if (compareTitle || compareAuthor || compareGenre || compareDate) {
        showElements(data.books[i], i);
        noMatch = false;
      }
    }
  }

  if (noMatch) {
    cards.textContent = " Título não encontrado";
  }
}
