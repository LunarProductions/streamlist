import React, { useState } from 'react';

const StreamList = () => {
  const [input, setInput] = useState('');
  const [type, setType] = useState('Movie'); 
  const [entries, setEntries] = useState([]); 
  const [isEditing, setIsEditing] = useState(null); 
  const [editInput, setEditInput] = useState(''); 
  const [editType, setEditType] = useState('Movie'); 

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const handleTypeChange = (event) => {
    setType(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newEntry = { id: Date.now(), title: input, type }; 
    setEntries([...entries, newEntry]);
    setInput('');
  };

  const handleDelete = (deleteEntry) => {
    const updatedList = entries.filter((entry) => entry.id !== deleteEntry.id);
    setEntries(updatedList);
  };

  const handleComplete = (entryToComplete) => {
    const updatedItems = entries.map((entry) =>
      entry.id === entryToComplete.id
        ? { ...entry, completed: !entry.completed }
        : entry
    );
    setEntries(updatedItems);
  };

  const handleEdit = (entry) => {
    setIsEditing(entry.id); 
    setEditInput(entry.title); 
    setEditType(entry.type); 
  };

  const handleSaveEdit = (entryToEdit) => {
    const updatedItems = entries.map((entry) =>
      entry.id === entryToEdit.id ? { ...entry, title: editInput, type: editType } : entry
    );
    setEntries(updatedItems);
    setIsEditing(null); 
    setEditInput(''); 
    setEditType('Movie'); 
  };

  return (
    <div className="form-container">
      <h1>Welcome to StreamList</h1>
      <form onSubmit={handleSubmit} className="streamlist-form">
        <div className="form-group">
          <input
            type="text"
            id="titleInput"
            value={input}
            onChange={handleInputChange}
            placeholder="Enter a Movie or Show"
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <select
            id="typeSelect"
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
              {isEditing === entry.id ? (
                <>
                  <input
                    type="text"
                    value={editInput}
                    onChange={(e) => setEditInput(e.target.value)}
                  />
                  <select
                    value={editType}
                    onChange={(e) => setEditType(e.target.value)}
                    className="form-select"
                  >
                    <option value="Movie">Movie</option>
                    <option value="Show">Show</option>
                  </select>
                  <button onClick={() => handleSaveEdit(entry)}>Save</button>
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

