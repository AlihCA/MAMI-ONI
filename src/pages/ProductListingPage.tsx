import { useState, useMemo } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Filter, Grid3X3, List, ChevronDown } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { products, categories } from '../data/products';

const ProductListingPage = () => {
  const { category } = useParams();
  const [searchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('featured');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    priceRange: [0, 500],
    sizes: [] as string[],
    colors: [] as string[],
    rating: 0,
    category: category || 'all'
  });

  const searchQuery = searchParams.get('search') || '';
  const filterType = searchParams.get('filter') || '';

  const filteredProducts = useMemo(() => {
    let filtered = products;

    // Apply search
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply category filter
    if (category && category !== 'all') {
      filtered = filtered.filter(product => product.category === category);
    }

    // Apply special filters
    if (filterType === 'sale') {
      filtered = filtered.filter(product => product.originalPrice);
    } else if (filterType === 'new') {
      filtered = filtered.slice(-4); // Last 4 products as "new"
    }

    // Apply price range
    filtered = filtered.filter(product =>
      product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1]
    );

    // Apply size filter
    if (filters.sizes.length > 0) {
      filtered = filtered.filter(product =>
        product.sizes.some(size => filters.sizes.includes(size))
      );
    }

    // Apply color filter
    if (filters.colors.length > 0) {
      filtered = filtered.filter(product =>
        product.colors.some(color => filters.colors.includes(color))
      );
    }

    // Apply rating filter
    if (filters.rating > 0) {
      filtered = filtered.filter(product => product.rating >= filters.rating);
    }

    // Apply sorting
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        filtered.reverse();
        break;
      default:
        // Featured order (default)
        break;
    }

    return filtered;
  }, [category, searchQuery, filterType, filters, sortBy]);

  const handleFilterChange = (filterType: string, value: any) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const allSizes = Array.from(new Set(products.flatMap(p => p.sizes)));
  const allColors = Array.from(new Set(products.flatMap(p => p.colors)));

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="text-sm text-gray-600">
            <span>Home</span>
            {category && (
              <>
                <span className="mx-2">/</span>
                <span className="capitalize">{category.replace('-', ' ')}</span>
              </>
            )}
            {searchQuery && (
              <>
                <span className="mx-2">/</span>
                <span>Search results for "{searchQuery}"</span>
              </>
            )}
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className={`lg:w-64 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white rounded-lg p-6 shadow-sm space-y-6">
              <h3 className="font-semibold text-lg">Filters</h3>

              {/* Categories */}
              <div>
                <h4 className="font-medium mb-3">Category</h4>
                <div className="space-y-2">
                  {categories.map((cat) => (
                    <label key={cat.id} className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="category"
                        checked={filters.category === cat.id}
                        onChange={() => handleFilterChange('category', cat.id)}
                        className="text-blue-600"
                      />
                      <span className="text-sm">{cat.name} ({cat.count})</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <h4 className="font-medium mb-3">Price Range</h4>
                <div className="space-y-2">
                  <input
                    type="range"
                    min="0"
                    max="500"
                    value={filters.priceRange[1]}
                    onChange={(e) => handleFilterChange('priceRange', [0, parseInt(e.target.value)])}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>₱0</span>
                    <span>₱{filters.priceRange[1]}</span>
                  </div>
                </div>
              </div>

              {/* Sizes */}
              <div>
                <h4 className="font-medium mb-3">Size</h4>
                <div className="grid grid-cols-3 gap-2">
                  {allSizes.map((size) => (
                    <label key={size} className="flex items-center space-x-1">
                      <input
                        type="checkbox"
                        checked={filters.sizes.includes(size)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            handleFilterChange('sizes', [...filters.sizes, size]);
                          } else {
                            handleFilterChange('sizes', filters.sizes.filter(s => s !== size));
                          }
                        }}
                        className="text-blue-600"
                      />
                      <span className="text-sm">{size}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Colors */}
              <div>
                <h4 className="font-medium mb-3">Color</h4>
                <div className="grid grid-cols-4 gap-2">
                  {allColors.map((color) => (
                    <label key={color} className="flex flex-col items-center space-y-1">
                      <input
                        type="checkbox"
                        checked={filters.colors.includes(color)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            handleFilterChange('colors', [...filters.colors, color]);
                          } else {
                            handleFilterChange('colors', filters.colors.filter(c => c !== color));
                          }
                        }}
                        className="sr-only"
                      />
                      <div
                        className={`w-8 h-8 rounded-full border-2 cursor-pointer ${
                          filters.colors.includes(color) ? 'border-black' : 'border-gray-300'
                        } ${
                          color.toLowerCase() === 'black' ? 'bg-black' :
                          color.toLowerCase() === 'white' ? 'bg-white' :
                          color.toLowerCase() === 'navy' ? 'bg-blue-900' :
                          color.toLowerCase() === 'red' ? 'bg-red-500' :
                          color.toLowerCase() === 'blue' ? 'bg-blue-500' :
                          color.toLowerCase() === 'green' ? 'bg-green-500' :
                          color.toLowerCase() === 'grey' || color.toLowerCase() === 'gray' ? 'bg-gray-500' :
                          'bg-gray-300'
                        }`}
                      />
                      <span className="text-xs">{color}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Rating */}
              <div>
                <h4 className="font-medium mb-3">Rating</h4>
                <div className="space-y-2">
                  {[4, 3, 2, 1].map((rating) => (
                    <label key={rating} className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="rating"
                        checked={filters.rating === rating}
                        onChange={() => handleFilterChange('rating', rating)}
                        className="text-blue-600"
                      />
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <span
                            key={i}
                            className={`text-sm ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
                          >
                            ★
                          </span>
                        ))}
                        <span className="text-sm text-gray-600">& up</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {searchQuery ? `Search results for "${searchQuery}"` : 
                   category ? category.charAt(0).toUpperCase() + category.slice(1) : 
                   'All Products'}
                </h1>
                <p className="text-gray-600 text-sm mt-1">
                  {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
                </p>
              </div>

              <div className="flex items-center space-x-4">
                {/* Mobile Filter Toggle */}
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  <Filter size={16} />
                  <span>Filters</span>
                </button>

                {/* Sort Dropdown */}
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none bg-white border border-gray-300 rounded-md px-4 py-2 pr-8 text-sm focus:outline-none focus:border-blue-500"
                  >
                    <option value="featured">Featured</option>
                    <option value="newest">Newest</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                </div>

                {/* View Mode Toggle */}
                <div className="hidden sm:flex border border-gray-300 rounded-md">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 ${viewMode === 'grid' ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
                  >
                    <Grid3X3 size={16} />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 ${viewMode === 'list' ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
                  >
                    <List size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <div className={`grid gap-6 ${
                viewMode === 'grid' 
                  ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' 
                  : 'grid-cols-1'
              }`}>
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} showQuickView={true} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
                <button
                  onClick={() => setFilters({
                    priceRange: [0, 500],
                    sizes: [],
                    colors: [],
                    rating: 0,
                    category: 'all'
                  })}
                  className="mt-4 text-blue-600 hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            )}

            {/* Load More */}
            {filteredProducts.length > 0 && (
              <div className="text-center mt-12">
                <button className="bg-white border border-gray-300 text-gray-700 px-8 py-3 rounded-md hover:bg-gray-50 transition-colors">
                  Load More Products
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductListingPage;