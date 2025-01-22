import axios from 'axios'
import useAuth from './useAuth'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
})

const useAxiosSecure = () => {
  const navigate = useNavigate()
  const { logOut } = useAuth()
  useEffect(() => {

    axiosSecure.interceptors.request.use(function (config) {
      const token = localStorage.getItem('access-token')
      console.log(token)
      config.headers.authorization = (`Bearer ${token}`)
      return config
  }, function (error) {
      // Do something with request error
      return Promise.reject(error);
  });


    axiosSecure.interceptors.response.use(
      res => {
        return res
      },
      async error => {
        console.log('Error caught from axios interceptor-->', error.response)
        if (error.response.status === 401 || error.response.status === 403) {
          // logout
          logOut()
          // navigate to login
          navigate('/login')
        }
        return Promise.reject(error)
      }
    )
  }, [logOut, navigate])
  return axiosSecure
}

export default useAxiosSecure