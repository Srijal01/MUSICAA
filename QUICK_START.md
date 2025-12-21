# 🚀 Quick Start Guide - New Features

## Installation (No new dependencies needed!)

Everything works with your existing setup. Just start the servers:

```bash
# Terminal 1 - Backend
cd server
pnpm start

# Terminal 2 - Frontend
cd client
pnpm run dev
```

---

## 🎯 Using New Features

### 1. Wishlist ❤️

**Add Wishlist to any component:**

```jsx
import { useWishlist } from '../features/wishlist/WishlistContext';

function ProductCard({ product }) {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  
  const handleWishlist = () => {
    if (isInWishlist(product._id)) {
      removeFromWishlist(product._id);
    } else {
      addToWishlist(product);
    }
  };
  
  return (
    <button onClick={handleWishlist}>
      {isInWishlist(product._id) ? '❤️ Saved' : '🤍 Save to Wishlist'}
    </button>
  );
}
```

**Access wishlist page:** Navigate to `/wishlist`

---

### 2. Product Reviews ⭐

**Add reviews to product detail page:**

```jsx
import ProductReviews from '../features/reviews/ProductReviews';

function ProductDetailPage() {
  const [reviews, setReviews] = useState([]);
  
  return (
    <div>
      {/* Product details here */}
      
      <ProductReviews 
        productId={productId} 
        reviews={reviews}
      />
    </div>
  );
}
```

---

### 3. Product Comparison 🔍

**Add comparison button:**

```jsx
import { useCompare } from '../features/products/CompareContext';

function ProductCard({ product }) {
  const { addToCompare, isInCompare, canAddMore } = useCompare();
  
  const handleCompare = () => {
    const result = addToCompare(product);
    if (!result.success) {
      alert(result.message);
    }
  };
  
  return (
    <button 
      onClick={handleCompare}
      disabled={!canAddMore && !isInCompare(product._id)}
    >
      {isInCompare(product._id) ? '✓ In Comparison' : '⚖️ Compare'}
    </button>
  );
}
```

**Access comparison page:** Navigate to `/compare`

---

### 4. Notifications 🔔

**Show toast notifications:**

```jsx
import { useNotification } from '../shared/contexts/NotificationContext';

function MyComponent() {
  const { success, error, warning, info } = useNotification();
  
  const handleAddToCart = async () => {
    try {
      await addToCart(product);
      success('Added to cart!');
    } catch (err) {
      error('Failed to add to cart');
    }
  };
  
  return <button onClick={handleAddToCart}>Add to Cart</button>;
}
```

---

### 5. Atomic Components 🎨

**Use pre-built components:**

```jsx
import { Button, Card, Badge, Rating, Input } from '../ui';

function MyComponent() {
  return (
    <Card hover>
      <Badge variant="success">New</Badge>
      <Rating value={4.5} size="lg" />
      
      <Input 
        label="Email"
        type="email"
        placeholder="Enter your email"
        required
      />
      
      <Button variant="primary" size="lg" icon="🛒">
        Add to Cart
      </Button>
    </Card>
  );
}
```

**Button variants:** `primary`, `secondary`, `outline`, `danger`, `success`, `ghost`
**Button sizes:** `sm`, `md`, `lg`

---

### 6. Advanced Filtering 🎯

**Add filter panel to products page:**

```jsx
import FilterPanel from '../ui/molecules/FilterPanel';

function ProductsPage() {
  const handleApplyFilters = (filters) => {
    console.log('Applied filters:', filters);
    // Fetch products with filters
  };
  
  const handleReset = () => {
    // Reset filters and fetch all products
  };
  
  return (
    <div className="flex gap-4">
      <FilterPanel 
        onApplyFilters={handleApplyFilters}
        onReset={handleReset}
      />
      
      <div className="flex-1">
        {/* Product grid */}
      </div>
    </div>
  );
}
```

---

### 7. Search Bar 🔎

**Add enhanced search:**

