# Drug Explorer Frontend - React SPA

A modern, professional React Single Page Application for exploring drug information with analytics and search history capabilities.

## 🏗️ Project Structure

```
src/
├── components/              # React components
│   ├── Navigation/         # Main navigation/menu
│   ├── HomePage/           # Landing page
│   ├── SearchPage/         # Drug search interface
│   ├── AnalyticsPage/      # Analytics dashboard
│   ├── HistoryPage/        # Search history viewer
│   └── common/             # Reusable UI components
│       ├── Spinner.js      # Loading spinner
│       ├── ErrorAlert.js   # Error messages
│       └── SuccessMessage.js # Success notifications
├── hooks/                  # Custom React hooks
│   ├── useDrugSearch.js   # Search hook
│   ├── useAnalytics.js    # Analytics hook
│   └── useSearchHistory.js # History hook
├── services/               # API integration
│   ├── apiClient.js       # Axios configuration
│   └── drugAPI.js         # Drug API endpoints
├── types/                  # Type definitions
│   └── index.js           # API response types
├── styles/                 # CSS stylesheets
│   ├── App.css            # Global styles
│   ├── Navigation.css     # Navigation styles
│   ├── SearchPage.css     # Search page styles
│   ├── AnalyticsPage.css  # Analytics styles
│   ├── HistoryPage.css    # History page styles
│   ├── HomePage.css       # Home page styles
│   ├── Alert.css          # Alert components
│   └── Spinner.css        # Spinner styles
├── App.js                  # Main app component with routing
├── index.js               # React entry point
└── .env                   # Environment configuration
```

## 🚀 Getting Started

### Prerequisites
- Node.js 14+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test
```

### Environment Configuration

Create a `.env` file in the project root:

```env
REACT_APP_API_URL=http://localhost:5000
REACT_APP_ENV=development
```

## 📋 Key Features

### 1. **Search Page** (`/search`)
- Search for drugs by name or keyword
- Minimum 2 characters, maximum 256 characters
- Displays grouped results with variants (dosage, form)
- Shows execution time and cache status
- Error handling with user-friendly messages

### 2. **Analytics Dashboard** (`/analytics`)
- Real-time performance metrics
- Total searches, cache hits, and cache hit rate
- Average execution time
- Top 10 most searched queries
- Auto-refresh capability
- Beautiful gradient metric cards

### 3. **Search History** (`/history`)
- Query search history tracking
- Configurable result limit (10-1000 records)
- Cache hit/miss indicators
- Execution time metrics
- Responsive data table with sorting

### 4. **Home Page** (`/`)
- Landing page with feature overview
- Quick navigation to all pages
- Professional hero section

## 🎯 Best Practices Implemented

### Component Architecture
✅ **Functional Components** - Modern React with hooks
✅ **Component Composition** - Reusable components split by concern
✅ **Separation of Concerns** - Clear separation between UI and logic

### State Management
✅ **Custom Hooks** - Encapsulate API logic and state management
✅ **useCallback** - Optimize function references
✅ **useEffect** - Proper side effect management

### API Integration
✅ **Service Layer** - Centralized API calls
✅ **Axios Configuration** - Single API client instance
✅ **Error Handling** - Comprehensive error management
✅ **Loading States** - Proper UX feedback

### Code Quality
✅ **Comments** - Meaningful code documentation
✅ **Naming Conventions** - Clear, descriptive names
✅ **DRY Principle** - No repeated code
✅ **Responsive Design** - Mobile-first CSS

### User Experience
✅ **Loading Indicators** - Spinner during data fetch
✅ **Error Messages** - User-friendly error alerts
✅ **Success Feedback** - Visual confirmation
✅ **Form Validation** - Input validation and constraints
✅ **Accessibility** - Semantic HTML and ARIA support

## 🎨 Styling Approach

- **CSS Modules Pattern** - Scoped styles per component
- **Responsive Grid Layout** - Auto-fit, mobile-first
- **Color Scheme** - Professional blues with accent colors
- **Animations** - Smooth transitions and hover effects
- **Typography** - Clear font hierarchy

## 🔧 Available Scripts

```bash
# Start development server (port 3000)
npm start

# Build production bundle
npm run build

# Run test suite
npm test

# Eject configuration (one-way operation)
npm run eject
```

## 📚 Learning Points for Interviews

This project demonstrates:

1. **React Fundamentals**
   - Functional components with hooks
   - State and effect management
   - Component lifecycle

2. **Advanced Concepts**
   - Custom hooks for logic reuse
   - Proper error handling patterns
   - Async/await with loading states

3. **Architecture**
   - Service layer pattern
   - Component composition
   - Clean folder structure

4. **Practical Patterns**
   - Form handling
   - Data fetching and caching
   - Responsive design
   - Performance optimization

5. **Best Practices**
   - Code organization
   - Naming conventions
   - Component reusability
   - DRY principle

## 🔗 API Integration

The app connects to the ASP.NET Drug Explorer API:

- **Search**: `GET /api/drugs/search?query=...`
- **Analytics**: `GET /api/drugs/analytics`
- **History**: `GET /api/drugs/history?normalizedQuery=...&limit=50`

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📝 Notes

- Ensure the backend API is running on `http://localhost:5000`
- API requires minimum 2-character queries for search
- Maximum query length is 256 characters
- History limit range: 1-1000 records

## 🤝 Contributing

This is a learning project. Feel free to modify and extend it!

## 📄 License

This project is part of the Drug Explorer application ecosystem.
