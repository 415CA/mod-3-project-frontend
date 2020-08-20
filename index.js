const BASE_URL = 'http://localhost:3000';
const BOOK_PATH = '/books';
const USER_PATH = '/users';
const ANNOTATION_PATH = '/annotations';
const GOOGLE_BOOKS_API = 'https://www.googleapis.com/books/v1/volumes?q=';
const googleQuery = (userInput) => userInput.split(' ').join('+');

const sideBarDiv = document.querySelector('#sidebar');
const dashboardDiv = document.querySelector('#dashboard');
const mediaDiv = document.querySelector('#media');

const searchForm = document.querySelector('#google-search-form');
const mediaBody = document.querySelector('#media-body');


const clearScreen = () => {
  dashboardDiv.innerHTML = '';
  mediaDiv.innerHTML = '';
};

const showLoginForm = () => {
  // clearScreen();
  const loginForm = document.createElement('form');
  loginForm.classList.add('centered');

  const submitButton = document.createElement('button');
  submitButton.type = 'submit';
  submitButton.className = 'btn btn-primary';
  submitButton.innerText = 'Library';

  loginForm.append(submitButton);

  sideBarDiv.append(loginForm);

  loginForm.addEventListener('submit', handleLoginForm);
};

const handleLoginForm = (evt) => {
  evt.preventDefault();

  fetch(`${BASE_URL}${BOOK_PATH}`)
    .then((response) => response.json())
    .then((bookArray) => {
      clearScreen();
      bookArray.forEach((book) => {
        console.log('hi');
        showBookDetails(book);
      });
    });
};

const fetchLibrary = () => {
  fetch(`${BASE_URL}${USER_PATH}/1`)
    .then((response) => response.json())
    .then((user) => {
      clearScreen();
      user.books.forEach((book) => {
        console.log('hi');
        showBookDetails(book);
      });
    });
};

const showUserBooks = (user) => {
  setSideBar(user);
  showBooks(user);
};

const setSideBar = (user) => {
  sideBarDiv.innerHTML = '';

  const username = document.createElement('p');
  username.className = 'font-weight-bold text-center';
  username.innerText = `Logged in as ${user.username}`;

  const logOutButton = document.createElement('button');
  logOutButton.className = 'btn btn-danger';
  logOutButton.innerText = 'Logout';

  sideBarDiv.append(username, logOutButton);
  logOutButton.addEventListener('click', (evt) => {
    logOut();
  });
};

const logOut = () => {
  sideBarDiv.innerHTML = '';
  dashboardDiv.innerHTML = '';
  mediaDiv.innerHTML = '';
  showLoginForm();
};

// ------------ SET MAIN CONTAINER AFTER LOGIN ------------
const showBooks = (user) => {
  dashboardDiv.innerHTML = '';
  user.books.forEach((book) => createBookLi(book));
};

const createBookLi = (book) => {
  const bookLi = document.createElement('li');
  bookLi.className =
    'list-group-item d-flex justify-content-between align-items-center';

  const bookSpan = document.createElement('span');
  bookSpan.className = 'badge badge-primary badge-pill';
  bookSpan.innerText = book.annotations.length;

  bookLi.append(book.title, bookSpan);

  sideBarDiv.append(bookLi);

  bookLi.addEventListener('click', (event) => {
    mediaDiv.innerHTML.innerText = `SHOW ASSIGNMENTS FOR ${book.name}`;
    console.log(book);
  });
};

searchForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const searchValue = googleQuery(event.target.search.value);

  fetch(`${GOOGLE_BOOKS_API}{${searchValue}}&maxResults=40`)
    .then((response) => response.json())
    .then((googleBooks) => {
      clearScreen();
      googleBooks.items.forEach((item) => googleBookHTML(item));
    });
});

