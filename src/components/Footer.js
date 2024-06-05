import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import logo from "../assets/img/logo.svg";

const Footer = () => {
  const navigate = useNavigate();

  const handleJoinClick = () => {
    navigate('/join-waiting-list');
  };
  
  const handleBrandFormClick = () => {
    navigate('/write-to-us');
  };

  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between items-center mb-8">
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <img src={logo} alt="WorldLynk Logo" className="h-10 mb-4" />
            <p className="text-lg">
              WorldLynk is your one-stop solution for a seamless student experience in the UK.
            </p>
          </div>
          <div className="w-full md:w-2/3 flex flex-wrap justify-between">
            <div className="w-1/2 md:w-1/3 mb-6">
              <h5 className="text-lg font-semibold mb-4">Company</h5>
              <ul>
                <li className="mb-2"><button to="/" className="hover:underline">Home</button></li>
                <li className="mb-2"><button onClick={handleBrandFormClick} className="hover:underline">Partnerships</button></li>
                <li className="mb-2"><button to="/about" className="hover:underline">About</button></li>
                <li className="mb-2"><button to="/newsroom" className="hover:underline">Newsroom</button></li>
                <li className="mb-2"><button to="/contact" className="hover:underline">Contact</button></li>
              </ul>
            </div>
            <div className="w-1/2 md:w-1/3 mb-6">
              <h5 className="text-lg font-semibold mb-4">Platform</h5>
              <ul>
                <li className="mb-2"><button onClick={handleJoinClick} className="hover:underline">Join</button></li>
                <li className="mb-2"><button onClick={handleJoinClick} className="hover:underline">Sign in</button></li>
              </ul>
            </div>
            <div className="w-1/2 md:w-1/3 mb-6">
              <h5 className="text-lg font-semibold mb-4">Solution</h5>
              <ul>
                <li className="mb-2"><button to="/talent" className="hover:underline">Talent</button></li>
                <li className="mb-2"><button to="/communications" className="hover:underline">Communications</button></li>
                <li className="mb-2"><button to="/development" className="hover:underline">Development</button></li>
                <li className="mb-2"><button to="/pricing" className="hover:underline">Pricing</button></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="text-center border-t border-gray-700 pt-4">
          <p className="text-sm">&copy; {new Date().getFullYear()} WorldLynk. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
