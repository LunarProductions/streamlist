import React, { useState } from 'react';

const StreamList = () => {
  const [input, setInput] = useState('');
  const [type, setType] = useState('Movie'); 
  const [entries, setEntries] = useState([]); 
  const [editingEntry, setEditingEntry] = useState(null); 

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const handleTypeChange = (event) => {
    setType(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (entries.some(entry => entry.title === input && entry.type === type)) {
      alert('This entry already exists!');
      return;
    }
    const newEntry = { id: Date.now(), title: input, type, completed: false }; 
    setEntries(prevEntries => [...prevEntries, newEntry]);
    setInput('');
  };

  const handleDelete = (deleteEntry) => {
    setEntries(entries.filter((entry) => entry.id !== deleteEntry.id));
  };

  const handleComplete = (entryToComplete) => {
    setEntries(prevEntries => prevEntries.map((entry) =>
      entry.id === entryToComplete.id
        ? { ...entry, completed: !entry.completed }
        : entry
    ));
  };

  const handleEdit = (entry) => {
    setEditingEntry(entry);
  };

  const handleSaveEdit = () => {
    setEntries(prevEntries => prevEntries.map((entry) =>
      entry.id === editingEntry.id ? { ...entry, title: input, type } : entry
    ));
    setEditingEntry(null);
    setInput('');
    setType('Movie');
  };

  return (
    <div className="form-container">
      <h1>Welcome to StreamList</h1>
      <form onSubmit={handleSubmit} className="streamlist-form">
        <div className="form-group">
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            placeholder="Enter a Movie or Show"
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <select
            value={type}
            onChange={handleTypeChange}
            className="form-select"
          >
            <option value="Movie">Movie</option>
            <option value="Show">Show</option>
          </select>
        </div>
        <div className='subbutton'>
          <button type="submit" className="add-button">Add</button>
        </div>
      </form>

      <div className="entries-list">
        <h2>Your Stream List</h2>
        <ul>
          {entries.map((entry) => (
            <li key={entry.id}>
              {editingEntry && editingEntry.id === entry.id ? (
                <>
                  <input
                    type="text"
                    value={input}
                    onChange={handleInputChange}
                  />
                  <select
                    value={type}
                    onChange={handleTypeChange}
                    className="form-select"
                  >
                    <option value="Movie">Movie</option>
                    <option value="Show">Show</option>
                  </select>
                  <button onClick={handleSaveEdit}>Save</button>
                </>
              ) : (
                <>
                  {entry.title} - <strong>{entry.type}</strong>
                  <button onClick={() => handleDelete(entry)} className='deletebtn'>Delete</button>
                  <button onClick={() => handleEdit(entry)} className='editbtn'>Edit</button>
                  <button onClick={() => handleComplete(entry)} className="complete-btn">
                    {entry.completed ? 'Completed' : 'Incomplete'}
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default StreamList;


