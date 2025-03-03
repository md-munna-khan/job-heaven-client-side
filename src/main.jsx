import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { RouterProvider } from 'react-router-dom'
import router from './routes/Router.jsx'
import { HelmetProvider } from 'react-helmet-async'
import AuthProvider from './providers/AuthProvider.jsx'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast'
// Create a client
const queryClient = new QueryClient()
createRoot(document.getElementById('root')).render(
  <StrictMode>

 <HelmetProvider>
  <QueryClientProvider  client={queryClient}>
  <AuthProvider>
  <RouterProvider router={router} />
  </AuthProvider>
  </QueryClientProvider>
  
  
   <Toaster position='top-right' reverseOrder={false} />
   </HelmetProvider>
 
  </StrictMode>,
)
