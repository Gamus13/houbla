
import React from 'react';
import PdfGrid from './PdfGrid';

const Navbar = () => {
  return (
    <div className="bg-gradient-to-b from-purple-900 to-purple-600 min-h-screen flex flex-col items-center justify-center text-white">
      <header className="flex justify-between items-center w-full p-4">
        <h1 className="text-3xl font-bold">Hoobla</h1>
        <div>
          
          <button className="bg-gray-700 px-4 py-2 rounded ml-2">Sign up</button>
        </div>
      </header>
      
      <main className="flex flex-col items-center mt-20">
        <h2 className="text-4xl font-semibold text-center max-w-2xl">
          Free Digital Library: Download Your Favorite Books in PDF
        </h2>
        <p className="mt-4 text-lg text-center max-w-md">
        We are delighted to offer you free, unlimited access to a vast collection of PDF books, carefully selected to satisfy your passions and curiosities. Whether you are a literature lover, a student looking for academic resources, or simply looking for new discoveries, our platform is there to meet your needs.
        </p>
        <PdfGrid/>
        <hr className="mt-10 bg-gray-400  rounded-lg shadow-lg w-full max-w-md" />
        
      </main>
      
          <footer className="mt-auto p-4 text-center">
            <p className="text-sm">v1.45.2 | Houbla Easiest learning Experience</p>
          </footer>
    </div>
  );
};

export default Navbar;
