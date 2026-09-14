# 🏠 Propify - MERN Property Listing Application

A full-stack real estate property listing application built using the MERN stack.

Propify allows users to create, view, update, search, filter, and delete property listings through a modern responsive interface.

This project was built to demonstrate full-stack development skills including React frontend development, REST API design, MongoDB database integration, and CRUD operations.

---

## 🚀 Live Demo

Coming soon.

---

## 📸 Screenshots

Coming soon.

---

# ✨ Features

## Property Management

✅ Create new properties  
✅ View all properties  
✅ View property details  
✅ Update existing properties  
✅ Delete properties with confirmation modal  

## Search & Filtering

✅ Search properties by keyword  
✅ Filter property listings  
✅ Dynamic property results  

## User Experience

✅ Responsive design  
✅ Loading states  
✅ Error handling  
✅ Toast notifications  
✅ Form validation  
✅ Image URL preview validation  
✅ Custom confirmation modal  

---

# 🛠️ Tech Stack

## Frontend

- React.js
- React Router
- Axios
- Vite
- CSS3

## Backend

- Node.js
- Express.js
- REST API

## Database

- MongoDB
- Mongoose

## Development Tools

- Git
- GitHub
- VS Code

---

# 📂 Project Structure
propify-property-listing
├── client │   ├── src │   │   ├── components │   │   │   ├── ConfirmModal.jsx │   │   │   ├── Loading.jsx │   │   │   ├── Navbar.jsx │   │   │   ├── PropertyCard.jsx │   │   │   ├── PropertyForm.jsx │   │   │   ├── SearchFilter.jsx │   │   │   └── Toast.jsx │   │   │ │   │   ├── pages │   │   │   ├── Home.jsx │   │   │   ├── AddProperty.jsx │   │   │   ├── EditProperty.jsx │   │   │   ├── PropertyDetails.jsx │   │   │   └── NotFound.jsx │   │   │ │   │   └── services │   │       ├── api.js │   │       └── propertyService.js │ └── server ├── config │   └── db.js │ ├── controllers │   └── propertyController.js │ ├── models │   └── property.js │ ├── routes │   └── propertyRoutes.js │ └── server.js

---

# ⚙️ Installation & Setup

## Clone Repository

```bash
git clone https://github.com/Jamal4dev/propify-property-listing.git

cd propify-property-listing
Backend Setup
Navigate into server:
cd server
Install dependencies:
npm install
Create a .env file:
PORT=5000
MONGO_URI=your_mongodb_connection_string
Start backend:
Development:
npm run dev
Production:
npm start
Backend runs on:
http://localhost:5000
Frontend Setup
Open another terminal:
cd client
Install dependencies:
npm install
Create .env:
VITE_API_URL=http://localhost:5000/api/properties
Start frontend:
npm run dev
Frontend runs on:
http://localhost:5173
🔌 API Endpoints
Base URL:
/api/properties
Method
Endpoint
Description
GET
/api/properties
Get all properties
GET
/api/properties/:id
Get single property
POST
/api/properties
Create property
PUT
/api/properties/:id
Update property
DELETE
/api/properties/:id
Delete property
🧪 Validation
The application includes:
Required field validation
Price validation
Description length validation
Image URL validation
API error handling
🔮 Future Improvements
Planned features:
User authentication
Property ownership
Image uploads with Cloudinary
Favorites system
Advanced filtering
Pagination
Admin dashboard
Deployment with CI/CD
👨‍💻 Author
Samuel Ayomide Adeniyi
Frontend Developer | MERN Stack Developer
GitHub:
https://github.com/Jamal4dev⁠�
⭐ If you found this project useful, consider giving it a star.