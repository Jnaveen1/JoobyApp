import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

const Navbar = props => {
  const logout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/')
  }

  return (
    <div className="navbar-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
        alt="website logo"
        className="image-logo"
      />
      <ul className="unordered-list-container">
        <Link to="/" className="link-container">
          <li className="list-item">Home</li>
        </Link>
        <Link to="/jobs" className="link-container">
          <li className="list-item">Jobs</li>
        </Link>
      </ul>
      <li>
      <button type="button" className="button" onClick={logout}>
        Logout
      </button>
      </li>
    </div>
  )
}

export default withRouter(Navbar)
