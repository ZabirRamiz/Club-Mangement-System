import  { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setLoggedIn] = useState(localStorage.getItem('State') === 'true');
  const [userType, setUserType] = useState(localStorage.getItem('userType') || 'user');
  const [user, setUser] = useState(null)
  const loginId = localStorage.getItem("Id")
  const navigate = useNavigate();

  useEffect(() =>{
    const fetchData = async() =>{
      if(loginId !=0){
        const response = await fetch(`/api/user/getSpecificUser/${loginId}`)
        const json = await response.json()
        if(response.ok){
          setUser(json)
          console.log(`User name is ${json.name}`)
        }
        else {
          console.log("Something is wrong")
        }
      }
        

        
    }

    fetchData()
}, [])

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setUserType('default');
    localStorage.setItem('State', 'false');
    localStorage.setItem("Id", "0")
    //localStorage.removeItem('userType');
    navigate("/");
  };
  const handleLogin = () => {
        
    //setLoggedIn(true);
    //localStorage.setItem('isLoggedIn', 'true');
    navigate("/Login")
    
  };

  const getNavItems = () => {
    const navItems = {
      default: [
        { label: 'Home', path: '/' },
        { label: 'Login', path: '/Login', onClick: handleLogin },
      ],
      user: [
        { label: 'Home', path: '/' },
        { label: 'Dashboard', path: '/UserDashboard' },
        { label: 'Post', path: '/UserPost' },
        { label: 'Event', path: '/UserEvent' },
        { label: 'EM', path: '/EventPost' },
        { label: 'Work', path: '/UserAssignWork'},
        { label: 'Members', path: '/ManageMembers' },
        { label: 'Pending', path: '/PendingMembers' },
        { label: 'Interview', path: '/Interview' },
        { label: 'Finance', path: '/Finance'},
        { label: 'Sponsor' , path: '/Sponsor'},
        { label: 'Email' , path: '/Email'},
        { label: 'Logout', path: '/', onClick: handleLogout },
      ],
      admin: [
        // Add admin-specific links
        { label: 'Home', path: '/' },
        { label: 'Admin Dashboard', path: '/AdminDashboard' },
        { label: 'Admin Post', path: '/AdminPost' },
        { label: 'Admin Event', path: '/AdminEvent' },
        { label: 'Members', path: '/ManageMembers' },
        { label: 'Logout', path: '/', onClick: handleLogout },
      ],
      // Add other user types as needed
    };

    return isLoggedIn ? navItems[userType] || navItems.default : navItems.default;
  };

  const navItems = getNavItems();

  return (
    <nav className="border-gray-200 bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
        {/* <img src="https://flowbite.com/docs/images/logo.svg" class="h-8" alt="Flowbite Logo" /> */}
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Club-Management-System</span>
        </a>
        <button
          onClick={toggleMenu}
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-solid-bg"
          aria-expanded={isMenuOpen}
        >
          <span className="sr-only">Open main menu</span>
          <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
          </svg>
        </button>
        <div className={`w-full md:block md:w-auto ${isMenuOpen ? '' : 'hidden'}`} id="navbar-solid-bg">
        
          <ul className="flex flex-col font-medium mt-4 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700">
            
            {user != null && (
              <li className="nav-item" key={null}>
              <a href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                {user.name}
              </a>
            </li>

            )
            }
            
            {navItems.map((item, index) => (
              <li className="nav-item" key={index}>
                <a href={item.path} className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent" onClick={item.onClick}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
