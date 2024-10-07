// Liste des produits avec leur disponibilité en stock
const produits = [
    {
      category: "Fruits",
      price: "$1",
      inStock: true,
      name: "Apple",
    },
    {
      category: "Vegetables",
      price: "$1",
      inStock: true,
      name: "Peas",
    },
    {
      category: "Fruits",
      price: "$1",
      inStock: true,
      name: "Dragonfruit",
    },
    {
      category: "Fruits",
      price: "$2",
      inStock: false,
      name: "Passionfruit",
    },
    {
      category: "Vegetables",
      price: "$2",
      inStock: true,
      name: "Spinach",
    },
    {
      category: "Vegetables",
      price: "$4",
      inStock: false,
      name: "Pumpkin",
    },
  ];
  
  const searchInput = document.getElementById('search');
  const inStockCheckbox = document.getElementById('in-stock');
  const productTableBody = document.querySelector('#product-table tbody');
  
  // Fonction pour afficher les produits dans le tableau
  function afficherProduits(produitsFiltres) {
    productTableBody.innerHTML = ''; // Vider le tableau avant d'ajouter les nouveaux produits
    
    const loadingMessage = document.createElement('tr');
    loadingMessage.innerHTML = '<td colspan="2">Loading...</td>';
    productTableBody.appendChild(loadingMessage);
  
    // Simuler un léger délai pour imiter un chargement
    setTimeout(() => {
      productTableBody.innerHTML = ''; // Vider le "Loading..."
  
      if (produitsFiltres.length === 0) {
        productTableBody.innerHTML = '<tr><td colspan="2">Aucun produit trouvé</td></tr>';
        return;
      }
  
      produitsFiltres.forEach(produit => {
        const ligne = document.createElement('tr');
        ligne.innerHTML = `<td>${produit.name}</td><td>${produit.price}</td>`;
        if (!produit.inStock) {
          ligne.classList.add('red'); // Ajouter la classe 'red' si le produit n'est pas en stock
        }
        productTableBody.appendChild(ligne);
      });
    }, 300); // Délai simulé de 300ms
  }
  
  // Fonction pour filtrer les produits
  function filtrerProduits() {
    const rechercheTexte = searchInput.value.toLowerCase();
    const montrerEnStockSeulement = inStockCheckbox.checked;
  
    const produitsFiltres = produits.filter(produit => {
      const correspondNom = produit.name.toLowerCase().includes(rechercheTexte);
      const correspondStock = !montrerEnStockSeulement || produit.inStock;
      return correspondNom && correspondStock;
    });
  
    afficherProduits(produitsFiltres);
  }
  
  // Initialiser avec tous les produits affichés
  afficherProduits(produits);
  
  // Ajouter des écouteurs d'événements
  searchInput.addEventListener('input', filtrerProduits);
  inStockCheckbox.addEventListener('change', filtrerProduits);
