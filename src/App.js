import React, { useState, useEffect } from 'react';
import './App.css';
import productData from './products.json';

function App() {
  const { carouselImages, shoesImages, sports, categories } = productData;
  const [page, setPage] = useState('home');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentShoesIndex, setCurrentShoesIndex] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

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
    const interval = setInterval(() => {
      nextImage();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setPage('product');
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setPage('category');
  };

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
        <h2>Nike Shoes</h2>
        <div className="shoes-carousel" style={{ transform: getShoesTransformValue() }}>
          {shoesImages.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Shoe ${index + 1}`}
              className="shoes-carousel-image"
              onClick={() => handleProductClick({ name: `Shoe ${index + 1}`, image })}
            />
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
              <div className="overlay" onClick={() => handleCategoryClick(sport)}>
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
                <button>Voir {category.name}</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderProductPage = () => (
    <div>
      <h2>{selectedProduct.name}</h2>
      <img src={selectedProduct.image} alt={selectedProduct.name} />
      {/* Additional product details can be added here */}
      <button onClick={() => setPage('home')}>Retour</button>
    </div>
  );

  const renderCategoryPage = () => (
    <div>
      <h2>{selectedCategory.name}</h2>
      <div className="products-grid">
        {/* Assuming each category has a 'products' array in your data */}
        {selectedCategory.products.map((product, index) => (
          <div key={index} className="product-card" onClick={() => handleProductClick(product)}>
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
          </div>
        ))}
      </div>
      <button onClick={() => setPage('home')}>Retour</button>
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
              <li><a href="#">S'inscrire</a></li>
            </ul>
          </nav>
        </div>

        <div className="middle-header">
          <div className="nike">
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

          <div className="search-bar">
            <input type="text" placeholder="Rechercher un produit" />
            <button type="submit"><i className="fa fa-search"></i></button>
            <div className="fav" style={{ marginLeft: '10px' }}>
              <a href="#">
                <img src="https://cdn-icons-png.flaticon.com/512/812/812327.png" alt="Favorites Icon" style={{ width: '3vh' }} />
              </a>
            </div>
          </div>
        </div>
      </header>

      <div>
        {page === 'home' && renderHomePage()}
        {page === 'product' && renderProductPage()}
        {page === 'category' && renderCategoryPage()}
        {page === '404' && (
          <div>
            <h2>404 - Page Not Found</h2>
          </div>
        )}
      </div>

      <footer className="footer">
        <div className="footer-container">
          <div className="footer-section">
            <h3>Suivez-nous</h3>
            <ul className="footer-links">
              <li><a href="#">Cartes cadeaux</a></li>
              <li><a href="#">Trouver un magasin</a></li>
              <li><a href="#">Journal Nike</a></li>
              <li><a href="#">Devenez membre</a></li>
              <li><a href="#">Commentaire</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Liens utiles</h3>
            <ul className="footer-links">
              <li><a href="#">Conditions d'utilisation</a></li>
              <li><a href="#">Politique de confidentialité</a></li>
              <li><a href="#">Politique de retour</a></li>
              <li><a href="#">Plan du site</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Contactez-nous</h3>
            <ul className="footer-links">
              <li><a href="#">Aide</a></li>
              <li><a href="#">Ventes en gros</a></li>
              <li><a href="#">Inquiries</a></li>
              <li><a href="#">Appel</a></li>
              <li><a href="#">Email</a></li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
