import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import Navbar from '../Navbar'
import './index.css'

const Home = props => {
  const jwtToken = Cookies.get('jwt_token')
  console.log('home')
  if (jwtToken === undefined) {
    return <Redirect to="/login" />
  }

  const findJobs = () => {
    const {history} = props
    history.replace('/jobs')
  }
  return (
    <div className="home-container">
      <Navbar />
      <div className="home-sub-container">
        <h1>Find The Job That Fits Your Life</h1>
        <p>
          Millions of people are searching for jobs, salary informatio, company
          reviews.Find the job that fits your abilities and potential
        </p>
        <button type="submit" className="button" onClick={findJobs}>
          Find Jobs
        </button>
      </div>
    </div>
  )
}

export default Home
