import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const carouselImages = [
    "https://www.footpack.fr/wp-content/uploads/2023/06/maillot-barca-2023-domicile-nike-1.webp",
    "https://www.sneakerstyle.fr/wp-content/uploads/2023/08/patta-x-nike-air-max-plus-tn-fc-barcelona-FN8260-001-01.webp",
    "https://store.fcbarcelona.com/cdn/shop/collections/THUMB2.jpg?v=1697437650",
    "https://via.placeholder.com/1920x800?text=Image+4"
  ];

  const shoesImages = [
    "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTZ-2bseiUy27iGDfiOT2HaBe1QUaE_ZJ9OYd5K33lY22bRF3NH0r1kgVgyIkQW22GVylG30EtBIH4ITUgl_HZupF0jD-VOR8kLfdhV45siVe4IQafEB61I_pYvN2QKuzs4HHbUne4&usqp=CAc",
    "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQVDM6lEMSzK5b837P3LT4hbVVDyxqPdGydXpOkH0S1b5ZoMTJAbIlwNYdomsijZL1aU1bhje-Q8aJZWbS_JU_345aCOl5GM59URTjyDg7oY2fZn-sZY1rRukGUSUnnP5IceTcKfeI&usqp=CAc",
    "https://static.nike.com/a/images/t_default/e62a8575-6c96-4532-9780-63fc64d75a48/nikecourt-zoom-vapor-pro-2-hard-court-tennis-shoes-pvqmgl.png",
    "https://www.kicksusa.com/media/catalog/product/cache/3/image/9df78eab33525d08d6e5fb8d27136e95/N/I/NIKE_SNEAKER_002_NIAR9293_001.png"
  ];

  const sports = [
    { name: "Football", image: "https://assets-fr.imgfoot.com/barca-65da1f2d62919.jpg" },
    { name: "Volleyball", image: "https://www.fcbarcelona.com/photo-resources/2024/03/20/194a8544-ecb8-4b70-8238-db5b1a6087e7/2024-02-25_EQUIPSVOLEIMASCULI_06.JPG?width=1200&height=750" },
    { name: "Basket", image: "https://store.fcbarcelona.com/cdn/shop/collections/VO231113A42398.jpg?v=1727078777" },
    { name: "Handball", image: "https://img.lemde.fr/2021/06/13/0/0/4759/3173/664/0/75/0/ccdcce4_733d6da0852a4ae089b7608dab335e79-733d6da0852a4ae089b7608dab335e79-0.jpg" },
    { name: "Fournitures scolaires", image: "https://via.placeholder.com/200?text=Fournitures+Scolaires" }
  ];

  const categories = [
    { name: "Men", image: "https://cdn.resfu.com/media/img_news/agencia-efe_multimedia_55011352025.multimedia.photos.55011352025004.file.jpg?size=1000x&lossy=1" },
    { name: "Women", image: "https://store.fcbarcelona.com/cdn/shop/files/GP26058-Mejorado-NR.jpg?v=1692178231&width=1946" },
    { name: "Children", image: "https://store.fcbarcelona.com/cdn/shop/files/FN9233-456_3_cc1aefd6-0b90-4b2d-9021-319e7df197ea.jpg?v=1721278167" }
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentShoesIndex, setCurrentShoesIndex] = useState(0);

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

  return (
    <div className="App">
      <header>
        <div className="top-header">
          <div className="logo">
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
        <button className="prev" onClick={prevImage}>‹</button>
        <button className="next" onClick={nextImage}>›</button>
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
            />
          ))}
        </div>
        <button className="prev-shoes" onClick={prevShoes}>‹</button>
        <button className="next-shoes" onClick={nextShoes}>›</button>
      </div>

      <div className="sports-section">
        <h2 className="sports-title">Our Sports</h2>
        <div className="sports-grid">
          {sports.map((sport, index) => (
            <div className="sport-card" key={index} style={{ backgroundImage: `url(${sport.image})` }}>
              <div className="overlay">
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
              <div className="category-overlay">
                <h3>{category.name}</h3>
                <button>Voir {category.name}</button>
              </div>
            </div>
          ))}
        </div>
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
              <li><a href="#">Aide</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </div>

          <div className="footer-section">
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 FC Barcelona. Tous droits réservés.</p>
        </div>
      </footer>

      
    </div>
  );
}

export default App;