const googleBookHTML = (book) => {
  const bookDiv = document.createElement('div');
  bookDiv.classList.add('div-class');

  const libraryButton = document.createElement('input');
  libraryButton.value = 'Add to Library';
  libraryButton.classList.add('btn', 'btn-secondary', 'btn-sm');
  libraryButton.type = 'submit';

  const breakPoint = document.createElement('br');

  // hidden field
  const hiddenForm = document.createElement('form');
  hiddenForm.action = 'submit';

  const title = document.createElement('input');
  title.id = 'title';
  title.name = 'title';
  title.value = book.volumeInfo.title;
  title.type = 'hidden';
  title.classList.add('mt-0', 'mb-1');

  const titleLabel = document.createElement('label');
  titleLabel.for = title;
  titleLabel.innerText = book.volumeInfo.title;

  const author = document.createElement('input');
  author.id = 'author';
  author.name = 'author';
  author.value = book.volumeInfo.authors;
  author.type = 'hidden';

  const authorLabel = document.createElement('label');
  authorLabel.for = author;
  authorLabel.innerText = book.volumeInfo.authors;

  const description = document.createElement('input');
  description.id = 'description';
  description.name = 'description';
  description.value = book.volumeInfo.description;
  description.type = 'hidden';

  const descriptionLabel = document.createElement('label');
  descriptionLabel.for = description;
  descriptionLabel.innerText = book.volumeInfo.description;

  const pageCount = document.createElement('input');
  pageCount.id = 'page-count';
  pageCount.name = 'page-count';
  pageCount.value = book.volumeInfo.pageCount;
  pageCount.type = 'hidden';

  const pageCountLabel = document.createElement('label');
  pageCountLabel.for = pageCount;
  pageCountLabel.innerText = '';

  const currentPage = document.createElement('input');
  currentPage.id = 'current-page';
  currentPage.name = 'current-page';
  currentPage.value = 0;
  currentPage.type = 'hidden';

  const currentPageLabel = document.createElement('label');
  currentPageLabel.for = currentPage;
  currentPageLabel.innerText = '';

  const image = document.createElement('input');
  image.id = 'image';
  image.name = 'image';
  image.value = book.volumeInfo.imageLinks.thumbnail;
  image.type = 'hidden';

  const imageLabel = document.createElement('label');
  imageLabel.for = image;
  imageLabel.innerHTML = `<image src=${book.volumeInfo.imageLinks.thumbnail} class="align-self-center mr-3">`;

  const infoLinkInput = document.createElement('input');
  infoLinkInput.id = 'info-link';
  infoLinkInput.name = 'info-link';
  infoLinkInput.value = book.volumeInfo.infoLink;
  infoLinkInput.type = 'hidden';

  const infoLinkInputLabel = document.createElement('label');
  infoLinkInputLabel.for = infoLinkInput;
  infoLinkInputLabel.innerText = '';

  const userNum = document.createElement('input');
  userNum.id = 'user';
  userNum.name = 'user';
  userNum.value = 1;
  userNum.type = 'hidden';

  const divMedia = document.createElement('div');
  divMedia.classList.add('media');

  const divMediaBody = document.createElement('div');
  divMediaBody.classList.add('media-body');

  divMediaBody.append(
    breakPoint,
    title,
    titleLabel,
    breakPoint,
    author,
    authorLabel,
    description,
    descriptionLabel,
    pageCount,
    pageCountLabel,
    currentPage,
    currentPageLabel,
    infoLinkInput,
    infoLinkInputLabel,
    userNum,
    breakPoint,
    libraryButton,
    breakPoint
  );

  divMedia.append(image, imageLabel, divMediaBody);
  hiddenForm.append(divMedia);
  bookDiv.append(hiddenForm);
  dashboardDiv.append(bookDiv);

  hiddenForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const titleNew = event.target.title.value;
    const authorNew = event.target.author.value;
    const descriptionNew = event.target.description.value;
    const pageCountNew = event.target['page-count'].value;
    const currentPageNew = event.target['current-page'].value;
    const imageNew = event.target.image.value;
    const infoLinkNew = event.target['info-link'].value;
    const userIdNew = event.target.user.value;

    const attributes = {
      title: titleNew,
      author: authorNew,
      description: descriptionNew,
      page_count: pageCountNew,
      current_page: currentPageNew,
      image: imageNew,
      info_link: infoLinkNew,
      user_id: userIdNew,
    };

    fetch(`${BASE_URL}${BOOK_PATH}`, {
      method: 'POST',
      headers: { 'Content-type': 'Application/json' },
      body: JSON.stringify(attributes),
    })
      .then((response) => response.json())
      .then((newBook) => {
        clearScreen();
        showBookDetails(newBook);
        createAnnotationForm(newBook);
      });
  });
};

const showBookDetails = (book) => {
  const bookInfo = createBookHTML(book);
  dashboardDiv.append(bookInfo);
};

