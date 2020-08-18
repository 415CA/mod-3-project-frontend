// // ---------------- STABLE ELEMENTS ---------------- //

// // ---------------- CONTAINERS ---------------- //

const dashboard = document.querySelector('#dashboard');
const clearDashboard = () => {
  dashboard.innerHTML = '';
};

// ---------------- Read API URL
const BASE_URL = 'http://localhost:3000';
const BOOK_PATH = '/books';
const USER_PATH = '/users';
const ANNOTATION_PATH = '/annotations';

// ---------------- 3rd Party API URL
const GOOGLE_BOOKS_API = `https://www.googleapis.com/books/v1/volumes?q=`;
const googleQuery = (userInput) => {
  return userInput.split(' ').join('+');
};

// // ---------------- FORMS ---------------- //

// // ---------------- Login
const loginForm = document.querySelector('#login-user-form');

// // ---------------- Create
// const createUserForm = document.querySelector('#create-user-form');
// const createBookForm = document.querySelector('#create-book-form');
// const createAnnotationForm = document.querySelector('#create-annotation-form');

// // ---------------- Update
// const updateProgressForm = document.querySelector('#update-progress-form');
// const progressBar = document.querySelector('progress-bar');

// // ---------------- Search
// const annotationSearchForm = document.querySelector('#annotation-search');
const googleBooksSearchForm = document.querySelector('#google-book-search');

// ---------------- FETCH GET METHODS ---------------- //

// ---------------- Users
const fetchUser = (user) => {
  // fetch(`${BASE_URL}${USER_PATH}/${user.id}`)
  fetch(`${BASE_URL}${USER_PATH}`)
    .then((response) => response.json())
    .then((user) => console.log(user));
};

// // ---------------- Books
// const fetchBooks = () => {
//   fetch(`${BASE_URL}${BOOK_PATH}`)
//     .then((response) => response.json())
//     .then((bookArray) => console.log(bookArray));
// };

// // ---------------- Annotations
// const fetchAnnotation = () => {
//   fetch(`${BASE_URL}${LIBRARY_PATH}`)
//     .then((response) => response.json())
//     .then((annotationArray) => console.log(annotationArray));
// };

// ---------------- Google Books API
const fetchGoogleBooks = (searchValue) => {
  fetch(`${GOOGLE_BOOKS_API}{${searchValue}}&maxResults=40`)
    .then((response) => response.json())
    .then((googleBooks) => {
      dashboard.innerHTML = '';
      googleBooks.items.forEach((item) => displayGoogleBook(item));
    });
};

const displayGoogleBook = (book) => {
  const bookDiv = document.createElement('div');
  bookDiv.classList.add('div-class');

  const bookTitle = document.createElement('h6');
  bookTitle.innerText = book.volumeInfo.title;
  bookTitle.classList.add('h6-class');

  const bookAuthor = document.createElement('h6');
  bookAuthor.innerText = `Author: ${book.volumeInfo.authors}`;
  bookAuthor.classList.add('h6-class');

  const bookDescription = document.createElement('h6');
  bookDescription.innerText = `Description: ${book.volumeInfo.description}`;
  bookDescription.classList.add('h6-class');

  const bookPageCount = document.createElement('h6');
  bookPageCount.innerText = `Page Count: ${book.volumeInfo.pageCount}`;
  bookPageCount.classList.add('h6-class');

  const bookCover = document.createElement('img');
  bookCover.src = book.volumeInfo.imageLinks.thumbnail;

  const infoLink = document.createElement('a');
  infoLink.href = book.volumeInfo.infoLink;
  infoLink.append(bookCover);

  const libraryButton = document.createElement('button');
  libraryButton.innerText = 'Add to Library';
  libraryButton.classList.add('btn', 'btn-secondary', 'btn-sm');

  const breakPoint = document.createElement('br');

  bookDiv.append(
    bookTitle,
    bookAuthor,
    bookPageCount,
    infoLink,
    bookDescription,
    breakPoint,
    libraryButton,
    breakPoint
  );

  // hidden field
  const hiddenForm = document.createElement('form');
  hiddenForm.type = 'hidden';

  const title = document.createElement('input');
  title.id = 'title';
  title.name = 'title';
  title.value = book.volumeInfo.title;
  title.type = 'hidden';

  const author = document.createElement('input');
  author.id = 'author';
  author.name = 'author';
  author.value = book.volumeInfo.author;
  author.type = 'hidden';

  const description = document.createElement('input');
  description.id = 'description';
  description.name = 'description';
  description.value = book.volumeInfo.description;
  description.type = 'hidden';

  const pageCount = document.createElement('input');
  pageCount.id = 'page-count';
  pageCount.name = 'page-count';
  pageCount.value = book.volumeInfo.pageCount;
  pageCount.type = 'hidden';

  const currentPage = document.createElement('input');
  currentPage.id = 'current-page';
  currentPage.name = 'current-page';
  currentPage.value = 0;
  currentPage.type = 'hidden';

  const image = document.createElement('input');
  image.id = 'current-page';
  image.name = 'current-page';
  image.value = book.volumeInfo.imageLinks.thumbnail;
  image.type = 'hidden';

  const infoLinkInput = document.createElement('input');
  infoLinkInput.id = 'current-page';
  infoLinkInput.name = 'current-page';
  infoLinkInput.value = book.volumeInfo.infoLink;
  infoLinkInput.type = 'hidden';

  const userNum = document.createElement('input');
  userNum.id = 'user';
  userNum.name = 'user';
  userNum.value = 1;
  userNum.type = 'hidden';

  hiddenForm.append(
    title,
    author,
    description,
    pageCount,
    currentPage,
    image,
    infoLinkInput,
    userNum
  );

  hiddenForm.append(bookDiv);
  dashboard.append(bookDiv);

  libraryButton.addEventListener('submit', (event) => {
    event.preventDefault();

    const attributes = {
      title: title,
      author: author,
      description: description,
      page_count: pageCount,
      current_page: currentPage,
      image: image,
      info_link: infoLinkInput,
      user_id: userNum,
    };

    postBook(attributes);
  });
};

