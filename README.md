<div align="center">
<img src="https://raw.githubusercontent.com/kazedevs/srible/main/Frontend/public/srible-logo.png" width="100" height="100">
</div>

# Srible

A minimalist blogging platform built with React and Rust. Designed for writers who value simplicity and performance.

## Table of Contents

1. [Overview](#overview)
2. [Features](#features)
3. [Tech Stack](#tech-stack)
4. [Getting Started](#getting-started)
   - [Frontend Setup](#frontend-setup)
   - [Backend Setup](#backend-setup)
5. [Environment Variables](#environment-variables)
6. [Development](#development)
7. [Contributing](#contributing)
8. [License](#license)

## Overview

Srible is a modern blogging platform that focuses on simplicity and performance. It provides a clean writing experience with a powerful backend built in Rust for optimal performance.

## Features

- **Modern Authentication**
  Secure login/signup system

- **Rich Text Editor**
  Intuitive writing experience

- **Responsive Design**
  Works on all devices

- **Analytics**
  Track your blog's performance

- **Customizable**
  Personalize your blog's appearance

## Tech Stack

### Frontend
- React 18
- TypeScript
- Material-UI
- Vite
- React Router

### Backend
- Rust
- Actix-Web
- SQLx
- JWT Authentication
- PostgreSQL

## Getting Started

### Prerequisites
- Node.js 18+
- pnpm 8+
- Rust 1.60+
- PostgreSQL 14+

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd Frontend
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Start the development server:
   ```bash
   pnpm dev
   ```

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd Backend
   ```

2. Install dependencies:
   ```bash
   cargo build
   ```

3. Set up your database:
   ```bash
   sqlx database create
   sqlx migrate run
   ```

4. Start the server:
   ```bash
   cargo run
   ```

## Environment Variables

### Frontend
Create a `.env` file in the Frontend directory:
```env
VITE_API_URL=http://localhost:8000
```

### Backend
Create a `.env` file in the Backend directory:
```env
DATABASE_URL=postgres://username:password@localhost/srible
JWT_SECRET=your_jwt_secret
PORT=8000
```

## Development

### Running Tests

Frontend:
```bash
cd Frontend
pnpm test
```

Backend:
```bash
cd Backend
cargo test
```

## Contributing

Contributions are welcome! Please read our [contributing guidelines](CONTRIBUTING.md) before submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Built with ❤️ by the Srible team
