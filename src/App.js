import logo from './logo.svg';
import './App.css';

function App() {
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
            <input
              type="text"
              placeholder="Rechercher un produit"
            />
            <button type="submit"><i className="fa fa-search"></i></button>
            <div className="fav" style={{ marginLeft: '10px' }}>
              <a href="#">
                <img 
                  src="https://cdn-icons-png.flaticon.com/512/812/812327.png" 
                  alt="Favorites Icon" 
                  style={{ width: '3vh' }} 
                />
              </a>
            </div>
          </div>
        </div>

        <div className="bottom-header">
          <p>Promo spéciale : Livraison gratuite pour toute commande supérieure à 100€ !</p>
        </div>
      </header>
    </div>
  );
}

export default App;
