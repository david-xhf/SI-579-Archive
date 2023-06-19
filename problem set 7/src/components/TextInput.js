// This is already done for you. Nothing additional needed.

const TextInput = ({value, updateValue}) => {
  return (
    <input
      type="text"
      className="form-control"
      value={value}
      onChange={(e) => updateValue(e.target.value)}
    />
  )
}
TextInput.displayName = 'TextInput'
export default TextInput