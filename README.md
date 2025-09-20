# 🎯 Habitize Frontend

A modern, responsive React application for tracking daily habits and visualizing progress over time. Built with React 19, Vite, and deployed on Vercel.

## 🌟 Live Demo

**🚀 [View Live Application](https://habit-tracker-tan-zeta.vercel.app/)**

## � Environment Configuration

This application supports both local development and production environments:

### 🖥️ **Local Development**
- Uses local backend server: `http://localhost:3000/api`
- Run with: `npm run dev`
- Frontend serves on: `http://127.0.0.1:3001`

### 🌐 **Production/Deployment**
- Uses deployed Azure backend: `https://habit-tracker-api-fndzdyctcgd5bvg3.eastus2-01.azurewebsites.net/api`
- Automatically configured via environment variables
- Deployed on Vercel

## �📱 Features

### 🔐 **Authentication**
- User registration and login
- JWT-based authentication
- Protected routes
- Secure session management

### 📊 **Habit Management**
- Create custom habits with descriptions
- Set habit frequencies (daily, weekly, etc.)
- Track habit completion with intuitive UI
- Edit and delete habits

### 📈 **Progress Visualization**
- Interactive charts showing habit progress
- Calendar view for completion tracking
- Statistics dashboard with completion rates
- Progress streaks and analytics

### 🎨 **User Experience**
- Responsive design for all devices
- Real-time notifications with react-hot-toast
- Smooth animations and transitions
- Intuitive navigation with React Router

## 🛠️ Tech Stack

### **Core Technologies**
- **React 19** - Latest React with concurrent features
- **Vite 7.1.2** - Lightning-fast build tool
- **React Router DOM 7.8.1** - Client-side routing
- **Axios 1.11.0** - HTTP client for API calls

### **UI & Visualization**
- **Recharts 3.2.0** - Beautiful charts and graphs
- **React Calendar 6.0.0** - Interactive calendar component
- **React Hot Toast 2.6.0** - Elegant notifications
- **CSS3** - Custom styling with modern CSS

### **Development Tools**
- **ESLint** - Code linting and quality
- **Vite Plugin React** - Fast refresh and HMR
- **Date-fns 4.1.0** - Date manipulation utilities

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── CreateHabitForm.jsx    # Form for creating new habits
│   ├── HabitItem.jsx          # Individual habit display
│   ├── LoginForm.jsx          # User login form
│   ├── Navbar.jsx             # Navigation bar
│   ├── PrivateRoute.jsx       # Protected route wrapper
│   ├── ProgressChart.jsx      # Progress visualization
│   ├── RegisterForm.jsx       # User registration form
│   ├── Spinner.jsx            # Loading spinner
│   └── StatsDisplay.jsx       # Statistics dashboard
├── context/             # React Context providers
│   └── AuthContext.jsx        # Authentication state management
├── pages/               # Main application pages
│   ├── DashboardPage.jsx      # Main dashboard
│   ├── HabitDetailPage.jsx    # Individual habit details
│   ├── HomePage.jsx           # Landing page
│   ├── LoginPage.jsx          # Login page
│   └── RegisterPage.jsx       # Registration page
├── services/            # API and external services
│   ├── api.js                 # Axios configuration
│   ├── authService.js         # Authentication API calls
│   └── habitService.js        # Habit management API calls
├── hooks/               # Custom React hooks
├── assets/              # Static assets
├── App.jsx              # Main application component
├── main.jsx             # Application entry point
└── index.css            # Global styles
```

## 🚀 Getting Started

### **Prerequisites**
- Node.js 16+ 
- npm or yarn
- Git

### **Installation**

1. **Clone the repository**
```bash
git clone https://github.com/Ssp63/HabitTracker-Frontend.git
cd HabitTracker-Frontend
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

4. **Open your browser**
Navigate to `http://localhost:5173`

### **Available Scripts**

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run vercel-build # Vercel deployment build
```

## 🔧 Configuration

### **API Configuration**
The app connects to the backend API. The API endpoint is configured in `src/services/api.js`:

```javascript
const getBaseURL = () => {
  return 'https://habit-tracker-api-fndzdyctcgd5bvg3.eastus2-01.azurewebsites.net/api';
};
```

### **Authentication Flow**
1. Users register/login through forms
2. JWT tokens are stored in localStorage
3. API requests include authorization headers
4. Protected routes check authentication status

## 📱 Pages & Components

### **Pages**
- **HomePage** - Landing page with app introduction
- **LoginPage** - User authentication
- **RegisterPage** - New user registration
- **DashboardPage** - Main habit tracking interface
- **HabitDetailPage** - Detailed view of individual habits

### **Key Components**
- **AuthContext** - Global authentication state
- **PrivateRoute** - Protects authenticated routes
- **Navbar** - Navigation with user status
- **ProgressChart** - Visual progress representation
- **StatsDisplay** - Habit statistics and metrics

## 🎨 Features Overview

### **Dashboard**
- Overview of all habits
- Quick habit completion toggle
- Progress indicators
- Recent activity feed

### **Habit Creation**
- Custom habit names and descriptions
- Frequency settings (daily, weekly, custom)
- Goal setting and tracking
- Categories and tags

### **Analytics**
- Completion rate calculations
- Streak tracking
- Monthly/weekly progress views
- Visual progress charts

## 🌐 Deployment

### **Vercel Deployment**
The app is deployed on Vercel with automatic CI/CD:

1. **Build Command:** `npm run vercel-build`
2. **Output Directory:** `dist`
3. **Framework:** Vite
4. **Auto-deployment** on push to main branch

### **Environment**
- **Production URL:** https://habit-tracker-tan-zeta.vercel.app
- **Backend API:** Azure Web App
- **Database:** MongoDB Atlas

## 🔗 Related Repositories

- **Backend API:** [HabitTracker Backend](https://github.com/Ssp63/HabitTracker)
- **Main Repository:** [HabitTracker Full-Stack](https://github.com/Ssp63/HabitTracker)

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**Shreyash Pawar**
- GitHub: [@Ssp63](https://github.com/Ssp63)
- Email: ssp@gmail.com

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

⭐ **Star this repository if you found it helpful!**+ Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
