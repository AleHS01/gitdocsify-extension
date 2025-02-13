# GitDocsify Extension ✨🚀

AI-powered browser extension to elevate README files into professional-grade, user-friendly documentation for your GitHub projects. 📚

> [!NOTE]
> This browser extension is currently under development

## Table of Contents

1. [Tech Stack 🛠️](#tech-stack)
   - [Frontend 💻](#frontend)
   - [Backend ⚙️](#backend)
2. [Other Libraries & Dependencies 📚](#other-libraries--dependencies)
3. [Prerequisites ✅](#prerequisites)
   - [Installation Process 📦](#installation-process)
4. [Setup ⚙️](#setup)
   - [Docker Setup 🐳](#docker-setup)
   - [Frontend Setup & App Run 🚀](#frontend-setup--app-run)
   - [Backend Setup & Server Run 🌐](#backend-setup--server-run)
6. [File Structure 🏗](#file-structure)

<h2 id="tech-stack">Tech Stack 🛠️</h2>

<h3 id="frontend">Frontend 💻</h3>

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)

<h3 id="backend">Backend ⚙️</h3>

![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi)
![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)
![Poetry](https://img.shields.io/badge/Poetry-%233B82F6.svg?style=for-the-badge&logo=poetry&logoColor=0B3D8D)


<h2 id="other-libraries--dependencies">Other Libraries & Dependencies 📚</h2>

- @primer/react
- Uvicorn

<h2 id="prerequisites">Prerequisites ✅</h2>

Install **brew**. Install anything below **brew**, through **brew**.
- [docker](https://www.docker.com/get-started/) (install docker desktop app for your OS)
- [brew](https://brew.sh/)
- [python](https://www.python.org)
- [node.js](https://nodejs.org/en)


<details>
  <summary><h3 id="installation-process">Installation Process 📦</h3></summary>
  
  #### Install brew
  
  ```bash
  
  bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
  
  ```
  
  #### Install Python
  
  ```bash
  brew install python
  ```
  
  #### Install Node.js
  ```bash
  brew install node
  ```
   #### Check docker Version
  ```bash
  docker --version
  ```
  #### Check Python 3 and Pip Version
  ```bash
  python3 --version
  pip3 --version
  ```
  #### Check Node.js Version
  ```bash
  node --version
  ```
</details>

---

<h2 id="setup">Setup ⚙️</h2>

- Clone the repository:

```bash
git clone https://github.com/AleHS01/gitdocsify-extension.git
cd gitdocsify-extension
```

<details>
  <summary><h3 id="docker-setup">Docker Setup 🐳</h3></summary>
To run the entire project with Docker, follow these steps:
   
1. Make sure you have Docker installed:
   - [Install Docker](https://www.docker.com/get-started/)
   - Check Docker Version:
     ```bash
     docker --version
     ``` 

2.  Build the containers:
```bash
docker compose build
```

3. Start the containers:
```bash
docker compose up
```
- Both the frontend and backend services are going to be running:
   - Frontend will be accessible at  `http://localhost:5173`
   - Backend will be accessibl at `http://localhost:8000`
4. Stop the containers:
```bash
docker compose down
```
</details>

> [!IMPORTANT]
> Docker automatically builds the containers and sets up the environment for both the frontend and backend, eliminating the need for manual setup.
>> If you prefer to manually set up the frontend or backend, follow the steps below:

<details>
  <summary><h3 id="frontend-setup--app-run">Frontend Setup & App Run 🚀</h3></summary>

1. Navigate to the frontend directory
```bash
cd frontend
```
2. Install Node dependencies
```bash
npm install
```

3. Copy the `.env.example` file to `.env`:
```bash
cp .env.example .env
```

4. Update the `.env` file with your environment variables:
```bash
VITE_SUPABASE_URL= your_supabase_url
VITE_SUPABASE_KEY= your_supabase_key
VITE_FRONTEND_URl= your_frontend_local_url or your_frontend_production_url
```

5. Run Vite development server
```bash
npm run dev
```
6. React app at: http://localhost:5173/

</details>

<details>
  <summary><h3 id="backend-setup--server-run">Backend Setup & Server Run 🌐</h3></summary>
  
1. Install Poetry (Python package manager):
```bash
# Using pip3
pip3 install poetry
# Or using Homebrew
brew install poetry
```

2. Navigate to the backend directory from `gitdocsify-extension` directory
```bash
cd backend
```

3. Install dependecies Python using Poetry
```bash
poetry install
```

4. Copy the `.env.example` file to `.env`:
```bash
cp .env.example .env
```

5. Update the `.env` file with your environment variables:
```bash
SUPABASE_URL= your_supabase_url
SUPABASE_KEY= your_supabase_key
PYTHON_ENV= production or development
```

6. Run the FastAPI app using Uvicorn
```bash
# Navigate to directory where main.py is located
cd src/app

# Run FastAPI server with auto reload when changes are saved
uvicorn main:app --reload
```
7. FastAPI backend server at http://localhost:8000.
</details>

<h2 id="file-structure">🏗 File Structure </h2>

```bash
/gitdocsify-extension
│
├── /backend                       # Backend application (FastAPI)
│   ├── poetry.lock               # Poetry lock file (dependency versions)
│   ├── pyproject.toml            # Poetry project configuration
│   ├── .env                      # Enviromental Variables
│   ├── dockerfile                # Backend container image
│   ├── /src                       # Source code for the backend
│   │   └── /app                   # Main backend app directory
│   │       ├── __init__.py       # Initializes the app module
│   │       ├── /api               # API-related code
│   │       │   └── __init__.py   # Initializes the API module
│   │       ├── /core              # Core functionalities, e.g., database or service connections
│   │       │   └── supabase.py   # Supabase-related functionality
│   │       ├── main.py           # FastAPI app instance
│   │       ├── /models            # Models for database interactions
│   │       └── /schemas           # Pydantic schemas for validation
│   └── /test                      # Tests for the backend
│       └── __init__.py           # Initializes test module
│
├── /frontend                      # Frontend application (React with Vite)
│    ├── /build                     # Build output directory (generated on build)
│    │   ├── assets                # Static assets (e.g., JS and CSS files)
│    │   ├── index.html            # Entry HTML file for the frontend
│    │   ├── manifest.json         # Metadata for PWA setup & Extension configuration
│    ├── eslint.config.js           # ESLint configuration file
│    ├── index.html                # HTML entry file for the frontend
│    ├── .env                      # Enviromental Variables
│    ├── dockerfile                # Frontend container image
│    ├── package-lock.json         # Lock file for npm dependencies
│    ├── package.json              # Package configuration for the frontend
│    ├── /public                    # Public directory (assets and metadata)
│    │   ├── manifest.json         # Manifest for the frontend app (PWA setup) & Extension configuration
│    ├── /src                        # Source code for the frontend
│    │   ├── App.css               # Main CSS file for the React app
│    │   ├── App.tsx               # Main React component (App)
│    │   ├── /assets                # Static assets for the app
│    │   ├── /components            # Reusable UI components
│    │   │   └── ColorModeSwitcher.tsx # Component for theme switching
│    │   ├── /context               # React Context for app-wide state
│    │   │   └── UserContext.tsx    # User context for managing user state
│    │   ├── index.css             # Global CSS file
│    │   ├── /lib                   # Utility functions or libraries
│    │   │   └── supabase.ts        # Supabase-related utilities
│    │   ├── main.tsx              # Main entry file for React app
│    │   ├── /pages                 # Page components (views)
│    │   │   └── Login.tsx         # Login page component
│    │   │   └── Dashboard.tsx         # User Dashboard page
│    │   │   └── LoginScreen.tsx         # Loading component
│    │   ├── /types                 # TypeScript types for the app
│    │   │   └── user.ts           # User type definition
│    │   ├── /utils                 # TypeScript types for the app
│    │   │   └── ProtectedRoutes.tsx  # Protected Routes Wrapper
│    └── vite.config.ts            # Vite configuration file for bundling
├── docker-compose.yml             #Multi-container Docker setup
├── .dockerignore                 # Excluded files from Docker
├── README.md                    # Project documentation (root level)
└── .gitignore                   # Git ignore file
```
