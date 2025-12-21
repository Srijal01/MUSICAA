# 🎸 MUSICAA - Musical Instruments E-Commerce Platform

A full-stack e-commerce web application specialized in musical instruments, featuring a **modernized feature-based architecture**, **atomic design system**, **product reviews & ratings**, **wishlist functionality**, **product comparison**, **advanced filtering**, and a sophisticated dark theme with real-time notifications.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Node](https://img.shields.io/badge/node-%3E%3D16.0.0-brightgreen.svg)
![React](https://img.shields.io/badge/react-18.2.0-61dafb.svg)

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [User Roles](#user-roles)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

### Customer Features
- 🔐 **User Authentication** - Secure registration, login, and password recovery with OTP verification
- 🛍️ **Product Browsing** - Browse musical instruments by category with advanced filtering
- 🔍 **Product Search** - Real-time search functionality with autocomplete suggestions
- 🛒 **Shopping Cart** - Add, update, remove items with real-time price calculation
- 💳 **Checkout Process** - Streamlined checkout with multiple payment options (Cash on Delivery, eSewa, Khalti)
- 📦 **Order Management** - View order history and track order status
- ❤️ **Wishlist System** - Save favorite products for later with persistent storage
- ⭐ **Product Reviews & Ratings** - Write and read detailed product reviews with 5-star ratings
- 🔍 **Product Comparison** - Compare up to 4 products side-by-side with feature analysis
- 🎯 **Advanced Filters** - Multi-criteria filtering (price range, rating, stock status, sorting)
- 🔔 **Real-time Notifications** - Beautiful toast notifications for all user actions
- 📱 **Responsive Design** - Fully responsive design optimized for all devices
- 🌙 **Dark Theme** - Modern black and gray themed UI with smooth animations

### Admin Features
- 📊 **Admin Dashboard** - Comprehensive dashboard with sales overview and statistics
- 📝 **Product Management** - Add, edit, delete products with image upload
- 🏷️ **Category Management** - Organize products by main and sub-categories
- 📦 **Order Management** - View, update, and manage customer orders
- 📈 **Analytics** - Track total revenue, orders, and customer statistics
- 🖼️ **Image Upload** - Cloudinary integration for product image management
- ⚡ **Real-time Updates** - Live updates on inventory and order status

### Technical Features
- �️ **Modern Architecture** - Feature-based structure with atomic design system
- 🎨 **Atomic Design UI** - Reusable components (atoms, molecules, organisms)
- 🪝 **Custom React Hooks** - Specialized hooks for common operations
- 🔄 **Context-based State** - Efficient global state management
- 🎭 **Advanced Animations** - Smooth transitions, hover effects, and CSS animations
- 🔒 **JWT Authentication** - Secure token-based authentication system
- 💾 **MongoDB Database** - Efficient data storage with Mongoose ODM
- ☁️ **Cloud Storage** - Cloudinary integration for image hosting
- 📧 **Email Integration** - EmailJS for OTP and order notifications
- 🚀 **Performance Optimized** - Debounced search, lazy loading, optimized bundle
- 🎯 **SEO Friendly** - Proper meta tags and semantic HTML structure

## 🛠️ Tech Stack

### Frontend
- **React 18.2.0** - UI library
- **React Router DOM 6.20.0** - Client-side routing
- **Vite 5.0.8** - Build tool and dev server
- **Tailwind CSS 3.3.6** - Utility-first CSS framework
- **Axios 1.6.2** - HTTP client
- **EmailJS Browser** - Client-side email integration

### Backend
- **Node.js** - Runtime environment
- **Express.js 4.18.2** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose 8.0.0** - MongoDB object modeling
- **JWT (jsonwebtoken 9.0.2)** - Authentication
- **Bcrypt.js 2.4.3** - Password hashing
- **Multer 2.0.2** - File upload handling
- **Cloudinary 2.8.0** - Image storage and management
- **Nodemailer 7.0.11** - Email sending
- **CORS 2.8.5** - Cross-origin resource sharing

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16.0.0 or higher)
- **pnpm** (v8.0.0 or higher) - `npm install -g pnpm`
- **MongoDB** (v6.0 or higher) - Local or Atlas cluster
- **Git** - Version control

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/musicaa-ecommerce.git
cd musicaa-ecommerce
```

### 2. Install Dependencies

#### Install Server Dependencies
```bash
cd server
pnpm install
```

#### Install Client Dependencies
```bash
cd ../client
pnpm install
```

## 🔧 Environment Variables

### Server Configuration

Create a `.env` file in the `server` directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/ecommerce
# OR for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ecommerce

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here_minimum_32_characters
JWT_EXPIRE=7d

# Cloudinary Configuration (for image uploads)
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Email Configuration (EmailJS or Nodemailer)
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-specific-password

# Payment Gateway (Optional)
ESEWA_MERCHANT_CODE=your_esewa_merchant_code
KHALTI_SECRET_KEY=your_khalti_secret_key

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:5173
```

### Client Configuration

Create a `.env` file in the `client` directory:

```env
# API Configuration
VITE_API_URL=http://localhost:5000/api

# EmailJS Configuration (for contact forms)
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

## 🏃 Running the Application

### Development Mode

#### Start MongoDB (if running locally)
```bash
# Windows
mongod

# macOS/Linux
sudo systemctl start mongod
```

#### Start the Backend Server
```bash
cd server
pnpm start
# or for development with auto-reload:
pnpm run dev
```

The server will run on `http://localhost:5000`

#### Start the Frontend Development Server
```bash
cd client
pnpm run dev
```

The client will run on `http://localhost:5173`

### Production Build

#### Build Frontend
```bash
cd client
pnpm run build
```

#### Start Production Server
```bash
cd server
NODE_ENV=production pnpm start
```

## 📁 Project Structure

```
E_Commerce/
│
├── client/                          # Frontend React application
│   ├── public/                      # Static assets
│   ├── src/
│   │   ├── components/              # Reusable components
│   │   │   ├── CartItem.jsx         # Shopping cart item component
│   │   │   ├── CategorySidebar.jsx  # Category filter sidebar
│   │   │   ├── footer.jsx           # Footer component
│   │   │   ├── Navbar.jsx           # Navigation bar
│   │   │   ├── ProductCard.jsx      # Product display card
│   │   │   ├── ProtectedRoute.jsx   # Auth route protection
│   │   │   ├── Success.jsx          # Success notification
│   │   │   └── Failure.jsx          # Failure notification
│   │   │
│   │   ├── pages/                   # Page components
│   │   │   ├── HomePage.jsx         # Landing page
│   │   │   ├── ProductsPage.jsx     # Product listing page
│   │   │   ├── ProductDetailPage.jsx # Product details
│   │   │   ├── CartPage.jsx         # Shopping cart
│   │   │   ├── CheckoutPage.jsx     # Checkout process
│   │   │   ├── OrdersPage.jsx       # Order history
│   │   │   ├── LoginPage.jsx        # User login
│   │   │   ├── RegisterPage.jsx     # User registration
│   │   │   ├── ForgotPasswordPage.jsx # Password recovery
│   │   │   └── AdminDashboardPage.jsx # Admin panel
│   │   │
│   │   ├── services/                # API service layer
│   │   │   ├── api.js               # Axios instance
│   │   │   ├── authService.js       # Authentication services
│   │   │   ├── cartService.js       # Cart operations
│   │   │   ├── orderService.js      # Order management
│   │   │   └── productService.js    # Product operations
│   │   │
│   │   ├── utils/                   # Utility functions
│   │   │   ├── api.js               # API utilities
│   │   │   └── helper.js            # Helper functions
│   │   │
│   │   ├── App.jsx                  # Main app component
│   │   ├── App.css                  # Global styles
│   │   ├── index.css                # Tailwind & base styles
│   │   └── main.jsx                 # App entry point
│   │
│   ├── index.html                   # HTML template
│   ├── package.json                 # Frontend dependencies
│   ├── postcss.config.js            # PostCSS configuration
│   ├── tailwind.config.js           # Tailwind configuration
│   └── vite.config.js               # Vite configuration
│
└── server/                          # Backend Node.js application
    ├── src/
    │   ├── config/                  # Configuration files
    │   │   ├── categories.js        # Product categories
    │   │   ├── cloudinary.js        # Cloudinary setup
    │   │   ├── database.js          # MongoDB connection
    │   │   └── db.config.js         # DB configuration
    │   │
    │   ├── controllers/             # Route controllers
    │   │   ├── authController.js    # Authentication logic
    │   │   ├── cartController.js    # Cart operations
    │   │   ├── orderController.js   # Order management
    │   │   ├── paymentController.js # Payment processing
    │   │   ├── productController.js # Product CRUD
    │   │   └── uploadController.js  # File uploads
    │   │
    │   ├── middleware/              # Express middleware
    │   │   ├── adminMiddleware.js   # Admin authorization
    │   │   ├── authMiddleware.js    # JWT verification
    │   │   └── uploadMiddleware.js  # Multer configuration
    │   │
    │   ├── models/                  # Mongoose models
    │   │   ├── User.js              # User schema
    │   │   ├── Product.js           # Product schema
    │   │   ├── Cart.js              # Cart schema
    │   │   ├── CartItem.js          # Cart item schema
    │   │   ├── Order.js             # Order schema
    │   │   ├── OrderItem.js         # Order item schema
    │   │   └── PaymentModel.js      # Payment schema
    │   │
    │   ├── routes/                  # API routes
    │   │   ├── authRoutes.js        # /api/auth routes
    │   │   ├── cartRoutes.js        # /api/cart routes
    │   │   ├── orderRoutes.js       # /api/orders routes
    │   │   ├── paymentRoutes.js     # /api/payment routes
    │   │   ├── productRoutes.js     # /api/products routes
    │   │   └── uploadRoutes.js      # /api/upload routes
    │   │
    │   ├── utils/                   # Utility functions
    │   │   └── helper.js            # Helper utilities
    │   │
    │   └── server.js                # Express app entry
    │
    └── package.json                 # Backend dependencies
```

## 📡 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123",
  "phone": "9876543210"
}
```

#### Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

#### Forgot Password (Send OTP)
```http
POST /api/auth/forgot-password
Content-Type: application/json

{
  "email": "john@example.com"
}
```

#### Verify OTP
```http
POST /api/auth/verify-otp
Content-Type: application/json

{
  "email": "john@example.com",
  "otp": "123456"
}
```

#### Reset Password
```http
POST /api/auth/reset-password
Content-Type: application/json

{
  "email": "john@example.com",
  "otp": "123456",
  "newPassword": "newSecurePassword123"
}
```

### Product Endpoints

#### Get All Products
```http
GET /api/products?category=guitars&search=acoustic&sort=price&page=1&limit=12
```

#### Get Product by ID
```http
GET /api/products/:id
```

#### Create Product (Admin Only)
```http
POST /api/products
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Acoustic Guitar",
  "description": "Premium quality acoustic guitar",
  "price": 25000,
  "category": {
    "main": "String Instruments",
    "sub": "Guitars"
  },
  "stock": 10,
  "imageUrl": "https://cloudinary.com/...",
  "specifications": {
    "brand": "Yamaha",
    "color": "Natural Wood"
  }
}
```

#### Update Product (Admin Only)
```http
PUT /api/products/:id
Authorization: Bearer <token>
Content-Type: application/json
```

#### Delete Product (Admin Only)
```http
DELETE /api/products/:id
Authorization: Bearer <token>
```

### Cart Endpoints

#### Get User Cart
```http
GET /api/cart
Authorization: Bearer <token>
```

#### Add to Cart
```http
POST /api/cart
Authorization: Bearer <token>
Content-Type: application/json

