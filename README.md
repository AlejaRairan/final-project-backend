# CountriesExplorer API (backend)

REST API for [CountriesExplorer](https://github.com/AlejaRairan/final-project-frontend), a web app to search countries and save the ones you like. The API handles user registration, login with JWT and the countries each user saves.

**API domain:** `https://api.YOUR-DOMAIN` (to be completed after deployment)

## Technologies

- Node.js and Express
- MongoDB with Mongoose
- JSON Web Tokens (`jsonwebtoken`) for authorization
- `bcryptjs` to hash passwords
- `celebrate` / Joi and `validator` for request validation
- `winston` and `express-winston` for JSON logs
- `helmet` and `cors` for security
- `dotenv` for environment variables
- ESLint (Airbnb base) and nodemon

## Features

- Users sign up and sign in; passwords are stored hashed and are never returned by the API.
- Each user has their own list of saved countries.
- Protected routes require a valid JWT.
- A user can only see and delete their own countries.
- Request data is validated before it reaches the controllers.
- Errors are handled in one central middleware.
- All requests and errors are logged in JSON format.

## Routes

| Method | Route | Auth | Description |
| --- | --- | --- | --- |
| POST | `/signup` | No | Creates a user from `email`, `password` and `name` |
| POST | `/signin` | No | Checks the credentials and returns a JWT |
| GET | `/users/me` | Yes | Returns the email and name of the logged-in user |
| GET | `/countries` | Yes | Returns the countries saved by the logged-in user |
| POST | `/countries` | Yes | Saves a country for the logged-in user |
| DELETE | `/countries/:countryId` | Yes | Deletes a country saved by the logged-in user |

Protected routes need the header:

```
Authorization: Bearer <token>
```

### Request bodies

`POST /signup`

```json
{ "email": "aleja@example.com", "password": "12345678", "name": "Aleja" }
```

`POST /signin`

```json
{ "email": "aleja@example.com", "password": "12345678" }
```

`POST /countries`

```json
{
  "name": "Colombia",
  "capital": "Bogotá",
  "region": "Americas",
  "flag": "https://flags.restcountries.com/v5/w320/co.png",
  "landscape": "https://example.com/photo.jpg",
  "description": "Optional short description"
}
```

`landscape` and `description` are optional.

### Validation rules

- `email`: required, valid email, unique.
- `password`: required, at least 8 characters.
- `name`: required, between 2 and 30 characters.
- `flag` and `landscape`: must be valid URLs (`http://` or `https://`).
- `:countryId`: must be a valid 24-character id.
- A user cannot save the same country twice.

## Status codes

| Code | Meaning |
| --- | --- |
| 200 | OK |
| 201 | Created |
| 400 | Invalid data |
| 401 | Missing or invalid token, or wrong email or password |
| 403 | Trying to delete a country that belongs to another user |
| 404 | Country, user or route not found |
| 409 | Email or country already exists |
| 500 | Server error |

## Run it locally

Requirements: Node.js and a running MongoDB (default `mongodb://127.0.0.1:27017`).

```bash
npm install
npm run dev
```

The API runs on `http://localhost:3000`. In development no `.env` file is needed: the default values are used.

| Script | Description |
| --- | --- |
| `npm run dev` | Starts the server with hot reload (nodemon) |
| `npm start` | Starts the server (production) |
| `npm run lint` | Runs ESLint |

## Environment variables (production)

Create a `.env` file **on the server only**. It is never committed.

| Variable | Description |
| --- | --- |
| `NODE_ENV` | Set to `production` |
| `JWT_SECRET` | Secret key to sign and verify JWTs (required in production) |
| `PORT` | Port to listen on (default `3000`) |
| `MONGO_URL` | MongoDB connection string (default: local database `countriesdb`) |
| `CORS_ORIGIN` | Allowed frontend origins, separated by commas |

In production the server refuses to start if `JWT_SECRET` is missing.

## Logs

- `request.log`: every request.
- `error.log`: every error.

Both files use JSON format and are listed in `.gitignore`.

## Project structure

```
controllers/   route logic (users, countries)
errors/        custom error classes with status codes
middlewares/   auth, validation, logger, error handler
models/        Mongoose models (user, country)
routes/        route definitions
utils/         configuration
app.js         app entry point
```

## Frontend

[final-project-frontend](https://github.com/AlejaRairan/final-project-frontend)
