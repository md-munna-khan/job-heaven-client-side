import PropTypes from 'prop-types'


import { Navigate } from 'react-router-dom'
import useRole from '../../../hooks/useRole'
import LoadingSpinner from '../../../assets/shared/LoadingSpinner'

const BuyerRoute =  ({ children }) => {
  const [role, isLoading] = useRole()

  if (isLoading) return <LoadingSpinner />
  if (role === 'Buyer') return children
  return <Navigate to='/dashboard' replace='true' />
}

BuyerRoute.propTypes = {
  children: PropTypes.element,
}




 

export default BuyerRoute;