# ⚡ Quick Start Guide

## Getting the App Running (5 minutes)

### Step 1: Navigate to the project
```bash
cd "d:\Projects\DrugExplorer\DrugExplorer-FE\drugexplorer-fe"
```

### Step 2: Install dependencies
```bash
npm install
```

### Step 3: Configure API URL
Create `.env` file:
```env
REACT_APP_API_URL=http://localhost:5000
```

### Step 4: Start development server
```bash
npm start
```

✅ App opens at `http://localhost:3000`

---

## 🔗 What to Try

### Search Page (`/search`)
1. Click "Search" in navigation
2. Type "aspirin" (or any drug name)
3. View grouped results with variants
4. Note the execution time

### Analytics Page (`/analytics`)
1. Click "Analytics" in navigation
2. View performance metrics
3. See top 10 searched queries
4. Try refresh button

### History Page (`/history`)
1. Click "History" in navigation
2. Enter "aspirin" (normalized query)
3. Adjust result limit if needed
4. View search history with cache indicators

---

## 📁 Key Files to Study

### Components
- `src/components/SearchPage/SearchPage.js` - Main search UI
- `src/components/AnalyticsPage/AnalyticsPage.js` - Dashboard
- `src/components/HistoryPage/HistoryPage.js` - History tracking

### Hooks (Custom State Logic)
- `src/hooks/useDrugSearch.js` - Search logic
- `src/hooks/useAnalytics.js` - Analytics fetch
- `src/hooks/useSearchHistory.js` - History logic

### API
- `src/services/drugAPI.js` - API endpoints
- `src/services/apiClient.js` - Axios config

---

## 🛠️ Development Commands

```bash
npm start       # Dev server (port 3000)
npm test        # Run tests
npm run build   # Production build
npm run eject   # Eject from CRA (irreversible!)
```

---

## 🎯 Learn from Code Comments

All files have comments explaining:
- **What** the code does
- **Why** it's structured this way
- **Best practices** implemented

Look for comments with:
- `/**` blocks at top of files
- `//` on complex logic
- `//✅` for best practices explained

---

## 📚 Documentation

1. **README_DETAILED.md** - Full project overview
2. **PROJECT_STRUCTURE.md** - Folder structure guide
3. **BEST_PRACTICES_GUIDE.md** - Interview prep guide

---

## ⚠️ Prerequisites

- Node.js 14+ installed
- npm or yarn
- Backend API running on `http://localhost:5000`

---

## 🐛 Troubleshooting

### Port 3000 already in use?
```bash
# Windows
netstat -ano | findstr :3000

# Kill process or run on different port
PORT=3001 npm start
```

### API connection error?
- Ensure backend API is running
- Check `.env` REACT_APP_API_URL
- Check browser console for CORS errors

### npm install fails?
```bash
# Clear npm cache
npm cache clean --force
rm -r node_modules package-lock.json
npm install
```

---

## 🎓 What to Learn First

1. **Component Structure**
   → Open `SearchPage.js`, understand component structure

2. **Custom Hooks**
   → Check `useDrugSearch.js`, see state management

3. **API Integration**
   → Look at `drugAPI.js`, understand service pattern

4. **Error Handling**
   → Trace error flow from service → hook → component

5. **Styling**
   → Check `SearchPage.css`, learn responsive design

---

## 🎯 Interview Questions

After learning the code, you should be able to explain:

1. "How is state managed in this app?"
2. "How are API calls structured?"
3. "How are errors handled?"
4. "Why use custom hooks?"
5. "How is the project organized?"
6. "What makes this scalable?"
7. "How would you add TypeScript?"
8. "How would you test this?"

---

**Ready to start? Run `npm start` and begin exploring! 🚀**
