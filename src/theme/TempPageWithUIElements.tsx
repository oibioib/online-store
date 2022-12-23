import { CircularProgress } from '@mui/material';
import { RangeSlider } from '../components';

const TempPageWithUIElements = () => {
  return (
    <>
      <RangeSlider />
      <CircularProgress size={70} thickness={3} />
    </>
  );
};

export default TempPageWithUIElements;
