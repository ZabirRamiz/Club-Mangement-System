import  { useState, useEffect } from 'react';

const EmailForm = () => {
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [showSponsorDropdown, setShowSponsorDropdown] = useState(false);
  const [sponsorList, setSponsorList] = useState([]);
  const [selectedSponsor, setSelectedSponsor] = useState('');

  useEffect(() => {
    // Fetch sponsors from the API
    fetch('api/sponsor/getSponsors')
      .then(response => response.json())
      .then(data => {
        setSponsorList(data);
      })
      .catch(error => {
        console.error('Error fetching sponsors:', error);
      });
  }, []);

  const handleToChange = (e) => {
    setTo(e.target.value);
    if (e.target.value === 'Sponser') {
      setShowSponsorDropdown(true);
    } else {
      setShowSponsorDropdown(false);
    }
  };

  const handleSubjectChange = (e) => {
    setSubject(e.target.value);
  };

  const handleBodyChange = (e) => {
    setBody(e.target.value);
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleSponsorChange = (e) => {
    setSelectedSponsor(e.target.value);
  };

  return (
    <div 
      className="flex flex-col items-right"
      style={{ 
        backgroundImage: 'url("https://png.pngtree.com/background/20210716/original/pngtree-light-blue-cute-striped-baby-blue-background-picture-image_1348681.jpg")', 
        backgroundSize: 'cover', 
        minHeight: '100vh' 
      }}
    >
      <div className="mt-14 container max-w-lg mx-auto">
        <div 
          className="w-1/2 bg-gray-100 text-gray-800 py-3 px-0 rounded-md shadow-md" 
          style={{ maxWidth: '31rem', width: '100%' }}
        >
          <div className="flex justify-between">
            <div 
              className="mt-2 ml-7 mb-2 bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition duration-300" 
              style={{ maxWidth: '27rem', width: '100%' }}
            >
              <div className="mb-6 flex items-center ml-2 mr-1">
                <label htmlFor="to" className="block font-medium mb-1 mr-7">To:</label>
                <select
                  id="to"
                  className="w-full p-2 border rounded-md"
                  value={to}
                  onChange={handleToChange}
                >
                  <option value="EM">EM</option>
                  <option value="PR">PR</option>
                  <option value="HR">HR</option>
                  <option value="ALL">All</option>
                  <option value="Sponser">Sponser</option>
                </select>
                <div className="ml-4">
                  <input
                    type="checkbox"
                    id="copyCheckbox"
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                  />
                  <label htmlFor="copyCheckbox" className="ml-1">GM</label>
                </div>
              </div>
              {showSponsorDropdown && (
                <div className="mb-6 flex items-center ml-2 mr-1">
                  <label htmlFor="sponsor" className="block font-medium mb-1 mr-2">Sponsor:</label>
                  <select
                    id="sponsor"
                    className="w-full p-2 border rounded-md"
                    value={selectedSponsor}
                    onChange={handleSponsorChange}
                  >
                    {sponsorList.map(sponsor => (
                      <option key={sponsor.id} value={sponsor.name}>
                        {sponsor.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              <div className="mb-6 flex items-center ml-2 mr-1">
                <label htmlFor="subject" className="block font-medium mb-1 mr-2">Subject:</label>
                <textarea
                  id="subject"
                  className="w-full p-2 border rounded-md"
                  value={subject}
                  onChange={handleSubjectChange}
                />
              </div>
              <div className="mb-6 items-center ml-2 mr-1">
                <label htmlFor="body" className="block font-medium mb-1">Body:</label>
                <textarea
                  id="body"
                  rows="10"
                  className="w-full p-2 border rounded-md"
                  value={body}
                  style={{ maxHeight: '320px', minHeight: "320px" }}
                  onChange={handleBodyChange}
                />
              </div>
              
              <button 
                className="mb-2 ml-2 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm py-2 px-6 text-center"
              >
                Send Email
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailForm;

