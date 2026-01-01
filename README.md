# Casa Booking MERN Project

This is a full-stack villa booking application built with the MERN stack (MongoDB, Express.js, React, Node.js).

## Project Structure

```
new Casa/
├── backend/      # Node.js + Express REST API
│   ├── controllers/   # Route controllers
│   ├── models/        # Mongoose models
│   ├── routes/        # API routes
│   ├── server.js      # Main server file
│   ├── seed.js        # Seed data script
│   └── ...
├── frontend/     # React + Vite client app
│   ├── src/           # React source code
│   ├── public/        # Static assets
│   ├── index.html     # Main HTML file
│   └── ...
```

## Features
- Villa listing and booking
- Date picker for reservations
- RESTful API for bookings and villas
- Modern UI with Tailwind CSS
- Responsive design

## Getting Started

### Prerequisites
- Node.js & npm
- MongoDB (local or Atlas)

### Backend Setup
1. Navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file with your MongoDB URI:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   PORT=5000
   ```
4. (Optional) Seed the database:
   ```bash
   node seed.js
   ```
5. Start the server:
   ```bash
   node server.js
   ```

### Frontend Setup
1. Navigate to the frontend folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## Usage
- Access the frontend at `http://localhost:5173` (default Vite port)
- Backend API runs at `http://localhost:5000` (default)

## Technologies Used
- **MongoDB**: Database
- **Express.js**: Backend framework
- **React**: Frontend library
- **Node.js**: Server runtime
- **Vite**: Frontend build tool
- **Tailwind CSS**: Styling

## Folder Details
- **backend/controllers/**: API logic for bookings and villas
- **backend/models/**: Mongoose schemas
- **backend/routes/**: API endpoints
- **frontend/src/components/**: Reusable React components
- **frontend/src/pages/**: Main app pages

## License
MIT

## Author
Jeane Diputado
