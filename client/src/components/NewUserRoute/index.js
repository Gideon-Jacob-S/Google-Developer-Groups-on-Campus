import {Route, Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

const NewUserRoute = props => {
  const token = Cookies.get('token')
  if (token !== undefined) {
    return <Redirect to="/profile" />
  }

  return <Route {...props} />
}

export default NewUserRoute
