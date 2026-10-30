# Chirp (`chirp.`) — Real-Time High-Velocity Social Network & Messaging Platform

<p align="center">
  <img src="./screenshots/banner.svg" alt="Chirp Platform Showcase" width="100%" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-17.0.1-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/Express.js-4.17-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express" />
  <img src="https://img.shields.io/badge/MongoDB-Mongoose-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
  <img src="https://img.shields.io/badge/Socket.io-4.0.1-010101?style=for-the-badge&logo=socket.io&logoColor=white" alt="Socket.io" />
  <img src="https://img.shields.io/badge/Redux-7.2.2-764ABC?style=for-the-badge&logo=redux&logoColor=white" alt="Redux" />
</p>

---

## 📌 Overview

**Chirp** (`chirp.`) is an out-of-distribution, unicorn-grade real-time social network and direct messaging platform engineered for creators, engineers, and digital innovators. Designed with an **Obsidian & Electric Mint** design system, high-frequency WebSockets, and sub-second interaction feedback, Chirp delivers an elevated experience comparable to products like Linear, Discord, and Threads.

---

## 📸 Application Interface & Previews

<div align="center">

| Authentication Billboard | User Profile & Verified Badges |
| :---: | :---: |
| <img src="./screenshots/login.svg" width="450"/> | <img src="./screenshots/profile.svg" width="450"/> |

| Real-Time Messenger | Admin Intelligence Console |
| :---: | :---: |
| <img src="./screenshots/chat.svg" width="450"/> | <img src="./screenshots/admin.svg" width="450"/> |

</div>

---

## ✨ Features & Capabilities

### ⚡ Chirp Feed & Creator Studio
- **High-Velocity Composer:** Instant publishing with multimedia carousels, camera streaming capture, code/tag snippets, and markdown styling.
- **Dynamic Interactions:** Spring-animated likes, bookmarking to private vaults, and full-resolution image galleries.
- **Threaded Discussions:** Nested, real-time replies with instant optimistic updates and dedicated action controls.
- **Explore & Categorization:** Topic filtering pills across *Trending*, *Tech & Code*, *Visual Arts*, and *Thoughts & Drops*.

### 💬 Direct Messaging & Real-Time Presence
- **Socket.io Streaming:** Sub-15ms latency 1-on-1 messaging with live read receipts and online presence dots.
- **Audio & In-App Alerts:** Dynamic notifications with toggles and sound effects.

### 🎨 Design System & Aesthetics
- **Dual-Mode Obsidian Architecture:** Deep Obsidian (`#080B11`) ground paired with Electric Mint (`#00E599`) and Electric Iris (`#6366F1`) accents.
- **Accessible Typography:** Powered by `Plus Jakarta Sans` with tight tracking floors (`-0.03em`) and high contrast ratios (> 4.5:1).
- **Surface Elevation:** Multi-stop directional shadows, hairline glass borders, custom micro-scrollbars, and full reduced-motion support.

### 🛡️ Admin Moderation & Intelligence Console
- **Platform Analytics:** Real-time metrics tracking registered creators, active chirps, community engagements, and flagged reports.
- **Content Moderation:** Instant spam filtering, flag resolution, and user role management.

---

## 🛠️ Tech Stack & Architecture

| Layer | Technologies |
|---|---|
| **Frontend** | React 17, Redux & Redux Thunk, React Router v5, Plus Jakarta Sans, Bootstrap 5 Grid, Socket.io-client, Axios, Moment.js, Emoji-Mart |
| **Backend** | Node.js, Express.js, Socket.io, Mongoose, JWT (`jsonwebtoken`), bcrypt, cookie-parser, cors |
| **Database** | MongoDB / MongoDB Atlas |
| **Media Hosting** | Cloudinary (Camera and file upload pipeline) |

---

## 🚀 Getting Started

Follow the steps below to run Chirp locally.

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher)
- [MongoDB](https://www.mongodb.com/) (Local instance or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))
- [Cloudinary Account](https://cloudinary.com/) (For media hosting)

---

### 1. Clone the Repository
```bash
git clone https://github.com/Bipinnjoshii/Social-media-chat-app.git
cd Social-media-chat-app
```

---

### 2. Configure Environment Variables
Copy `.env.example` to create your local `.env`:

```bash
cp .env.example .env
```

Set the required environment keys in `.env`:
```env
PORT=8080
MONGODB_URL=mongodb://localhost:27017/chirp
ACCESS_TOKEN_SECRET=your_jwt_access_token_secret
REFRESH_TOKEN_SECRET=your_jwt_refresh_token_secret
```

---

### 3. Install Dependencies & Build

```bash
# Backend dependencies
npm install

# Frontend dependencies & build
cd client
npm install
npm run build
cd ..
```

---

### 4. Run the Application

```bash
# Start backend server
npm start
# or development mode with nodemon:
npm run dev
```

In a second terminal:
```bash
cd client
npm start
```
> Chirp launches at `http://localhost:3000`.

---

## 👤 Author

- **Bipin Joshi** — [@Bipinnjoshii](https://github.com/Bipinnjoshii)
