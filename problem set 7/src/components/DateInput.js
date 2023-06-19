// This is already done for you. Nothing additional needed.

const DateInput = ({value, updateValue}) => {
  return (
    <input
      type="date"
      className="form-control"
      value={value}
      onChange={(e) => updateValue(e.target.value)}
    />
  )
}
DateInput.displayName = 'DateInput'
export default DateInput