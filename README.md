# Bookmark Management API

A fully featured RESTful API to manage personal bookmarks with categories, tags, and metadata. Built with **Node.js**, **Express**, **Sequelize**, and **TypeScript**, and designed with scalable architecture (repository, service, controller). Suitable for use cases like saving web resources, tagging articles, or managing personal reading lists.

## Tech Stack

- User authentication (JWT + Refresh tokens)
- Role-based access (`user`, `admin`)
- CRUD for Bookmarks
- CRUD for Folders
- Bookmark tagging (many-to-many)
- Search, filter, and pagination
- Avatar upload via Multer
- Email verification (optional)
- Global error handling
- Background worker for async tasks (optional enhancement)
- CI/CD via GitHub Actions
- SQLite for testing | PostgreSQL for production
- Fully tested with Jest
- Swagger API documentation

## Project Structure

```
src/
├── components/
│   ├── auth/
│   ├── users/
│   ├── bookmarks/
│   ├── folders/
│   ├── tags/
│   └── models/
├── config/
├── middleware/
├── models/
├── migrations/
├── routes/
├── utils/
├── app.ts/
└── index.ts
```

## API Endpoints

**Base URL**: http://localhost:8080/api/v1
**Live Base URL**: https://bookmark-manager-api.onrender.com/api/v1

**Auth**

- POST /auth/register
- POST /auth/register?role=admin
- POST /auth/login
- POST /auth/refresh

**Users**

- GET /users
- GET /users/profile
- PATCH /users/profile
- PATCH /users/profile/avatar
- PATCH /users/profile/password
- DELETE /users/:id (admin)

**Bookmarks**

- GET /bookmarks
- POST /bookmarks
- GET /bookmarks/:id
- PATCH /bookmarks/:id
- DELETE /bookmarks/:id
- POST /bookmarks/:id/tags
- GET /bookmarks/:id/tags

**Folders**

- GET /folders
- POST /folders
- GET /folders/:id
- PATCH /folders/:id
- DELETE /folders/:id

**Tags**

- GET /tags
- POST /tags
- GET /tags/:id
- PATCH /tags/:id
- DELETE /tags/:id

## API Documentation

- **Swagger UI**: [View Live Docs](https://bookmark-manager-api.onrender.com/docs)

## Getting Started

### 1. Clone & Install

```bash
git clone https://github.com/yaya-soumah/bookmark-manager-api.git
cd bookmark-manager-api
npm install
```

### 2. Configure Environment

Create a `.env` file:

```env
NODE_ENV=development
PORT=8080
DB_DIALECT=postgres
DB_HOST=localhost
DB_PORT=5432
DB_NAME=bookmark-manager
DB_USER=postgres
DB_PASS=your-password
TEST_DB_STORAGE=:memory:
ACCESS_TOKEN_SECRET=your-secret-code
REFRESH_TOKEN_SECRET="your-refresh-secret-code"
```

### 3. Run Migrations & Seeders

```bash
npx sequelize-cli db:migrate
```

### 4. Start the Server

```bash
npm run dev
```

## Run Tests

```bash
npm run test
```

## Linting & Formatting

```bash
npm run lint
npm run format
```

## Author

**Yaya Soumah** – [LinkedIn](https:www.linkedin.com/in/yaya-soumah-11b75b1b9) | [GitHub](https://github.com/yaya-soumah)

## License

MIT License