```jsx
import SearchBar from '../ui/molecules/SearchBar';

function Navbar() {
  const [suggestions] = useState([
    'Acoustic Guitar',
    'Electric Guitar',
    'Piano',
    'Drums'
  ]);
  
  const handleSearch = (query) => {
    // Navigate to search results or filter products
    navigate(`/products?search=${query}`);
  };
  
  return (
    <SearchBar 
      onSearch={handleSearch}
      suggestions={suggestions}
      placeholder="Search for instruments..."
    />
  );
}
```

---

### 8. Custom Hooks 🪝

**Use utility hooks:**

```jsx
import { useLocalStorage, useDebounce } from '../shared/hooks';

function MyComponent() {
  // Persistent state
  const [theme, setTheme] = useLocalStorage('theme', 'dark');
  
  // Debounced search
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm, 500);
  
  useEffect(() => {
    // This only runs 500ms after user stops typing
    if (debouncedSearch) {
      searchProducts(debouncedSearch);
    }
  }, [debouncedSearch]);
  
  return (
    <input 
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      placeholder="Search..."
    />
  );
}
```

---

## 🎨 Styling Examples

### Button Styles
```jsx
<Button variant="primary">Primary Action</Button>
<Button variant="secondary">Secondary Action</Button>
<Button variant="outline">Outlined Button</Button>
<Button variant="danger">Delete</Button>
<Button variant="success">Save</Button>
<Button variant="ghost">Cancel</Button>

<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>

<Button loading>Processing...</Button>
<Button disabled>Disabled</Button>
<Button icon="🛒">With Icon</Button>
```

### Card Styles
```jsx
<Card>Basic Card</Card>
<Card hover>Hoverable Card</Card>
<Card className="p-8">Custom Padding</Card>
```

### Badge Styles
```jsx
<Badge variant="default">Default</Badge>
<Badge variant="primary">Primary</Badge>
<Badge variant="success">Success</Badge>
<Badge variant="warning">Warning</Badge>
<Badge variant="danger">Danger</Badge>
<Badge variant="info">Info</Badge>

<Badge size="sm">Small</Badge>
<Badge size="md">Medium</Badge>
<Badge size="lg">Large</Badge>
```

### Rating Styles
```jsx
<Rating value={4.5} />
<Rating value={3} size="lg" />
<Rating 
  value={userRating} 
  readOnly={false}
  onChange={(rating) => setUserRating(rating)}
/>
```

---

## 📁 Project Organization

### Where to find things:

- **UI Components**: `client/src/ui/`
  - Atoms: `ui/atoms/`
  - Molecules: `ui/molecules/`
  
- **Features**: `client/src/features/`
  - Wishlist: `features/wishlist/`
  - Reviews: `features/reviews/`
  - Compare: `features/products/`
  
- **Hooks**: `client/src/shared/hooks/`
- **Contexts**: `client/src/shared/contexts/`
- **Backend Models**: `server/src/models/`
- **Backend Routes**: `server/src/routes/`
- **Backend Controllers**: `server/src/controllers/`

---

## 🐛 Troubleshooting

### Issue: "Cannot find module"
**Solution**: Make sure paths are correct. Use relative imports:
```jsx
// ✅ Correct
import Button from '../ui/atoms/Button';

// ❌ Wrong
import Button from 'ui/atoms/Button';
```

### Issue: "useWishlist must be used within WishlistProvider"
**Solution**: Make sure App.jsx wraps routes with providers (already done).

### Issue: Reviews not saving
**Solution**: Ensure backend is running and review routes are registered in server.js (already done).

---

## 🎯 Tips

1. **Import from index files** for cleaner imports:
   ```jsx
   import { Button, Card, Badge } from '../ui';
   ```

2. **Use TypeScript** (optional) for better type safety

3. **Test components** in isolation using Storybook (future enhancement)

4. **Follow atomic design** - build small, reusable components

5. **Use contexts** for global state instead of prop drilling

---

## 🚀 Ready to Go!

Your project is now equipped with:
- ✅ Modern architecture
- ✅ Reusable components
- ✅ Advanced features
- ✅ Better organization

Start building amazing features! 🎉

**Need help?** Check:
- `NEW_ARCHITECTURE.md` - Detailed architecture guide
- `CHANGES_SUMMARY.md` - Complete list of changes
- `README.md` - Updated project documentation
