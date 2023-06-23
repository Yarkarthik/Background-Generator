import React, { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import './BackgroundGenerator.css';

const BackgroundGenerator = () => {
  const [colors, setColors] = useState(['#ffffff']);
  const [shapes, setShapes] = useState([]);
  const previewRef = useRef(null);

  const handleGenerateColors = () => {
    const randomColors = generateRandomColors();
    setColors(randomColors);
    updateBackground(randomColors);
    generateShapes();
  };

  const handleColorChange = (index, value) => {
    const updatedColors = [...colors];
    updatedColors[index] = value;
    setColors(updatedColors);
    updateBackground(updatedColors);
  };

  const generateRandomColors = () => {
    const randomColorCount = Math.floor(Math.random() * 6) + 2; // Generate between 2 and 7 random colors
    const randomColors = [];

    for (let i = 0; i < randomColorCount; i++) {
      const randomColor = getRandomColor();
      randomColors.push(randomColor);
    }

    return randomColors;
  };

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const updateBackground = (colorArray) => {
    const gradient = colorArray.join(', ');
    const previewElement = previewRef.current;
    if (previewElement) {
      previewElement.style.backgroundImage = `linear-gradient(to right, ${gradient})`;
    }
  };

  const generateShapes = () => {
    const newShapes = [];
    const shapeCount = Math.floor(Math.random() * 4) + 1; // Generate between 1 and 4 shapes

    for (let i = 0; i < shapeCount; i++) {
      const shape = {
        top: Math.floor(Math.random() * 80) + 10 + '%', // Random top position between 10% and 90%
        left: Math.floor(Math.random() * 80) + 10 + '%', // Random left position between 10% and 90%
      };
      newShapes.push(shape);
    }

    setShapes(newShapes);
  };

  const handleSaveImage = () => {
    const previewElement = previewRef.current;
    if (!previewElement) return;

    html2canvas(previewElement)
      .then((canvas) => {
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = 'background.png';
        link.click();
      })
      .catch((error) => {
        console.error('Error saving image:', error);
      });
  };

  const renderColorInputs = () => {
    return colors.map((color, index) => (
      <div className="color-picker" key={index}>
        <input
          type="color"
          value={color}
          onChange={(e) => handleColorChange(index, e.target.value)}
        />
      </div>
    ));
  };

  const renderShapes = () => {
    return shapes.map((shape, index) => (
      <div className="shape" style={{ top: shape.top, left: shape.left }} key={index} />
    ));
  };

  return (
    <div className="background-generator-container">
      <h1 className="heading">Background Generator</h1>

      <div className="color-inputs">{renderColorInputs()}</div>

      <button className="generate-button" onClick={handleGenerateColors}>
        Generate
      </button>

      <div className="preview-container">
        <div className="preview" ref={previewRef}>
          {renderShapes()}
        </div>
      </div>

      <button className="save-button" onClick={handleSaveImage}>
        Save Image
      </button>
    </div>
  );
};

export default BackgroundGenerator;
