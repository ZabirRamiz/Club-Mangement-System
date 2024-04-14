import { useNavigate } from 'react-router-dom';

const SponsorFeed = ({sponsor}) => {
  const navigate = useNavigate();

  const onEdit = (value) => {
    navigate(`/SponsorEdit/${value}`);
  };

  return (
<div className="items-left "  >
<div className="container mx-auto mt-2 ml-4">
  <div className="bg-gray-100 text-gray-800 py-3 px-0 rounded-md shadow-md" style={{ maxWidth: '60rem', width: '100%' }}>
    <div className="flex justify-between">
      <div className="mt-2 ml-7 mb-2 bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition duration-300" style={{ maxWidth: '57rem', width: '100%' }}>
        <div className="p-6">
          <div className="mb-4">
            <h2 className="text-2xl font-bold text-black-800">Sponsor</h2>
          </div>
          <div className="mb-4">
            <p className="text-black-500 mr-4">Name: {sponsor.name} </p>
            <p className="text-black-700 mr-4">Type:: {sponsor.type} </p>
            <p className="text-black-700 mr-4">More Info: {sponsor.more_info} </p>
            <p className="text-black-700 mr-4">Email: {sponsor.email} </p>
            <p className="text-black-700 mr-4">Phone: {sponsor.phone} </p>
            <p className="text-black-700 mr-4">Status: {sponsor.sponsor_status} </p>

          </div>
          <div className="grid justify-items-end">
            <button
              onClick={() => onEdit(sponsor._id)}
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

export default SponsorFeed;
