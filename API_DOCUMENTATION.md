# Stremify API Documentation

Base URL: `http://localhost:3001/api/v1`

## Authentication

All authenticated endpoints require a valid session cookie.

### Register User
```http
POST /auth/signup
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (201)**
```json
{
  "success": true,
  "message": "User created successfully",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (200)**
```json
{
  "success": true,
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "USER"
  }
}
```

### Get Current User
```http
GET /auth/me
Cookie: sessionId=xxx
```

**Response (200)**
```json
{
  "success": true,
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

### Logout
```http
POST /auth/logout
Cookie: sessionId=xxx
```

**Response (200)**
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

## Movies

### Get All Movies
```http
GET /content/movies/all
```

**Response (200)**
```json
[
  {
    "movie_id": "movie_id",
    "title": "Movie Title",
    "release_year": 2024,
    "duration": 120,
    "synopsis": "Movie description",
    "age_rating": "PG-13",
    "genre": "Action",
    "actors": "Actor 1, Actor 2",
    "warnings": "Violence",
    "images": [
      {
        "image_url": "/uploads/poster.jpg",
        "image_type": "poster"
      },
      {
        "image_url": "/uploads/backdrop.jpg",
        "image_type": "backdrop"
      }
    ],
    "created_at": "2024-01-01T00:00:00.000Z",
    "updated_at": "2024-01-01T00:00:00.000Z"
  }
]
```

### Get Movie by ID
```http
GET /content/movies/:id
```

**Response (200)**
```json
{
  "movie_id": "movie_id",
  "title": "Movie Title",
  "release_year": 2024,
  "duration": 120,
  "synopsis": "Movie description",
  "age_rating": "PG-13",
  "genre": "Action",
  "actors": "Actor 1, Actor 2",
  "warnings": "Violence",
  "images": [
    {
      "image_url": "/uploads/poster.jpg",
      "image_type": "poster"
    }
  ]
}
```

### Create Movie (Auth Required)
```http
POST /content/movies
Cookie: sessionId=xxx
Content-Type: multipart/form-data

title: Movie Title
releaseYear: 2024
duration: 120
synopsis: Movie description
ageRating: PG-13
genre: Action
actors: Actor 1, Actor 2
warnings: Violence
images: [file1.jpg, file2.jpg]
```

**Response (201)**
```json
{
  "success": true,
  "message": "Movie created successfully",
  "movie": {
    "movie_id": "movie_id",
    "title": "Movie Title",
    ...
  }
}
```

### Update Movie (Auth Required)
```http
PUT /content/movies/:id
Cookie: sessionId=xxx
Content-Type: application/json

{
  "title": "Updated Title",
  "duration": 130
}
```

**Response (200)**
```json
{
  "success": true,
  "message": "Movie updated successfully",
  "movie": {
    "movie_id": "movie_id",
    "title": "Updated Title",
    ...
  }
}
```

### Delete Movie (Auth Required)
```http
DELETE /content/movies/:id
Cookie: sessionId=xxx
```

**Response (200)**
```json
{
  "success": true,
  "message": "Movie deleted successfully"
}
```

## Subscription

### Get Subscription Info (Auth Required)
```http
GET /sub-info
Cookie: sessionId=xxx
```

**Response (200)**
```json
{
  "success": true,
  "userSubInfo": {
    "userId": "user_id",
    "status": "active",
    "planId": "premium",
    "currentPeriodStart": "2024-01-01T00:00:00.000Z",
    "currentPeriodEnd": "2024-02-01T00:00:00.000Z",
    "cancelAtPeriodEnd": false,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### Create Subscription (Auth Required)
```http
POST /sub-info
Cookie: sessionId=xxx
Content-Type: application/json

{
  "planId": "premium"
}
```

**Response (201)**
```json
{
  "success": true,
  "message": "Subscription created successfully",
  "subscription": {
    "userId": "user_id",
    "status": "active",
    "planId": "premium",
    ...
  }
}
```

### Cancel Subscription (Auth Required)
```http
POST /sub-info/cancel
Cookie: sessionId=xxx
```

**Response (200)**
```json
{
  "success": true,
  "message": "Subscription will be canceled at period end",
  "subscription": {
    "cancelAtPeriodEnd": true,
    "canceledAt": "2024-01-15T00:00:00.000Z",
    ...
  }
}
```

## Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "message": "Validation error message"
}
```

### 401 Unauthorized
```json
{
  "success": false,
  "message": "Authentication required"
}
```

### 404 Not Found
```json
{
  "success": false,
  "message": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## Rate Limiting

Currently no rate limiting is implemented. Consider adding rate limiting in production.

## File Upload

- Maximum file size: Default (no limit set)
- Supported formats: .jpg, .jpeg, .png
- Maximum files per request: 2 (poster + backdrop)
- Files are stored in `/uploads` directory

## Authentication Flow

1. User registers via `/auth/signup`
2. User logs in via `/auth/login` (receives session cookie)
3. Session cookie is automatically sent with subsequent requests
4. Protected routes verify session cookie
5. User logs out via `/auth/logout` (clears session)

## CORS Configuration

- Allowed origin: Configured via FRONTEND_URL environment variable
- Credentials: Enabled (cookies allowed)
- Methods: GET, POST, PUT, DELETE

## Notes

- All timestamps are in ISO 8601 format
- Session cookies are httpOnly and secure in production
- JWT tokens expire based on JWT_EXPIRY environment variable (default: 7 days)
