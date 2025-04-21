import * as React from 'react';
import Slider from '@mui/material/Slider';
import { FormControl } from '@mui/material';

interface ZipCodesInputProps {
  values: number[];
  setValues: (values: number[]) => void;
}
const MAX = 15;
const MIN = 0;
const minDistance = 1;

const AgeSlider: React.FC<ZipCodesInputProps> = ({ values, setValues }) => {

  //code from MUI https://mui.com/material-ui/react-slider/
  const handleChange = (_event: Event, newValue: number | number[], activeThumb: number) => {
    if (Array.isArray(newValue)) {
      if (activeThumb === 0) {
        setValues([Math.min(newValue[0], values[1] - minDistance), values[1]]);
      } else {
        setValues([values[0], Math.max(newValue[1], values[0] + minDistance)]);
      }
    }
  };

  return (
    <FormControl sx={{ minWidth: 200, width: "100%"}}>
      <Slider
        value={values}
        onChange={handleChange}
        valueLabelDisplay="auto"
        min={MIN}
        max={MAX}
        getAriaLabel={() => 'Age range'}
        disableSwap
        sx={{
          color: 'black',
          '& .MuiSlider-thumb': {
            backgroundColor: 'green',
            border: '5px solid rgb(5, 44, 21)',
          },
          '& .MuiSlider-track': {
            backgroundColor: 'black',
          },
          '& .MuiSlider-rail': {
            backgroundColor: 'grey.300',
          },
          '& .MuiSlider-mark': {
            backgroundColor: 'primary.main',
            height: 8,
            width: 2,
            marginTop: -3,
          },
          '& .MuiSlider-markActive': {
            backgroundColor: 'primary.main',
            height: 8,
            width: 2,
            marginTop: -3,
          },
        }}
      />
    </FormControl> 
  );
}

export default AgeSlider;