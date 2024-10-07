import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const carouselImages = [
    "https://www.footpack.fr/wp-content/uploads/2023/06/maillot-barca-2023-domicile-nike-1.webp",
    "https://www.sneakerstyle.fr/wp-content/uploads/2023/08/patta-x-nike-air-max-plus-tn-fc-barcelona-FN8260-001-01.webp",
    "https://via.placeholder.com/1920x800?text=Image+3",
    "https://via.placeholder.com/1920x800?text=Image+4"
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const getTransformValue = () => {
    return `translateX(-${currentImageIndex * 100}%)`;
  };

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

  useEffect(() => {
    const interval = setInterval(() => {
      nextImage();
    }, 8000); 
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
              <li><a href="#">Trouver un magasin |</a></li>
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
        <button className="prev" onClick={prevImage}>
          
        </button>
        <button className="next" onClick={nextImage}>
          
        </button>
      </div>
    </div>
  );
}

export default App;
