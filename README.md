# User Form Project

## Main Objective
This project was created for learning and practice purposes, in order to gain a better understand of:

- Architecture structure
- Technology stack usage
- Design patterns
- Core development concepts
- Programmatic data infrastructure

and additional concepts as the project continues to evolve.

---

## Learning Goals

This project was created to practice:

- REST API development
- Client-server architecture
- MVC design pattern
- Full-stack JavaScript development
- Working with PostgreSQL

---

## About - Project Overview

This project is an authentication system built using Node.js, Express, and PostgreSQL.

It includes core features such as user registration, login, JWT-based authentication, and protected routes.

The system follows a client–server architecture, where the client communicates with the server through a REST API.

The backend is structured using a layered architecture inspired by the MVC pattern, separating concerns into controllers, services, and repositories to improve maintainability and scalability.

---

## Technology Stack

### Frontend (Client Side)

- HTML
- CSS
- Bootstrap (framework)
- JavaScript (Vanilla)

### Backend (Server Side)

- Node.js
- Express
- REST API

### Database

- PostgreSQL

---

## Features

- User registration form
- User login form
- Protected dashboard page
- Client-server communication using REST API
- JWT authentication
- Layered architecture (Controller / Service / Repository)

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
            ├── database /      # storage 
            └── src /           # backend files
                ├── routes /        # API routes (endpoint mapping)
                ├── middleware /    # auth, validation etc..
                ├── controllers /   # handle HTTP req / res 
                ├── services /      # business loginc
                ├── repositories /  # database queries
                ├── db /            # database connection
                └── config /        # app configuration
        

---

## Authentication Flow

### Register

User submits registration form  
→ Server validates input  
→ Password is hashed using bcrypt  
→ User is saved in the database  

![Preview](./assets/register-page.png)

---

### Login

User submits credentials  
→ Server verifies user existence  
→ Password is compared using bcrypt  
→ JWT token is generated and returned  

![Preview](./assets/login-page.png)
---

### Protected Routes

Client sends request with JWT  
→ Middleware verifies token  
→ If valid, request continues  
→ If not, access is denied  

![preview](./assets/dashboard-page.png)

## Security

- Passwords are hashed using bcrypt
- Sensitive data (password_hash) is never returned to the client
- Protected routes require a valid JWT
- Basic input validation is implemented
- Regex email format check

## Installation

Clone the repository:

    git clone https://github.com/yourusername/user-form-project.git

Install dependencies:

    npm install

Run the server:

    npm start


## Future Improvements

- Implement advanced validation (e.g. Joi / Zod)
- Add refresh token mechanism
- Rate limiter
- Coockies (httpOnly)
- Improve error handling with centralized middleware
- Add role-based authorization (admin / user)
- Migrate token storage to httpOnly cookies for better security