// // ---------------- FETCH CREATE METHODS ---------------- //

// // ---------------- Create User
// const postUser = (attributes) => {
//   fetch(`${BASE_URL}${USER_PATH}`, {
//     method: 'POST',
//     headers: { 'Content-type': 'Application/json' },
//     body: JSON.stringify(attributes),
//   })
//     .then((response) => response.json())
//     .then((newUser) => console.log(newUser));
// };

// ---------------- Create Book
const postBook = (attributes) => {
  fetch(`${BASE_URL}${BOOK_PATH}`, {
    method: 'POST',
    headers: { 'Content-type': 'Application/json' },
    body: JSON.stringify(attributes),
  })
    .then((response) => response.json())
    .then((newBook) => {
      displayBook(newBook);
    });
};

const displayBook = (book) => {
  const bookDiv = document.createElement('div');
  bookDiv.classList.add('div-class');

  const bookTitle = document.createElement('h6');
  bookTitle.innerText = book.volumeInfo.title;
  bookTitle.classList.add('h6-class');

  const bookAuthor = document.createElement('h6');
  bookAuthor.innerText = `Author: ${book.volumeInfo.authors}`;
  bookAuthor.classList.add('h6-class');

  const bookDescription = document.createElement('h6');
  bookDescription.innerText = `Description: ${book.volumeInfo.description}`;
  bookDescription.classList.add('h6-class');

  const bookPageCount = document.createElement('h6');
  bookPageCount.innerText = `Page Count: ${book.volumeInfo.pageCount}`;
  bookPageCount.classList.add('h6-class');

  const bookCover = document.createElement('img');
  bookCover.src = book.volumeInfo.imageLinks.thumbnail;

  const infoLink = document.createElement('a');
  infoLink.href = book.volumeInfo.infoLink;
  infoLink.append(bookCover);

  const libraryButton = document.createElement('button');
  libraryButton.innerText = 'Add to Library';
  libraryButton.classList.add('btn', 'btn-secondary', 'btn-sm');

  const breakPoint = document.createElement('br');

  bookDiv.append(
    bookTitle,
    bookAuthor,
    bookPageCount,
    infoLink,
    bookDescription,
    breakPoint,
    libraryButton,
    breakPoint
  );

  dashboard.append(bookDiv);
};

// // ---------------- Create Annotation
// const postAnnotation = (attributes) => {
//   fetch(`${BASE_URL}${LIBRARY_PATH}`, {
//     method: 'POST',
//     headers: { 'Content-type': 'Application/json' },
//     body: JSON.stringify(attributes),
//   })
//     .then((response) => response.json())
//     .then((newAnnotation) => console.log(newAnnotation));
// };

// // ---------------- FETCH UPDATE METHODS ----------------  //

// // ---------------- Update User
// const patchUser = (attributes) => {
//   fetch(`${BASE_URL}${USER_PATH}/${user.id}`, {
//     method: 'PATCH',
//     headers: { 'Content-type': 'Application/json' },
//     body: JSON.stringify(attributes),
//   })
//     .then((response) => response.json())
//     .then((user) => console.log(user));
// };

// // ---------------- Update Book
// const patchBook = (attributes) => {
//   fetch(`${BASE_URL}${BOOK_PATH}/${book.id}`, {
//     method: 'PATCH',
//     headers: { 'Content-type': 'Application/json' },
//     body: JSON.stringify(attributes),
//   })
//     .then((response) => response.json())
//     .then((book) => console.log(book));
// };

