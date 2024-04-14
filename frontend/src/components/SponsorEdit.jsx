import { useState } from "react"
import { useNavigate } from "react-router-dom";

const SponsorEdit=()=>{
    const [name ,setName]=useState("");
    const [ email, setEmail]= useState("");
    const [ contact, setContact]= useState("");
    const navigate = useNavigate();

    const handleSubmit=()=>{
        navigate("/ ");
    };



  return (
    <div className="flex flex-col items-right "
    style={{ backgroundImage: 'url("https://png.pngtree.com/background/20210716/original/pngtree-light-blue-cute-striped-baby-blue-background-picture-image_1348681.jpg")', backgroundSize: 'cover', minHeight: '100vh' }}>
        <div className="container  mx-auto mt-10 ml-10" style={{marginLeft: "25rem"}}>
        <div className="w-full bg-gray-100 text-gray-800 py-3 px-0 rounded-md shadow-md" style={{ maxWidth: '31rem', width: '100%' }}>
          <div className="flex justify-between">
     <div className="w-full max-w-md mx-auto">
     
  <form className="mt-4 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
  <div className=" w-full px-3 py-8 md:p-8">
            <h2 className="mt-0 mb-8 text-2xl font-bold text-gray-800">Sponsor Edit Form</h2>
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
        Name
      </label>
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="name"
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
    </div>
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
        Email
      </label>
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="email"
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e)=> setEmail(e.target.value)}
      />
    </div>
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="contact">
        Contact
      </label>
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="contact"
        type="text"
        placeholder="Enter your contact number"
        value={contact}
        onChange={(e)=> setContact(e.target.value)}
      />
    </div>
    <div className="flex items-center justify-between">
      <button
      onClick={handleSubmit}
        className="mt-6 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm py-2 px-6 text-center"
        type="submit"
      >
        Submit
      </button>
    </div>
    </div>
  </form>
</div>
</div>
</div>
</div>
</div>
    
  );
};

export default SponsorEdit;