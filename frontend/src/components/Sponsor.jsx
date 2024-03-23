
import { useNavigate } from 'react-router-dom';

const Sponsor= () => {
const navigate = useNavigate();

  const onEdit = ()=>{

    navigate("/SponsorEdit");

  };

  return (
    <div className="flex flex-col items-right "
    style={{ backgroundImage: 'url("https://png.pngtree.com/background/20210716/original/pngtree-light-blue-cute-striped-baby-blue-background-picture-image_1348681.jpg")', backgroundSize: 'cover', minHeight: '100vh' }}>
      <div className="container mx-auto mt-2 ml-4">
        <div className="w-1/2 bg-gray-100 text-gray-800 py-3 px-0 rounded-md shadow-md" style={{ maxWidth: '31rem', width: '100%' }}>
          <div className="flex justify-between">
    <div className="mt-2 ml-7 mb-2  bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition duration-300" style={{ maxWidth: '27rem', width: '100%' }}>
    <div className="p-6">
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-black-800">Sponsor</h2>
      </div>
      <div className="mb-4">
        <p className="text-black-500 mr-4">Name: </p>
        <p className="text-black-700 mr-4">Email: </p>
        <p className="text-black-700 mr-4" >Contact: </p>
        <div className="flex items-center">
          <label htmlFor="status" className="text-black-700 mr-6">Status: </label>
          <input
            type="text"
            id="status"
            placeholder="Enter status"
            className="bg-gray-100 text-gray-800 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
      </div>
      <div className="grid justify-items-end">
      <button
        onClick={onEdit}
        className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm py-2 px-6 text-center"
      >
        Edit
      </button>
      </div>
    </div>
  </div>
  </div>
  </div>
  </div>
  </div>
  

  );
};

export default Sponsor;
