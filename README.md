# 📚 Book Review API

A simple RESTful API built with **Node.js**, **Express**, **MongoDB**, and **JWT** for managing books, user authentication, and user-submitted book reviews.

---

## 🚀 Features

- User Signup/Login with JWT Authentication
- Add/Get/Delete Books (with filters and search)
- Submit/Update/Delete Reviews (1 per user per book)
- View paginated reviews and average book rating
- Case-insensitive partial search by title or author

---

## 🛠 Tech Stack

- Node.js + Express
- MongoDB + Mongoose
- JWT (JSON Web Token) for auth
- dotenv, bcryptjs, express-async-handler

---

## ⚙️ Project Setup

### 1. Clone the Repository

```bash
git clone https://github.com/Rahulrai1998/book-review-system.git
```

### 2. Install Dependencies

```bash
npm install
```


### 4. Run the Server

```bash
npm start / nodemon server.js
```

---

## 💡 API Endpoints

### 🔐 Auth

- `POST /api/users/signup` – Register a new user
- `POST /api/users/login` – Login and receive JWT

---

### 📚 Books

- `POST /api/books/` – Add a new book (auth required)
- `GET /api/books/` – Get all books (with pagination)
- `GET /api/books/:id` – Get single book + paginated reviews
- `DELETE /api/books/:id` – Delete a book (auth required)
- `POST /api/books/search` – Filter books by title/author (in body)

# Database Schema

## User

* `username`: String (required)
* `email`: String (required, unique)
* `password`: String (required)
* `createdAt`: Date (auto)
* `updatedAt`: Date (auto)

## Book

* `user_id`: ObjectId (required, references User)
* `title`: String (required)
* `author`: String (required)
* `description`: String
* `genre`: String (required)
* `averageRating`: Number (default: 0)
* `totalReviews`: Number (default: 0)
* `reviews`: [ObjectId] (references Review)
* `createdAt`: Date (auto)
* `updatedAt`: Date (auto)

## Review

* `book`: ObjectId (required, references Book)
* `user`: ObjectId (required, references User)
* `rating`: Number (required, min:1, max:5)
* `comment`: String
* `createdAt`: Date (auto)
* `updatedAt`: Date (auto)

### Constraints:

* Unique composite index on (book, user) in Review to prevent duplicate reviews
* All reference fields are required

This schema supports:

* User authentication
* Book management with genre classification
* Rating/review system with average calculations
* One-to-many relationships (User-Books, Book-Reviews)

---

### ⭐ Reviews

- `POST /api/books/:id/reviews` – Add review (1 per user per book)
- `PUT /api/books/reviews/:id` – Update own review
- `DELETE /api/books/reviews/:id` – Delete own review

---

## 🔧 Design Decisions

- **Separation of Concerns**: Organized code into controllers, routes, models, middleware
- **Modular Structure**: Easy to scale and test
- **JWT-Based Auth**: Secure, stateless authentication
- **Single Review Rule**: Enforced via compound index `{ user, book }` with `unique: true`
- **Pagination & Filtering**: Keeps API performant and flexible

---

## 🧪 Sample Thunder Client/Postman Requests

### PLEASE FIND THE SAMPLE API RESPONSES INT THE /assets Directory

---

## 📁 Folder Structure

```
├── controllers
│   ├── booksController.js
│   ├── reviewController.js
│   └── userController.js
├── middleware
│   ├── errorHandler.js
│   └── validateTokenHandler.js
├── models
│   ├── bookModel.js
│   ├── reviewModel.js
│   └── userModel.js
├── routes
│   ├── bookRoutes.js
│   └── userRoutes.js
├── .env
├── constants.js
├── server.js
```

---

## ✅ To Do / Improvements

- Role-based access control (admin/user) could be implmented
