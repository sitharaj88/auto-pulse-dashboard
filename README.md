# 🚗🏍️ AutoPulse Dashboard

A modern, comprehensive analytics dashboard for car and bike sales built with ReactJS, featuring real-time data visualization, advanced charting capabilities, and responsive design.

## 🌟 Features

### 🔧 Core Technology Stack
- **ReactJS 18+ with TypeScript** - Modern React with full type safety
- **Material-UI (MUI)** - Comprehensive component library for responsive design
- **Redux Toolkit** - State management for authentication and dashboard data
- **React Router** - Client-side routing with protected routes
- **Recharts** - Interactive charts and data visualizations
- **Vite** - Fast development build tool

### 📊 Dashboard Capabilities
- **Real-time Analytics** - Dynamic metrics calculation and live data updates
- **Interactive Charts** - Multiple chart types (Bar, Line, Pie, Horizontal Bar)
- **Advanced Data Views** - Comprehensive sales transaction tables with sorting and pagination
- **Responsive Design** - Optimized for desktop, tablet, and mobile devices
- **Performance Metrics** - Key performance indicators with visual trend indicators

### 🔐 Authentication & Security
- **Role-based Access Control** - Admin, Manager, and Analyst roles
- **Protected Routes** - Secure access to dashboard features
- **Demo Authentication** - Pre-configured test accounts for easy testing

### 📈 Analytics Features
- **Sales Metrics** - Total sales volume, revenue tracking, profit analysis, conversion rates
- **Trend Analysis** - Monthly sales and revenue trends with comparative insights
- **Brand Performance** - Top-performing brands and models with market share analysis
- **Vehicle Distribution** - Car vs bike sales breakdown
- **Regional Analysis** - Sales performance by geographic region

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager

### Installation

1. **Install dependencies**
```bash
npm install
```

2. **Start development server**
```bash
npm run dev
```

3. **Open Application**
- Navigate to `http://localhost:3000`
- Use demo credentials to login

### 🔑 Demo Credentials

| Role | Username | Password | Access Level |
|------|----------|----------|--------------|
| **Administrator** | `admin` | `admin123` | Full access to all features |
| **Sales Manager** | `manager` | `manager123` | Sales data and team metrics |
| **Data Analyst** | `analyst` | `analyst123` | Analytics and reporting |

## 📊 Dashboard Features

### Key Metrics Display
- Total Sales Count
- Total Revenue  
- Average Sale Price
- Total Profit
- Conversion Rate
- Top Selling Brand & Model

### Interactive Charts
1. **Monthly Sales Volume** - Bar chart showing sales trends
2. **Vehicle Type Distribution** - Pie chart for car/bike breakdown  
3. **Revenue by Brand** - Horizontal bar chart of brand performance
4. **Monthly Revenue Trend** - Line chart showing revenue growth

### Data Management
- **500+ Mock Sales Records** - Realistic transaction data
- **100+ Vehicle Models** - Cars and bikes with detailed specifications
- **Multi-brand Support** - Toyota, Honda, BMW, Yamaha, Kawasaki, and more
- **Regional Data** - Sales across 6 global regions
- **Historical Data** - Time series data from 2024

## 🎨 Design & UX

### Material-UI Theme
- Modern, professional design system
- Responsive grid layout
- Consistent color palette and typography
- Accessible components with ARIA support

### Mobile Responsiveness
- Adaptive layout for all screen sizes
- Touch-optimized interactions
- Mobile-friendly navigation
- Optimized chart rendering

## 🚢 Build & Deploy

### Development Scripts
```bash
npm run dev      # Start development server
npm run build    # Build for production  
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

### Production Build
```bash
npm run build
```

The built files will be in the `dist/` directory, ready for deployment to any static hosting service.

## 🏗️ Architecture

### Project Structure
```
src/
├── components/     # React components
├── store/         # Redux store and slices
├── services/      # Data services and API calls
├── types/         # TypeScript type definitions
└── App.tsx        # Main application component
```

### State Management
- **Redux Toolkit** for global state
- **Authentication slice** for user management
- **Dashboard slice** for sales data and metrics
- **Typed hooks** for type-safe Redux operations

---

**Built with ❤️ using ReactJS, TypeScript, and Material-UI**
