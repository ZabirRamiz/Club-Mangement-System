

// export default function UserEvent() {
//   return (
//     <div>
//       user event page
//     </div>
//   )
// }
// DropdownButton.js
import { useState } from 'react';

const DropdownButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleButtonClick = (buttonText) => {
    alert('Button clicked: ' + buttonText);
    // You can perform any other action here based on the clicked button
  };

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setIsOpen(!isOpen)}
        type="button"
        className="inline-flex justify-center w-40 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring focus:border-blue-300"
      >
        Dropdown Button
      </button>
      <div
        className={`origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg ${
          isOpen ? 'block' : 'hidden'
        }`}
      >
        <div className="py-1 bg-white rounded-md shadow-xs">
          <button
            onClick={() => handleButtonClick('Button 1')}
            className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
          >
            Button 1
          </button>
          <button
            onClick={() => handleButtonClick('Button 2')}
            className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
          >
            Button 2
          </button>
          <button
            onClick={() => handleButtonClick('Button 3')}
            className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
          >
            Button 3
          </button>
        </div>
      </div>
    </div>
  );
};

export default DropdownButton;
