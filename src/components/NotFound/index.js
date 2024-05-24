import Navbar from '../Navbar'
import './index.css'

const NotFound = () => {
  return (
    <div className="not-found-container">
      <Navbar />
      <div className="not-found-sub-container">
        <div className="not-found-sub-container1">
          <img
            src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
            className="not-found-img"
          />
          <h1>Oops! Something WentWrong</h1>
          <p>We cannot seem to find the page you are looking for.</p>
          <button className="retry-btn">Retry</button>
        </div>
      </div>
    </div>
  )
}

export default NotFound
