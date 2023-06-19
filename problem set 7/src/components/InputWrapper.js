

const InputWrapper = ({ columns, label, info, children, valid, validationMessage }) => {
  return (
    <div className={`col-sm-${columns}`} >
      <label className="form-label">{label}</label>
      {children}
      <small className="text-muted" >{info}</small >
      {!valid && <div className="invalid-field" >
        {validationMessage}
      </div >}
    </div>
  )
}
InputWrapper.displayName = 'InputWrapper'
export default InputWrapper;