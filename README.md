# 🚗🏍️ AutoPulse Dashboard

A modern, comprehensive analytics dashboard for car and bike sales built with ReactJS, featuring real-time data visualization, advanced filtering capabilities, and responsive design.

![AutoPulse Dashboard Demo](./demo/auto_pulse_demo.gif)

## 📱 Live Demo

Experience the dashboard features including:
- **Real-time Analytics** with dynamic filtering
- **Interactive Charts** and data visualizations  
- **Advanced Filters** with date range selection
- **Mobile-Responsive** design across all devices
- **Role-based Authentication** with demo credentials

## 🌟 Features

### 🔧 Core Technology Stack
- **ReactJS 18+ with TypeScript** - Modern React with full type safety
- **Material-UI (MUI)** - Comprehensive component library with advanced components
- **Redux Toolkit** - State management for authentication and dashboard data  
- **React Router** - Client-side routing with protected routes
- **Recharts** - Interactive charts and data visualizations
- **@mui/x-date-pickers** - Professional date picker components
- **Vite** - Fast development build tool with optimized bundling

### 📊 Dashboard Capabilities
- **Real-time Analytics** - Dynamic metrics calculation and live data updates
- **Interactive Charts** - Multiple chart types (Bar, Line, Pie, Donut)
- **Advanced Filtering** - Multi-parameter filtering with date pickers and range selectors
- **Data Tables** - Comprehensive sales transaction tables with sorting and pagination
- **Responsive Design** - Optimized for desktop, tablet, and mobile devices
- **Performance Optimization** - Client-side filtering for instant updates without page refresh
- **Modern UI/UX** - Accordion-based filters and Material-UI components

### 🔐 Authentication & Security
- **Role-based Access Control** - Admin, Manager, and Analyst roles
- **Protected Routes** - Secure access to dashboard features
- **Demo Authentication** - Pre-configured test accounts for easy testing

### 📈 Analytics Features
- **Sales Metrics** - Total sales volume, revenue tracking, profit analysis, conversion rates
- **Trend Analysis** - Monthly sales and revenue trends with comparative insights
- **Brand Performance** - Top-performing brands and models with market share analysis
- **Vehicle Distribution** - Car vs bike sales breakdown with visual representations
- **Regional Analysis** - Sales performance by geographic region
- **Advanced Filtering** - Filter by vehicle type, brand, region, price range, and date range
- **Real-time Calculations** - Instant metric updates based on applied filters

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
- Navigate to `http://localhost:5175`
- Use demo credentials to login

## 🎯 Quick Tour

### Dashboard Overview
1. **Login** with any demo credentials below
2. **Explore Metrics** - View key performance indicators at the top
3. **Interactive Charts** - Click and hover for detailed insights
4. **Advanced Filters** - Use the filter panel to narrow down data
5. **Data Tables** - Browse detailed transaction records
6. **Responsive Design** - Try on different screen sizes

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
1. **Monthly Sales Volume** - Bar chart showing sales trends over time
2. **Vehicle Type Distribution** - Donut chart for car/bike breakdown with percentages
3. **Revenue by Brand** - Horizontal bar chart of brand performance rankings
4. **Monthly Revenue Trend** - Line chart showing revenue growth patterns

### Data Management
- **500+ Mock Sales Records** - Realistic transaction data spanning multiple years
- **100+ Vehicle Models** - Cars and bikes with detailed specifications
- **Multi-brand Support** - Toyota, Honda, BMW, Mercedes, Yamaha, Kawasaki, and more
- **Regional Coverage** - Sales data across 6 global regions (North America, Europe, Asia, etc.)
- **Time Series Data** - Historical records from 2023-2025 for trend analysis

## 🎨 Design & UX

### Modern Material-UI Implementation
- **Professional Theme** with consistent design system
- **Accordion-based Filters** for clean, organized interface
- **Date Picker Integration** with @mui/x-date-pickers
- **Responsive Grid Layout** that adapts to all screen sizes
- **Accessibility Features** with ARIA support and keyboard navigation

### Performance & User Experience
- **Client-side Filtering** - Instant results without page refresh
- **Optimized Rendering** - Smooth interactions and fast load times
- **Mobile-first Design** - Touch-optimized for mobile devices
- **Loading States** - Clear feedback during data operations

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
├── components/           # React components
│   ├── Auth/            # Authentication components
│   ├── Dashboard/       # Dashboard-specific components
│   └── common/          # Shared components
├── store/               # Redux store and slices
│   └── slices/          # Feature-based state slices
├── services/            # Data services and API simulation
├── types/               # TypeScript type definitions
└── App.tsx              # Main application component
```

### Key Architectural Features
- **Redux Toolkit** for predictable state management
- **Authentication slice** for user management and role-based access
- **Dashboard slice** for sales data and filtering state
- **Typed hooks** for type-safe Redux operations
- **Client-side filtering** for optimal performance
- **Mock data service** with realistic business data

---

## 🔍 Features Deep Dive

### Advanced Filtering System
- **Vehicle Type Filter** - Cars, Bikes, or All vehicles
- **Brand Selection** - Multi-select dropdown with popular automotive brands
- **Regional Filtering** - Geographic performance analysis
- **Price Range** - Customizable min/max price filters
- **Date Range Picker** - Professional calendar interface for time-based analysis
- **Real-time Updates** - Instant metric recalculation on filter changes

### Dashboard Analytics
- **Sales Volume Tracking** - Monitor transaction counts and trends
- **Revenue Analysis** - Total revenue with profit margin calculations  
- **Performance Metrics** - Conversion rates and average sale prices
- **Brand Insights** - Top-performing brands and market share
- **Geographic Distribution** - Regional sales performance comparison

### Technical Highlights
- **TypeScript Integration** - Full type safety throughout the application
- **Performance Optimized** - Client-side filtering eliminates server round-trips
- **Material-UI Components** - Professional UI with consistent design language
- **Responsive Charts** - Interactive visualizations that work on all devices
- **Authentication System** - Role-based access with demo credentials

## 🚀 Development

### Available Scripts
```bash
npm run dev          # Start development server (http://localhost:5175)
npm run build        # Create production build
npm run preview      # Preview production build locally
npm run lint         # Run ESLint for code quality
```

### Development Workflow
1. **Clone** the repository
2. **Install** dependencies with `npm install`
3. **Start** development server with `npm run dev`
4. **Open** `http://localhost:5175` in your browser
5. **Login** with demo credentials and explore features

### Tech Stack Details
```json
{
  "react": "^18.3.1",
  "typescript": "~5.8.3", 
  "@mui/material": "^5.18.0",
  "@mui/x-date-pickers": "^7.29.4",
  "@reduxjs/toolkit": "^2.8.2",
  "react-chartjs-2": "^5.3.0",
  "vite": "^6.0.7"
}
```

### Building for Production
```bash
npm run build
```
The optimized build will be created in the `dist/` directory, ready for deployment to any static hosting service like Vercel, Netlify, or AWS S3.

## 📄 License

This project is available for educational and demonstration purposes.

## 🤝 Contributing

This is a demo project showcasing modern React development practices. Feel free to explore the code and use it as a reference for your own projects.

---

**Built with ❤️ using ReactJS, TypeScript, and Material-UI**

*AutoPulse Dashboard - Showcasing modern web development with professional UI/UX design*
