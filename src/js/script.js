/* global Handlebars, utils, dataSource */ // eslint-disable-line no-unused-vars

{
  'use strict';

  const booksData = dataSource.books;

  const select = {
    templateOf: {
      books: '#template-book',
    },

    containerOf: {
      booksList: '.books-list',
      bookImage: '.book__image',
    },
  };

  const templates = {
    booksList: Handlebars.compile(document.querySelector(select.templateOf.books).innerHTML),
  };


  function render() {
    //const thisBook = this;
    for (let book of booksData) {
      /* generate HTML based on template */
      const generatedHTML = templates.booksList(book);
      /* generated DOM */
      const generatedDOM = utils.createDOMFromHTML(generatedHTML);
      /* Find container of booksList */
      const booksContainer = document.querySelector(select.containerOf.booksList);
      /* Add books to the booksList */
      booksContainer.appendChild(generatedDOM);
    }
  }

  const favouriteBooks = [];
  console.log(favouriteBooks);

  function initActions() {
    /* find all book-image elements */
    const allImages = '';
    for (image of allImages) {
      /* add event Listener for a clicked Image */
      image.addEventListener('click', function (event) {
        event.preventDefault();
        /* get book id from a clicked image */
        
        /* Check if clicked image is already in favoriteBooks array*/
        if () {
          /* If is, remove class favorite from the clicked image */

          /* Find an IndexOf idBook which need to be removed in favoriteBooks array */

          /* Remove a idBook from a favoriteBooks array */

        } else {
          /*If isn't, add class favorite to the clicked image */

          /* Get id book from the clicked image */

          /* Add id book to the favoriteBooks array */

        }
        console.log(favoriteBooks);
      });
    }
    const thisBook = this;
    console.log(thisBook);
  }
  render();
  initActions();

  /* ZMIENIĆ W ESLINT
   "rules": {
          "indent": [
              "error",
              2
          ],
  */
}