const createBookHTML = (book) => {
  const bookObject = book;

  const bookDiv = document.createElement('div');
  bookDiv.classList.add('media');

  const bookDivBody = document.createElement('div');
  bookDivBody.classList.add('media-body');

  const bookTitle = document.createElement('h6');
  bookTitle.innerText = book.title;
  bookTitle.classList.add('mt-0', 'mb-1');

  const bookAuthor = document.createElement('h6');
  bookAuthor.innerText = `Author: ${book.author}`;
  bookAuthor.classList.add('mt-0', 'mb-1');

  const bookDescription = document.createElement('h6');
  bookDescription.innerText = `Description: ${book.description}`;
  bookDescription.classList.add('mt-0', 'mb-1');

  const bookPageCount = document.createElement('h6');
  bookPageCount.innerText = `Page Count: ${book.page_count}`;
  bookPageCount.classList.add('mt-0', 'mb-1');

  const bookCover = document.createElement('img');
  bookCover.src = book.image;
  bookCover.classList.add('align-self-center', 'mr-3');

  const infoLink = document.createElement('a');
  infoLink.href = book.info_link;
  infoLink.append(bookCover);

  const viewButton = document.createElement('button');
  viewButton.innerText = 'View';
  viewButton.classList.add('btn', 'btn-primary', 'btn-sm', 'mt-0', 'mb-1');

  const deleteButton = document.createElement('button');
  deleteButton.innerText = 'Delete';
  deleteButton.classList.add('btn', 'btn-secondary', 'btn-sm', 'mt-0', 'mb-1');

  const breakPoint = document.createElement('br');

  bookDivBody.append(
    breakPoint,
    bookTitle,
    bookAuthor,
    bookPageCount,
    bookDescription,
    viewButton,
    breakPoint,
    deleteButton
  );

  bookDiv.append(infoLink, bookDivBody);

  viewButton.addEventListener('click', (event) => {
    fetch(`${BASE_URL}${BOOK_PATH}/${book.id}`)
      .then((response) => response.json())
      .then((book) => {
        clearScreen();
        showBookDetails(book);
        createAnnotationForm(book);
      });
  });

  deleteButton.addEventListener('click', (event) => {
    fetch(`${BASE_URL}${BOOK_PATH}/${book.id}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        clearScreen();
        fetchLibrary();
      });
  });

  return bookDiv;
};

const deleteButton = (book) => {

  const deleteButton = document.createElement('button');
  deleteButton.innerText = 'Delete';
  deleteButton.classList.add('btn', 'btn-secondary', 'btn-sm', 'mt-0', 'mb-1');

  deleteButton.addEventListener('click', (event) => {
    fetch(`${BASE_URL}${BOOK_PATH}/${book.id}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        clearScreen();
        fetchLibrary();
      });
  });

  return deleteButton;
};

const viewButton = (book) => {

  const button = document.createElement('button');
  button.innerText = 'View';
  button.classList.add('btn', 'btn-primary', 'btn-sm', 'mt-0', 'mb-1');

  mediaBody.append(button);

  button.addEventListener('click', (event) => {
    fetch(`${BASE_URL}${BOOK_PATH}/${book.id}`)
      .then((response) => response.json())
      .then((viewBook) => {
        clearScreen();
        showBookDetails(viewBook);
        createAnnotationForm(viewBook);
      });
  });

  return button;
};

