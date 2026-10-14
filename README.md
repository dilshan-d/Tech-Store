# Tech Store E-Commerce Platform
A modern, full-stack tech-focused e-commerce application designed for browsing, buying, and managing electronic devices. This platform consists of a single-page React frontend built with Vite and Tailwind CSS v4, and a RESTful backend built with Node.js, Express, and MongoDB.
---
## 🚀 Features
### 🛒 Customer Interface
- **User Authentication**: Secure registration and login using JSON Web Tokens (JWT) and hashed passwords (bcrypt).
- **Product Catalog**: Clean and responsive landing/homepages showing categories and trending products, plus an interactive product overview page.
- **Product Search & Filters**: Search products by name and filter by categories.
- **Shopping Cart**: Real-time product addition/removal and quantity updates stored locally.
- **Checkout Process**: Detailed order form with shipping details, validation, and real-time total calculations.
- **Order Tracking**: Customers can check their purchase history on the "My Orders" page.
### 🛠️ Admin Dashboard
- **Product Management (CRUD)**: Authorized admins can add new products, edit product information, or delete products.
- **Media Upload**: Integration with **Supabase Storage** for uploading high-quality product images directly.
- **Order Management**: View and filter customer orders using pagination, with the ability to update order statuses (e.g., *Pending*, *Completed*) and append internal notes.
---
## 💻 Tech Stack
### Frontend
- **Framework**: React 19 (JavaScript)
- **Build Tool**: Vite
- **Styling**: Tailwind CSS v4
- **Routing**: React Router Dom
- **State & Storage**: Local Storage / React States
- **HTTP Client**: Axios
- **Database/Storage (Media Uploads)**: `@supabase/supabase-js` (to upload files to bucket)
- **UI Notifications**: React Hot Toast & React Icons
### Backend
- **Runtime Environment**: Node.js
- **Web Framework**: Express (v5)
- **Database Wrapper**: Mongoose / MongoDB
- **Security & Auth**: JSON Web Tokens (JWT) & Bcrypt
- **Environment**: Dotenv
- **Server Reloading**: Nodemon
---
## 📂 Project Structure
```text
Tech-Store/
├── Backend/                 # Express Server & DB schemas
│   ├── Controllers/         # Request handling logic (Order, Product, User)
│   ├── middlewares/         # JWT Authentication middleware
│   ├── models/              # Mongoose database schemas (User, Product, Order)
│   ├── Routers/             # Express API routes definition
│   ├── .env                 # Backend local environment config
│   ├── index.js             # Express entry point
│   └── package.json
│
└── Frontend/                # Vite React Application
    ├── public/              # Static files
    ├── src/
    │   ├── components/      # Reusable UI components (header, productCard, modals)
    │   ├── pages/           # Application views (Checkout, Orders, Admin panels)
    │   ├── utils/           # Utility functions (api configuration, cart logic, media upload)
    │   ├── App.jsx          # Route declarations & primary layout
    │   └── main.jsx         # App mounting
    ├── .env                 # Frontend local environment config
    └── package.json
```
---
## 🛠️ Getting Started
### Prerequisites
- [Node.js](https://nodejs.org/en/) installed on your machine.
- [MongoDB](https://www.mongodb.com/) instance running locally or on MongoDB Atlas.
- A [Supabase](https://supabase.com/) project set up with an active public bucket named `"images"` for product uploads.
---
### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd Backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `Backend/` directory and configure the environment variables:
   ```env
   MONGO_URI="mongodb://localhost:27017/schoolDB"
   JWT_SECRET="yourSecretJWTKey"
   ```
   *(Ensure your database URI and JWT secret match your local/production configuration.)*
4. Run the development server:
   ```bash
   npm start
   ```
   The backend server should run on [http://localhost:3000](http://localhost:3000).
---
### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd ../Frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `Frontend/` directory and define the backend API endpoint URL:
   ```env
   VITE_API_URL=http://localhost:3000/api
   ```
4. Run the frontend development server:
   ```bash
   npm run dev
   ```
   The application will mount locally (typically on [http://localhost:5173](http://localhost:5173)).
---
## 🔌 API Endpoints Reference
### User Routes (`/api/users`)
- `POST /` — Register a new customer.
- `POST /login` — Authenticate user and obtain a JWT bearer token.
- `GET /profile` — Retrieve information of the currently authenticated user.
### Product Routes (`/api/products`)
- `GET /` — Fetch list of all products.
- `GET /:productID` — Fetch details of a specific product.
- `POST /` — Create a new product *(Admin authorization required)*.
- `PUT /:productID` — Update product details *(Admin authorization required)*.
- `DELETE /:productID` — Delete a product *(Admin authorization required)*.
### Order Routes (`/api/orders`)
- `POST /` — Place a new customer order.
- `GET /:pageSize/:pageNumber` — Retrieve a paginated list of orders (returns authenticated user orders or all orders if Admin).
- `PUT /:orderId` — Update order status and notes *(Admin authorization required)*.
---
## 🔒 Security & Middleware
The Backend includes a global authentication middleware ([authenticateUser](file:///c:/Users/LENOVO/OneDrive/Desktop/Projects/Tech-Store/Backend/middlewares/authentication.js)) which parses the authorization header format (`Authorization: Bearer <token>`). Controller actions manually check user authorization roles where admin-only security is required.
