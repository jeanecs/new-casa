
# Casa Booking MERN Project

This is a full-stack villa booking application built with the MERN stack (MongoDB, Express.js, React, Node.js).

## Recent Updates

- **Rate Limiting:** Added express-rate-limit with Redis (Upstash) for distributed rate limiting. Booking endpoints are limited to 5 requests every 10 seconds.
- **Redis Integration:** Backend uses Upstash Redis for rate limiting.
- **Body Parsing:** Ensured express.json() middleware is used for proper request body parsing.
- **Error Fixes:** Addressed issues with missing dependencies and request body handling.
- **Authentication:** Added admin authentication for protected routes and admin actions.
- **Cookie & Session Handling:** Backend now uses httpOnly cookies for admin authentication. CORS and cookie-parser are configured for secure cross-origin requests.
- **Protected Routes:** Admin dashboard and sensitive endpoints are protected both on the backend (middleware) and frontend (React protected route/component).

## Project Structure

```
new Casa/
├── backend/      # Node.js + Express REST API
│   ├── controllers/   # Route controllers
│   ├── models/        # Mongoose models
│   ├── routes/        # API routes
│   ├── middleware/    # Custom middleware (rate limiting, authentication, etc.)
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
- Admin authentication with JWT & httpOnly cookies
- Protected admin dashboard and API endpoints

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
3. Create a `.env` file with your environment variables:
   ```env
   MONGO_URI=your_mongodb_connection_string
   REDIS_URL=your_upstash_redis_url
   PORT=5000
   ADMIN_EMAIL=your_admin_email
   ADMIN_PASSWORD=your_admin_password
   ```
   - **MONGO_URI**: Your MongoDB connection string
   - **REDIS_URL**: Your Upstash Redis connection string
   - **PORT**: Port for backend server (default: 5000)
   - **ADMIN_EMAIL/ADMIN_PASSWORD**: Credentials for admin authentication
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
- **backend/controllers/**: API logic for bookings, villas, and admin
- **backend/models/**: Mongoose schemas (Admin, Booking, Villa)
- **backend/routes/**: API endpoints (including adminRoutes for authentication)
- **backend/middleware/**: Custom middleware (rate limiting, authentication, cookie/session handling)
- **frontend/src/components/**: Reusable React components (including ProtectedRoute for admin pages)
- **frontend/src/pages/**: Main app pages (AdminLogin, AdminDashboard, etc.)

## License
MIT

## Author
Jeane Diputado
