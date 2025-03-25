# 🐶 Fetch Dog Matcher

Find your perfect pup companion with Fetch Dog Matcher — a sleek, responsive, and accessible React application built to complete the Fetch Rewards frontend code challenge.

## ✨ Features

- 🔐 **Authentication** with persistent login using cookies and localStorage
- ❤️ **Favorites** system with real-time toggling and localStorage persistence
- 🐾 **Dog Browser** with filtering, sorting, and pagination
- 💘 **Match Generator** that selects a perfect match from your favorites
- 🎨 **Clean UI** with thoughtful accessibility and responsive design
- 🧠 **Context API** for global state management
- ↻ **Protected Routes** to guard authenticated views
- ⚙️ **Custom API utility** with Axios and `withCredentials` support

## 🧱 Tech Stack

- [React](https://reactjs.org/)
- [React Router](https://reactrouter.com/)
- [Axios](https://axios-http.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [CSS Modules / Custom Styling](https://developer.mozilla.org/en-US/docs/Web/CSS)

## 🚀 Getting Started

### Prerequisites

- Node 18 or higher (note: not compatible with Node 19)
- npm or pnpm

### Installation

```bash
# clone the repo
git clone https://github.com/your-username/fetch-dog-matcher.git
cd fetch-dog-matcher

# install dependencies
npm install
```

### Running the App

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view the app in your browser.

## 🔍 Project Structure

```
src/
├── api/               # Axios instance setup
├── components/        # Reusable UI components
├── context/           # Auth and Favorites context providers
├── pages/             # Login and Search pages
├── types/             # TypeScript types
├── App.tsx            # Route structure
├── main.tsx           # Entry point
```

## 📦 API Reference

All endpoints hit the [Fetch Rewards Take-Home API](https://frontend-take-home-service.fetch.com). All requests are authenticated and require `withCredentials: true`.

Examples:

```ts
POST /auth/login
GET /dogs
GET /dogs/{id}
GET /dogs/search
```

## 🔐 Authentication Flow

- Users login with name + email via `/auth/login`
- Session is maintained via cookies
- `AuthContext` checks login state on app load
- Protected routes redirect unauthenticated users to `/`

## 💾 Favorites Persistence

- `FavoritesContext` stores and syncs favorite dogs
- State is restored on page refresh via `localStorage`
- You can add/remove dogs and persist your match list

## 💘 Match Generator

When you click “Find My Match”, the app will:

1. Send your current favorites to `/dogs/match`
2. Display your lucky match with a fancy card

> *Note: Testing requires Node 18+ and appropriate config setup.*

## 🪄 Stretch Goals & Ideas

- User profile page with match history
- Breed description tooltips
- Animated match reveal
- Light/dark theme toggle
