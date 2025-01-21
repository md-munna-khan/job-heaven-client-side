

// import { Link, NavLink, useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { FaBars } from "react-icons/fa";
// import { RxCross1 } from "react-icons/rx";
// import toast from "react-hot-toast";
// import useAuth from "../../hooks/useAuth";
// import axios from "axios";
// import useRole from "../../hooks/useRole";
// import useAxiosSecure from "../../hooks/useAxiosSecure";
// import { useQuery } from "@tanstack/react-query";



// const DashNavbar = () => {
//   const navigate = useNavigate();
//   const [isShow, setIsShow] = useState(false);
//   const [isHidden, setIsHidden] = useState(true);
//   const [coin, setCoin] = useState(null); // State to hold the coin value
//   const {coins, user,userInfo, setUserInfo,logOut } = useAuth();
//   const [role, isLoading] = useRole();

//   const axiosSecure=useAxiosSecure()

 


//   const getUserRole = async (email) => {
//     try {
//       const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/users/role/${email}`);
//       setCoin(data.defaultCoins); // Set the coin from response data
//     } catch (error) {
//       console.error('Error fetching user role:', error);
//     }
//   };

//   const handleToggleBar = () => {
//     setIsShow(!isShow);
//     setIsHidden(true);
//   };

//   const handleSignOutUser = () => {
//     logOut();
//     toast.success("You have logged out successfully!");
//     navigate("/");
//     window.scrollTo(0, 0);
//   };

//   useEffect(() => {
//     if (user && user.displayName) {
//       toast.success(`Hey! Welcome, ${user.displayName}`);
//     }
//   }, [user]);

//   useEffect(() => {
//     if (user?.email) {
//       getUserRole(user.email);
//     }
//   }, [user?.email]);

//   const handleLinkClick = () => {
//     setIsShow(false);
//     setIsHidden(true);
//   };

//   return (
//     <header className="fixed container mx-auto top-0 z-50 bg-white mb-10">
//       <div className="bg-opacity-80">
//         <section className="shadow left-0 px-4 py-5">
//           <nav className="flex justify-between items-center">
//             <div>
//               <Link className="logo flex items-center" to="/">
//                 <div className="text-xl flex md:text-2xl text-red-500 font-semibold">
//                   Job Heaven
//                 </div>
//               </Link>
//             </div>

//             {/* Desktop Menu */}
//             <div className="lg:flex space-x-4 text-lg font-bold text-red-500 hidden">
//               {user && (
//                 <>
//                   <NavLink to="/dashboard" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300" onClick={handleLinkClick}>
//                     Role: {role}
//                   </NavLink>
//                   <NavLink to="/" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300" onClick={handleLinkClick}>
//                     Available Coin:{coins?.defaultCoins|| 0}
//                   </NavLink>
//                   <NavLink to="/profile" className="flex items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300" onClick={handleLinkClick}>
//                     <img src={user.photoURL || "/default-avatar.png"} alt="User" className="w-8 h-8 rounded-full mr-2" />
//                     {user.displayName || "User"}
//                   </NavLink>
//                 </>
//               )}
//             </div>

//             {/* Mobile Menu */}
//             <div className="flex items-center gap-4">
//               {user && (
//                 <button
//                   onClick={handleSignOutUser}
//                   className="w-full text-sm border py-2 px-4 bg-red-600 text-white"
//                 >
//                   Notification
//                 </button>
//               )}
//               <div onClick={handleToggleBar} className="lg:hidden cursor-pointer text-xl">
//                 {isShow ? <RxCross1 /> : <FaBars />}
//               </div>
//             </div>
//           </nav>

//           {/* Mobile Menu */}
//           <div className={`absolute top-[80px] left-0 w-full text-white bg-gray-800 py-5 ${isShow ? 'block' : 'hidden'} lg:hidden`}>
//             <div className="text-center space-y-5 flex flex-col">
//               {user && (
//                 <>
                
//                   <NavLink to="/" className="px-4 py-2" onClick={handleLinkClick}>
//                     Available Coin: {coins?.defaultCoins || 0}
//                   </NavLink>
//                   <NavLink to="/" className="px-4 py-2" onClick={handleLinkClick}>
//                     Role: {role}
//                   </NavLink>
//                   <div className="flex items-center px-4 py-2" onClick={handleLinkClick}>
//                     <img src={user.photoURL || "/default-avatar.png"} alt="User" className="w-8 h-8 rounded-full mr-2" />
//                     {user.displayName || "User"}
//                   </div>
//                 </>
//               )}
//             </div>
//           </div>
//         </section>
//       </div>
//     </header>
//   );
// };

