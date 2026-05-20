# Task Manager App

A full-stack Task Manager Web Application built using FastAPI and React with JWT Authentication.

---

##  Features

### Authentication
- User Registration
- User Login
- JWT Authentication
- Password Hashing using bcrypt

### Task Management
- Create Tasks
- View Tasks
- Update Tasks
- Mark Tasks as Completed
- Delete Tasks

### Frontend
- Modern responsive UI
- Login/Register page
- Dashboard UI
- Task cards with status colors
- Auto login after registration
- Logout functionality

---

##  Tech Stack

### Backend
- FastAPI
- SQLAlchemy
- SQLite
- JWT Authentication
- Pydantic

### Frontend
- React
- Axios

---

##  Project Structure

```bash
TASK_MANAGER/
│
├── backend/
│   ├── app/
│   │   ├── auth.py
│   │   ├── database.py
│   │   ├── main.py
│   │   ├── models.py
│   │   └── schemas.py
│   │
│   ├── venv/
│   ├── requirements.txt
│   ├── .env
│   └── .env.example
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
└── README.md
```

---

#  Backend Setup

##  Navigate to backend

```bash
cd backend
```

##  Create Virtual Environment

### Windows

```bash
python -m venv venv
```

##  Activate Virtual Environment

### Windows

```bash
venv\Scripts\activate
```

##  Install Dependencies

```bash
pip install -r requirements.txt
```

##  Create `.env`

Create a `.env` file inside backend folder:

```env
SECRET_KEY=your_secret_key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

##  Run Backend Server

```bash
uvicorn app.main:app --reload
```

Backend runs on:

```bash
http://127.0.0.1:8000
```

Swagger Docs:

```bash
http://127.0.0.1:8000/docs
```

---

#  Frontend Setup

##  Navigate to frontend

```bash
cd frontend
```

##  Install Dependencies

```bash
npm install
```

##  Start Frontend

```bash
npm start
```

Frontend runs on:

```bash
http://localhost:3000
```

---

#  Authentication Flow

1. User registers
2. Password is hashed using bcrypt
3. User logs in
4. JWT token is generated
5. Token is stored in localStorage
6. Protected requests use Bearer Token authentication

---

#  API Endpoints

## Authentication

| Method | Endpoint | Description |
|---|---|---|
| POST | `/register` | Register User |
| POST | `/login` | Login User |

---

## Tasks

| Method | Endpoint | Description |
|---|---|---|
| POST | `/tasks` | Create Task |
| GET | `/tasks` | Get All Tasks |
| GET | `/tasks/{id}` | Get Single Task |
| PUT | `/tasks/{id}` | Update Task |
| DELETE | `/tasks/{id}` | Delete Task |

---

#  Deployment

## Backend
Deploy backend using:
- Render
- Railway

## Frontend
Deploy frontend using:
- Vercel
- Netlify

---

#  Environment Variables

| Variable | Description |
|---|---|
| SECRET_KEY | JWT Secret Key |
| ALGORITHM | JWT Algorithm |
| ACCESS_TOKEN_EXPIRE_MINUTES | Token Expiry Time |

---
#  Running Tests

## Install pytest dependencies

```bash
pip install pytest httpx
```

## Run Tests

```bash
pytest
```

---

#  Docker Support

## Build Docker Image

```bash
docker build -t task-manager-backend .
```

## Run Docker Container

```bash
docker run -p 8000:8000 task-manager-backend
```

Backend will run at:

```bash
http://127.0.0.1:8000
```

---

#  Live Deployment

## Frontend Deployment

Vercel:
```text
https://task-manager-app-kappa-plum.vercel.app/
```

## Backend Deployment

Render:
```text
https://task-manager-backend-9di4.onrender.com
```

## Swagger API Docs

```text
https://task-manager-backend-9di4.onrender.com/docs
```

---

#  Responsive UI

The frontend UI is responsive and supports:
- Desktop devices
- Tablet devices
- Mobile devices

---

#  Security Features

- JWT Authentication
- Password hashing using bcrypt
- Protected API routes
- Environment variable support
- User-specific task access

---

#  Additional Features

- Auto login after registration
- Edit task functionality
- Complete task functionality
- Logout functionality
- Pagination support
- Task filtering support

#  Future Improvements

- Task search functionality
- Dark mode
- Task categories
- Due dates
- Docker support
- Pytest integration

---

# Author

Developed by Dharikashree Karthikeyan