// // ---------------- Update Annotation
// const patchAnnotation = (attributes) => {
//   fetch(`${BASE_URL}${LIBRARY_PATH}/${annotation.id}`, {
//     method: 'PATCH',
//     headers: { 'Content-type': 'Application/json' },
//     body: JSON.stringify(attributes),
//   })
//     .then((response) => response.json())
//     .then((annotation) => console.log(annotation));
// };

// // ---------------- FETCH DELETE METHODS ----------------  //

// // ---------------- Delete User
// const deleteUser = () => {
//   fetch(`${BASE_URL}${USER_PATH}${user.id}`, {
//     method: 'DELETE',
//   })
//     .then((response) => response.json())
//     .then(() => {
//       object.remove();
//     });
// };

// // ---------------- Delete Book
// const deleteBook = () => {
//   fetch(`${BASE_URL}${BOOK_PATH}${book.id}`, {
//     method: 'DELETE',
//   })
//     .then((response) => response.json())
//     .then(() => {
//       object.remove();
//     });
// };

// // ---------------- Delete Annotation
// const deleteAnnotation = () => {
//   fetch(`${BASE_URL}${LIBRARY_PATH}${annotation.id}`, {
//     method: 'DELETE',
//   })
//     .then((response) => response.json())
//     .then(() => {
//       object.remove();
//     });
// };

// // ---------------- Event Listeners ---------------- //

// ---------------- Login ---------------- //

loginForm.addEventListener =
  ('submit',
  (event) => {
    event.preventDefault();

    const username = event.target.username.value;
    const email = event.target.email.value;

    const attributes = {
      username: username,
      email: email,
    };

    fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-type': 'Application/json',
      },
      body: JSON.stringify(attributes),
    })
      .then((response) => response.json())
      .then((user) => {
        if (user.id) {
          displayUser(user);
        } else {
          console.log(user);
        }
      });
  });

const displayUser = (user) => {
  const userDiv = document.createElement('div');
  userDiv.classList.add('div-class');

  const username = document.createElement('h6');
  username.innerText = user.username;
  username.classList.add('h6-class');

  const email = document.createElement('h6');
  email.innerText = user.email;
  email.classList.add('h6-class');

  userDiv.append(username, email);
  dashboard.append(userDiv);
};

// // ---------------- Search Forms ---------------- //

// // ---------------- Annotation Search Form
// annotationSearchForm.addEventListener('submit', (event) => {
//   const searchValue = event.target.search.value;
//   fetchAnnotation(searchValue);
// });

// ---------------- Google Books Search Form
googleBooksSearchForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const searchValue = googleQuery(event.target.search.value);
  fetchGoogleBooks(searchValue);
});

// // ---------------- Create Forms ---------------- //

// // ---------------- Create User Form
// createUserForm.addEventListener('submit', (event) => {
//   event.preventDefault();
//   const attributes = {
//     username: event.target.name.value,
//     email: event.target.email.value,
//   };

//   postUser(attributes);
// });

// // ---------------- Create Book Form
// createBookForm.addEventListener('submit', (event) => {
//   event.preventDefault();
//   const attributes = {
//     title: event.target.title.value,
//     author: event.target.author.value,
//     description: event.target.description.value,
//     image: event.target.image.value,
//     page_count: event.target.pages.value,
//     info_link: event.target.link.value,
//   };

//   postBook(attributes);
// });

// // ---------------- Create Annotation Form
// createAnnotationForm.addEventListener('submit', (event) => {
//   event.preventDefault();

//   const attributes = {
//     user_id: event.target['user-id'].value,
//     book_id: event.target['book-id'].value,
//     page: event.target.page.value,
//     progress: event.target.progress.value,
//   };

//   postAnnotation(attributes);
// });

// // ---------------- Update Forms ---------------- //

// // ---------------- Update Annotation Form
// updateProgressForm.addEventListener('submit', (event) => {
//   event.preventDefault();

//   const currentPage = event.target.page.value;
//   const comments = event.target.comments.value;
//   const currentProgress = parseInt(currentPage / book.pageCount, 10);
//   const pageEntry = { page_number: currentPage, comments: comments };

//   const attributes = {
//     page: pageEntry,
//     progress: currentProgress,
//   };

//   patchAnnotation(attributes);
//   annotation.page.push(pageEntry);
//   updateProgressBar(book, event.target.progress.value);
// });

// const updateProgressBar = (book, currentPage) => {
//   const currentProgress = parseInt(currentPage / book.pageCount, 10);
//   progressBar.setAttribute('aria-valuenow', currentProgress);
//   progressBar.innerText = `${currentProgress}%`;
// };


