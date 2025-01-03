import {Component} from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import {FaEyeSlash as CloseEye, FaEye as OpenEye} from 'react-icons/fa'
import NavbarWrapper from '../NavbarWrapper'
import Button from '../Button'
import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    usernameErrMsg: '',
    passwordErrMsg: '',
    isPasswordVisible: false,
    isInfoVisible: true,
  }

  onLogin = async event => {
    event.preventDefault()

    const {username, password} = this.state
    const payload = {username, password}
    const options = {headers: {'Content-Type': 'application/json'}}
    try {
      const response = await axios.post('/api/login', payload, options)

      if (response.status === 200) {
        const {jwtToken, userType} = response.data
        Cookies.set('token', jwtToken, {expires: 90})
        Cookies.set('role', userType, {expires: 90})

        const {state} = this.props.location
        const {from} = state ? state : {}
        const {pathname} = from ? from : {pathname: '/profile'}
        this.props.history.push(pathname, {isLoginSuccess: true})
      } else {
        console.log(response)
      }
    } catch (error) {
      const {errMsg} = error.response.data

      if (errMsg.includes('username')) {
        this.setState({usernameErrMsg: `* username don't exists`})
      } else if (errMsg.includes('password')) {
        this.setState({passwordErrMsg: `* password don't match`})
      }
    }
  }

  onChangeUsername = event => {
    const validateUsername = username => {
      const regex = /^[a-zA-Z0-9_]+$/

      if (username.length === 0) {
        return true
      }

      return regex.test(username)
    }

    const newUsername = event.target.value

    if (validateUsername(newUsername)) {
      this.setState({username: newUsername, usernameErrMsg: ''})
    } else {
      this.setState({usernameErrMsg: '* only alphanumerics and _ are allowed'})
    }
  }

  togglePassword = () => {
    this.setState(prevState => ({
      isPasswordVisible: !prevState.isPasswordVisible,
    }))
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({isInfoVisible: false})
    }, 5000)
  }

  render() {
    const {username, password} = this.state
    const {usernameErrMsg, passwordErrMsg} = this.state
    const {isPasswordVisible, isInfoVisible} = this.state

    const {state} = this.props.location
    const {isSignUpSuccess, isUnauthorized} = state ? state : {}

    return (
      <NavbarWrapper className="login-wrapper">
        <form className="login-form" onSubmit={this.onLogin}>
          <h1 className="login-heading">Login</h1>

          <input
            required
            type="text"
            placeholder="Username"
            value={username}
            onChange={this.onChangeUsername}
          />
          <p className="error-msg">{usernameErrMsg}</p>

          <div className="password-container">
            <input
              required
              type={isPasswordVisible ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={e =>
                this.setState({password: e.target.value, passwordErrMsg: ''})
              }
            />
            {!isPasswordVisible && <CloseEye onClick={this.togglePassword} />}
            {isPasswordVisible && <OpenEye onClick={this.togglePassword} />}
          </div>
          <p className="error-msg">{passwordErrMsg}</p>

          <Button type="submit">Login</Button>
        </form>

        <div className="info-container">
          <p className="info-msg">
            {isSignUpSuccess && isInfoVisible && 'Account created successfully'}
            {isUnauthorized && isInfoVisible && 'Please login to continue'}
          </p>
        </div>
      </NavbarWrapper>
    )
  }
}

export default Login
