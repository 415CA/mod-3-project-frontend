// ---------------- STABLE ELEMENTS ---------------- //

// ---------------- Read API URL
const BASE_URL = 'http://localhost:3000';
const BOOK_PATH = '/books';
const USER_PATH = '/users';
const LIBRARY_PATH = '/libraries';

// ---------------- 3rd Party API URL 
const GOOGLE_BOOKS_API = `https://www.googleapis.com/books/v1/volumes?q=`;
const googleQuery = (userInput) => {
  return userInput.split(' ').join('%20');
};

// ---------------- FORMS ---------------- //

// ---------------- Create
const createUserForm = document.querySelector('#create-user-form');
const createBookForm = document.querySelector('#create-book-form');
const createLibraryForm = document.querySelector('#create-library-form');

// ---------------- Update
const updateProgressForm = document.querySelector('#update-progress-form');
const progressBar = document.querySelector('progress-bar');

// ---------------- Search
const librarySearchForm = document.querySelector('#library-search');
const googleBooksSearchForm = document.querySelector('#google-book-search');

// ---------------- FETCH GET METHODS ---------------- //

// ---------------- Users
const fetchUser = () => {
  fetch(`${BASE_URL}${USER_PATH}/${user.id}`)
    .then((response) => response.json())
    .then((userArray) => console.log(userArray));
};

// ---------------- Books
const fetchBooks = () => {
  fetch(`${BASE_URL}${BOOK_PATH}`)
    .then((response) => response.json())
    .then((bookArray) => console.log(bookArray));
};

// ---------------- Libraries
const fetchLibrary = () => {
  fetch(`${BASE_URL}${LIBRARY_PATH}`)
    .then((response) => response.json())
    .then((libraryArray) => console.log(libraryArray));
};

// ---------------- Google Books API
const fetchGoogleBooks = (searchValue) => {
  fetch(`${GOOGLE_BOOKS_API}{${searchValue}}`)
    .then((response) => response.json())
    .then((googleBooks) => console.log(googleBooks));
};

// ---------------- FETCH CREATE METHODS ---------------- //

// ---------------- Create User
const postUser = (attributes) => {
  fetch(`${BASE_URL}${USER_PATH}`, {
    method: 'POST',
    headers: { 'Content-type': 'Application/json' },
    body: JSON.stringify(attributes),
  })
    .then((response) => response.json())
    .then((newUser) => console.log(newUser));
};

// ---------------- Create Book
const postBook = (attributes) => {
  fetch(`${BASE_URL}${BOOK_PATH}`, {
    method: 'POST',
    headers: { 'Content-type': 'Application/json' },
    body: JSON.stringify(attributes),
  })
    .then((response) => response.json())
    .then((newBook) => console.log(newBook));
};

// ---------------- Create Library
const postLibrary = (attributes) => {
  fetch(`${BASE_URL}${LIBRARY_PATH}`, {
    method: 'POST',
    headers: { 'Content-type': 'Application/json' },
    body: JSON.stringify(attributes),
  })
    .then((response) => response.json())
    .then((newLibrary) => console.log(newLibrary));
};

// ---------------- FETCH UPDATE METHODS ----------------  //

// ---------------- Update User
const patchUser = (attributes) => {
  fetch(`${BASE_URL}${USER_PATH}/${user.id}`, {
    method: 'PATCH',
    headers: { 'Content-type': 'Application/json' },
    body: JSON.stringify(attributes),
  })
    .then((response) => response.json())
    .then((user) => console.log(user));
};

// ---------------- Update Book
const patchBook = (attributes) => {
  fetch(`${BASE_URL}${BOOK_PATH}/${book.id}`, {
    method: 'PATCH',
    headers: { 'Content-type': 'Application/json' },
    body: JSON.stringify(attributes),
  })
    .then((response) => response.json())
    .then((book) => console.log(book));
};

// ---------------- Update Library
const patchLibrary = (attributes) => {
  fetch(`${BASE_URL}${LIBRARY_PATH}/${library.id}`, {
    method: 'PATCH',
    headers: { 'Content-type': 'Application/json' },
    body: JSON.stringify(attributes),
  })
    .then((response) => response.json())
    .then((library) => console.log(library));
};

// ---------------- FETCH DELETE METHODS ----------------  //

// ---------------- Delete User
const deleteUser = () => {
  fetch(`${BASE_URL}${USER_PATH}${user.id}`, {
    method: 'DELETE',
  })
    .then((response) => response.json())
    .then(() => {
      object.remove();
    });
};

// ---------------- Delete Book
const deleteBook = () => {
  fetch(`${BASE_URL}${BOOK_PATH}${book.id}`, {
    method: 'DELETE',
  })
    .then((response) => response.json())
    .then(() => {
      object.remove();
    });
};

// ---------------- Delete Library
const deleteLibrary = () => {
  fetch(`${BASE_URL}${LIBRARY_PATH}${library.id}`, {
    method: 'DELETE',
  })
    .then((response) => response.json())
    .then(() => {
      object.remove();
    });
};

// ---------------- Event Listeners ---------------- //

// ---------------- Login ---------------- //

const loginForm.addEventListener = (event) => {
  event.preventDefault();

  const username = event.target.username.value;

  const attributes = {
    username: username,
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
        displayUser(user)
      } else {
        console.log(user)
      }
    });
};

// ---------------- Search Forms ---------------- //

// ---------------- Library Search Form
librarySearchForm.addEventListener('submit', (event) => {
  const searchValue = event.target.search.value;
  fetchLibrary(searchValue);
});

// ---------------- Google Books Search Form
googleBooksSearchForm.addEventListener('submit', (event) => {
  const searchValue = googleQuery(event.target.search.value);
  fetchGoogleBooks(searchValue);
});

// ---------------- Create Forms ---------------- //

// ---------------- Create User Form
createUserForm.addEventListener('submit', (event) => {
  const attributes = {
    username: event.target.name.value,
    email: event.target.email.value,
  };

  postUser(attributes);
});

// ---------------- Create Book Form
createBookForm.addEventListener('submit', (event) => {
  const attributes = {
    title: event.target.title.value,
    author: event.target.author.value,
    description: event.target.description.value,
    image: event.target.image.value,
    page_count: event.target.pages.value,
    info_link: event.target.link.value,
  };

  postBook(attributes);
});

// ---------------- Create Library Form
createLibraryForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const attributes = {
    user_id: event.target['user-id'].value,
    book_id: event.target['book-id'].value,
    page: event.target.page.value,
    progress: event.target.progress.value,
  };

  postLibrary(attributes);
});

// ---------------- Update Forms ---------------- //

// ---------------- Update Library Form
updateProgressForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const currentPage = event.target.page.value;
  const comments = event.target.comments.value;
  const currentProgress = parseInt(currentPage / book.pageCount, 10);
  const pageEntry = { page_number: currentPage, comments: comments };

  const attributes = {
    page: pageEntry,
    progress: currentProgress,
  };

  patchLibrary(attributes);
  library.page.push(pageEntry);
  updateProgressBar(book, event.target.progress.value);
});

const updateProgressBar = (book, currentPage) => {
  const currentProgress = parseInt(currentPage / book.pageCount, 10);
  progressBar.setAttribute('aria-valuenow', currentProgress);
  progressBar.innerText = `${currentProgress}%`;
};
