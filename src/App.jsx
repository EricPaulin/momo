import React, { useState } from 'react';
import './App.css';

function App() {
  const [image, setImage] = useState(null);
  const [text, setText] = useState('');

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="App">
      <h1>mimi generator</h1>

      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
      />

    </div>
  );
}

export default App;
