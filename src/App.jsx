import React, { useState } from 'react';
import './App.css';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';


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
    <>
    <div className="container">
      <h1> momo generator </h1>

      {!image && (
      <Card variant='outlined'
        sx={{ backgroundColor: '#242424', border: 'none' , color: 'white'}}
      >
        <input
          className='generateBtn'
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
        />
      </Card>
      )}

      {image && (
        <Card variant='outlined'
        sx={{ backgroundColor: '#242424', border: 'none' , color: 'white'}}
        >
          bruh moment
        </Card>
      )}

        <div className='footer'> made by Cuddlefish © </div>
      </div>
    </>
  );
}

export default App;