{
  "productId": "product_id_here",
  "quantity": 2
}
```

#### Update Cart Item
```http
PUT /api/cart/:productId
Authorization: Bearer <token>
Content-Type: application/json

{
  "quantity": 3
}
```

#### Remove from Cart
```http
DELETE /api/cart/:productId
Authorization: Bearer <token>
```

#### Clear Cart
```http
DELETE /api/cart
Authorization: Bearer <token>
```

### Order Endpoints

#### Create Order
```http
POST /api/orders
Authorization: Bearer <token>
Content-Type: application/json

{
  "shippingAddress": {
    "fullName": "John Doe",
    "address": "123 Main St",
    "city": "Kathmandu",
    "phone": "9876543210"
  },
  "paymentMethod": "Cash on Delivery"
}
```

#### Get User Orders
```http
GET /api/orders
Authorization: Bearer <token>
```

#### Get All Orders (Admin Only)
```http
GET /api/orders/admin/all
Authorization: Bearer <token>
```

#### Update Order Status (Admin Only)
```http
PUT /api/orders/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "status": "Shipped"
}
```

#### Delete Order (Admin Only)
```http
DELETE /api/orders/:id
Authorization: Bearer <token>
```

### Upload Endpoints

#### Upload Image
```http
POST /api/upload
Authorization: Bearer <token>
Content-Type: multipart/form-data

