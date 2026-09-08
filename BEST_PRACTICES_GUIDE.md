# React Best Practices Guide
## For Interview Preparation

This document explains the best practices implemented in the Drug Explorer Frontend project.

---

## 1. Component Architecture

### ✅ Functional Components with Hooks
Instead of class components, we use modern functional components with React hooks:

```javascript
// ✅ Good
const MyComponent = () => {
  const [state, setState] = useState(null);
  
  useEffect(() => {
    // Effect logic
  }, []);
  
  return <div>{state}</div>;
};

// ❌ Avoid
class MyComponent extends React.Component {
  // Legacy approach
}
```

**Why?** 
- Easier to understand and test
- Reusable logic through custom hooks
- Better code organization
- Smaller bundle size

### ✅ Single Responsibility Principle (SRP)
Each component has one responsibility:

```
Navigation/    → Just navigation menu
SearchPage/    → Search interface logic
common/        → Reusable UI components
```

---

## 2. State Management

### ✅ Custom Hooks for Business Logic
Encapsulate API calls and state in custom hooks:

```javascript
// src/hooks/useDrugSearch.js
const useDrugSearch = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const search = useCallback(async (query) => {
    setLoading(true);
    try {
      const result = await drugAPI.searchDrugs(query);
      setData(result);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);
  
  return { data, loading, error, search };
};

// Usage in component
const SearchPage = () => {
  const { data, loading, error, search } = useDrugSearch();
  // Use hook data
};
```

**Benefits:**
- Separates logic from UI
- Reusable across components
- Easier to test
- Clean component code

### ✅ useCallback for Optimization
Prevent unnecessary re-renders with useCallback:

```javascript
// Without useCallback (creates new function on every render)
<button onClick={() => handleClick()}>Click</button>

// ✅ With useCallback (same function reference)
const handleClick = useCallback(() => {
  // handle click
}, [dependencies]);

<button onClick={handleClick}>Click</button>
```

---

## 3. API Integration

### ✅ Service Layer Pattern
All API calls go through a service layer:

```
Component → Hook → Service → API Client
```

**Files:**
- `services/apiClient.js` - Axios configuration
- `services/drugAPI.js` - API endpoints
- `hooks/useDrugSearch.js` - Business logic

**Benefits:**
- Centralized API management
- Easy to mock for testing
- Consistent error handling
- Single point for API changes

### ✅ Error Handling
Comprehensive error handling at every level:

```javascript
// Service layer
const searchDrugs = async (query) => {
  if (!query || query.length < 2) {
    throw new Error('Query must be at least 2 characters');
  }
  
  try {
    const response = await apiClient.get('/drugs/search', {
      params: { query }
    });
    return response.data;
  } catch (error) {
    // API error already handled by interceptor
    throw error;
  }
};

// Hook layer
const search = useCallback(async (query) => {
  setLoading(true);
  setError(null);
  try {
    const result = await drugAPI.searchDrugs(query);
    setData(result);
  } catch (err) {
    setError({
      message: err.message,
      status: err.response?.status,
      data: err.response?.data
    });
  } finally {
    setLoading(false);
  }
}, []);

// Component layer
{error && <ErrorAlert error={error} onDismiss={handleDismiss} />}
```

---

## 4. Component Patterns

### ✅ Loading, Error, Data States
Always handle all states:

```javascript
// ✅ Good
{loading && <Spinner message="Loading..." />}
{error && <ErrorAlert error={error} />}
{data && <ResultsList data={data} />}
{!data && !loading && !error && <EmptyState />}

// ❌ Avoid - Only checking data
{data && <ResultsList data={data} />}
```

### ✅ Prop Drilling vs Context
For small apps, props are fine. For global state, use Context:

```javascript
// ✅ Props for local state (5-7 levels max)
<Parent prop1={val1}>
  <Child prop1={val1} />
</Parent>

// ✅ Context for global state (theme, auth, etc.)
const ThemeContext = React.createContext();

<ThemeContext.Provider value={theme}>
  <App />
</ThemeContext.Provider>
```

---

## 5. Styling Best Practices

### ✅ CSS Organization
- One CSS file per component/page
- Utility classes in global styles
- BEM naming convention (optional)

```css
/* src/styles/SearchPage.css */
.search-page { }
.search-form { }
.search-input { }
.results-list { }
.result-group { }
```

### ✅ Responsive Design - Mobile First
Start with mobile, then scale up:

```css
/* Mobile-first approach */
.container {
  padding: 20px;
}

/* Then add breakpoints */
@media (min-width: 768px) {
  .container {
    max-width: 750px;
    margin: 0 auto;
  }
}

@media (min-width: 1024px) {
  .container {
    max-width: 1200px;
  }
}
```

---

## 6. Code Quality

### ✅ Naming Conventions
Clear, descriptive names:

```javascript
// ✅ Good names
const [isLoading, setIsLoading] = useState(false);
const [drugResults, setDrugResults] = useState([]);
const handleSearchSubmit = () => {};
const calculateCacheHitRate = (hits, total) => {};

// ❌ Avoid vague names
const [loading, setLoading] = useState(false); // Could be anything
const [data, setData] = useState(null); // Too generic
const onSubmit = () => {}; // What submits?
const calc = () => {}; // Calculate what?
```