const createAnnotationForm = (book) => {
  const annotationDiv = document.createElement('div');
  annotationDiv.id = 'annotation-div';

  const annotationForm = document.createElement('form');
  annotationForm.id = 'annotation-form';

  const annotationFormDiv = document.createElement('div');

  const annotationHeader = document.createElement('h6');
  annotationHeader.innerText = 'Add Annotation';

  const currentPageLabel = document.createElement('label');
  currentPageLabel.for = 'current-page';
  currentPageLabel.innerText = 'Current Page';

  const currentPageInput = document.createElement('input');
  currentPageInput.type = 'text';
  currentPageInput.id = 'current-page';
  currentPageInput.placeholder = 'Page Number';

  const annotationFormDiv2 = document.createElement('div');
  annotationFormDiv2.classList.add('form-group');

  const annotationLabel = document.createElement('label');
  annotationLabel.innerText = 'Annotation';

  const annotationInput = document.createElement('textarea');
  annotationInput.name = 'annotation';
  annotationInput.id = 'annotation';
  annotationInput.rows = 3;
  annotationInput.classList.add('form-control');
  annotationInput.placeholder = 'Add Annotation';

  const submitButton = document.createElement('button');
  submitButton.innerText = 'Submit';
  submitButton.type = 'submit';
  submitButton.classList.add('btn', 'btn-primary', 'btn-sm');

  annotationFormDiv.append(
    annotationHeader,
    currentPageLabel,
    currentPageInput
  );

  annotationFormDiv2.append(annotationLabel, annotationInput, submitButton);
  annotationForm.append(annotationFormDiv, annotationFormDiv2);
  annotationDiv.append(annotationForm);
  updateProgress(book);
  dashboardDiv.append(annotationDiv);
  showAnnotations(book);

  annotationForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const attributes = {
      book_id: book.id,
      page_number: event.target['current-page'].value,
      comment: event.target.annotation.value,
    };
    fetch(`${BASE_URL}${ANNOTATION_PATH}`, {
      method: 'POST',
      headers: {
        'Content-type': 'Application/json',
      },
      body: JSON.stringify(attributes),
    })
      .then((response) => response.json())
      .then((updatedAnnotation) => {
        addAnnotation(updatedAnnotation); 
        // clearScreen();
        // showBookDetails(updatedBook);
        // createAnnotationForm(updatedBook);
      });
  });

  return annotationDiv;
};



const addAnnotation = (annotation) => {

  const annotationLi = document.createElement('li');
  annotationLi.classList.add('list-group-item');
  annotationLi.innerText = `Page: ${annotation.page_number}`;

  const annotationP = document.createElement('P');
  annotationP.innerText = `${annotation.comment}`;
  annotationLi.append(annotationP);

  mediaDiv.append(annotationLi);
};


const showAnnotations = (book) => {
  const annotationUl = document.createElement('ul');
  annotationUl.classList.add('list-group');

  book.annotations.forEach((annotation) => {
    const annotationLi = document.createElement('li');
    annotationLi.classList.add('list-group-item');
    annotationLi.innerText = `Page: ${annotation.page_number}`;
    const annotationP = document.createElement('P');
    annotationP.innerText = `${annotation.comment}`;
    annotationLi.append(annotationP);
    annotationUl.append(annotationLi);
  });

  mediaDiv.append(annotationUl);
};

const updateProgress = (book) => {
  const progressForm = document.createElement('form');
  progressForm.action = 'submit';

  const progress = (100 * book.current_page) / book.page_count;

  const outsideProgressDiv = document.createElement('div');
  outsideProgressDiv.classList.add('progress');

  const progressDiv = document.createElement('div');
  progressDiv.classList.add('progress-bar', 'w-5');
  progressDiv.setAttribute('aria-valuenow', progress);
  progressDiv.setAttribute('value', progress);
  progressDiv.setAttribute('aria-valuemin', 0);
  progressDiv.setAttribute('aria-valuemin', 100);
  progressDiv.setAttribute('style', `width: ${progress}%`);
  progressDiv.setAttribute('role', 'progressbar');
  progressDiv.innerText = `${progress}%`;
  outsideProgressDiv.append(progressDiv);

  const currentProgress = document.createElement('input');
  currentProgress.id = 'progress';
  currentProgress.name = 'progress';
  currentProgress.placeholder = book.current_page;

  const currentProgressLabel = document.createElement('label');
  currentProgressLabel.for = currentProgress;
  currentProgressLabel.innerText = 'Update Progress';

  const progressButton = document.createElement('input');
  progressButton.value = 'Submit';
  progressButton.classList.add('btn', 'btn-secondary', 'btn-sm');
  progressButton.type = 'submit';

  progressForm.append(
    currentProgressLabel,
    currentProgress,
    progressButton,
    outsideProgressDiv
  );
  progressForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const currentPage = event.target.progress.value;

    const attributes = {
      current_page: currentPage,
    };
    fetch(`${BASE_URL}${BOOK_PATH}/${book.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(attributes),
    })
      .then((response) => response.json())
      .then((updatedBook) => {
        clearScreen();
        showBookDetails(updatedBook);
        createAnnotationForm(updatedBook);
      });
  });

  dashboardDiv.append(progressForm);
};

showLoginForm();
