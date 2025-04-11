import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

interface ZipCodesInputProps {
  values: number[];
  setValues: (values: number[]) => void;
}
const MAX = 15;
const MIN = 0;
const minDistance = 1;

const AgeSlider: React.FC<ZipCodesInputProps> = ({ values, setValues }) => {

  //code from MUI https://mui.com/material-ui/react-slider/
  const handleChange1 = (event: Event, newValue: number[], activeThumb: number) => {
    if (activeThumb === 0) {
      setValues([Math.min(newValue[0], values[1] - minDistance), values[1]]);
    } else {
      setValues([values[0], Math.max(newValue[1], values[0] + minDistance)]);
    }
  };

  return (
    <Slider
      value={values}
      onChange={handleChange1}
      min={MIN}
      max={MAX}
      valueLabelDisplay="on"
      getAriaLabel={() => 'Age range'}
      disableSwap
    />
  );
}

export default AgeSlider;