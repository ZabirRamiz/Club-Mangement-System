import { useNavigate } from 'react-router-dom';

const SponsorFeed = ({ sponsor }) => {
  const navigate = useNavigate();

  const onEdit = (value) => {
    navigate(`/SponsorEdit/${value}`);
  };

  const getStatusColor = () => {
    return sponsor.sponsor_status === 'Active'? 'text-green-500' : 'text-red-500';
  };

  return (
    <div className="items-left">
      <div className="container mx-auto mt-2 ml-4">
        <div className="bg-gray-100 text-gray-800 py-3 px-0 rounded-md shadow-md" style={{ maxWidth: '60rem', width: '100%' }}>
          <div className="flex justify-between">
            <div className="mt-2 ml-7 mb-2 bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition duration-300" style={{ maxWidth: '57rem', width: '100%' }}>
              <div className="p-6">
                <div className="mb-4">
                  <h2 className="text-2xl font-bold text-black-800">{sponsor.name}</h2>
                </div>
                <div className="mb-4">
                  <p className="text-black-500 mr-4"><b>Name: </b>{sponsor.name} </p>
                  <p className="text-black-700 mr-4"><b>Type:</b> {sponsor.type} </p>
                  <p className="text-black-700 mr-4"><b>More Info:</b> {sponsor.more_info} </p>
                  <p className="text-black-700 mr-4"><b>Email: </b>{sponsor.email} </p>
                  <p className="text-black-700 mr-4"><b>Phone: </b>{sponsor.phone} </p>
                  <p className="text-black-700 mr-4"><b>Status: </b><span className={getStatusColor()}>{sponsor.sponsor_status}</span></p>
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
