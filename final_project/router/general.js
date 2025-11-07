const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }

  if (isValid(username)) {
    return res.status(400).json({ message: "Username already exists" });
  }

  users.push({ username, password });
  return res.status(201).json({ message: "User successfully registered" });
});

// Task 1: Get all books
public_users.get('/', async function (req, res) {
  try {
    const getBooks = () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(books);
        }, 1000);
      });
    };
    
    const allBooks = await getBooks();
    res.json(allBooks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching books" });
  }
});

// Task 2: Get book details by ISBN
public_users.get('/isbn/:isbn', async function (req, res) {
  try {
    const isbn = req.params.isbn;
    const getBookByISBN = () => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const book = books[isbn];
          if (book) {
            resolve(book);
          } else {
            reject("Book not found");
          }
        }, 1000);
      });
    };
    
    const book = await getBookByISBN();
    res.json(book);
  } catch (error) {
    res.status(404).json({ message: error });
  }
});
  
// Task 3: Get books by author
public_users.get('/author/:author', async function (req, res) {
  try {
    const author = req.params.author;
    const getBooksByAuthor = () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          const matchingBooks = [];
          for (let id in books) {
            if (books[id].author.toLowerCase().includes(author.toLowerCase())) {
              matchingBooks.push(books[id]);
            }
          }
          resolve(matchingBooks);
        }, 1000);
      });
    };
    
    const booksByAuthor = await getBooksByAuthor();
    res.json(booksByAuthor);
  } catch (error) {
    res.status(500).json({ message: "Error fetching books by author" });
  }
});

// Task 4: Get books by title
public_users.get('/async/title/:title', async function (req, res) {
  try {
    const title = req.params.title;
    const getBooksByTitle = () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          const matchingBooks = [];
          for (let id in books) {
            if (books[id].title.toLowerCase().includes(title.toLowerCase())) {
              matchingBooks.push(books[id]);
            }
          }
          resolve(matchingBooks);
        }, 1000);
      });
    };
    
    const booksByTitle = await getBooksByTitle();
    res.json(booksByTitle);
  } catch (error) {
    res.status(500).json({ message: "Error fetching books by title" });
  }
});

// Task 5: Get book reviews
public_users.get('/review/:isbn', function (req, res) {
  const isbn = req.params.isbn;
  const book = books[isbn];
  
  if (book) {
    res.json(book.reviews);
  } else {
    res.status(404).json({ message: "Book not found" });
  }
});

module.exports.general = public_users;
