import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { useState } from 'react';

export default function RangeSlider() {
  const [value, setValue] = useState<number[]>([5, 10]);

  const marks = [
    {
      value: 0,
      label: '5',
    },

    {
      value: 25,
      label: '25',
    },
  ];

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };

  return (
    <Box sx={{ width: 300 }}>
      <Slider
        getAriaLabel={() => 'Temperature range'}
        value={value}
        min={0}
        step={0.1}
        max={25}
        marks={marks}
        onChange={handleChange}
        valueLabelDisplay="auto"
      />
    </Box>
  );
}
