import React, { useState, useEffect } from 'react';
import './App.css';
import productData from './products.json';

function App() {
  const { carouselImages, shoesImages, sports, categories } = productData;
  const [page, setPage] = useState('home');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentShoesIndex, setCurrentShoesIndex] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedSport, setSelectedSport] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all'); 
  const [selectedSize, setSelectedSize] = useState(null);

  const getTransformValue = () => `translateX(-${currentImageIndex * 100}%)`;
  const getShoesTransformValue = () => `translateX(-${currentShoesIndex * 25}%)`;

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === carouselImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? carouselImages.length - 1 : prevIndex - 1
    );
  };

  const nextShoes = () => {
    setCurrentShoesIndex((prevIndex) =>
      prevIndex >= shoesImages.length - 4 ? 0 : prevIndex + 1
    );
  };

  const prevShoes = () => {
    setCurrentShoesIndex((prevIndex) =>
      prevIndex === 0 ? shoesImages.length - 4 : prevIndex - 1
    );
  };

  useEffect(() => {
    const interval = setInterval(nextImage, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setPage('product');
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category.name.toLowerCase());
    setPage('category');
  };

  const handleSizeClick = (size) => setSelectedSize(size);

  const handleAddToCart = () => {
    if (selectedSize) {
      alert(`Added ${selectedProduct.name} (Size: ${selectedSize}) to cart!`);
    } else {
      alert('Please select a size before adding to cart.');
    }
  };
  
  const handleSportClick = (sport) => {
    setSelectedSport(sport);
    setSelectedCategory(sport.name.toLowerCase()); 
    setPage('sport');
    console.log('sport :', sport); 
  };

  const filterProducts = () => {
    console.log("selectedCategory:", selectedCategory); // Vérifiez la valeur de selectedCategory
    console.log("shoesImages:", shoesImages); // Vérifiez le contenu de shoesImages

    let category = selectedCategory;

    // Mapping French category to product type
    const categoryMapping = {
      'chaussure': 'sneakers',
      // Ajoutez d'autres mappings si nécessaire
    };

    if (categoryMapping[category]) {
      category = categoryMapping[category];
    }

    if (category === 'all') {
      return shoesImages;
    }

    return shoesImages.filter(product => product.type.toLowerCase() === category);
  };

  console.log("selectedSport:", selectedSport);

  const renderHomePage = () => (
    <div>
      <div className="carousel-container">
        <div className="carousel" style={{ transform: getTransformValue() }}>
          {carouselImages.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Slide ${index + 1}`}
              className="carousel-image"
            />
          ))}
        </div>
        <div>
          <button className="prev" onClick={prevImage}>‹</button>
          <button className="next" onClick={nextImage}>›</button>
        </div>
      </div>

      <div className="shoes-carousel-container">
        <h2>Nike product</h2>
        <div className="shoes-carousel" style={{ transform: getShoesTransformValue() }}>
          {shoesImages.map((shoe, index) => (
            <div key={index} className="shoe-item">
              <img
                src={shoe.image}
                alt={shoe.name}
                className="shoes-carousel-image"
                onClick={() =>
                  handleProductClick({
                    name: shoe.name,
                    image: shoe.image,
                    sizes: ['38', '39', '40', '41', '42'],
                    price: shoe.price,
                  })
                }
              />
              <div className="shoe-info">
                <p className="shoe-name">{shoe.name}</p>
                <p className="shoe-price">{shoe.price}€</p>
              </div>
            </div>
          ))}
        </div>
        <div>
          <button className="prev-shoes" onClick={prevShoes}>‹</button>
          <button className="next-shoes" onClick={nextShoes}>›</button>
        </div>
      </div>

      <div className="sports-section">
        <h2 className="sports-title">Our Sports</h2>
        <div className="sports-grid">
          {sports.map((sport, index) => (
            <div className="sport-card" key={index} style={{ backgroundImage: `url(${sport.image})` }}>
              <div className="overlay" onClick={() => handleSportClick(sport)}>
                <h3>{sport.name}</h3>
                <button>Shop {sport.name}</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="categories-section">
        <h2 className="categories-title">Nos Catégories</h2>
        <div className="categories-grid">
          {categories.map((category, index) => (
            <div className="category-card" key={index} style={{ backgroundImage: `url(${category.image})` }}>
              <div className="category-overlay" onClick={() => handleCategoryClick(category)}>
                <h3>{category.name}</h3>
                <button className="action-button">Voir {category.name}</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderProductPage = () => (
    <div className="product-details">
      <div className="product-filters">
        <h3>Filters</h3>
        <label><input type="checkbox" /> chaussure</label>
        <label><input type="checkbox" /> maillot</label>
        <label><input type="checkbox" /> fournitures scolaire</label>
      </div>

      <div className="product-main">
        <h2>{selectedProduct.name}</h2>
        <img src={selectedProduct.image} alt={selectedProduct.name} />
        <p>{selectedProduct.description}</p>
      </div>

      <div className="product-sizes">
        <h3>Select Size</h3>
        <div className="sizes">
          {selectedProduct.sizes.map((size, index) => (
            <button
              key={index}
              className={`size-button ${selectedSize === size ? 'selected' : ''}`}
              onClick={() => handleSizeClick(size)}
            >
              {size}
            </button>
          ))}
        </div>
        <button className="add-to-cart-button" onClick={handleAddToCart}>
          Add to Cart
        </button>
      </div>
    </div>
  );

  const renderCategoryPage = () => (
    <div>
      <h2>{selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}</h2>
      <div className="products-grid">
        {shoesImages
          .filter(product => product.type.toLowerCase() === selectedCategory)
          .map((product, index) => (
            <div key={index} className="product-card" onClick={() => handleProductClick(product)}>
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
            </div>
          ))}
      </div>
      <button onClick={() => setPage('home')}>Retour</button>
    </div>
  );

  const renderAllProductsPage = () => (
    <div className="products-page">
      <div className="filter-section">
        <h3>Filtres</h3>
        <div>
          <label>
            <input
              type="radio"
              name="category"
              value="all"
              checked={selectedCategory === 'all'}
              onChange={() => setSelectedCategory('all')}
            />
            Tous les produits
          </label>
        </div>
        <div>
          <label>
            <input
              type="radio"
              name="category"
              value="chaussure"
              checked={selectedCategory === 'chaussure'}
              onChange={() => setSelectedCategory('chaussure')}
            />
            Chaussures
          </label>
        </div>
        <div>
          <label>
            <input
              type="radio"
              name="category"
              value="fourniture"
              checked={selectedCategory === 'fourniture'}
              onChange={() => setSelectedCategory('fourniture')}
            />
            Fournitures
          </label>
        </div>
        <div>
          <label>
            <input
              type="radio"
              name="category"
              value="sport"
              checked={selectedCategory === 'sport'}
              onChange={() => setSelectedCategory('sport')}
            />
            Sports
          </label>
        </div>
      </div>
  
      <div className="products-section">
        <h2>Nos Produits</h2>
        <div className="products-grid">
          {filterProducts().map((shoe, index) => (
            <div key={index} className="product-card" onClick={() => handleProductClick(shoe)}>
              <img src={shoe.image} alt={shoe.name} className="product-image" />
              <h3>{shoe.name}</h3>
              <p>{shoe.price}€</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );  

  const renderSportPage = () => (
    <div className="sport-page">
        <h2>{selectedSport.name}</h2>
        <div className="sport-banner">
            <img src={selectedSport.image} alt={selectedSport.name} />
        </div>
        <div className="products-section">
            <h2>Nos Produits pour {selectedSport.name}</h2>
            <div className="products-grid">
                {filterProducts().map((shoe, index) => (
                    <div key={index} className="product-card" onClick={() => handleProductClick(shoe)}>
                        <img src={shoe.image} alt={shoe.name} className="product-image"/>
                        <h3>{shoe.name}</h3>
                        <p>{shoe.price}€</p>
                    </div>
                ))}
            </div>
        </div>
        <button onClick={() => setPage('home')}>Retour à l'accueil</button>
    </div>
  );

  
  return (
    <div className="App">
      <header>
        <div className="top-header">
          <div className="logo" onClick={() => setPage('home')}>
            <a href="#">
              <img src="https://upload.wikimedia.org/wikipedia/fr/thumb/a/a1/Logo_FC_Barcelona.svg/1011px-Logo_FC_Barcelona.svg.png" alt="FC Barcelona Logo" />
            </a>
          </div>
          <nav className="small-menu">
            <ul>
              <li><a href="#">Find a store |</a></li>
              <li><a href="#">Assistance |</a></li>
              <li><a href="#">Commandes |</a></li>
              <li><a href="#">S'inscrire |</a></li>
              <li><a href="#" onClick={() => setPage('all-products')}>Product</a></li>
            </ul>
          </nav>
        </div>

        <div className="middle-header">
          <div className="nike" onClick={() => setPage('home')}>
            <a href="#">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Logo_NIKE.svg/2560px-Logo_NIKE.svg.png" alt="Nike Logo" />
            </a>
          </div>
          <nav className="nav-links">
            <ul>
              <li><a href="#">New Releases</a></li>
              <li><a href="#">Men</a></li>
              <li><a href="#">Women</a></li>
              <li><a href="#">Kids</a></li>
              <li><a href="#">Sale</a></li>
            </ul>
          </nav>
          <nav className="icons">
            <ul>
              <li><a href="#">🔍</a></li>
              <li><a href="#">👤</a></li>
              <li><a href="#">🎒</a></li>
            </ul>
          </nav>
        </div>
      </header>
      <main>
        {page === 'home' && renderHomePage()}
        {page === 'product' && renderProductPage()}
        {page === 'category' && renderCategoryPage()}
        {page === 'all-products' && renderAllProductsPage()}
        {page === 'sport' && renderSportPage()}
      </main>
      <footer>
        <p>&copy; 2024 Nike Store. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
