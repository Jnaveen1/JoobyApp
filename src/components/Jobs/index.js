import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'
import {Component} from 'react'
import Navbar from '../Navbar'
import EmployementTypes from '../EmployementTypes'
import SalaryRange from '../SalaryRange'
import JobCard from '../JobCard'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const checkboxData = []

class Jobs extends Component {
  state = {
    profileData: {},
    jobsList: [],
    apiStatusProfile: apiStatusConstants.initial,
    apiStatusjobs: apiStatusConstants.initial,
    employementType: [],
    salary: '',
    search: '',
    searchFromCheckBox: '',
  }

  componentDidMount() {
    this.getProfile()
    this.getJobs()
  }

  getProfile = async () => {
    this.setState({apiStatusProfile: apiStatusConstants.inProgress})
    const apiUrl = 'https://apis.ccbp.in/profile'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      const profileData = data.profile_details
      const updatedProfileDetails = {
        name: profileData.name,
        profileImageUrl: profileData.profile_image_url,
        shortBio: profileData.short_bio,
      }
      this.setState({
        profileData: updatedProfileDetails,
        apiStatusProfile: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatusProfile: apiStatusConstants.failure})
    }
  }

  getJobs = async () => {
    const {search, salary, searchFromCheckBox} = this.state
    this.setState({apiStatusjobs: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${searchFromCheckBox}&minimum_package=${salary}&search=${search}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      const jobsList = data.jobs
      const updatedJobsList = jobsList.map(eachJob => ({
        companyLogoUrl: eachJob.company_logo_url,
        employeType: eachJob.employment_type,
        id: eachJob.id,
        jobDescription: eachJob.job_description,
        location: eachJob.location,
        packagePerAnnum: eachJob.package_per_annum,
        rating: eachJob.rating,
        title: eachJob.title,
      }))
      console.log(updatedJobsList)
      this.setState({
        jobsList: updatedJobsList,
        apiStatusjobs: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatusjobs: apiStatusConstants.failure,
        search: '',
      })
    }
  }

  renderProfileData = () => {
    const {profileData} = this.state
    const {name, profileImageUrl, shortBio} = profileData
    return (
      <div className="profile-inf">
        <img src={profileImageUrl} className="profile-img" alt="profile" />
        <h1 className="name">{name}</h1>
        <p className="bio">{shortBio}</p>
      </div>
    )
  }

  renderFailureData = () => (
    <div className="profile-inf">
      <button className="retry-btn" onClick={this.getProfile}>
        Retry
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div className="loader">
      <div className="loader-container" data-testid="loader">
        <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
      </div>
    </div>
  )

  getProfileInformation = () => {
    const {apiStatusProfile} = this.state
    switch (apiStatusProfile) {
      case apiStatusConstants.success:
        return this.renderProfileData()
      case apiStatusConstants.failure:
        return this.renderFailureData()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  searchStatus = event => {
    event.preventDefault()
    this.getJobs()
  }

  handleChange = event => {
    const searchedValue = event.target.value
    this.setState({search: searchedValue})
  }

  renderJobData = () => {
    const {jobsList, search} = this.state
    let length = jobsList.length === 0 ? true : false
    return (
      <ul>
        <form className="search-container" onSubmit={this.searchStatus}>
          <input
            type="search"
            className="input"
            placeholder="Search"
            onChange={this.handleChange}
            value={search}
          />
          <button type="submit" data-testid="searchButton">
            <BsSearch className="search-icon" data-testid="searchButton" />
          </button>
        </form>
        {length ? (
          <div className="no-job-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
              className="no-job-img"
            />
            <h1>No Jobs Found</h1>
            <p>We could not find any jobs. Try other filters</p>
          </div>
        ) : (
          <>
            {jobsList.map(eachJob => (
              <JobCard eachJob={eachJob} key={eachJob.id} />
            ))}
          </>
        )}
      </ul>
    )
  }

  renderFailureJob = () => (
    <div>
      <img src="" />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button className="retry-btn">Retry</button>
    </div>
  )

  getJobsInformation = () => {
    const {apiStatusjobs} = this.state
    switch (apiStatusjobs) {
      case apiStatusConstants.success:
        return this.renderJobData()
      case apiStatusConstants.failure:
        return this.renderFailureJob()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  salaryStatus = salaryId => {
    console.log(salaryId)
    this.setState({salary: salaryId}, this.getJobs)
  }

  onChangeJobType = type => {
    const index = checkboxData.indexOf(type)
    if (index > -1) {
      checkboxData.splice(index, 1)
    } else {
      checkboxData.push(type)
    }
    const searhType = checkboxData.join(',')
    console.log(searhType)
    this.setState({searchFromCheckBox: searhType}, this.getJobs)
  }

  getCategoriesEmployees = () => (
    <form className="form-con">
      <hr />
      <h1 className="heading">Types of Employment</h1>
      <ul className="unordered-type-list">
        {employmentTypesList.map(eachType => (
          <EmployementTypes
            eachType={eachType}
            key={eachType.employmentTypeId}
            onChangeJobType={this.onChangeJobType}
          />
        ))}
      </ul>
      <hr />
      <h1 className="heading">Salary Range</h1>
      <ul className="unordered-type-list">
        {salaryRangesList.map(eachSalary => (
          <SalaryRange
            eachSalary={eachSalary}
            salaryStatus={this.salaryStatus}
          />
        ))}
      </ul>
    </form>
  )

  render() {
    return (
      <div className="job-main-container">
        <Navbar />
        <div className="sub-container">
          <div className="profile-container">
            {this.getProfileInformation()}
            {this.getCategoriesEmployees()}
          </div>
          <div className="jobs-container">{this.getJobsInformation()}</div>
        </div>
      </div>
    )
  }
}

export default Jobs
