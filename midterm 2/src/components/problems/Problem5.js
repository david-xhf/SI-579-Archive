import { airports } from "../util/arrays";
import Airport from "../custom/Airport";

const Problem5 = () => {
    // @todo We need an <Airport> component. The file Airport.js already exists,
    //  but it needs to be finished by you so it can be imported and used here.

    return (
        <div className='row'>
            {/*  @todo For every airport in the airports array, output it as an <Airport> component.
           matching the props as seen in the example */}
            {/* To avoid a small point deduction, use map() and find a way to avoid specifying
       each individual prop sent to <Airport>. If you're not sure how, first get it working
        however you can. */}
            {airports.map((airport, index) => <Airport key={index} {...airport}></Airport>)}
        </div>
    )
}
Problem5.displayName = 'Problem5';

export default Problem5;
