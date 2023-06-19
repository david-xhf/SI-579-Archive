import InputWrapper from "./InputWrapper";
import { useState } from "react";
import { localizedTimestamp } from "../util";
import TextInput from "./TextInput"
import DateInput from "./DateInput"
import TextArea from "./TextArea"

const AddMemory = ({ memories, setMemories }) => {
  const [title, setTitle] = useState('')
  const [date, setDate] = useState('')
  const [description, setDescription] = useState('')
  const [isValid, setIsValid] = useState({
    title: true,
    date: true,
    description: true,
  })

  const submitHandler = (e) => {
    setIsValid({
      title: title && title.split(' ').length === 1,
      date: date && !memories.map(memory => memory.date).includes(localizedTimestamp(date)),
      description: Boolean(description),
    })
    if (title && title.split(' ').length === 1 &&
      date && !memories.map(memory => memory.date).includes(localizedTimestamp(date)) &&
      Boolean(description)) {
      setMemories(previous => {
        const newMemory = [{ title: title, date: localizedTimestamp(date), description: description }, ...previous];
        localStorage.setItem('stored.memories', JSON.stringify(newMemory.sort((a, b) => a.date - b.date)));
        return newMemory.sort((a, b) => a.date - b.date);
      });
      setTitle('');
      setDate('');
      setDescription('')
    }

  }
  // TIP: each input should be inside an input wrapper
  return (
    <form className="needs-validation bg-light p-4">
      <h2>Add A Memory</h2>
      <div className="row g-3">
        <InputWrapper
          columns={6}
          info="Required and must be 1 word"
          label="Title"
          valid={isValid.title}
          validationMessage="Title is required and must be one word."
        ><TextInput value={title} updateValue={setTitle} /></InputWrapper>
        <InputWrapper
          columns={6}
          info="Required and must not be a date used by one of the memories below"
          label="Date of memory"
          valid={isValid.date}
          validationMessage="Date is required and must not be a date of an existing memory."
        ><DateInput value={date} updateValue={setDate} /></InputWrapper>
      </div>
      <InputWrapper
        columns={12}
        info="Required"
        label="Description of the nice memory"
        valid={isValid.description}
        validationMessage="Description is required."
      ><TextArea value={description} updateValue={setDescription} /></InputWrapper>
      <div className="col-12">
        <button type="button" className="btn btn-primary mt-3" onClick={submitHandler}>Add Memory</button>
      </div>
    </form>)
}
AddMemory.displayName = 'AddMemory'
export default AddMemory;