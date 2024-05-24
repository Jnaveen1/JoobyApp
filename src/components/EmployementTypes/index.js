import './index.css'

const EmployementTypes = props => {
  const {eachType, key, onChangeJobType} = props
  const {label, employmentTypeId} = eachType
  console.log(label)

  const changeTypeStatus = () => {
    onChangeJobType(employmentTypeId)
  }

  return (
    <li className="list-container">
      <input
        type="checkbox"
        id={employmentTypeId}
        onChange={changeTypeStatus}
      />
      <label className="label" htmlFor={employmentTypeId}>
        {label}
      </label>
    </li>
  )
}

export default EmployementTypes
