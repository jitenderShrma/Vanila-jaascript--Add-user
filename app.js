// Book Class: reprenent a book
class Book {
  constructor(title, author, isbn){
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

// UI Class: display stored books
class UI {
  static displayBook(){
    const StoredBook = Store.getBooks();
    const Book = StoredBook;
    Book.forEach((book) => {
      UI.addBookList(book);
    });
  }

  static addBookList(book){
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.isbn}</td>
      <td><input type="button" class="btn btn-danger delete btn-sm" value="X"></td>
    `;
    document.querySelector('#book-list').appendChild(tr);
  }

  static clearFields(){
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
    document.querySelector('#isbn').value = '';
  }
  static removeBookLi(li){
    if(li.classList.contains('delete')){
      li.parentElement.parentElement.remove();
    }
  }
  static showAlert(className, message){
    const div = document.createElement('div');
    div.setAttribute('class', `alert alert-${className}`);
    div.appendChild(document.createTextNode(message));
    const form = document.querySelector('#add-book');
    document.querySelector('.container').insertBefore(div, form);

    // vanise in 3s
    setTimeout(function(){
      div.remove();
    }, 3000);
  }
}

  // Store Class: handle storage
  class Store {
    // get books
    static getBooks(){
      let books;
      if(localStorage.getItem('books') === null){
        books = [];
      } else {
        books = JSON.parse(localStorage.getItem('books'));
      }
      return books;
    }
    // add books
    static addBooks(book){
      const books = Store.getBooks();
      books.push(book);
      localStorage.setItem('books', JSON.stringify(books));
    }
    // remove books
    static removeBooks(isbn){
      const books = Store.getBooks();
      books.forEach((book) => {
        if(isbn === book.isbn){
          const removeIndex = books.indexOf(book);
          books.splice(removeIndex, 1);
        }
      });
      localStorage.setItem('books', JSON.stringify(books));
    }
  }

// Event: display book
document.addEventListener('DOMContentLoaded', UI.displayBook);

// Event: add book
document.querySelector('#add-book').addEventListener('submit',(e) => {
  // prevent default to form
  e.preventDefault();

  // get form field values
  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;
  const isbn = document.querySelector('#isbn').value;
  // Validation input field
  if(title === '' || author === '' || isbn === ''){
    UI.showAlert('danger', 'please fill all the fields');
  } else {
    // instentiate Book
    let book = new Book(title, author, isbn);
    // add to list
    UI.addBookList(book);
    // add to localStorage
    Store.addBooks(book);
    // alert message
    UI.showAlert('success', 'book added successfuly')
    // clear fields
    UI.clearFields();
  }
});
// Event: remove book

document.querySelector('#book-list').addEventListener('click', (e) => {

  // remove from li
  UI.removeBookLi(e.target);

  // remove from storage
  Store.removeBooks(e.target.parentElement.previousElementSibling.textContent);
  // alert message
  UI.showAlert('success', 'book removed successfuly');
});