### ✅ Comments
Only comment "why", not "what":

```javascript
// ❌ Obvious - don't comment
const doubled = numbers.map(n => n * 2); // Double each number

// ✅ Valuable - explains decision
// Cache results to avoid repeated API calls for common searches
const memoizedResults = useMemo(() => {
  return computeResults(data);
}, [data]);
```

### ✅ DRY Principle (Don't Repeat Yourself)
Extract reusable logic:

```javascript
// ❌ Repetitive
const Page1 = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const fetch = async () => {
    setLoading(true);
    // ...
  };
};

const Page2 = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const fetch = async () => {
    setLoading(true);
    // ...
  };
};

// ✅ Extracted to custom hook
const useFetch = (fetchFunction) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const fetch = useCallback(async () => {
    setLoading(true);
    try {
      const result = await fetchFunction();
      setData(result);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [fetchFunction]);
  
  return { data, loading, error, fetch };
};

// Usage
const Page1 = () => {
  const { data, loading, error, fetch } = useFetch(apiCall1);
};

const Page2 = () => {
  const { data, loading, error, fetch } = useFetch(apiCall2);
};
```

---

## 7. Performance Optimization

### ✅ Code Splitting with React.lazy
Load components on demand:

```javascript
import { lazy, Suspense } from 'react';

const SearchPage = lazy(() => import('./SearchPage'));
const AnalyticsPage = lazy(() => import('./AnalyticsPage'));

<Suspense fallback={<Spinner />}>
  <SearchPage />
</Suspense>
```

### ✅ useMemo and useCallback
Prevent unnecessary recalculations:

```javascript
// ✅ Expensive computation cached
const expensive = useMemo(() => {
  return heavyCalculation(data);
}, [data]);

// ✅ Function reference stable
const handleClick = useCallback(() => {
  doSomething();
}, []);
```

---

## 8. Testing Patterns

### ✅ Testable Component Structure
```javascript
// Easy to test
export const SearchForm = ({ onSearch, isLoading }) => {
  return (
    <form onSubmit={() => onSearch(query)}>
      <input onChange={(e) => setQuery(e.target.value)} />
      <button disabled={isLoading}>Search</button>
    </form>
  );
};

// Test
test('calls onSearch with query', () => {
  const mockSearch = jest.fn();
  const { getByRole } = render(
    <SearchForm onSearch={mockSearch} isLoading={false} />
  );
  
  fireEvent.click(getByRole('button'));
  expect(mockSearch).toHaveBeenCalled();
});
```

---

## 9. Folder Structure Philosophy

```
src/
├── components/        # React components
├── hooks/            # Custom hooks (reusable logic)
├── services/         # API & external services
├── types/            # Type definitions
├── styles/           # CSS files
└── utils/            # Helper functions

Benefits:
- Clear separation of concerns
- Easy to locate code
- Scalable structure
- Easy to onboard new developers
```

---

## 10. Interview Talking Points

### When asked "Tell me about your React project":

1. **Architecture**: "I implemented a modular component architecture with separation of concerns..."

2. **State Management**: "I used custom hooks to encapsulate complex state logic, making components simpler..."

3. **API Integration**: "I implemented a service layer pattern with axios, providing centralized API management..."

4. **Error Handling**: "I handle errors at every level - service, hook, and component - providing better UX..."

5. **Performance**: "I optimize with useCallback, useMemo, and lazy loading..."

6. **Testing**: "Components are designed to be testable with clear props and callbacks..."

7. **Accessibility**: "I use semantic HTML and ensure keyboard navigation..."

---

## Common Interview Questions

**Q: How would you manage complex state?**
A: "For this project's scale, custom hooks work well. For larger apps, I'd consider Redux or Context API."

**Q: How do you handle errors?**
A: "I use try-catch at service layer, display user-friendly messages in components, and log errors for debugging."

**Q: How do you optimize performance?**
A: "useCallback for functions, useMemo for expensive computations, and React.lazy for code splitting."

**Q: How would you test this?**
A: "Unit tests for hooks and utilities, integration tests for components, and E2E tests for user flows."

**Q: How would you scale this application?**
A: "Add TypeScript for type safety, implement Redux for state management, add testing infrastructure, and consider monorepo structure."

---

## Resources for Learning

- React Docs: https://react.dev
- React Hooks Deep Dive: https://react.dev/reference/react/hooks
- Custom Hooks Patterns: https://react.dev/learn/reusing-logic-with-custom-hooks
- Performance Optimization: https://react.dev/reference/react/useMemo

---

## Summary

This project demonstrates production-ready React patterns:
- ✅ Component composition
- ✅ Custom hooks for logic reuse
- ✅ Service layer pattern
- ✅ Comprehensive error handling
- ✅ Responsive design
- ✅ Performance optimization
- ✅ Clean code practices
- ✅ Scalable structure

Use these patterns as reference for interviews and real-world projects!
