import React, { useState, useRef, useEffect } from 'react';
import './App.css';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

function App() {
  const [image, setImage] = useState(null);
  const [topText, setTopText] = useState('');
  const [bottomText, setBottomText] = useState('');
  const [loading, setLoading] = useState(false);
  const [there, setThere] = useState(false);
  const canvasRef = useRef(null);

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

  const drawImageWithText = () => {
    if (!image) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.src = image;

    img.onload = () => {
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      const textPadding = 20;

      ctx.font = '30px "Comic Neue", cursive';
      ctx.fillStyle = 'white';
      ctx.textAlign = 'center';

      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      ctx.drawImage(img, 0, 0, canvasWidth, canvasHeight);

      ctx.fillText(topText, canvasWidth / 2, textPadding);

      ctx.fillText(bottomText, canvasWidth / 2, canvasHeight - textPadding);
    };
  };

  useEffect(() => {
    drawImageWithText();
  }, [topText, bottomText, image]);

  const handleDownload = () => {
    setLoading(true);
    setThere(true);


    setTimeout(() => {
      const canvas = canvasRef.current;
      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = 'momo.png';
      link.click();
      setLoading(false);
    }, 3000);
  };

  return (
    <>
      <div className="container">
        <h1> <a className='bluey' href='/' >momo</a> generator </h1>

        {!image && (
          <Card
            variant="outlined"
            sx={{ backgroundColor: '#242424', border: 'none', color: 'white' }}
          >
            <CardContent>
              <input
                className="generateBtn"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
              />
            </CardContent>
          </Card>
        )}

        {image && (
          <Card
            variant="outlined"
            sx={{ backgroundColor: '#434343', width: '350px', height: '55%',
              display: 'flex', justifyContent: 'center', alignContent: 'center', 
            }}
          >
            <CardContent
              sx={{ width: '100%', height: '100%',
                display: 'flex', flexDirection: 'column',justifyContent: 'center', 
                alignItems: 'center'
              }}
            >
              {/* Meme Image Edit */}
              <canvas ref={canvasRef} />

              {/* Meme Font Edit */}
              <div className='textContainer'>
                <input
                  type="text"
                  id="topText"
                  placeholder="top txt"
                  value={topText}
                  onChange={(e) => setTopText(e.target.value)}
                />
                <input
                  type="text"
                  id="bottomText"
                  placeholder="bottom txt"
                  value={bottomText}
                  onChange={(e) => setBottomText(e.target.value)}
                />
                <button onClick={handleDownload}>MEMEIFY THAT BIH</button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Meme Image Edit */}
        {loading && (
          <div className="loadingScreen">
            <img src="src\images\peter-griffin-3d.gif"/>
            <h2> DOWNLOADING MEEM </h2>
          </div>
        )}

        <div className="footer"> made by Cuddlefish © </div>
      </div>
    </>
  );
}

export default App;
