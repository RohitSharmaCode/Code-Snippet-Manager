Real-Time Collaborative Editor

A full-stack "ONLINE CODE EDITOR " web application that allows multiple users to edit and write code in different languages like C++, Python, collaboratively, 
Built using  React, Node.js, Express, Socket.io, and MongoDB.


 FEATURES
 
✅ Real-time collaborative editing using Socket.IO

✅ Rich text formatting using Quill.js

✅ Document persistence using MongoDB

✅ Unique document URLs for easy sharing

✅ Clean, responsive frontend UI built with React

🛠️ Technologies Used

Frontend
   React.js

   Quill.js

   Axios

   React Router

   Backend

   Node.js

   Express.js

   Socket.IO

   MongoDB with Mongoose

🔧 How to Run the Project

Make sure you have Node.js, npm, and MongoDB installed on your system.

1. Clone the repository

   git clone https://github.com/<your-username>/DocumentEditor.git
   cd DocumentEditor

2. Setup Backend

   cd collab-editor

   npm install

   Create a .env file inside collab-editor/ and add your MongoDB URI:


   MONGO_URL=mongodb://localhost:27017/document-editor
   PORT=5000

   Start the backend server:

   npm start/npm node index.js/npx nodemon index.js/server

3. Setup Frontend

In a new (2nd )terminal:

   cd frontend
   npm install
   npm start
Your app will be available at:
http://localhost:3000

🌐 Accessing the Editor
Open your browser and go to: http://localhost:3000


📦 Environment Variables
    Variable	Description
    MONGO_URL	MongoDB connection string
    PORT	Backend server port (default: 5000)


🙋‍♂️ Author
    Aryan Raj
    Email:raj981176@gmail.com
📍 Gaya, Bihar | 🏫 MAIT (2022–26)

