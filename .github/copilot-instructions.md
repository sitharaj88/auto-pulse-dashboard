# AutoPulse Dashboard

<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

## Project Overview

AutoPulse Dashboard is a modern analytics platform for car and bike sales built with ReactJS. The project includes:

- **ReactJS & TypeScript**: Modern React application with full TypeScript support
- **Material-UI**: Comprehensive UI component library for responsive design
- **Redux Toolkit**: State management for authentication and dashboard data
- **Recharts**: Interactive charts and data visualizations
- **React Router**: Client-side routing and navigation
- **Mock Data Service**: Simulated sales data for development and testing

## Architecture Guidelines

### State Management

- Use Redux Toolkit for global state management
- Separate slices for authentication and dashboard data
- Use typed hooks for type-safe Redux operations

### Components Structure

- Follow atomic design principles
- Keep components focused and reusable
- Use Material-UI components consistently
- Implement proper TypeScript interfaces

### Data Management

- Mock data service generates realistic sales data
- Support filtering and data manipulation
- Calculate real-time metrics and analytics

### Authentication & Security

- Role-based access control (Admin, Manager, Analyst)
- Protected routes for authenticated users only
- Demo credentials for easy testing

### Responsive Design

- Mobile-first approach with Material-UI responsive system
- Ensure charts and tables work on all screen sizes
- Optimize for accessibility and usability

### Performance

- Use React best practices for rendering optimization
- Implement proper loading states and error handling
- Lazy load components where appropriate

## Development Standards

- Always use TypeScript with proper type definitions
- Follow Material-UI theming and design patterns
- Implement comprehensive error handling
- Use semantic HTML and ARIA attributes for accessibility
- Write clean, commented code with meaningful variable names

## Demo Credentials

- **Admin**: admin / admin123
- **Manager**: manager / manager123
- **Analyst**: analyst / analyst123
