import React from 'react';

const Container = ({ children }) => {
  return (
    <div className="flex flex-col items-right " style={{ backgroundImage: 'url("https://png.pngtree.com/background/20210716/original/pngtree-light-blue-cute-striped-baby-blue-background-picture-image_1348681.jpg")', backgroundSize: 'cover', minHeight: '100vh' }}>
      <div className="container mx-auto mt-8">
        <div className="bg-gray-100 text-gray-800 py-3 px-4 rounded-md shadow-md">
          {children}
        </div>
      </div>
    </div>
  );
}

export default Container;
