import React, { useState } from 'react';
import { pdfFiles } from './pdfFiles'; // Assurez-vous que le chemin est correct
import { useAuth } from '../contexts/AuthContext';

const PdfGrid = () => {
  const { isAuthenticated } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4; // Nombre d'éléments par page

  // console.log('isAuthenticated:', isAuthenticated);

  const handleSearch = () => {
    if (!isAuthenticated) return; // Ne pas permettre la recherche si non authentifié
    // console.log('Search Query:', searchQuery); 
    const normalizedQuery = searchQuery.toLowerCase();
    const result = pdfFiles.filter(file => file.name.toLowerCase().includes(normalizedQuery));
    // console.log('Search Result:', result); 

    if (result.length > 0) {
      setSearchResult(result);
    } else {
      setSearchResult('No book found');
    }
    setCurrentPage(1); // Réinitialise la page actuelle à 1 lors d'une nouvelle recherche
  };

  // Calculer les documents à afficher pour la page actuelle
  const currentItems = searchResult === 'No book found' ? [] : (searchResult || pdfFiles).slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Calculer le nombre total de pages
  const totalPages = Math.ceil((searchResult === 'No book found' ? 0 : (searchResult || pdfFiles).length) / itemsPerPage);

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
        <p className="text-center text-2xl text-red-500 mb-4">
          Please authenticate to search for documents.
        </p>
      ) : (
        <>
          {searchResult === 'No book found' ? (
            <p className="text-center text-2xl text-orange-500">{searchResult}</p>
          ) : (
            <>
              <h1 className='text-2xl mb-4'>Our recently added documents :</h1>
              {searchResult && (
                <h2 className="text-center text-2xl font-bold mb-8">
                  Search Results
                </h2>
              )}

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {currentItems.map((file, index) => {
                  const imageName = file.name.replace('.pdf', ''); // Supprime l'extension .pdf pour obtenir le nom de l'image
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
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                <span className="flex items-center">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  className="p-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
                  disabled={currentPage === totalPages}
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
