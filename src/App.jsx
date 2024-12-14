import React, { useState, useRef, useEffect } from 'react';
import './App.css';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

function App() {
  const [image, setImage] = useState(null);
  const [topText, setTopText] = useState('');
  const [bottomText, setBottomText] = useState('');
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
    const canvas = canvasRef.current;
    const dataUrl = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = 'momo.png';
    link.click();
  };

  return (
    <>
      <div className="container">
        <h1> <span className='bluey'>momo</span> generator </h1>

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
            sx={{ backgroundColor: '#434343', border: 'none', color: 'white' }}
          >
            <CardContent>
              <canvas
                ref={canvasRef}
                width={600}
                height={400}
                style={{ display: 'block', marginTop: '20px' }}
              />
              <div className='textContainer'>
                <div>
                  <input
                    type="text"
                    id="topText"
                    placeholder="top txt"
                    value={topText}
                    onChange={(e) => setTopText(e.target.value)}
                  />
                </div>
                <div>
                  <input
                    type="text"
                    id="bottomText"
                    placeholder="bottom txt"
                    value={bottomText}
                    onChange={(e) => setBottomText(e.target.value)}
                  />
                </div>
                <button onClick={handleDownload}>MEMEIFY THAT BIH</button>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="footer"> made by Cuddlefish © </div>
      </div>
    </>
  );
}

export default App;
