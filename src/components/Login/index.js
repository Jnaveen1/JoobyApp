import {Component} from 'react'
import {Redirect, Route} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    showError: false,
    errMsg: '',
  }

  onSubmitSuccess = token => {
    const {history} = this.props

    Cookies.set('jwt_token', token, {
      expires: 30,
    })
    history.replace('/')
  }

  changeUsername = event => {
    this.setState({username: event.target.value})
  }

  changePassword = event => {
    this.setState({password: event.target.value})
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const apiUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      console.log(data)
      this.onSubmitSuccess(data.jwt_token)
    } else {
      const errMsg = data.error_msg
      this.setState({showError: true, errMsg})
    }
  }

  renderUserName = () => {
    const {username} = this.state
    return (
      <>
        <label className="label" htmlFor="usernamme">
          USERNAME
        </label>
        <br />
        <input
          type="text"
          value={username}
          id="username"
          className="form-input"
          onChange={this.changeUsername}
          placeholder="Username"
        />
      </>
    )
  }

  renderPassword = () => {
    const {password} = this.state
    return (
      <>
        <label className="label" htmlFor="password">
          PASSWORD
        </label>
        <br />
        <input
          type="password"
          value={password}
          id="password"
          className="form-input"
          onChange={this.changePassword}
          placeholder="Password"
        />
      </>
    )
  }

  render() {
    const {showError, errMsg} = this.state
    const jwtToken = Cookies.get('jwt-token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-main-container">
        <form className="form-sub-container" onSubmit={this.submitForm}>
          <div className="image-con">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              className="logo"
              alt="website logo"
            />
          </div>
          <div className="input-container">{this.renderUserName()}</div>
          <div className="input-container">{this.renderPassword()}</div>
          <button type="submit" className="button">
            Login
          </button>
          {showError && <p className="err-mssg">*{errMsg}</p>}
        </form>
      </div>
    )
  }
}

export default Login
