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

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentShoesIndex, setCurrentShoesIndex] = useState(0);

  const getTransformValue = () => `translateX(-${currentImageIndex * 100}%)`;
  const getShoesTransformValue = () => `translateX(-${currentShoesIndex * 25}%)`; // Adjusted to move 25% per shoe

  // Function to handle the next image in the main carousel
  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === carouselImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Function to handle the previous image in the main carousel
  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? carouselImages.length - 1 : prevIndex - 1
    );
  };

  // Function to handle the next shoes in the shoes carousel
  const nextShoes = () => {
    setCurrentShoesIndex((prevIndex) =>
      prevIndex >= shoesImages.length - 4 ? 0 : prevIndex + 1
    );
  };

  // Function to handle the previous shoes in the shoes carousel
  const prevShoes = () => {
    setCurrentShoesIndex((prevIndex) =>
      prevIndex === 0 ? shoesImages.length - 4 : prevIndex - 1
    );
  };

  // Auto-slide for the main carousel
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

      {/* Carousel Section */}
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

      {/* Shoes Carousel */}
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
    </div>
  );
}

export default App;
