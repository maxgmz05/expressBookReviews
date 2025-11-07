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
public_users.get('/', function (req, res) {
  res.send(JSON.stringify(books, null, 4));
});

// Task 2: Get book details by ISBN
public_users.get('/isbn/:isbn', function (req, res) {
  const isbn = req.params.isbn;
  const book = books[isbn];
  
  if (book) {
    res.json(book);
  } else {
    res.status(404).json({ message: "Book not found" });
  }
});
  
// Task 3: Get books by author
public_users.get('/author/:author', function (req, res) {
  const author = req.params.author;
  const matchingBooks = [];
  
  for (let id in books) {
    if (books[id].author.toLowerCase().includes(author.toLowerCase())) {
      matchingBooks.push(books[id]);
    }
  }
  
  if (matchingBooks.length > 0) {
    res.json(matchingBooks);
  } else {
    res.status(404).json({ message: "No books found by this author" });
  }
});

// Task 4: Get books by title
public_users.get('/title/:title', function (req, res) {
  const title = req.params.title;
  const matchingBooks = [];
  
  for (let id in books) {
    if (books[id].title.toLowerCase().includes(title.toLowerCase())) {
      matchingBooks.push(books[id]);
    }
  }
  
  if (matchingBooks.length > 0) {
    res.json(matchingBooks);
  } else {
    res.status(404).json({ message: "No books found with this title" });
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
