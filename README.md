# Bookstore API - Express Book Reviews

A small Express.js example API for managing and viewing book reviews. This project exposes public endpoints for browsing books and reviews and protected endpoints for registered users to add/modify/delete their reviews. It uses `express`, `express-session` and `jsonwebtoken` for session+token management.

## Project structure

- `index.js` — app entrypoint, mounts routers and the auth middleware
- `router/general.js` — public routes (get books, search, register, async endpoints)
- `router/auth_users.js` — user login and protected review endpoints
- `router/booksdb.js` — in-memory books database

## Requirements

- Node.js
- npm

## Endpoints

Public endpoints (no login required):

- GET `/` — Get all books (JSON)
- GET `/isbn/:isbn` — Get details for a single book by ISBN key
- GET `/author/:author` — Search books by author (case-insensitive, substring match)
- GET `/title/:title` — Search books by title (case-insensitive, substring match)
- GET `/review/:isbn` — Get reviews for a book
- POST `/register` — Register a new user (body: `{ "username":"...", "password":"..." }`)

Async variants (return similar data but implemented with promises / async/await):

- GET `/async/books`
- GET `/async/isbn/:isbn`
- GET `/async/author/:author`
- GET `/async/title/:title`

Protected endpoints (require login, mounted under `/customer`):

- POST `/customer/login` — Login (body: `{ "username":"...", "password":"..." }`). On success a session cookie is set and the response contains a token field.
- PUT `/customer/auth/review/:isbn?review=your+review` — Add or modify your review for a book (the username stored in the session is used as the reviewer key)
- DELETE `/customer/auth/review/:isbn` — Delete your review for a book

Full paths are dependent on the base server (default `http://localhost:5000`).

## Example usage

1. Clone GitHub Repository

```bash
git clone https://github.com/maxgmz05/expressBookReviews.git
```

2. Enter The Project Folder

```bash
cd expressBookReviews/final_project/
```

3. Install dependencies

```bash
npm install
```

4. Start the server

```bash
npm start
```

The server listens on port `5000` by default.
