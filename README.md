# BuildTogether - Student Project Collaboration Platform

BuildTogether is a modern web application designed for university students to discover project ideas, match with peers based on skills, and track progress together.

## ✨ Features

- **Project Discovery**: Explore student projects across various categories (Education, Campus Life, Health & Fitness, etc.).
- **Teammate Matching**: Find peers with skills in React, Python, UI/UX, Node.js, and more.
- **Bookmarks & Saved Projects (Redux Toolkit)**: Real-time global bookmarking system powered by Redux Toolkit (`createSlice`, `useDispatch`, `useSelector`) with live badge counters in the navigation bar.
- **Project Creation**: Create projects with team size, tech stack, goal, and required skills.
- **Task Management & Progress**: Interactive workspace with real-time dynamic progress calculation.
- **Authentication**:
  - Secure login & sign up with email and password.
  - Indian mobile number (10 digits) validation (`6-9` starting digits).
  - Name sanitization (numbers disallowed).
  - Password show/hide toggle.
  - Interactive password reset modal.
  - Social quick sign-in options.

## 🛠️ Tech Stack

- **Frontend**: React 18
- **State Management**: Redux Toolkit (`@reduxjs/toolkit` & `react-redux`) & React Context API
- **Build Tool**: Vite
- **Routing**: React Router DOM v6
- **Icons**: Lucide React
- **Styling**: Modern CSS with CSS Variables & Responsive Design
- **Persistent Storage**: Browser `localStorage`

## 🚀 Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/<your-username>/<your-repo-name>.git
   cd <your-repo-name>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and visit:
   ```text
   http://localhost:5173/
   ```

## 📜 Available Scripts

- `npm run dev`: Runs the local development server.
- `npm run build`: Compiles and bundles the production app.
- `npm run preview`: Previews the production build locally.
