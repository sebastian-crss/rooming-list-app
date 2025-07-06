# Rooming List App

A full-stack application for managing **Rooming Lists** and **Bookings**, built with:

- 🖥️ **Frontend:** Next.js + Tailwind CSS
- ⚙️ **Backend:** Express.js + Prisma (PostgreSQL)
- 🐳 **Docker Compose:** for easy local setup
- 🌱 Includes seed data and REST API

---

## 🚀 Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- `.env` and `.env.local` files configured (see below)

---

## 📦 Project Setup

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/rooming-list-app.git
cd rooming-list-app
```
### 2. Environment Variables
Create the following files:

In /backend/.env:
env

```
DATABASE_URL=postgresql://postgres:postgres@db:5432/roominglistdb
API_KEY=supersecretapikey
```

In /frontend/.env.local:
env

```
NEXT_PUBLIC_API_KEY=supersecretapikey
```
Make sure both the backend and frontend use the same API key for authentication.

### 🐳 Running with Docker
To build and start everything:

```bash
docker-compose up --build
```
This will:

Install dependencies

Apply Prisma migrations

Start the backend at http://localhost:3001

Start the frontend at http://localhost:3000

Set up the PostgreSQL database

### 🌱 Seed Initial Data
After starting the backend it should seed data automatically, but if you want to seed with more data you can by making a request:


```bash
curl -X POST http://localhost:3001/api/seed \
  -H "x-api-key: supersecretapikey"
```

This populates the database with sample rooming lists and bookings.

📁 Project Structure

```
rooming-list-app/
├── backend/
│   ├── prisma/               # Prisma schema and seed data
│   ├── src/
│   │    ├── routes/               # Express routes
│   └─   └── controllers/          # Route handlers
├── frontend/
│   ├── components/           # React UI components
│   ├── context/              # React Context for state
│   └── app                   # Routes 
├── docker-compose.yml
└── README.md
```

### ✅ Features
Token-protected API (x-api-key or Authorization: Bearer)

Rooming List and Booking relationships

Search, Filter, Sort (cut-off date), Pagination (or Infinite Scroll)

Responsive and styled with Tailwind CSS

Full JSON-based seeding for quick start

### 📮 API Endpoints
Rooming Lists

```
GET    /api/rooming-lists
GET    /api/rooming-lists/:id
POST   /api/rooming-lists
PUT    /api/rooming-lists/:id
DELETE /api/rooming-lists/:id
```
Bookings

```
Copy
GET    /api/bookings
GET    /api/bookings/:id
POST   /api/bookings
PUT    /api/bookings/:id
DELETE /api/bookings/:id
```
Seed
```
POST /api/seed
```
All endpoints require API key authentication.

### 🛠️ Development Tips

Backend changes require rebuilding the image or restarting the container.

Use docker-compose exec backend sh to open a shell inside the backend container.

Prisma migrations: npx prisma migrate dev (inside backend)

### 🧼 Cleaning Up

```
docker-compose down -v
```
This stops all containers and removes volumes (e.g., PostgreSQL data).

### 🧾 License
MIT – © 2025 Sebastian Quesada