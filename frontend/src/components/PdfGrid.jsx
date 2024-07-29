import React, { useState } from 'react';
import { pdfFiles } from './pdfFiles'; // Assurez-vous que le chemin est correct
import { useAuth } from '../contexts/AuthContext';

const PdfGrid = () => {
  const { isAuthenticated } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4; // Nombre d'éléments par page

  // Log pour vérifier l'état d'authentification
  console.log('isAuthenticated:', isAuthenticated);

  const handleSearch = () => {
    if (!isAuthenticated) return; // Ne pas permettre la recherche si non authentifié

    console.log('Search Query:', searchQuery); // Log pour vérifier la requête de recherche

    const normalizedQuery = searchQuery.toLowerCase();
    const result = pdfFiles.filter(file => file.name.toLowerCase().includes(normalizedQuery));
    
    if (result.length > 0) {
      console.log('Search Result:', result); // Log pour vérifier les résultats de recherche
      setSearchResult(result);
    } else {
      console.log('No books found'); // Log si aucun livre n'est trouvé
      setSearchResult('No book found');
    }
    setCurrentPage(1); // Réinitialise la page actuelle à 1 lors d'une nouvelle recherche
  };

  // Calculer les documents à afficher pour la page actuelle
  const currentItems = searchResult === 'No book found' ? [] : (searchResult || pdfFiles).slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Log pour vérifier les éléments affichés sur la page actuelle
  console.log('Current Items:', currentItems);

  // Calculer le nombre total de pages
  const totalPages = Math.ceil((searchResult === 'No book found' ? 0 : (searchResult || pdfFiles).length) / itemsPerPage);

  // Log pour vérifier le nombre total de pages
  console.log('Total Pages:', totalPages);

  return (
    <div className="p-4">
      <div className="text-center mb-8">
        <input
          type="text"
          className="p-2 rounded text-black border-none outline-none"
          placeholder="Search for a document..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          disabled={!isAuthenticated} // Désactiver l'input si non authentifié
        />
        <button
          onClick={handleSearch}
          className="ml-2 p-2 bg-blue-500 text-white rounded"
          disabled={!isAuthenticated} // Désactiver le bouton si non authentifié
        >
          Search
        </button>
      </div>

      {!isAuthenticated ? (
        <p className="text-center text-2xl text-red-500">
          Please authenticate to access the documents.
        </p>
      ) : (
        <>
          <h1 className='text-2xl mb-4'>Our recently added documents :</h1>
          {searchResult && searchResult !== 'No book found' && (
            <h2 className="text-center text-2xl font-bold mb-8">
              Search Results
            </h2>
          )}

          {searchResult === 'No book found' ? (
            <p className="text-center text-2xl text-orange-500">{searchResult}</p>
          ) : (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {currentItems.map((file, index) => {
                  const imageName = file.name.replace('.pdf', ''); // Supprime l'extension .pdf pour obtenir le nom de l'image
                  
                  // Log pour vérifier le nom de l'image et l'URL du fichier
                  console.log('File Image Name:', imageName);
                  console.log('File URL:', file.url);

                  return (
                    <div key={index} className="relative w-full max-w-xs mx-auto">
                      <img
                        src={`/images/${imageName}.jpg`} // Assurez-vous que les images sont dans le dossier public/images
                        alt={imageName}
                        className="w-full h-64 object-cover rounded-lg"
                      />
                      <a
                        href={file.url} // Utiliser l'URL de Google Drive
                        className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-2 py-1 rounded"
                        download
                        aria-disabled={!isAuthenticated} // Désactiver le lien de téléchargement si non authentifié
                      >
                        Download
                      </a>
                    </div>
                  );
                })}
              </div>
              {/* Pagination */}
              <div className="mt-4 flex justify-center space-x-2">
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  className="p-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
                  disabled={currentPage === 1 || !isAuthenticated} // Désactiver le bouton précédent si non authentifié
                >
                  Previous
                </button>
                <span className="flex items-center">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  className="p-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
                  disabled={currentPage === totalPages || !isAuthenticated} // Désactiver le bouton suivant si non authentifié
                >
                  Next
                </button>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default PdfGrid;
