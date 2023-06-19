import { useState } from "react";
// This might be familiar...
// Count the number of characters typed into the textarea to inform what the todo
// items need.
const Problem3 = () => {
  // Hey! We already wired the form up to state for you
  const [text, setText] = useState('Type your message here and look at the feedback.')
  return (
    <div className="col-md-4">
      <label className="form-label">Enter your message below:</label>
      {/* @todo when > 50 characters, the textarea className should be `form-control is-invalid`,
       otherwise it should be `form-control is-valid` */}
      <textarea
        className={text.length > 50 ? `form-control is-invalid` : `form-control is-valid`}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type here"
        rows="3">
        Type your message here and look at the feedback.
      </textarea>
      {/* @todo when > 50 characters, this div should have the `invalid-feedback`class.
       otherwise it should have `valid-feedback`  */}
      <div className={text.length > 50 ? `invalid-feedback` : `valid-feedback`}>
        {/* @todo this is where a message goes
          - When > 50 characters it should say "[NUM CHARS OVER 50] characters too long"
            otherwise "[NUM CHARS UNDER 50] characters left"*/}
        {text.length > 50 ? `${text.length - 50} characters too long` : `${50 - text.length} characters left`}
      </div>
    </div>
  )
}
Problem3.displayName = 'Problem3';

export default Problem3;
