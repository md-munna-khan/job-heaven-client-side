



/* eslint-disable react/prop-types */


import { createContext, useEffect, useState } from 'react'
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth'
import { app } from '../firebase/firebase.config'
import axios from 'axios'
import useAxiosSecure from '../hooks/useAxiosSecure'
import { useQuery } from '@tanstack/react-query'



// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext(null)
const auth = getAuth(app)
const googleProvider = new GoogleAuthProvider()


const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [role,setRole]=useState('Worker')
  const [coin, setCoin] = useState(0);
const[userInfo,setUserInfo]=useState({})
  const [coinLoading, setCoinLoading] = useState(false);

  
        const {data:coins={},refetch}=useQuery({
          queryKey:['coins',user?.email],
          queryFn:async()=>{
            const {data}=await axios.get(`${import.meta.env.VITE_API_URL}/users/role/${user?.email}`)
            return data
          }
        })
      console.log('jhamela',coins)
      
 


  const getUserRole = async (email) => {
    setCoinLoading(true); // Set loading to true
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/users/role/${email}`
      );
      console.log('User Data:', data);
    setUserInfo(data)
      setCoin(data.defaultCoins);
    } catch (error) {
      console.error(`Error fetching user role for ${email}:`, error);
    } finally {
      setCoinLoading(false); // Set loading to false
    }
  };
  
  const createUser = (email, password) => {
    setLoading(true)
    return createUserWithEmailAndPassword(auth, email, password)
  }

  const signIn = (email, password) => {
    setLoading(true)
    return signInWithEmailAndPassword(auth, email, password)
  }

  const signInWithGoogle = () => {
    setLoading(true)
    return signInWithPopup(auth, googleProvider)
  }

  const logOut = async () => {
    setLoading(true)
    return signOut(auth)
  }

  const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    })
  }

  // onAuthStateChange main
  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, async currentUser => {
  //     console.log('CurrentUser-->', currentUser?.email)
  //     if (currentUser?.email) {
  //       setUser(currentUser)
  //       //
  //       if (currentUser?.email) {
  //         await getUserRole(currentUser.email); // Fetch user role on login
  //       }

  //       // Get JWT token
  //       await axios.post(
  //         `${import.meta.env.VITE_API_URL}/jwt`,
  //         {
  //           email: currentUser?.email,
  //         },
  //         { withCredentials: true }
  //       )
  //     } else {
  //       setUser(currentUser)
  //       await axios.get(`${import.meta.env.VITE_API_URL}/logout`, {
  //         withCredentials: true,
  //       })
  //     }
  //     setLoading(false)
  //   })
  //   return () => {
  //     return unsubscribe()
  //   }
  // }, [])

 
  //local  storage  jhankar vai 
//   useEffect(()=>{
//     const unSubscribe= onAuthStateChanged(auth,currentUser=>{
//         setUser(currentUser)
//      if(currentUser){
// //  get token and store the client
// const userInfo= {email: currentUser.email}
// axios.post('/jwt',userInfo)
// .then(res=>{
//     if(res.data.token){
//         localStorage.setItem('access-token', res.data.token)
//         setLoading(false)
//     }
// })
//      } 
//      else{
// // todo remove the token
// localStorage.removeItem('access-token')
// setLoading(false)
//      }
      
//     })
// return()=>{
//     return unSubscribe()
// }
// },[axios])


useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
    console.log('CurrentUser -->', currentUser?.email);
    
    if (currentUser) {
      setUser(currentUser);

      // Fetch and save the user role
      if (currentUser?.email) {
        await getUserRole(currentUser.email);
      }

      // Get JWT token and save to local storage
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/jwt`,
          { email: currentUser?.email },
          { withCredentials: true }
        );
console.log(response.data)
        if (response.data.token) {
          localStorage.setItem('access-token', response.data.token); // Save token
        }

      } catch (error) {
        console.error('Error fetching JWT token:', error);
      }
    } else {
      // Remove user and token on logout
      setUser(null);
      localStorage.removeItem('access-token');
      try {
        await axios.get(`${import.meta.env.VITE_API_URL}/logout`, { withCredentials: true });
      } catch (error) {
        console.error('Error during logout:', error);
      }
    }

    setLoading(false);
  });

  return () => {
    unsubscribe();
  };
}, []);

useEffect(() => {
  if (coin !== null) {
    console.log('Updated coin value:', coin);
  }
}, [coin]);
  const authInfo = {
    user,
    setUser,
    loading,
    setLoading,
    createUser,
    signIn,
    signInWithGoogle,
    logOut,
    updateUserProfile,
    role,
    setRole,
    coin,
    setCoin,
    getUserRole,
    coinLoading,
    userInfo,
    setUserInfo,
   coins,
   refetch
  }

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  )
}

export default AuthProvider



