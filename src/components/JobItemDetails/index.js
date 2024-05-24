import {Component} from 'react'

import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Navbar from '../Navbar'

import JobInformation from '../JobInformation'
import SimilarJobCard from '../SimilarJobCard'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

let updatedJobDetails = []
let updatedSimilarJobs = []
let updatedSkills = []
let updatedLifeAtCompany = []

class JobItemDetails extends Component {
  state = {
    apiStatusJob: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getJobDetails()
  }

  getFormattedJobDetails = data => ({
    companyLogoUrl: data.company_logo_url,
    companyWebsiteUrl: data.company_website_url,
    employementType: data.employment_type,
    id: data.id,
    jobDescription: data.job_description,
    location: data.location,
    packagePerAnnum: data.package_per_annum,
    rating: data.rating,
    title: data.title,
  })

  getFormattedSimilarJobs = jobData =>
    jobData.map(data => ({
      companyLogoUrl: data.company_logo_url,
      employementType: data.employment_type,
      id: data.id,
      jobDescription: data.job_description,
      location: data.location,
      rating: data.rating,
      title: data.title,
    }))

  getJobDetails = async () => {
    this.setState({apiStatusJob: apiStatusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params

    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const jobDetails = data.job_details
      const similarJobs = data.similar_jobs
      const lifeAtCompany = jobDetails.life_at_company
      const {skills} = jobDetails
      updatedJobDetails = this.getFormattedJobDetails(jobDetails)
      updatedSimilarJobs = this.getFormattedSimilarJobs(similarJobs)
      updatedLifeAtCompany = {
        description: lifeAtCompany.description,
        imageUrl: lifeAtCompany.image_url,
      }
      updatedSkills = skills.map(each => ({
        name: each.name,
        imageUrl: each.image_url,
      }))
      this.setState({apiStatusJob: apiStatusConstants.success})
    } else {
      this.setState({apiStatusJob: apiStatusConstants.failure})
    }
  }

  renderLoadingView = () => (
    <div className="loader">
      <div className="loader-container" data-testid="loader">
        <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
      </div>
    </div>
  )

  renderJobData = () => (
    <JobInformation
      job={updatedJobDetails}
      similarJobs={updatedSimilarJobs}
      lifeAtCompany={updatedLifeAtCompany}
      skills={updatedSkills}
    />
  )

  renderFailureJobData = ()=>{
    <div>
      <img src ="" />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button className="retry-btn" onClick={this.getJobDetails}>Retry</button>
    </div>
  }

  jobDetails = () => {
    const {apiStatusJob} = this.state
    switch (apiStatusJob) {
      case apiStatusConstants.success:
        return this.renderJobData()
      case apiStatusConstants.failure:
        return this.renderFailureJobData()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="details-main-container">
        <Navbar />
        <div className="details-sub-container">{this.jobDetails()}</div>
        <h1 className="similar-job-heading">Similar Jobs</h1>
        <ul className="unordered-similar-con">
          {updatedSimilarJobs.map(eachSimilarCard => (
            <SimilarJobCard eachSimilarCard={eachSimilarCard} />
          ))}
        </ul>
      </div>
    )
  }
}
export default JobItemDetails
