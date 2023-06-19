// TIP: YOU SHOULD IMPORT formatDateMemory from util.js
import { formatDateForMemory } from "../util";
// This displays one memory within the list.
const MemoryItem = ({ thisMemory, setMemories }) => {
  return (
    <div className="position-relative col-12 border border-secondary rounded my-3 p-3 bg-white">
      <div className="d-flex">
        <h3>{thisMemory.title}</h3>
        <small className="px-1 text-muted align-self-center">{formatDateForMemory(thisMemory.date)}</small>
      </div>
      {/* ~~ THE BUTTON 👇 SHOULD REMOVE THE MEMORY WHEN CLICKED. ~~ */}
      <button className="close-button" onClick={setMemories}>Ⓧ</button>
      <p>{thisMemory.description}</p>
    </div>
  )
}
MemoryItem.displayName = 'MemoryItem';
export default MemoryItem
