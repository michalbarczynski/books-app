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
        const ratingBgc = thisBookList.determineRatingBgc(book);
        console.log(ratingBgc);
        const ratingWidth = thisBookList.rating * 10;
        console.log(ratingWidth);
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
        const clickedBook = image.getAttribute('data-id');
        //data-id powyżej daje ten sam efekt
        //if(event.target.jakasWlasciwosc.classList.contains('.book__image')) <-- jak to wykorzystać
        if (select.arrays.favouritebooks.includes(clickedBook)) {
          image.classList.remove('favourite');
          const bookId = select.arrays.favouritebooks.indexOf(clickedBook);
          select.arrays.favouritebooks.splice(bookId, 1);
        } else {
          image.classList.add('favourite');
          select.arrays.favouritebooks.push(clickedBook);
        }
      });
    }

    determineRatingBgc(rating) {
      let background = '';
      if (rating < 6) {
        background = 'background: linear - gradient(to bottom, #fefcea 0 % , #f1da36 100 % )';
      } else if (rating > 6 && rating <= 8) {
        background = 'background: linear - gradient(to bottom, #b4df5b 0 % , #b4df5b 100 % )';
      } else if (rating > 8 && rating <= 9) {
        background = 'background: linear - gradient(to bottom, #299a0b 0%, # 299 a0b 100 % )';
      } else {
        background = 'background: linear - gradient(to bottom, #ff0084 0 % , #ff0084 100 % )';
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

        
    initData() {
      const thisBookList = this;
      console.log(thisBookList);
    }

    
    filterBooks() {
      const thisBookList = this;
      filter.addEventListener('click', function () {
        if (tagName == input && type == checkbox && name == filter) {
          console.log(value);
        }
      });
    }
*/