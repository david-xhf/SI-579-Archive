import './App.css';

import { defaultEntries } from "./util";
import MemoryItem from "./components/MemoryItem";
import Header from "./components/Header";
import AddMemory from "./components/AddMemory";
import { useState } from "react";

function App() {
  const defaultMemories = localStorage.getItem('stored.memories')
    ? JSON.parse(localStorage.getItem('stored.memories')) :
    defaultEntries;
  const [memories, setMemories] = useState(defaultMemories.sort((a, b) => a.date - b.date));

  return (
    <div className="App">
      <Header />
      <main className="container">
        <AddMemory memories={memories} setMemories={setMemories}></AddMemory>
        <h2 className="mt-4 p-2 bg-white text-center">⭐️⭐⭐🦄🌈Memories🌈🦄⭐⭐⭐</h2>
        {memories.map((memory, index) =>
          <MemoryItem
            key={index}
            thisMemory={memory}
            setMemories={() => {
              const newMomery = memories.filter(mem => memory.date !== mem.date);
              localStorage.setItem('stored.memories', JSON.stringify(newMomery))
              setMemories(newMomery)
            }}
          ></MemoryItem>)}
      </main>
    </div>
  );
}

export default App;