// export default DashNavbar;


import { Link, NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { FaBars } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import useRole from "../../hooks/useRole";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const DashNavbar = () => {
  const navigate = useNavigate();
  const [isShow, setIsShow] = useState(false);
  const [isHidden, setIsHidden] = useState(true);
  const [notifications, setNotifications] = useState([]); // State to store notifications
  const [coin, setCoin] = useState(null); // State to hold coin value
  const { coins, user } = useAuth();
  const [role] = useRole();
  const axiosSecure = useAxiosSecure();
  const popUpRef = useRef(null); // Reference for the notification pop-up

  // Fetch notifications for the logged-in user
  const getNotifications = async () => {
    try {
      if (user?.email) {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/notifications/${user?.email}`);
        setNotifications(data); // Set notifications from response
        console.log('hello',data)
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  // Handle clicking outside the pop-up to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popUpRef.current && !popUpRef.current.contains(event.target)) {
        setIsHidden(true); // Hide pop-up when clicking outside
      }
    };

    document.addEventListener("click", handleClickOutside);

    // Clean up the event listener
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // Toggle the notification pop-up visibility
  const toggleNotificationPopUp = () => {
    setIsHidden(!isHidden);
  };

  // Fetch user role and notifications when email changes
  useEffect(() => {
    if (user?.email) {
      getNotifications(); // Fetch notifications when user email changes
    }
  }, [user?.email]);

  return (
    <header className="fixed container mx-auto top-0 z-50 bg-white mb-10">
      <div className="bg-opacity-80">
        <section className="shadow left-0 px-4 py-5">
          <nav className="flex justify-between items-center">
            <div>
              <Link className="logo flex items-center" to="/">
                <div className="text-xl flex md:text-2xl text-red-500 font-semibold">
                  Job Heaven
                </div>
              </Link>
            </div>

            {/* Desktop Menu */}
            <div className="lg:flex space-x-4 text-lg font-bold text-red-500 hidden">
              {user && (
                <>
                  <NavLink to="/dashboard" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300">
                    Role: {role}
                  </NavLink>
                  <NavLink to="/" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300">
                    Available Coin: {coins?.defaultCoins || 0}
                  </NavLink>
                  <NavLink to="/profile" className="flex items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300" >
                 <img src={user.photoURL || "/default-avatar.png"} alt="User" className="w-8 h-8 rounded-full mr-2" />
                  {user.displayName || "User"}
                 </NavLink>
                </>
              )}
            </div>

            {/* Mobile Menu */}
            <div className="flex items-center gap-4">
              {/* Notification Button */}
              <div className="relative">
                <button
                  onClick={ ()=>setIsHidden(!isHidden)}
                  className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 "
                >
                  Notifications
                </button>
                {/* Notification Pop-Up */}
                <div
                  // ref={popUpRef}
                  className={`absolute right-0 bg-white shadow-lg rounded mt-2 w-72 ${isHidden ? "hidden" : ""}`}
                >
                  {notifications.length > 0 ? (
                    notifications?.map((notification, index) => (
                      <div key={index} className="px-4 py-2 border-b last:border-b-0">
                        <p>{notification.message}</p>
                        <small>{new Date(notification.time).toLocaleString()}</small>
                      </div>
                   
                    ))
                  ) : (
                    <div className="px-4 py-2">No Notifications</div>
                  )}
                </div>
              </div>

              <div onClick={() => setIsShow(!isShow)} className="lg:hidden cursor-pointer text-xl">
                {isShow ? <RxCross1 /> : <FaBars />}
              </div>
            </div>
          </nav>

          {/* Mobile Menu */}
          <div className={`absolute top-[80px] left-0 w-full text-white bg-gray-800 py-5 ${isShow ? 'block' : 'hidden'} lg:hidden`}>
            <div className="text-center space-y-5 flex flex-col">
              {user && (
                <>
                  <NavLink to="/" className="px-4 py-2">
                    Available Coin: {coins?.defaultCoins || 0}
                  </NavLink>
                  <NavLink to="/" className="px-4 py-2">
                    Role: {role}
                  </NavLink>
                  <NavLink to="/profile" className=" flex items-center mx-auto px-4 py-2" >
                 <img src={user.photoURL || "/default-avatar.png"} alt="User" className="w-8  h-8  justify-center rounded-full mr-2" />
                  {user.displayName || "User"}
                 </NavLink>
                </>
              )}
            </div>
          </div>
        </section>
      </div>
    </header>
  );
};

export default DashNavbar;
