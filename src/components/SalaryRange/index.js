import './index.css'

const SalaryRange = props => {
  const {eachSalary, salaryStatus} = props
  const {salaryRangeId, label} = eachSalary

  const changeSalary = () => {
    salaryStatus(salaryRangeId)
  }

  return (
    <li className="list-container">
      <input
        type="radio"
        id={salaryRangeId}
        value="10LPA and above"
        name="salary"
        onChange={changeSalary}
      />
      <label className="label">{label}</label>
    </li>
  )
}

export default SalaryRange
