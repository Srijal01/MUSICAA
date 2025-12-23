# 🎸 MUSICAA - Musical Instruments E-Commerce Platform

<div align="center">

![MUSICAA](https://img.shields.io/badge/MUSICAA-E--Commerce-blueviolet?style=for-the-badge)
![Version](https://img.shields.io/badge/version-2.0.0-blue?style=flat-square)
![License](https://img.shields.io/badge/license-MIT-green?style=flat-square)
![Node](https://img.shields.io/badge/node-%3E%3D16.0.0-brightgreen?style=flat-square)
![React](https://img.shields.io/badge/react-18.2.0-61dafb?style=flat-square)

**A modern, full-stack e-commerce platform specialized in musical instruments**

[Features](#-features) • [Tech Stack](#-tech-stack) • [Installation](#-installation) • [Deployment](#-deployment) • [API Docs](#-api-documentation)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Environment Setup](#-environment-setup)
- [Running the Application](#-running-the-application)
- [Deployment](#-deployment)
- [Project Structure](#-project-structure)
- [API Documentation](#-api-documentation)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🎯 Overview

**MUSICAA** is a feature-rich e-commerce platform built with the MERN stack, designed specifically for buying and selling musical instruments. The platform offers a seamless shopping experience with modern UI/UX, real-time notifications, advanced product filtering, wishlist functionality, product comparison, and integrated payment gateways.

### 🌟 What Makes MUSICAA Special?

- **🎨 Modern Dark Theme UI** - Sleek black and gray design with smooth animations
- **⚡ Lightning Fast** - Built with Vite for optimal performance
- **📱 Fully Responsive** - Perfect experience on all devices
- **🔒 Secure** - JWT authentication with password encryption
- **💳 Multiple Payment Options** - eSewa, Khalti, and Cash on Delivery
- **🎯 Feature-Rich** - Wishlist, comparison, reviews, and advanced filters

---

## ✨ Features

### 👥 Customer Features

#### 🔐 Authentication & Security
- Secure user registration and login
- JWT-based authentication
- Password encryption with bcrypt
- OTP-based password recovery
- Persistent sessions

#### 🛍️ Shopping Experience
- **Product Catalog** - Browse extensive collection of musical instruments
- **Advanced Search** - Real-time search with autocomplete
- **Smart Filters** - Filter by category, price, rating, and stock status
- **Product Details** - Detailed product information with multiple images
- **Sorting Options** - Sort by price, rating, newest, and popularity

#### ❤️ Wishlist System
- Save favorite products for later
- Persistent wishlist across sessions
- Quick add/remove functionality
- Easy move to cart

#### 🔍 Product Comparison
- Compare up to 4 products side-by-side
- Detailed feature comparison
- Price and rating analysis
- Specifications overview

#### ⭐ Reviews & Ratings
- Write detailed product reviews
- 5-star rating system
- Read reviews from other customers
- Verified purchase badges
- Edit and delete your reviews

#### 🛒 Shopping Cart
- Add, update, and remove items
- Real-time price calculation
- Quantity management
- Persistent cart storage
- Clear cart option

#### 💳 Checkout & Payments
- Streamlined checkout process
- Multiple payment methods:
  - 💵 Cash on Delivery (COD)
  - 🟢 eSewa Payment Gateway
  - 🔵 Khalti Payment Gateway
- Secure payment processing
- Order confirmation emails

#### 📦 Order Management
- View complete order history
- Track order status
- Order details and invoices
- Reorder functionality

#### 🔔 Notifications
- Beautiful toast notifications
- Success, error, and info alerts
- Real-time feedback
- Non-intrusive design

### 👨‍💼 Admin Features

#### 📊 Dashboard
- Sales overview and analytics
- Revenue statistics
- Order tracking
- Customer insights
- Inventory alerts

#### 📝 Product Management
- Add new products with details
- Edit existing products
- Delete products
- Upload multiple product images
- Manage categories and subcategories
- Stock management
- Pricing controls

#### 🏷️ Category Management
- Create main categories
- Add subcategories
- Organize product hierarchy
- Category-based filtering

#### 📦 Order Management
- View all customer orders
- Update order status
- Process refunds
- Generate invoices
- Track shipments

#### 🖼️ Media Management
- Cloudinary integration
- Image upload and optimization
- Multiple image support
- Automatic resizing
- Secure storage

#### 📈 Analytics
- Total revenue tracking
- Order statistics
- Customer analytics
- Popular products
- Sales trends

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 18.2.0
- **Build Tool**: Vite 5.0.8
- **Routing**: React Router DOM 6.20.0
- **HTTP Client**: Axios 1.6.2
- **Styling**: Tailwind CSS 3.3.6
- **Email**: EmailJS Browser 4.4.1

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js 4.18.2
- **Database**: MongoDB with Mongoose 8.0.0
- **Authentication**: JWT (jsonwebtoken 9.0.2)
- **Password Hashing**: bcryptjs 2.4.3
- **File Upload**: Multer 2.0.2
- **Cloud Storage**: Cloudinary 2.8.0
- **Email**: Nodemailer 7.0.11

### Database
- **Primary Database**: MongoDB Atlas
- **ODM**: Mongoose

### Payment Gateways
- **eSewa** - Nepal's leading payment gateway
- **Khalti** - Digital wallet payment

### DevOps & Deployment
- **Version Control**: Git & GitHub
- **Frontend Hosting**: Vercel
- **Backend Hosting**: Render
- **Database Hosting**: MongoDB Atlas
- **Package Manager**: pnpm

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16.0.0 or higher)
- **pnpm** (v8.0.0 or higher)
- **Git**
- **MongoDB Atlas Account** (or local MongoDB)
- **Cloudinary Account** (for image uploads)

### Optional
- **eSewa Merchant Account** (for eSewa payments)
- **Khalti Merchant Account** (for Khalti payments)

---

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/Srijal01/MUSICAA.git
cd MUSICAA
```

### 2. Install Dependencies

#### Install Backend Dependencies
```bash
cd server
pnpm install
```

#### Install Frontend Dependencies
```bash
cd ../client
pnpm install
```

---

## ⚙️ Environment Setup

### Backend Environment Variables

Create a `.env` file in the `server` directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=your_mongodb_connection_string

# JWT Secret
JWT_SECRET=your_super_secret_jwt_key

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# eSewa Payment Gateway
ESEWA_MERCHANT_ID=your_merchant_id
ESEWA_SECRET=your_secret
ESEWA_SUCCESS_URL=http://localhost:5000/api/payment/esewa/success
ESEWA_FAILURE_URL=http://localhost:5000/api/payment/esewa/failure

# Email Configuration (Optional)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
```

### Frontend Environment Variables

Create a `.env` file in the `client` directory:

```env
# API Configuration
VITE_API_URL=http://localhost:5000/api
```

### Environment Variable Guide

#### MongoDB URI
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster
3. Get your connection string
4. Replace `<password>` with your database password

#### Cloudinary Setup
1. Sign up at [Cloudinary](https://cloudinary.com/)
2. Get your cloud name, API key, and API secret from the dashboard
3. Add to your `.env` file

#### Payment Gateway Setup
- **eSewa**: Contact [eSewa](https://esewa.com.np/) for merchant account

---

## 🏃 Running the Application

### Development Mode

#### 1. Start Backend Server
```bash
cd server
pnpm run dev
```
Server will run on `http://localhost:5000`

#### 2. Start Frontend Development Server
```bash
cd client
pnpm run dev
```
Frontend will run on `http://localhost:5173`

### Production Mode

#### Build Frontend
```bash
cd client
pnpm run build
```

#### Start Backend
```bash
cd server
pnpm start
```

---

## 🌐 Deployment

### Deploy to Vercel (Frontend) and Render (Backend)

#### Step 1: Prepare for Deployment

##### Frontend Configuration
Create `client/vercel.json`:
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

##### Backend Configuration
Ensure your `server/package.json` has:
```json
{
  "scripts": {
    "start": "node src/server.js"
  }
}
```

#### Step 2: Deploy Backend to Render

1. Go to [render.com](https://render.com)
2. Sign in with GitHub
3. Click **"New +"** → **"Web Service"**
4. Connect your repository: `https://github.com/Srijal01/MUSICAA.git`
5. Configure:
   - **Name**: `musicaa-backend`
   - **Root Directory**: `server`
   - **Environment**: `Node`
   - **Build Command**: `pnpm install`
   - **Start Command**: `pnpm start`
6. Add all environment variables from your `.env` file
7. Click **"Create Web Service"**
8. Wait for deployment and copy your backend URL

#### Step 3: Deploy Frontend to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click **"Add New..."** → **"Project"**
4. Import `https://github.com/Srijal01/MUSICAA.git`
5. Configure:
   - **Framework**: Vite
   - **Root Directory**: `client`
   - **Build Command**: `pnpm run build`
   - **Output Directory**: `dist`
6. Add environment variable:
   ```
   VITE_API_URL=https://your-backend-url.onrender.com/api
   ```
7. Click **"Deploy"**
8. Your site will be live at `https://your-project.vercel.app`

#### Step 4: Update CORS

Add your Vercel URL to the backend CORS configuration in `server/src/server.js`:

```javascript
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:5173",
  "https://your-project.vercel.app" // Add your Vercel URL
];
```

Redeploy your backend on Render.

### 🎉 Deployment Complete!

Your application is now live:
- **Frontend**: `https://your-project.vercel.app`
- **Backend**: `https://your-backend-url.onrender.com`

---

## 📁 Project Structure

```
MUSICAA/
├── client/                      # Frontend React application
│   ├── public/                 # Static assets
│   ├── src/
│   │   ├── components/         # Reusable components
│   │   │   ├── CartItem.jsx
│   │   │   ├── CategorySidebar.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── ProductCard.jsx
│   │   │   └── ...
│   │   ├── features/           # Feature modules
│   │   │   ├── auth/          # Authentication
│   │   │   ├── cart/          # Shopping cart
│   │   │   ├── orders/        # Order management
│   │   │   ├── products/      # Products & comparison
│   │   │   ├── reviews/       # Reviews system
│   │   │   └── wishlist/      # Wishlist functionality
│   │   ├── pages/             # Page components
│   │   │   ├── HomePage.jsx
│   │   │   ├── ProductsPage.jsx
│   │   │   ├── CartPage.jsx
│   │   │   └── ...
│   │   ├── services/          # API services
│   │   │   ├── authService.js
│   │   │   ├── productService.js
│   │   │   └── ...
│   │   ├── shared/            # Shared utilities
│   │   │   ├── contexts/      # React contexts
│   │   │   └── hooks/         # Custom hooks
│   │   ├── ui/                # UI components (Atomic Design)
│   │   │   ├── atoms/         # Basic components
│   │   │   ├── molecules/     # Compound components
│   │   │   └── organisms/     # Complex components
│   │   └── utils/             # Utility functions
│   ├── .env                   # Environment variables
│   ├── package.json           # Frontend dependencies
│   └── vite.config.js         # Vite configuration
│
├── server/                     # Backend Node.js application
│   ├── src/
│   │   ├── config/            # Configuration files
│   │   │   ├── database.js
│   │   │   ├── cloudinary.js
│   │   │   └── categories.js
│   │   ├── controllers/       # Route controllers
│   │   │   ├── authController.js
│   │   │   ├── productController.js
│   │   │   ├── cartController.js
│   │   │   ├── orderController.js
│   │   │   ├── paymentController.js
│   │   │   └── reviewController.js
│   │   ├── domains/           # Domain logic
│   │   │   ├── orders/
│   │   │   ├── products/
│   │   │   ├── reviews/
│   │   │   ├── users/
│   │   │   └── wishlist/
│   │   ├── middleware/        # Express middleware
│   │   │   ├── authMiddleware.js
│   │   │   ├── adminMiddleware.js
│   │   │   └── uploadMiddleware.js
│   │   ├── models/            # MongoDB models
│   │   │   ├── User.js
│   │   │   ├── Product.js
│   │   │   ├── Cart.js
│   │   │   ├── Order.js
│   │   │   └── Review.js
│   │   ├── routes/            # API routes
│   │   │   ├── authRoutes.js
│   │   │   ├── productRoutes.js
│   │   │   ├── cartRoutes.js
│   │   │   ├── orderRoutes.js
│   │   │   ├── paymentRoutes.js
│   │   │   └── reviewRoutes.js
│   │   ├── services/          # Business logic
│   │   ├── scripts/           # Utility scripts
│   │   │   └── seedUsers.js
│   │   └── server.js          # Entry point
│   ├── .env                   # Environment variables
│   └── package.json           # Backend dependencies
│
├── .gitignore                 # Git ignore rules
└── README.md                  # This file
```

---

## 📚 API Documentation

### Base URL
- **Development**: `http://localhost:5000/api`
- **Production**: `https://your-backend-url.onrender.com/api`

### Authentication Endpoints

#### Register User
```http
POST /auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```

#### Login User
```http
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

#### Forgot Password
```http
POST /auth/forgot-password
Content-Type: application/json

{
  "email": "john@example.com"
}
```

### Product Endpoints

#### Get All Products
```http
GET /products?category=guitars&minPrice=100&maxPrice=5000&sort=price
```

#### Get Product by ID
```http
GET /products/:id
```

#### Create Product (Admin)
```http
POST /products
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Fender Stratocaster",
  "description": "Classic electric guitar",
  "price": 1299.99,
  "category": "Guitars",
  "subcategory": "Electric",
  "stock": 15,
  "images": ["url1", "url2"]
}
```

### Cart Endpoints

#### Get User Cart
```http
GET /cart
Authorization: Bearer <token>
```

#### Add to Cart
```http
POST /cart
Authorization: Bearer <token>
Content-Type: application/json

{
  "productId": "product_id_here",
  "quantity": 2
}
```

#### Update Cart Item
```http
PUT /cart/:itemId
Authorization: Bearer <token>
Content-Type: application/json

{
  "quantity": 3
}
```

#### Remove from Cart
```http
DELETE /cart/:itemId
Authorization: Bearer <token>
```

### Order Endpoints

#### Create Order
```http
POST /orders
Authorization: Bearer <token>
Content-Type: application/json

{
  "shippingAddress": {
    "street": "123 Main St",
    "city": "Kathmandu",
    "postalCode": "44600",
    "country": "Nepal"
  },
  "paymentMethod": "COD"
}
```

#### Get User Orders
```http
GET /orders
Authorization: Bearer <token>
```

#### Get Order by ID
```http
GET /orders/:id
Authorization: Bearer <token>
```

### Review Endpoints

#### Add Review
```http
POST /reviews
Authorization: Bearer <token>
Content-Type: application/json

{
  "productId": "product_id_here",
  "rating": 5,
  "comment": "Excellent product!"
}
```

#### Get Product Reviews
```http
GET /reviews/product/:productId
```

### Payment Endpoints

#### Initialize eSewa Payment
```http
POST /payment/esewa/initialize
Authorization: Bearer <token>
Content-Type: application/json

{
  "orderId": "order_id_here",
  "amount": 1299.99
}
```

---

## 🎨 Features in Detail

### Wishlist System
The wishlist feature allows users to:
- Save products for future purchase
- Persistent storage using React Context and localStorage
- Quick add/remove with heart icon
- View all wishlist items on dedicated page
- Move items to cart with one click

### Product Comparison
Compare multiple products:
- Select up to 4 products
- Side-by-side comparison table
- Compare prices, ratings, features
- Specifications overview
- Quick add to cart from comparison

### Advanced Filtering
Filter products by:
- **Category**: Main and subcategories
- **Price Range**: Min and max price sliders
- **Rating**: Minimum star rating
- **Stock Status**: In stock / Out of stock
- **Sorting**: Price (low/high), Rating, Newest

### Review System
Comprehensive review features:
- 5-star rating system
- Written reviews
- Verified purchase badges
- Edit/delete your reviews
- Average rating calculation
- Review count display

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/AmazingFeature
   ```
5. **Open a Pull Request**

### Code Style
- Follow existing code patterns
- Use meaningful variable and function names
- Add comments for complex logic
- Test your changes before submitting

---

## 🐛 Known Issues

- eSewa payment gateway requires merchant account for production
- Email notifications require SMTP configuration
- Free tier deployments may have cold start delays

---

## 🔮 Future Enhancements

- [ ] Multi-language support
- [ ] Advanced analytics dashboard
- [ ] Mobile application (React Native)
- [ ] Social media integration
- [ ] Loyalty points system
- [ ] Live chat support
- [ ] Product recommendations using AI
- [ ] Inventory management improvements
- [ ] Bulk order support
- [ ] Affiliate program

---

## 📞 Support

For support and queries:
- **Email**: srijaldangol61@gmail.com
- **GitHub Issues**: [Create an issue](https://github.com/Srijal01/MUSICAA/issues)

---

## 👨‍💻 Author

**Srijal**
- GitHub: [@Srijal01](https://github.com/Srijal01)
- Repository: [MUSICAA](https://github.com/Srijal01/MUSICAA)

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- MongoDB Atlas for database hosting
- Cloudinary for image management
- Vercel for frontend hosting
- Render for backend hosting
- All open-source libraries used in this project

---

<div align="center">

**Made with ❤️ for Music Lovers**

⭐ Star this repository if you found it helpful!

</div>
