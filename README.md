# Diary App Backend

This is the backend server for the Diary App. It provides API endpoints to manage diary entries.

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose

## Installation

1. Clone the repository:

```
git clone https://github.com/Maran077/diary-app-backend-server.git
```

2. Install dependencies:

```
npm install
```

3. Set up environment variables:

Create a `.env` file in the root directory and add the following environment variables:

```
PORT=3000
MONGODB_URI=<your-mongodb-uri>
```

4. Start the server:

```
npm start
```

The server should now be running on http://localhost:3000.

## API Endpoints

- `POST /diaries`: Create a new diary entry
- `GET /diaries`: Get all diary entries
- `GET /diaries/:id`: Get a single diary entry by ID
- `PUT /diaries/:id`: Update a diary entry by ID
- `DELETE /diaries/:id`: Delete a diary entry by ID

## Error Handling

Errors are handled using the `ErrorHandler` middleware, which returns appropriate HTTP status codes and error messages.

## Middlewares

- `catchAsyncError`: A middleware to catch asynchronous errors and pass them to the error handling middleware.

## Contributors

- [Sugumaran](https://github.com/Maran077)

Feel free to contribute by submitting bug reports, feature requests, or pull requests.
