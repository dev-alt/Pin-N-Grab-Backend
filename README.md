# Pin'N'Grab Backend

Pin'N'Grab Backend is a robust Express.js application that serves as the backend for a job marketplace platform. It provides a comprehensive set of APIs for user management, job posting, applications, messaging, and reviews.

## Features

- User authentication and authorization
- Job posting and management
- Job application system
- User-to-user messaging
- Review and rating system
- Saved jobs functionality

## Tech Stack

- Node.js
- Express.js
- Sequelize ORM
- MySQL
- JSON Web Tokens (JWT) for authentication
- Swagger for API documentation
- Docker for containerization

## Getting Started

### Prerequisites

- Node.js (v16 or later)
- MySQL
- Docker (optional)

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/dev-alt/tradeapp-backend.git
   ```

2. Install dependencies:
   ```
   cd tradeapp-backend
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add the following:
   ```
   DB_HOST=your_database_host
   DB_USER=your_database_user
   DB_PASSWORD=your_database_password
   DB_NAME=your_database_name
   JWT_SECRET=your_jwt_secret
   ```

4. Start the server:
   ```
   npm start
   ```

The server will start on `http://localhost:5000` by default.

### Docker

To run the application using Docker:

1. Build the Docker image:
   ```
   docker build -t tradeapp-backend .
   ```

2. Run the container:
   ```
   docker run -p 5000:5000 tradeapp-backend
   ```

## API Documentation

API documentation is available via Swagger UI. After starting the server, visit:

```
http://localhost:5000/api-docs
```

## Testing

Run the test suite with:

```
npm test
```

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
