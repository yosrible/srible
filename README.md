# 📝 Srible Frontend

A **minimalist blogging platform** built with **SvelteKit**, powered by a **Rust backend** and a sleek, modern UI.  
Designed for writers, by developers who value simplicity.

<img src="https://raw.githubusercontent.com/yosrible/srible_frontend/main/circle_logo.png" alt="Srible Logo" width="50"> **Srible**


---

## 📌 Table of Contents

1. [Overview](#-overview)  
2. [Features](#-key-features)  
3. [Design Philosophy](#-design-philosophy)  
4. [Tech Stack](#-tech-stack)  
5. [Getting Started](#-getting-started)  
   - [Frontend (pnpm)](#-frontend-using-pnpm)  
   - [Frontend (Bun)](#-frontend-using-bun)  
   - [Backend (Rust)](#-backend-using-rust)  
6. [Environment Setup](#-environment-variables)  
7. [Contributing](#-contributing)  
8. [License](#-license)  
9. [Contact](#-contact)  

---

## 📖 Overview

**Srible** is a distraction-free platform tailored for writing and publishing content. It features a clean Quill-powered editor, intuitive dashboard, and robust backend, all designed to help writers focus on what matters: **writing**.

---

## ✨ Key Features

- **Clean Minimal UI**  
  Off-white palette `#f8f8f5` and carefully crafted spacing and typography

- **Immersive Writing Experience**  
  Full-width Quill.js-based editor with auto-hiding sidebar

- **Functional Dashboard**  
  Easily navigate through sections:
  - 📘 Overview (Blue)
  - ✍️ Posts (Green)
  - 📊 Analytics (Purple)
  - ⚙️ Settings (Amber)
  - 🎨 Themes (Pink)

- **Mobile Friendly**  
  100% responsive design for all screen sizes

- **Modern Authentication**  
  Login/Signup with Supabase for secure access

- **Analytics Integration**  
  Track performance using Vercel Analytics

---

## 🎨 Design Philosophy

Srible emphasizes focus and elegance:

- 🚫 No clutter, no visual overload  
- ✍️ Focus on content-first writing  
- 📱 Mobile-first UI and intuitive UX  
- 🔤 Typographic clarity and whitespace  
- 🔍 Zero distractions with adaptive UI behavior

---

## 🧰 Tech Stack

| Area       | Technology                 |
|------------|----------------------------|
| Frontend   | [SvelteKit](https://kit.svelte.dev) |
| Styling    | [TailwindCSS](https://tailwindcss.com) |
| Backend    | [Rust (Axum)](https://github.com/tokio-rs/axum), [FastAPI](https://fastapi.tiangolo.com) |
| Editor     | Custom Editor |
| Auth       | [Supabase](https://supabase.com) |
| Analytics  | [Vercel Analytics](https://vercel.com/analytics) |
| Deployment | [Vercel](https://vercel.com) |

---

## ⚙️ Getting Started

Clone the repository:

```bash
git clone https://github.com/yosrible/srible_frontend.git
cd srible_frontend
```

---

## 💻 Frontend (Using `pnpm`)

1. **Install dependencies**  
   ```bash
   pnpm install
   ```

2. **Run the development server**  
   ```bash
   pnpm dev
   ```

3. **Open your browser**  
   Visit: [http://localhost:5173](http://localhost:5173)

### 📦 Build for Production

```bash
pnpm build
```

> Make sure you have `vite.config.ts` and `svelte.config.js` properly configured for production builds.

---

## ⚡ Frontend (Using `Bun`)

1. **Install dependencies**  
   ```bash
   bun install
   ```

2. **Run the development server**  
   ```bash
   bun dev
   ```

3. **Open your browser**  
   Visit: [http://localhost:5173](http://localhost:5173)

### 📦 Build for Production

```bash
bun build
```

> `bun build` works if your `package.json` contains a valid `"build"` script, like `"build": "svelte-kit build"`. Confirm this exists before using Bun for production builds.

---

## 🦀 Backend (Using Rust)

Ensure you have Rust and Cargo installed from [rustup.rs](https://rustup.rs).

1. **Build dependencies**  
   ```bash
   cargo build
   ```

2. **Run the backend server**  
   ```bash
   cargo run
   ```

3. **Open the backend API**  
   Visit: [http://localhost:8000](http://localhost:8000)

### 📦 Build Backend for Production

```bash
cargo build --release
```

> You can run the production build binary from `target/release/<binary_name>`.

---

## 🌐 Environment Variables

Create a `.env` file in the root of the frontend project:

```env
PUBLIC_SUPABASE_URL=your_supabase_project_url
PUBLIC_SUPABASE_ANON_KEY=your_public_anon_key
```

> For security reasons, **never** commit `.env` files to version control.

---

## 🤝 Contributing

We welcome your ideas and improvements!

### 📌 How to Contribute

1. **Fork the repository**  
2. **Create a branch**  
   ```bash
   git checkout -b feature/my-new-feature
   ```
3. **Make your changes**  
4. **Commit and push**  
   ```bash
   git commit -m "Add: new feature"
   git push origin feature/my-new-feature
   ```
5. **Open a Pull Request** 🎉

---

## 📄 License

This project is licensed under the **MIT License**.  
See the [`LICENSE`](./LICENSE) file for more details.

---

## 📬 Contact

- **X (Twitter):** [@yosrible](https://x.com/yosrible)  
- **GitHub Repo:** [github.com/yosrible/srible_frontend](https://github.com/yosrible/srible_frontend)

---
