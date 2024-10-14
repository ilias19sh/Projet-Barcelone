//API : 

// src/api.js

const API_URL = 'http://localhost:8055'; // URL de l'API Directus

// Fonction GET
export const fetchItems = async (table) => {
    try {
        const response = await fetch(`${API_URL}/items/${table}`);
        const data = await response.json();
        return data.data; // Renvoie les données
    } catch (error) {
        console.error('Error fetching items:', error);
        throw error;
    }
};

// Fonction POST

const TOKEN = '8CuMOrKSBROps1X1zmIwZ9XTlz_NgBOO'; 

export const postToDirectus = async function postData(dataToPost, collection) {
    const myInit = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${TOKEN}`,  // Ajout du token ici
        },
        body: JSON.stringify({ data: dataToPost }),
    };

    try {
        const response = await fetch(`${API_URL}/items/${collection}`, myInit);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error(`Erreur lors de l'envoi des données à ${collection}:`, error);
        throw error;
    }
};

export default postToDirectus;




// Fonction POST pour créer un item
export const createItem = async (table, item) => {
    try {
        const response = await fetch(`${API_URL}/items/${table}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ data: item }),
        });
        const data = await response.json();
        return data.data; // Renvoie l'élément créé
    } catch (error) {
        console.error('Error creating item:', error);
        throw error;
    }
};

// Fonction PUT (Update)
export const updateItem = async (table, id, updatedData) => {
    try {
        const response = await fetch(`${API_URL}/items/${table}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ data: updatedData }),
        });
        const data = await response.json();
        return data.data; // Renvoie l'élément mis à jour
    } catch (error) {
        console.error('Error updating item:', error);
        throw error;
    }
};

// Fonction DELETE
export const deleteItem = async (table, id) => {
    try {
        const response = await fetch(`${API_URL}/items/${table}/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('Erreur lors de la suppression');
        }
    } catch (error) {
        console.error('Error deleting item:', error);
        throw error;
    }
};

// Fonction pour le login utilisateur
export const loginUser = async (email, password) => {
    try {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });
        const data = await response.json();
        return data; // Renvoie les données de l'utilisateur connecté
    } catch (error) {
        console.error('Erreur lors de la connexion:', error);
        throw error;
    }
};
