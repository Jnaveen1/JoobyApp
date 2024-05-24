import './index.css'

const Skills = props => {
  const {eachSkill} = props
  const {name, imageUrl} = eachSkill
  return (
    <li className="skill-list-con">
      <img src={imageUrl} className="skill-img" />
      <p className="skill-name">{name}</p>
    </li>
  )
}

export default Skills
