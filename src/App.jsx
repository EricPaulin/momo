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
      <h1> <span className='bluey'>momo</span> generator </h1>

      {!image && (
      <Card variant='outlined'
        sx={{ backgroundColor: '#242424', border: 'none' , color: 'white'}}
      >
        <CardContent>
        <input
          className='generateBtn'
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
        />
        </CardContent>
      </Card>
      )}

      {image && (
        <Card variant='outlined'
        sx={{ backgroundColor: '#434343', border: 'none' , color: 'white'}}
        >
          <CardContent>
            <img src={image} alt="Uploaded Momo"/>
            <input type="text" id="topText"/>
            <input type="text" id="bottomText"/>
            <button>
              MEMIFY THAT BIH
            </button>
          </CardContent>
        </Card>
      )}

        <div className='footer'> made by Cuddlefish © </div>
      </div>
    </>
  );
}

export default App;
