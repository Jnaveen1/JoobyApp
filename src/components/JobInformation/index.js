import {BsBriefcase} from 'react-icons/bs'
import {GoLocation} from 'react-icons/go'
import {ImStarFull} from 'react-icons/im'
import Skills from '../Skills'
import './index.css'

const JobInformation = props => {
  const {job, similarJobs, lifeAtCompany, skills} = props
  const {
    companyLogoUrl,
    companyWebsiteUrl,
    employementType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = job
  const {description, imageUrl} = lifeAtCompany
  console.log(skills)
  return (
    <>
      <div className="sub-container1">
        <img
          src={companyLogoUrl}
          className="company-logo"
          alt="job details company logo"
        />
        <div className="rate-title-con">
          <h1 className="style-color title">{title}</h1>
          <div className="star-con">
            <ImStarFull className="star-icon" />
            <p className="style-color rating">{rating}</p>
          </div>
        </div>
      </div>
      <div className="sub-container2">
        <div className="icon-container">
          <GoLocation className="react-icon" />
          <p className="para">{location}</p>
        </div>
        <div className="icon-container">
          <BsBriefcase className="react-icon" />
          <p className="para">{employementType}</p>
        </div>
        <p className="package">{packagePerAnnum}</p>
      </div>
      <hr className="horizontal-line" />
      <div className="description-link-con">
        <h1 className="description-heading">Description</h1>
        <a
          href={companyWebsiteUrl}
          target="_blank"
          className="link"
          rel="noreferrer"
        >
          Visit
        </a>
      </div>
      <p className="description-para">{jobDescription}</p>
      <h1 className="skills-heading">Skills</h1>
      <ul className="unordered-skill-con">
        {skills.map(eachSkill => (
          <Skills eachSkill={eachSkill} />
        ))}
      </ul>
      <h1 className="life-at-company">Life at Company</h1>
      <div className="life-at-con">
        <p>{description}</p>
        <img src={imageUrl} className="lifeAt-img" />
      </div>
    </>
  )
}

export default JobInformation
