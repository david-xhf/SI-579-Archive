// HI SI 579 Student! This is not *that* complex an application,
// but turning it into written instructions sure makes it seem
// that way. For many of you, basing most of what you do on the
// working example will be easier than going through all these
// instructions across four components.

// @tip if we already provided markup, keep it there. It's there
// to help.

// @tip the React Developer Tools Chrome extension will make this WAY
// easier. The components in the inspector won't match the component names anymore
// (this is default React behavior, lecture 13 have a workaround). It should
// be pretty clear which component is which, though...

// This 👇 is an array of cupChoices that has already been imported for you
// This will be used to create the grid of available cups to purchase.
import { cupChoices } from "../util/cupselections";
import { useState } from "react";
import CupDetails from "./CupDetails";
import AddToCart from "./AddToCart";
import CupChoice from "./CupChoice";

const CupPicker = () => {
  // @todo, there are two things State will need to keep track of
  // 1. which cup you clicked (so it knows which cup to feature in the left column)
  // 2. The message you'd like to display after clicking "add to cart"
  const [cup, setCup] = useState("");
  const [message, setMessage] = useState("");
  // My comment: 
  // We could keep another state here such as [alert, setAlert], and when button is clicked, alert could be toggled between true and false. 
  // Using this way to control the rendering of alert message could prevent store "cup.name" twice, one in the cup state, the other in the message.
  // See commented line 39 for implementation of the alert message element
  return (
    <div className='container'>
      {/* The message that appears after adding to cart appears here. */}
      {/* @todo Conditional display! This not output anything if you haven't clicked "Add To Cart" yet.: */}
      {/* HTML: <p class="alert alert-success">Added THE-CUP-NAME to cart</p> */}
      {message ? <p className="alert alert-success">{message}</p> : ""}
      {/* {alert ? <p className="alert alert-success">{`Added "${cup.name}" to cart`}</p> : ""} */}
      <div className="row">
        <div className='col col-5'>
          {cup ? <CupDetails name={cup.name} imageUrl={cup.imageUrl} description={cup.description} /> : ""}
          {cup ? <AddToCart name={cup.name} setMessage={setMessage} /> : <strong>Please Choose A Cup</strong>}
        </div>
        <div className='col col-1'>
          {/*  This 'col-1' column stays empty, it is here to provide a bit of space.  */}
        </div>

        <div className='col col-6'>
          <h2>Pick a cup</h2>
          <div className='row'>
            {cupChoices.map((cup, index) => (<CupChoice setChosenCup={() => setCup(cup)} index={index} key={index} name={cup.name} imageUrl={cup.imageUrl}></CupChoice>))}
          </div>
        </div>
      </div>
    </div>)
}

export default CupPicker;
