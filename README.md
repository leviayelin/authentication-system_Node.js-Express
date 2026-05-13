# Project : User Authentication System  

![Node](https://img.shields.io/badge/node-js-green)
![Js](https://img.shields.io/badge/vanilla-js-orange)
![Docker](https://img.shields.io/badge/docker-ready-blue)
![Release](https://img.shields.io/badge/release-v1.0.0-blue)

## Main Objective
This project was created for learning and practice purposes, in order to gain a better understanding of:

- Architecture structure
- Technology stack usage
- Design patterns
- Core development concepts
- Programmatic data infrastructure

and additional concepts as the project continues to evolve.

---

## Learning Goals

The main goals of This project were:

- Understand Client-server architecture
- Build a REST API
- MVC design pattern
- Apply layerd architecture (Controller/ Service/ Repository)
- Implement Authentication & Security best practice
- Full-stack JavaScript development
- Working with PostgreSQL
- Practice with Docker-based env setup 
- Improve code quality through Refactoring & Error handling

---

## Key Concepts Covered

- REST API design
- JWT Authentication (Access & Refresh Tokens)
- HTTP-only Cookies
- CSRF Protection
- Token Refresh Flow & Rotation
- Rate Limiting
- Secure password hashing (bcrypt)
- CORS & cross-origin requests
- Docker containerization

---

## About - Project Overview

This project is an authentication system built using Node.js, Express, and PostgreSQL.

It includes core features such as user registration, login, JWT-based authentication, security, and protected routes.

The system follows a client–server architecture, where the client communicates with the server through a REST API.

The backend is structured using a layered architecture inspired by the MVC pattern, separating concerns into controllers, services, and repositories to improve maintainability and scalability.

---

## Technology Stack

### Frontend (Client Side)

- HTML5
- CSS3
- Bootstrap (framework)
- Vanilla JavaScript (SPA structure)

### Backend (Server Side)

- Node.js
- Express.js
- REST API architrcture

### Database

- PostgreSQL

### DevOps

- Docker
- Docker Compose

---

## Features

- User registration & Login forms
- Protected dashboard (authenticated access only)
- JWT-based authentication (access & refresh)
- Secure Cookie (httpOnly , sameSite)
- CSRF protection
- Token refresh mechanism
- Rate limiter (API protection)
- Layered backend architecture (Controller / Service / Repository)
- Dockerized enviroment

## Project Structure

        project /
        │
        ├── Client /              # Frontend files
        |   ├── config /          # state's setting 
        |   ├── components /      # reusable components        
        |   ├── pages /           # page interface 
        |   ├── routes /          # navigation routing 
        |   ├── services /        # handle request
        |   ├── utils /           # utilities function 
        |   └── public /          # static files 
        │
        └── Server /            # Backend (Node.js / API)
            ├── database /      # storage,migration,seed
            └── src /           # backend files
                ├── routes /        # API routes (endpoint mapping)
                ├── middleware /    # auth, validation etc..
                ├── controllers /   # handle HTTP req / res 
                ├── services /      # business logic
                ├── repositories /  # database queries
                ├── db /            # database connection
                ├── utils /         # utilities function
                └── config /        # app configuration
        



## Authentication Flow

### 1. Register

→ User submits registration form  
→ Server validates input  
→ Password is hashed using bcrypt  
→ User is saved in the database  
→ User redirect to Login page 

![Preview](./assets/register-page.png)

---

### 2. Login

→ User submits credentials  
→ Server verifies credentials  
→ Password is compared using bcrypt  
→ Access Token (short-lived) created  
→ Refresh Token (long-lived) created  
→ Tokens stored in httpOnly cookies  
→ User redirect to protected pages


![Preview](./assets/login-page.png)
---

### 3. Access Protected Routes

→ Client sends request with cookies  
→ Middleware verifies access token  
→ If valid => allow access  
→ If expire => trigger refresh flow  

![preview](./assets/dashboard-page.png)

### 4. Token Refresh

→ Client detects 401 response  
→ Sends request to `/refresh`  
→ Server validates refresh token  
→ New access token issued

---

## Security

- Passwords hashing with bcrypt
- httpOnly cookies (prevent XSS access)
- CSRF protection using Token 
- Refresh token rotation (prevent reuse attacks)
- Rate limiting (prevent brute-force attacks)
- input validation & sanitiztion (Regex) 
- Sensitive data never exposed

---

## Installation & Setup
###  Docker Setup

This project runs in a containerized environment using Docker.

### Services:

- `frontend` → serves client (port 8080)
- `backend` → API server (port 3000)
- `postgres` → database (port 5432)

### Run project:
```bash
docker-compose up --build
```
 Running check 
```bash
docker ps
```

### Installation (Without Docker)


Clone the repository:

    git clone https://github.com/yourusername/user-form-project.git

Install dependencies:

    npm install

Run the server:

    npm start


### Environment Variables (Example)

    # DB
    PORT=3000
    DB_PORT=5432  
    DB_HOST=your_db_host  
    DB_USER=your_user
    DB_NAME=your_db_name  
    DB_PASSWORD=your_password  

    # JWT
    JWT_SECRET=your_jwt_secret  
    REFRESH_SECRET=your_refresh_secret

    # COOKIES
    COOKIE_SAMESITE=# secure | Lax

    # CORS
    ORIGIN_PORT=your_origin_port

### API Endpoints

    POST /api/auth/register  
    POST /api/auth/login  
    POST /api/auth/refresh  
    GET  /api/auth/profile  
    POST /api/auth/logout      

### Database Migration Instruction
migration (no Docker)

```bash
npm run migrate
```
migration on Docker

```bash
docker-compose exec backend npm run migrate
```
---
## Future Learn/Improvements

- Role-based authorization (admin/user)
- Email verification
- Password reset flow
- Advanced validation (Joi / Zod)
- Logging system (Winston / Morgan)
- Full test coverage (unit + integration)
- CI/CD pipeline
- Improve error handling with centralized middleware
- Add role-based authorization (admin / user)
- Migrate token storage to httpOnly cookies for better security

## What i've Learned

- Designing secure authentication systems
- Managing tokens and sessions correctly
- Handling edge cases (expiration, reuse, errors)
- Structuring scalable backend architecture
- Working with Docker and multi-service apps