import { Component } from 'react'
import {Route, Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import axios from 'axios'
import {ThreeDots} from 'react-loader-spinner'
import NavbarWrapper from '../NavbarWrapper'
import './index.css'

class AdminRoute extends Component {
  state = {
    isAdmin: null,
    isLoading: true,
  }

  componentDidMount() {
    this.verifyUserType()
  }

  getIsUserAdmin = async options => {
    try {
      const response = await axios.get('/api/isadmin', options)
  
      if (response.status === 200) {
        const {isAdmin} = response.data
        return isAdmin
      }
    } catch (error) {
      console.error(error)
    }
  }

  verifyUserType = async () => {
    const token = Cookies.get('token')
    if (token === undefined) {
      this.setState({isLoading: false})
      return
    }

    const options = {headers: {Authorization: `Bearer ${token}`}}
    const isAdmin = await this.getIsUserAdmin(options)

    if (isAdmin === false && Cookies.get('role') === 'ADMIN') {
      Cookies.set('role', 'USER', {expires: 90})
    }

    this.setState({isAdmin: isAdmin, isLoading: false})
  }

  render() {
    const {isAdmin, isLoading} = this.state
    const {props} = this

    if (isLoading) {
      return (
        <NavbarWrapper className="admin-route-loading">
          <ThreeDots color="#FF6464" height={50} width={50} />
        </NavbarWrapper>
      )
    }

    if (isAdmin === false) {
      return (
        <Redirect
          to={{
            pathname: '/profile',
            state: {isUnauthorized: true},
          }}
        />
      )
    }

    if (isAdmin === null) {
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
}

export default AdminRoute
