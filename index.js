// ---------------- STABLE ELEMENTS ---------------- //

// ---------------- CONTAINERS ---------------- //

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

// ---------------- FORMS ---------------- //

// ---------------- Login
const loginForm = document.querySelector('#login-user-form');

// ---------------- Search
const googleBooksSearchForm = document.querySelector('#google-book-search');


// ---------------- FETCH GET METHODS ---------------- //

// ---------------- Users
const fetchUser = (user) => {
  // fetch(`${BASE_URL}${USER_PATH}/${user.id}`)
  fetch(`${BASE_URL}${USER_PATH}`)
    .then((response) => response.json())
    .then((user) => console.log(user));
};

// ---------------- Google Books API
const fetchGoogleBooks = (searchValue) => {
  fetch(`${GOOGLE_BOOKS_API}{${searchValue}}&maxResults=40`)
    .then((response) => response.json())
    .then((googleBooks) => {
      dashboard.innerHTML = '';
      googleBooks.items.forEach((item) => displayGoogleBook(item));
    });
};

// ---------------- Google Books Search Form
googleBooksSearchForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const searchValue = googleQuery(event.target.search.value);
  fetchGoogleBooks(searchValue);
});

// ---------------- Google Books Display

const displayGoogleBook = (book) => {

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
  author.value = book.volumeInfo.author;
  author.type = 'hidden';

  const authorLabel = document.createElement('label');
  authorLabel.for = author;
  authorLabel.innerText = book.volumeInfo.author;

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
  userNum.value = 3;
  userNum.type = 'hidden';

  const mediaDiv = document.createElement('div');
  mediaDiv.classList.add('media');

  const mediaDivBody = document.createElement('div');
  mediaDivBody.classList.add('media-body');

  mediaDivBody.append(
    breakPoint,
    title,
    titleLabel,
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
    breakPoint,
  );

  mediaDiv.append(
    image,
    imageLabel,
    mediaDivBody,
);

  hiddenForm.append(mediaDiv);
  bookDiv.append(hiddenForm);
  dashboard.append(bookDiv);

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

    postBook(attributes);
  });
};

// ---------------- Create Book
const postBook = (attributes) => {
  fetch(`${BASE_URL}${BOOK_PATH}`, {
    method: 'POST',
    headers: { 'Content-type': 'Application/json' },
    body: JSON.stringify(attributes),
  })
    .then((response) => response.json())
    .then((newBook) => {
      debugger
      clearDashboard();
      displayBook(newBook);

    });
};

const displayBook = (book) => {
  const bookDiv = document.createElement('div');
  bookDiv.classList.add('div-class');

  const bookTitle = document.createElement('h6');
  bookTitle.innerText = book.title;
  bookTitle.classList.add('h6-class');

  const bookAuthor = document.createElement('h6');
  bookAuthor.innerText = `Author: ${book.author}`;
  bookAuthor.classList.add('h6-class');

  const bookDescription = document.createElement('h6');
  bookDescription.innerText = `Description: ${book.description}`;
  bookDescription.classList.add('h6-class');

  const bookPageCount = document.createElement('h6');
  bookPageCount.innerText = `Page Count: ${book.page_count}`;
  bookPageCount.classList.add('h6-class');

  const bookCover = document.createElement('img');
  bookCover.src = book.imageLinks.thumbnail;

  const infoLink = document.createElement('a');
  infoLink.href = book.infoLink;
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
    breakPoint,
  );

  dashboard.append(bookDiv);
};
