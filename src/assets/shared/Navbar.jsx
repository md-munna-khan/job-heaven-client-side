
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaBars } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import logo from '../../../public/job-logo-icon-with-tie-image-free-vector-removebg-preview.png'
import useRole from "../../hooks/useRole";

const Navbar = () => {
  const navigate = useNavigate();
  const [isShow, setIsShow] = useState(false);
  const [isHidden, setIsHidden] = useState(true);
  // State to hold the coin value
  const {coin,userInfo, getUserRole, user, logOut } = useAuth();
  const [role] = useRole()
 console.log(role)

//   const getUserRole = async (email) => {
//     try {
//       // Make GET request to your API endpoint to fetch user data including coin
//       const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/users/role/${email}`);
// console.log(data)
//       // Log the response data and set the coin
//       console.log('User Data:', data.defaultCoins
//       );
//       setCoin(data.defaultCoins); // Set the coin from response data
//     } catch (error) {
//       console.error('Error fetching user role:', error);
//     }
//   };

  const handleToggleUser = () => {
    setIsHidden(!isHidden);
    setIsShow(false);
  };

  const handleToggleBar = () => {
    setIsShow(!isShow);
    setIsHidden(true);
  };

  const handleSignOutUser = () => {
    logOut();
    toast.success("You have logged out successfully!");
    navigate("/");
    window.scrollTo(0, 0);
  };

 
    // if (user && user.displayName) {
    //   toast.success(`Hey! Welcome, ${user.displayName}`);
    // }
  
  // useEffect(() => {
  //   if (user && user.displayName) {
  //     toast.success(`Hey! Welcome, ${user.displayName}`);
  //   }
  // }, [user]);

  useEffect(() => {
    if (user?.email) {
      // Fetch the user's role and coin when user is logged in
      getUserRole(user.email);
    }
  }, [user?.email]);

  const handleLinkClick = () => {
    setIsShow(false); // Close the mobile menu
    setIsHidden(true); // Hide the user info dropdown (if visible)
  };

  return (
    <header className="fixed container mx-auto top-0 z-50 bg-white mb-10">
      <div className="bg-opacity-80">
        <section className="shadow left-0 px-4 py-5">
          <nav className="flex justify-between items-center">
            <div>
              <Link className="logo flex items-center" to="/">
                <div className="text-xl flex md:text-2xl font-bold">
                <img className="w-14 h-14" src={logo} alt="" />
                   Heaven
                </div>
              </Link>
            </div>

            {/* Desktop Menu */}
            <div className="lg:flex space-x-4 text-lg font-bold  hidden">
              {!user && (
                <>
                  <NavLink to="/login" className="px-4 py-2" onClick={handleLinkClick}>Login</NavLink>
                  <NavLink to="/signup" className="px-4 py-2" onClick={handleLinkClick}>Sign Up</NavLink>
                  <NavLink
                    to="#"
                    onClick={() => window.open("https://github.com/Programming-Hero-Web-Course4/b10a12-client-side-md-munna-khan", "_blank")}
                    className="px-4 py-2 bg-black text-white rounded  transition duration-300"
                  >
                    Join as Developer
                  </NavLink>
                </>
              )}
              {user && (
                <>


                  <NavLink to={
         role === 'Worker'
            ? '/dashboard/worker'
         : role === 'Buyer'
            ? '/dashboard/buyer'
           : '/dashboard/admin-home'
          }className="px-4 py-2 bg-black text-white rounded hover:bg-blue-600 transition duration-300" onClick={handleLinkClick}>Dashboard</NavLink>
                  <NavLink to="/" className="px-4 py-2 bg-black text-white rounded  transition duration-300" onClick={handleLinkClick}>Available Coin: {userInfo.defaultCoins || 0}</NavLink>
                

                  <NavLink
                    to="/profile"
                    className="px-4 py-2"
                    onClick={handleLinkClick}
                  >
                    <div className="flex  items-center space-x-2">
                      <img
                        src={user.photoURL || "/default-avatar.png"}
                        alt="User Profile"
                        className="w-8 h-8 rounded-full border"
                      /> 
                    </div>
                  </NavLink>
                  <NavLink
                    to="#"
                    onClick={() => window.open("https://github.com/Programming-Hero-Web-Course4/b10a12-client-side-md-munna-khan", "_blank")}
                    className="px-4 py-2 bg-black text-white rounded transition duration-300"
                  >
                    Join as Developer
                  </NavLink>
                </>
              )}
            </div>

            {/* User Info and Mobile Menu */}
            <div className="flex items-center gap-4">
              {user && (
                <button
                  onClick={handleSignOutUser}
                  className="w-full text-sm border py-2 px-4 bg-red-600 text-white"
                >
                  Log Out
                </button>
              )}
              <div onClick={handleToggleBar} className="lg:hidden cursor-pointer text-xl">
                {isShow ? <RxCross1 /> : <FaBars />}
              </div>
            </div>
          </nav>

          {/* Mobile Menu */}
          <div className={`absolute top-[80px] left-0 w-full text-white bg-gray-800 py-5 ${isShow ? 'block' : 'hidden'} lg:hidden`}>
            <div className='text-center space-y-5 flex flex-col'>
              {!user && (
                <>
                  <NavLink to="/login" className="px-4 py-2" onClick={handleLinkClick}>Login</NavLink>
                  <NavLink to="/signup" className="px-4 py-2" onClick={handleLinkClick}>Sign Up</NavLink>
                  <NavLink to="/join" className="px-4 py-2" onClick={handleLinkClick}>Join as Developer</NavLink>
                </>
              )}
              {user && (
                <>
                  <NavLink to="/dashboard" className="px-4 py-2" onClick={handleLinkClick}>Dashboard</NavLink>
                  <NavLink to="/" className="px-4 py-2" onClick={handleLinkClick}>Available Coin: {userInfo.defaultCoins || 0}</NavLink>
               
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

export default Navbar;





