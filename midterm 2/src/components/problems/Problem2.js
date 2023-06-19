import { useState } from "react";


const Problem2 = () => {
  // Yep! It's a click counter. When clicked, the button should increase by
  // the value of the "Increase by" field.
  // Remember that the value of the "Increase by" field is going to be a string so
  // we recommend casting it to a Number().
  // ALSO: When the value exceeds 100, the button should be disabled.
  const [step, setStep] = useState(1);
  const [count, setCount] = useState(0);
  return (
    <div className='row'>
      <div className="mb-3 col-3">
        <label className="form-label">Increase by</label>
        {/*@todo some stuff to the input so its value is what the button counts up by. */}
        <input
          type="number"
          className="form-control"
          defaultValue={step}
          onChange={(e) => setStep(Number(e.target.value))}
        />
      </div>
      <div className="mb-1">
        <label className="form-label">THE COUNTER</label>
        {/* @todo some stuff to the button so it counts the clicks */}
        <button
          className='btn btn-primary'
          disabled={count > 100}
          onClick={() => setCount(previous => previous += step)}
        >
          {count}
        </button>
      </div>
    </div>
  )
}
Problem2.displayName = 'Problem2';

export default Problem2;
