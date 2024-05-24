import {BsBriefcase} from 'react-icons/bs'
import {ImStarFull} from 'react-icons/im'
import {GoLocation} from 'react-icons/go'
import './index.css'

const SimilarJobCard = props => {
  const {eachSimilarCard} = props
  const {
    companyLogoUrl,
    employementType,
    jobDescription,
    location,
    rating,
    title,
  } = eachSimilarCard
  return (
    <li className="similar-list-con">
      <div className="similar-job-container1">
        <img src={companyLogoUrl} className="similar-logo" alt="similar job company logo" />
        <div className="similar-sub-container">
          <h1 className="title1">{title}</h1>
          <div className="star-con">
            <ImStarFull className="star-icon" />
            <p className="style-color rating1">{rating}</p>
          </div>
        </div>
      </div>
      <h1 className="style-color heading1">Description</h1>
      <p className="style-color">{jobDescription}</p>
      <div className="similar-sub-container2">
        <div className="similar-icon-container">
          <GoLocation className="react-icon" />
          <p className="similar-para">{location}</p>
        </div>
        <div className="similar-icon-container">
          <BsBriefcase className="react-icon" />
          <p className="similar-para">{employementType}</p>
        </div>
      </div>
    </li>
  )
}
export default SimilarJobCard
