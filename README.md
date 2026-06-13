# 📚 Books For You

A full-stack mobile application that lets users discover, share, and manage book recommendations — built with **React Native (Expo)** on the frontend and **Node.js / Express** on the backend.

---

## 📖 Table of Contents

- [About the Project](#about-the-project)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Backend Setup](#backend-setup)
  - [Mobile Setup](#mobile-setup)
- [Environment Variables](#environment-variables)
- [API Reference](#api-reference)
- [Screenshots](#screenshots)
- [How It Works](#how-it-works)
- [Contributing](#contributing)
- [License](#license)

---

## About the Project

**Books For You** is a community-driven book recommendation app. Authenticated users can post books they love, rate them, upload cover images, and browse recommendations from other readers — all from their mobile device.

This project was built to practice full-stack mobile development, covering everything from REST API design and JWT authentication, to image uploading and infinite scroll pagination.

---

## Features

- 🔐 **User Authentication** — Register and log in securely with email and password
- 🖼️ **Auto-generated Avatars** — Profile pictures are generated automatically on sign-up using DiceBear
- 📚 **Post Book Recommendations** — Share a book with a title, caption, rating (1–5), and cover image
- ♾️ **Infinite Scroll Feed** — Browse all book recommendations with paginated loading
- 👤 **Personal Library** — View only the books you have recommended
- 🗑️ **Delete Your Posts** — Remove your own book recommendations (and their images)
- ☁️ **Cloud Image Storage** — Book cover images are stored on Cloudinary
- 🎨 **Multiple Color Themes** — Four built-in themes: Forest, Retro, Ocean, and Blossom

---

## Tech Stack

### Mobile (Frontend)
| Technology | Purpose |
|---|---|
| React Native | Cross-platform mobile UI |
| Expo (SDK 54) | Development toolchain and build system |
| Expo Router | File-based navigation |
| Zustand | Global state management |
| AsyncStorage | Persisting auth token on device |
| Expo Vector Icons | Icon library |

### Backend
| Technology | Purpose |
|---|---|
| Node.js + Express | REST API server |
| MongoDB + Mongoose | Database and object modeling |
| JSON Web Tokens (JWT) | Stateless authentication |
| bcryptjs | Password hashing |
| Cloudinary | Cloud-based image storage |
| dotenv | Environment variable management |
| nodemon | Auto-restart during development |

---

## Project Structure

The repository is split into two separate folders:

```
Books_For_You/
├── backend/                   # Node.js REST API
│   └── src/
│       ├── index.js           # Server entry point
│       ├── lib/
│       │   ├── db.js          # MongoDB connection
│       │   └── cloudinary.js  # Cloudinary configuration
│       ├── middleware/
│       │   └── auth.middleware.js  # JWT protection middleware
│       ├── models/
│       │   ├── User.js        # User schema (with password hashing)
│       │   └── Book.js        # Book schema
│       └── routes/
│           ├── authRoutes.js  # /api/auth (register, login)
│           └── bookRoutes.js  # /api/books (CRUD)
│
└── mobile/                    # Expo React Native app
    ├── app/
    │   ├── _layout.tsx        # Root layout
    │   ├── (auth)/            # Login and Sign-up screens
    │   └── (root)/            # Main app screens (after login)
    ├── assets/
    │   ├── fonts/             # Custom fonts
    │   ├── images/            # App icons and splash screen
    │   └── styles/            # Per-screen StyleSheet files
    ├── components/
    │   └── SafeScreen.jsx     # Safe area wrapper component
    ├── constants/
    │   └── colors.js          # Theme color tokens
    └── store/
        └── authStore.js       # Zustand auth store
```

---

## Getting Started

Follow these steps to run the project on your local machine.

### Prerequisites

Before you begin, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (version 18 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Expo Go](https://expo.dev/go) app installed on your phone **or** an Android/iOS simulator
- A free [MongoDB Atlas](https://www.mongodb.com/atlas) account
- A free [Cloudinary](https://cloudinary.com/) account

> 💡 **New to this?** MongoDB Atlas lets you host a database in the cloud for free. Cloudinary lets you store images in the cloud for free. Both have generous free tiers perfect for side projects.

---

### Backend Setup

1. **Navigate to the backend folder:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create a `.env` file** in the `backend` folder and add your credentials (see [Environment Variables](#environment-variables) below).

4. **Start the development server:**
   ```bash
   npm run dev
   ```

   You should see:
   ```
   Server running on port 3000
   Database connected <your-mongodb-host>
   ```

---

### Mobile Setup

1. **Navigate to the mobile folder:**
   ```bash
   cd mobile
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set your API URL:**

   Create a file at `mobile/constants/api.js` and add:
   ```js
   export const API_URL = "http://<YOUR_LOCAL_IP>:3000/api";
   ```

   > 💡 Replace `<YOUR_LOCAL_IP>` with your computer's local network IP address (e.g. `192.168.1.5`). You can find it by running `ipconfig` (Windows) or `ifconfig` (Mac/Linux). Do **not** use `localhost` here — your phone won't be able to reach your computer with that address.

4. **Start the Expo development server:**
   ```bash
   npm start
   ```

5. **Open the app:**
   - Scan the QR code with the **Expo Go** app on your phone, or
   - Press `a` for Android emulator, or `i` for iOS simulator

---

## Environment Variables

Create a file named `.env` inside the `backend/` folder with the following keys:

```env
# The port your server will run on
PORT=3000

# Your MongoDB Atlas connection string
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/<dbname>

# A long, random secret string used to sign JWT tokens
JWT_SECRET=your_super_secret_jwt_key_here

# Your Cloudinary credentials (found in your Cloudinary dashboard)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

> ⚠️ **Important:** Never commit your `.env` file to GitHub. It contains private credentials. The `.gitignore` file already excludes it, but always double-check.

---

## API Reference

All routes are prefixed with `/api`.

### Auth Routes — `/api/auth`

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `POST` | `/auth/register` | Create a new user account | No |
| `POST` | `/auth/login` | Log in and receive a JWT token | No |

**Register body:**
```json
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "securepassword"
}
```

**Login body:**
```json
{
  "email": "john@example.com",
  "password": "securepassword"
}
```

---

### Book Routes — `/api/books`

All book routes require a valid JWT token in the `Authorization` header:
```
Authorization: Bearer <your_token>
```

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/books` | Create a new book recommendation |
| `GET` | `/books?page=1&limit=5` | Get all books (paginated) |
| `GET` | `/books/user` | Get books posted by the logged-in user |
| `DELETE` | `/books/:id` | Delete a book (only the creator can do this) |

**Create book body:**
```json
{
  "title": "Atomic Habits",
  "caption": "A practical guide to building good habits.",
  "rating": 5,
  "image": "<base64 encoded image string>"
}
```

---

## Screenshots

> Screenshots are stored in `mobile/assets/images/screenshot-for-readme.png`

---

## How It Works

Here is a simple flow of how the app works end to end:

1. A new user **registers** → the backend hashes their password and saves it to MongoDB. A JWT token is returned.
2. The token is **saved on the device** using AsyncStorage so the user stays logged in.
3. When the user **posts a book**, the image is first uploaded to Cloudinary, and the returned URL is saved to MongoDB alongside the book data.
4. The **home feed** fetches books from the database in pages (2 per request by default), supporting infinite scroll.
5. When a user **deletes a book**, the image is also deleted from Cloudinary to avoid orphaned files.
6. On app restart, the stored token is checked via **`checkAuth`** in the Zustand store — if valid, the user is taken straight to the home screen.

---

## Contributing

Contributions are welcome! Here is how to get started:

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Make your changes and commit: `git commit -m "Add your feature"`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Open a Pull Request

---

## License

This project is open source and available under the [MIT License](LICENSE).

---

<p align="center">Built with ❤️ using React Native, Expo, and Node.js</p>
