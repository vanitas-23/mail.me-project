# 📧 mail.me-project

**mail.me-project** is a full-stack email management system that allows users to authenticate, manage, and interact with emails efficiently. The project is built using **React** for the frontend and **Node.js with Express and MongoDB** for the backend.

---

## 🚀 Features

- **User Authentication**: Secure signup and login system.
- **Email Management**: Fetch and display user-specific emails.
- **Template System**: Default email templates are created upon user registration, with the ability to add custom templates.
- **Responsive UI**: Built with React for a seamless user experience.

---

## 🛠 Tech Stack

### Frontend:
- React.js
- Tailwind CSS (for styling)
- Axios (for API requests)

### Backend:
- Node.js
- Express.js
- MongoDB (Mongoose for ORM)
- JWT (for authentication)

---

## 💂️ Project Structure

```
mail.me-project/
│── backend/           # Express server handling API requests
│   ├── routes/        # API route definitions
│   ├── models/        # Mongoose schemas
│   ├── middleware/    # Authentication & other middleware
│   ├── config/        # Configuration files
│   ├── controllers/   # Business logic handling
│   ├── server.js      # Entry point for backend
│
│── frontend/          # React-based UI
│   ├── src/
│   │   ├── components/ # Reusable React components
│   │   ├── pages/      # Page-based structure
│   │   ├── App.js      # Main application entry
│   │   ├── index.js    # ReactDOM rendering
│
│── README.md          # Documentation
│── package.json       # Project dependencies
│── .gitignore         # Ignored files for Git
```

---

## 🚀 Getting Started

### 1⃣ Clone the Repository
```sh
git clone https://github.com/vanitas-23/mail.me-project.git
cd mail.me-project
```

### 2⃣ Install Dependencies
#### Backend:
```sh
cd backend
nodemon
```
#### Frontend:
```sh
cd frontend
npm run dev
```

### 3⃣ Set Up Environment Variables
Create a `.env` file in the **backend** directory with the following:
```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5001
```

### 4⃣ Start the Project
#### Run Backend:
```sh
cd backend
npm start
```
#### Run Frontend:
```sh
cd frontend
npm start
```

---

## 💌 API Endpoints

### Authentication
- `POST /api/auth/signup` - Register a new user
- `POST /api/auth/login` - Authenticate and get token

### Emails
- `GET /api/emails/getemails` - Fetch user-specific emails

### Templates
- `POST /api/templates/create` - Create a new email template

---

