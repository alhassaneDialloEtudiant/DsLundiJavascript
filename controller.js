// controller.js

// Importer les produits du fichier data.js
import { produits } from './data.js';

// Sélection des éléments HTML
const corpsTable = document.querySelector('#product-table tbody');
const champRecherche = document.getElementById('search');
const caseStockSeulement = document.getElementById('in-stock');

// Fonction pour afficher les produits filtrés
function afficherProduits() {
    const texteFiltre = champRecherche.value.toLowerCase();
    const seulementEnStock = caseStockSeulement.checked;
    
    // Vider la table avant de réinsérer les lignes filtrées
    corpsTable.innerHTML = '';

    // Filtrer les produits
    const produitsFiltres = produits.filter(produit => {
        const correspondNom = produit.name.toLowerCase().includes(texteFiltre);
        const correspondStock = !seulementEnStock || produit.stocked;
        return correspondNom && correspondStock;
    });

    // Afficher les produits sans les grouper par catégorie
    produitsFiltres.forEach(produit => {
        const ligne = document.createElement('tr');
        const celluleNom = document.createElement('td');
        const cellulePrix = document.createElement('td');

        celluleNom.textContent = produit.name;
        cellulePrix.textContent = produit.price;

        // Vérifier si le produit est en stock et appliquer la classe "red" si non
        if (!produit.stocked) {
            celluleNom.classList.add('red'); // Appliquer la classe 'red'
        }

        ligne.appendChild(celluleNom);
        ligne.appendChild(cellulePrix);
        corpsTable.appendChild(ligne);
    });
}

// Ajouter des écouteurs d'événements pour la recherche et le filtre
champRecherche.addEventListener('input', afficherProduits);
caseStockSeulement.addEventListener('change', afficherProduits);

// Afficher les produits au chargement initial de la page
window.onload = afficherProduits;
