import { MuiColorInput } from 'mui-color-input';

const ColorPicker = ({ value, handleChange }) => {
  return <MuiColorInput format="hex" value={value} onChange={handleChange} label="Assign Color" />;
};

export default ColorPicker;
