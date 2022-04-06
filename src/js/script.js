/* global Handlebars, utils, dataSource */ // eslint-disable-line no-unused-vars

{
  'use strict';
  const booksData = dataSource.books;
  const select = {
    templateOf: {
      books: '#template-book',
    },

    arrays: {
      favouritebooks: [],
      filters: [],
    },

    containerOf: {
      booksList: '.books-list',
      booksFilter: '.filters',
    },
  };

  const templates = {
    booksList: Handlebars.compile(document.querySelector(select.templateOf.books).innerHTML),
  };

  class BooksList {
    constructor() {
      const thisBookList = this;
      thisBookList.getElements();
      thisBookList.render();
      thisBookList.initActions();
    }

    render() {
      const thisBookList = this;
      for (let book of booksData) {

        book.ratingBgc = thisBookList.determineRatingBgc(book.rating);
        console.log(book.ratingBgc);

        book.ratingWidth = book.rating * 10;
        console.log(book.ratingWidth);

        const generatedHTML = templates.booksList(book);
        const generatedDOM = utils.createDOMFromHTML(generatedHTML);
        thisBookList.booksContainer.appendChild(generatedDOM);
      }
    }

    getElements() {
      const thisBookList = this;
      thisBookList.booksContainer = document.querySelector(select.containerOf.booksList);
      thisBookList.filter = document.querySelector(select.containerOf.booksFilter);
    }
    
    initActions() {
      const thisBookList = this;
      thisBookList.booksContainer.addEventListener('dblclick', function (event) {
        event.preventDefault();
        const image = event.target.offsetParent;
        console.log(image);
        thisBookList.clickedBook = image.getAttribute('id');
        //data-id powyżej daje ten sam efekt
        //if (event.target.offsetParent.classList.contains('.book__image')) {
        if (select.arrays.favouritebooks.includes(thisBookList.clickedBook)) {
          image.classList.remove('favourite');
          const bookId = select.arrays.favouritebooks.indexOf(thisBookList.clickedBook);
          select.arrays.favouritebooks.splice(bookId, 1);
        } else {
          image.classList.add('favourite');
          select.arrays.favouritebooks.push(thisBookList.clickedBook);
        }
        //}
      });

      thisBookList.booksContainer.addEventListener('click', function (event) {
        event.preventDefault();
      });
    }

    filterBooks() {
      const thisBookList = this;
      for (let book of booksData) {
        let shouldBeHidden = false;
        const filteredBook = document.querySelector('.book__image[data-id="'+ thisBookList.clickedBook +'"]');

        for (let filter of select.arrays.filters) {
          if (!book.details[filter]) {
            console.log(!book.details[filter]);
            shouldBeHidden = true;
            break;
          }
        }
        
        if(shouldBeHidden === true) {
          filteredBook.classList.add('hidden');
        } else {
          filteredBook.classList.remove('hidden');
        }
      }
    }
      determineRatingBgc(rating) {
        let background = '';
        if (rating < 6) {
          background = 'linear-gradient(to bottom, #ff0084 0% , #ff0084 100% )';
        } else if (rating > 6 && rating <= 8) {
          background = 'linear-gradient(to bottom, #fefcea 0% , #f1da36 100% )';
        } else if (rating > 8 && rating <= 9) {
          background = 'linear-gradient(to bottom, #b4df5b 0% , #b4df5b 100% )';
        } else {
          background = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100% )';
        }
        return background;
      }
    }
    new BooksList();
  }


/*
ZMIENIĆ W ESLINT
  "rules": {
    "indent": [
      "error",
      2
    ],
*/