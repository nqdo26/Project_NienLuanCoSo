SHOES SHOP REACT WEBAPP

A full-stack application combining a Node.js/Express backend and a React/CRA frontend. The system manages CRUD operations for shoes, user authentication, favorites, and shopping functionality.

## Features
- User registration/login (JWT-based authentication).  
- Product management (create, read, update, delete shoes).  
- Favorite list handling and shopping functionality.  
- Category-based product listings (e.g., Nike, Jordan).

## Technologies
- **Backend**: Node.js, Express, Mongoose, JWT, bcrypt.  
- **Frontend**: React (Create React App), Ant Design, Axios, React Router.  
- **Database**: MongoDB.  
- **Environment**: [`BackEnd/.env`] and [`FrontEnd/.env`].

## Project Structure
- [`package.json`] – Main project file.  
- **BackEnd** – Contains Node.js backend with:  
  - `src/server.js` – Express server entry point.  
  - `src/config/database.js` – MongoDB connection.  
  - `src/controllers/userController.js` – User-related controllers.  
  - `src/services/userService.js` – User logic (e.g., `createUserService`).  
  - `src/routes/api.js` – Main API routes.  
- **FrontEnd** – React frontend with:  
  - `src/index.js` – Main React entry.  
  - `src/pages` – Page components (e.g., `Nike`, `Products`).  
  - `src/components` – Shared components (e.g., `Layout/components/Header`).  
  - `src/utils/api.js` – Axios calls (e.g., `getListShoesApi`, `addFavouriteApi`).

## Setup Instructions
1. **Clone** the repository.  
2. **Install backend dependencies**:  
   cd BackEnd
   npm install
   npm run dev
3. **Install frontemd dependencies**:  
    cd ../FrontEnd
    npm install
    npm start