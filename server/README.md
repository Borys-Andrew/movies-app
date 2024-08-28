# Movie BE Management Application

Welcome to the Movie Management Application! 🎬 This full-stack web application is designed for managing a collection of movies with features that allow users to browse, view details, and manage their favorite movies. It also includes user authentication for a secure experience.

## 🚀 Features

### User Authentication

- **Signup:** Create a new account with a username, email, and password. Passwords are securely hashed.
- **Login:** Authenticate using your email and password.

### Movie Management

- **Browse Movies:** View a comprehensive list of all available movies.
- **Movie Details:** Get detailed information about each movie, including title, image, director, actors, genre, rating, release date, and description.
- **Add Movie:** User can add new movies to the database.
- **Edit Movie:** User can update movie details.
- **Delete Movie:** User can remove movies from the database.

### Favorite Management

- **Add to Favorites:** Mark movies as favorites for easy access.
- **Remove from Favorites:** Unmark movies from your favorites list.
- **View Favorites:** See a list of your favorite movies.

## 🛠️ Tech Stack

- **Backend:**

  - **Express.js:** Framework for building the server.
  - **Mongoose:** ODM for MongoDB to handle database operations.

- **Database:**

  - **MongoDB:** NoSQL database for storing movie and user data.

## 📚 API Endpoints

### Auth Routes

- `POST /auth/signup`: Create a new user.
- `POST /auth/login`: Authenticate a user and receive JWT tokens.

### Movie Routes

- `GET /movie`: Get a list of all movies.
- `GET /movie/:id`: Get details of a specific movie by ID.
- `POST /movie`: Add a new movie.
- `PUT /movie/:id`: Update an existing movie.
- `DELETE /movie/:id`: Delete a movie.
- `PUT /movie/favorite/:id`: Add or remove a movie from favorites.
- `GET /movie/favorite/:id`: Retrieve a user's favorite movies.

## 🌱 Seed Data

A script is provided to seed the database with movie data fetched from The Movie Database API. This script populates the database with trending movies, including their details for use within the application.

## 🔧 Development Tools

- **Nodemon:** Automatically restarts the server during development.
- **Prettier & ESLint:** For code formatting and linting.
- **Husky & lint-staged:** Manage Git hooks and pre-commit checks.

## 💻 Getting Started

**Clone the Repository:**
**Seed movies data to DB:** run script: npm run seed
**Start dev server:** npm run dev

**that's all, enjoy**

## 📞 Contact Information

Feel free to reach out for collaboration or job opportunities!

- 📱 **Phone**: +38-073-100-74-63
- 📧 **Email**: [borysandrew9@gmail.com](mailto:borysandrew9@gmail.com)
- 🔗 **LinkedIn**: [Andrew Borys](https://www.linkedin.com/in/andrew-borys-233365200/)
- 💬 **Telegram**: [@BorysAndrew](https://t.me/BorysAndrew)
- 💻 **GitHub**: [Andrew-Borys](https://github.com/Andrew-Borys)
- 🌍 **Location**: Lviv, Ukraine
- 👨‍💻 Open to work in office, hybrid, or remotely.
