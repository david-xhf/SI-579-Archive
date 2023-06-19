
// @todo, create your Airport component here.
/*
It will output
<div class="col col-2 text-center border border-dark p-1 g-2 bg-success text-white">
      <h2>AIRPORT-CODE</h2>
      <small>AIRPORT-NAME</small>
      <p>AIRPORT-CITY, AIRPORT-STATE</p>
    </div>
 */
// Notice that👇the props arg is being used. For full credit change this to use destructing
// since we know everything being passes to it.
const Airport = (props) => {
  return (
    <div className="col col-2 text-center border border-dark p-1 g-2 bg-success text-white">
      <h2>{props.code}</h2>
      <small>{props.name}</small>
      <p>{props.city}, {props.state}</p>
    </div>
  )
}
Airport.displayName = 'Airport';
export default Airport;
