// This is already done for you. Nothing additional needed.

const TextArea = ({value, updateValue}) => {
  return (
    <textarea
      className="form-control"
      value={value}
      onChange={(e) => updateValue(e.target.value)}
    />
  )
}
TextArea.displayName = 'TextArea'
export default TextArea