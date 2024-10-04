import React, { useState } from 'react';
import { Button, InputGroup, FormControl } from 'react-bootstrap';

const NumberSpinner = () => {
  const [value, setValue] = useState<number>(1);

  const handleIncrement = () => {
    setValue(prev => prev + 1);
  };

  const handleDecrement = () => {
    setValue(prev => (prev > 1 ? prev - 1 : 1)); // Ensure the value doesn't go below 1
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    if (!isNaN(newValue) && newValue > 0) {
      setValue(newValue);
    }
  };

  return (
    <InputGroup>
      <Button variant="outline-secondary" onClick={handleDecrement}>
        -
      </Button>
      <FormControl
        type="number"
        value={value}
        onChange={handleChange}
        min={1}
        style={{ textAlign: 'center' }}
      />
      <Button variant="outline-secondary" onClick={handleIncrement}>
        +
      </Button>
    </InputGroup>
  );
};

export default NumberSpinner;
