import React, { useState, useRef, useEffect } from 'react';
import { Menu, LogOut, ChevronDown, Bell } from 'lucide-react';
import logo from '../assets/images/logo-black.png';
import StaffManagement from './StaffManagement';
import BabyeyiLetter from './Babyeyi';
import Comments from './comments';
import GalleryManagement from './gallery';
import NewsEventsManagement from './newsEvents';
import { Link, useNavigate } from 'react-router-dom';
import UserList from './UserList';

const DashboardLayout = () => {
  const [activeMenu, setActiveMenu] = useState('');
  const [isNavExpanded, setIsNavExpanded] = useState(true);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [notificationCount, setNotificationCount] = useState(5);
  const dropdownRef = useRef(null);
  const navigate = useNavigate(); // Replace useHistory with useNavigate

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Example function to demonstrate use of setNotificationCount
  const updateNotifications = () => {
    setNotificationCount(prevCount => Math.max(0, prevCount - 1));
  };

  // Function to handle logout securely
  const handleLogout = () => {
    // Clear session storage or token from local storage (depending on your authentication method)
    localStorage.removeItem('authToken');
    sessionStorage.clear();
    
    // Redirect to login or home page
    navigate('/login'); // Use navigate instead of history.push
  };

  return (
    <div className="h-screen flex flex-col relative">
      {/* Background Logo */}
      <div
        className="absolute inset-0 bg-cover bg-no-repeat bg-center z-0 flex items-center justify-center"
        style={{
          backgroundImage: `url(${logo})`,
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          opacity: 0.4,
        }}
      />

      {/* Top Navigation */}
      <div className={`bg-[#cee9fd] border-b fixed top-0 w-full h-14 md:h-16 flex items-center justify-between px-2 md:px-4 z-50 transition-all duration-300 ${isNavExpanded ? 'pl-48 md:pl-64' : 'pl-16 md:pl-20'}`}>
        <div className="flex items-center gap-2 md:gap-4">
          <button
            onClick={() => setIsNavExpanded(!isNavExpanded)}
            className="p-1.5 md:p-2 hover:bg-gray-100 rounded-lg transition-all"
          >
            <Menu className="w-5 h-5 md:w-6 md:h-6" />
          </button>
          <span className="text-sm md:text-base lg:text-xl font-normal text-gray-700">ADMIN DASHBOARD</span>
        </div>
        <div className="flex items-center gap-2 md:gap-4">
          <button className="flex items-center text-xs md:text-sm text-blue-600">
            <Link to="/student-lists" className="flex items-center">
              <svg className="w-4 h-4 md:w-5 md:h-5 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
              Student List
            </Link>
          </button>

          {/* Notification Icon */}
          <div className="relative mr-2">
            <Bell
              className="w-5 h-5 text-gray-600 hover:text-blue-600 cursor-pointer"
              onClick={updateNotifications}  // Added click handler
            />
            {notificationCount > 0 ? (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                {notificationCount}
              </span>
            ) : null}
          </div>

          {/* Profile Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-2 hover:bg-gray-50 rounded-lg px-2 py-1 transition-colors"
            >
              <div className="w-6 h-6 md:w-8 md:h-8 bg-gray-200 rounded-full flex items-center justify-center">
                <span className="text-xs md:text-sm">LS</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="flex flex-col text-right">
                  <span className="text-xs md:text-sm font-medium">Lycee Saint</span>
                  <span className="text-xs text-gray-500">lycee@lsam.com</span>
                </div>
                <ChevronDown className={`w-4 h-4 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
              </div>
            </button>

            {/* Dropdown Menu */}
            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-50 border">
                <button
                  onClick={handleLogout} // Use the secure logout handler
                  className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Side Navigation */}
      <div className={`fixed left-0 top-0 h-full bg-blue-600 text-white transition-all duration-300 ${isNavExpanded ? 'w-48 md:w-64' : 'w-16 md:w-20'} pt-14 md:pt-16`}>
        <div className="flex flex-col space-y-1 p-2 md:p-3">
          {[
            { id: 'home', label: 'Home', icon: '🏠' },
            { id: 'about', label: 'About', icon: 'ℹ️' },
            { id: 'staff', label: 'Staff', icon: '👩‍🏫' },
            { id: 'babyeyi', label: 'Babyeyi', icon: '🧒' },
            { id: 'comments', label: 'Comments', icon: '💬' },
            { id: 'gallery', label: 'Gallery', icon: '📸' },
            { id: 'header', label: 'Header', icon: '🔝' },
            { id: 'student-lists', label: 'Student List', icon: '🔽' },
            { id: 'contact', label: 'Contact', icon: '📞' },
            { id: 'newsEvents', label: 'News & Events', icon: '📰' },
            { id: 'UserList', label: 'User List', icon: '❓' },
            { id: 'logout', label: 'Logout', icon: '⛔' }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => {
                // Special handling for logout
                if (item.id === 'logout') {
                  handleLogout();
                  return;
                }
                setActiveMenu(activeMenu === item.id ? '' : item.id);
              }}
              className={`flex items-center p-2 md:p-3 rounded-lg transition-all duration-300 
                hover:bg-blue-700 hover:translate-x-2
                group relative
                ${activeMenu === item.id ? 'bg-blue-700' : ''}`}
            >
              <span className="text-base md:text-xl">{item.icon}</span>
              <span className={`ml-3 text-sm md:text-base transition-all duration-300 
                ${isNavExpanded ? 'opacity-100' : 'opacity-0'}`}>
                {item.label}
              </span>
              {!isNavExpanded && (
                <div className="absolute left-full ml-2 px-2 py-1 md:px-3 md:py-2 bg-gray-800 text-white 
                  rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap
                  text-xs md:text-sm">
                  {item.label}
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className={`mt-14 md:mt-16 ml-0 md:ml-64 flex-grow pt-4 pb-8 px-2 md:px-4 ${isNavExpanded ? 'w-full' : 'w-full'}`}>
        {activeMenu === 'home' && <div>Home Content</div>}
        {activeMenu === 'about' && <div>About Content</div>}
        {activeMenu === 'staff' && <StaffManagement />}
        {activeMenu === 'babyeyi' && <BabyeyiLetter />}
        {activeMenu === 'comments' && <Comments />}
        {activeMenu === 'gallery' && <GalleryManagement />}
        {activeMenu === 'newsEvents' && <NewsEventsManagement />}
        {activeMenu === 'UserList' && <UserList />}
      </div>
    </div>
  );
};

export default DashboardLayout;

{/* {activeMenu === '' && (
          <div className="bg-white rounded-lg shadow">
            <div className="p-3 md:p-4 flex justify-between items-center">
              <h2 className="text-base md:text-lg font-semibold">Data</h2>
              <button className="px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-sm bg-orange-400 text-white rounded-lg hover:bg-orange-500">
                Generate Report
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs md:text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="p-2 md:p-4 text-left">#</th>
                    <th className="p-2 md:p-4 text-left">Invoice Number</th>
                    <th className="p-2 md:p-4 text-left">Application number</th>
                    <th className="p-2 md:p-4 text-left">Payment Status</th>
                    <th className="p-2 md:p-4 text-left">Target</th>
                    <th className="p-2 md:p-4 text-left">Result count</th>
                    <th className="p-2 md:p-4 text-left">Date last modified</th>
                    <th className="p-2 md:p-4 text-left">Service name</th>
                    <th className="p-2 md:p-4 text-left">Sent status</th>
                    <th className="p-2 md:p-4 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <tr className="hover:bg-gray-50">
                    <td className="p-2 md:p-4">1</td>
                    <td className="p-2 md:p-4">888888888</td>
                    <td className="p-2 md:p-4">000000AAA000</td>
                    <td className="p-2 md:p-4">
                      <span className="px-2 py-0.5 text-xs bg-green-100 text-green-800 rounded-full">
                        Paid
                      </span>
                    </td>
                    <td className="p-2 md:p-4">KSSS</td>
                    <td className="p-2 md:p-4">154</td>
                    <td className="p-2 md:p-4">9 Mar 2023 00:00PM</td>
                    <td className="p-2 md:p-4">submit_land</td>
                    <td className="p-2 md:p-4">True</td>
                    <td className="p-2 md:p-4">
                      <button className="p-1 md:p-2 text-blue-600 hover:bg-blue-50 rounded-full">
                        👁️
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )} */}