Form Data:
- image: <file>
```

## 👥 User Roles

### Customer Account
- Browse and search products
- Add items to cart
- Place orders
- View order history
- Update profile

### Admin Account
- All customer privileges
- Access admin dashboard
- Manage products (CRUD operations)
- Manage orders
- View analytics and reports
- Upload product images

**Default Admin Credentials** (if seeded):
```
Email: admin@ecommerce.com
Password: admin123
```

## 🎨 Design Features

### Color Scheme
- **Primary Background**: Black (#000000)
- **Secondary Background**: Gray-900 (#111827)
- **Accent**: Gray-800 (#1F2937)
- **Text**: White/Gray-300
- **Borders**: Gray-800/Gray-700
- **Highlights**: Purple-600, Orange-600

### Animations
- **Button Hover**: Scale up (1.05-1.10) with shadow
- **Button Active**: Scale down (0.95-0.90)
- **Transitions**: Smooth 200-300ms transitions
- **Card Hover**: Elevated shadow effects
- **Image Hover**: Scale transforms

### Responsive Breakpoints
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## 🧪 Testing

### Manual Testing Checklist

- [ ] User registration and login
- [ ] Password recovery flow
- [ ] Product browsing and filtering
- [ ] Search functionality
- [ ] Add to cart operations
- [ ] Cart updates and removals
- [ ] Checkout process
- [ ] Order placement
- [ ] Admin product management
- [ ] Admin order management
- [ ] Image upload functionality
- [ ] Responsive design on mobile
- [ ] Payment method selection

## 🚀 Deployment

### Frontend Deployment (Vercel/Netlify)

1. Build the frontend:
```bash
cd client
pnpm run build
```

2. Deploy the `dist` folder to Vercel or Netlify

3. Update environment variables on the hosting platform

### Backend Deployment (Heroku/Railway)

1. Ensure all environment variables are set

2. Deploy using Git:
```bash
git push heroku main
```

3. Or use Railway/Render for automatic deployments

### Database (MongoDB Atlas)

1. Create a MongoDB Atlas cluster
2. Whitelist IP addresses
3. Update `MONGODB_URI` in environment variables
4. Run database migrations if needed

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Coding Standards
- Use ESLint and Prettier for code formatting
- Follow React best practices
- Write meaningful commit messages
- Add comments for complex logic
- Test before submitting PR

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Srijal Dangol**
- Facebook: [Srijal Dangol](https://web.facebook.com/srijaldangol02/)
- Instagram: [@srijaldangol](https://www.instagram.com/srijaldangol/)
- LinkedIn: [Srijal Dangol](https://np.linkedin.com/in/srijal-dangol-18232a314)

## 🙏 Acknowledgments

- [React](https://react.dev/) - Frontend framework
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [MongoDB](https://www.mongodb.com/) - Database
- [Cloudinary](https://cloudinary.com/) - Image hosting
- [EmailJS](https://www.emailjs.com/) - Email services
- Font icons and assets from various open-source projects

## 📞 Support

For ✅ Completed (v2.0)
- [x] Product reviews and ratings
- [x] Wishlist functionality
- [x] Advanced search filters
- [x] Product comparison
- [x] Real-time notifications
- [x] Atomic design system
- [x] Feature-based architecture

### 🚧 Planned Features
- [ ] Product recommendations (AI-based)
- [ ] Quick view modal
- [ ] Live chat support
- [ ] Multi-language support
- [ ] Full payment gateway integration (eSewa, Khalti)
- [ ] Email notifications for orders
- [ ] Invoice generation
- [ ] Inventory alerts for low stock
- [ ] Analytics dashboard enhancements
- [ ] Dark/Light theme toggle
- [ ] Progressive Web App (PWA)
- [ ] Infinite scroll
- [ ] Skeleton loaderewa, Khalti)
- [ ] Email notifications for orders
- [ ] Invoice generation
- [ ] Inventory alerts for low stock
- [ ] Analytics dashboard enhancements

---

**Built with ❤️ for music lovers** 🎸🎹🥁
