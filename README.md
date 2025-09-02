# ButtonClicker

A simple **React** + **Node.js** project where users can log in, click a button, and track their click counts.

- **Frontend**: React (hosted on Firebase Hosting)
- **Backend**: Node.js + Express (hosted on Google Cloud Run)
- **Authentication**: Firebase Auth
- **Database**: Firestore

## Live URLS

1. [Frontend](https://button-clicker-3af86.web.app/)
2. [Backend](https://click-backend-1059114516260.us-central1.run.app/)

## Table of Contents

1. [Features](#features)
2. [Project Structure](#project-structure)
3. [Setup and Installation](#setup-and-installation)
4. [Environment Variables](#environment-variables)
5. [API Endpoints](#api-endpoints)

## Features

- User registration and login via Firebase Auth
- Click counter per user stored in Firestore
- Frontend hosted on Firebase Hosting
- Backend API hosted on Google Cloud Run

## Project Structure

```
ButtonClicker/
|   README.md
|   .gitignore
├─  client/
|   ├─   public/
|   ├─   src/
|   |   |   App.jsx
|   |   |   App.css
|   |   |   firebase.js
|   |   |   ...
|   |   index.html
|   |   ...
├─  server/
|   |   Dockerfile
|   |   index.js
|   |   ...
```

## Setup and Installation

1. Clone the repository

```bash
git clone https://github.com/balm33/Button-Clicker.git
cd Button-Clicker
```

2. Install dependencies

### Frontend

```bash
cd client
npm install
```

### Backend

```bash
cd ../server
npm install
```

## Environment Variables

### Backend (server/)

| Variable                      | Description                               |
| ----------------------------- | ----------------------------------------- |
| FIREBASE_SERVICE_ACCOUNT_JSON | Firebase service account json             |
| PORT                          | Port the server listens on (default 8080) |

### Frontend (client/)

If needed, define API url to where the backend is hosted

> VITE_BACKEND_URL=XXXXX

## Running Locally

### Backend

```bash
cd server
node index.js
```

### Frontend

```bash
cd client
npm run dev
```

Visit http://localhost:5173

## API Endpoints

### POST /click

- Body: `{uid: string}`
- Increments the number of clicks by one

### GET /click/:uid

- Returns a user's current click count
- Response: `{count: number}`
