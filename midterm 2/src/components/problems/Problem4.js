import { useState } from "react";

const Problem4 = () => {
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(false)
  const load = () => {
    setImages([]);
    setLoading(true);
    fetch(`https://events.umich.edu/day/json?v=2`)
      .then(res => res.json())
      .then(json => json.map(item => item.styled_images.group_thumb_square))
      .then(array => {
        setImages(array.filter((str) => str !== ''));
        setLoading(false);
      })
  }
  return (
    <>
      {/* @todo clicking this button should call the umich events API at
       `https://events.umich.edu/day/json?v=2`,
       If the result JSON has an image URL at styled_images.group_thumb_square,
       it should be one of the images displayed below. If styled_images.group_thumb_square
       is an empty string, do not include it in processing
        .
       */}
      {/* This button loads images. Every time it is clicked should re-fetch
        the images and show the loading message until they've been retrieved.
         If you're unsure the loading messages are loading, throttle your
         network speed: https://css-tricks.com/throttling-the-network/
         */}
      <button onClick={load}>Load Images</button>
      {/* @todo after clicking the button, but before the images are
            fetched, this should output a loading message: <h3>LOADING...</h3> */}
      {loading && <h3>LOADING...</h3>}
      {/* @todo once the image urls are fetched add the following:
            A header:
            <h3>NUMBER_OF_IMAGE_URL_RESULTS Results</h3>
           Then *every* image should be output as:
           <img src=IMAGE-URL alt='cool event' /> */}
      {Boolean(images.length) && <h3>{images.length} Results</h3>}
      {images && images.map((image, index) => <img key={index} src={image} alt='cool event' />)}
    </>
  )
}
Problem4.displayName = 'Problem4';

export default Problem4;
