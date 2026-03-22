#  Pin Map - Backend

A Node.js REST API for the Pin Map application. Handles user authentication and pin management with MongoDB.

## Tech Stack

- Node.js / Express
- MongoDB / Mongoose
- bcrypt
- CORS
- dotenv

## Getting Started

### Prerequisites

- Node.js
- MongoDB Atlas account or local MongoDB instance
- nodemon (included in dependencies)

### Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root of the project:
```env
MONGO_URL=your_mongodb_connection_string
```

4. Start the server:
```bash
npm start
```

The server will run on `http://localhost:3000`.

## API Endpoints

### Pins

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/pins` | Get all pins |
| `POST` | `/api/pins` | Create a new pin |

### Users

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/users/register` | Register a new user |
| `POST` | `/api/users/login` | Login a user |

## Models

### Pin
- `username` — author of the pin
- `title` — pin title (min 3 chars)
- `desc` — description (min 3 chars)
- `rating` — rating from 0 to 5
- `lat` — latitude (-90 to 90)
- `long` — longitude (-180 to 180)

### User
- `username` — unique, 3–20 chars
- `email` — unique, max 50 chars
- `password` — hashed with bcrypt, min 6 chars

## Environment Variables

| Variable | Description |
|---|---|
| `MONGO_URL` | MongoDB connection string |
