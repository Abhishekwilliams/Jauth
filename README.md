Jauth 🔐

Jauth is a lightweight authentication system built with Node.js and Express, using bcrypt with salting to securely hash user passwords.
It ensures that sensitive information, like passwords, is never stored in plain text in the database.

🚀 Features

Secure user registration with password hashing.

Salted hashing using bcrypt to prevent rainbow table attacks.

User login with password verification against stored hashes.

Easily extensible for features like JWT-based sessions, role-based access, or OAuth.

Protection of user data in the database.

🛠️ Tech Stack

Backend: Node.js, Express.js

Authentication: bcrypt

Database: MongoDB / MySQL (adjust depending on your setup)

Environment Management: dotenv

📂 Project Structure
Jauth/
├── controllers/   # Authentication logic
├── models/        # Database models (User schema)
├── routes/        # API routes (login, register)
├── .env           # Environment variables (ignored in git)
├── .gitignore
├── package.json
└── server.js

⚙️ Installation & Setup

Clone the repository

git clone https://github.com/Abhishekwilliams/Jauth.git
cd Jauth


Install dependencies

npm install


Setup environment variables (create a .env file in the root)

PORT=5000
DB_URI=your_database_connection_string
JWT_SECRET=your_jwt_secret


Run the server

npm start

🔑 Authentication Flow
1. Registration

User submits email + password.

Password is hashed with bcrypt + salt.

Hashed password is stored in the database.

2. Login

User submits credentials.

Password is compared with the stored hash.

If valid, a success response is returned (optionally, generate JWT for sessions).

📜 Example API Endpoints
Register User

POST /register

Request Body

{
  "email": "test@example.com",
  "password": "mypassword123"
}


Controller Example

const bcrypt = require("bcrypt");
const User = require("../models/User");

exports.registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

Login User

POST /login

Request Body

{
  "email": "test@example.com",
  "password": "mypassword123"
}


Controller Example

const bcrypt = require("bcrypt");
const User = require("../models/User");

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    res.status(200).json({ message: "Login successful" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

🧪 Testing the API

Use Postman or cURL:

curl -X POST http://localhost:5000/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"mypassword123"}'

🙌 Contributing

Contributions are welcome!
Feel free to fork this repository, create a new branch, and submit a pull request.
