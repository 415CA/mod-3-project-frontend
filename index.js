// ---------------- STABLE ELEMENTS ---------------- //

// ---------------- Read API URL
const BASE_URL = 'http://localhost:3000';
const BOOK_PATH = '/books';
const USER_PATH = '/users';
const ANNOTATION_PATH = '/annotations';

// ---------------- 3rd Party API URL
const GOOGLE_BOOKS_API = `https://www.googleapis.com/books/v1/volumes?q=`;
const googleQuery = (userInput) => {
  return userInput.split(' ').join('%20');
};

// ---------------- FORMS ---------------- //

// ---------------- Login
const loginForm = document.querySelector('#login-user-form');

// ---------------- Create
const createUserForm = document.querySelector('#create-user-form');
const createBookForm = document.querySelector('#create-book-form');
const createAnnotationForm = document.querySelector('#create-annotation-form');

// ---------------- Update
const updateProgressForm = document.querySelector('#update-progress-form');
const progressBar = document.querySelector('progress-bar');

// ---------------- Search
const annotationSearchForm = document.querySelector('#annotation-search');
const googleBooksSearchForm = document.querySelector('#google-book-search');

// ---------------- FETCH GET METHODS ---------------- //

// ---------------- Users
const fetchUser = (user) => {
  fetch(`${BASE_URL}${USER_PATH}/${user.id}`)
    .then((response) => response.json())
    .then((user) => console.log(user));
};

// ---------------- Books
const fetchBooks = () => {
  fetch(`${BASE_URL}${BOOK_PATH}`)
    .then((response) => response.json())
    .then((bookArray) => console.log(bookArray));
};

// ---------------- Annotations
const fetchAnnotation = () => {
  fetch(`${BASE_URL}${LIBRARY_PATH}`)
    .then((response) => response.json())
    .then((annotationArray) => console.log(annotationArray));
};

// ---------------- Google Books API
const fetchGoogleBooks = (searchValue) => {
  fetch(`${GOOGLE_BOOKS_API}{${searchValue}}`)
    .then((response) => response.json())
    .then((googleBooks) => {
      debugger
      console.log(googleBooks);
      googleBooks.forEach((book) => console.log(book));
    });
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

// ---------------- Create Annotation
const postAnnotation = (attributes) => {
  fetch(`${BASE_URL}${LIBRARY_PATH}`, {
    method: 'POST',
    headers: { 'Content-type': 'Application/json' },
    body: JSON.stringify(attributes),
  })
    .then((response) => response.json())
    .then((newAnnotation) => console.log(newAnnotation));
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

// ---------------- Update Annotation
const patchAnnotation = (attributes) => {
  fetch(`${BASE_URL}${LIBRARY_PATH}/${annotation.id}`, {
    method: 'PATCH',
    headers: { 'Content-type': 'Application/json' },
    body: JSON.stringify(attributes),
  })
    .then((response) => response.json())
    .then((annotation) => console.log(annotation));
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

// ---------------- Delete Annotation
const deleteAnnotation = () => {
  fetch(`${BASE_URL}${LIBRARY_PATH}${annotation.id}`, {
    method: 'DELETE',
  })
    .then((response) => response.json())
    .then(() => {
      object.remove();
    });
};

// ---------------- Event Listeners ---------------- //

// ---------------- Login ---------------- //

loginForm.addEventListener = (event) => {
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
        displayUser(user);
      } else {
        console.log(user);
      }
    });
};

// ---------------- Search Forms ---------------- //

// ---------------- Annotation Search Form
annotationSearchForm.addEventListener('submit', (event) => {
  const searchValue = event.target.search.value;
  fetchAnnotation(searchValue);
});

// ---------------- Google Books Search Form
googleBooksSearchForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const searchValue = googleQuery(event.target.search.value);
  // return fetchGoogleBooks(searchValue);
  fetch(`${GOOGLE_BOOKS_API}{${searchValue}}`)
    .then((response) => response.json())
    .then((googleBooks) => {
      console.log(googleBooks);
      debugger
      googleBooks.items.forEach((item) => console.log(item.volumeInfo.title));
      // googleBooks.forEach((item) => {
      //   console.log(item.title);
      // })
    });
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

// ---------------- Create Annotation Form
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

// ---------------- Update Forms ---------------- //

// ---------------- Update Annotation Form
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

  patchAnnotation(attributes);
  annotation.page.push(pageEntry);
  updateProgressBar(book, event.target.progress.value);
});

const updateProgressBar = (book, currentPage) => {
  const currentProgress = parseInt(currentPage / book.pageCount, 10);
  progressBar.setAttribute('aria-valuenow', currentProgress);
  progressBar.innerText = `${currentProgress}%`;
};
