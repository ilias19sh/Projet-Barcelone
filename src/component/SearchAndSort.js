import { useState } from 'react';

// Données des produits
const products = [
    { id: 1, name: 'Air Force 1', price: 120 },
    { id: 2, name: 'Air Max 90', price: 130 },
    { id: 3, name: 'Jordan 1', price: 150 },
    { id: 4, name: 'Air Zoom Pegasus', price: 110 },
];

function SearchAndSort() {
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOrder, setSortOrder] = useState('asc'); // 'asc' pour croissant, 'desc' pour décroissant

    // Filtrer les produits par lettres de début (case-insensitive)
    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().startsWith(searchTerm.toLowerCase())
    );

    // Trier les produits par prix en fonction du sortOrder
    const sortedProducts = filteredProducts.sort((a, b) => {
        if (sortOrder === 'asc') return a.price - b.price;
        if (sortOrder === 'desc') return b.price - a.price;
        return 0;
    });

    return (
        <div>
            <input
                type="text"
                placeholder="Rechercher un produit..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ marginRight: '10px', padding: '5px' }}
            />

            <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                style={{ padding: '5px' }}
            >
                <option value="asc">Prix croissant</option>
                <option value="desc">Prix décroissant</option>
            </select>

            <ul style={{ marginTop: '20px' }}>
                {sortedProducts.length > 0 ? (
                    sortedProducts.map((product) => (
                        <li key={product.id}>
                            {product.name} - {product.price}€
                        </li>
                    ))
                ) : (
                    <li>Aucun produit trouvé</li>
                )}
            </ul>
        </div>
    );
}

export default SearchAndSort;