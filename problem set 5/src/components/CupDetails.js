// @todo make a CupDetails component. This is what provides the big cup image + info
// that appears on the left. The markup is:
//       <h2>CUP NAME</h2>
//       <img class="img-fluid" src="CUP IMAGE URL" alt="CUP NAME" />
//       <p>CUP DESCRIPTION</p>
const CupDetails = ({ name, imageUrl, description }) => {
    return (
        <>
            <h2>{name}</h2>
            <img className="img-fluid" src={imageUrl} alt={name} />
            <p>{description}</p>
        </>
    )
}

export default CupDetails;