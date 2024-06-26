import React, { useState } from 'react';
import { Button } from "react-bootstrap";

function EnglishLetterFilter({getalphabet}) {
  const [selectedLetter, setSelectedLetter] = useState(null);

  const letters = [...Array(26)].map((_, i) => String.fromCharCode('A'.charCodeAt(0) + i));

  function handleLetterClick(letter) {
    setSelectedLetter(letter);
    // props.onLetterSelect(letter);
    getalphabet(letter);
  }

  return (
    <React.Fragment>
      <Button variant="outline-secondary" onClick={() => handleLetterClick('')} style={{ fontWeight: selectedLetter === '' ? 'bold' : 'normal', marginRight: '5px' }}>
        All
      </Button>
      {letters.map((letter) => (
        <Button variant="outline-secondary" key={letter} onClick={() => handleLetterClick(letter)} style={{ fontWeight: selectedLetter === letter ? 'bold' : 'normal',marginRight: '5px' }}>
          {letter}
        </Button>
      ))}
    </React.Fragment>
  );
}

export default EnglishLetterFilter;
