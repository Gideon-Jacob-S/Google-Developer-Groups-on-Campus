import {Route, Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

const UserRoute = props => {
  const token = Cookies.get('token')
  if (token === undefined) {
    return (
      <Redirect
        to={{
          pathname: '/login',
          state: {isUnauthorized: true},
        }}
      />
    )
  }

  return <Route {...props} />
}

export default UserRoute
