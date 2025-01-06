import {Component} from 'react'
import axios from 'axios'
import {FaEyeSlash as CloseEye, FaEye as OpenEye} from 'react-icons/fa'
import NavbarWrapper from '../NavbarWrapper'
import Button from '../Button'
import './index.css'

class SignUp extends Component {
  state = {
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
    collegeId: '',
    collegeIdErrMsg: '',
    emailErrMsg: '',
    usernameErrMsg: '',
    passwordErrMsg: '',
    confirmPasswordErrMsg: '',
    isPasswordVisible: false,
    isConfirmPasswordVisible: false,
  }

  onSignUp = async event => {
    event.preventDefault()

    const {password, confirmPassword} = this.state
    if (password !== confirmPassword) {
      return
    }

    const {username, email, collegeId} = this.state
    const payload = {username, email, collegeId, password}
    const options = {headers: {'Content-Type': 'application/json'}}
    try {
      const response = await axios.post('/api/signup', payload, options)

      if (response.status === 200) {
        this.props.history.push('/login', {isSignUpSuccess: true})
      } else {
        console.log(response)
      }
    } catch (error) {
      const {isUsernameExists, isEmailExists, isCollegeIdExists} =
        error.response.data

      if (isCollegeIdExists) {
        this.setState({collegeIdErrMsg: `* college id already exists`})
      }

      if (isEmailExists) {
        this.setState({emailErrMsg: `* email already exists`})
      }

      if (isUsernameExists) {
        this.setState({usernameErrMsg: `* username already exists`})
      }
    }
  }

  onChangeCollegeId = event => {
    this.setState({
      collegeId: event.target.value.toUpperCase().replace(/[^A-Z0-9]/g, ''),
      collegeIdErrMsg: '',
    })
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

  onChangeConfirmPassword = event => {
    const {password} = this.state

    if (event.target.value !== password) {
      this.setState({confirmPasswordErrMsg: "* passwords don't match"})
    } else {
      this.setState({confirmPasswordErrMsg: ''})
    }

    this.setState({confirmPassword: event.target.value})
  }

  togglePassword = () => {
    this.setState(prevState => ({
      isPasswordVisible: !prevState.isPasswordVisible,
    }))
  }

  toggleConfirmPassword = () => {
    this.setState(prevState => ({
      isConfirmPasswordVisible: !prevState.isConfirmPasswordVisible,
    }))
  }

  render() {
    const {username, password, confirmPassword, email, collegeId} = this.state
    const {
      collegeIdErrMsg,
      emailErrMsg,
      usernameErrMsg,
      passwordErrMsg,
      confirmPasswordErrMsg,
    } = this.state
    const {isPasswordVisible, isConfirmPasswordVisible} = this.state

    return (
      <NavbarWrapper className="signup-wrapper">
        <form className="signup-form" onSubmit={this.onSignUp}>
          <h1 className="signup-heading">Sign Up</h1>

          <input
            required
            type="text"
            placeholder="College ID"
            value={collegeId}
            onChange={this.onChangeCollegeId}
          />
          <p className="error-msg">{collegeIdErrMsg}</p>

          <input
            required
            type="email"
            placeholder="Email"
            value={email}
            onChange={e =>
              this.setState({email: e.target.value, emailErrMsg: ''})
            }
          />
          <p className="error-msg">{emailErrMsg}</p>

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

          <div className="password-container">
            <input
              required
              type={isConfirmPasswordVisible ? 'text' : 'password'}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={this.onChangeConfirmPassword}
            />
            {!isConfirmPasswordVisible && (
              <CloseEye onClick={this.toggleConfirmPassword} />
            )}
            {isConfirmPasswordVisible && (
              <OpenEye onClick={this.toggleConfirmPassword} />
            )}
          </div>
          <p className="error-msg">{confirmPasswordErrMsg}</p>

          <Button type="submit">Sign Up</Button>
        </form>
      </NavbarWrapper>
    )
  }
}

export default SignUp
